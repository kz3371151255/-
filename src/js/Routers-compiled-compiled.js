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

var _reactRouter = require('react-router');

var _enter = require('./enter.js');

var _enter2 = _interopRequireDefault(_enter);

var _AppContainer = require('../AppContainer/AppContainer.js');

var _AppContainer2 = _interopRequireDefault(_AppContainer);

var _HomeContainer = require('../HomeContainer/HomeContainer.js');

var _HomeContainer2 = _interopRequireDefault(_HomeContainer);

var _MovieContainer = require('../MovieContainer/MovieContainer.js');

var _MovieContainer2 = _interopRequireDefault(_MovieContainer);

var _AboutContainer = require('../AboutContainer/AboutContainer.js');

var _AboutContainer2 = _interopRequireDefault(_AboutContainer);

var _FindOrganize = require('../findOrganize/FindOrganize.js');

var _FindOrganize2 = _interopRequireDefault(_FindOrganize);

var _FindOriginResult = require('../FindOriginResult/FindOriginResult.js');

var _FindOriginResult2 = _interopRequireDefault(_FindOriginResult);

var _index = require('../selectData/picker/index.js');

var _index2 = _interopRequireDefault(_index);

var _Downstream = require('../Downstream/Downstream.js');

var _Downstream2 = _interopRequireDefault(_Downstream);

var _SeleteIndustry = require('../HomeContainer/SeleteIndustry/SeleteIndustry.js');

var _SeleteIndustry2 = _interopRequireDefault(_SeleteIndustry);

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
} /*
  * 路由配置文件
  * */

var Routers = function (_Component) {
    _inherits(Routers, _Component);

    function Routers() {
        _classCallCheck(this, Routers);

        return _possibleConstructorReturn(this, (Routers.__proto__ || Object.getPrototypeOf(Routers)).apply(this, arguments));
    }

    _createClass(Routers, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_reactRouter.Router, { history: _reactRouter.browserHistory }, _react2.default.createElement(_reactRouter.Route, { path: '/', component: _enter2.default }, _react2.default.createElement(_reactRouter.IndexRoute, { component: _AppContainer2.default,
                onEnter: function onEnter() {
                    localStorage.removeItem('handleKeyResult');
                    localStorage.removeItem('userRegion');
                    localStorage.removeItem('userIndustry');
                    localStorage.removeItem('userInputLocal');
                },
                onLeave: function onLeave() {

                    localStorage.removeItem('userRegion');
                    localStorage.removeItem('userIndustry');
                    localStorage.removeItem('userInputLocal');
                } }), _react2.default.createElement(_reactRouter.Router, { path: 'container' }, _react2.default.createElement(_reactRouter.Route, { path: 'home(/:homeUser)', component: _HomeContainer2.default }), _react2.default.createElement(_reactRouter.Router, { path: 'selIndustry(/:userId)', component: _SeleteIndustry2.default }), _react2.default.createElement(_reactRouter.Route, { path: 'movie(/:homeUser)', component: _MovieContainer2.default }), _react2.default.createElement(_reactRouter.Route, { path: 'about(/:region)', component: _AboutContainer2.default }), _react2.default.createElement(_reactRouter.Route, { path: 'find(/:instryName)', component: _FindOrganize2.default }), _react2.default.createElement(_reactRouter.Route, { path: 'finresult/:strMessage', component: _FindOriginResult2.default }), _react2.default.createElement(_reactRouter.Route, { path: 'downstream(/:homeUser)', component: _Downstream2.default }), _react2.default.createElement(_reactRouter.Route, { path: 'region(/:industry)', component: _index2.default }))));
        }
    }]);

    return Routers;
}(_react.Component);

exports.default = Routers;

//# sourceMappingURL=Routers-compiled.js.map

//# sourceMappingURL=Routers-compiled-compiled.js.map