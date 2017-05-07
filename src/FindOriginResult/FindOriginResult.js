/**
 * Created by cvtt on 2017/3/27.
 */
/**
 * Created by cvtt on 2017/3/20.
 */

import React, { Component } from 'react'
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
    }
    componentDidMount(){
        let strMessages =  JSON.parse(this.props.params.strMessage)
        console.log(strMessages)
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
                _this.setState({isButton:true})
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
            if(json ==''){
                this.setState({response:true,isLoading:false})
                return
            }
            json = JSON.parse(json) || RecomData
            _this.setState({datamessage: json})
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
                messages: message,
            })
        }),reason =>{
            console.log(reason)
        }
    }

    handleOrign =()=>{
        return(
            <div className='FindOriginnoneOrgin'>
                <div className='FindOriginnoneOrginImage' ref="scroll_container">
                    <img src={require('../images/empty.png')} alt=""/>
                    <span>暂无搜索结果</span>
                </div>
            </div>
        )
    }
    // 渲染数据方法中
    handelRender =(item)=>{
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
                <div className='classBorder'></div>
            </div>
        )
    }
    handleRecomContent =()=>{
        return (
            <div className = 'findeResult' ref="scroll_container">
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