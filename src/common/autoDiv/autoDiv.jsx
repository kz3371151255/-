/**
 * Created by saiwei on 2017/3/10.
 */
import React,{ Component } from 'react'
import './autoDiv.css'
class AutoDiv extends Component{
    state={
        arr:[
            '阿ada点发',
            '阿ada阿斯蒂芬啊点发',
            'as阿 芬',
            '阿的发',
            '阿的发',
            '阿的发',
            '阿萨德发asdf 射点发',
            '阿萨德aa阿斯蒂芬阿斯蒂芬阿萨德sdf asdsf sdfsdf 发射点发',
            '阿萨德发射点发',
            '阿萨德发阿萨德撒的发生的阿斯蒂芬阿斯蒂芬阿斯蒂芬发送到射点发',
        ]
    }

    componentWillMount(){

    }

    render(){
        return <div className="autoDiv">
            {
                this.state.arr.map((v,i)=>{
                    return <p
                        key={i}
                        onClick={()=>{
                            var arr=this.state.arr;
                            console.log(arr)
                            arr.splice(i,-1)
                            console.log(arr.splice(i,1))
                            this.setState({arr:arr})
                        }}
                    >
                        {v}
                    </p>
                })
            }
        </div>
    }
}
export default  AutoDiv


