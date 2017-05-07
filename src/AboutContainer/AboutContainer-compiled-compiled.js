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

var _reactRouter = require('react-router');

var _levelMenu = require('../common/levelMenu/levelMenu.jsx');

require('./container.css');

var _industry = require('../data/industry.js');

var _AboutDetailIndustary = require('../AboutDetailIndutary/AboutDetailIndustary.js');

var _AboutDetailIndustary2 = _interopRequireDefault(_AboutDetailIndustary);

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
} /*
   * 联系我们容器组件
   * */

var uuu = navigator.userAgent;
var isIos = !!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) == true;
if (isIos) {
    window.webkit && window.webkit.messageHandlers.getIndustryList.postMessage(null);
    window.IndustryList = 111;
    window.handleFromIosData = function (getIndustryData) {
        IndustryList = getIndustryData || '没有获取到数 据';
        return IndustryList;
    };
}

var AboutContainer = function (_Component) {
    _inherits(AboutContainer, _Component);

    function AboutContainer(props) {
        _classCallCheck(this, AboutContainer);

        var _this = _possibleConstructorReturn(this, (AboutContainer.__proto__ || Object.getPrototypeOf(AboutContainer)).call(this, props));

        _this.getLianData = function () {
            // 拦截 android 和 ios 的 数据
            var uuu = navigator.userAgent;
            var isAndroid = uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
            var isIos = !!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) == true;
            if (isIos) {
                return window.IndustryList;
            } else if (isAndroid) {
                return window.androidJsInterface && window.androidJsInterface.getIndustry();
            }
        };

        _this.handleFocus = function () {
            //获取焦点的时候，弹出遮罩
            _this.setState({ userfocus: true });
        };

        _this.handlecancleMasks = function () {
            _this.setState({ userfocus: false });
        };

        _this.handleInputAbout = function (e) {
            _this.setState({ keyword: e.target.value });
        };

        _this.handleSubmit = function (event) {
            event.preventDefault();
            window.addEventListener('keyup', function (e) {
                if (e.keyCode == 13) {

                    if (_this.state.submit != _this.state.keyword) {
                        // 先赋值在改变，比较old 和 new
                        _this.setState({ submit: _this.state.keyword });
                    }
                }
            });
        };

        _this.handleUserMasker = function () {
            //遮罩问题
            return _react2.default.createElement('div', null, _react2.default.createElement('form', { onSubmit: _this.handleSubmit }, _react2.default.createElement('div', { className: 'top_SerachDetail' }, _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'SearchDetailContiner' }, _react2.default.createElement('span', null), _react2.default.createElement('input', { autoFocus: true, ref: 'keyword', type: 'search', placeholder: "\u8BF7\u8F93\u5165\u884C\u4E1A\u7C7B\u578B", value: _this.state.keyword,
                onChange: _this.handleInputAbout })), _react2.default.createElement('span', { onClick: _this.handlecancleMasks }, "\u53D6\u6D88")))), _react2.default.createElement('div', null, _react2.default.createElement(_AboutDetailIndustary2.default, { item: _this.state.submit })));
        };

        _this.handleJumpUp = function () {
            _reactRouter.browserHistory.push('/container/find');
        };

        _this.handleuserIndustry = function () {
            var styles = {
                provinceStyles: { width: '100%', boxSizing: 'border-box', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E1E1E1 ', overflow: 'hidden', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
                pHeight: { width: '86%', height: '4rem', lineHeight: '4rem', textIndent: '3rem', fontSize: '1.33rem', overflow: 'hidden', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }
            };
            return _react2.default.createElement('div', { className: 'industryContainer' }, _react2.default.createElement('div', { className: 'findSearch' }, _react2.default.createElement('div', { className: 'findbox' }, _react2.default.createElement('span', null), ' ', _react2.default.createElement('input', { onFocus: _this.handleFocus, ref: 'industrySearch', type: 'search', placeholder: "\u8BF7\u8F93\u5165\u884C\u4E1A\u7684\u7C7B\u578B" })), _react2.default.createElement('span', { onClick: _this.handleJumpUp }, "\u53D6\u6D88")), _react2.default.createElement('div', { className: 'containerIndustry' }, JSON.parse(_this.state.local).map(function (value, index) {
                return _react2.default.createElement(_levelMenu.Card, {
                    key: index,
                    icon: true,
                    content: _react2.default.createElement('p', { style: { height: '4rem', lineHeight: '4rem', paddingLeft: '2.42rem', backgroundColor: '#FFFFFF', fontSize: '1.33rem', overflow: 'hidden', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' } }, value.instryName),
                    iconStyle: { position: 'absolute', left: '1rem' },
                    expandedIcon: _react2.default.createElement('img', { src: require('../images/rotateUp.png'), style: { position: 'absolute' } }),
                    noexpandedIcon: _react2.default.createElement('img', { src: require('../images/right.png'), style: { position: 'absolute' } }),
                    contentStyle: styles.provinceStyles
                }, value.industryList.map(function (val, index) {
                    return _react2.default.createElement(_levelMenu.Card, {
                        key: index,
                        icon: true,
                        content: _react2.default.createElement('p', { style: styles.pHeight }, val.instryName),
                        handleIndutiyClick: function handleIndutiyClick() {
                            var Number = 1;
                            var region = JSON.parse(_this.props.params.region).selectRegion;
                            var keyword = JSON.parse(_this.props.params.region).keyword;

                            _reactRouter.browserHistory.push('/container/find/' + val.industryId + '+' + val.instryName + '+' + Number + '+' + region + '+' + keyword);
                        },
                        expandedIcon: _react2.default.createElement('img', { src: require('../images/graydown.png'), style: { width: '1.17rem', height: '0.67rem', marginLeft: '0.5rem', position: 'absolute', right: '1rem' } }),
                        noexpandedIcon: _react2.default.createElement('img', { src: require('../images/grayup.png'), style: { width: '1.17rem', height: '0.67rem', marginLeft: '0.5rem', position: 'absolute', right: '1rem' } }),
                        iconStyle: { position: 'absolute', right: '0rem', width: '14%', height: 'calc(100% - 1.5rem)' },
                        contentStyle: { paddingLeft: '3rem', boxSizing: 'border-box', backgroundColor: '#F5F5F5 ', borderBottom: '1px solid #E1E1E1' }
                    }, val.industryList.map(function (vv, ii) {

                        return _react2.default.createElement(_levelMenu.Card, {
                            key: ii,
                            icon: true,
                            content: _react2.default.createElement('p', { key: ii, style: { height: '4rem', lineHeight: '4rem', borderBottom: '1px solid #E1E1E1', textIndent: '3rem', fontSize: '1.33rem', color: '#666666', overflow: 'hidden', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' } }, vv.instryName),
                            handleIndutiyClick: function handleIndutiyClick() {
                                var region = JSON.parse(_this.props.params.region).selectRegion;
                                var keyword = JSON.parse(_this.props.params.region).keyword;
                                var Number = 1;
                                _reactRouter.browserHistory.push('/container/find/' + vv.industryId + '+' + vv.instryName + '+' + Number + '+' + region + '+' + keyword);
                            },
                            expandedIcon: _react2.default.createElement('b', { style: { width: '0px', height: '0px', marginTop: '18px' } }),
                            noexpandedIcon: _react2.default.createElement('b', { style: { width: '0px', height: '0px', marginTop: '18px' } })
                        });
                    }));
                }));
            })));
        };

        _this.state = {
            userfocus: false,
            keyword: '',
            submit: '',
            local: '',
            Cumulative: 1,
            handlePrompt: false
        };
        return _this;
    }

    _createClass(AboutContainer, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            document.title = '选择行业类型';
            this.setState({ local: this.getLianData.bind(this)() });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.userfocus) {
                return this.handleUserMasker();
            }

            return this.handleuserIndustry();
        }
    }]);

    return AboutContainer;
}(_react.Component);

exports.default = AboutContainer;

//# sourceMappingURL=AboutContainer-compiled.js.map

//# sourceMappingURL=AboutContainer-compiled-compiled.js.map