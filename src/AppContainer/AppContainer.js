/*
 * 根容器组件
 * */
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import './appcss/app.css'
import service from '../services/movieService.js'
import SlideDemo from '../common/Slide/slideDemo.jsx'
import {pathParams} from '../js/config.js'
export default class AppContainer extends Component {
    constructor(props) {
        super(props)
        this.state={
            isLoading:true,
            carousel:true,
            location:'',
            userId:{
                origner:1,
                userId:''
            },
            orginer:'',
            slider:'',
            sildersucess:false,
            responseSussess:false,
            imgDataResponse:false,
            imgData:'',
            containerBox:'',
            containerBoxRealse:false,
            refresh:false,
            flag:0,
            isLoading:true,
            response:false,
            datamessage:{},
            detailData:[],
            lastOrgId:'',
            detailLength:'',
            isButton:'',
            waitFlag:false,
            pictureUrl:'',
            messages:{
                count:20,
                beginOrgId:0,
                userId:''
            },
            Ios:{
                orgId:'',
                orgType:'',
                orgShortName:'',
                orgPortrait:'',
            }
        }
    }
  componentWillMount() {


      var messageStr = null ;
      if(this.props.location.query.userId){
          let message = new  Object()
          message.userId = parseInt(this.props.location.query.userId)
          this.state.messages.userId =  parseInt(this.props.location.query.userId)
          messageStr = JSON.stringify(message)
          this.setState({userId: JSON.stringify(this.props.location.query)})
          var origner = new Object()
          let  localOrigner = JSON.parse(localStorage.getItem('localUserId')) || origner
          localOrigner.userId =parseInt(this.props.location.query.userId)
          localStorage.setItem('localUserId',JSON.stringify(localOrigner))
      }else {
          let localUserId = localStorage.getItem('localUserId')
          if(localUserId){
              let messagelocal = new Object()
              messagelocal.userId = parseInt(JSON.parse(localStorage.getItem('localUserId')).userId)
              this.state.messages.userId = parseInt(JSON.parse(localStorage.getItem('localUserId')).userId)
              messageStr = JSON.stringify(messagelocal)
              this.setState({userId: localStorage.getItem('localUserId')})
          }

      }
      this.fetchs(messageStr)
        document.title = '找组织'
      //在页面的加载的时候的就请求轮播图的资源
      const promise =service.handleGetImgUrl('url',JSON.stringify({x:9,y:9,osType:1}))
      promise.then(json=>{
          json = JSON.parse(json)
          this.setState({imgDataResponse:true,imgData:json,pictureUrl:json.orgHomePageADList.pictureUrl})
      }),reason =>{

      }

  }
    componentDidMount(){
        this.fetch(this.state.messages)
        this.setState({containerBox:this.refs.containerBox,containerBoxRealse:true})
    }

    fetchs =(message)=>{

        const promise = service.getisJoinOrg(message)
        promise.then((json)=> {

                 this.setState({responseSussess:true,isorigner:json,isLoading:false})

        }),reason =>{

        }
    }
    handleClickRefresh = () =>{ // 当网络断开连接的时候的点击刷新
        var messageStr = null ;
        if(this.props.location.query.userId){
            let message = new  Object()
            message.userId = parseInt(this.props.location.query.userId)
            messageStr = JSON.stringify(message)
            this.setState({userId: JSON.stringify(this.props.location.query)})
            var origner = new Object()
            let  localOrigner = JSON.parse(localStorage.getItem('localUserId')) || origner
            localOrigner.userId =parseInt(this.props.location.query.userId)
            localStorage.setItem('localUserId',JSON.stringify(localOrigner))
        }else {
            let localUserId = localStorage.getItem('localUserId')
            if(localUserId){
                let messagelocal = new Object()
                messagelocal.userId = parseInt(JSON.parse(localStorage.getItem('localUserId')).userId)
                messageStr = JSON.stringify(messagelocal)
                this.setState({userId: localStorage.getItem('localUserId')})
            }
        }
        const promise =service.handleGetImgUrl('url',JSON.stringify({x:9,y:9,osType:1}))
        promise.then(json=>{
            json = JSON.parse(json)
            this.setState({imgDataResponse:true,imgData:json,isLoading:false})
        }),reason =>{

        }
        this.fetchs(messageStr)
        this.fetch(this.state.messages)
    }
    getLianApp =(token)=> {
        var userId = JSON.parse(this.state.userId).userId
        var url = pathParams() + token + '?userId=' + userId
        console.log(url)
        var uuu = navigator.userAgent;
        var isAndroid = uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
        var isIos = !!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) == true;
        if (isIos) {
            browserHistory.push(`${token}${this.state.userId}`)
            return
        } else if (isAndroid) {
            return window.androidJsInterface && window.androidJsInterface.openNewWindow(url)
        }
    }
    getFind =()=>{

         this.getLianApp(`/container/find/`)
    }
    upStreams =()=>{
         this.getLianApp(`/container/home/`)
    }
    travalStreams =()=>{
        this.getLianApp('/container/movie/')

    }
    downStreams =()=>{
        this.getLianApp('/container/downstream/')

    }
    handeleMasks =()=>{

            if(this.state.responseSussess){
                return (

                    <div className={this.state.isorigner == 0 ?'masksDisplay':'masksnone'}>
                        <div className='masksPrompt'>你尚未加入组织，暂不能进行此操作 </div>
                    </div>
                )
            }
    }

    handleInternet =()=>{
        return <div className='internet' onClick={this.handleClickRefresh}>
                    <div className='internetImage'>
                        <img src={require('../images/internet.png')} alt="网络断开链接请检查网络设置" title='网络断开链接请检查网络设置'/>
                        <span>网络异常,请检查网络设置</span>
                    </div>
               </div>
    }
    componentDidUpdate(){ //检测到state 和 props 变化就执行
        if(this.refs.containerBox ){
            this.addEventListener()

        }
    }

    getLianDataCard =(Portrait,Id,RelationType,Type,ShortName,FullName,ContactName,Email,IndustryList,NetFlag,Th)=>{
        var Iosmess = Object.assign({},this.state.Ios)
        Iosmess.orgId = Id
        Iosmess.orgType = Type
        Iosmess.orgShortName = ShortName
        Iosmess.orgPortrait = Portrait
        var Strmess = JSON.stringify(Iosmess)
        if(NetFlag == '1'){
            var uuu = navigator.userAgent;
            var isAndroid=uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
            var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
            if(isIos) {
                window.webkit && window.webkit.messageHandlers.gotoWebsite.postMessage(Strmess)
                return
            }else if(isAndroid){
                return  window.androidJsInterface && window.androidJsInterface.lianWebMainActivityLauncher(ShortName,Portrait,Id.toString(),RelationType.toString(),Type)

            }
        }else if(NetFlag == '0' ){

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
    addEventListener=()=>{
        const _this=this

        this.refs.containerBox.addEventListener('scroll',(e)=>{

            if(e.target.scrollHeight-2 <=e.target.scrollTop + e.target.offsetHeight){

                if(_this.state.isButton){
                    return
                }
                // 在发送请求之前将上一次的 orgId 回传
                if(this.state.datamessage.flag ==1){
                    return
                }

                _this.fetch(this.state.messages,this.state.lastOrgId)
                _this.setState({isButton:true,waitFlag:'block'})
            }
        })
    }
    fetch = (messages,beginOrgId) => {
        var _this = this // 保存全局 this
        let message = Object.assign({}, messages)
        message.beginOrgId = this.state.lastOrgId && beginOrgId
        const messageStr = JSON.stringify(message)
        let detailData = [].concat(this.state.detailData)
        const promise = service.getRecomConentData(messageStr)
        promise.then((json) => {
            if(json =='' && this.state.lastOrgId == '' ){
                this.setState({response:true,isLoading:false,waitFlag:'none'})
                return
            }
            if(json && JSON.parse(json).code ){
                this.setState({response:true,isLoading:false,waitFlag:'none'})
                return
            }
            if(json ==''){
                _this.setState({ // 同步还是异步
                    isLoading: false,
                    detailData: detailData,
                    detailLength:detailData.length-1,
                    messages: message,
                    isButton:false,
                    waitFlag:'none',
                })
            }else {
                json = JSON.parse(json)
                _this.setState({datamessage: json, isLoading: false,lastOrgId: json.lastOrgId, isButton:false,waitFlag:'none'})

                if (detailData.length > 0) {
                    detailData = detailData.concat(json.orgList)
                } else {
                    detailData = json.orgList
                }
                // 获取到数据之后 去掉遮罩 ，加载数据提示去掉
                _this.setState({ // 同步还是异步
                    detailData: detailData,
                    detailLength:detailData.length-1,
                    messages: message,
                })

            }

        }),reason =>{
            console.error('onRejected function called: ', reason )
        }
    }

    handleOrign =()=>{
        return(
            <div className='noneOrginRecom'>
                <div className='noneOrginImage' ref="scroll_container">
                    <img src={require('../images/noneOrign.png')} alt=""/>
                    <span>暂无推荐组织</span>
                </div>
            </div>
        )
    }
    // 渲染数据方法中
    handelRender =(item,index)=>{

        if(item.orgPortrait == null) {
            var orgPortrait = require('../images/originImage.png')
        }else {
            orgPortrait = item.orgPortrait
        }

        return(

            <div className='RecomComponent' key={item && item.orgId } onClick={this.getLianDataCard.bind(this,item.orgPortrait,item.orgId,item.orgRelationType,item.orgType,item.orgShortName,item.orgFullName,'','',item.orgIndustry,item.orgNetFlag)}>
                <div className='componentImage' style={{background:'url('+orgPortrait+') no-repeat center center',backgroundSize:'3.33rem 3.33rem'}}></div>
                <span>{item.orgShortName}</span>
                <div className='address'>{item.officeAddressName}</div>
                <b></b>
                <div className={this.state.detailLength == index ?'classBorderAll':'classBorder'}></div>

            </div>
        )
    }
    handleLoading =()=>{
        return (
            <div className='isLoading' ><img src={require("../images/isLoading.png")} alt=""/></div>
        )
    }

    handleRecomContent =()=>{
        return (
            <div className = 'recomConented' ref="scroll_container">
                {this.state.detailData.map(this.handelRender)}
                <div className='isLoadingwaitFlage' style={{display:this.state.waitFlag}}><img src={require("../images/isLoading.png")} alt=""/></div>
            </div>
        )
    }
    renderFind =(a)=>{

        return (
                <div className='containerBox' ref='containerBox'>
                    <div className='container'>
                        <div className="app">
                            {this.state.responseSussess && this.handeleMasks()}
                            <div className='topSearch'>
                                <div className='search' onClick={this.getFind}>
                                    <span>&nbsp;按组织名称/行业类型/地区<img src={require('../images/serach.png')} alt=""/></span>
                                </div>
                            </div>
                            <div className="appheader">
                                <div className='upStreams' onClick={this.upStreams}>
                                    <div className='oneStream'><img src={require('../images/upStream.png')} alt=""/>
                                    </div>
                                    <a>找上游</a>
                                    <span></span>
                                </div>
                                <div className='travalStreams' onClick={this.travalStreams}>
                                    <div className='twoStream'><img src={require('../images/travel.png')} alt=""/></div>
                                    <a>找同行</a>
                                    <span></span>
                                </div>
                                <div className='downStreams' onClick={this.downStreams}>
                                    <div className='threeStream'><img src={require('../images/downStream.png')} alt=""/>
                                    </div>
                                    <a>找下游</a>
                                </div>
                            </div>
                            <div className='carousel'>
                                {this.state.imgDataResponse && <SlideDemo orginer={this.state.imgData}/> }
                            </div>
                            <div className='recommend'>
                                <span></span>
                                <span>你要找的可能是他们 </span>
                                <div></div>
                            </div>
                            <div className='recomConent'>
                                {this.state.response ? this.handleOrign() : this.handleRecomContent()
                               }
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

    render() {
              window.addEventListener('online',function(){
                   window.navigator.onLine

              })
             window.addEventListener('onffline',function(){
                 window.navigator.onLine

             })
             if(!window.navigator.onLine){
                 return this.handleInternet()
             }

              if(this.state.isLoading){

                  return this.handleLoading()
              }

                 return this.renderFind()
      }
}
