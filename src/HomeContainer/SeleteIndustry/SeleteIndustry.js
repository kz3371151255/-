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
    render(){

        const styles = {
            provinceStyles:{width:'100%',boxSizing:'border-box',backgroundColor:'#FFFFFF',borderBottom:'1px solid #e1e1e1',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis'},
            provinceTwoLevel:{width:'100%',paddingLeft:'3rem',boxSizing:'border-box',backgroundColor:'#f5f5f5',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis'},
            pHeight:{width:'82%',marginLeft:'4%',height:'4rem',lineHeight:'4rem',textIndent:'3rem',fontSize:'1.33rem',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis',borderBottom:'1px solid #e1e1e1'},
            pHeightTwolevel:{width:'86%',height:'4rem',lineHeight:'4rem',textIndent:'4rem',fontSize:'1.33rem',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis',borderBottom:this.state.currentBorder},

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
                                    value.industryList.map((val, index)=> {
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
                                                      let Number = 1 ;
                                                      let region = JSON.parse(this.props.params.region).selectRegion
                                                      let keyword = JSON.parse(this.props.params.region).keyword

                                                    browserHistory.push(`/container/find/${val.industryId}+${val.instryName}+${Number}+${region}+${keyword}`)
                                             }}
                                            expandedIcon={<img src={require('../../images/grayup.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}  />}
                                            noexpandedIcon={<img src={require('../../images/graydown.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}/>}
                                            iconStyle={{position:'absolute',right:'0rem',width:'14%',height:'calc(100% - 1.5rem)',borderBottom:this.state.currentBorder}}
                                            contentStyle={styles.provinceTwoLevel}
                                            >
                                            {
                                                val.industryList.map((vv, ii)=> {
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

                                                      let Number = 1 ;
                                                      let region = JSON.parse(this.props.params.region).selectRegion
                                                      let keyword = JSON.parse(this.props.params.region).keyword

                                                    browserHistory.push(`/container/find/${vv.industryId}+${vv.instryName}+${Number}+${region}+${keyword}`)
                                             }}
                                                        expandedIcon={<img src={require('../../images/grayup.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}  />}
                                                        noexpandedIcon={<img src={require('../../images/graydown.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}/>}
                                                        iconStyle={{position:'absolute',right:'0rem',width:'14%',height:'calc(100% - 1.5rem)',borderBottom:this.state.currentBorder}}
                                                        contentStyle={{paddingLeft:'rem',boxSizing:'border-box',backgroundColor:'#F5F5F5 ',borderBottom:'1px solid #E1E1E1'}}
                                                        >
                                                        {
                                                            vv.industryList && vv.industryList.map((v, i)=> {

                                                                return <Card
                                                                    key={i}
                                                                    icon={true}
                                                                    index={i}
                                                                    content={ <p key={i}style={{height:'4rem',lineHeight:'4rem',borderBottom:'1px solid #E1E1E1',textIndent:'3rem',fontSize:'1.33rem',color:'#666666',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis'}}>
                                                       {v.instryName}
                                                    </p>}
                                                                    handleIndutiyClick = {(index,toggle)=>{

                                                        if(index == i){
                                                                  this.setState({currentBorder:'1px solid #e1e1e1'})
                                                           }else if(toggle) {
                                                                 this.setState({currentBorder:'none'})
                                                        }
                                                         let region = JSON.parse(this.props.params.region).selectRegion
                                                         let keyword = JSON.parse(this.props.params.region).keyword
                                         let Number = 1
                                                browserHistory.push(`/container/find/${v.industryId}+${v.instryName}+${Number}+${region}+${keyword}`)
                                            }}
                                                                    expandedIcon={<b style={{width:'0px',height:'0px',marginTop:'18px'}}></b>}
                                                                    noexpandedIcon={<b style={{width:'0px',height:'0px',marginTop:'18px'}}></b>}
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