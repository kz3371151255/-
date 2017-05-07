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

require('./selete.css');

var _levelMenu = require('../../common/levelMenu/levelMenu.jsx');

var _movieService = require('../../services/movieService.js');

var _movieService2 = _interopRequireDefault(_movieService);

var _industry = require('../../data/industry.js');

var _reactRouter = require('react-router');

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
   * Created by cvtt on 2017/4/7.
   */

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

var SeleteIndustry = function (_Component) {
    _inherits(SeleteIndustry, _Component);

    function SeleteIndustry(props) {
        _classCallCheck(this, SeleteIndustry);

        var _this = _possibleConstructorReturn(this, (SeleteIndustry.__proto__ || Object.getPrototypeOf(SeleteIndustry)).call(this, props));

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

        _this.fetchSetIndustry = function () {
            var messageObj = Object.assign({}, _this.state.message);
            messageObj.userId = JSON.parse(_this.props.params.userId).userId;

            var messageStr = JSON.stringify(messageObj);
            var promise = _movieService2.default.getFocusedIndustry(messageStr);
            promise.then(function (json) {
                if (json == '') {
                    return;
                }
                json = JSON.parse(json);
                _this.setState({ setIndustryArr: json.industryList });
            });
        };

        _this.handleSetIndustry = function (Id, Name) {
            var handleSetObj = new Object();
            handleSetObj.industryId = Id;
            handleSetObj.industryName = Name;
            handleSetObj.userId = JSON.parse(_this.props.params.userId).userId;
            var handleStr = JSON.stringify(handleSetObj);
            if (JSON.parse(_this.props.params.userId).tralvel == 'tralvel') {
                _reactRouter.browserHistory.push('/container/movie/' + handleStr);
            } else if (JSON.parse(_this.props.params.userId).downStream == 'downStream') {
                _reactRouter.browserHistory.push('/container/downstream/' + handleStr);
            } else {
                _reactRouter.browserHistory.push('/container/home/' + handleStr);
            }
        };

        _this.handleDetailIndustry = function (value, index) {
            //index判断是不是最后一条数据是,是最后一条不添加边框
            return _react2.default.createElement('div', { onClick: _this.handleSetIndustry.bind(_this, value.industryId, value.industryName), className: index == _this.state.setIndustryArr.length - 1 ? 'detailBorderNone' : 'detailIndustry', key: index }, value.industryName);
        };

        _this.handleChangeButtton = function () {
            // 点击切换显示关注行业按钮
            _this.setState({ changShow: !_this.state.changShow });
        };

        _this.handleTotalButton = function () {
            _this.setState({ totalShow: !_this.state.totalShow });
        };

        _this.state = {
            setIndustryArr: [],
            local: '',
            changShow: true,
            totalShow: true,
            userId: '',
            borderNone: '',
            message: {
                type: '',
                userId: ''
            }
        };
        return _this;
    }

    _createClass(SeleteIndustry, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            // 这里直接通过路由传递的useId值
            var selectIndustry = JSON.parse(this.props.params.userId);
            this.state.message.type = selectIndustry.type;
            this.setState({ userId: selectIndustry.userId });

            this.fetchSetIndustry();
            this.setState({ local: this.getLianData.bind(this)() });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var styles = {
                provinceStyles: { width: '100%', boxSizing: 'border-box', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E1E1E1 ', overflow: 'hidden', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
                pHeight: { width: '86%', height: '4rem', lineHeight: '4rem', textIndent: '3rem', fontSize: '1.33rem', overflow: 'hidden', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }
            };
            return _react2.default.createElement('div', { className: 'concernedIdustry' }, _react2.default.createElement('div', { className: 'concernedSelect', onClick: this.handleChangeButtton }, "\u4ECE\u5173\u6CE8\u884C\u4E1A\u4E2D\u8FDB\u884C\u9009\u62E9", _react2.default.createElement('span', { className: this.state.changShow ? 'concernedShow' : 'conceredHidden' })), _react2.default.createElement('div', { className: this.state.changShow ? 'handleDetailShow' : 'handleDetailHidden' }, this.state.setIndustryArr.map(this.handleDetailIndustry)), _react2.default.createElement('div', { className: 'totalIndustry', onClick: this.handleTotalButton }, "\u4ECE\u5168\u90E8\u884C\u4E1A\u4E2D\u9009\u62E9", _react2.default.createElement('span', { className: this.state.totalShow ? 'totalShow' : 'totalHidden' })), _react2.default.createElement('div', { className: this.state.totalShow ? 'industryMenuShow' : 'industryMenuHidden' }, JSON.parse(this.state.local).map(function (value, index) {
                return _react2.default.createElement(_levelMenu.Card, {
                    key: index,
                    icon: true,
                    content: _react2.default.createElement('p', { style: { height: '4rem', lineHeight: '4rem', paddingLeft: '2.42rem', backgroundColor: '#FFFFFF', fontSize: '1.33rem', overflow: 'hidden', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' } }, value.instryName),
                    iconStyle: { position: 'absolute', left: '1rem' },
                    expandedIcon: _react2.default.createElement('img', { src: require('../../images/rotateUp.png'), style: { position: 'absolute' } }),
                    noexpandedIcon: _react2.default.createElement('img', { src: require('../../images/right.png'), style: { position: 'absolute' } }),
                    contentStyle: styles.provinceStyles
                }, value.industryList.map(function (val, index) {
                    return _react2.default.createElement(_levelMenu.Card, {
                        key: index,
                        icon: true,
                        content: _react2.default.createElement('p', { style: styles.pHeight }, val.instryName),
                        expandedIcon: _react2.default.createElement('img', { src: require('../../images/graydown.png'), style: { width: '1.17rem', height: '0.67rem', marginLeft: '0.5rem', position: 'absolute', right: '1rem' } }),
                        noexpandedIcon: _react2.default.createElement('img', { src: require('../../images/grayup.png'), style: { width: '1.17rem', height: '0.67rem', marginLeft: '0.5rem', position: 'absolute', right: '1rem' } }),
                        iconStyle: { position: 'absolute', right: '0rem', width: '14%', height: 'calc(100% - 1.5rem)' },
                        contentStyle: { paddingLeft: '3rem', boxSizing: 'border-box', backgroundColor: '#F5F5F5 ', borderBottom: '1px solid #E1E1E1' }
                    }, val.industryList.map(function (vv, ii) {

                        return _react2.default.createElement(_levelMenu.Card, {
                            key: ii,
                            icon: true,
                            content: _react2.default.createElement('p', { key: ii, style: { height: '4rem', lineHeight: '4rem', borderBottom: '1px solid #E1E1E1', textIndent: '3rem', fontSize: '1.33rem', color: '#666666', overflow: 'hidden', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' } }, vv.instryName),
                            handleIndutiyClick: function handleIndutiyClick() {
                                var industryObj = new Object();
                                industryObj.industryId = vv.industryId;
                                industryObj.industryName = vv.instryName;
                                industryObj.industryMasks = 'true';
                                industryObj.userId = JSON.parse(_this2.props.params.userId).userId;
                                var industryStr = JSON.stringify(industryObj);
                                if (JSON.parse(_this2.props.params.userId).tralvel == 'tralvel') {

                                    _reactRouter.browserHistory.push('/container/movie/' + industryStr);
                                } else if (JSON.parse(_this2.props.params.userId).downStream == 'downStream') {
                                    _reactRouter.browserHistory.push('/container/downstream/' + industryStr);
                                } else {
                                    _reactRouter.browserHistory.push('/container/home/' + industryStr);
                                }
                            },
                            expandedIcon: _react2.default.createElement('b', { style: { width: '0px', height: '0px', marginTop: '18px' } }),
                            noexpandedIcon: _react2.default.createElement('b', { style: { width: '0px', height: '0px', marginTop: '18px' } })
                        });
                    }));
                }));
            })));
        }
    }]);

    return SeleteIndustry;
}(_react.Component);

exports.default = SeleteIndustry;

//# sourceMappingURL=SeleteIndustry-compiled.js.map

//# sourceMappingURL=SeleteIndustry-compiled-compiled.js.map