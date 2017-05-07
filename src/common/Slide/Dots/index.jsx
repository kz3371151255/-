/**
 * slide dots 指示器
 */

import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './style.css'

class Dots extends Component {
	render() {
		return
			<span className={this.props.active+'dots'} />

	}
}

export default CSSModules(Dots, styles)