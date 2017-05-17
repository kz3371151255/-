/**
 * Created by cvtt on 2017/4/6.
 */
/**
 * Created by saiwei on 2017/3/14.
 */
import React from 'react'
import service from '../../services/movieService.js'
import Slide from '../Slide'
import {SlideData} from './data/slideData.js'
class SlideDemo extends React.Component{
    state = {
        imgArr:[],
        getData:false,
        sliderStop:false
    }
    componentWillMount(){ // 在要找主页，将轮播图数据的加载完成
        this.props.orginer.orgHomePageADList.map(this.handleShowData)
    }
    componentDidMount(){
        const promise =service.handleGetImgUrl('url',JSON.stringify({x:9,y:9,osType:1}))
        promise.then(json=>{
            json = JSON.parse(json)
            return json.orgHomePageADList.map(this.handleShowData)
        }),reason =>{
            console.log(reason)
        }
    }
    handleShowData = (item)=>{
        var arr = this.state.imgArr
        arr.push(item)
        this.setState({imgArr:arr,getData:true})
    }
    componentWillUnmount(){
        this.setState({imgArr:[],getData:false})
    }
    handleStopSlider =(e)=>{
        e.stopPropagation()
        this.setState({sliderStop:true})
   }
    render(){
        var imgArr = this.state.imgArr
        const optss = []
        imgArr && imgArr.length>1 && imgArr.map((v,i)=>{
            let obj = new Object()
            obj.link = '#'
            obj.src = v.pictureUrl
            optss.push(obj)                
        })
        return <div className='soide' style={{width:'100%',height:'100%',overflow:'hidden'}}>
            {
                this.state.getData && optss.length>0 && <Slide opts={optss} slider={this.state.imgArr} onClick={this.handleStopSlider} />
            }
        </div>
    }
}
export default SlideDemo


