/**
 * Created by saiwei on 2017/1/19.
 */

import React,{ Component } from 'react'
import './toggle.css'

export class Card extends Component{
    constructor(props){
        super(props)
        this.state = ({
            expanded : false
        })
    }
    render(){  // contentStyle 包裹子元素的盒子
        const { handleIndutiyClick , expanded , content , onExpandChange , style , className , contentStyle , icon , iconStyle, expandedIcon , noexpandedIcon,index,borderBottomStyle} = this.props
        var toggle = expanded != undefined ? expanded : this.state.expanded
        return <div className = { className && className } style={{position:'relative'}}>
            <div
                style={{width:'100%',margin:0,padding:0,boxSizing:'border-box',...style}}
                onClick = {() =>{
                    expanded == undefined
                    ?   this.setState({expanded:!this.state.expanded})
                        :   onExpandChange && onExpandChange.bind(this)
                } }
            >
                <div style={{position:'relative',height:'4rem'}}>
                    <div onClick={handleIndutiyClick && handleIndutiyClick.bind(this,index,toggle)}>{content}</div>

                    <span className="left_Icon" style = {iconStyle && {...iconStyle}}>
                        { icon && this.props.children && (toggle ? (expandedIcon ? expandedIcon : '↑') : (noexpandedIcon ? noexpandedIcon : '↓'))}
                    </span>
                </div>
            </div>
            <div style={contentStyle}>
                {
                    toggle && this.props.children
                }
            </div>
            <div style={borderBottomStyle && borderBottomStyle}></div>
        </div>
    }
}


