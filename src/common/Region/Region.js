/**
 * Created by cvtt on 2017/4/15.
 */
import React ,{Component} from 'react'
import './region.css'

 export  class Region extends Component {
        constructor(props){
            super(props)
            this.state ={
                expanded:false,
            }
        }
     render(){
               const {handleGetIndex,index,content,color,contentStyle,backgroundColor,displayJudge,fathContainerWidth,displayTotal,fontColor,twoLevelBackground,handleTotal,totalChangeBackground,twoLevelAll} = this.props

         return ( // 最高一级的宽度是变化的

             <div style={{width:fathContainerWidth,}}>
                 <div className='kkk' onClick={ (event) => {
                              event.stopPropagation()
                      handleGetIndex && handleGetIndex.bind(this,index)()
                      } }>
                     <div className={ totalChangeBackground || backgroundColor}  >
                         {content}
                     </div>
                 </div>
                     <div style={contentStyle} className='children'>
                         <div onClick ={(event)=>{ // 点击2级全部
                               event.stopPropagation()
                               handleTotal && handleTotal()
                         }}
                             style={{
                             width:'100%',height:'3.67rem',lineHeight:'3.67rem',display:displayTotal,color:fontColor,textIndent:'1rem',background:twoLevelBackground,borderBottom:twoLevelAll
                             }}

                             >全部</div>
                         {  displayJudge && this.props.children}
                     </div>

             </div>
         )

     }
}