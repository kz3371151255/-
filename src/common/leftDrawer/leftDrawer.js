import React,  { PropTypes } from 'react';
import { Link } from 'react-router'
import Drawer from 'material-ui/Drawer';

import { Card } from '../levelMenu/levelMenu.jsx'

import { NoExpand , Expanded } from '../../../www/icon/icon'

const LeftDrawer = (props) => {
    const {roles,orgOption,list,handleChangeOrg,menuExpanded,dealwithData} = props
    return (
        <Drawer
            docked={true}
            open = {true}
            containerStyle = {{background:'#F8F8F7', width:'210px'}}
        >
            <div style={{lineHeight:'50px',height:'50px',marginBottom:'26px'}} />

            <div className = 'left_Level'>
                {/*list【我所在的组织信息列表】  roles【我有授权信息的组织列表的信息】 */}
                {/*普通用户登录成功没有可以查看的信息，  这里过滤掉没有权限信息的成员*/}
                {
                    list.map((value,index) => roles.get(String(value.get('autoId'))) && <Card
                        key = {index}   //KEY
                        expanded={menuExpanded == value.get('autoId')}  //是否展开
                        icon = {true}                   //icon 是否展示
                        expandedIcon = { <img src={Expanded} alt=""/> }  // 展开时 icon  样式
                        noexpandedIcon = { <img src={NoExpand} alt=""/> }   // 未展开时  icon  样式
                        iconStyle = {{left:29}}             //icon 样式
                        onExpandChange = {() => {           // 监听事件  【可选】
                            handleChangeOrg.bind(this,value.get('autoId'))()
                        } }
                        content = { <p className={(menuExpanded == value.get('autoId') ? 'left_But_Active' : "") + " left_Toggle_Header" } >{value.get('shortName')}
                            <span style={{color:'red',fontWeight:'bold'}}>
                                {dealwithData && dealwithData.toJS().find((v)=> {return v.orgId == value.get('autoId') && v.amount>0}) && '·'}
                            </span>
                        </p>}   //文本内容
                    >
                        {/*orgOption【左侧列表数据为 本地死数据 】*/}
                        {
                            orgOption &&
                            orgOption.map(({name,child},i) => {
                                let orgId = value.get('autoId')
                                {/*作为是否授权的判断，组织总秘和联网站总秘判断成立并且只判断一次*/}
                                var ifAuthorize = false;
                                {/*i==1 是所有组织成员可以看到的列表信息*/}
                                return i !=1 ?  roles.get(String(orgId)) && roles.get(String(orgId)).map((vv,ii) => {
                                    let roleName = vv.get('roleName')
                                    if(ifAuthorize == true){
                                        return
                                    }else if(
                                        ((i==0 && roleName == 'web-admin') || (value.get('opened') && i==0&&roleName=='web-editor')) //  第一个列表只有联网站总秘和被授权编辑人可以操作，目前只设置了联网站总秘
                                        || ( value.get('opened') && (i==2 && roleName == 'web-admin'))
                                        || (i==3 && (( value.get('opened') &&roleName == 'web-admin' ) || roleName=='web-total' ))
                                    ){
                                        ifAuthorize = true
                                        return <Card
                                            key = {i}
                                            icon = {true}
                                            expandedIcon = { <img src={Expanded} alt=""/> }
                                            noexpandedIcon = { <img src={NoExpand} alt=""/> }
                                            iconStyle = {{left:'45px'}}
                                            content = {
                                                i == 0
                                                    ? <p className="left_Toggle_Text"><Link to={{pathname:'/home/index',query:{active:'home'}}}>{name}</Link></p>
                                                    : <p className="left_Toggle_Text">{name}</p>}
                                        >
                                            {
                                                child.length > 0 && child.map((value,index) =>{


                                                    if(i != 3){
                                                        return <p key = {index} className="left_Toggle_Text left_Padding_16 TextIndent_20" style={{lineHeight:'32px',height:'32px'}}> <Link to={{pathname:value.link,query:{active:'home'}}}  style = {{color:'#666'}}>{value.option}</Link></p>
                                                    }else{
                                                        return roles.get(String(orgId)).map((vvv,iii) => {
                                                            let rolename = vvv.get('roleName')
                                                            if(
                                                                (index==0 && rolename == 'web-admin')
                                                                ||  (index==1 && rolename == 'web-total')
                                                            ){
                                                                return <p key = {index} className="left_Toggle_Text left_Padding_16 TextIndent_20" style={{lineHeight:'32px',height:'32px'}}> <Link to={{pathname:value.link,query:{active:'home'}}}  style = {{color:'#666'}}>{value.option}</Link></p>
                                                            }
                                                        })

                                                    }
                                                })
                                            }
                                        </Card>
                                    }

                                }) : value.get('opened') && <Card
                                    key = {i}
                                    icon = {true}
                                    expandedIcon = { <img src={Expanded} alt=""/> }
                                    noexpandedIcon = { <img src={NoExpand} alt=""/> }
                                    iconStyle = {{left:'45px'}}
                                    content = {
                                        i == 0
                                            ? <p className="left_Toggle_Text"><Link to={{pathname:'/home/index',query:{active:'home'}}}>{name}</Link></p>
                                            : <p className="left_Toggle_Text">{name}</p>}
                                >
                                    {
                                        child.length > 0 && child.map((value,index) =>

                                            <p key = {index} className="left_Toggle_Text left_Padding_16 TextIndent_20" style={{lineHeight:'32px',height:'32px'}}> <Link to={{pathname:value.link,query:{active:'home'}}}  style = {{color:'#666'}}>{value.option}</Link></p>
                                        )
                                    }
                                </Card>


                            } )
                        }
                    </Card> )
                }
            </div>

        </Drawer>
    )
}

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
}

import { connect } from 'react-redux'
import { handleChangeOrg } from '../../../actions/orgAcionts'

export default connect(
    state=>{
        const _org = state.get('org')
        return {
            list :_org.get('list'),
            org :_org.get('org'),
            roles: _org.get('roles'),
            dealwithData : state.getIn(['dealwith','dealwithData']),
            // menuExpanded:state.getIn(['menu','expanded']),
            menuExpanded:_org.getIn(['org','autoId']),

    }},
    dispatch=>({
        handleChangeOrg : handleChangeOrg(dispatch)
    })
)(LeftDrawer)

