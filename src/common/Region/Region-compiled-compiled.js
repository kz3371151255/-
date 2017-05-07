'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Region = undefined;

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

require('./region.css');

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
   * Created by cvtt on 2017/4/15.
   */

var Region = exports.Region = function (_Component) {
    _inherits(Region, _Component);

    function Region(props) {
        _classCallCheck(this, Region);

        var _this = _possibleConstructorReturn(this, (Region.__proto__ || Object.getPrototypeOf(Region)).call(this, props));

        _this.state = {
            expanded: false
        };
        return _this;
    }

    _createClass(Region, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                handleGetIndex = _props.handleGetIndex,
                index = _props.index,
                content = _props.content,
                color = _props.color,
                contentStyle = _props.contentStyle,
                backgroundColor = _props.backgroundColor,
                displayJudge = _props.displayJudge,
                fathContainerWidth = _props.fathContainerWidth,
                displayTotal = _props.displayTotal,
                fontColor = _props.fontColor,
                twoLevelBackground = _props.twoLevelBackground,
                handleTotal = _props.handleTotal,
                totalChangeBackground = _props.totalChangeBackground;

            return (// 最高一级的宽度是变化的

                _react2.default.createElement('div', { style: { width: fathContainerWidth } }, _react2.default.createElement('div', { className: 'kkk', onClick: function onClick() {
                        handleGetIndex && handleGetIndex.bind(_this2, index)();
                    } }, _react2.default.createElement('div', { className: totalChangeBackground || backgroundColor }, content)), _react2.default.createElement('div', { style: contentStyle, className: 'children' }, _react2.default.createElement('div', { onClick: function onClick() {
                        // 点击2级全部
                        handleTotal && handleTotal();
                    },
                    style: {
                        width: '100%', height: '3.67rem', lineHeight: '3.67rem', display: displayTotal, color: fontColor, textIndent: '1rem', background: twoLevelBackground, borderBottom: '1px solid #e1e1e1'
                    }

                }, "\u5168\u90E8"), displayJudge && this.props.children))
            );
        }
    }]);

    return Region;
}(_react.Component);

//# sourceMappingURL=Region-compiled.js.map

//# sourceMappingURL=Region-compiled-compiled.js.map