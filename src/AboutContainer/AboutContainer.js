/*
 * 联系我们容器组件
 * */
import React,{ Component} from 'react'
import {browserHistory } from 'react-router'
import { Card } from '../common/levelMenu/levelMenu.jsx'
import './container.css'
import {Industry} from'../data/industry.js'
import AboutDetailIndustary from'../AboutDetailIndutary/AboutDetailIndustary.js'
import {rem} from'../js/rem.js'
var uuu = navigator.userAgent;
var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
var isAndroid=uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;

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
            childrenBorder:'1px solid #e1e1e1',
            cancleButton:'none',
            childHeight:'4rem',
        }
    }
    componentWillMount (){
        document.title = '选择行业类型'
       window.handleGoBackHome =()=>{
           this.handleGoBackHome()

       }
        if(isIos) {
            window.handleFromIosData = (industryData)=>{
                this.setState({local:industryData})
            }
            window.webkit && window.webkit.messageHandlers.getIndustryList.postMessage(null);

        }else if(isAndroid){
            return   window.androidJsInterface && this.setState({local:window.androidJsInterface.getIndustry()})
        }
    }
    componentDidMount(){
        document.documentElement.style.fontSize = innerWidth /31.25 +'px';
        window.onresize = function(){
            document.documentElement.style.fontSize = innerWidth /31.25 +'px';
        }
        this.refs.containerIndustry.addEventListener('touchstart',()=>{
                  this.setState({childHeight:'4.1rem'})

        })
    }
    componentDidUpdate(){
            window.handleGoBackHome =()=>{
                if(this.state.userfocus){ //获取焦点返回列表页面
                    this.handleAboutIndustry()
                }else{ // 没有返回搜索页面
                    this.handleGoBackHome()
                }
            }
   }
    handleFocus = ()=>{//获取焦点的时候，弹出遮罩
        this.setState({userfocus:true,keyword:''})
    }
    handleAboutIndustry =() =>{
        this.setState({userfocus:false,keyword:''})
    }
    handlecancleMasks =()=>{
        this.setState({userfocus:false,keyword:''})
    }
    handleInputAbout =(e)=>{
        this.setState({keyword:e.target.value})
        if(e.target.value !=''){
            this.setState({cancleButton:'block'})
        }else {
            this.setState({cancleButton:'none'})
        }
    }
    handleSubmit =(event)=>{
        event.preventDefault()
        window.addEventListener('keyup',(e)=>{
            if(e.keyCode ==13 ){
                  if(!this.state.keyword){
                      return
                  }
                if(this.state.submit != this.state.keyword){// 先赋值在改变，比较old 和 new
                    this.setState({submit:this.state.keyword})
                }

            }
        })
    }
    handlecancleButton =()=>{
        this.setState({keyword:'',cancleButton:'none'})
    }
    handleUserMasker =()=>{ //遮罩问题
        return (
            <div style={{overflow:'hidden'}}>

                <form onSubmit={this.handleSubmit} action='javascript:return true;'>
                    <div className='top_SerachDetail'>
                        <div>
                           <div className='SearchDetailContiner'>
                               <span></span>
                               <input autoFocus ref='keyword' type="search" placeholder='请输入行业类型' value={this.state.keyword}
                                      onChange={this.handleInputAbout}  />
                               <b onClick={this.handlecancleButton} style={{display:this.state.cancleButton}}></b>
                           </div>

                        </div>
                    </div>
                </form>
                <div>
                    <AboutDetailIndustary item={this.state.submit} transmit={this.props.params.region}/>
                </div>
            </div>
        )
    }
    handleGoBackHome  = () =>{ // 点击返回按钮将已经选中的结果进行回传设置

        var goBacK = JSON.parse(this.props.params.region)
        var keyword = goBacK.keyword
        var industryName = goBacK.industryName
        var industryId = goBacK.industryId
        var region = goBacK.region

        browserHistory.push(`/container/find/${industryId}+${industryName}+${1}+${region}+${keyword}`)
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

                <div className='top_SerachDetail'>
                    <div>
                        <div className='SearchDetailContiner'>
                            <span></span>
                            <input  onFocus ={this.handleFocus} ref='industrySearch' type="search" placeholder='请输入行业类型' />
                        </div>
                    </div>
                </div>

                <div className='containerIndustry' ref = 'containerIndustry'>
                    {
                        this.state.local && JSON.parse(this.state.local).map((value, index)=> {
                            return <Card
                                key={index}
                                icon={true}
                                index={index}
                                childHeight={this.state.childHeight}
                                content={ <p style={{height:'4rem',lineHeight:'4rem',paddingLeft:'2.42rem',
backgroundColor:'#FFFFFF',fontSize:'1.33rem',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis',borderBottom:this.state.currentBorder}}>{value.instryName}</p>}
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
                                    value.industryList && value.industryList.length > 0  && value.industryList.map((val, index)=> {
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
                                                      let region = JSON.parse(this.props.params.region).region
                                                      let keyword = JSON.parse(this.props.params.region).keyword

                                                    browserHistory.push(`/container/find/${val.industryId}+${val.instryName}+${Number}+${region}+${keyword}`)
                                             }}
                                            expandedIcon={<img src={require('../images/grayup.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}  />}
                                            noexpandedIcon={<img src={require('../images/graydown.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}/>}
                                            iconStyle={{position:'absolute',right:'0rem',width:'14%',height:'calc(100% - 1.5rem)',borderBottom:this.state.currentBorder}}
                                            contentStyle={styles.provinceTwoLevel}
                                            >
                                            {
                                                val.industryList && val.industryList.length>0  && val.industryList.map((vv, ii)=> {
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
                                                      let region = JSON.parse(this.props.params.region).region
                                                      let keyword = JSON.parse(this.props.params.region).keyword

                                                    browserHistory.push(`/container/find/${vv.industryId}+${vv.instryName}+${Number}+${region}+${keyword}`)
                                             }}
                                                        expandedIcon={<img src={require('../images/grayup.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}  />}
                                                        noexpandedIcon={<img src={require('../images/graydown.png')}style={{width:'1.17rem',height:'0.67rem',marginLeft:'0.5rem',position:'absolute',right:'1rem'}}/>}
                                                        iconStyle={{position:'absolute',right:'0rem',width:'14%',height:'calc(100% - 1.5rem)',borderBottom:this.state.currentBorder}}
                                                        contentStyle={{paddingLeft:'rem',boxSizing:'border-box',backgroundColor:'#F5F5F5 ',borderBottom:'1px solid #E1E1E1'}}
                                                        >
                                                        {
                                                            vv.industryList &&  vv.industryList.length >0 && vv.industryList.map((v, i)=> {

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
                                                         let region = JSON.parse(this.props.params.region).region
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

/*
import React,{ Component} from 'react'
import {browserHistory } from 'react-router'
import { Card } from '../common/levelMenu/levelMenu.jsx'
import './container.css'
import {Industry} from'../data/industry.js'
import AboutDetailIndustary from'../AboutDetailIndutary/AboutDetailIndustary.js'
var uuu = navigator.userAgent;
var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
var isAndroid=uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;

export default class AboutContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userfocus: false,
            keyword: '',
            submit: '',
            local: '',
            Cumulative: 1,
            handlePrompt: false,
            currentBorder: 'none',
            childrenBorder: '1px solid #e1e1e1',
            cancleButton: 'none',
        }
    }

    render(){
        return  (
            <div style={{width:'80%',height:'300px',overflowY:'scroll',overflowX:'hidden',position:'absolute'}}>
                 <ul>
                    <li>11</li>
                    <li>11</li>
                    <li>11</li>
                    <li>11</li>
                    <li>11</li>
                    <li>11</li>
                    <li>11</li>
                    <li>11</li>
                    <li>11</li>
                    <li>11</li>
                 </ul>
            </div>

        )
    }

}*/
