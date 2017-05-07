'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Drawer = require('material-ui/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _levelMenu = require('../levelMenu/levelMenu.jsx');

var _icon = require('../../../www/icon/icon');

var _reactRedux = require('react-redux');

var _orgAcionts = require('../../../actions/orgAcionts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeftDrawer = function LeftDrawer(props) {
    var roles = props.roles,
        orgOption = props.orgOption,
        list = props.list,
        handleChangeOrg = props.handleChangeOrg,
        menuExpanded = props.menuExpanded,
        dealwithData = props.dealwithData;

    return _react2.default.createElement(
        _Drawer2.default,
        {
            docked: true,
            open: true,
            containerStyle: { background: '#F8F8F7', width: '210px' }
        },
        _react2.default.createElement('div', { style: { lineHeight: '50px', height: '50px', marginBottom: '26px' } }),
        _react2.default.createElement(
            'div',
            { className: 'left_Level' },
            list.map(function (value, index) {
                return roles.get(String(value.get('autoId'))) && _react2.default.createElement(
                    _levelMenu.Card,
                    {
                        key: index //KEY
                        , expanded: menuExpanded == value.get('autoId') //是否展开
                        , icon: true //icon 是否展示
                        , expandedIcon: _react2.default.createElement('img', { src: _icon.Expanded, alt: '' }) // 展开时 icon  样式
                        , noexpandedIcon: _react2.default.createElement('img', { src: _icon.NoExpand, alt: '' }) // 未展开时  icon  样式
                        , iconStyle: { left: 29 } //icon 样式
                        , onExpandChange: function onExpandChange() {
                            // 监听事件  【可选】
                            handleChangeOrg.bind(undefined, value.get('autoId'))();
                        },
                        content: _react2.default.createElement(
                            'p',
                            { className: (menuExpanded == value.get('autoId') ? 'left_But_Active' : "") + " left_Toggle_Header" },
                            value.get('shortName'),
                            _react2.default.createElement(
                                'span',
                                { style: { color: 'red', fontWeight: 'bold' } },
                                dealwithData && dealwithData.toJS().find(function (v) {
                                    return v.orgId == value.get('autoId') && v.amount > 0;
                                }) && '·'
                            )
                        ) //文本内容
                    },
                    orgOption && orgOption.map(function (_ref, i) {
                        var name = _ref.name,
                            child = _ref.child;

                        var orgId = value.get('autoId');
                        {/*作为是否授权的判断，组织总秘和联网站总秘判断成立并且只判断一次*/}
                        var ifAuthorize = false;
                        {/*i==1 是所有组织成员可以看到的列表信息*/}
                        return i != 1 ? roles.get(String(orgId)) && roles.get(String(orgId)).map(function (vv, ii) {
                            var roleName = vv.get('roleName');
                            if (ifAuthorize == true) {
                                return;
                            } else if (i == 0 && roleName == 'web-admin' || value.get('opened') && i == 0 && roleName == 'web-editor' || //  第一个列表只有联网站总秘和被授权编辑人可以操作，目前只设置了联网站总秘
                            value.get('opened') && i == 2 && roleName == 'web-admin' || i == 3 && (value.get('opened') && roleName == 'web-admin' || roleName == 'web-total')) {
                                ifAuthorize = true;
                                return _react2.default.createElement(
                                    _levelMenu.Card,
                                    {
                                        key: i,
                                        icon: true,
                                        expandedIcon: _react2.default.createElement('img', { src: _icon.Expanded, alt: '' }),
                                        noexpandedIcon: _react2.default.createElement('img', { src: _icon.NoExpand, alt: '' }),
                                        iconStyle: { left: '45px' },
                                        content: i == 0 ? _react2.default.createElement(
                                            'p',
                                            { className: 'left_Toggle_Text' },
                                            _react2.default.createElement(
                                                _reactRouter.Link,
                                                { to: { pathname: '/home/index', query: { active: 'home' } } },
                                                name
                                            )
                                        ) : _react2.default.createElement(
                                            'p',
                                            { className: 'left_Toggle_Text' },
                                            name
                                        )
                                    },
                                    child.length > 0 && child.map(function (value, index) {

                                        if (i != 3) {
                                            return _react2.default.createElement(
                                                'p',
                                                { key: index, className: 'left_Toggle_Text left_Padding_16 TextIndent_20', style: { lineHeight: '32px', height: '32px' } },
                                                ' ',
                                                _react2.default.createElement(
                                                    _reactRouter.Link,
                                                    { to: { pathname: value.link, query: { active: 'home' } }, style: { color: '#666' } },
                                                    value.option
                                                )
                                            );
                                        } else {
                                            return roles.get(String(orgId)).map(function (vvv, iii) {
                                                var rolename = vvv.get('roleName');
                                                if (index == 0 && rolename == 'web-admin' || index == 1 && rolename == 'web-total') {
                                                    return _react2.default.createElement(
                                                        'p',
                                                        { key: index, className: 'left_Toggle_Text left_Padding_16 TextIndent_20', style: { lineHeight: '32px', height: '32px' } },
                                                        ' ',
                                                        _react2.default.createElement(
                                                            _reactRouter.Link,
                                                            { to: { pathname: value.link, query: { active: 'home' } }, style: { color: '#666' } },
                                                            value.option
                                                        )
                                                    );
                                                }
                                            });
                                        }
                                    })
                                );
                            }
                        }) : value.get('opened') && _react2.default.createElement(
                            _levelMenu.Card,
                            {
                                key: i,
                                icon: true,
                                expandedIcon: _react2.default.createElement('img', { src: _icon.Expanded, alt: '' }),
                                noexpandedIcon: _react2.default.createElement('img', { src: _icon.NoExpand, alt: '' }),
                                iconStyle: { left: '45px' },
                                content: i == 0 ? _react2.default.createElement(
                                    'p',
                                    { className: 'left_Toggle_Text' },
                                    _react2.default.createElement(
                                        _reactRouter.Link,
                                        { to: { pathname: '/home/index', query: { active: 'home' } } },
                                        name
                                    )
                                ) : _react2.default.createElement(
                                    'p',
                                    { className: 'left_Toggle_Text' },
                                    name
                                )
                            },
                            child.length > 0 && child.map(function (value, index) {
                                return _react2.default.createElement(
                                    'p',
                                    { key: index, className: 'left_Toggle_Text left_Padding_16 TextIndent_20', style: { lineHeight: '32px', height: '32px' } },
                                    ' ',
                                    _react2.default.createElement(
                                        _reactRouter.Link,
                                        { to: { pathname: value.link, query: { active: 'home' } }, style: { color: '#666' } },
                                        value.option
                                    )
                                );
                            })
                        );
                    })
                );
            })
        )
    );
};

LeftDrawer.propTypes = {
    navDrawerOpen: _react.PropTypes.bool,
    menus: _react.PropTypes.array,
    username: _react.PropTypes.string
};

exports.default = (0, _reactRedux.connect)(function (state) {
    var _org = state.get('org');
    return {
        list: _org.get('list'),
        org: _org.get('org'),
        roles: _org.get('roles'),
        dealwithData: state.getIn(['dealwith', 'dealwithData']),
        // menuExpanded:state.getIn(['menu','expanded']),
        menuExpanded: _org.getIn(['org', 'autoId'])

    };
}, function (dispatch) {
    return {
        handleChangeOrg: (0, _orgAcionts.handleChangeOrg)(dispatch)
    };
})(LeftDrawer);

//# sourceMappingURL=leftDrawer-compiled.js.map