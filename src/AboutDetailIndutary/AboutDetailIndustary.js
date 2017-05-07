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
            isLoading:true,
            datamessage:{},
            detailData:[],
            startWord:'',
            dataEmpty:false,
            messages:{
                keyword: '',
            }
        }
    }

    componentDidUpdate(){ //不断的监测检测state 和 props 变化

        if(this.props.item != this.state.startWord){ //先判断在赋值，当前的和之前的比较
            this.setState({startWord:this.props.item })
            this.fetch(this.props.item)

        }
    }

    fetch = (messages) => {

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
            if (detailData.length > 0) {
                detailData = detailData.concat(json.industryList)
            } else {
                detailData = json.industryList
            }
            // 获取到数据之后 去掉遮罩 ，加载数据提示去掉
            _this.setState({ // 同步还是异步
                isLoading: false,
                detailData: detailData,
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
         browserHistory.push(`/container/find/${industryId}+${industryName}+1`)
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
               <div className = 'findeResult' ref="scroll_container">
                   {this.state.detailData.map(this.handelRender)}
               </div>
           </div>
        )
    }
    render() { // isloading ：数据没有获取到之前 显示数据加载，
        if(this.state.isLoading){
            return this.handleRender()
        }
       if(this.state.dataEmpty){
               return this.handleOrign()
        }
        return this.handleRecomContent()
    }
}
export default AboutDetailIndustary