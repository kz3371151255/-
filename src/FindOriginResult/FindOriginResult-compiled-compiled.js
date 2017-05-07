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

require('./css/Find.css');

var _movieService = require('../services/movieService.js');

var _movieService2 = _interopRequireDefault(_movieService);

var _recom = require('../recomConent/data/recom.js');

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
   * Created by cvtt on 2017/3/27.
   */
/**
 * Created by cvtt on 2017/3/20.
 */

var RecomConent = function (_Component) {
    _inherits(RecomConent, _Component);

    function RecomConent(props) {
        _classCallCheck(this, RecomConent);

        var _this2 = _possibleConstructorReturn(this, (RecomConent.__proto__ || Object.getPrototypeOf(RecomConent)).call(this, props));

        _this2.getLianDataCard = function (Portrait, Id, RelationType, Type, ShortName, FullName, ContactName, Email, IndustryList, NetFlag, Th) {
            var Iosmess = Object.assign({}, _this2.state.Ios);
            Iosmess.orgId = Id;
            Iosmess.orgType = Type;
            Iosmess.orgShortName = ShortName;
            Iosmess.orgPortrait = Portrait;
            var Strmess = JSON.stringify(Iosmess);
            if (NetFlag == '1') {
                // 1 : 表示跳转联网站
                var uuu = navigator.userAgent;
                var isAndroid = uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
                var isIos = !!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) == true;
                if (isIos) {
                    window.webkit && window.webkit.messageHandlers.gotoWebsite.postMessage(Strmess);
                    return;
                } else if (isAndroid) {

                    return window.androidJsInterface && window.androidJsInterface.lianWebMainActivityLauncher(ShortName, Portrait, Id, RelationType, Type);
                }
            } else if (NetFlag == '0') {
                // 0 表示跳转组织明信片

                var uuu = navigator.userAgent;
                var isAndroid = uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
                var isIos = !!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) == true;
                if (isIos) {

                    window.webkit && window.webkit.messageHandlers.gotoOrgDetail.postMessage(Strmess);
                    return;
                } else if (isAndroid) {
                    return window.androidJsInterface && window.androidJsInterface.intationOrgCardActivityLauncher(Portrait, Id, Type, ShortName, FullName, ContactName, Email, JSON.stringify(IndustryList));
                }
            }
        };

        _this2.addEventListener = function () {
            var _this = _this2;
            _this2.refs.scroll_container.addEventListener('scroll', function (e) {
                e.stopPropagation;
                if (e.target.scrollHeight <= e.target.scrollTop + e.target.offsetHeight) {
                    if (_this.state.isButton) {
                        return;
                    }
                    // 在发送请求之前将上一次的 orgId 回传
                    if (_this2.state.datamessage.flag == 1) {
                        return;
                    }

                    _this.fetch(_this2.state.messages, _this2.state.lastOrgId);
                    _this.setState({ isButton: true });
                }
            });
        };

        _this2.fetch = function (messages, beginOrgId) {

            var _this = _this2; // 保存全局 this
            var message = Object.assign({}, messages);
            message.beginOrgId = _this2.state.lastOrgId && beginOrgId;
            var detailData = [].concat(_this2.state.detailData);
            var strMessage = JSON.stringify(message);
            var promise = _movieService2.default.getSearchResult(strMessage);
            promise.then(function (json) {
                // 获取到数据遮罩去掉
                if (json == '') {
                    _this2.setState({ response: true, isLoading: false });
                    return;
                }
                json = JSON.parse(json) || _recom.RecomData;
                _this.setState({ datamessage: json });
                _this.setState({ lastOrgId: json.lastOrgId });
                if (detailData.length > 0) {
                    detailData = detailData.concat(json.orgList);
                } else {
                    detailData = json.orgList;
                }
                // 获取到数据之后 去掉遮罩 ，加载数据提示去掉
                _this.setState({ // 同步还是异步
                    isLoading: false,
                    detailData: detailData,
                    messages: message
                });
            }), function (reason) {
                console.log(reason);
            };
        };

        _this2.handleOrign = function () {
            return _react2.default.createElement('div', { className: 'FindOriginnoneOrgin' }, _react2.default.createElement('div', { className: 'FindOriginnoneOrginImage', ref: 'scroll_container' }, _react2.default.createElement('img', { src: require('../images/empty.png'), alt: '' }), _react2.default.createElement('span', null, "\u6682\u65E0\u641C\u7D22\u7ED3\u679C")));
        };

        _this2.handelRender = function (item) {
            if (item.orgPortrait == null) {
                var orgPortrait = require('../images/originImage.png');
            } else {
                orgPortrait = item.orgPortrait;
            }

            return _react2.default.createElement('div', { className: 'findComponent', key: item && item.orgId, onClick: _this2.getLianDataCard.bind(_this2, item.orgPortrait, item.orgId, item.orgRelationType, item.orgType, item.orgShortName, item.orgFullName, '', '', item.orgIndustry, item.orgNetFlag) }, _react2.default.createElement('div', { className: 'componentImage', style: { background: 'url(' + orgPortrait + ') no-repeat center center', backgroundSize: '3.33rem 3.33rem' } }), _react2.default.createElement('span', null, item.orgShortName), _react2.default.createElement('div', { className: 'address' }, item.officeAddressName), _react2.default.createElement('b', null), _react2.default.createElement('div', { className: 'classBorder' }));
        };

        _this2.handleRecomContent = function () {
            return _react2.default.createElement('div', { className: 'findeResult', ref: 'scroll_container' }, _this2.state.detailData.map(_this2.handelRender));
        };

        _this2.state = {
            isLoading: true,
            datamessage: {},
            detailData: [],
            lastOrgId: '',
            response: false,
            messages: {
                keyword: '',
                industryId: '',
                region: '',
                count: 20,
                beginOrgId: 0
            }
        };
        return _this2;
    }

    _createClass(RecomConent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            document.title = '搜索结果';
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var strMessages = JSON.parse(this.props.params.strMessage);
            console.log(strMessages);
            this.fetch(strMessages);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            //检测到state 和 props 变化就执行
            if (this.refs.scroll_container) {
                this.addEventListener();
            }
        }
        // 渲染数据方法中

    }, {
        key: 'render',
        value: function render() {
            // isloading ：数据没有获取到之前 显示数据加载，

            if (this.state.response) {
                return this.handleOrign();
            }
            return this.handleRecomContent();
        }
    }]);

    return RecomConent;
}(_react.Component);

exports.default = RecomConent;

//# sourceMappingURL=FindOriginResult-compiled.js.map

//# sourceMappingURL=FindOriginResult-compiled-compiled.js.map