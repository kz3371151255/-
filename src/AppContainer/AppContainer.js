/*
 * 根容器组件
 * */
import React, { Component } from 'react'
import { Link , browserHistory } from 'react-router'
import './appcss/app.css'
import service from '../services/movieService.js'
import SlideDemo from '../common/Slide/slideDemo.jsx'
import RecomConent from '../recomConent/recomConent.js'
import {pathParams}  from  '../js/config.js'
export default class AppContainer extends Component {
    constructor(props) {
        super(props)
        this.state={
            isLoading:false,
            carousel:true,
            location:'',
            userId:{
                origner:1,
                userId:10382
            },
            orginer:'',
            slider:'',
            sildersucess:false,
            responseSussess:false,
            imgDataResponse:false,
            imgData:'',
            containerBox:'',
            containerBoxRealse:false,
            refresh:false,
            messages:{
                x:9,
                y:9,
                osType:1
            },
            flag:0
        }
    }
  componentWillMount() {
      var messageStr = null ;
      if(this.props.location.query.userId){
          let message = new  Object()
          message.userId = parseInt(this.props.location.query.userId)
          messageStr = JSON.stringify(message)
          this.setState({userId: JSON.stringify(this.props.location.query)})
          var origner = new Object()
          let  localOrigner = JSON.parse(localStorage.getItem('localUserId')) || origner
          localOrigner.userId =parseInt(this.props.location.query.userId)
          localStorage.setItem('localUserId',JSON.stringify(localOrigner))
      }else {
          let localUserId = localStorage.getItem('localUserId')
          if(localUserId){
              let messagelocal = new Object()
              messagelocal.userId = parseInt(JSON.parse(localStorage.getItem('localUserId')).userId)
              messageStr = JSON.stringify(messagelocal)
              this.setState({userId: localStorage.getItem('localUserId')})
          }

      }

      this.fetch(messageStr)
        document.title = '找组织'
      //在页面的加载的时候的就请求轮播图的资源
      const promise =service.handleGetImgUrl('url',JSON.stringify({x:9,y:9,osType:1}))
      promise.then(json=>{
          json = JSON.parse(json)

          this.setState({imgDataResponse:true,imgData:json})
      }),reason =>{

      }

  }
    componentDidMount(){

        this.setState({containerBox:this.refs.containerBox,containerBoxRealse:true})
    }

    fetch =(message)=>{

        const promise = service.getisJoinOrg(message)
        promise.then((json)=> {
                alert
                 this.setState({responseSussess:true,isorigner:json})

        }),reason =>{

        }
    }
    getLianApp =(token)=>{
        browserHistory.push(`${token}${this.state.userId}`)
        /*var uuu = navigator.userAgent;
        var isIos = !!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) == true;
        if (isIos) {
            return webkit && window.webkit.messageHandlers.didLoadResource.postMessage(null)
        }*/
    }
    getFind =()=>{

         this.getLianApp(`/container/find/`)
    }
    upStreams =()=>{
         this.getLianApp(`/container/home/`)
    }
    travalStreams =()=>{
        this.getLianApp('/container/movie/')

    }
    downStreams =()=>{
        this.getLianApp('/container/downstream/')
           
    }
    handeleMasks =()=>{

            if(this.state.responseSussess){
                return (

                    <div className={this.state.isorigner == 0 ?'masksDisplay':'masksnone'}>
                        <div className='masksPrompt'>你尚未加入组织，暂不能进行此操作 </div>
                    </div>
                )
            }
    }

    renderFind =(a)=>{
        return (

                <div className='containerBox' ref='containerBox'>
                    <div className='container'>
                        <div className="app">
                            {this.state.responseSussess && this.handeleMasks()}
                            <div className='topSearch'>
                                <div className='search' onClick={this.getFind}>
                                    <span>&nbsp;按组织名称/行业类型/地区<img src={require('../images/serach.png')} alt=""/></span>
                                </div>
                            </div>
                            <div className="appheader">
                                <div className='upStreams' onClick={this.upStreams}>
                                    <div className='oneStream'><img src={require('../images/upStream.png')} alt=""/>
                                    </div>
                                    <a>找上游</a>
                                    <span></span>
                                </div>
                                <div className='travalStreams' onClick={this.travalStreams}>
                                    <div className='twoStream'><img src={require('../images/travel.png')} alt=""/></div>
                                    <a>找同行</a>
                                    <span></span>
                                </div>
                                <div className='downStreams' onClick={this.downStreams}>
                                    <div className='threeStream'><img src={require('../images/downStream.png')} alt=""/>
                                    </div>
                                    <a>找下游</a>
                                </div>
                            </div>
                            <div className='carousel'>
                                {this.state.imgDataResponse && <SlideDemo orginer={this.state.imgData}/> }
                            </div>
                            <div className='recommend'>
                                <span></span>
                                <span onClick={this.fetch.bind(this,JSON.stringify({userId:10147}))}>你要找的可能是他们  </span>

                                <div></div>
                            </div>
                            <div className='recomConent'>
                                {this.state.containerBoxRealse &&
                                <RecomConent pullUpLoading={this.state.containerBox} userId={this.state.userId}/>}
                            </div>
                        </div>
                    </div>
                </div>
        )

    }
    render() {

              return this.renderFind()

      }

}
