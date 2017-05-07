'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('../js/config.js');

var _config2 = _interopRequireDefault(_config);

var _axios = require('../../node_modules/axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Created by cvtt on 2017/4/5.
 */
/*
 * 电影列表页面的service
 * */
exports.default = {
    //  body:是用来发送请求参数
    getRecomConentData: function getRecomConentData(message) {
        //请求下拉数据的方法
        var url = '/lianzi/discover/recommendOrg';
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(message);
            xhr.onreadystatechange = function () {
                var XMLHttpReq = xhr;
                if (XMLHttpReq.readyState == 4) {
                    if (XMLHttpReq.status == 200) {
                        var text = XMLHttpReq.responseText;
                        resolve(text);
                    }
                    if (XMLHttpReq.status == 202) {
                        var text = XMLHttpReq.responseText;
                        resolve(text);
                    }
                }
            };
        });
    },
    handleGetImgUrl: function handleGetImgUrl(urll, message) {
        // 请求轮播图的方法
        var url = '/lianzi/discover/getHomePageADInfo';
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(message);
            xhr.onreadystatechange = function () {
                var XMLHttpReq = xhr;
                if (XMLHttpReq.readyState == 4) {
                    if (XMLHttpReq.status == 200) {
                        var text = XMLHttpReq.responseText;
                        resolve(text);
                    }
                }
            };
        });
    },

    // 找组织搜索结果展示页面
    getSearchResult: function getSearchResult(message) {
        var url = '/lianzi/discover/searchOrg';
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(message);
            xhr.onreadystatechange = function () {
                var XMLHttpReq = xhr;
                if (XMLHttpReq.readyState == 4) {
                    if (XMLHttpReq.status == 200) {
                        var text = XMLHttpReq.responseText;
                        resolve(text);
                    }
                }
            };
        });
    },
    getIndustrayDetail: function getIndustrayDetail(message) {
        //行业内获取具体的行业
        var url = '/lianzi/discover/getIndustriesByKeyword';
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(message);
            xhr.onreadystatechange = function () {
                var XMLHttpReq = xhr;
                if (XMLHttpReq.readyState == 4) {
                    if (XMLHttpReq.status == 200) {
                        var text = XMLHttpReq.responseText;
                        resolve(text);
                    }
                }
            };
        });
    },
    getFocusedIndustry: function getFocusedIndustry(message) {
        // 上游行业开始关注行业
        var url = '/lianzi/discover/getFocusedIndustryList';
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(message);
            xhr.onreadystatechange = function () {
                var XMLHttpReq = xhr;
                if (XMLHttpReq.readyState == 4) {
                    if (XMLHttpReq.status == 200) {
                        var text = XMLHttpReq.responseText;
                        resolve(text);
                    }
                    if (XMLHttpReq.status == 202) {
                        var text = XMLHttpReq.responseText;
                        resolve(text);
                    }
                }
            };
        });
    },
    getisJoinOrg: function getisJoinOrg(message) {
        // 这里是的写 url 后面的路径
        var url = '/lianzi/discover/isJoinOrg ';
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(message);
            xhr.onreadystatechange = function () {
                var XMLHttpReq = xhr;
                if (XMLHttpReq.readyState == 4) {
                    if (XMLHttpReq.status == 200) {
                        var text = XMLHttpReq.responseText;
                        resolve(text);
                    }
                }
            };
        });
    },
    getOppositeIndustryList: function getOppositeIndustryList(message) {
        // 这里是的写 url 后面的路径
        var url = '/lianzi/discover/getOppositeIndustryList ';
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(message);
            xhr.onreadystatechange = function () {
                var XMLHttpReq = xhr;
                if (XMLHttpReq.readyState == 4) {
                    if (XMLHttpReq.status == 200) {
                        var text = XMLHttpReq.responseText;
                        resolve(text);
                    }
                }
            };
        });
    }
};

//# sourceMappingURL=movieService-compiled.js.map

//# sourceMappingURL=movieService-compiled-compiled.js.map