'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

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

var _movieService = require('../services/movieService.js');

var _movieService2 = _interopRequireDefault(_movieService);

var _Overallsituation = require('../common/Overallsituation/Overallsituation.js');

require('./css/organize.css');

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
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Created by cvtt on 2017/3/15.
 */
/*
 * 找组织页面
 * */
function getIndustryList(getIndustryData) {

    return getIndustryData || '没有获取到数asdf 据';
}

var FindOrganize = function (_Component) {
    _inherits(FindOrganize, _Component);

    function FindOrganize(props) {
        _classCallCheck(this, FindOrganize);

        var _this2 = _possibleConstructorReturn(this, (FindOrganize.__proto__ || Object.getPrototypeOf(FindOrganize)).call(this, props));

        _this2.fetch = function (message) {
            // 首次进入页面请求数据

            var promise = _movieService2.default.getisJoinOrg(message);
            promise.then(function () {
                // 将数组中的第一个设定为选择行业 homeUser 是设定行业模块传递过来的

                _this2.setState({ responseSussess: true });
            }), function (reason) {};
        };

        _this2.handleLocal = function (select) {
            //取用户最后选取的值作为，最终选中结果

            var changeEmpty = JSON.parse(localStorage.getItem('searchEmptyfinishs'));
            if (changeEmpty != null) {
                // 第一次没有点击搜索按钮正常设置，因为在点行业或者地区的时候已经存储了changeEmpty,所以没有null的情况
                var handleKeyUpResult = JSON.parse(localStorage.getItem('handleKeyResult')); //这个local是用来判断H5输入值的匹配
                var handleResultObj = handleKeyUpResult || new Object();
                handleResultObj.region = select.region;
                handleResultObj.industryId = select.industryId;
                handleResultObj.industryName = select.industryName;
                handleResultObj.keyword = select.keyword;
                localStorage.setItem('handleKeyResult', JSON.stringify(handleResultObj));
                _this2.setState({
                    region: select.region,
                    industryId: select.industryId,
                    industryName: select.industryName,
                    keyword: select.keyword
                });
                return;
            }
            if (changeEmpty != null && changeEmpty.number == '1') {
                //点击过搜索按钮标记number=1
                var _handleKeyUpResult = JSON.parse(localStorage.getItem('handleKeyResult'));
                var _handleResultObj = _handleKeyUpResult || new Object();
                _handleResultObj.region = select.region;
                _handleResultObj.industryId = select.industryId;
                _handleResultObj.industryName = select.industryName;
                _handleResultObj.keyword = select.keyword;
                localStorage.setItem('handleKeyResult', JSON.stringify(_handleResultObj));
                _this2.setState({
                    region: select.region,
                    industryId: select.industryId,
                    industryName: select.industryName,
                    keyword: select.keyword
                });
            }

            if (changeEmpty != null && changeEmpty.emptyClear == 'false' && changeEmpty.numberInitials == '1') {
                //numberInitials :防止用户总是点击搜索，搜索内容被清空   emptyClear  : 表示已经点击了
                localFinalRegion = '';
                localFinalIndustryId = '';
                localFinalIndustryName = '';
                var _handleKeyUpResult2 = JSON.parse(localStorage.getItem('handleKeyResult'));
                var _handleResultObj2 = _handleKeyUpResult2 || new Object();
                _handleResultObj2.region = select.region;
                _handleResultObj2.industryId = select.industryId;
                _handleResultObj2.industryName = select.industryName;
                _handleResultObj2.keyword = select.keyword;
                localStorage.setItem('handleKeyResult', JSON.stringify(_handleResultObj2));
                _this2.setState({
                    region: select.region,
                    industryId: select.industryId,
                    industryName: select.industryName,
                    keyword: select.keyword
                });
            }
            if (_this2.state.searchEmptyClear) {
                //点击完搜索，将内存local  numberInitials 值更改，
                var obj = new Object();
                var searchEmptyAfter = changeEmpty || obj;
                searchEmptyAfter.emptyClear = 'true';
                searchEmptyAfter.numberInitials = '1';
                localStorage.setItem('searchEmptyfinishs', JSON.stringify(searchEmptyAfter));
            }
        };

        _this2.handleInput = function (e) {
            //将用户输入的值 存储在 localStorage 中

            var userValue = e.target.value.trim();
            if (userValue.length > 50) {
                userValue = userValue.slice(0, 50) + '...';
            }
            var userInputLocal = JSON.parse(localStorage.getItem('userInputLocal'));
            var userInputArr = userInputLocal || new Object();
            userInputArr.userInput = userValue;
            localStorage.setItem('userInputLocal', JSON.stringify(userInputArr));
            _this2.setState({ keyword: userValue, onkeyUpkeyword: userValue });
        };

        _this2.handleEmpty = function () {
            // 清空的时候改变state  状态重新渲染

            _this2.setState({ useHistory: !_this2.state.useHistory });
            localStorage.removeItem('userHistory');
            _this2.setState({ clearecord: false });
        };

        _this2.handleIndustry = function () {
            // 行业类型跳转路由

            var IndustryRelease = JSON.parse(localStorage.getItem('searchEmptyfinishs'));
            var IndustrynReleaseObj = IndustryRelease || new Object();
            IndustrynReleaseObj.release = 'true'; // 当用户点击多次搜索，避免第一次设置不上地区行业条件
            IndustrynReleaseObj.emptyClear = 'true';
            localStorage.setItem('searchEmptyfinishs', JSON.stringify(IndustrynReleaseObj));
            var releaseControl = JSON.parse(localStorage.getItem('releaseLocal')); // 设置只有在选择行业 地区的情况下 params 传递的值才可以
            var releaseControlObj = releaseControl || new Object();
            releaseControlObj.release = 'true';

            localStorage.setItem('releaseLocal', JSON.stringify(releaseControlObj));
            var selectRegion = new Object();
            selectRegion.selectRegion = _this2.state.selectRegion.region;
            if (!_this2.state.selectRegion.region) {
                selectRegion.selectRegion = '';
            }
            selectRegion.keyword = _this2.state.keyword;
            var selectStr = JSON.stringify(selectRegion);
            _reactRouter.browserHistory.push('/container/about/' + selectStr);
        };

        _this2.handleRrgion = function () {
            // 设置地区
            var regionRelease = JSON.parse(localStorage.getItem('searchEmptyfinishs'));
            var regionReleaseObj = regionRelease || new Object();
            regionReleaseObj.release = 'true'; // 当用户点击多次搜索，避免第一次设置不上地区查询条件
            regionReleaseObj.emptyClear = 'true';
            localStorage.setItem('searchEmptyfinishs', JSON.stringify(regionReleaseObj));
            var releaseControl = JSON.parse(localStorage.getItem('releaseLocal')); // 设置只有在选择行业 地区的情况下 params 传递的值才可以
            var releaseControlObj = releaseControl || new Object();
            releaseControlObj.release = 'true';
            localStorage.setItem('releaseLocal', JSON.stringify(releaseControlObj));
            var selectRegion = new Object();
            selectRegion.selectIndustry = _this2.state.selectIndustry.industryId;
            selectRegion.selectindustryId = _this2.state.selectIndustry.industryName;
            if (!_this2.state.selectIndustry.industryId) {
                selectRegion.selectIndustry = '';
                selectRegion.selectindustryId = '';
            }

            selectRegion.keyword = _this2.state.keyword;

            var selectStr = JSON.stringify(selectRegion);
            _reactRouter.browserHistory.push('/container/region/' + selectStr);
        };

        _this2.handleHistoryRecord = function (key, indu, region, binds) {
            // 历史记录
            // 跳转历史记录清空条件数据

            var handleHistoryRecordlocal = JSON.parse(localStorage.getItem('handleHistoryRecord'));
            var handleHistoryArr = handleHistoryRecordlocal || new Object();
            handleHistoryArr.history = 'true';
            localStorage.setItem('handleHistoryRecord', JSON.stringify(handleHistoryArr));

            // 判断类型决定值
            var keytype = typeof key === 'undefined' ? 'undefined' : _typeof(key);
            var indutype = typeof indu === 'undefined' ? 'undefined' : _typeof(indu);
            var regiontype = typeof region === 'undefined' ? 'undefined' : _typeof(region);
            var obj = new Object();
            if (keytype == 'string' && indutype == 'object' && regiontype == 'string') {
                obj.keyword = key;
                obj.industryId = '';
                obj.region = region;
                obj.count = 20;
                var objStr = JSON.stringify(obj);
                _reactRouter.browserHistory.push('/container/finresult/' + objStr);
                return;
            }
            if (keytype == 'string' && indutype == 'object' && regiontype == 'object') {
                obj.keyword = key;
                obj.industryId = '';
                obj.region = '';
                obj.count = 20;
                var _objStr = JSON.stringify(obj);
                _reactRouter.browserHistory.push('/container/finresult/' + _objStr);
            }
            if (keytype == 'string' && indutype == 'string' && regiontype === 'string') {
                obj.keyword = key;
                obj.industryId = indu;
                obj.region = region;
                obj.count = 20;
                var _objStr2 = JSON.stringify(obj);
                _reactRouter.browserHistory.push('/container/finresult/' + _objStr2);
            }
            if (keytype == 'string' && indutype == 'string' && regiontype == 'object') {
                obj.keyword = key;
                obj.industryId = indu;
                obj.region = '';
                obj.count = 20;
                var _objStr3 = JSON.stringify(obj);
                _reactRouter.browserHistory.push('/container/finresult/' + _objStr3);
            }
            if (keytype == 'object' && indutype == 'string' && regiontype == 'object') {
                obj.keyword = '';
                obj.industryId = indu;
                obj.region = '';
                obj.count = 20;
                var _objStr4 = JSON.stringify(obj);
                _reactRouter.browserHistory.push('/container/finresult/' + _objStr4);
            }
            if (keytype == 'object' && indutype == 'string' && regiontype == 'string') {
                obj.keyword = '';
                obj.industryId = indu;
                obj.region = region;
                obj.count = 20;
                var _objStr5 = JSON.stringify(obj);
                _reactRouter.browserHistory.push('/container/finresult/' + _objStr5);
            }
            if (keytype == 'object' && indutype == 'object' && regiontype == 'string') {
                obj.keyword = '';
                obj.industryId = '';
                obj.region = region;
                obj.count = 20;
                var _objStr6 = JSON.stringify(obj);
                _reactRouter.browserHistory.push('/container/finresult/' + _objStr6);
            }
        };

        _this2.handleHistory = function (value, index) {
            // 历史记录处理


            var arrList = JSON.parse(localStorage.getItem('userHistory')).length - 1;
            if (Boolean(value.keyword) && !Boolean(value.region) && Boolean(value.industryName) == false) {
                //当用户第一次输入行业类型没有选

                return _react2.default.createElement('div', { key: index }, _react2.default.createElement('div', { className: 'userHistory',
                    onClick: _this2.handleHistoryRecord.bind(_this2, value.keyword, value.industryId, value.region) }, value.keyword), _react2.default.createElement('div', { className: arrList > index ? 'historyBorder' : '' }));
            }
            if (Boolean(value.keyword) && !Boolean(value.region) && Boolean(value.industryName)) {
                return _react2.default.createElement('div', { key: index }, _react2.default.createElement('div', { className: 'userHistory',
                    onClick: _this2.handleHistoryRecord.bind(_this2, value.keyword, value.industryId, value.region) }, value.keyword, '+', value.industryName), _react2.default.createElement('div', { className: arrList > index ? 'historyBorder' : '' }));
            } else if (Boolean(value.keyword) && !Boolean(value.region) && !Boolean(value.industryName)) {

                return _react2.default.createElement('div', { key: index }, _react2.default.createElement('div', { className: 'userHistory',
                    onClick: _this2.handleHistoryRecord.bind(_this2, value.keyword, value.industryId, value.region) }, value.keyword), _react2.default.createElement('div', { className: arrList > index ? 'historyBorder' : '' }));
            } else if (Boolean(value.keyword) && Boolean(value.region) && !Boolean(value.industryName)) {

                return _react2.default.createElement('div', { key: index }, _react2.default.createElement('div', { className: 'userHistory',
                    onClick: _this2.handleHistoryRecord.bind(_this2, value.keyword, value.industryId, value.region) }, value.keyword, '+', value.region), _react2.default.createElement('div', { className: arrList > index ? 'historyBorder' : '' }));
            } else if (Boolean(value.keyword) && Boolean(value.region) && Boolean(value.industryName)) {
                return _react2.default.createElement('div', { key: index }, _react2.default.createElement('div', { className: 'userHistory',
                    onClick: _this2.handleHistoryRecord.bind(_this2, value.keyword, value.industryId, value.region) }, value.keyword, '+', value.region, '+', value.industryName), _react2.default.createElement('div', { className: arrList > index ? 'historyBorder' : '' }));
            } else if (!Boolean(value.keyword) && !Boolean(value.region) && Boolean(value.industryName)) {

                return _react2.default.createElement('div', { key: index }, _react2.default.createElement('div', { className: 'userHistory',
                    onClick: _this2.handleHistoryRecord.bind(_this2, value.keyword, value.industryId, value.region) }, value.industryName), _react2.default.createElement('div', { className: arrList > index ? 'historyBorder' : '' }));
            } else if (!Boolean(value.keyword) && !Boolean(value.region) && !Boolean(value.industryName)) {
                return;
            } else if (!Boolean(value.keyword) && Boolean(value.region) && Boolean(value.industryName)) {
                return _react2.default.createElement('div', { key: index }, _react2.default.createElement('div', { className: 'userHistory',
                    onClick: _this2.handleHistoryRecord.bind(_this2, value.keyword, value.industryId, value.region) }, value.region, '+', value.industryName), _react2.default.createElement('div', { className: arrList > index ? 'historyBorder' : '' }));
            } else if (!Boolean(value.keyword) && Boolean(value.region) && !Boolean(value.industryName)) {
                return _react2.default.createElement('div', { key: index }, _react2.default.createElement('div', { className: 'userHistory',
                    onClick: _this2.handleHistoryRecord.bind(_this2, value.keyword, value.industryId, value.region) }, value.region), _react2.default.createElement('div', { className: arrList > index ? 'historyBorder' : '' }));
            }
        };

        _this2.handleKeyup = function (event) {
            // 通过form :表单onsubmit向web,发送请求，发现会将只之前的数据打印，通过在用户输入的时候将用户输入的，保存在local,确定用户请求的数据
            event.preventDefault();
            window.addEventListener('keyup', function (e) {
                if (e.keyCode == 13) {
                    // 当是通过的h5键盘，传递一个true,表示要走h5 跳转路径
                    _this2.handleSearch(true);
                }
            });
        };

        _this2.handleSearch = function (handleKeyUp) {

            var searchEmptyClear = JSON.parse(localStorage.getItem('searchEmptyfinishs')); //点击搜索，设置标记(防止组件销毁标记保存在local中)，清空搜索条件
            var searchObj = searchEmptyClear || {};
            searchObj.emptyClear = 'false';
            searchObj.release = 'false';
            searchObj.number = '1';
            searchObj.numberInitials = _this2.state.initial++; // 避免用户总是点击搜索
            localStorage.setItem('searchEmptyfinishs', JSON.stringify(searchObj));
            var industry = localStorage.removeItem('userIndustry'); // 清空行业类型
            var region = localStorage.removeItem('userRegion'); // 清空选择的区域

            var newindustryId = _this2.state.industryId;
            var newkeyword = _this2.state.keyword;
            var newregion = _this2.state.region;
            var newindustryName = _this2.state.industryName;

            if (newkeyword == '' && newindustryName == '' && newregion == '') {
                _this2.setState({ handleSearchEmpty: true });
                return;
            }

            _this2.setState({ handleSearchEmpty: false });
            _this2.setState({ clearecord: true });
            var newMessages = Object.assign({}, _this2.state.messages);
            newMessages.keyword = newkeyword;
            if (Boolean(newindustryId) == true) {
                newMessages.industryId = newindustryId;
            }
            if (Boolean(newregion) == true) {
                newMessages.region = newregion;
            }
            var strMessage = JSON.stringify(newMessages);

            var userHistory = localStorage.getItem('userHistory');
            var arr = JSON.parse(userHistory || '[]');
            arr.map(function (value, index) {
                if (value.keyword == newkeyword && value.industryName == newindustryName && value.region == newregion) {
                    arr.splice(index, 1);
                    newMessages.keyword = newkeyword;
                    newMessages.industryName = newindustryName;
                    newMessages.industryId = newindustryId;
                    newMessages.region = newregion;
                } else {
                    newMessages.keyword = newkeyword;
                    newMessages.industryName = newindustryName;
                    newMessages.region = newregion;
                    newMessages.industryId = newindustryId;
                }
            });
            if (arr.length > 9) {
                arr.splice(-1, 1);
            }
            // 第一次没有历史记录arr 数组不进循环
            if (arr.length == 0) {
                newMessages.keyword = newkeyword;
                if (Boolean(newindustryName) == true) {
                    newMessages.industryName = newindustryName;
                }
                if (Boolean(newregion) == true) {
                    newMessages.region = newregion;
                }
                if (Boolean(newindustryId) == true) {
                    newMessages.industryId = newindustryId;
                }
            }

            _this2.setState({ useHistory: !_this2.state.useHistory }); // 切换 state 状态触发 render
            var keyUpWord = JSON.parse(localStorage.getItem('userInputLocal')); // 用户输入的关键字

            var keyUpIndustry = Boolean(JSON.parse(strMessage).industryId);
            var keyUpregion = Boolean(JSON.parse(strMessage).region);
            var handleKeyUpResult = JSON.parse(localStorage.getItem('handleKeyResult')); // 获取行业地区存储

            if (handleKeyUpResult) {
                // 如果存在
                var handleKeyUpResultIndustry = handleKeyUpResult.industryId;
                var handleKeyUpRegion = handleKeyUpResult.region;
                if (handleKeyUpResultIndustry == JSON.parse(strMessage).industryId) {
                    //设定显示,
                    if (Boolean(handleKeyUpResultIndustry)) {
                        // 排除行业为空的情况相等
                        var IndustryRealse = true;
                    }
                }
                if (handleKeyUpRegion == JSON.parse(strMessage).region) {
                    if (Boolean(handleKeyUpRegion)) {
                        //排除地区为空的情况相等
                        var regoinRealse = true;
                    }
                }
            }

            var finalResult = IndustryRealse || regoinRealse; //行业地区任意对应一个就好

            if (keyUpWord == null && finalResult) {
                //没有选择关键字，行业和地区中任意对应一个
                console.log(strMessage);
                var keyUpWordsure = true; // 当没有设置关键字的时候 任意选择行业地区的中的一个都可以跳转 keyUpWordsure 释放跳转的标记
            }
            if (keyUpWord != null) {
                //

                if (!handleKeyUpResultIndustry || !handleKeyUpRegion) {
                    // 只设置了关键字，

                    keyUpWordsure = JSON.parse(strMessage).keyword == keyUpWord.userInput;
                }
                if (IndustryRealse || regoinRealse) {
                    //

                    keyUpWordsure = JSON.parse(strMessage).keyword == keyUpWord.userInput;
                }
            }
            if (handleKeyUp && keyUpWordsure) {
                // h5控制键盘提交的时候走这里
                arr.unshift(newMessages);
                localStorage.setItem('userHistory', JSON.stringify(arr));
                _reactRouter.browserHistory.push('/container/finresult/' + strMessage);
                return;
            } else if (!handleKeyUp) {
                arr.unshift(newMessages);
                localStorage.setItem('userHistory', JSON.stringify(arr));
                _reactRouter.browserHistory.push('/container/finresult/' + strMessage);
            }
        };

        _this2.handleHeighLevel = function () {
            //点击取消
            var industry = localStorage.removeItem('userIndustry'); // 清空行业类型
            var input = localStorage.removeItem('userInputLocal'); // 清空用户输入的值
            var region = localStorage.removeItem('userRegion'); // 清空选择的区域
            localStorage.removeItem('handleKeyResult');

            var strIndustry = _this2.props.params.instryName;
            var strindex = strIndustry.indexOf('user');
            if (strindex != -1) {
                var IndustryuserId = JSON.parse(_this2.props.params.instryName);
                if (IndustryuserId.userId) {
                    var userObj = new Object();
                    userObj.userId = parseInt(IndustryuserId.userId);
                    var userId = JSON.stringify(userObj);
                }
            }

            _reactRouter.browserHistory.push('/');
        };

        _this2.handleStart = function () {
            return _react2.default.createElement('div', { className: 'lookOrgan' }, _react2.default.createElement('form', { onSubmit: _this2.handleKeyup }, _react2.default.createElement('div', { className: 'top_Serach' }, _react2.default.createElement('div', { className: 'searchChange' }, _react2.default.createElement('span', null), _react2.default.createElement('input', { autoFocus: true, ref: 'keyword', type: 'search', placeholder: "\u8BF7\u8F93\u5165\u7EC4\u7EC7\u540D\u79F0",
                value: _this2.state.keyword, onChange: _this2.handleInput })), _react2.default.createElement('span', { onClick: _this2.handleHeighLevel }, "\u53D6\u6D88")), _react2.default.createElement('div', { className: 'select' }, _react2.default.createElement('div', { className: 'industry', onClick: _this2.handleIndustry }, _react2.default.createElement('span', null, " \u884C\u4E1A\u7C7B\u578B "), ' ', _react2.default.createElement('b', null, _this2.state.industryName), ' ', _react2.default.createElement('span', null)), _react2.default.createElement('div', { className: 'line' }), _react2.default.createElement('div', { className: 'industry', onClick: _this2.handleRrgion }, _react2.default.createElement('span', null, "\u5730\u533A"), ' ', _react2.default.createElement('b', null, _this2.state.region), ' ', _react2.default.createElement('span', null))), _react2.default.createElement('div', { className: 'searchBtn', onClick: _this2.handleSearch.bind(_this2, false) }, "\u641C\u7D22")), _react2.default.createElement('div', { className: 'searchRecord' }, _react2.default.createElement('div', { className: 'historyRecord' }, localStorage.getItem('userHistory') == null ? '' : JSON.parse(localStorage.getItem('userHistory')).map(_this2.handleHistory)), _react2.default.createElement('div', { className: _this2.state.clearecord ? 'empty' : 'emptyNone', onClick: _this2.handleEmpty }, "\u6E05\u7A7A\u641C\u7D22\u8BB0\u5F55"), _react2.default.createElement('div', { className: _this2.state.handleSearchEmpty ? 'handleSearchEmpty' : 'handleSearchnone' }, "\u8BF7\u586B\u5199\u641C\u7D22\u6761\u4EF6"), _react2.default.createElement('div', { className: _this2.state.clearecord ? 'changNone' : 'changeTrans' }, "\u5DF2\u6E05\u9664")));
        };

        _this2.state = {
            keyword: '',
            industryId: '',
            industryName: '',
            region: '',
            initial: 1,
            useHistory: false,
            start: true,
            handleSearchEmpty: false,
            updateInput: false,
            clearecord: true,
            searchEmptyClear: true,
            conditionRealse: false,
            selectIndustry: '',
            selectRegion: '',
            responseSussess: false,
            onkeyUpkeyword: '',
            onkeyUpRealse: false,
            messages: {
                keyword: '',
                industryId: '',
                region: '',
                count: 20,
                beginOrgId: 0
            }
        };
        return _this2;
    }

    _createClass(FindOrganize, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            document.title = '搜索';
            localStorage.removeItem('userInputLocal'); // 这是在h5键盘,发送请求的开始
            localStorage.removeItem('handleKeyResult');
            var strIndustry = this.props.params.instryName;
            if (strIndustry) {
                var strindex = strIndustry.indexOf('user');
                if (strindex != -1) {
                    var IndustryuserId = JSON.parse(this.props.params.instryName);
                    if (IndustryuserId.userId) {
                        var userObj = new Object();
                        userObj.userId = parseInt(IndustryuserId.userId);
                        this.fetch(JSON.stringify(userObj));
                    }
                }
            }
            this.setState({ responseSussess: true });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            // 取用户输入的最后的那个值 每次返回都会执行这里
            var _this = this;
            if (this.props.params.instryName == undefined) {
                // 直接点击上面的返回按钮，没有传递 params
                return;
            }
            var arrInstry = this.props.params.instryName.split('+'); // props.params : 路由跳转，就会通过路由取值
            //发现在选择地区或者行业的时候，组件回退，选不选条件，都会将最近最后一的条件选择 进行会传递  通loal保存筛选条件 ，
            var latelyrollback = JSON.parse(localStorage.getItem('searchEmptyfinishs'));

            if (latelyrollback != null && latelyrollback.release == 'false') {
                //点击搜索，避免回退组件设置筛选条件，点击地区行业 释放
                return;
            }
            var releaseControl = JSON.parse(localStorage.getItem('releaseLocal')); // 设置只有在选择行业 地区的情况下 params 传递的值才可以
            if (releaseControl == null || releaseControl.release == 'false') {
                //当第一次或者没有点击地区或者行业的时候 params ，传递的值不可以用

                arrInstry.length = 1;
            } else if (releaseControl && releaseControl.release == 'true') {
                //点击选择条件 才使用 params
                var releaseControlObj = releaseControl || new Object();
                releaseControlObj.release = 'false';
                localStorage.setItem('releaseLocal', JSON.stringify(releaseControlObj));
            }

            var handleHistoryMasks = JSON.parse(localStorage.getItem('handleHistoryRecord'));
            if (handleHistoryMasks != null && handleHistoryMasks.history == 'true') {
                var handleHistoryMaskschange = JSON.parse(localStorage.getItem('handleHistoryRecord'));
                var handleHistoryArr = handleHistoryMaskschange || new Object();
                handleHistoryArr.history = 'false';
                localStorage.setItem('handleHistoryRecord', JSON.stringify(handleHistoryArr));
                arrInstry.length = 1; // 改变数组的长度,阻止在点击历史记录所搜条件发生改变
            }

            if (arrInstry.length >= 2) {
                //在选中行业或者地区的时候 参数的数组长度是大于2 的
                var userInputLocal = JSON.parse(localStorage.getItem('userInputLocal'));

                if (userInputLocal != null) {
                    // localStorage 没有值的情况
                    var _userInputLocal = JSON.parse(localStorage.getItem('userInputLocal'));
                    var lastUserInput = _userInputLocal.userInput;
                    this.setState({ keyword: lastUserInput });
                }
                if (arrInstry[2] == '1') {
                    // 标记1代表选择的行业 将选中的行业设置在local 里面

                    var industryArrObj = new Object();
                    industryArrObj.industryId = arrInstry[0];
                    industryArrObj.industryName = arrInstry[1];
                    industryArrObj.region = arrInstry[3]; // 地区
                    industryArrObj.keyword = arrInstry[4];
                    this.setState({ selectIndustry: industryArrObj });
                    _this.handleLocal(industryArrObj);
                }
                if (arrInstry[3] == '2') {
                    // 从后向前推，只有在选择了前面后面被选
                    if (arrInstry[2] != "- -") {
                        // 获取最后一个地区值
                        var localRegionone = arrInstry[2];
                    }
                    if (arrInstry[2] == "- -") {
                        localRegionone = '';
                    }
                    if (arrInstry[1] != "- -") {
                        var localRegiontwo = arrInstry[1];
                    }
                    if (arrInstry[1] == "- -") {
                        localRegiontwo = '';
                    }
                    if (arrInstry[0] != "- -") {
                        var localRegionthree = arrInstry[0];
                    }
                    if (arrInstry[0] == "- -") {
                        localRegionthree = '';
                    }
                    var regionArrObj = new Object();
                    regionArrObj.region = localRegionthree + localRegiontwo + localRegionone;
                    regionArrObj.industryName = arrInstry[5];
                    regionArrObj.industryId = arrInstry[4]; // 行业
                    regionArrObj.keyword = arrInstry[6];
                    if (arrInstry[6] == 'undefined') {
                        regionArrObj.keyword = '';
                    }
                    this.setState({ selectRegion: regionArrObj });

                    _this.handleLocal(regionArrObj);
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {

            if (this.state.responseSussess) {
                return this.handleStart();
            } else {
                return _react2.default.createElement('div', null);
            }
        }
    }]);

    return FindOrganize;
}(_react.Component);

exports.default = FindOrganize;

//# sourceMappingURL=FindOrganize-compiled.js.map

//# sourceMappingURL=FindOrganize-compiled-compiled.js.map