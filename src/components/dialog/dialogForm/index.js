import React, {Component} from 'react';
import {Form, Input, Button, Select, DatePicker, InputNumber, Checkbox, Switch, Radio,Cascader} from 'antd';
import CascaderShop from '../../../app/components/cascaderShop/index';
import CascaderDefine from '../../../app/components/cascader/index';
import PropTypes from 'prop-types';
import './index.less';
import * as Util from "../../../util";

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const {TextArea} = Input;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;


export default class DialogForm extends Component {
    constructor(props) {
        super(props);

        this._handelRegister = this._handelRegister.bind(this);
        this._getFields = this._getFields.bind(this);
        this._getFormItem = this._getFormItem.bind(this);
        this._handleLevelChange = this._handleLevelChange.bind(this);

        this.state = {
            provinces: [],
            endDate: '',
        };
    }

    //处理联动事件
    _handleLevelChange(option,value){
        if(option.levelSelect){
            option.relativeField&&option.relativeField.forEach((i)=>{
                let o = {};
                o[i] = '';
                this.props.form.setFieldsValue(o);
            })
            option.handleChange&&option.handleChange(option,value);
        }
    }

    componentWillMount() {
        this.props.getCommonSelect && this.props.getCommonSelect();
    }

    _handelRegister(e,item) {
        e.preventDefault();
        if(item.type!='primary'){
            item.clickHandle();
            return
        }
        this.props.form.validateFields((err, values) => {
            //redux调接口
            if (!err) {
                //如果有CheckBox类型的，将true改成1，undefined改为0
                let datas = this.props.formData;
                if (datas) {
                    datas.forEach((data) => {
                        if (data.type === 'checkbox'&&!data.multiple) {
                            let value = values[data.id];
                            values[data.id] = value ? 1 : 0;
                        }
                        if (data.type === 'switch') {
                            let value = values[data.id];
                            values[data.id] = value ? 1 : 0;
                        }
                        if (data.type === 'select') {
                            let value = values[data.id];
                            values[data.id] = value === 'undefined' ? undefined : value;
                        }
                        if (data.type === 'rangedatepicker'){
                            let arry = [];
                            values[data.id]&&values[data.id].forEach((ele,index)=>{
                                arry.push(data.showTime?Util.msToDate(new Date(ele)).hasTime:Util.msToDate(new Date(ele)).withoutTime);
                            })
                            values[data.id] = arry
                        }
                    });
                }
                item.clickHandle(values);
            }
        });
    }

    _getFormItem(option) {
        switch (option.type) {
            case 'select':
                return (
                    <Select
                        mode={option.mode}
                        disabled={option.disabled}
                        className={'select'}
                        onChange={(value)=>{this._handleLevelChange(option,value)}}
                    >
                        {option.isHidePleaseSelect ? null : <Option key="undefined" value="undefined">请选择</Option>}
                        {option.data && option.data.map((item, key) => <Option key={key} value={item.id}>{item.name}</Option>)}
                    </Select>
                );
                break;
            case 'datepicker':
                return <DatePicker disabled={option.disabled} format="YYYY-MM-DD"/>;
                break;
            case 'rangedatepicker':
                let dateFormat = 'YYYY-MM-DD';
                if(option.showTime){
                    dateFormat = 'YYYY-MM-DD HH:mm:ss';
                }
                return <RangePicker disabled={option.disabled} showTime={option.showTime?true:false} format={dateFormat}/>
                break;
            case 'switch':
                return <Switch disabled={option.disabled} checkedChildren="是" unCheckedChildren="否"/>;
                break;
            case 'textarea':
                return <TextArea disabled={option.disabled} maxLength={option.maxlength} cols={30} rows={4}/>;
                break;
            case 'number':
                return <InputNumber disabled={option.disabled} min={option.min} max={option.max} formatter={option.formatter} parser={option.parse}/>;
                break;
            case 'checkbox':
                return <CheckboxGroup disabled={option.disabled} className={option.className}>
                    {option.data && option.data.map((item,key) => <Checkbox key={key} value={item.id}>{item.name}</Checkbox>)}
                </CheckboxGroup>
                    ;
                break;
            case 'radio' :
                return <RadioGroup disabled={option.disabled} name={option.id} onChange={option.onChange}>
                    {option.data && option.data.map((item,key) => <Radio key={key} value={item.id}>{item.name}</Radio>)}
                </RadioGroup>
                break;
            case 'label' :
                return <label>{option.initialValue}</label>
                break;
            case 'cascader' :
                return <Cascader
                    disabled={option.disabled}
                    options={option.options}
                    loadData={option.loadData}
                    onChange={option.onChange}
                    changeOnSelect={option.changeOnSelect}//是否允许选中父级
                    placeholder={option.placeholder}
                    expandTrigger={option.expandTrigger||'click'}
                />
                break;
            default:
                return <Input disabled={option.disabled} maxLength={option.maxlength} placeholder={option.placeholder}
                              type={option.type == 'password' ? 'password' : ''}/>;
        }
    }

    _getFields() {
        const {getFieldDecorator} = this.props.form;
        const that = this;
        return that.props.formData.map((option, i) => {
            if (option.isHide === 'true') {//隐藏的条目
                return (
                    <div key={i} style={{display: 'none'}}></div>
                );
            } else if (option.type === 'cascaderShop') {
                return (//将父组件的form传递给子组件，共用一个form控件
                    <CascaderShop
                        isDisableCascaderShop={this.props.isDisableCascaderShop}
                        key={i}
                        form={that.props.form}
                        detailData={this.props.detailData}
                    />
                )
            } else if (option.type === 'cascaderDefine') {
                return (//将父组件的form传递给子组件，共用一个form控件
                    <CascaderDefine
                        data={option.linkage}
                        key={i}
                        form={that.props.form}
                        handleChange={this.props.handleChange}
                    />
                )
            } else{
                let decoratorRules = option.type === 'switch' ? {
                    valuePropName: 'checked',
                    initialValue: option.initialValue
                } : {
                    rules: [{
                        required: option.isRequired, message: '不能为空！',
                    }],
                    initialValue: option.initialValue
                }

                //输入框为空格时判错
                let inputRules = {
                    rules: [{
                        required: option.isRequired, message: '不能为空！', whitespace: true
                    }],
                    initialValue: option.initialValue
                }

                return (
                    <FormItem label={option.name} className={(option.isHide?'hide':'')  +(option.notNull?' not-null':'') + ' '+option.className} key={i}>
                        {getFieldDecorator(`${option.id}`, (option.type=='input' || !option.type)?inputRules:decoratorRules
                        )(
                            that._getFormItem(option)
                        )}
                    </FormItem>
                );
            }
        });
    }

    render() {
        let {dialogButton,message,showInputSelect, dialogWidth, dialogHeight,title} = this.props;
        return (
            <div className="dialog-mask">
                <div className="dialog-container" style={{width: (dialogWidth||500)+'px', height: (dialogHeight||300)+'px'}}>
                    <div className="dialog-title">
                        <span>{title||'操作提示'}</span>
                    </div>
                    <div className={'form-content-div'} style={{height:dialogHeight-100+'px',overflow:'scroll'}}>
                        <Form
                            layout={'inline'}
                            className={"new-form"}
                            onSubmit={this.props.actionButtons&&this.props.actionButtons.length?null:this._handelRegister}
                        >
                            {/*此处动态生成表单域*/}
                            {this._getFields()}
                        </Form>
                        <div className="dialog-button" style={{textAlign:'center'}}>
                            {dialogButton &&
                            dialogButton.map((item, i) => {
                                return <Button type={item.type} key={i} className="btn" onClick={(e)=>{this._handelRegister(e,item)}}>{item.text}</Button>;
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DialogForm.propTypes = {
    formData: PropTypes.arrayOf(PropTypes.object)
}

