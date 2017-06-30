// 项目入口文件
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import '../style/root.css'
import Routers from './Routers.js'
ReactDOM.render(
    <div>
        <Routers/>
    </div>,

    document.getElementById('app')
)