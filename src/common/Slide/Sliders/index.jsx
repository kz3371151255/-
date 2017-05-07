/**
 * Sliders
 */
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './style.css'

const propTypes = {
	link: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired
}

const defaultProps = {
	link: "javascript:;"
}

class Sliders extends Component {
	constructor(props) {
		super(props)
		this.state = {
			andriodIosArr:{},
			sliderEarch:'',
			andriodIos:{
				orgId:'',
				orgType:'',
				orgShortName:'',
				orgPortrait:'',
			}
		}
	}
	componentDidMount(){
		this.setState({andriodIosArr:this.props.sliderIndex})
	}

	componentWillUnmount(){
		this.setState({andriodIosArr:[]})
	}
	handleSilderIOSAndriod =(indexEarch,t)=>{
		let IosMessage = Object.assign({},this.state.andriodIos)
		   let jsonValue = this.state.andriodIosArr
				IosMessage.orgId = jsonValue.orgId
				IosMessage.orgType =jsonValue.orgType
				IosMessage.orgShortName = jsonValue.orgShortName
				IosMessage.orgPortrait = jsonValue.orgPortrait
				let strIosMessage = JSON.stringify(IosMessage)
				if(jsonValue.orgNetFlag == '1'){
					var uuu = navigator.userAgent;
					var isAndroid=uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
					var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
					if(isIos) {
						window.webkit && window.webkit.messageHandlers.gotoWebsite.postMessage(strIosMessage)
						return
					}else if(isAndroid){
						return  window.androidJsInterface && window.androidJsInterface.lianWebMainActivityLauncher(jsonValue.orgShortName,jsonValue.orgPortrait,jsonValue.orgId.toString(),jsonValue.orgRelationType.toString(),jsonValue.orgType)

					}
				}else if(jsonValue.orgNetFlag == '0' ){

					var uuu = navigator.userAgent;
					var isAndroid=uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
					var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
					if(isIos) {
						window.webkit && window.webkit.messageHandlers.gotoOrgDetail.postMessage(strIosMessage)
						return
					}else if(isAndroid){
						return   window.androidJsInterface && window.androidJsInterface.intationOrgCardActivityLauncher(jsonValue.orgPortrait,jsonValue.orgId,jsonValue.orgType,jsonValue.orgShortName,jsonValue.orgFullName,'','',jsonValue.orgIndustry)

					}
				}

	}
	render() {
		var aStyles = {
			width: document.documentElement.clientWidth + "px"
		}
		var picStyles = {
			backgroundImage: "url(" + this.props.src + ")"
		}
		return (
			<a href={this.props.link} className="slide-a" style={aStyles}>
				<div className="slide-li"
					 style={picStyles}
					 onClick={this.handleSilderIOSAndriod.bind(this)}
					></div>
			</a>
		)
	}
}

//Sliders.propTypes = propTypes
//Sliders.defaultProps = defaultProps

export default CSSModules(Sliders, styles);