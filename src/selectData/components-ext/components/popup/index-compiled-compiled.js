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

var _BaseModal = require('../modal/BaseModal');

var _BaseModal2 = _interopRequireDefault(_BaseModal);

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
}

var propTypes = {
  visible: _react2.default.PropTypes.bool.isRequired,
  onConfirm: _react2.default.PropTypes.func.isRequired,
  onCancel: _react2.default.PropTypes.func.isRequired
};

var Popup = function (_React$Component) {
  _inherits(Popup, _React$Component);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this));
  }

  _createClass(Popup, [{
    key: 'handleCancel',
    value: function handleCancel() {
      document.body.style.cssText = '';
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm() {
      document.body.style.cssText = '';
      if (this.props.onConfirm) {
        this.props.onConfirm();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var isZh = !navigator.language || navigator.language.toLowerCase() === 'zh-cn' || navigator.language.toLowerCase() === 'zh';
      var text1 = !isZh ? 'Cancel' : '取消';
      var text2 = !isZh ? 'Finish' : '完成';
      return _react2.default.createElement(_BaseModal2.default, {
        visible: this.props.visible }, _react2.default.createElement('div', { className: 'ui-popup-title' }, _react2.default.createElement('span', { onClick: this.handleCancel.bind(this) }, text1), _react2.default.createElement('span', { onClick: this.handleConfirm.bind(this) }, text2)), _react2.default.createElement('div', { className: 'ui-popup-content' }, this.props.children));
    }
  }]);

  return Popup;
}(_react2.default.Component);

Popup.propTypes = propTypes;

exports.default = Popup;

//# sourceMappingURL=index-compiled.js.map

//# sourceMappingURL=index-compiled-compiled.js.map