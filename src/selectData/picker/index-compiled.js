'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _componentsExt = require('../components-ext');

require('../components-ext/scss/index.scss');

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PickerDemo = function (_React$Component) {
    _inherits(PickerDemo, _React$Component);

    function PickerDemo() {
        _classCallCheck(this, PickerDemo);

        var _this = _possibleConstructorReturn(this, (PickerDemo.__proto__ || Object.getPrototypeOf(PickerDemo)).call(this));

        _this.defaultAddress = ['- -', '- -', '- -'];
        _this.state = {
            addressPickerVisible: false,
            defaultValue: { name: 'Raoh', value: 7 },
            address: _this.defaultAddress,
            afterkeyWord: ''
        };

        return _this;
    }

    _createClass(PickerDemo, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            document.title = '地区';
            this.setState({ afterkeyWord: JSON.parse(this.props.params.industry).keyword });
            console.log(this.state.afterkeyWord);
        }

        // 地址选择

    }, {
        key: 'showAddressPicker',
        value: function showAddressPicker(e) {
            e.nativeEvent.stopImmediatePropagation();
            this.setState({ addressPickerVisible: true });
        }
    }, {
        key: 'handleChangeAddress',
        value: function handleChangeAddress(address) {
            this.setState({ address: address });
        }
    }, {
        key: 'closeAddressPicker',
        value: function closeAddressPicker(address) {
            //完成按钮,调用这的方法
            this.setState({
                address: address,
                addressPickerVisible: false
            });
            var regionAddres = this.state.address;
            var regionProvince = regionAddres[0];
            var regionCity = regionAddres[1];
            var regionArea = regionAddres[2];
            var regionNumber = 2;
            var industry = JSON.parse(this.props.params.industry).selectIndustry;
            var industryId = JSON.parse(this.props.params.industry).selectindustryId;
            var keyword = this.state.afterkeyWord;

            _reactRouter.browserHistory.push('/container/find/' + regionProvince + '+' + regionCity + '+' + regionArea + '+' + regionNumber + '+' + industry + '+' + industryId + '+' + keyword);
        }
    }, {
        key: 'cancelAddressPicker',
        value: function cancelAddressPicker() {
            // 设置默认的地址，
            this.setState({
                address: this.defaultAddress,
                addressPickerVisible: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'picker-demo' },
                _react2.default.createElement(_componentsExt.PickerAddress, {
                    defaultValue: this.state.address,
                    onCancel: this.cancelAddressPicker.bind(this),
                    onConfirm: this.closeAddressPicker.bind(this),
                    visible: this.state.addressPickerVisible,
                    onChange: this.handleChangeAddress.bind(this) }),
                _react2.default.createElement(
                    'div',
                    { className: 'button-wrap' },
                    _react2.default.createElement(
                        'button',
                        {
                            type: 'button',
                            onClick: this.showAddressPicker.bind(this),
                            className: 'btn button-primary' },
                        '\u9009\u62E9\u7701\u5E02'
                    )
                )
            );
        }
    }]);

    return PickerDemo;
}(_react2.default.Component);

exports.default = PickerDemo;

//# sourceMappingURL=index-compiled.js.map