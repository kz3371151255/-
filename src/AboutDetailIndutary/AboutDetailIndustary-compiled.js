'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _movieService = require('../services/movieService.js');

var _movieService2 = _interopRequireDefault(_movieService);

require('./css/AboutDetailIndustary.css');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by cvtt on 2017/3/27.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
/**
 * Created by cvtt on 2017/3/20.
 */

var AboutDetailIndustary = function (_Component) {
    _inherits(AboutDetailIndustary, _Component);

    function AboutDetailIndustary(props) {
        _classCallCheck(this, AboutDetailIndustary);

        var _this2 = _possibleConstructorReturn(this, (AboutDetailIndustary.__proto__ || Object.getPrototypeOf(AboutDetailIndustary)).call(this, props));

        _this2.fetch = function (messages) {

            var _this = _this2; // 保存全局 this
            var strMessage = Object.assign({}, _this2.state.messages);
            strMessage.keyword = messages;
            var finalMessage = JSON.stringify(strMessage);
            var detailData = [].concat(_this2.state.detailData);
            var promise = _movieService2.default.getIndustrayDetail(finalMessage);
            promise.then(function (json) {
                // 获取到数据遮罩去掉
                if (json == '') {
                    _this2.setState({ dataEmpty: true, isLoading: false });
                    return;
                }
                json = JSON.parse(json) || RecomData;
                if (detailData.length > 0) {
                    detailData = detailData.concat(json.industryList);
                } else {
                    detailData = json.industryList;
                }
                // 获取到数据之后 去掉遮罩 ，加载数据提示去掉
                _this.setState({ // 同步还是异步
                    isLoading: false,
                    detailData: detailData
                });
            }), function (reason) {
                console.log(reason);
            };
        };

        _this2.handleRender = function () {
            return _react2.default.createElement(
                'div',
                { className: 'loadDataAbout' },
                '\u8BF7\u8F93\u5165\u884C\u4E1A\u7C7B\u578B'
            );
        };

        _this2.handleOrign = function () {

            return _react2.default.createElement(
                'div',
                { className: 'noneOrgin' },
                _react2.default.createElement(
                    'div',
                    { className: 'noneOrginImage', ref: 'scroll_container' },
                    _react2.default.createElement('img', { src: require('../images/empty.png'), alt: '' }),
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u6682\u65E0\u641C\u7D22\u7ED3\u679C'
                    )
                )
            );
        };

        _this2.handleDetailRegion = function (industryId, industryName, bind) {
            _reactRouter.browserHistory.push('/container/find/' + industryId + '+' + industryName + '+1');
        };

        _this2.handelRender = function (item) {
            return _react2.default.createElement(
                'div',
                { className: 'ComponentDetail', key: item && item.industryId },
                _react2.default.createElement(
                    'div',
                    { className: 'ComponentItem', onClick: _this2.handleDetailRegion.bind(_this2, item.industryId, item.industryName) },
                    item.industryName
                ),
                _react2.default.createElement('div', { className: 'classBorder' })
            );
        };

        _this2.handleRecomContent = function () {

            return _react2.default.createElement(
                'div',
                { className: 'aboutDetailContainer' },
                _react2.default.createElement(
                    'div',
                    { className: 'findeResult', ref: 'scroll_container' },
                    _this2.state.detailData.map(_this2.handelRender)
                )
            );
        };

        _this2.state = {
            isLoading: true,
            datamessage: {},
            detailData: [],
            startWord: '',
            dataEmpty: false,
            messages: {
                keyword: ''
            }
        };
        return _this2;
    }

    _createClass(AboutDetailIndustary, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            //不断的监测检测state 和 props 变化

            if (this.props.item != this.state.startWord) {
                //先判断在赋值，当前的和之前的比较
                this.setState({ startWord: this.props.item });
                this.fetch(this.props.item);
            }
        }
        // 渲染数据方法中

    }, {
        key: 'render',
        value: function render() {
            // isloading ：数据没有获取到之前 显示数据加载，
            if (this.state.isLoading) {
                return this.handleRender();
            }
            if (this.state.dataEmpty) {
                return this.handleOrign();
            }
            return this.handleRecomContent();
        }
    }]);

    return AboutDetailIndustary;
}(_react.Component);

exports.default = AboutDetailIndustary;

//# sourceMappingURL=AboutDetailIndustary-compiled.js.map