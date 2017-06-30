/**
 * Created by cvtt on 2017/3/27.
 */
/**
 * Created by cvtt on 2017/3/20.
 */
var uuu = navigator.userAgent;
var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
var isAndroid=uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
import React, { Component } from 'react'
import {browserHistory } from 'react-router'
import './css/Find.css'
import service from '../services/movieService.js'
import {RecomData} from '../recomConent/data/recom.js'
class RecomConent extends Component {
    constructor(props) {
        super(props)
        this.state={
            isLoading:true,
            datamessage:{},
            detailData:[],
            lastOrgId:'',
            response:false,
            detailLength:'',
            waitFlag:'none',
            messages:{
                keyword: '',
                industryId: '',
                region: '',
                count:20,
                beginOrgId:0,
                userId:JSON.parse(localStorage.getItem('localUserId')).userId
            }
        }
    }
    componentWillMount(){
       document.title = '搜索结果'
        window.handleGoBackHome =()=>{
            this.handleGoBackHome()
        }

    }
    componentDidMount(){
        let strMessages =  JSON.parse(this.props.params.strMessage)

            strMessages.userId = JSON.parse(localStorage.getItem('localUserId')).userId
        this.fetch(strMessages)
    }

    componentDidUpdate(){ //检测到state 和 props 变化就执行
        if(this.refs.scroll_container){
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
        if(NetFlag == '1'){ // 1 : 表示跳转联网站
            var uuu = navigator.userAgent;
            var isAndroid=uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
            var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
            if(isIos) {
                window.webkit && window.webkit.messageHandlers.gotoWebsite.postMessage(Strmess)
                return
            }else if(isAndroid){

                return  window.androidJsInterface && window.androidJsInterface.lianWebMainActivityLauncher(ShortName,Portrait,Id,RelationType,Type)
            }
        }else if(NetFlag == '0' ){ // 0 表示跳转组织明信片

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

                _this.fetch(this.state.messages,this.state.lastOrgId)
                _this.setState({isButton:true,waitFlag:'block'})
            }
        })
    }
    fetch = (messages,beginOrgId) => {

        var _this = this // 保存全局 this

        let message = Object.assign({}, messages)
        message.beginOrgId = this.state.lastOrgId && beginOrgId
        let detailData = [].concat(this.state.detailData)
        let strMessage  = JSON.stringify(message)
        const promise = service.getSearchResult(strMessage)
        promise.then((json) => { // 获取到数据遮罩去掉
            if(json =='' && this.state.lastOrgId == ''){
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
                    waitFlag:'none'
                })
            }
            json = JSON.parse(json)
            _this.setState({datamessage: json,lastOrgId: json.lastOrgId,waitFlag:'none'})

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
        }),reason =>{
            console.log(reason)
        }
    }

    handleOrign =()=>{
        return(
           <div>
                 <div className='FindOriginnoneOrgin'>
                     <div className='FindOriginnoneOrginImage' ref="scroll_container">
                         <img src={require('../images/empty.png')} alt=""/>
                         <span>暂无搜索结果</span>
                     </div>
                 </div>
           </div>
        )
    }
    handleLoading =()=>{
        return (
            <div className='isLoading'><img src={require("../images/isLoading.png")} alt=""/></div>
        )
    }
    handleClickRefresh =()=>{
        let strMessages =  JSON.parse(this.props.params.strMessage)
        strMessages.userId = JSON.parse(localStorage.getItem('localUserId')).userId
        this.fetch(strMessages)
    }
    handleInternet =()=>{
        return<div className='internet' onClick={this.handleClickRefresh}>
            <div className='internetImage'>
                <img src={require('../images/internet.png')} alt="网络断开链接请检查网络设置" title='网络断开链接请检查网络设置'/>
                <span>网络异常,请检查网络设置</span>
            </div>
        </div>
    }
    // 渲染数据方法中
    handelRender =(item,index)=>{
        if(item.orgPortrait == null ){
            var orgPortrait = require('../images/originImage.png')
        }else {
            orgPortrait = item.orgPortrait
        }
        return(
            <div className='findComponent' key={item && item.orgId } onClick={this.getLianDataCard.bind(this,item.orgPortrait,item.orgId,item.orgRelationType,item.orgType,item.orgShortName,item.orgFullName,'','',item.orgIndustry,item.orgNetFlag)}>
                <div className='componentImage' style={{background:'url('+orgPortrait+') no-repeat center center',backgroundSize:'3.33rem 3.33rem'}}></div>
                <span>{item.orgShortName}</span>
                <div className='address'>{item.officeAddressName}</div>
                <b></b>
                <div className={this.state.detailLength == index?'classBorderall':'classBorder'} ></div>
            </div>
        )
    }
    handleGoBackHome  = () =>{
        browserHistory.push(`/container/find`)
    }
    handleRecomContent =()=>{

        return (
          <div>
            <div className = 'findeResult' ref="scroll_container">
                {this.state.detailData.map(this.handelRender)}
                <div className='isLoadingwaitFlage' style={{display:this.state.waitFlag}}><img src={require("../images/isLoading.png")} alt=""/></div>
            </div>
        </div>
        )
    }
    render() { // isloading ：数据没有获取到之前 显示数据加载，

        if(!window.navigator.onLine){
            return this.handleInternet()
        }
         if(this.state.isLoading){
             return this.handleLoading()
         }
        if(this.state.response ){
            return this.handleOrign()
        }
        return this.handleRecomContent()
    }
}
export default RecomConent