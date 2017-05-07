/**
 * Created by cvtt on 2017/4/7.
 */
import React,{Component} from 'react'
import './upStream.css'
import service from '../../services/movieService.js'
export default class UpstreamDetaildata extends Component {
        constructor(props){
            super(props)
            this.state = {
                industryName:'',
                industryId:'',
                responseEmpty:false,
                responseArr:[],
                isLoading:true,
                lastOrgId:'',
                isIndential:'',
                datamessage:{},
                propsType:'',
                baginOrgIdRelease:2,
                message:{
                    type:'',
                    count:20,
                    industryId:'',
                    region:'',
                    userId:JSON.parse(localStorage.getItem('localUserId')).userId,
                }
            }
        }
    componentWillMount(){
        this.state.message.type = this.props.upStreamArr.type
    }
    // 当前子组件，获取行业id 地区 作为请求的参数获取数据
    componentWillReceiveProps(nextProps){  // nextProps 获取的值要比 this.props 获取的值要快，用nextProps

        if(nextProps.upStreamArr.type == 0 ){ // 只有在选择对应上游的时候type=0
            this.state.message.type = nextProps.upStreamArr.type
        }

        this.setState({propsType:nextProps.upStreamArr.type})

        if(nextProps.upStreamArr != this.props.upStreamArr) {//监测前后props属性有没有改变
                //beginOrgId 是用来做下拉刷新,设置数据显示开始的位置,由于一个数据刷新完成以后，会给state lastorgId 设置上即，会保留，这样会设在下一个条件上,当更换条件的时候beginOrgId,就要的从头开始加载数据 (baginOrgIdRelease)

            // 当前props属性值发生改变释放    isIndential = true
            let PropsUpStream = nextProps.upStreamArr
            this.setState({industryName:PropsUpStream.industryName,industryId:PropsUpStream.industryId,isIndential:true,baginOrgIdRelease:++this.state.baginOrgIdRelease})
            if(this.state.baginOrgIdRelease >9){
                this.setState({baginOrgIdRelease:2})
            }
            let messages = Object.assign({},this.state.message)
            messages.industryId = PropsUpStream.industryId
            messages.region = PropsUpStream.region
            if(PropsUpStream.type){
                messages.type = PropsUpStream.type
            }

            this.fetch(JSON.stringify(messages))
        }

    }

    componentDidUpdate(){
        if(this.refs.scroll_container){
            this.addEventListener()
        }
    }

    addEventListener=()=>{
        const _this=this
        this.refs.scroll_container.addEventListener('scroll',(e)=>{

            e.stopPropagation
            if(e.target.scrollHeight <=e.target.scrollTop + e.target.offsetHeight){
                if(_this.state.isButton){
                    return
                }
                // 在发送请求之前将上一次的 orgId 回传
                if(this.state.datamessage.flag ==1){
                    return
                }

                _this.setState({isButton:true,baginOrgIdRelease:1,isIndential:false}) //当下拉刷新的时候，表示是在当前条件,所以还是的需要的beginOrgId
                _this.fetch(this.state.message,this.state.lastOrgId)
            }
        })
    }
    fetch =(message,lastOrgId)=>{ //
         if(typeof (message)  == 'string') {
             message = JSON.parse(message)
         }
        let messageObj = Object.assign({},message)

        if(this.state.baginOrgIdRelease >3 ){//当页面初始加载的时候，baginOrgIdRelease ==2

            messageObj.beginOrgId = ''
        }else if(this.state.baginOrgIdRelease == 1)  { // 当下拉刷新的时候等于 1

            messageObj.beginOrgId = this.state.lastOrgId || lastOrgId
        }
        let responseArr = [].concat(this.state.responseArr)
        let messageStr = JSON.stringify(messageObj)
        let promise = service.getSearchResult(messageStr)
        promise.then((json)=>{

            if(json ==''){
                console.log('1111')

                this.setState({responseEmpty:true,isLoading:false})
                return
            }
            json = JSON.parse(json)
           if(this.state.isIndential){//isIndential值为true,表示请求不同的数据
               responseArr = []
           }
            if(responseArr.length>0){ // 数据刷新时执行

                responseArr =  responseArr.concat(json.orgList)
            }else{
                responseArr =  json.orgList
            }
            if(this.state.baginOrgIdRelease >3 ){ // 当切换选择的条件  lastOrgId =''

                this.setState({responseArr:responseArr,isLoading:false,lastOrgId:'',datamessage:json,responseEmpty:false})
            }else {

                this.setState({responseArr:responseArr,isLoading:false,lastOrgId:json.lastOrgId,datamessage:json,responseEmpty:false})
            }


        }),reason =>{
            console.log(reason)
        }
    }
    getLianDataCard =(Portrait,Id,RelationType,Type,ShortName,FullName,ContactName,Email,IndustryList,NetFlag,Th)=>{
        var Iosmess = Object.assign({},this.state.Ios)
        Iosmess.orgId = Id
        Iosmess.orgType = Type
        Iosmess.orgShortName = ShortName
        Iosmess.orgPortrait = Portrait
        var Strmess = JSON.stringify(Iosmess)
        if(NetFlag == '1'){ // 表示跳转联网站
            var uuu = navigator.userAgent;
            var isAndroid=uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
            var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
            if(isIos) {
                window.webkit && window.webkit.messageHandlers.gotoWebsite.postMessage(Strmess)
                return
            }else if(isAndroid){

                return  window.androidJsInterface && window.androidJsInterface.lianWebMainActivityLauncher(ShortName,Portrait,Id.toString(),RelationType.toString(),Type)
            }
        }else if(NetFlag == '0' ){ // 0

            var uuu = navigator.userAgent;
            var isAndroid=uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
            var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
            if(isIos) {
                window.webkit && window.webkit.messageHandlers.gotoOrgDetail.postMessage(Strmess)
                return
            }else if(isAndroid){

                return   window.androidJsInterface && window.androidJsInterface.intationOrgCardActivityLauncher(Portrait,Id,Type,ShortName,FullName,ContactName,Email,JSON.stringify(IndustryList))

            }
        }
    }
    handleUpStreamDetail =(item,index)=>{ // 搜索组织详细展示
        if(item.orgPortrait == null){
            var orgPortrait = require('../../images/originImage.png')
        }else {
            orgPortrait = item.orgPortrait
        }

        return(

            <div className='upStreamDetailOrgin' key={item && item.orgId } onClick={this.getLianDataCard.bind(this,item.orgPortrait,item.orgId,item.orgRelationType,item.orgType,item.orgShortName,item.orgFullName,'','',item.orgIndustry,item.orgNetFlag)}  >
                <div className='upStreamImage' style={{background:'url('+orgPortrait+') no-repeat center center'}}></div>
                <span>{item.orgShortName}</span>
                <div className='upStreamaddress'>{item.officeAddressName}</div>
                <b></b>
                <div className='upStreamclassBorder'></div>
            </div>
        )
    }
    handleUpstream =()=>{

          return (
              <div className='upStreamDetailContainer' ref='scroll_container'>{ this.state.responseArr.map(this.handleUpStreamDetail)}</div>
          )
    }

    handleResponseEmpty =()=> {
        return(
            <div className='upStreamResponEmpty'>
                <div className='upStreamImage' >
                    <img src={require('../../images/empty.png')} alt=""/>
                    <span>暂无搜索结果</span>
                </div>
            </div>
        )

    }
     render(){

           if(this.state.responseEmpty && this.state.isIndential){ //isIndential:当选择的条件变化值为true,下拉刷新的时候值为 false
              return  this.handleResponseEmpty()
           }
              return this.handleUpstream()
     }
}

