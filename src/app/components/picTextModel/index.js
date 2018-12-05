import React, {Component} from 'react';
import {Upload, Icon, Modal, Button, Input,Select} from 'antd';
import './index.less'
import PropTypes from "prop-types";
import * as Util from '../../../util/index'

const Option = Select.Option;

export default class picTextModel extends Component {
    constructor(props) {
        super(props);
        this._renderList = this._renderList.bind(this);
        this._addItemFun = this._addItemFun.bind(this);
        this._removeItemFun = this._removeItemFun.bind(this);
        this._handleChange = this._handleChange.bind(this);

    }

    _addItemFun(){
        let data = this.props.inputListConfig.listData;
        let obj = {name:'',url:'',flag:data.length+1};
        data.push(obj);
        this.props.inputListConfig.changeInputListFun(data);
    }

    _removeItemFun(obj){
        let data = this.props.inputListConfig.listData;
        data.forEach((ele,index)=>{
            if(ele.flag === obj.flag){
                data.splice(index,1);
            }
        })
        this.props.inputListConfig.changeInputListFun(data);
    }

    _handleChange(e,flag,type){
        let data = Util.deepClone(this.props.inputListConfig.listData);
        data.forEach((ele,index)=>{
            if(ele.flag === flag){
                ele[type]=e.target.value;
            }
        })
        this.props.inputListConfig.changeInputListFun(data);
    }

    _renderList(data){
        return(
            data.map((ele,i)=>{
                return (
                    <div key={i} className="list-item">
                        <div className="data-item">
                            <span>选择模块类型</span>
                            <Select>
                                <Option key="undefined" value="undefined">请选择</Option>
                                <Option key="1" value='1'>图片</Option>
                                <Option key="2" value='2'>文案</Option>
                            </Select>
                        </div>
                        <div className="data-item">
                            <span>{this.props.inputListConfig.inputTitle2 || '全景图链接'}</span>
                            <Input maxLength={500} value={ele.url} onChange={(e)=>{this._handleChange(e,ele.flag,'url')}} />
                        </div>
                        <span className={`action-span add ${data.length<this.props.inputListConfig.limitNumber?'':'hide'}`} onClick={this._addItemFun}>+</span>
                        <span className={`action-span minus ${data.length>1 ? '' : 'hide'}`} onClick={()=>this._removeItemFun(ele)}>-</span>
                    </div>
                )
            })
        )
    }

    render(){
        return(
            <div className='input-list-div'>{this._renderList(this.props.inputListConfig.listData)}</div>
        )
    }
}

picTextModel
    .propTypes = {
    inputTitle1: PropTypes.string,
    inputTitle2: PropTypes.string,
    changeInputListFun:PropTypes.func,
    limitNumber:PropTypes.number
}
