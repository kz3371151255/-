// ��Ŀ����ļ�
import React,{Component} from 'react'
import ReactDOM from 'react-dom'

import '../style/root.css'
import Routers from './Routers.js'
require('array-polyfill.js')  //��������map �����ļ�������ĵ�Ƭ
require('es6-object-assign').polyfill(); // ���Object ����ĵ�Ƭ
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