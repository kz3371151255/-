'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./autoDiv.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by saiwei on 2017/3/10.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var AutoDiv = function (_Component) {
    _inherits(AutoDiv, _Component);

    function AutoDiv() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AutoDiv);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AutoDiv.__proto__ || Object.getPrototypeOf(AutoDiv)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            arr: ['阿ada点发', '阿ada阿斯蒂芬啊点发', 'as阿 芬', '阿的发', '阿的发', '阿的发', '阿萨德发asdf 射点发', '阿萨德aa阿斯蒂芬阿斯蒂芬阿萨德sdf asdsf sdfsdf 发射点发', '阿萨德发射点发', '阿萨德发阿萨德撒的发生的阿斯蒂芬阿斯蒂芬阿斯蒂芬发送到射点发']
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AutoDiv, [{
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'autoDiv' },
                this.state.arr.map(function (v, i) {
                    return _react2.default.createElement(
                        'p',
                        {
                            key: i,
                            onClick: function onClick() {
                                var arr = _this2.state.arr;
                                console.log(arr);
                                arr.splice(i, -1);
                                console.log(arr.splice(i, 1));
                                _this2.setState({ arr: arr });
                            }
                        },
                        v
                    );
                })
            );
        }
    }]);

    return AutoDiv;
}(_react.Component);

exports.default = AutoDiv;

//# sourceMappingURL=autoDiv-compiled.js.map