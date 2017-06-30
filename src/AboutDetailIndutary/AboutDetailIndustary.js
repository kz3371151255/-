/**
 * Created by cvtt on 2017/3/27.
 */
/**
 * Created by cvtt on 2017/3/20.
 */

import React, { Component } from 'react'
import service from '../services/movieService.js'
import './css/AboutDetailIndustary.css'
import {browserHistory } from 'react-router'

class AboutDetailIndustary extends Component {
    constructor(props) {
        super(props)
        this.state={
            datamessage:{},
            detailData:[],
            startWord:'',
            isLoading:false,  // 提示正在加载的图片
            dataEmpty:false,
            messages:{
                keyword: '',
            }
        }
    }
   componentWillMount(){
           window.handleGoBackHome =()=>{

           }
   }

    componentDidUpdate(){ //不断的监测检测state 和 props 变化

        if(this.props.item != this.state.startWord){ //先判断在赋值，当前的和之前的比较
            this.setState({startWord:this.props.item,isLoading:true }) // isLoading :搜索条件改变,加载图片在次显示提示
            this.fetch(this.props.item)

        }
    }

    fetch = (messages) => {
        if(messages == ''){
            this.setState({isLoading:false,dataEmpty:false })
            return
        }
        var _this = this // 保存全局 this
        let strMessage = Object.assign({},this.state.messages)
        strMessage.keyword = messages
        let finalMessage = JSON.stringify(strMessage)
        let detailData = [].concat(this.state.detailData)
        const promise = service.getIndustrayDetail(finalMessage)
        promise.then((json) => { // 获取到数据遮罩去掉

            if(json ==''){
                this.setState({dataEmpty:true,isLoading:false})
                return
            }
            json = JSON.parse(json) || RecomData

                detailData = json.industryList

            // 获取到数据之后 去掉遮罩 ，加载数据提示去掉
            _this.setState({ // 同步还是异步
                dataEmpty:false, // 当有的数据的时候,提示没有数据要收起
                detailData: detailData,
                isLoading:false
            })
        }),reason =>{
            console.log(reason)
        }
    }
    handleRender =()=>{
        return (
            <div className='loadDataAbout'>请输入行业类型</div>
        )
    }
    handleLoading =()=>{
        return (
            <div className='isLoading'><img src="../../images/isLoading.png" alt=""/></div>
        )
    }
    handleOrign =()=>{

        return(
            <div className='noneOrgin'>
                <div className='noneOrginImage' ref="scroll_container">
                    <img src={require('../images/empty.png')} alt=""/>
                    <span>暂无搜索结果</span>
                </div>
            </div>
        )
    }
    handleDetailRegion = (industryId,industryName,bind)=>{
         var goback = JSON.parse(this.props.transmit)
         var keyword = goback.keyword
         var region = goback.region
         browserHistory.push(`/container/find/${industryId}+${industryName}+${1}+${region}+${keyword}`)
    }
    // 渲染数据方法中
    handelRender =(item)=>{
        return(
            <div className='ComponentDetail' key={item && item.industryId } >
                <div className='ComponentItem' onClick={this.handleDetailRegion.bind(this,item.industryId,item.industryName)}>{item.industryName}</div>
                <div className='classBorder'></div>
            </div>
        )
    }
    handleRecomContent =()=>{
　　　　　　　　　
        return (
           <div className='aboutDetailContainer' >
               <div className = 'region' ref="scroll_container">
                   {this.state.detailData.map(this.handelRender)}
               </div>
           </div>
        )
    }
    handleClickRefresh =()=>{
            console.log(this.props.item)
            this.setState({startWord:this.props.item,isLoading:true}) // isLoading :搜索条件改变,加载图片在次显示提示
           if(this.props.item == ''){
                this.setState({isLoading:false,dataEmpty:false})
           }else {
               this.fetch(this.props.item)
           }


    }
    handleInternet =()=>{
        return<div className='internet' onClick={this.handleClickRefresh} style={{position:'fixed'}}>
            <div className='internetImage'>
                <img src={require('../images/internet.png')} alt="网络断开链接请检查网络设置" title='网络断开链接请检查网络设置'/>
                <span>网络异常,请检查网络设置</span>
            </div>
        </div>
    }
    render() {
        console.log(this.props.item)
        window.addEventListener('offline',()=>{
            return this.handleInternet()
            
        })

         if(this.state.isLoading){
            return  this.handleLoading()

         }
       if(this.state.dataEmpty){
               return this.handleOrign()
        }
        return this.handleRecomContent()
    }
}
export default AboutDetailIndustary