/*
 * 联系我们容器组件
 * */
import React,{ Component} from 'react'
import {browserHistory } from 'react-router'
import { Card } from '../common/levelMenu/levelMenu.jsx'
import './container.css'
import {Industry} from'../data/industry.js'
import AboutDetailIndustary from'../AboutDetailIndutary/AboutDetailIndustary.js'

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
export default class AboutContainer extends Component {
    constructor(props) {
        super(props)
        this.state={
            userfocus:false,
            keyword  :'',
            submit:'',
            local:'',
            Cumulative:1,
            handlePrompt:false,
            currentBorder:'none',
            childrenBorder:'1px solid #e1e1e1'
        }
    }
    componentWillMount (){
        document.title = '选择行业类型'
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
    handleFocus = ()=>{//获取焦点的时候，弹出遮罩
        this.setState({userfocus:true})
    }
    handlecancleMasks =()=>{
        this.setState({userfocus:false})
    }
    handleInputAbout =(e)=>{
        this.setState({keyword:e.target.value})
    }
    handleSubmit =(event)=>{
        event.preventDefault()
        window.addEventListener('keyup',(e)=>{
            if(e.keyCode ==13 ){

                if(this.state.submit != this.state.keyword){// 先赋值在改变，比较old 和 new
                    this.setState({submit:this.state.keyword})
                }
            }
        })
    }
    handleUserMasker =()=>{ //遮罩问题
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <div className='top_SerachDetail'>
                        <div>
                           <div className='SearchDetailContiner'>
                               <span></span>
                               <input autoFocus ref='keyword' type="search" placeholder='请输入行业类型' value={this.state.keyword}
                                      onChange={this.handleInputAbout} />
                           </div>
                            <span onClick={this.handlecancleMasks}>取消</span>
                        </div>
                    </div>
                </form>
                <div>
                    <AboutDetailIndustary item={this.state.submit}/>
                </div>
            </div>
        )
    }
    handleJumpUp = () =>{
        browserHistory.push(`/container/find`)
    }
    handleuserIndustry = ()=>{
        const styles = {
            provinceStyles:{width:'100%',boxSizing:'border-box',backgroundColor:'#FFFFFF',borderBottom:'1px solid #e1e1e1',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis'},
            provinceTwoLevel:{width:'100%',paddingLeft:'3rem',boxSizing:'border-box',backgroundColor:'#f5f5f5',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis'},
            pHeight:{width:'82%',marginLeft:'4%',height:'4rem',lineHeight:'4rem',textIndent:'3rem',fontSize:'1.33rem',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis',borderBottom:'1px solid #e1e1e1'},
            pHeightTwolevel:{width:'86%',height:'4rem',lineHeight:'4rem',textIndent:'4rem',fontSize:'1.33rem',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis',borderBottom:this.state.currentBorder},

        }
        return (
            <div className='industryContainer'>
                <div className='findSearch'>
                    <div className='findbox'>
                        <span></span> <input  onFocus ={this.handleFocus} ref='industrySearch' type="search" placeholder='请输入行业的类型' />
                    </div>
                    <span onClick={this.handleJumpUp}>取消</span>
                </div>
                <div className='containerIndustry'>
                    {
                        Industry.map((value, index)=> {
                            return <Card
                                key={index}
                                icon={true}
                                index={index}
                                content={ <p style={{height:'4rem',lineHeight:'4rem',paddingLeft:'2.42rem',backgroundColor:'#FFFFFF',fontSize:'1.33rem',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis',borderBottom:this.state.currentBorder}}>{value.instryName}</p>}
                                iconStyle={{position:'absolute',left:'1rem'}}
                                expandedIcon={<img src={require('../images/rotateUp.png')} style={{position:'absolute'}} /> }
                                noexpandedIcon={<img src={require('../images/right.png')} style={{position:'absolute'}} />}
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
                                            expandedIcon={<img src={require('../images/grayup.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}  />}
                                            noexpandedIcon={<img src={require('../images/graydown.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}/>}
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
                                                        expandedIcon={<img src={require('../images/grayup.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}  />}
                                                        noexpandedIcon={<img src={require('../images/graydown.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}/>}
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
    render() {
        if(this.state.userfocus){
            return this.handleUserMasker()

        }

        return this.handleuserIndustry()

    }
}

