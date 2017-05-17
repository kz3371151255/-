/**
 * Created by cvtt on 2017/3/20.
 */
/**
 * Created by cvtt on 2017/3/20.
 */

import React, { Component } from 'react'
import './css/recomConent.css'
import service from '../services/movieService.js'
import {RecomData} from './data/recom.js'
class RecomConent extends Component {
    constructor(props) {
        super(props)
        this.state={
            isLoading:true,
            response:false,
            datamessage:{},
            detailData:[],
            lastOrgId:'',
            detailLength:'',
            pullUp:1,
            messages:{
                count:20,
                beginOrgId:0,
                userId:JSON.parse(localStorage.getItem('localUserId')).userId
            },
            Ios:{
                orgId:'',
                orgType:'',
                orgShortName:'',
                orgPortrait:'',
            }
        }
    }
    componentWillMount(){
        this.state.messages.userId = parseInt(JSON.parse(this.props.userId).userId)

    }
    componentDidMount(){

        this.fetch(this.state.messages)
    }
    componentDidUpdate(){ //检测到state 和 props 变化就执行
          if(this.props.pullUpLoading ){
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

        this.props.pullUpLoading.addEventListener('scroll',(e)=>{

            if(e.target.scrollHeight-2 <=e.target.scrollTop + e.target.offsetHeight){

                if(_this.state.isButton){
                    return
                }
                // 在发送请求之前将上一次的 orgId 回传
                if(this.state.datamessage.flag ==1){
                    return
                }

                _this.fetch(this.state.messages,this.state.lastOrgId)
                _this.setState({isButton:true,pullUp:++this.state.pullUp})
            }
        })
    }
    fetch = (messages,beginOrgId) => {
        var _this = this // 保存全局 this
        let message = Object.assign({}, messages)
        message.beginOrgId = this.state.lastOrgId && beginOrgId
        console.log(this.state.lastOrgId)
        const messageStr = JSON.stringify(message)
        let detailData = [].concat(this.state.detailData)
        const promise = service.getRecomConentData(messageStr)

        promise.then((json) => {

            if(json =='' && this.state.lastOrgId == '' ){
                this.setState({response:true,isLoading:false})
                return
            }
            if(json && JSON.parse(json).code ){
                this.setState({response:true,isLoading:false})
                return
            }
            if(json ==''){
                _this.setState({ // 同步还是异步
                    isLoading: false,
                    detailData: detailData,
                    detailLength:detailData.length-1,
                    messages: message,
                    isButton:false
                })
            }else {
                json = JSON.parse(json)
                _this.setState({datamessage: json, isLoading: false})
                _this.setState({lastOrgId: json.lastOrgId})
                if (detailData.length > 0) {
                    detailData = detailData.concat(json.orgList)
                } else {
                    detailData = json.orgList
                }
                // 获取到数据之后 去掉遮罩 ，加载数据提示去掉
                _this.setState({ // 同步还是异步
                    isLoading: false,
                    detailData: detailData,
                    detailLength:detailData.length-1,
                    messages: message,
                    isButton:false
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
    handleRecomContent =()=>{
        return (
            <div className = 'recomConented' ref="scroll_container">
                {this.state.detailData.map(this.handelRender)}
            </div>
        )
    }
    render() { // isloading ：数据没有获取到之前 显示数据加载，

        if(this.state.response ){
            return this.handleOrign()
        }

        return this.handleRecomContent()
    }
}
export default RecomConent