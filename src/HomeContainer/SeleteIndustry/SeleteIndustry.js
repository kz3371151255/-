/**
 * Created by cvtt on 2017/4/7.
 */

import React, { Component} from 'react'
import './selete.css'
import { Card } from '../../common/levelMenu/levelMenu.jsx'
import  service from  '../../services/movieService.js'
import {Industry} from'../../data/industry.js'
import {browserHistory} from 'react-router'

var uuu = navigator.userAgent;
var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
if(isIos){
    window.webkit && window.webkit.messageHandlers.getIndustryList.postMessage(null);
    window.IndustryList = 111;
    window.handleFromIosData = function(getIndustryData){
        IndustryList = getIndustryData || '没有获取到数 据'
        return IndustryList
    }
}
export default class SeleteIndustry extends Component {
       constructor (props){
            super(props)
         this.state ={
                setIndustryArr:[],
                local:'',
                changShow:true,
                totalShow:true,
                userId:JSON.parse(localStorage.getItem('localUserId')).userId,
                borderNone:'',
                message:{
                    type:'',
                    userId:JSON.parse(localStorage.getItem('localUserId')).userId,
                },
              }
       }
    componentWillMount(){ // 这里直接通过路由传递的useId值
        let selectIndustry = JSON.parse(this.props.params.userId)
        this.state.message.type = selectIndustry.type

        this.setState({userId:selectIndustry.userId})

        this.fetchSetIndustry()
        this.setState({local:this.getLianData.bind(this)()})


    }
    getLianData =()=>{// 拦截 android 和 ios 的 数据
        var uuu = navigator.userAgent;
        var isAndroid=uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
        var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
        if(isIos) {
            return window.IndustryList
        }else if(isAndroid){
            return   window.androidJsInterface && window.androidJsInterface.getIndustry()
        }
    }

    fetchSetIndustry =()=>{
          let  messageObj = Object.assign({},this.state.message)
          messageObj.userId =  JSON.parse(this.props.params.userId).userId

          let messageStr = JSON.stringify(messageObj)
          const promise = service.getFocusedIndustry(messageStr)
          promise.then((json)=>{
              if(json ==''){
                  return
              }
               json =  JSON.parse(json)
               this.setState({setIndustryArr:json.industryList})
          })
    }
    handleSetIndustry =(Id,Name)=>{
        let  handleSetObj = new Object()
             handleSetObj.industryId = Id
             handleSetObj.industryName = Name
             handleSetObj.userId = JSON.parse(this.props.params.userId).userId
             handleSetObj.onLine = true
        let  handleStr = JSON.stringify(handleSetObj)
        if(JSON.parse(this.props.params.userId).tralvel == 'tralvel') {
            browserHistory.push(`/container/movie/${handleStr}`)
        }else if(JSON.parse(this.props.params.userId).downStream  == 'downStream') {
            browserHistory.push(`/container/downstream/${handleStr}`)
        }else {
            browserHistory.push(`/container/home/${handleStr}`)
        }
    }
    handleDetailIndustry = (value,index)=>{ //index判断是不是最后一条数据是,是最后一条不添加边框
        return (
            <div onClick={this.handleSetIndustry.bind(this,value.industryId,value.industryName)} className={index == this.state.setIndustryArr.length-1 ?'detailBorderNone':'detailIndustry'} key={index}>{value.industryName}</div>
        )
    }
    handleChangeButtton =()=>{// 点击切换显示关注行业按钮
           this.setState({changShow:!this.state.changShow})
    }
    handleTotalButton = ()=>{
           this.setState({totalShow:!this.state.totalShow})
    }
    handleClickRefresh =()=>{
        let selectIndustry = JSON.parse(this.props.params.userId)
        this.state.message.type = selectIndustry.type

        this.setState({userId:selectIndustry.userId})
        this.fetchSetIndustry()

    }
    handleInternet =()=>{
        return<div className='internet' onClick={this.handleClickRefresh}>
            <div className='internetImage'>
                <img src={require('../../images/internet.png')} alt="网络断开链接请检查网络设置" title='网络断开链接请检查网络设置'/>
                <span>网络异常,请检查网络设置</span>
            </div>
        </div>
    }
    render(){

        const styles = {
            provinceStyles:{width:'100%',boxSizing:'border-box',backgroundColor:'#FFFFFF',borderBottom:'1px solid #e1e1e1',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis'},
            provinceTwoLevel:{width:'100%',paddingLeft:'3rem',boxSizing:'border-box',backgroundColor:'#f5f5f5',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis'},
            pHeight:{width:'82%',marginLeft:'4%',height:'4rem',lineHeight:'4rem',textIndent:'3rem',fontSize:'1.33rem',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis',borderBottom:'1px solid #e1e1e1'},
            pHeightTwolevel:{width:'86%',height:'4rem',lineHeight:'4rem',textIndent:'4rem',fontSize:'1.33rem',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis',borderBottom:this.state.currentBorder},

        }

        if(!window.navigator.onLine){
            return this.handleInternet()
        }
        return(
            <div className='concernedIdustry'>
                <div className='concernedSelect' onClick={this.handleChangeButtton}>
                    从关注行业中进行选择
                    <span className={this.state.changShow?'concernedShow':'conceredHidden'}></span>
                </div>
                <div className={this.state.changShow?'handleDetailShow':'handleDetailHidden'}>
                    { this.state.setIndustryArr.map(this.handleDetailIndustry)}
                </div>
                <div className='totalIndustry' onClick={this.handleTotalButton}>
                    从全部行业中选择
                    <span className={this.state.totalShow?'totalShow':'totalHidden'}></span>
                </div>
                <div className={this.state.totalShow?'industryMenuShow':'industryMenuHidden'}>
                    {
                        Industry.map((value, index)=> {
                            return <Card
                                key={index}
                                icon={true}
                                index={index}
                                content={ <p style={{height:'4rem',lineHeight:'4rem',paddingLeft:'2.42rem',backgroundColor:'#FFFFFF',fontSize:'1.33rem',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis',borderBottom:this.state.currentBorder}}>{value.instryName}</p>}
                                iconStyle={{position:'absolute',left:'1rem'}}
                                expandedIcon={<img src={require('../../images/rotateUp.png')} style={{position:'absolute'}} /> }
                                noexpandedIcon={<img src={require('../../images/right.png')} style={{position:'absolute'}} />}
                                contentStyle={styles.provinceStyles}
                                handleIndutiyClick ={(index,toggle)=>{ // toggle:false,箭头向下表示展开列表

                                        if(index == index ){// 当展开的时候,包裹子元素div标签的边框线,消失
                                            this.setState({currentBorder:'1px solid #e1e1e1'})

                                         }else if(toggle) {// 当toggle =true : 关闭列表的时候,当前p标签边框线取消,

                                             this.setState({currentBorder:'none'})
                                         }
                                }}
                                >
                                {
                                    value.industryList  &&  value.industryList.length > 0 &&  value.industryList.map((val, index)=> {
                                        return <Card
                                            key={index}
                                            icon={true}
                                            index={index}
                                            content={<p style={styles.pHeight}>{val.instryName}</p>}

                                            handleIndutiyClick = {(index,toggle)=>{
                                          if(index == index){
                                                         this.setState({currentBorder:'1px solid #e1e1e1'})
                                                }else if(toggle) {
                                                         this.setState({currentBorder:'none'})
                                                }

                                                if(typeof val.industryList == 'undefined' || val.industryList.length == 0){
                                                    let industryObj = new Object()
                                                        industryObj.industryId = val.industryId
                                                        industryObj.industryName = val.instryName
                                                        industryObj.industryMasks = 'true'
                                                        industryObj.userId = JSON.parse(this.props.params.userId).userId
                                                        let industryStr = JSON.stringify(industryObj)
                                                         if(JSON.parse(this.props.params.userId).tralvel == 'tralvel') {

                                                          browserHistory.push(`/container/movie/${industryStr}`)

                                                            }else if(JSON.parse(this.props.params.userId).downStream == 'downStream') {
                                                                browserHistory.push(`/container/downstream/${industryStr}`)
                                                          }else {
                                                                  browserHistory.push(`/container/home/${industryStr}`)
                                                           }
                                                }

                                             }}
                                            expandedIcon={<img src={require('../../images/grayup.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}  />}
                                            noexpandedIcon={<img src={require('../../images/graydown.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}/>}
                                            iconStyle={{position:'absolute',right:'0rem',width:'14%',height:'calc(100% - 1.5rem)',borderBottom:this.state.currentBorder}}
                                            contentStyle={styles.provinceTwoLevel}
                                            >
                                            {
                                                val.industryList  && val.industryList.length > 0 && val.industryList.map((vv, ii)=> {
                                                    return <Card
                                                        key={ii}
                                                        icon={true}
                                                        index={ii}
                                                        content={<p   style={styles.pHeightTwolevel}>{vv.instryName}</p>}
                                                        handleIndutiyClick = {(index,toggle)=>{

                                                       if(index == ii){  //通过方法,将当前索引进行回传,当点击当前的索引,显示边框
                                                              this.setState({currentBorder:'1px solid #e1e1e1'})
                                                         }else if(toggle) { // 当切换关闭当前元素时边框消失
                                                              this.setState({currentBorder:'none'})
                                                        }

                                                     if(typeof vv.industryList == 'undefined' || vv.industryList.length == 0){

                                                       let industryObj = new Object()
                                                        industryObj.industryId = vv.industryId
                                                        industryObj.industryName = vv.instryName
                                                        industryObj.industryMasks = 'true'
                                                        industryObj.userId = JSON.parse(this.props.params.userId).userId
                                                        let industryStr = JSON.stringify(industryObj)
                                                         if(JSON.parse(this.props.params.userId).tralvel == 'tralvel') {

                                                          browserHistory.push(`/container/movie/${industryStr}`)

                                                            }else if(JSON.parse(this.props.params.userId).downStream == 'downStream') {
                                                                browserHistory.push(`/container/downstream/${industryStr}`)
                                                          }else {
                                                                  browserHistory.push(`/container/home/${industryStr}`)
                                                           }
                                                     }

                                             }}
                                                        expandedIcon={<img src={require('../../images/grayup.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}  />}
                                                        noexpandedIcon={<img src={require('../../images/graydown.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}/>}
                                                        iconStyle={{position:'absolute',right:'0rem',width:'14%',height:'calc(100% - 1.5rem)',borderBottom:this.state.currentBorder}}
                                                        contentStyle={{paddingLeft:'rem',boxSizing:'border-box',backgroundColor:'#F5F5F5 ',borderBottom:'1px solid #E1E1E1'}}
                                                        >
                                                        {
                                                            vv.industryList && vv.industryList.length > 0  && vv.industryList.map((v, i)=> {

                                                                return <Card
                                                                    key={i}
                                                                    icon={true}
                                                                    index={i}
                                                                    content={ <p key={i}style={{height:'4rem',lineHeight:'4rem',borderBottom:'1px solid #E1E1E1',textIndent:'5.5rem',fontSize:'1.33rem',color:'#666666',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis'}}>
                                                       {v.instryName}
                                                    </p>}
                                                                    handleIndutiyClick = {(index,toggle)=>{

                                                        if(index == i){
                                                                  this.setState({currentBorder:'1px solid #e1e1e1'})
                                                           }else if(toggle) {
                                                                 this.setState({currentBorder:'none'})
                                                        }
                                                        let industryObj = new Object()
                                                        industryObj.industryId = v.industryId
                                                        industryObj.industryName = v.instryName
                                                        industryObj.industryMasks = 'true'
                                                        industryObj.userId = JSON.parse(this.props.params.userId).userId
                                                        let industryStr = JSON.stringify(industryObj)
                                                         if(JSON.parse(this.props.params.userId).tralvel == 'tralvel') {

                                                          browserHistory.push(`/container/movie/${industryStr}`)

                                                            }else if(JSON.parse(this.props.params.userId).downStream == 'downStream') {
                                                                browserHistory.push(`/container/downstream/${industryStr}`)
                                                          }else {
                                                                  browserHistory.push(`/container/home/${industryStr}`)
                                                           }
                                            }}

                                                                    >
                                                                </Card>

                                                            })
                                                        }
                                                    </Card>

                                                })
                                            }
                                        </Card>

                                    })
                                }
                            </Card>

                        })
                    }

                </div>
            </div>
        )

   }
}