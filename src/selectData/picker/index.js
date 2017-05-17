import React from 'react';
import {browserHistory} from'react-router'
import { PickerAddress } from '../components-ext';
import '../components-ext/scss/index.scss';
import './index.scss';

export default class PickerDemo extends React.Component {

    constructor() {
        super();

        this.defaultAddress = ['- -','- -','- -'];
        this.state = {
            addressPickerVisible: false,
            defaultValue: {name: 'Raoh', value: 7},
            address: this.defaultAddress,
            afterkeyWord:'',
        };

    }
    componentWillMount(){
        document.title = '地区'
        this.setState({afterkeyWord:JSON.parse(this.props.params.industry).keyword})

    }

    // 地址选择
    showAddressPicker (e) {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({addressPickerVisible: true});
    }

    handleChangeAddress (address) {
        this.setState({address: address});
    }

    closeAddressPicker (address) { //完成按钮,调用这的方法
        this.setState({
            address: address,
            addressPickerVisible: false,
        });
        let regionAddres = this.state.address
        let regionProvince = regionAddres[0]
        let regionCity = regionAddres[1]
        let regionArea = regionAddres[2]
        let regionNumber = 2
        let industry = JSON.parse(this.props.params.industry).selectIndustry
        let industryId = JSON.parse(this.props.params.industry).selectindustryId
        let keyword = this.state.afterkeyWord

       browserHistory.push(`/container/find/${regionProvince}+${regionCity}+${regionArea}+${regionNumber}+${industry}+${industryId}+${keyword}`)
    }

    cancelAddressPicker () { // 设置默认的地址，
        this.setState({
            address: this.defaultAddress,
            addressPickerVisible: false,
        });
    }

    render() {
        return (

            <div className = "picker-demo">
                <PickerAddress
                    defaultValue={this.state.address}
                    onCancel={this.cancelAddressPicker.bind(this)}
                    onConfirm={this.closeAddressPicker.bind(this)}
                    visible={this.state.addressPickerVisible}
                    onChange={this.handleChangeAddress.bind(this)}>
                </PickerAddress>

                <div className="button-wrap">
                    <button
                        type="button"
                        onClick={this.showAddressPicker.bind(this)}
                        className="btn button-primary">
                        选择省市
                    </button>
                </div>
            </div>
        )
    }
}