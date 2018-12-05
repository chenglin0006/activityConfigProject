import React, {Component} from 'react';
import {Form, Input, Button, Select, DatePicker, InputNumber, Checkbox, Switch, Radio} from 'antd';
import './index.less'
import PropTypes from "prop-types";
import * as Util from '../../../util/index'
import PicturesWall from "../uploadImage";
import CascaderShop from "../cascaderShop";
import Cascader from "../cascader";

const Option = Select.Option;
const FormItem = Form.Item;
const {TextArea} = Input;

export default class picTextModel extends Component {
    constructor(props) {
        super(props);
        this._renderList = this._renderList.bind(this);
        this._addItemFun = this._addItemFun.bind(this);
        this._removeItemFun = this._removeItemFun.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._getFormItem = this._getFormItem.bind(this);
        this._getFields = this._getFields.bind(this);
        this.refreshListFun = this.refreshListFun.bind(this);

        this.state={
            listData:[
                {
                    flag:1,
                    list:[{
                        id:'modelType',
                        type:'select',
                        data:[{name:'图片',id:2},{name:'文案',id:1}],
                        name:'模块类型'
                    },{
                        id:'area',
                        type:'textarea',
                        name:'文本内容',
                        isHide:true
                    },{
                        id:'img1',
                        type:'uploadImg',
                        name:'选择图片',
                        isHide:true
                    },{
                        id: 'weight',
                        name: '权重',
                        isRequired: true,
                        type:'number',
                        min:0,
                        parse:value => value.replace(/[^\d]/g,""),
                        // parse:value => value.replace(/[^\d.]/g,"").replace(/^\./g,"").replace(/\.{2,}/g,".").replace(".","$#$").replace(/\./g,"").replace("$#$",".").replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'),
                        className:'block-div'
                    }]
                }
            ]

        }

    }

    refreshListFun(list,id){
        debugger
        console.log(list,id);
    }

    _addItemFun(){
        let data = this.state.listData;
        let nullObj =
            {
                flag: new Date().getTime(),
                list:[{
                    id:'modelType'+'-'+data.length+1,
                    type:'select',
                    data:[{name:'图片',id:2},{name:'文案',id:1}],
                    name:'模块类型',
                },{
                    id:'area'+'-'+data.length+1,
                    type:'textarea',
                    name:'文本内容',
                    isHide:true
                },{
                    id:'img1'+'-'+data.length+1,
                    type:'uploadImg',
                    name:'选择图片',
                    isHide:true
                },{
                    id: 'weight'+'-'+data.length+1,
                    name: '权重',
                    isRequired: true,
                    type:'number',
                    min:0,
                    parse:value => value.replace(/[^\d]/g,""),
                    // parse:value => value.replace(/[^\d.]/g,"").replace(/^\./g,"").replace(/\.{2,}/g,".").replace(".","$#$").replace(/\./g,"").replace("$#$",".").replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'),
                    className:'block-div'
                }]
            }
            data.push(nullObj);
        this.setState({listData:data});
    }

    _removeItemFun(obj){
        let data = this.state.listData;
        data.forEach((ele,index)=>{
            if(ele.flag === obj.flag){
                data.splice(index,1);
            }
        })
        this.setState({listData:data});
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

    _getFormItem(option) {
        switch (option.type) {
            case 'select':
                return (
                    <Select mode={option.mode} onChange={option.onChange} filterOption={option.showSearch?(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0:null} showSearch={option.showSearch || false} disabled={option.disabled} className={'select'}>
                        {option.isHidePleaseSelect ? null : <Option key="undefined" value="undefined">请选择</Option>}
                        {option.data && option.data.map((item, key) => <Option key={key} value={item.id}>{item.name}</Option>)}
                    </Select>
                );
                break;
            case 'textarea':
                return <TextArea maxLength={option.maxlength} disabled={option.disabled} cols={30} rows={4}/>;
                break;
            case 'number':
                return <InputNumber disabled={option.disabled} min={option.min} max={option.max} formatter={option.formatter} parser={option.parse}/>;
                break;
            case 'uploadImg':
                return <PicturesWall disabled={option.disabled}
                                     id={option.id}
                                     className={(option.isHide?'hide':'')+(' '+option.className)}
                                     fileList={option.fileList}
                                     imgDesc={option.imgDesc}               //图片说明
                                     uploadImgLimitNumber={option.uploadImgLimitNumber}//允许上传图片的张数
                                     fileSizeLimit={option.fileSizeLimit}   //上传图片的size限制
                                     isUploadDefine={option.isUploadDefine} //是否是自定义的照片墙
                                     refreshList={this.refreshListFun} />
                break;
            default:
                return <Input disabled={option.disabled} type={option.type} maxLength={option.maxlength} onChange={(e)=>{
                    if(option.inputChangeName){
                        this.props[option.inputChangeName](e)
                    }
                }} placeholder={option.placeholder}
                              type={option.type == 'password' ? 'password' : ''}/>;
        }
    }

    _getFields(data) {
        const {getFieldDecorator} = this.props.form;
        const that = this;
        return data.map((option, i) => {
            {
                let decoratorRules = {
                    rules: [{
                        required: option.isRequired, message: '不能为空！'
                    }],
                    initialValue: option.initialValue
                }
                return (
                    <FormItem label={option.name} className={(option.desc?'has-desc ':'')+(option.isHide?'hide':'') +(option.notNull?' not-null':'') +' '+option.className} key={i}>
                        {getFieldDecorator(`${option.id}`, decoratorRules
                        )(
                            that._getFormItem(option)
                        )}
                        {option.desc?<div className={'desc-dev'}>{option.desc}</div>:''}
                    </FormItem>
                );
            }
        });
    }

    _renderList(data){
         return   data.map((ele,i)=>{
                return (
                    <div key={i} className="list-item">
                        {this._getFields(ele.list)}
                        <div>
                            <span className={`action-span add`} onClick={this._addItemFun}>+</span>
                            <span className={`action-span minus`} onClick={()=>this._removeItemFun(ele)}>-</span>
                        </div>
                    </div>
                )
            })
    }

    render(){
        let data = this.state.listData;
        data.forEach((ele,index)=>{
            ele.list.forEach((item,i)=>{
                if(item.type=='select'){
                    item.onChange=(value)=>{
                        console.log(value)
                        if(value==1){
                            ele.list[1].isHide = false
                            ele.list[2].isHide = true
                        } else if (value==2){
                            ele.list[1].isHide = true
                            ele.list[2].isHide = false
                        } else {
                            ele.list[1].isHide = false
                            ele.list[2].isHide = false
                        }
                    }
                }
            })
        })
        return(
            <div className='input-list-div'>{this._renderList(data)}</div>
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
