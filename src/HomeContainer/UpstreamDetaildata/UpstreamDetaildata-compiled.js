'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./upStream.css');

var _movieService = require('../../services/movieService.js');

var _movieService2 = _interopRequireDefault(_movieService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by cvtt on 2017/4/7.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var UpstreamDetaildata = function (_Component) {
    _inherits(UpstreamDetaildata, _Component);

    function UpstreamDetaildata(props) {
        _classCallCheck(this, UpstreamDetaildata);

        var _this2 = _possibleConstructorReturn(this, (UpstreamDetaildata.__proto__ || Object.getPrototypeOf(UpstreamDetaildata)).call(this, props));

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

                    _this.setState({ isButton: true, baginOrgIdRelease: 1, isIndential: false }); //当下拉刷新的时候，表示是在当前条件,所以还是的需要的beginOrgId
                    _this.fetch(_this2.state.message, _this2.state.lastOrgId);
                }
            });
        };

        _this2.fetch = function (message, lastOrgId) {
            //
            if (typeof message == 'string') {
                message = JSON.parse(message);
            }
            var messageObj = Object.assign({}, message);

            if (_this2.state.baginOrgIdRelease > 3) {
                //当页面初始加载的时候，baginOrgIdRelease ==2

                messageObj.beginOrgId = '';
            } else if (_this2.state.baginOrgIdRelease == 1) {
                // 当下拉刷新的时候等于 1

                messageObj.beginOrgId = _this2.state.lastOrgId || lastOrgId;
            }
            var responseArr = [].concat(_this2.state.responseArr);
            var messageStr = JSON.stringify(messageObj);
            var promise = _movieService2.default.getSearchResult(messageStr);
            promise.then(function (json) {

                if (json == '') {
                    console.log('1111');

                    _this2.setState({ responseEmpty: true, isLoading: false });
                    return;
                }
                json = JSON.parse(json);
                if (_this2.state.isIndential) {
                    //isIndential值为true,表示请求不同的数据
                    responseArr = [];
                }
                if (responseArr.length > 0) {
                    // 数据刷新时执行

                    responseArr = responseArr.concat(json.orgList);
                } else {
                    responseArr = json.orgList;
                }
                if (_this2.state.baginOrgIdRelease > 3) {
                    // 当切换选择的条件  lastOrgId =''

                    _this2.setState({ responseArr: responseArr, isLoading: false, lastOrgId: '', datamessage: json, responseEmpty: false });
                } else {

                    _this2.setState({ responseArr: responseArr, isLoading: false, lastOrgId: json.lastOrgId, datamessage: json, responseEmpty: false });
                }
            }), function (reason) {
                console.log(reason);
            };
        };

        _this2.getLianDataCard = function (Portrait, Id, RelationType, Type, ShortName, FullName, ContactName, Email, IndustryList, NetFlag, Th) {
            var Iosmess = Object.assign({}, _this2.state.Ios);
            Iosmess.orgId = Id;
            Iosmess.orgType = Type;
            Iosmess.orgShortName = ShortName;
            Iosmess.orgPortrait = Portrait;
            var Strmess = JSON.stringify(Iosmess);
            if (NetFlag == '1') {
                // 表示跳转联网站
                var uuu = navigator.userAgent;
                var isAndroid = uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
                var isIos = !!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) == true;
                if (isIos) {
                    window.webkit && window.webkit.messageHandlers.gotoWebsite.postMessage(Strmess);
                    return;
                } else if (isAndroid) {

                    return window.androidJsInterface && window.androidJsInterface.lianWebMainActivityLauncher(ShortName, Portrait, Id.toString(), RelationType.toString(), Type);
                }
            } else if (NetFlag == '0') {
                // 0

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

        _this2.handleUpStreamDetail = function (item, index) {
            // 搜索组织详细展示
            if (item.orgPortrait == null) {
                var orgPortrait = require('../../images/originImage.png');
            } else {
                orgPortrait = item.orgPortrait;
            }

            return _react2.default.createElement(
                'div',
                { className: 'upStreamDetailOrgin', key: item && item.orgId, onClick: _this2.getLianDataCard.bind(_this2, item.orgPortrait, item.orgId, item.orgRelationType, item.orgType, item.orgShortName, item.orgFullName, '', '', item.orgIndustry, item.orgNetFlag) },
                _react2.default.createElement('div', { className: 'upStreamImage', style: { background: 'url(' + orgPortrait + ') no-repeat center center' } }),
                _react2.default.createElement(
                    'span',
                    null,
                    item.orgShortName
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'upStreamaddress' },
                    item.officeAddressName
                ),
                _react2.default.createElement('b', null),
                _react2.default.createElement('div', { className: 'upStreamclassBorder' })
            );
        };

        _this2.handleUpstream = function () {

            return _react2.default.createElement(
                'div',
                { className: 'upStreamDetailContainer', ref: 'scroll_container' },
                _this2.state.responseArr.map(_this2.handleUpStreamDetail)
            );
        };

        _this2.handleResponseEmpty = function () {
            return _react2.default.createElement(
                'div',
                { className: 'upStreamResponEmpty' },
                _react2.default.createElement(
                    'div',
                    { className: 'upStreamImage' },
                    _react2.default.createElement('img', { src: require('../../images/empty.png'), alt: '' }),
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u6682\u65E0\u641C\u7D22\u7ED3\u679C'
                    )
                )
            );
        };

        _this2.state = {
            industryName: '',
            industryId: '',
            responseEmpty: false,
            responseArr: [],
            isLoading: true,
            lastOrgId: '',
            isIndential: '',
            datamessage: {},
            propsType: '',
            baginOrgIdRelease: 2,
            message: {
                type: '',
                count: 20,
                industryId: '',
                region: ''
            }
        };
        return _this2;
    }

    _createClass(UpstreamDetaildata, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.state.message.type = this.props.upStreamArr.type;
        }
        // 当前子组件，获取行业id 地区 作为请求的参数获取数据

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // nextProps 获取的值要比 this.props 获取的值要快，用nextProps

            if (nextProps.upStreamArr.type == 0) {
                // 只有在选择对应上游的时候type=0
                this.state.message.type = nextProps.upStreamArr.type;
            }

            this.setState({ propsType: nextProps.upStreamArr.type });

            if (nextProps.upStreamArr != this.props.upStreamArr) {
                //监测前后props属性有没有改变
                //beginOrgId 是用来做下拉刷新,设置数据显示开始的位置,由于一个数据刷新完成以后，会给state lastorgId 设置上即，会保留，这样会设在下一个条件上,当更换条件的时候beginOrgId,就要的从头开始加载数据 (baginOrgIdRelease)

                // 当前props属性值发生改变释放    isIndential = true
                var PropsUpStream = nextProps.upStreamArr;
                this.setState({ industryName: PropsUpStream.industryName, industryId: PropsUpStream.industryId, isIndential: true, baginOrgIdRelease: ++this.state.baginOrgIdRelease });
                if (this.state.baginOrgIdRelease > 9) {
                    this.setState({ baginOrgIdRelease: 2 });
                }
                var messages = Object.assign({}, this.state.message);
                messages.industryId = PropsUpStream.industryId;
                messages.region = PropsUpStream.region;
                if (PropsUpStream.type) {
                    messages.type = PropsUpStream.type;
                }

                this.fetch(JSON.stringify(messages));
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.refs.scroll_container) {
                this.addEventListener();
            }
        }
    }, {
        key: 'render',
        value: function render() {

            if (this.state.responseEmpty && this.state.isIndential) {
                //isIndential:当选择的条件变化值为true,下拉刷新的时候值为 false
                return this.handleResponseEmpty();
            }
            return this.handleUpstream();
        }
    }]);

    return UpstreamDetaildata;
}(_react.Component);

exports.default = UpstreamDetaildata;

//# sourceMappingURL=UpstreamDetaildata-compiled.js.map