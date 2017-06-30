/**
 * Created by cvtt on 2017/3/15.
 */
/*
 * 找组织页面
 * */
 // 将用户的userId作为,存储的属性名,不同的用户存储的不同的搜索历史记录、
var uuu = navigator.userAgent;
var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
var isAndroid=uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
import React, { Component } from 'react'
import {browserHistory } from 'react-router'
import  service from'../services/movieService.js'
import {Overallsituation} from '../common/Overallsituation/Overallsituation.js'
import './css/organize.css'
export default class FindOrganize extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: '',
            industryId: '',
            clientheight:'',
            industryName: '',
            region: '',
            initial: 1,
            useHistory: false,
            start: true,
            handleSearchEmpty: false,
            updateInput: false,
            clearecord: false,
            AlearyClear:true,
            searchEmptyClear: true,
            conditionRealse: false,
            selectIndustry: '',
            selectRegion: '',
            responseSussess: false,
            onkeyUpkeyword: '',
            onkeyUpRealse: false,
            searchPrompt:'', // 点击搜索提示请填写的搜索内容隐藏,display:'none' 不占位置
            opacity:0,
            display:'none',
            local:'',
            intervalObj:{},
            cancleButton:'none',
            searchtop:'18.5rem',//点击搜索按钮时候的top
            interonline:'请填写搜索条件',
            messages: {
                keyword: '',
                industryId: '',
                region: '',
                count: 20,
                beginOrgId: 0,
                userId:JSON.parse(localStorage.getItem('localUserId')).userId
            }
        }
    }

    componentWillMount() {
        document.title = '搜索'
        window.handleGoBackHome = ()=>{ // andriod 和 ios 调用这个方法,进行返回
            this.handleCloseWindow()
        }

        if(isIos){ //没有用的获取数据的请求,为了配合ios按钮的返回
            window.handleAreaFromIosData  = (areaData)=>{
                this.setState({local:areaData})
            }
            window.webkit && window.webkit.messageHandlers.getAreaList.postMessage(null);
        }else if(isAndroid) {
            window.androidJsInterface && this.setState({local: window.androidJsInterface.getArea()})
        }
        //存储用户搜索的历史记录属性名,和用户的userId 进行绑定
        window.userhistoryId =  JSON.parse(localStorage.getItem('localUserId')).userId
        window.userHistory = userhistoryId+'userHistory'

        var userEmpty = []
        if(localStorage.getItem(userHistory)) { // 对历史记录进行数去重复
            let userArr =  JSON.parse(localStorage.getItem(userHistory))
           for(var i=0 ;i<userArr.length; i++){
                    var flag = true
               for(var j=0; j<userEmpty.length ;j++){
                   if(userEmpty[j].keyword == userArr[i].keyword && userEmpty[j].region == userArr[i].region && userEmpty[j].industryId == userArr[i].industryId ){
                      flag = false
                   }
               }
               if(flag){
                   userEmpty.push(userArr[i])
               }
           }

            localStorage.setItem(userHistory,JSON.stringify(userEmpty))
        }
        if(localStorage.getItem(userHistory) != null ){ // 判断历史记录,进行显示
            var juggleHistory = JSON.parse(localStorage.getItem(userHistory)).length
            if(juggleHistory >0){
                this.setState({clearecord:true})
            }
        }else {
            this.setState({clearecord:false})
        }

        localStorage.removeItem('userInputLocal') // 这是在h5键盘,发送请求的开始
        localStorage.removeItem('handleKeyResult')
        let strIndustry = this.props.params.instryName
        if(typeof strIndustry == 'string' ){  // 一个没有的必要的请求的，只是为了andriod 显示返回按钮
            let strindex = strIndustry.indexOf('user')
            if (strindex != -1) {
                let IndustryuserId = JSON.parse(this.props.params.instryName)
                if (IndustryuserId.userId) {
                    var userObj = new Object()
                    userObj.userId = parseInt(IndustryuserId.userId)
                    this.fetch(JSON.stringify(userObj))
                }
            }
        }
        this.setState({responseSussess: true,clientheight:document.documentElement.clientHeight})

    }

    fetch = (message)=> {// 首次进入页面请求数据

        const promise = service.getisJoinOrg(message)
        promise.then(()=> { // 将数组中的第一个设定为选择行业 homeUser 是设定行业模块传递过来的

            this.setState({responseSussess: true})

        }), reason => {

        }
    }
    handleCloseWindow =() =>{
        var uuu = navigator.userAgent;
        var isAndroid=uuu.indexOf('Android') > -1 || uuu.indexOf('Linux') > -1;
        var isIos=!!uuu.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true;
        if(isAndroid){
            return window.androidJsInterface && window.androidJsInterface.closeWindow()
        }else if(isIos){
            browserHistory.push('/')
        }
    }
    componentDidMount() { // 取用户输入的最后的那个值 每次返回都会执行这里
        document.documentElement.style.fontSize = innerWidth /31.25 +'px';
        window.onresize = function(){
            document.documentElement.style.fontSize = innerWidth /31.25 +'px';
        }
        const _this = this
        if (this.props.params.instryName == undefined) { // 直接点击上面的返回按钮，没有传递 params
            return
        }
        let arrInstry = this.props.params.instryName.split('+')// props.params : 路由跳转，就会通过路由取值
        //发现在选择地区或者行业的时候，组件回退，选不选条件，都会将最近最后一的条件选择 进行会传递  通loal保存筛选条件 ，

        let releaseControl = JSON.parse(localStorage.getItem('releaseLocal')) // 设置只有在选择行业 地区的情况下 params 传递的值才可以
        if (releaseControl == null || releaseControl.release == 'false') { //当第一次或者没有点击地区或者行业的时候 params ，传递的值不可以用
            arrInstry.length = 1

        } else if (releaseControl && releaseControl.release == 'true') { //点击选择条件 才使用 params
            let releaseControlObj = releaseControl || new Object()
            releaseControlObj.release = 'false'
            localStorage.setItem('releaseLocal', JSON.stringify(releaseControlObj))
        }
        let handleHistoryMasks = JSON.parse(localStorage.getItem('handleHistoryRecord'))
        if (handleHistoryMasks != null && handleHistoryMasks.history == 'true') {
            let handleHistoryMaskschange = JSON.parse(localStorage.getItem('handleHistoryRecord'))
            let handleHistoryArr = handleHistoryMaskschange || new Object()
            handleHistoryArr.history = 'false'
            localStorage.setItem('handleHistoryRecord', JSON.stringify(handleHistoryArr))
           // 改变数组的长度,阻止在点击历史记录所搜条件发生改变
        }

        if (arrInstry.length >= 2) { //在选中行业或者地区的时候 参数的数组长度是大于2 的
            let userInputLocal = JSON.parse(localStorage.getItem('userInputLocal'))

            if (userInputLocal != null) { // localStorage 没有值的情况
                let userInputLocal = JSON.parse(localStorage.getItem('userInputLocal'))
                let lastUserInput = userInputLocal.userInput
                this.setState({keyword: lastUserInput})
            }
            if (arrInstry[2] == '1') { // 标记1代表选择的行业 将选中的行业设置在local 里面

                let industryArrObj = new Object()
                industryArrObj.industryId = arrInstry[0]
                industryArrObj.industryName = arrInstry[1]
                industryArrObj.region = arrInstry[3] // 地区
                industryArrObj.keyword = arrInstry[4]
                this.setState({selectIndustry: industryArrObj})
                _this.handleLocal(industryArrObj)

            }
            if (arrInstry[3] == '2') { // 从后向前推，只有在选择了前面后面被选
                if (arrInstry[2] != "- -") { // 获取最后一个地区值
                    var localRegionone = arrInstry[2]
                }
                if (arrInstry[2] == "- -") {
                    localRegionone = ''
                }
                if (arrInstry[1] != "- -") {
                    var localRegiontwo = arrInstry[1]
                }
                if (arrInstry[1] == "- -") {
                    localRegiontwo = ''
                }
                if (arrInstry[0] != "- -") {
                    var localRegionthree = arrInstry[0]
                }
                if (arrInstry[0] == "- -") {
                    localRegionthree = ''
                }
                let regionArrObj = new Object()
                if(localRegionthree == localRegiontwo ){ //如果省和市相同,取其中一个就可以了
                    regionArrObj.region = localRegionthree  + localRegionone
                }else{
                    regionArrObj.region = localRegionthree + localRegiontwo + localRegionone
                }
                regionArrObj.industryName = arrInstry[5]
                regionArrObj.industryId = arrInstry[4]// 行业
                regionArrObj.keyword = arrInstry[6]
                if (arrInstry[6] == 'undefined') {
                    regionArrObj.keyword = ''
                }
                this.setState({selectRegion: regionArrObj})

                _this.handleLocal(regionArrObj)

            }
        }


    }

    handleLocal = (select)=> { //取用户最后选取的值作为,最终选中显示的结果
            let handleKeyUpResult = JSON.parse(localStorage.getItem('handleKeyResult')) //这个local是用来判断H5输入值的匹配
            let handleResultObj = handleKeyUpResult || new Object()
            handleResultObj.region = select.region
            handleResultObj.industryId = select.industryId
            handleResultObj.industryName = select.industryName
            handleResultObj.keyword = select.keyword
            if(!select.keyword){
                handleResultObj.keyword = ''
                select.keyword = ''
            }
            localStorage.setItem('handleKeyResult', JSON.stringify(handleResultObj))
            this.setState({
                region: select.region,
                industryId: select.industryId,
                industryName: select.industryName,
                keyword: select.keyword
            })
            return

        if (changeEmpty != null && changeEmpty.number == '1') { //点击过搜索按钮标记number=1
            let handleKeyUpResult = JSON.parse(localStorage.getItem('handleKeyResult'))
            let handleResultObj = handleKeyUpResult || new Object()
            handleResultObj.region = select.region
            handleResultObj.industryId = select.industryId
            handleResultObj.industryName = select.industryName
            handleResultObj.keyword = select.keyword
            if(!select.keyword){
                handleResultObj.keyword = ''
                select.keyword = ''
            }
            localStorage.setItem('handleKeyResult', JSON.stringify(handleResultObj))
            this.setState({
                region: select.region,
                industryId: select.industryId,
                industryName: select.industryName,
                keyword: select.keyword
            })

        }

        if (changeEmpty != null && changeEmpty.emptyClear == 'false' && changeEmpty.numberInitials == '1') { //numberInitials :防止用户总是点击搜索，搜索内容被清空   emptyClear  : 表示已经点击了
            localFinalRegion = ''
            localFinalIndustryId = ''
            localFinalIndustryName = ''
            let handleKeyUpResult = JSON.parse(localStorage.getItem('handleKeyResult'))
            let handleResultObj = handleKeyUpResult || new Object()
            handleResultObj.region = select.region
            handleResultObj.industryId = select.industryId
            handleResultObj.industryName = select.industryName
            handleResultObj.keyword = select.keyword
            if(!select.keyword){
                handleResultObj.keyword = ''
                select.keyword = ''
            }
            localStorage.setItem('handleKeyResult', JSON.stringify(handleResultObj))
            this.setState({
                region: select.region,
                industryId: select.industryId,
                industryName: select.industryName,
                keyword: select.keyword
            })
        }
        if (this.state.searchEmptyClear) { //点击完搜索，将内存local  numberInitials 值更改，
            var obj = new Object()
            let searchEmptyAfter = changeEmpty || obj
            searchEmptyAfter.emptyClear = 'true'
            searchEmptyAfter.numberInitials = '1'
            localStorage.setItem('searchEmptyfinishs', JSON.stringify(searchEmptyAfter))

        }

    }
    handleInput = (e)=> {//将用户输入的值 存储在 localStorage 中

        let userValue = e.target.value.trim()
        if (userValue.length > 50) {
            userValue = userValue.slice(0, 50) + '...'
        }

        let userInputLocal = JSON.parse(localStorage.getItem('userInputLocal'))
        let userInputArr = userInputLocal || new Object()
        userInputArr.userInput = userValue
        localStorage.setItem('userInputLocal', JSON.stringify(userInputArr))
        this.setState({keyword: userValue, onkeyUpkeyword: userValue})
        if(userValue !==''){
            this.setState({cancleButton:'block'})
        }else {
            this.setState({cancleButton:'none'})
        }
    }
    handleEmpty = ()=> { // 清空的时候改变state  状态重新渲染

        this.setState({useHistory: !this.state.useHistory})
        localStorage.removeItem(userHistory)
        this.setState({AlearyClear:false,clearecord:false})
    }


    handleIndustry = ()=> { // 行业类型跳转路由

        let IndustryRelease = JSON.parse(localStorage.getItem('searchEmptyfinishs'))
        var IndustrynReleaseObj = IndustryRelease || new Object()
        IndustrynReleaseObj.release = 'true'  // 当用户点击多次搜索，避免第一次设置不上地区行业条件
        localStorage.setItem('searchEmptyfinishs', JSON.stringify(IndustrynReleaseObj))
        let releaseControl = JSON.parse(localStorage.getItem('releaseLocal')) // 设置只有在选择行业 地区的情况下 params 传递的值才可以
        let releaseControlObj = releaseControl || new Object()
        releaseControlObj.release = 'true'

        localStorage.setItem('releaseLocal', JSON.stringify(releaseControlObj))
        let selectRegion = new Object()
        selectRegion.region = this.state.region
        if (!this.state.region) {
            selectRegion.region = ''
        }
        selectRegion.keyword = this.state.keyword
        selectRegion.industryName= this.state.industryName
        selectRegion.industryId = this.state.industryId
        if(!this.state.industryId){
            selectRegion.industryId = ''
        }

        let selectStr = JSON.stringify(selectRegion)
        browserHistory.push(`/container/about/${selectStr}`)
    }
    handleRrgion = ()=> { // 设置地区
        let regionRelease = JSON.parse(localStorage.getItem('searchEmptyfinishs'))
        var regionReleaseObj = regionRelease || new Object()
        regionReleaseObj.release = 'true'  // 当用户点击多次搜索，避免第一次设置不上地区查询条件
        localStorage.setItem('searchEmptyfinishs', JSON.stringify(regionReleaseObj))
        let releaseControl = JSON.parse(localStorage.getItem('releaseLocal')) // 设置只有在选择行业 地区的情况下 params 传递的值才可以
        let releaseControlObj = releaseControl || new Object()
        releaseControlObj.release = 'true'
        localStorage.setItem('releaseLocal', JSON.stringify(releaseControlObj))
        let selectRegion = new Object()
        selectRegion.selectIndustry = this.state.industryId
        selectRegion.selectindustryId = this.state.industryName
        if (!this.state.industryId) {
            selectRegion.selectIndustry = ''
            selectRegion.selectindustryId = ''
        }
        selectRegion.region = this.state.region
        if(!this.state.region){
            selectRegion.region = ''
        }
        selectRegion.keyword = this.state.keyword

        let selectStr = JSON.stringify(selectRegion)
        browserHistory.push(`/container/region/${selectStr}`)
    }

    handleHistoryRecord = (key, indu, region, binds)=> { // 历史记录
        // 点击跳转历史记录清空条件数据

        let handleHistoryRecordlocal = JSON.parse(localStorage.getItem('handleHistoryRecord'))
        let handleHistoryArr = handleHistoryRecordlocal || new Object()
        handleHistoryArr.history = 'true'
        localStorage.setItem('handleHistoryRecord', JSON.stringify(handleHistoryArr))

        // 判断类型决定值
        let keytype = typeof key
        let indutype = typeof indu
        let regiontype = typeof region
        let obj = new Object()
        if (keytype == 'string' && indutype == 'object' && regiontype == 'string') {
            obj.keyword = key
            obj.industryId = ''
            obj.region = region
            obj.count = 20
            let objStr = JSON.stringify(obj)
            browserHistory.push(`/container/finresult/${objStr}`)
            return
        }
        if (keytype == 'string' && indutype == 'object' && regiontype == 'object') {
            obj.keyword = key
            obj.industryId = ''
            obj.region = ''
            obj.count = 20
            let objStr = JSON.stringify(obj)
            browserHistory.push(`/container/finresult/${objStr}`)
        }
        if (keytype == 'string' && indutype == 'string' && regiontype === 'string') {
            obj.keyword = key
            obj.industryId = indu
            obj.region = region
            obj.count = 20
            let objStr = JSON.stringify(obj)
            browserHistory.push(`/container/finresult/${objStr}`)
        }
        if (keytype == 'string' && indutype == 'string' && regiontype == 'object') {
            obj.keyword = key
            obj.industryId = indu
            obj.region = ''
            obj.count = 20
            let objStr = JSON.stringify(obj)
            browserHistory.push(`/container/finresult/${objStr}`)
        }
        if (keytype == 'object' && indutype == 'string' && regiontype == 'object') {
            obj.keyword = ''
            obj.industryId = indu
            obj.region = ''
            obj.count = 20
            let objStr = JSON.stringify(obj)
            browserHistory.push(`/container/finresult/${objStr}`)
        }
        if (keytype == 'object' && indutype == 'string' && regiontype == 'string') {
            obj.keyword = ''
            obj.industryId = indu
            obj.region = region
            obj.count = 20
            let objStr = JSON.stringify(obj)
            browserHistory.push(`/container/finresult/${objStr}`)
        }
        if (keytype == 'object' && indutype == 'object' && regiontype == 'string') {
            obj.keyword = ''
            obj.industryId = ''
            obj.region = region
            obj.count = 20
            let objStr = JSON.stringify(obj)
            browserHistory.push(`/container/finresult/${objStr}`)
        }
    }
    handleHistory = (value, index)=> { // 历史记录处理

        var arrList = JSON.parse(localStorage.getItem(userHistory)).length - 1
        if (Boolean(value.keyword) && !Boolean(value.region) && Boolean(value.industryName) == false) { //当用户第一次输入行业类型没有选

            return (
                <div key={index}>
                    <div className='userHistory'
                         onClick={this.handleHistoryRecord.bind(this,value.keyword,value.industryId,value.region)}>{value.keyword}</div>
                    <div className={arrList>index?'historyBorder':''}></div>
                </div>
            )
        }
        if (Boolean(value.keyword) && !Boolean(value.region) && Boolean(value.industryName)) {
            return (
                <div key={index}>
                    <div className='userHistory'
                         onClick={this.handleHistoryRecord.bind(this,value.keyword,value.industryId,value.region)}>{value.keyword}+{value.industryName}</div>
                    <div className={arrList>index?'historyBorder':''}></div>
                </div>
            )
        }
        else if (Boolean(value.keyword) && !Boolean(value.region) && !Boolean(value.industryName)) {

            return (
                <div key={index}>
                    <div className='userHistory'
                         onClick={this.handleHistoryRecord.bind(this,value.keyword,value.industryId,value.region)}>{value.keyword}</div>
                    <div className={arrList>index?'historyBorder':''}></div>
                </div>
            )

        }
        else if (Boolean(value.keyword) && Boolean(value.region) && !Boolean(value.industryName)) {

            return (
                <div key={index}>
                    <div className='userHistory'
                         onClick={this.handleHistoryRecord.bind(this,value.keyword,value.industryId,value.region)}>{value.keyword}+{value.region}</div>
                    <div className={arrList>index?'historyBorder':''}></div>
                </div>
            )
        }
        else if (Boolean(value.keyword) && Boolean(value.region) && Boolean(value.industryName)) {
            return (
                <div key={index}>
                    <div className='userHistory'
                         onClick={this.handleHistoryRecord.bind(this,value.keyword,value.industryId,value.region)}>{value.keyword}+{value.region}+{value.industryName}</div>
                    <div className={arrList>index?'historyBorder':''}></div>
                </div>
            )
        }

        else if (!Boolean(value.keyword) && !Boolean(value.region) && Boolean(value.industryName)) {

            return (
                <div key={index}>
                    <div className='userHistory'
                         onClick={this.handleHistoryRecord.bind(this,value.keyword,value.industryId,value.region)}>{value.industryName}</div>
                    <div className={arrList>index?'historyBorder':''}></div>
                </div>
            )

        }
        else if (!Boolean(value.keyword) && !Boolean(value.region) && !Boolean(value.industryName)) {
            return

        }
        else if (!Boolean(value.keyword) && Boolean(value.region) && Boolean(value.industryName)) {
            return (
                <div key={index}>
                    <div className='userHistory'
                         onClick={this.handleHistoryRecord.bind(this,value.keyword,value.industryId,value.region)}>{value.region}+{value.industryName}</div>
                    <div className={arrList>index?'historyBorder':''}></div>
                </div>
            )
        }

        else if (!Boolean(value.keyword) && Boolean(value.region) && !Boolean(value.industryName)) {
            return (
                <div key={index}>
                    <div className='userHistory'
                         onClick={this.handleHistoryRecord.bind(this,value.keyword,value.industryId,value.region)}>{value.region}</div>
                    <div className={arrList>index?'historyBorder':''}></div>
                </div>
            )
        }
    }
    handleKeyup = (event)=> { // 通过form :表单onsubmit向web,发送请求，发现会将只之前的数据打印，通过在用户输入的时候将用户输入的，保存在local,确定用户请求的数据
        event.preventDefault()
        window.addEventListener('keyup', (e)=> {
            if (e.keyCode == 13) { // 当是通过的h5键盘，传递一个true,表示要走h5 跳转路径
                this.handleSearch(true)
                this.setState({searchtop:'18.5rem'})
            }
        })
    }
    handleSearch = (handleKeyUp)=> {

        let searchEmptyClear = JSON.parse(localStorage.getItem('searchEmptyfinishs'))//点击搜索，设置标记(防止组件销毁标记保存在local中)，清空搜索条件
        let searchObj = searchEmptyClear || {}
        searchObj.emptyClear = 'false'
        searchObj.number = '1'
        searchObj.numberInitials = this.state.initial++ // 避免用户总是点击搜索
        localStorage.setItem('searchEmptyfinishs', JSON.stringify(searchObj))
        let industry = localStorage.removeItem('userIndustry') // 清空行业类型
        let region = localStorage.removeItem('userRegion') // 清空选择的区域
        var newindustryId = this.state.industryId
        var newkeyword = this.state.keyword
        var newregion = this.state.region
        var newindustryName = this.state.industryName

        if (newkeyword == '' && newindustryName == '' && newregion == '') {
            if(localStorage.getItem('delaytime')){ // 开始的时候就要将之前的延时定时器,进行清除
                let  delaytime =JSON.parse(localStorage.getItem('delaytime')).delaytimes
                window.clearTimeout(delaytime)
            }


            // 当屏幕的尺寸因为键盘改变的大小，此时应该改变提示的高度
              var  delaytime = JSON.parse(localStorage.getItem('delaytime')) || new Object()
                this.setState({searchtop:'18.5rem'})
                delaytime.delaytimes = window.setTimeout(()=>{ this.setState({handleSearchEmpty: !this.state.handleSearchEmpty})},500) // 500 毫秒提示的消失

                localStorage.setItem('delaytime',JSON.stringify(delaytime))
                if(!this.state.handleSearchEmpty){ // 要显示的时候，要将之前的进行清除
                    if(localStorage.getItem('localtime')){
                        let time = JSON.parse(localStorage.getItem('localtime')).time
                        window.clearTimeout(time)
                    }
                    var localtime = JSON.parse(localStorage.getItem('localtime')) || new Object()
                    localtime.time = window.setTimeout(()=>{this.setState({handleSearchEmpty:false})},2000)
                    localStorage.setItem('localtime',JSON.stringify(localtime))
                }else { //切换到不显示将之前的延时定时器进行清除
                    let time = JSON.parse(localStorage.getItem('localtime')).time
                    window.clearTimeout(time)
                }

            return
        }

        this.setState({handleSearchEmpty: false})
        this.setState({AlearyClear:true})
        var newMessages = Object.assign({}, this.state.messages)
        newMessages.keyword = newkeyword
        if (Boolean(newindustryId) == true) {
            newMessages.industryId = newindustryId
        }
        if (Boolean(newregion) == true) {
            newMessages.region = newregion
        }
        let strMessage = JSON.stringify(newMessages)
        // 需要根据不同的用户，存储的不同的搜索历史记录
        // 当一次使用的时候

        let userHistoryId = localStorage.getItem(userHistory)
        console.log(userHistory)
        var arr = JSON.parse(userHistoryId ) || []
        arr.map((value, index)=> {
            if (value.keyword == newkeyword && value.industryName == newindustryName && value.region == newregion) {
                arr.splice(index, 1)
                newMessages.keyword = newkeyword
                newMessages.industryName = newindustryName
                newMessages.industryId = newindustryId
                newMessages.region = newregion

            } else {
                newMessages.keyword = newkeyword
                newMessages.industryName = newindustryName
                newMessages.region = newregion
                newMessages.industryId = newindustryId
            }
        })
        if (arr.length > 9) {
            arr.splice(-1, 1)
        }
        // 第一次没有历史记录arr 数组不进循环
        if (arr.length == 0) {
            newMessages.keyword = newkeyword
            if (Boolean(newindustryName) == true) {
                newMessages.industryName = newindustryName
            }
            if (Boolean(newregion) == true) {
                newMessages.region = newregion
            }
            if (Boolean(newindustryId) == true) {
                newMessages.industryId = newindustryId
            }
        }

        this.setState({useHistory: !this.state.useHistory}) // 切换 state 状态触发 render
        var  keyUpWord = JSON.parse(localStorage.getItem('userInputLocal')) // 用户输入的关键字

        let keyUpIndustry = Boolean(JSON.parse(strMessage).industryId)
        let keyUpregion = Boolean(JSON.parse(strMessage).region)
        let handleKeyUpResult = JSON.parse(localStorage.getItem('handleKeyResult')) // 获取行业地区存储

        if (handleKeyUpResult) { // 如果存在
            var handleKeyUpResultIndustry = handleKeyUpResult.industryId
            var handleKeyUpRegion = handleKeyUpResult.region
            if (handleKeyUpResultIndustry == JSON.parse(strMessage).industryId) { //设定显示,
                if(Boolean(handleKeyUpResultIndustry) ){ // 排除行业为空的情况相等
                    var IndustryRealse = true
                }
            }
            if (handleKeyUpRegion == JSON.parse(strMessage).region) {
                 if(Boolean(handleKeyUpRegion)){//排除地区为空的情况相等
                     var regoinRealse = true
                 }
            }
        }

        let finalResult = IndustryRealse || regoinRealse //行业地区任意对应一个就好

        if (keyUpWord == null && finalResult) { //没有选择关键字，行业和地区中任意对应一个

            var keyUpWordsure = true  // 当没有设置关键字的时候 任意选择行业地区的中的一个都可以跳转 keyUpWordsure 释放跳转的标记
        }
        if (keyUpWord != null) {//

            if (!handleKeyUpResultIndustry || !handleKeyUpRegion) { // 只设置了关键字，

                keyUpWordsure = (JSON.parse(strMessage).keyword == keyUpWord.userInput)

            }
            if (IndustryRealse || regoinRealse) { //

                keyUpWordsure = (JSON.parse(strMessage).keyword == keyUpWord.userInput)
            }

        }
        if (handleKeyUp && keyUpWordsure) { // h5控制键盘提交的时候走这里
            arr.unshift(newMessages)
            localStorage.setItem(userHistory, JSON.stringify(arr))
            browserHistory.push(`/container/finresult/${strMessage}`)
            return
        } else if (!handleKeyUp) {
            arr.unshift(newMessages)
            localStorage.setItem(userHistory, JSON.stringify(arr))
            browserHistory.push(`/container/finresult/${strMessage}`)
        }

    }
    handleHeighLevel = ()=> { //点击取消
        let industry = localStorage.removeItem('userIndustry') // 清空行业类型
        let input = localStorage.removeItem('userInputLocal') // 清空用户输入的值
        let region = localStorage.removeItem('userRegion') // 清空选择的区域
        localStorage.removeItem('handleKeyResult')

        let strIndustry = this.props.params.instryName
        if(typeof strIndustry == 'string' ){
            let strindex = strIndustry.indexOf('user')
            if (strindex != -1) {
                let IndustryuserId = JSON.parse(this.props.params.instryName)
                if (IndustryuserId.userId) {
                    var userObj = new Object()
                    userObj.userId = parseInt(IndustryuserId.userId)
                    var userId = JSON.stringify(userObj)
                }
            }
        }
        browserHistory.push(`/`)
    }
    handleFocus =()=>{
        this.setState({handleSearchEmpty:false,})
    }
    handlecancleButton =()=>{
        this.setState({keyword:'',cancleButton:'none'})
    }

    handleStart = ()=> {
        return (
            <div className='lookOrgan'>
                <form onSubmit={this.handleKeyup} action='javascript:return false;' >
                    <div className='top_SerachDetail'>
                        <div>
                            <div className='SearchDetailContiner'>
                                <span></span>
                                <input autoFocus ref='keyword' type="search" placeholder='请输入组织名称'
                                       value={this.state.keyword} onChange={this.handleInput} onFocus={this.handleFocus} />
                                <b onClick={this.handlecancleButton} style={{display:this.state.cancleButton}}></b>
                            </div>

                        </div>
                    </div>

                    <div className='select'>
                        <div className='industry' onClick={this.handleIndustry}>
                            <span > 行业类型 </span> <b>{this.state.industryName}</b> <span ></span>
                        </div>
                        <div className='line'></div>
                        <div className='industry' onClick={this.handleRrgion}>
                            <span>地区</span> <b>{this.state.region}</b> <span ></span>
                        </div>
                    </div>
                    <div className='searchBtn' onClick={this.handleSearch.bind(this,false)}>搜索</div>
                </form>

                <div className='searchRecord'>
                    <div className='historyRecord'>
                        {

                            localStorage.getItem(userHistory) == null ? '' : JSON.parse(localStorage.getItem(userHistory)).map(this.handleHistory)
                        }
                    </div>
                    <div className={this.state.clearecord?'empty':'emptyNone'} onClick={this.handleEmpty}>清空搜索记录</div>
                    <div style={{top:this.state.searchtop}} className={this.state.handleSearchEmpty?'handleSearchEmpty':'handleSearchnone'} >{this.state.interonline}</div>
                    <div className={this.state.AlearyClear?'changNone':'changeTrans'}>已清除</div>
                </div>
            </div>
        )
    }

    render() {
        window.addEventListener('online',function(){
            this.setState({interonline:'请填写搜索条件'})
        })
        window.addEventListener('offline',function(){
            this.setState({interonline:'网络断开联接'})
        })

        if (this.state.responseSussess) {
            return this.handleStart()
        } else {
            return <div></div>
        }

    }
}
