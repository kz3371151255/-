'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../components/index.js');

var _address = require('./address.js');

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  defaultValue: _react2.default.PropTypes.array.isRequired,
  onConfirm: _react2.default.PropTypes.func.isRequired,
  onCancel: _react2.default.PropTypes.func.isRequired,
  onChange: _react2.default.PropTypes.func.isRequired,
  visible: _react2.default.PropTypes.bool.isRequired
};

var PickerAddress = function (_React$Component) {
  _inherits(PickerAddress, _React$Component);

  function PickerAddress(props) {
    _classCallCheck(this, PickerAddress);

    var _this = _possibleConstructorReturn(this, (PickerAddress.__proto__ || Object.getPrototypeOf(PickerAddress)).call(this));

    _this.props = props;
    _this.address = [];
    return _this;
  }

  _createClass(PickerAddress, [{
    key: 'initDefaultData',
    value: function initDefaultData() {
      this.data = {
        provins: {
          list: _address.provins,
          defaultValue: this.props.defaultValue[0],
          displayValue: function displayValue(name) {
            return name;
          }
        },
        citys: {
          list: _address.citys[this.props.defaultValue[0]],
          defaultValue: this.props.defaultValue[1],
          displayValue: function displayValue(name) {
            return name;
          }
        },
        areas: {
          list: _address.areas[this.props.defaultValue[1]],
          defaultValue: this.props.defaultValue[2],
          displayValue: function displayValue(name) {
            return name;
          }
        }
      };
    }
  }, {
    key: 'handleChangeProvin',
    value: function handleChangeProvin(provin) {
      this.data.provins = {
        list: _address.provins,
        defaultValue: provin
      };
      this.data.citys = {
        list: _address.citys[provin],
        defaultValue: _address.citys[provin][0]
      };
      this.data.areas = {
        list: _address.areas[_address.citys[provin][0]],
        defaultValue: _address.areas[_address.citys[provin][0]][0]
      }, this.address = [];
      this.address.push(provin);
      this.address.push(_address.citys[provin][0]);
      this.address.push(_address.areas[_address.citys[provin][0]][0]);
      this.props.onChange(this.address);
    }
  }, {
    key: 'handleChangeCity',
    value: function handleChangeCity(city) {
      this.address[1] = city;
      this.address[2] = _address.areas[city][0];
      this.data.areas = {
        list: _address.areas[city],
        defaultValue: _address.areas[city][0]
      };
      this.props.onChange(this.address);
    }
  }, {
    key: 'handleChangeArea',
    value: function handleChangeArea(area) {
      this.address[2] = area;
      this.props.onChange(this.address);
    }
  }, {
    key: 'handleClose',
    value: function handleClose() {
      this.props.onConfirm(this.address);
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      this.props.onCancel();
    }
  }, {
    key: 'render',
    value: function render() {
      this.initDefaultData();
      return _react2.default.createElement(
        'div',
        { className: 'ui-picker-address' },
        _react2.default.createElement(
          _index.Popup,
          {
            onConfirm: this.handleClose.bind(this),
            onCancel: this.handleCancel.bind(this),
            visible: this.props.visible },
          _react2.default.createElement(_index.Picker, {
            onChange: this.handleChangeProvin.bind(this),
            data: this.data.provins
          }),
          _react2.default.createElement(_index.Picker, {
            onChange: this.handleChangeCity.bind(this),
            data: this.data.citys
          }),
          _react2.default.createElement(_index.Picker, {
            onChange: this.handleChangeArea.bind(this),
            data: this.data.areas
          })
        )
      );
    }
  }]);

  return PickerAddress;
}(_react2.default.Component);

PickerAddress.propTypes = propTypes;

exports.default = PickerAddress;

//# sourceMappingURL=index-compiled.js.map