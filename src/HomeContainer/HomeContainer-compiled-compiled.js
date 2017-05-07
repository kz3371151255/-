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

require('./Home/Home.css');

var _movieService = require('../services/movieService.js');

var _movieService2 = _interopRequireDefault(_movieService);

var _reactRouter = require('react-router');

var _UpstreamDetaildata = require('./UpstreamDetaildata/UpstreamDetaildata.js');

var _UpstreamDetaildata2 = _interopRequireDefault(_UpstreamDetaildata);

var _Region = require('../common/Region/Region.js');

var _region = require('../data/region.js');

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
   * 首页容器组件
   * */

var uuu = navigator.userAgent;
var isIos = !!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) == true;
if (isIos) {
    window.webkit && window.webkit.messageHandlers.getAreaList.postMessage(null);
    window.txt = 111;
    window.handleAreaFromIosData = function (getArea) {
        txt = getArea || '没有获取到数 据';
        return txt;
    };
}

var HomeContainer = function (_Component) {
    _inherits(HomeContainer, _Component);

    function HomeContainer(props) {
        _classCallCheck(this, HomeContainer);

        var _this = _possibleConstructorReturn(this, (HomeContainer.__proto__ || Object.getPrototypeOf(HomeContainer)).call(this, props));

        _this.getLianData = function () {
            // 拦截 android 和 ios 的 数据
            var uuu = navigator.userAgent;
            var isAndroid = uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
            var isIos = !!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) == true;
            if (isIos) {
                return window.txt;
            } else if (isAndroid) {
                return window.androidJsInterface && window.androidJsInterface.getArea();
            }
        };

        _this.fetch = function (message) {
            // 首次进入页面请求数据
            var messageObj = Object.assign({}, message);
            var location = JSON.stringify(_this.props.location.query);
            var locationuserId = JSON.parse(location).userId;
            if (!JSON.parse(location).userId) {
                locationuserId = JSON.parse(_this.props.params.homeUser).userId;
            }

            messageObj.userId = parseInt(locationuserId);
            var messageStr = JSON.stringify(messageObj);

            var promise = _movieService2.default.getFocusedIndustry(messageStr);
            promise.then(function (json) {
                // 将数组中的第一个设定为选择行业 homeUser 是设定行业模块传递过来的

                if (_this.props.params.homeUser && JSON.parse(_this.props.params.homeUser).industryId) {
                    //选中了行业，就不要将首次获取的行业id 作为请求的参数的获取对应的行业,setIndustryArr 是获取对应组织参数
                    var industrySelect = JSON.parse(_this.props.params.homeUser);

                    _this.setState({ setIndustry: industrySelect.industryName, setIndustryArr: industrySelect, setIndustryId: industrySelect.industryId });
                    return;
                }
                if (json == '') {
                    return;
                }
                json = JSON.parse(json); //开始没有
                _this.setState({ setIndustry: json.industryList[0].industryName, setIndustryArr: json.industryList[0], setIndustryId: json.industryList[0].industryId, regionClear: json.industryList[0] });
                // 当用户选中行业的时候
            }), function (reason) {
                console.log(reason);
            };
        };

        _this.fetchUpstream = function () {
            //对应的上游行业请求

            var messageUpstream = Object.assign({}, _this.state.messages);
            if (messageUpstream.industryId != _this.state.setIndustryId) {
                // 当前后要求请求的行业ID数据不相同的时候才发起请求
                messageUpstream.industryId = _this.state.setIndustryId;
            } else {
                return;
            }
            var messageUpstreamStr = JSON.stringify(messageUpstream);
            var promiseUpstream = _movieService2.default.getOppositeIndustryList(messageUpstreamStr);
            promiseUpstream.then(function (json) {
                json = JSON.parse(json);
                if (json.industryList) {
                    _this.setState({ CorrespondingIndustry: json.industryList });
                }
            });
        };

        _this.handleCorresponding = function (value, index) {
            //对应上游行业遍历填充数据
            if (value != null) {
                return _react2.default.createElement('div', { className: 'UpstreamIndustryContainer' }, _react2.default.createElement('div', { className: 'UpstreamIndustry', key: index, onClick: _this.handleSelectUpStream.bind(_this, value.industryId, value.industryName) }, value.industryName));
            }
        };

        _this.handleSelectUpStream = function (industryId, industryName) {
            //点击对应上游行业，将点击的那条行业,id,name作为参数,传递给子组件同时rotateArr=false ,对应上游行业收起，
            var handleSelectObj = new Object();
            handleSelectObj.industryId = industryId;
            handleSelectObj.industryName = industryName;
            handleSelectObj.type = 0; //选择对应的上游行业type 都是的 0
            handleSelectObj.region = _this.state.regionId;
            _this.setState({ setUpstreamIndustry: industryName, setIndustryArr: handleSelectObj, rotateArr: false });
        };

        _this.handleSeleteIndustry = function () {
            var userProps = JSON.stringify(_this.props.location.query);
            var userId = JSON.parse(userProps).userId;
            if (!JSON.parse(userProps).userId) {
                userId = parseInt(JSON.parse(_this.props.params.homeUser).userId);
                /* userId = 10382*/
            }

            var userObj = new Object();
            userObj.userId = userId;
            userObj.type = 1; // 上游行业的type =1
            var userstr = JSON.stringify(userObj);
            _reactRouter.browserHistory.push('/container/selIndustry/' + userstr);
        };

        _this.handelUpstream = function () {
            //点击找上游，请求数据
            _this.fetchUpstream();
            if (_this.state.upStreamNumber == 1 || _this.state.rotateArr) {
                // 当第一次请求rotateArr 还是false ,所以用 upStreamNumber=1 标记开始
                _this.fetchUpstream();
            }
            _this.setState({ rotateArr: !_this.state.rotateArr, rotateRegion: false, upStreamNumber: _this.state.upStreamNumber++ });
            if (_this.state.upStreamNumber > 5) {
                //避免总是点击，累积太大
                _this.setState({ upStreamNumber: 2 });
            }
        };

        _this.regionUpstream = function () {
            //点击选择地区按钮，回到初始值

            _this.setState({ rotateRegion: !_this.state.rotateRegion, rotateArr: false, regionControl: true });
        };

        _this.handleTwoLevel = function (index, id, fullname, ischildren) {

            if (ischildren == 0) {
                var regionObj = Object.assign({}, _this.state.setIndustryArr);
                regionObj.region = id;
                _this.setState({ currentIndex: index, setIndustryArr: regionObj, region: fullname, regionId: id, rotateRegion: false, regionControl: true });
            }
        };

        _this.handleCurrentIndex = function (index, id, fullname) {
            //最后一级,对应显示当前颜色:通过点击事件传递当前索引,在点击事件里面将对应的索引保存在currentIndex 中，在遍历循环的时候，判断currentIndex ,来判断是否是当前

            var regionObj = Object.assign({}, _this.state.setIndustryArr);
            regionObj.region = id;
            _this.setState({ currentIndex: index, setIndustryArr: regionObj, region: fullname, regionId: id, rotateRegion: false, regionControl: true, threelevelColor: '#333', threelevelFontColor: '#333', threeLevelCurrentFontColor: false, totalChangeBackground: false, twoLevelBackgroundColor: '#f5f5f5', twoLevelfontColor: '#333 ' });
            // threeLevelCurrentFontColor : 当选中三级地区的时候，这里用的是短路运算，否定前面，执行被选中的
        };

        _this.handleCountry = function () {
            // 点击全国地区发送空的字符串
            var regionObj = Object.assign({}, _this.state.setIndustryArr);
            regionObj.region = '';
            _this.setState({ setIndustryArr: regionObj, region: '全国', rotateRegion: false, regionControl: true, backgroundColor: '#fff', fontSizecolor: '#00A0E9', clickIndex: null, fathContainerWidth: '100%', displayTotal: 'none', threeLevelDisplay: 'none', regiondisplay: 'none', threelevelFontColor: '#333' });
            /*fathContainerWidth:'100%',displayTotal:'none' 在点击选中全国的时候,一级地区width:100%,整平幕显示,displayTotal:'none' 二级头上的全部进行隐藏 threeLevelDisplay : 三级地区全部隐藏 regiondisplay: 用户在选择到最后一级突然选择了全国，此时最后一级隐藏*/
        };

        _this.handleThreeLevel = function () {
            // 点击选择最后的那个一级全部,将二级地区发送过去

            var regionObj = Object.assign({}, _this.state.setIndustryArr);
            regionObj.region = _this.state.twoLevelCurrent;
            _this.setState({ setIndustryArr: regionObj, region: _this.state.twoLevelRegionFullName, regionId: _this.state.twoLevelCurrent, rotateRegion: false, regionControl: true, rotateArr: false, threelevelFontColor: "#00A0E9", twoLevelfontColor: '#333', twoLevelBackgroundColor: '#f5f5f5', threeLevelCurrentFontColor: '#333', totalChangeBackground: false, threelevelColor: '#00a0e9' }); // 点击三级全部，二级选中的全部，清除出样式
            //threeLevelCurrentFontColor : 在点击三级地区全部的时候,三级地区对应的地区,标记为未选中,（即字体颜色为黑色）
        };

        _this.state = {
            rotateArr: false, //对应上游行业
            rotateRegion: false, //地区图标按钮
            setIndustryArr: {},
            setIndustry: '',
            setIndustryId: '',
            region: '',
            regionId: '',
            CorrespondingIndustry: [],
            setUpstreamIndustry: '',
            upStreamNumber: 1,
            local: '',
            fathContainerWidth: '100%',
            clickIndex: null,
            regionDetail: null,
            regiondisplay: null,
            borderDisplay: '1px solid #E1E1E1', // 页面开始的时候一级显示整行,且下面有边框,点击一级当前的有边框
            onLevel: '', // 点击一级二级每行有底边框
            currentIndex: '', // 点击事件判断当前索引
            FontColor: '#333',
            regionClear: '', // 当第一次选择地区的时候，把进入页面是的行业id 清空
            regionControl: true,
            twoLevelRegionControl: true, //点击第一级时候，第二级颜色全白显示
            percentThree: '33.33%',
            percentFive: '50%',
            userId: '',
            againuserId: '',
            backgroundLoad: '#fff',
            displayTotal: 'none',
            backgroundColor: '#f5f5f5', // 全国设置的背景色
            fontSizecolor: '#333', // 全国设置字体颜色
            twoLevelBackgroundColor: '#f5f5f5', // 2级全部设置背景色
            twoLevelfontColor: '#333', //2 级全部设置字体颜色
            threeLevelBackgroundColor: '#fff',
            threelevelColor: '#333',
            newCurrent: '', //保存当前点击第一级的地区id
            regionFullname: '', //保存一级的地区名
            twoLevelCurrent: '', // 保存二级地区的id
            twoLevelRegionFullName: '', // 保存二级地区的名称
            threelevelFontColor: '#333', // 最后一级全部字体颜色
            threeLevelCurrentFontColor: '#333',
            totalChangeBackground: false, //当在选择的完二级地区,在选择全部这里用来清除选的二级地区
            message: {
                type: 1,
                userId: ''
            },
            messages: {
                type: 0,
                industryId: ''
            }
        };
        return _this;
    }

    _createClass(HomeContainer, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            //加载要找首页获取userId,通过配置路由传递userId
            var downObj = new Object(); // 页面初始的时候就要保证 类型
            downObj.type = 1;
            this.setState({ setIndustryArr: downObj });
            var userProps = this.props.params.homeUser;
            this.setState({ userId: userProps, regiondisplay: 'none', local: this.getLianData.bind(this)() });
            document.title = '找上游';
            this.fetch(this.state.message);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var style = {
                threeLevelRegion: {
                    borderBottom: '1px solid #e1e1e1', height: '3.67rem', lineHeight: '3.67rem', textIndent: '1rem', color: this.state.threelevelFontColor, background: this.state.threeLevelBackgroundColor
                }
            };
            return _react2.default.createElement('div', { className: 'upStream' }, _react2.default.createElement('div', { className: 'upStreamTopbox' }, _react2.default.createElement('div', { className: 'selectIndustry' }, _react2.default.createElement('span', null, this.state.setIndustry), ' ', _react2.default.createElement('span', { onClick: this.handleSeleteIndustry }, "\u9009\u62E9\u884C\u4E1A")), _react2.default.createElement('div', { className: 'Corresponding' }, _react2.default.createElement('span', { className: this.state.rotateArr ? 'rotateUp' : 'rotateDown', onClick: this.handelUpstream }, "\u5BF9\u5E94\u4E0A\u6E38\u884C\u4E1A  "), _react2.default.createElement('span', { className: this.state.rotateRegion ? 'regionUp' : 'regionDown', onClick: this.regionUpstream }, "\u5730\u533A")), _react2.default.createElement('div', { className: 'default' }, _react2.default.createElement('div', { className: 'default_left whitepoint' }, _react2.default.createElement('span', { style: { overflow: 'hidden', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' } }, this.state.setUpstreamIndustry == '' ? '全部' : this.state.setUpstreamIndustry)), _react2.default.createElement('div', { className: 'streamBorder' }), _react2.default.createElement('div', { className: 'default_right' }, _react2.default.createElement('span', { style: { overflow: 'hidden', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' } }, this.state.region == '' ? '全国' : this.state.region)))), _react2.default.createElement('div', { className: this.state.rotateArr ? 'responseIndustryBlock' : 'responseIndustryNone' }, _react2.default.createElement('div', { className: 'resopnseIndustry' }, this.state.CorrespondingIndustry.length < 1 ? '' : this.state.CorrespondingIndustry.map(this.handleCorresponding))), _react2.default.createElement('div', { className: this.state.rotateRegion ? 'responseIndustryBlock' : 'responseIndustryNone' }, _react2.default.createElement('div', { className: 'RegionSet' }, _react2.default.createElement('div', { className: 'RegionSetContainer' }, _react2.default.createElement('div', { onClick: this.handleCountry, style: { width: this.state.fathContainerWidth, background: this.state.backgroundColor, height: '3.67rem', lineHeight: '3.67rem', color: this.state.fontSizecolor, fontSize: '1.17rem', textIndent: '1rem', borderBottom: '1px solid #e1e1e1' } }, "\u5168\u56FD"), _region.RegionData.map(function (value, indexs) {
                return _react2.default.createElement(_Region.Region, {
                    key: indexs,
                    index: indexs //当前索引
                    , fathContainerWidth: _this2.state.fathContainerWidth //最外层设置宽度
                    , content: _react2.default.createElement('p', { style: { height: '3.63rem', borderBottom: _this2.state.borderDisplay, lineHeight: '3.63rem', textIndent: '1rem', overflow: 'hidden', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' } }, value.fullname),
                    displayTotal: _this2.state.displayTotal //在没有点击一级地区的时候,隐藏二级上面的全部,因为二级的全部样式的层级高于一级全国,全国被覆盖

                    , backgroundColor: _this2.state.clickIndex == indexs ? 'displayClass' : 'noneClass',
                    fontColor: _this2.state.twoLevelfontColor,
                    twoLevelBackground: _this2.state.twoLevelBackgroundColor,
                    displayJudge: _this2.state.clickIndex == indexs ? true : false,
                    handleTotal: function handleTotal() {
                        // newCurrent: 保存一级id;当选择全部将一级的id 发送过去

                        var newCurrent = Object.assign({}, _this2.state.setIndustryArr);
                        newCurrent.region = _this2.state.newCurrent;

                        _this2.setState({ twoLevelBackgroundColor: '#fff', twoLevelfontColor: '#00A0E9', setIndustryArr: newCurrent, rotateArr: false, rotateRegion: false, region: _this2.state.regionFullname, regionId: _this2.state.newCurrent, threelevelFontColor: '#333', totalChangeBackground: true, threeLevelCurrentFontColor: '#333' });
                    },
                    handleGetIndex: function handleGetIndex(clickIndex) {
                        //当第一级点击的时候，子级宽50%,点击事件判断是不是当前的
                        //在点击第一级地区的时候，提前将行业Id,设置到要发送的数据上

                        _this2.setState({ clickIndex: clickIndex, SonClcikIndex: null, fatContainerLeft: _this2.state.percentFive, fathContainerWidth: _this2.state.percentFive, regionDetail: null, regiondisplay: 'none', borderDisplay: 'none', onLevel: '1px solid #E1E1E1', twoLevelRegionControl: true, displayTotal: 'block', backgroundColor: '#f5f5f5', fontSizecolor: '#333', newCurrent: value.id, regionFullname: value.fullname, twoLevelBackgroundColor: '#f5f5f5', twoLevelfontColor: '#333' });
                    },
                    contentStyle: { position: 'absolute', left: _this2.state.fatContainerLeft, width: _this2.state.fathContainerWidth, top: '0px', maxHeight: '28rem', overflowY: 'scroll', overflowScrolling: 'touch', overflowX: 'hidden', background: '#FFFFFF', borderLeft: '1px solid #e1e1e1' }
                }, value.areaList.map(function (val, ind) {
                    //当点击第二级的时候，有后代字迹宽变为33% ，没有还是保持50%

                    return _react2.default.createElement('div', null, _react2.default.createElement(_Region.Region, {
                        key: ind,
                        index: ind,
                        totalChangeBackground: _this2.state.totalChangeBackground ? 'noneClass' : false,
                        backgroundColor: _this2.state.SonClcikIndex == ind ? 'displayClass' : 'noneClass', backgroundControl: _this2.state.twoLevelRegionControl == true ? 'displayClasswhite' : false,

                        displayJudge: _this2.state.SonClcikIndex == ind ? true : false,
                        handleGetIndex: function handleGetIndex(sonindex) {
                            //点击第二级,清空第三级颜色设置 在次点击二级地区,totalChangeBackground:false,二级地区就会被重新选中，因为totalChangeBackground 不执行了执行 backgroundColor
                            _this2.setState({ regionDetail: val.areaList, onLevel: '', currentIndex: null, twoLevelCurrent: val.id, twoLevelRegionFullName: val.fullname, totalChangeBackground: false });
                            if (val.areaList.length > 0) {
                                //当有子元素的时候
                                _this2.setState({ SonClcikIndex: sonindex, fatContainerLeft: _this2.state.percentThree, fathContainerWidth: _this2.state.percentThree, geIndex: null, regiondisplay: 'block', twoLevelRegionControl: false, twoLevelBackgroundColor: '#f5f5f5', twoLevelfontColor: '#333 ', threeLevelDisplay: 'block', threelevelFontColor: '#333' });
                            } else {
                                _this2.setState({ SonClcikIndex: sonindex, fatContainerLeft: _this2.state.percentFive, fathContainerWidth: _this2.state.percentFive, geIndex: null, regiondisplay: 'none', twoLevelBackgroundColor: '#f5f5f5', twoLevelfontColor: '#333 ' });
                            }
                        },
                        content: _react2.default.createElement('p', { style: { height: '3.63rem', lineHeight: '3.63rem', borderBottom: _this2.state.onLevel, textIndent: '1.08rem', overflow: 'hidden', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis', borderLeft: '1px solid #e1e1e1' }, onClick: _this2.handleTwoLevel.bind(_this2, ind, val.id, val.fullname, val.areaList.length) }, val.fullname),

                        contentStyle: { position: 'absolute', left: '100%', top: '0px', width: '100%', zIndex: 88, height: '28rem', overflowY: 'scroll' }
                    }));
                }));
            }), _react2.default.createElement('div', { style: { position: 'absolute', top: '0rem', right: '0px', width: '33.3%', height: '28rem', overflowY: 'scroll', overflowScrolling: 'touch', background: '#fff', display: this.state.regiondisplay, borderLeft: '1px solid #e1e1e1' } }, '   ', _react2.default.createElement('div', { style: style.threeLevelRegion, onClick: this.handleThreeLevel }, "\u5168\u90E8"), this.state.regionDetail ? this.state.regionDetail.map(function (val, index) {

                var FontColor = null; //点击当前当前颜色变蓝色 其他还是黑色
                _this2.state.currentIndex == index ? FontColor = '#00A0E9' : FontColor = '#333';
                return _react2.default.createElement('div', { key: index, style: { height: '3.63rem', lineHeight: '3.63rem', borderBottom: '1px solid  #e1e1e1', textIndent: '1rem', color: _this2.state.threeLevelCurrentFontColor || FontColor, overflow: 'hidden', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }, onClick: _this2.handleCurrentIndex.bind(_this2, index, val.id, val.fullname) }, val.fullname);
            }) : "")))), _react2.default.createElement('div', { className: 'upStreamDetail' }, _react2.default.createElement(_UpstreamDetaildata2.default, { upStreamArr: this.state.setIndustryArr })));
        }
    }]);

    return HomeContainer;
}(_react.Component);

exports.default = HomeContainer;

//# sourceMappingURL=HomeContainer-compiled.js.map

//# sourceMappingURL=HomeContainer-compiled-compiled.js.map