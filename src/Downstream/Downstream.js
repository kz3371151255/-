/*
 * 首页容器组件
 * */
import React, { Component} from 'react'
import '../HomeContainer/Home/Home.css'
import service from '../services/movieService.js'
import {browserHistory} from 'react-router'
import UpstreamDetaildata from '../HomeContainer/UpstreamDetaildata/UpstreamDetaildata.js'
import {Region} from '../common/Region/Region.js'
import  {RegionData} from  '../data/region.js'

var uuu = navigator.userAgent;
var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
if(isIos){
    window.webkit && window.webkit.messageHandlers.getAreaList.postMessage(null);
    window.txt = 111;
    window.handleAreaFromIosData  = function(getArea){
        txt = getArea || '没有获取到数 据'
        return txt
    }
}

export default class Downstream extends Component {
    constructor(props) {
        super(props)
        this.state={
            rotateArr:false,
            rotateRegion:false,
            setIndustryArr:{},
            setIndustry:'',
            setIndustryId:'',
            region:'',
            regionId:'',
            CorrespondingIndustry:[],
            setUpstreamIndustry:'',
            upStreamNumber:1,
            local:'',
            fathContainerWidth:'100%',
            clickIndex:null,
            regionDetail:null,
            regiondisplay:null,// 判断是在三等，还是二等分中间的竖线
            borderDisplay:'1px solid #E1E1E1', // 页面开始的时候一级显示整行,且下面有边框,点击一级没有下边框
            onLevel :'',// 点击一级二级每行有底边框
            currentIndex:'',// 点击事件判断当前索引
            FontColor:'#333',
            regionClear:'',// 当第一次选择地区的时候，把进入页面是的行业id 清空
            regionControl:true,
            twoLevelRegionControl:true,//点击第一级时候，第二级颜色全白显示
            percentThree:'33.33%',
            percentFive:'50%',
            userId:'',
            againuserId:'',
            backgroundLoad:'#fff',
            displayTotal:'none',
            backgroundColor:'#f5f5f5', // 全国设置的背景色
            fontSizecolor:'#333',// 全国设置字体颜色
            twoLevelBackgroundColor:'#f5f5f5', // 2级全部设置背景色
            twoLevelfontColor:'#333',//2 级全部设置字体颜色
            threeLevelBackgroundColor:'#fff',
            threelevelColor:'#333',
            newCurrent:'',//保存当前点击第一级的地区id
            regionFullname:'',//保存一级的地区名
            twoLevelCurrent:'', // 保存二级地区的id
            twoLevelRegionFullName:'',// 保存二级地区的名称
            threelevelFontColor:'#333', // 最后一级全部字体颜色
            threeLevelCurrentFontColor:'#333',
            totalChangeBackground:false,//当在选择的完二级地区,在选择全部这里用来清除选的二级地区
            oneLevelCountry:'1px solid #e1e1e1', // 一级地区上面的全国,在选择第一级地区的时候,全国边框要消除,选择全国，边框显示
            twoLevelAll:"1px solid #e1e1e1",// 选择二级全部的时候
            correspoingDownStream:'全部', // 下游行业 对应选择全部
            message:{
                type:2,
            },
            messages:{
                type:2, //点击对应下游type类型
                industryId:'',
            }
        }
    }
    componentWillMount(){ //通过路由传递 userId,用户的useId 肯定是有的
        let downObj = new Object()  // 页面初始的时候就要保证 类型
            downObj.type = 2
        this.setState({setIndustryArr:downObj})

        document.title = '找下游'
        let userProps = JSON.stringify(this.props.location.query)
        this.setState({userId:userProps,regiondisplay:'none',local:this.getLianData.bind(this)()})

        this.fetch(this.state.message)


    }

    getLianData =()=>{// 拦截 android 和 ios 的 数据
        var uuu = navigator.userAgent;
        var isAndroid=uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
        var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
        if(isIos) {
            return window.txt
        }else if(isAndroid){
            return   window.androidJsInterface &&  window.androidJsInterface.getArea()
        }
    }

    fetch =(message,internetFlag)=>{// 首次进入页面请求数据
        let messageObj = Object.assign({},message)

        let  locationuserId =  JSON.parse(localStorage.getItem('localUserId')).userId

        messageObj.userId = parseInt(locationuserId)

        let messageStr= JSON.stringify(messageObj)
        const promise = service.getFocusedIndustry(messageStr)
        promise.then((json)=> { // 将数组中的第一个设定为选择行业 homeUser 是设定行业模块传递过来的
                if( this.props.params.homeUser && JSON.parse(this.props.params.homeUser).industryId) {//选中了行业，就不要将请求的数据设置
                    let industrySelect = JSON.parse(this.props.params.homeUser)
                        industrySelect.type = 2
                        industrySelect.region = this.state.regionId

                    this.setState({setIndustry: industrySelect.industryName,setIndustryArr:industrySelect,setIndustryId:industrySelect.industryId,setUpstreamIndustry:this.state.correspoingDownStream})
                    return
                }

                if(json == ''){ // 相应数据为空不做处理
                    return
                }
                json = JSON.parse(json)
                let firstone = json.industryList[0]
                firstone.type = 2
                firstone.region = this.state.regionId
                if(internetFlag){
                    firstone.onLine = internetFlag
                }

                this.setState({setIndustry: json.industryList[0].industryName,setIndustryArr:firstone,setIndustryId:json.industryList[0].industryId,regionClear:json.industryList[0],setUpstreamIndustry:this.state.correspoingDownStream})
                // 当用户选中行业的时候

            }
        ),reason =>{
            console.log(reason)
        }
    }

    fetchUpstream =()=>{ //对应的下游行业请求
        let messageUpstream = Object.assign({},this.state.messages)
        if(messageUpstream.industryId != this.state.setIndustryId) { // 当前后要求请求的行业ID数据不相同的时候才发起请求
            /* messageUpstream.industryId = 'A0111000A'*/
            messageUpstream.industryId = this.state.setIndustryId
        }else {
            return
        }
        let  messageUpstreamStr = JSON.stringify(messageUpstream)
        const promiseUpstream = service.getOppositeIndustryList(messageUpstreamStr)
        promiseUpstream.then((json)=>{
            json = JSON.parse(json)
            if(json.industryList) {
                this.setState({CorrespondingIndustry:json.industryList})
            }
        })
    }

    handleCorresponding = (value,index)=>{ //对应上游行业遍历填充数据
        if( value !=null ){
            return (
                <div className='UpstreamIndustryContainer'>
                    <div className='UpstreamIndustry' key={index} onClick={this.handleSelectUpStream.bind(this,value.industryId,value.industryName)}>{value.industryName}</div>
                </div>

            )
        }

    }
    handleSelectUpStream = (industryId,industryName)=>{ //点击对应上游行业，将点击的那条行业,id,name作为参数,传递给子组件同时rotateArr=false ,对应上游行业收起，
        var handleSelectObj = new Object()
        handleSelectObj.industryId   = industryId
        handleSelectObj.industryName = industryName
        handleSelectObj.region = this.state.regionId
        handleSelectObj.type = 0 // 对应下游行业类型设置
        this.setState({setUpstreamIndustry:industryName,setIndustryArr:handleSelectObj,rotateArr:false})
    }

    handleSeleteIndustry =()=>{
        let userProps = JSON.stringify(this.props.location.query)
        let userId = JSON.parse(userProps).userId
        if(!JSON.parse(userProps).userId){
            userId = JSON.parse(this.props.params.homeUser).userId
            /*userId = 10382*/
        }
        let DownObj = new Object()
        DownObj.downStream = 'downStream'
        DownObj.userId = parseInt(userId)
        DownObj.type = 2
        let DownStr = JSON.stringify(DownObj)
        browserHistory.push(`/container/selIndustry/${DownStr}`)
    }
    handelUpstream =()=>{ //点击找上游，请求数据

        if(this.state.upStreamNumber == 1 || this.state.rotateArr) { // 当第一次放松请求rotateArr 还是false ,所以用 upStreamNumber=1 标记开始
            this.fetchUpstream()
        }
        this.setState({rotateArr:!this.state.rotateArr,rotateRegion:false,upStreamNumber:this.state.upStreamNumber++})
        if(this.state.upStreamNumber >5){ //避免总是点击，累积太大
            this.setState({upStreamNumber:2})
        }

    }
    regionUpstream =()=>{ //点击选择地区按钮，回到初始值

        this.setState({rotateRegion:!this.state.rotateRegion,rotateArr:false,regionControl:true})

    }
    handleTwoLevel =(index,id,fullname,ischildren)=>{

        if(ischildren == 0){
            let regionObj = Object.assign({},this.state.setIndustryArr)
            regionObj.region = id
            this.setState({currentIndex:index,setIndustryArr:regionObj,region:fullname,regionId:id,rotateRegion:false,regionControl:true})
        }
    }
    handleCurrentIndex =(index,id,fullname) =>{ //最后一级,对应显示当前颜色:通过点击事件传递当前索引,在点击事件里面将对应的索引保存在currentIndex 中，在遍历循环的时候，判断currentIndex ,来判断是否是当前

        let regionObj = Object.assign({},this.state.setIndustryArr)
        regionObj.region = id
        this.setState({currentIndex:index,setIndustryArr:regionObj,region:fullname,regionId:id,rotateRegion:false,regionControl:true,threelevelColor:'#333',threelevelFontColor:'#333',threeLevelCurrentFontColor:false,totalChangeBackground:false,twoLevelBackgroundColor:'#f5f5f5',twoLevelfontColor:'#333 ',twoLevelAll:'none'})
        // threeLevelCurrentFontColor : 当选中三级地区的时候，这里用的是短路运算，否定前面，执行被选中的
    }
    handleCountry =()=>{ // 点击全国地区发送空的字符串
        let regionObj = Object.assign({},this.state.setIndustryArr)
        regionObj.region = ''
        this.setState({setIndustryArr:regionObj,region:'全国',rotateRegion:false,regionControl:true,backgroundColor:'#fff',fontSizecolor:'#00A0E9',clickIndex:null,fathContainerWidth:'100%',displayTotal:'none',threeLevelDisplay:'none',regiondisplay:'none',threelevelFontColor:'#333',oneLevelCountry:'1px solid #e1e1e1'})
        /*fathContainerWidth:'100%',displayTotal:'none' 在点击选中全国的时候,一级地区width:100%,整平幕显示,displayTotal:'none' 二级头上的全部进行隐藏 threeLevelDisplay : 三级地区全部隐藏 regiondisplay: 用户在选择到最后一级突然选择了全国，此时最后一级隐藏*/
    }
    handleThreeLevel =()=>{ // 点击选择最后的那个一级全部,将二级地区发送过去

        let regionObj = Object.assign({},this.state.setIndustryArr)
        regionObj.region = this.state.twoLevelCurrent
        this.setState({setIndustryArr:regionObj,region:this.state.twoLevelRegionFullName,regionId:this.state.twoLevelCurrent,rotateRegion:false,regionControl:true,rotateArr:false,threelevelFontColor:"#00A0E9",twoLevelfontColor:'#333',twoLevelBackgroundColor:'#f5f5f5',threeLevelCurrentFontColor:'#333',totalChangeBackground:false,threelevelColor:'#00a0e9',twoLevelAll:'none'}) // 点击三级全部，二级选中的全部，清除出样式
        //threeLevelCurrentFontColor : 在点击三级地区全部的时候,三级地区对应的地区,标记为未选中,（即字体颜色为黑色）
    }
    handleClickRefresh =(internetFlag)=>{
        this.fetch(this.state.message,internetFlag)
    }
    handleInternet =()=>{
        return<div className='internet' onClick={this.handleClickRefresh}>
            <div className='internetImage'>
                <img src={require('../images/internet.png')} alt="网络断开链接请检查网络设置" title='网络断开链接请检查网络设置'/>
                <span>网络异常,请检查网络设置</span>
            </div>
        </div>
    }
    render() {
        const  style = {
            threeLevelRegion:{
                borderBottom:'1px solid #e1e1e1',height:'3.67rem',lineHeight:'3.67rem',textIndent:'1rem',color:this.state.threelevelFontColor,background:this.state.threeLevelBackgroundColor
            }
        }

        if(!window.navigator.onLine){
            return this.handleInternet()
        }
        return (
            <div className='upStream'>
                <div className='upStreamTopbox'>
                    <div className='selectIndustry'>
                        <span>{this.state.setIndustry}</span> <span onClick={this.handleSeleteIndustry}>选择行业</span>
                    </div>
                    <div className='Corresponding'>
                        <span className={this.state.rotateArr?'rotateUp':'rotateDown'} onClick={this.handelUpstream}>对应下游行业  </span>
                        <span className={this.state.rotateRegion?'regionUp':'regionDown'} onClick={this.regionUpstream}>地区
                            </span>
                    </div>
                    <div className='default'>
                        <div className='default_left whitepoint'>
                            <span style={{overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis',fontSize:'1rem',color: '#999'}}>{this.state.setUpstreamIndustry == ''?'全部':this.state.setUpstreamIndustry}</span>
                        </div>
                        <div className='streamBorder'></div>
                        <div className='default_right'>
                            <span style={{overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis',fontSize:'1rem',color: '#999'}}>{this.state.region == ''?'全国':this.state.region}</span>
                        </div>
                    </div>
                </div>
                <div onClick={()=>{this.setState({rotateArr:false,rotateRegion:false})}}  className={this.state.rotateArr?'responseIndustryBlock':'responseIndustryNone'}>
                    <div className='resopnseIndustry'>
                        <div className= 'correspondAll' onClick={this.fetch.bind(this,this.state.message)} >{this.state.correspoingDownStream}</div>
                        {  this.state.CorrespondingIndustry.length<1?'' :
                            this.state.CorrespondingIndustry.map(this.handleCorresponding)
                        }
                    </div>
                </div>
                <div  onClick={()=>{this.setState({rotateArr:false,rotateRegion:false})}}  className={this.state.rotateRegion?'responseIndustryBlock':'responseIndustryNone'}>
                    <div className='RegionSet'>
                        <div className='RegionSetContainer'>
                            <div onClick={(event)=>{event.stopPropagation();this.handleCountry()}}   style={{width:this.state.fathContainerWidth,background:this.state.backgroundColor,height:'3.67rem',lineHeight:'3.67rem',color:this.state.fontSizecolor,fontSize:'1.17rem',textIndent:'1rem',borderBottom:this.state.oneLevelCountry}}>全国</div>
                            {
                                RegionData.map((value,indexs)=>{
                                    return (
                                        <Region
                                            key={indexs}
                                            index = {indexs} //当前索引
                                            fathContainerWidth = {this.state.fathContainerWidth} //最外层设置宽度
                                            content={<p style={{height:'3.63rem',borderBottom:this.state.borderDisplay,lineHeight:'3.63rem',textIndent:'1rem',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis'}}>{value.fullname}</p>}
                                            displayTotal =  {this.state.displayTotal} //在没有点击一级地区的时候,隐藏二级上面的全部,因为二级的全部样式的层级高于一级全国,全国被覆盖
                                            twoLevelAll = {this.state.twoLevelAll}
                                            backgroundColor = {this.state.clickIndex == indexs ? 'displayClass' : 'noneClass'}
                                            fontColor = {this.state.twoLevelfontColor}
                                            twoLevelBackground = {this.state.twoLevelBackgroundColor}
                                            displayJudge ={this.state.clickIndex == indexs ? true:false}
                                            handleTotal = {()=>{ // newCurrent: 保存一级id;当选择全部将一级的id 发送过去

                                                  let newCurrent = Object.assign({},this.state.setIndustryArr)
                                                  newCurrent.region = this.state.newCurrent

                                                  this.setState({twoLevelBackgroundColor:'#fff',twoLevelfontColor:'#00A0E9',setIndustryArr:newCurrent,rotateArr:false,rotateRegion:false,region:this.state.regionFullname,regionId:this.state.newCurrent,threelevelFontColor:'#333',totalChangeBackground:true,threeLevelCurrentFontColor:'#333',twoLevelAll:'1px solid #e1e1e1',oneLevelCountry:'none'})
                                            }}
                                            handleGetIndex = {(clickIndex) => {//当第一级点击的时候，子级宽50%,点击事件判断是不是当前的
                                                 //在点击第一级地区的时候，提前将行业Id,设置到要发送的数据上

                                                 this.setState({clickIndex:clickIndex,SonClcikIndex:null,fatContainerLeft:this.state.percentFive,fathContainerWidth:this.state.percentFive,regionDetail:null,regiondisplay:'none',borderDisplay:'none',onLevel:'1px solid #E1E1E1',twoLevelRegionControl:true,displayTotal:'block',backgroundColor:'#f5f5f5',fontSizecolor:'#333',newCurrent:value.id,regionFullname:value.fullname,twoLevelBackgroundColor:'#f5f5f5',twoLevelfontColor:'#333',oneLevelCountry:'none',twoLevelAll:'1px solid #e1e1e1'})

                                                 }
                                      }
                                            contentStyle={{position:'absolute',left:this.state.fatContainerLeft,width:this.state.fathContainerWidth,top:'0px',maxHeight:'28rem',overflowScrolling:'touch',overflowX:'hidden',background:'#FFFFFF',borderLeft:'1px solid #e1e1e1'}}
                                            >
                                            {

                                                value.areaList.map((val,ind)=>{//当点击第二级的时候，有后代字迹宽变为33% ，没有还是保持50%

                                                    return (
                                                        <div >
                                                            <Region
                                                                key={ind}
                                                                index={ind}
                                                                totalChangeBackground = {this.state.totalChangeBackground?'noneClass':false}
                                                                backgroundColor ={this.state.SonClcikIndex == ind ? 'displayClass' : 'noneClass'}                               backgroundControl ={this.state.twoLevelRegionControl == true ? 'displayClasswhite':false }

                                                                displayJudge ={this.state.SonClcikIndex == ind ? true:false}
                                                                handleGetIndex = {(sonindex)=>{//点击第二级,清空第三级颜色设置 在次点击二级地区,totalChangeBackground:false,二级地区就会被重新选中，因为totalChangeBackground 不执行了执行 backgroundColor
                                                                    this.setState({regionDetail:val.areaList,onLevel:'',currentIndex:null,twoLevelCurrent:val.id,twoLevelRegionFullName:val.fullname,totalChangeBackground:false,twoLevelAll:'none'})
                                                          if(val.areaList.length >0){ //当有子元素的时候
                                                              this.setState({SonClcikIndex:sonindex,fatContainerLeft:this.state.percentThree,fathContainerWidth:this.state.percentThree,geIndex:null,regiondisplay:'block',twoLevelRegionControl:false,twoLevelBackgroundColor:'#f5f5f5',twoLevelfontColor:'#333 ',threeLevelDisplay:'block',threelevelFontColor:'#333'})
                                                          }else {
                                                             this.setState({SonClcikIndex:sonindex,fatContainerLeft:this.state.percentFive,fathContainerWidth:this.state.percentFive,geIndex:null,regiondisplay:'none',twoLevelBackgroundColor:'#f5f5f5',twoLevelfontColor:'#333 '})
                                                          }

                                                  }}
                                                                content={<p  style={{height:'3.63rem',lineHeight:'3.63rem',borderBottom:this.state.onLevel,textIndent:'1.08rem',overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis',borderLeft:'1px solid #e1e1e1'}} onClick={this.handleTwoLevel.bind(this,ind,val.id,val.fullname,val.areaList.length)}>{val.fullname}</p>}

                                                                contentStyle={{position:'absolute',left:'100%',top:'0px',width:'100%',zIndex:88,height:'28rem',overflowY:'scroll'}}
                                                                >
                                                            </Region>
                                                        </div>
                                                    )

                                                })
                                            }
                                        </Region>

                                    )
                                })
                            }
                            <div style={{position:'absolute',top:'0rem',right:'0px',width:'33.3%',height:'28rem',overflowY:'scroll',overflowScrolling:'touch',background:'#fff',display:this.state.regiondisplay,borderLeft:'1px solid #e1e1e1'}}>   <div style={style.threeLevelRegion} onClick={(event)=>{event.stopPropagation();this.handleThreeLevel()}} >全部</div>
                                {this.state.regionDetail?this.state.regionDetail.map((val,index)=>{

                                    var  FontColor = null; //点击当前当前颜色变蓝色 其他还是黑色
                                    this.state.currentIndex == index ? (FontColor = '#00A0E9'):(FontColor = '#333')
                                    return (
                                        <div key={index} style={{height:'3.63rem',lineHeight:'3.63rem',borderBottom:'1px solid  #e1e1e1',textIndent:'1rem',color:this.state.threeLevelCurrentFontColor||FontColor,overflow: 'hidden', display:'block', whiteSpace:'nowrap', textOverflow:'ellipsis' }} onClick={(event)=>{event.stopPropagation();this.handleCurrentIndex.bind(this,index,val.id,val.fullname)()}} >{val.fullname}</div>
                                    )
                                }):""}

                            </div>
                        </div>
                    </div>
                </div>
                <div className='upStreamDetail'>
                    <UpstreamDetaildata upStreamArr ={this.state.setIndustryArr}/>
                </div>
            </div>
        )
    }
}
