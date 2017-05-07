// 项目入口文件
import React,{Component} from 'react'
import ReactDOM from 'react-dom'

import '../style/root.css'
import Routers from './Routers.js'
require('array-polyfill.js')  //解决数组的map 遍历的兼容问题的垫片
require('es6-object-assign').polyfill(); // 解决Object 对象的垫片
require('es6-promise').polyfill();
var axios = require('axios');
class Enter extends Component{
    render(){
        return <div style={{height:'100%',width:'100%'}}>
            {this.props.children}
        </div>
    }
}

export default Enter