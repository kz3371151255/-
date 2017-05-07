'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('../style/root.css');

var _Routers = require('./Routers.js');

var _Routers2 = _interopRequireDefault(_Routers);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

// 项目入口文件
_reactDom2.default.render(_react2.default.createElement('div', null, _react2.default.createElement(_Routers2.default, null)), document.getElementById('app'));

//# sourceMappingURL=app-compiled.js.map

//# sourceMappingURL=app-compiled-compiled.js.map