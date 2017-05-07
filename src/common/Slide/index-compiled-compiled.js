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

var _Sliders = require('./Sliders');

var _Sliders2 = _interopRequireDefault(_Sliders);

var _Dots = require('./Dots');

var _Dots2 = _interopRequireDefault(_Dots);

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
   * Slide
   */

var SlideInter;

var Slide = function (_Component) {
	_inherits(Slide, _Component);

	function Slide(props) {
		_classCallCheck(this, Slide);

		var _this = _possibleConstructorReturn(this, (Slide.__proto__ || Object.getPrototypeOf(Slide)).call(this, props));

		_this.state = {
			baseWidth: document.documentElement.clientWidth, //宽度
			startX: "",
			curX: "",
			moveX: "",
			time: 0,
			distance: 0, //移动距离
			swiper: 30, //滑动滚动触发距离
			index: 0,
			length: _this.props.opts.length,
			continuous: true, //是否循环滚动
			autoSlide: true,
			slideSpeed: 3000
		};

		_this.autoSlideFun = _this.autoSlideFun.bind(_this);
		return _this;
	}

	_createClass(Slide, [{
		key: 'touchStart',
		value: function touchStart(e) {
			this.setState({
				time: 0,
				startX: e.touches[0].pageX
			});
		}
	}, {
		key: 'touchMove',
		value: function touchMove(e) {
			if (this.state.autoSlide) {
				this.stopSlideFun();
			}
			var _curX = e.touches[0].pageX;
			var _moveX = _curX - this.state.startX;
			var _distance = -(this.state.index * this.state.baseWidth - _moveX);

			this.setState({
				curX: _curX,
				moveX: _moveX,
				time: 0,
				distance: _distance
			});
		}
	}, {
		key: 'touchEnd',
		value: function touchEnd(e) {
			if (Math.abs(this.state.moveX) <= this.state.swiper) {
				this.slideFun('', '.5');
			} else {
				if (this.state.moveX > this.state.swiper) {
					this.slideFun('prev', '.5');
				} else if (Math.abs(this.state.moveX) > this.state.swiper) {
					this.slideFun('next', '.5');
				}
			}

			this.setState({
				moveX: 0
			});
		}
		/**
   * index控制
   * @param  {num} go   指定index数值
   * @param  {num} time transition时间
   */

	}, {
		key: 'slideFun',
		value: function slideFun(go, time) {
			var _this2 = this;

			var _index = this.state.index;
			if (typeof go === "number") {
				_index = go;
			} else if (go == "next") {
				_index++;
			} else if (go == "prev") {
				_index--;
			}

			// 是否循环滚动
			if (this.state.continuous) {
				if (_index > this.state.length) {
					this.scrollFun(_index, time);
					//返回第一个
					_index = 1;
					setTimeout(function () {
						_this2.scrollFun(_index, 0);
						_this2.autoSlideFun();
						_this2.setState({
							index: _index
						});
					}, 500);
				} else if (_index < 1) {
					this.scrollFun(_index, time);
					//返回最后一个
					_index = this.state.length;
					setTimeout(function () {
						_this2.scrollFun(_index, 0);
						_this2.autoSlideFun();
						_this2.setState({
							index: _index
						});
					}, 500);
				} else {
					this.scrollFun(_index, time);
					this.setState({
						index: _index
					});
				}
			} else {
				if (_index >= this.state.length) {
					_index = 0;
				} else if (_index < 0) {
					_index = this.state.length - 1;
				}
				this.scrollFun(_index, time);
				this.setState({
					index: _index
				});
			}
		}

		/**
   * 滚动函数
   * @param  {num} index 指定滚动的index
   * @param  {num} time  transition的时间
   */

	}, {
		key: 'scrollFun',
		value: function scrollFun(index, time) {
			this.setState({
				time: time,
				distance: -(index * this.state.baseWidth)
			});
		}
	}, {
		key: 'autoSlideFun',
		value: function autoSlideFun() {
			var _this3 = this;

			if (this.state.autoSlide) {
				this.stopSlideFun();
				SlideInter = setInterval(function () {
					_this3.slideFun('next', '.5');
				}, this.state.slideSpeed);
			}
		}
	}, {
		key: 'stopSlideFun',
		value: function stopSlideFun() {
			clearInterval(SlideInter);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			//在 不在这个页面销毁轮播
			this.stopSlideFun();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			// 循环滚动 index+1

			if (this.state.continuous) {
				var newIndex = this.state.index + 1;
				this.setState({
					index: newIndex,
					distance: -(newIndex * this.state.baseWidth)
				});
			}
			this.autoSlideFun();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var opts = this.props.opts;

			var slideStyle = {
				width: document.documentElement.clientWidth * (opts.length + 2) + "px",
				WebkitTransform: 'translate3d(' + this.state.distance + "px,0,0)",
				transform: 'translate3d(' + this.state.distance + "px,0,0)",
				WebkitTranstion: "all " + this.state.time + "s",
				transition: "all " + this.state.time + "s"
			};

			var sliders = opts.map(function (item, i) {
				return _react2.default.createElement(_Sliders2.default, { sliderIndex: _this4.props.slider[i], id: item.src, link: item.link, src: item.src, key: i });
			});

			var dots = opts.map(function (item, i) {

				return _react2.default.createElement(_Dots2.default, { key: i, active: (_this4.state.continuous ? _this4.state.index - 1 : _this4.state.index) == i ? 'active' : '' });
			});

			return _react2.default.createElement('div', { className: 'slide-wrap' }, _react2.default.createElement('div', { className: 'slide-ul', style: slideStyle, onTouchStart: function onTouchStart(e) {
					return _this4.touchStart(e);
				}, onTouchMove: function onTouchMove(e) {
					return _this4.touchMove(e);
				}, onTouchEnd: function onTouchEnd(e) {
					return _this4.touchEnd(e);
				}, onTransitionEnd: function onTransitionEnd() {
					return _this4.autoSlideFun();
				} }, this.state.continuous ? _react2.default.createElement(_Sliders2.default, { sliderIndex: this.props.slider, link: opts[opts.length - 1].link, src: opts[opts.length - 1].src, picWidth: this.state.baseWidth }) : "", sliders, this.state.continuous ? _react2.default.createElement(_Sliders2.default, { sliderIndex: this.props.slider, link: opts[0].link, src: opts[0].src, picWidth: this.state.baseWidth }) : ""), _react2.default.createElement('div', { className: 'dots-wrap' }, opts.map(function (item, i) {
				return _react2.default.createElement(_Dots2.default, { key: i, active: (_this4.state.continuous ? _this4.state.index - 1 : _this4.state.index) == i ? 'active' : '' });
			})));
		}
	}]);

	return Slide;
}(_react.Component);

exports.default = (0, _reactCssModules2.default)(Slide, _style2.default);

//# sourceMappingURL=index-compiled.js.map

//# sourceMappingURL=index-compiled-compiled.js.map