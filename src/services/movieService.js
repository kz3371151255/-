/**
 * Created by cvtt on 2017/4/5.
 */
/*
 * 电影列表页面的service
 * */
import config from '../js/config.js'
import axios from '../../node_modules/axios'
export default { //  body:是用来发送请求参数
    getRecomConentData(message){ //请求下拉数据的方法
        const url='/lianzi/discover/recommendOrg'
        return new Promise((resolve,reject)=>{
            var xhr = new XMLHttpRequest()
            xhr.open("POST", url, true)
            xhr.setRequestHeader("Content-type","application/json");
            xhr.send(message)
            xhr.onreadystatechange = function(){
                var XMLHttpReq = xhr
                if (XMLHttpReq.readyState == 4) {
                    if (XMLHttpReq.status == 200) {
                        var text = XMLHttpReq.responseText;
                        resolve(text)
                    }
                    if(XMLHttpReq.status == 202){
                        var text = XMLHttpReq.responseText;
                        resolve(text)
                    }
                }
            }
        })
    },
    handleGetImgUrl(urll,message){ // 请求轮播图的方法
        const url='/lianzi/discover/getHomePageADInfo'
        return new Promise((resolve,reject)=>{
            var xhr = new XMLHttpRequest()
            xhr.open("POST", url,true)
            xhr.setRequestHeader("Content-type","application/json");
            xhr.send(message)
            xhr.onreadystatechange = function(){
                var XMLHttpReq = xhr
                if (XMLHttpReq.readyState == 4) {
                    if (XMLHttpReq.status == 200) {
                        var text = XMLHttpReq.responseText;
                        resolve(text)
                    }
                }
            }
        })
    },
    // 找组织搜索结果展示页面
    getSearchResult(message){
        const url = '/lianzi/discover/searchOrg'
        return new Promise((resolve,reject)=>{
            var xhr = new XMLHttpRequest()
            xhr.open("POST", url, true)
            xhr.setRequestHeader("Content-type","application/json");
            xhr.send(message)
            xhr.onreadystatechange = function(){
                var XMLHttpReq = xhr
                if (XMLHttpReq.readyState == 4) {
                    if (XMLHttpReq.status == 200) {
                        var text = XMLHttpReq.responseText;
                        resolve(text)
                    }
                }
            }
        })
    },
    getIndustrayDetail(message){ //行业内获取具体的行业
        const url = '/lianzi/discover/getIndustriesByKeyword'
        return new Promise((resolve,reject)=>{
            var xhr = new XMLHttpRequest()
            xhr.open("POST", url, true)
            xhr.setRequestHeader("Content-type","application/json");
            xhr.send(message)
            xhr.onreadystatechange = function(){
                var XMLHttpReq = xhr
                if (XMLHttpReq.readyState == 4) {
                    if (XMLHttpReq.status == 200) {
                        var text = XMLHttpReq.responseText;
                        resolve(text)
                    }
                }
            }
        })
    },
    getFocusedIndustry(message){ // 上游行业开始关注行业
        const url = '/lianzi/discover/getFocusedIndustryList'
      return  new Promise((resolve,reject)=>{
            var xhr = new XMLHttpRequest()
            xhr.open('POST',url,true)
            xhr.setRequestHeader('Content-type','application/json')
            xhr.send(message)
            xhr.onreadystatechange = ()=>{
                  var XMLHttpReq = xhr
                  if(XMLHttpReq.readyState == 4 ){
                        if(XMLHttpReq.status ==200){
                            var text = XMLHttpReq.responseText
                            resolve(text)
                        }
                        if(XMLHttpReq.status == 202){
                            var text = XMLHttpReq.responseText
                            resolve(text)
                        }
                      }
                 }
            }

        )
    },
    getisJoinOrg (message){ // 这里是的写 url 后面的路径
        const url='/lianzi/discover/isJoinOrg '
        return new Promise((resolve,reject)=>{
            var xhr = new XMLHttpRequest()
            xhr.open("POST", url, true)
            xhr.setRequestHeader("Content-type","application/json");
            xhr.send(message)
            xhr.onreadystatechange = function(){
                var XMLHttpReq = xhr
                if (XMLHttpReq.readyState == 4) {
                    if (XMLHttpReq.status == 200) {
                        var text = XMLHttpReq.responseText;
                        resolve(text)
                    }
                }
            }
        })
    },

    getOppositeIndustryList (message){ // 这里是的写 url 后面的路径
        const url='/lianzi/discover/getOppositeIndustryList '
        return new Promise((resolve,reject)=>{
            var xhr = new XMLHttpRequest()
            xhr.open("POST", url, true)
            xhr.setRequestHeader("Content-type","application/json");
            xhr.send(message)
            xhr.onreadystatechange = function(){
                var XMLHttpReq = xhr
                if (XMLHttpReq.readyState == 4) {
                    if (XMLHttpReq.status == 200) {
                        var text = XMLHttpReq.responseText;
                        resolve(text)
                    }
                }
            }
        })
    },


}
