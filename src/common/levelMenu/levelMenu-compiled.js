'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Card = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./toggle.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by saiwei on 2017/1/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Card = exports.Card = function (_Component) {
    _inherits(Card, _Component);

    function Card(props) {
        _classCallCheck(this, Card);

        var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

        _this.state = {
            expanded: false
        };
        return _this;
    }

    _createClass(Card, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                handleIndutiyClick = _props.handleIndutiyClick,
                expanded = _props.expanded,
                content = _props.content,
                onExpandChange = _props.onExpandChange,
                style = _props.style,
                className = _props.className,
                contentStyle = _props.contentStyle,
                icon = _props.icon,
                iconStyle = _props.iconStyle,
                expandedIcon = _props.expandedIcon,
                noexpandedIcon = _props.noexpandedIcon;

            var toggle = expanded != undefined ? expanded : this.state.expanded;
            return _react2.default.createElement(
                'div',
                { className: className && className },
                _react2.default.createElement(
                    'div',
                    {
                        style: _extends({ width: '100%', margin: 0, padding: 0, boxSizing: 'border-box' }, style),
                        onClick: function onClick() {
                            expanded == undefined ? _this2.setState({ expanded: !_this2.state.expanded }) : onExpandChange && onExpandChange.bind(_this2);
                        }
                    },
                    _react2.default.createElement(
                        'div',
                        { style: { position: 'relative', height: '4rem' } },
                        _react2.default.createElement(
                            'div',
                            { onClick: handleIndutiyClick && handleIndutiyClick },
                            content
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'left_Icon', style: iconStyle && _extends({}, iconStyle) },
                            icon && this.props.children && (toggle ? expandedIcon ? expandedIcon : '↑' : noexpandedIcon ? noexpandedIcon : '↓')
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: contentStyle },
                    toggle && this.props.children
                )
            );
        }
    }]);

    return Card;
}(_react.Component);

//# sourceMappingURL=levelMenu-compiled.js.map