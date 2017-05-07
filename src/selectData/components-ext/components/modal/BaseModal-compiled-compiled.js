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

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

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
  visible: _react2.default.PropTypes.bool.isRequired
};

var BaseModal = function (_React$Component) {
  _inherits(BaseModal, _React$Component);

  function BaseModal() {
    _classCallCheck(this, BaseModal);

    return _possibleConstructorReturn(this, (BaseModal.__proto__ || Object.getPrototypeOf(BaseModal)).call(this));
  }

  _createClass(BaseModal, [{
    key: 'handleClick',
    value: function handleClick(e) {
      e.nativeEvent.stopImmediatePropagation();
    }
  }, {
    key: 'render',
    value: function render() {
      var modal = null;
      if (this.props.visible) {
        modal = _react2.default.createElement('div', { className: 'modal-overlay' }, _react2.default.createElement('div', { className: 'modal',
          onClick: this.handleClick.bind(this) }, this.props.children));
        // 当关闭modal时，不要忘记设置 css = '';
        var css = 'overflow:hidden; position:fixed; left:0; top:0; bottom:0;';
        document.body.style.cssText = css;
      }
      return _react2.default.createElement(_reactAddonsCssTransitionGroup2.default, {
        transitionName: 'modal-transition',
        transitionEnterTimeout: 240,
        transitionLeaveTimeout: 240 }, modal);
    }
  }]);

  return BaseModal;
}(_react2.default.Component);

BaseModal.propTypes = propTypes;

exports.default = BaseModal;

//# sourceMappingURL=BaseModal-compiled.js.map

//# sourceMappingURL=BaseModal-compiled-compiled.js.map