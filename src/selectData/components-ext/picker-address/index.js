import React from 'react';
import { Picker, Popup } from '../components/index.js';
import { provins, citys, areas } from './address.js';
import './index.scss';

const propTypes = {
  defaultValue: React.PropTypes.array.isRequired, // 设置选择的数据,要求是数组
  onConfirm: React.PropTypes.func.isRequired, // 点击完成按钮
  onCancel: React.PropTypes.func.isRequired, // 默认地区的选择
  onChange: React.PropTypes.func.isRequired, //改变的地区数据
  visible: React.PropTypes.bool.isRequired, // 显示隐藏的切换
}

class PickerAddress extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.address = [];
  }
  initDefaultData () { // 初始化数据 :开始 this.props.defaultValue,是组件内传递的数据
    this.data = {
      provins: { // 省的数据
        list: provins,
        defaultValue: this.props.defaultValue[0], //默认显示数组中的第一位,
        displayValue (name) {
          return name;
        }
      },
      citys: { // 地区的数据
        list: citys[this.props.defaultValue[0]],// 省级作为市级的key:匹配市级
        defaultValue: this.props.defaultValue[1],
        displayValue (name) {
          return name;
        }
      },
      areas: {
        list: areas[this.props.defaultValue[1]],
        defaultValue: this.props.defaultValue[2],
        displayValue (name) {
          return name;
        }
      }
    }
  }

  handleChangeProvin (provin) {   //当滚动改变省时,将于省对应的市县,推到同一个数组中
    this.data.provins = {
      list: provins,
      defaultValue: provin,
    };
    this.data.citys = {
      list: citys[provin],
      defaultValue: citys[provin][0],
    };
    this.data.areas = {
      list: areas[citys[provin][0]],
      defaultValue: areas[citys[provin][0]][0],
    },
    this.address = []; // 省市县选中要展示的,推到同一个数组中
    this.address.push(provin);
    this.address.push(citys[provin][0]);
    this.address.push(areas[citys[provin][0]][0]);
    this.props.onChange(this.address);
  }

  handleChangeCity(city) { // 当滚动改变市时候,将市和他对应的数据添加到一个数组中
    this.address[1] = city;
    this.address[2] = areas[city][0];
    this.data.areas = {
      list: areas[city],
      defaultValue: areas[city][0],
    };
    this.props.onChange(this.address);
  }

  handleChangeArea(area) {
    this.address[2] = area;
    this.props.onChange(this.address);
  }

  handleClose () {
    this.props.onConfirm(this.address)
  }

  handleCancel () {
    this.props.onCancel()
  }

  render () {
    this.initDefaultData();// 初始化数据的显示
    return <div className="ui-picker-address">
      <Popup
        onConfirm={this.handleClose.bind(this)}
        onCancel={this.handleCancel.bind(this)}
        visible={this.props.visible}>
        <Picker
          onChange={this.handleChangeProvin.bind(this)}
          data={this.data.provins}
        />
        <Picker
          onChange={this.handleChangeCity.bind(this)}
          data={this.data.citys}
        />
        <Picker
          onChange={this.handleChangeArea.bind(this)}
          data={this.data.areas}
        />
      </Popup>
    </div>
  }
}

PickerAddress.propTypes = propTypes;

export default PickerAddress;
