'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

require('./appcss/app.css');

var _movieService = require('../services/movieService.js');

var _movieService2 = _interopRequireDefault(_movieService);

var _slideDemo = require('../common/Slide/slideDemo.jsx');

var _slideDemo2 = _interopRequireDefault(_slideDemo);

var _recomConent = require('../recomConent/recomConent.js');

var _recomConent2 = _interopRequireDefault(_recomConent);

var _config = require('../js/config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 根容器组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * */


var AppContainer = function (_Component) {
    _inherits(AppContainer, _Component);

    function AppContainer(props) {
        _classCallCheck(this, AppContainer);

        var _this = _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).call(this, props));

        _this.fetch = function (message) {

            var promise = _movieService2.default.getisJoinOrg(message);
            promise.then(function (json) {

                _this.setState({ responseSussess: true, isorigner: json });
            }), function (reason) {};
        };

        _this.getLianApp = function (token) {
            _reactRouter.browserHistory.push('' + token + _this.state.userId);
            /* var uuu = navigator.userAgent;
             var isIos = !!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) == true;
             if (isIos) {
                 return webkit && window.webkit.messageHandlers.didLoadResource.postMessage(null)
             }*/
        };

        _this.getFind = function () {

            _this.getLianApp('/container/find/');
        };

        _this.upStreams = function () {
            _this.getLianApp('/container/home/');
        };

        _this.travalStreams = function () {
            _this.getLianApp('/container/movie/');
        };

        _this.downStreams = function () {
            _this.getLianApp('/container/downstream/');
        };

        _this.handeleMasks = function () {

            if (_this.state.responseSussess) {
                return _react2.default.createElement(
                    'div',
                    { className: _this.state.isorigner == 0 ? 'masksDisplay' : 'masksnone' },
                    _react2.default.createElement(
                        'div',
                        { className: 'masksPrompt' },
                        '\u4F60\u5C1A\u672A\u52A0\u5165\u7EC4\u7EC7\uFF0C\u6682\u4E0D\u80FD\u8FDB\u884C\u6B64\u64CD\u4F5C '
                    )
                );
            }
        };

        _this.renderFind = function (a) {
            return _react2.default.createElement(
                'div',
                { className: 'containerBox', ref: 'containerBox' },
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'app' },
                        _this.state.responseSussess && _this.handeleMasks(),
                        _react2.default.createElement(
                            'div',
                            { className: 'topSearch' },
                            _react2.default.createElement(
                                'div',
                                { className: 'search', onClick: _this.getFind },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    '\xA0\u6309\u7EC4\u7EC7\u540D\u79F0/\u884C\u4E1A\u7C7B\u578B/\u5730\u533A',
                                    _react2.default.createElement('img', { src: require('../images/serach.png'), alt: '' })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'appheader' },
                            _react2.default.createElement(
                                'div',
                                { className: 'upStreams', onClick: _this.upStreams },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'oneStream' },
                                    _react2.default.createElement('img', { src: require('../images/upStream.png'), alt: '' })
                                ),
                                _react2.default.createElement(
                                    'a',
                                    null,
                                    '\u627E\u4E0A\u6E38'
                                ),
                                _react2.default.createElement('span', null)
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'travalStreams', onClick: _this.travalStreams },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'twoStream' },
                                    _react2.default.createElement('img', { src: require('../images/travel.png'), alt: '' })
                                ),
                                _react2.default.createElement(
                                    'a',
                                    null,
                                    '\u627E\u540C\u884C'
                                ),
                                _react2.default.createElement('span', null)
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'downStreams', onClick: _this.downStreams },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'threeStream' },
                                    _react2.default.createElement('img', { src: require('../images/downStream.png'), alt: '' })
                                ),
                                _react2.default.createElement(
                                    'a',
                                    null,
                                    '\u627E\u4E0B\u6E38'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'carousel' },
                            _this.state.imgDataResponse && _react2.default.createElement(_slideDemo2.default, { orginer: _this.state.imgData })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'recommend' },
                            _react2.default.createElement('span', null),
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u4F60\u8981\u627E\u7684\u53EF\u80FD\u662F\u4ED6\u4EEC '
                            ),
                            _react2.default.createElement('div', null)
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'recomConent' },
                            _this.state.containerBoxRealse && _react2.default.createElement(_recomConent2.default, { pullUpLoading: _this.state.containerBox, userId: _this.state.userId })
                        )
                    )
                )
            );
        };

        _this.state = {
            isLoading: false,
            carousel: true,
            location: '',
            userId: {
                origner: 1,
                userId: 10382
            },
            orginer: '',
            slider: '',
            sildersucess: false,
            responseSussess: false,
            imgDataResponse: false,
            imgData: '',
            containerBox: '',
            containerBoxRealse: false,
            refresh: false,
            messages: {
                x: 9,
                y: 9,
                osType: 1
            },
            flag: 0
        };
        return _this;
    }

    _createClass(AppContainer, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var messageStr = null;
            if (this.props.location.query.userId) {
                var message = new Object();
                message.userId = parseInt(this.props.location.query.userId);
                messageStr = JSON.stringify(message);
                this.setState({ userId: JSON.stringify(this.props.location.query) });
                var origner = new Object();
                var localOrigner = JSON.parse(localStorage.getItem('localUserId')) || origner;
                localOrigner.userId = parseInt(this.props.location.query.userId);
                localStorage.setItem('localUserId', JSON.stringify(localOrigner));
            } else {
                var localUserId = localStorage.getItem('localUserId');
                if (localUserId) {
                    var messagelocal = new Object();
                    messagelocal.userId = parseInt(JSON.parse(localStorage.getItem('localUserId')).userId);
                    messageStr = JSON.stringify(messagelocal);
                    this.setState({ userId: localStorage.getItem('localUserId') });
                }
            }

            this.fetch(messageStr);
            document.title = '找组织';
            //在页面的加载的时候的就请求轮播图的资源
            var promise = _movieService2.default.handleGetImgUrl('url', JSON.stringify({ x: 9, y: 9, osType: 1 }));
            promise.then(function (json) {
                json = JSON.parse(json);

                _this2.setState({ imgDataResponse: true, imgData: json });
            }), function (reason) {};
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {

            this.setState({ containerBox: this.refs.containerBox, containerBoxRealse: true });
        }
    }, {
        key: 'render',
        value: function render() {

            return this.renderFind();
        }
    }]);

    return AppContainer;
}(_react.Component);

exports.default = AppContainer;

//# sourceMappingURL=AppContainer-compiled.js.map