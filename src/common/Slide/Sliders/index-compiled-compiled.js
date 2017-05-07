'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /**
   * Sliders
   */

var propTypes = {
	link: _react.PropTypes.string.isRequired,
	src: _react.PropTypes.string.isRequired
};

var defaultProps = {
	link: "javascript:;"
};

var Sliders = function (_Component) {
	_inherits(Sliders, _Component);

	function Sliders(props) {
		_classCallCheck(this, Sliders);

		var _this = _possibleConstructorReturn(this, (Sliders.__proto__ || Object.getPrototypeOf(Sliders)).call(this, props));

		_this.handleSilderIOSAndriod = function (indexEarch, t) {
			var IosMessage = Object.assign({}, _this.state.andriodIos);
			var jsonValue = _this.state.andriodIosArr;
			IosMessage.orgId = jsonValue.orgId;
			IosMessage.orgType = jsonValue.orgType;
			IosMessage.orgShortName = jsonValue.orgShortName;
			IosMessage.orgPortrait = jsonValue.orgPortrait;
			var strIosMessage = JSON.stringify(IosMessage);
			if (jsonValue.orgNetFlag == '1') {
				var uuu = navigator.userAgent;
				var isAndroid = uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
				var isIos = !!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) == true;
				if (isIos) {
					window.webkit && window.webkit.messageHandlers.gotoWebsite.postMessage(strIosMessage);
					return;
				} else if (isAndroid) {
					return window.androidJsInterface && window.androidJsInterface.lianWebMainActivityLauncher(jsonValue.orgShortName, jsonValue.orgPortrait, jsonValue.orgId.toString(), jsonValue.orgRelationType.toString(), jsonValue.orgType);
				}
			} else if (jsonValue.orgNetFlag == '0') {

				var uuu = navigator.userAgent;
				var isAndroid = uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
				var isIos = !!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) == true;
				if (isIos) {
					window.webkit && window.webkit.messageHandlers.gotoOrgDetail.postMessage(strIosMessage);
					return;
				} else if (isAndroid) {
					return window.androidJsInterface && window.androidJsInterface.intationOrgCardActivityLauncher(jsonValue.orgPortrait, jsonValue.orgId, jsonValue.orgType, jsonValue.orgShortName, jsonValue.orgFullName, '', '', jsonValue.orgIndustry);
				}
			}
		};

		_this.state = {
			andriodIosArr: {},
			sliderEarch: '',
			andriodIos: {
				orgId: '',
				orgType: '',
				orgShortName: '',
				orgPortrait: ''
			}
		};
		return _this;
	}

	_createClass(Sliders, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setState({ andriodIosArr: this.props.sliderIndex });
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.setState({ andriodIosArr: [] });
		}
	}, {
		key: 'render',
		value: function render() {
			var aStyles = {
				width: document.documentElement.clientWidth + "px"
			};
			var picStyles = {
				backgroundImage: "url(" + this.props.src + ")"
			};
			return _react2.default.createElement('a', { href: this.props.link, className: 'slide-a', style: aStyles }, _react2.default.createElement('div', { className: 'slide-li',
				style: picStyles,
				onClick: this.handleSilderIOSAndriod.bind(this)
			}));
		}
	}]);

	return Sliders;
}(_react.Component);

//Sliders.propTypes = propTypes
//Sliders.defaultProps = defaultProps

exports.default = (0, _reactCssModules2.default)(Sliders, _style2.default);

//# sourceMappingURL=index-compiled.js.map

//# sourceMappingURL=index-compiled-compiled.js.map