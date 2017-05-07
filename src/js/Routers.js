/*
* 路由配置文件
* */
import React, { Component } from 'react'
import { Router, Route,IndexRoute,Redirect, Link,hashHistory,browserHistory} from 'react-router'

import Enter from './enter.js'
import AppContainer from '../AppContainer/AppContainer.js'
import HomeContainer from '../HomeContainer/HomeContainer.js'
import MovieContainer from '../MovieContainer/MovieContainer.js'
import AboutContainer from '../AboutContainer/AboutContainer.js'
import FindOrganize   from '../findOrganize/FindOrganize.js'
import FindOriginResult from '../FindOriginResult/FindOriginResult.js'
import PickerDemo from '../selectData/picker/index.js'
import Downstream from '../Downstream/Downstream.js'
import SeleteIndustry from '../HomeContainer/SeleteIndustry/SeleteIndustry.js'
export default class Routers extends Component {

    render() {
        return (
            <Router history={browserHistory}>

                <Route path='/' component = {Enter}>
                    <IndexRoute component={AppContainer}
                                onEnter={()=>{
                              localStorage.removeItem('handleKeyResult')
                              localStorage.removeItem('userRegion')
                              localStorage.removeItem('userIndustry')
                              localStorage.removeItem('userInputLocal')
                              }}
                                onLeave={()=>{

                              localStorage.removeItem('userRegion')
                              localStorage.removeItem('userIndustry')
                              localStorage.removeItem('userInputLocal')
                                 }} />
                    <Router path='container'>
                        <Route path='home(/:homeUser)' component={HomeContainer}/>
                        <Router path='selIndustry(/:userId)' component={SeleteIndustry}/>
                        <Route path='movie(/:homeUser)' component={MovieContainer}/>
                        <Route path="about(/:region)" component={AboutContainer}/>
                        <Route path='find(/:instryName)' component={FindOrganize}/>
                        <Route path='finresult/:strMessage'  component ={FindOriginResult}/>
                        <Route path='downstream(/:homeUser)'  component ={Downstream}/>
                        <Route path='region(/:industry)' component={PickerDemo}></Route>
                    </Router>
                </Route>


            </Router>
        )
    }
}
