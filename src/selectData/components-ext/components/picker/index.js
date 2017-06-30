import React from 'react';
import _ from 'lodash';//javascript工具库
const getIndex = (list, item) => {
  if (list && list.length < 1) {
    return 0;
  }
  let index1 = _.findIndex(list, item); // 查找list中于item(对象),第一次出现的索引
  let index2 = list.indexOf(item); // 第一次出现的
  let index = Math.max(index1, index2);
  if (index < 0) {
    throw new Error('list数组中不存在defaultValue');
  }
  return index;
}
class Picker extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.startY = 0;
    this.endY   = 0;
    //当前拖动的Y坐标
    this.currentY = 0;
    this.itemHeight = 35;
    this.selectedIndex = this.getInitialIndex();
    this.state = {style: {}};
    this._defaultValue = null; //设定一个初始值作为判断的条件
  }

  // 初始化获得selectedIndex
  getInitialIndex() {//设置初始的索引
    let index = getIndex(
      this.props.data.list,
      this.props.data.defaultValue
    );
    if (!this.props.data.defaultValue && this.props.data.list.length > 3) {
      index = Math.floor(this.props.data.list.length / 2);
    }
    return index;
  }
  componentDidMount(){
    this.refs.ui-picker-wrapper.addEventListener()
  }

  componentWillReceiveProps(nextProps) {// 对选中的三个值进行依次判断,
    const isEqual = _.isEqual( // 对选中的值和初始的值进行判断
      nextProps.data.defaultValue,
      this._defaultValue
    );

    if (!isEqual) { // 如果设定的和之前保留的不相同
      this._defaultValue = nextProps.data.defaultValue; //对设定的值进行的保存,
      this.selectedIndex = this.getReceivePropsIndex(nextProps.data); //并且找出设定值索引
      if (this.selectedIndex === 0) { // 当值是初始的值,Y轴的高度是70px
        this.state = {
          style: {
            top: ` ${this.itemHeight * 2}px`
          }
        }
      }
    }
  }

  getReceivePropsIndex (data) {//如果设定的和之前保留的不相同,将设定值的作为参数,求出设置值的索引

    if (this._defaultValue) {// 并且已经将设定的值进行保存,
      this.selectedIndex = getIndex( // 找出的设定值的索引
        data.list,
        data.defaultValue
      );
    }
    return this.selectedIndex;//并且返回设定值的索引
  }

  getInitialStyle () { // 选中的索引值为 2 的时候,y轴位置0px,
    this.currentY = 0;
    if (this.selectedIndex > 2) { // 如果选中的索引,>2 ,y 轴的值是负值
      this.currentY = - (this.selectedIndex - 2) * this.itemHeight;
    } else {
      this.currentY = (2 - this.selectedIndex) * this.itemHeight;
    }
    return ` ${ this.currentY }px`;
  }

  handleTouchStart (e) {//当开始触屏的时候，e.nativeEvent : 获取原生事件对象
    e.preventDefault();
    e.stopPropagation();
    if (this.props.data.list.length <= 1) { //没有数据,下面就不进行执行
      return;
    }
    this.startY = e.nativeEvent.changedTouches[0].pageY;//获取开始的触屏到html页面的距离

  }

  handleTouchEnd (e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.data.list.length <= 1) {
      return;
    }
    this.endY = e.nativeEvent.changedTouches[0].pageY;//获取结束时触屏到html页面Y距离
    // 实际滚动距离
    let v = parseInt(this.endY - this.startY);
    let value = v % this.itemHeight; // 要移动的距离除以每步移动距离,
    // 计算出每次拖动的35px整倍数
    this.currentY += (v - value);// 一点点到达目标值

    // 正数y最大值,当为初始值的时候,为最大值 70px
    const max1 = 2 * this.itemHeight;
    const max2 = (this.props.data.list.length - 3) * this.itemHeight;//因为索引值为2 的时候Y轴移动0px
    // 负数y最小值,
    if (this.currentY > max1) { // 超过最大值,直接甚至成最大值。只有索引值，0-2 之间才会取正值
      this.currentY = max1;
    }
    else if (this.currentY > 0 && this.currentY < max1) {//索引值，0-2 之间
      this.currentY = this.currentY;
    }
    else if (this.currentY === max1) {
      this.currentY = this.currentY;
    }
    else if (Math.abs(this.currentY) > max2) {
      this.currentY = - max2;
    }

    this.countListIndex(this.currentY);

    this.setState({
      style: {
        top: ` ${ this.currentY }px`
      }
    });
  }

  handleTouchMove (e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.data.list.length <= 1) {
      return;
    }
    const pageY = e.nativeEvent.changedTouches[0].pageY;
    let value = parseInt(pageY - this.startY);
    const y = this.currentY + value;
    let style = `${ y }px`;
    this.setState({
      style: {
        top: style,
      }
    });
  }

  // 计算list数组索引
  countListIndex (pageY) {
    let n = pageY / this.itemHeight;
    n = n > 0 ? 2 - n : Math.abs(n) + 2;
    this.setSelectedValue(n);
  }

  // set选中值
  setSelectedValue (index) {
    const length = this.props.data.list.length;
    if (length === 0) {
      this.callback(null);
      return;
    }
    if (index < 0 || index > length -1) {
      throw new Error('滑动取值索引数值出现错误'+ index);
    }
    const value = this.props.data.list[index];
    this.selectedIndex = index;

    this.callback(value)
  }

  // 回调
  callback (value) {
    this.props.onChange(value);
  }

  getSelectedClass (index) {
    if (this.selectedIndex === index) {
      return 'ui-picker-item-selected';
    }
    return '';
  }

  componentDidMount () {
    this.setSelectedValue(this.selectedIndex);
  }

  render () {
    const style = {
      top: this.getInitialStyle()
    }
    return (
      <div className="ui-picker-wrapper" ref='uipickerwrapper' >
          <div className="ui-picker"
            style = {this.state.style.top ? this.state.style : style}
            onTouchStart={this.handleTouchStart.bind(this)}
            onTouchMove={this.handleTouchMove.bind(this)}
            onTouchEnd = {this.handleTouchEnd.bind(this)}>
            {
              this.props.data.list.map((data, index) => {

                const displayValue = this.props.data.displayValue(data);
                return <div key={index}
                  className={ 'ui-picker-item ' + this.getSelectedClass(index)}>
                  {displayValue}
                </div>
              })
            }
          </div>
          <div className="ui-picker-center"></div>
      </div>
    )
  }
}

Picker.propTypes = { // propTypes:react 校验
  // 数据源 是一个对象形式; data: 组件内部数据传输
  data: React.PropTypes.object.isRequired,
  // 当停止滑动选中立即回调onchange方法
  onChange: React.PropTypes.func.isRequired,
};

export default Picker;
