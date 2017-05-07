'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _movieService = require('../../services/movieService.js');

var _movieService2 = _interopRequireDefault(_movieService);

var _Slide = require('../Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _slideData = require('./data/slideData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by cvtt on 2017/4/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
/**
 * Created by saiwei on 2017/3/14.
 */


var SlideDemo = function (_React$Component) {
    _inherits(SlideDemo, _React$Component);

    function SlideDemo() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SlideDemo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SlideDemo.__proto__ || Object.getPrototypeOf(SlideDemo)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            imgArr: [],
            getData: false,
            sliderStop: false
        }, _this.handleShowData = function (item) {
            var arr = _this.state.imgArr;
            arr.push(item);
            _this.setState({ imgArr: arr, getData: true });
        }, _this.handleStopSlider = function (e) {
            e.stopPropagation();
            _this.setState({ sliderStop: true });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SlideDemo, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            // ��Ҫ����ҳ�����ֲ�ͼ���ݵļ�������
            this.props.orginer.orgHomePageADList.map(this.handleShowData);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var promise = _movieService2.default.handleGetImgUrl('url', JSON.stringify({ x: 9, y: 9, osType: 1 }));
            promise.then(function (json) {
                json = JSON.parse(json) || _slideData.SlideData;
                return json.orgHomePageADList.map(_this2.handleShowData);
            }), function (reason) {
                console.log(reason);
            };
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.setState({ imgArr: [], getData: false });
        }
    }, {
        key: 'render',
        value: function render() {
            var imgArr = this.state.imgArr;
            var optss = [];
            imgArr && imgArr.length > 1 && imgArr.map(function (v, i) {
                var obj = new Object();
                obj.link = '#';
                obj.src = v.pictureUrl;
                optss.push(obj);
            });
            return _react2.default.createElement(
                'div',
                { className: 'soide', style: { width: '100%', height: '100%', overflow: 'hidden' } },
                this.state.getData && optss.length > 0 && _react2.default.createElement(_Slide2.default, { opts: optss, slider: this.state.imgArr, onClick: this.handleStopSlider })
            );
        }
    }]);

    return SlideDemo;
}(_react2.default.Component);

exports.default = SlideDemo;

//# sourceMappingURL=slideDemo-compiled.js.map