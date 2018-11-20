/*
 *联动
*/
import React, { Component } from 'react';
import { Select, Form } from 'antd';
import PropTypes from 'prop-types';

const Option = Select.Option;
const FormItem = Form.Item;

class CascaderDefine extends Component {
    constructor(props) {
        super(props);

        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange = (option, value) => {
        if(option.url && option.relativeFeilds && option.fetchFeilds) {
            //重置联动中影响到的文本域，通过relativeFeilds来获取影响到的fileds
            option.relativeFeilds.map((i) => {
                let o = {};
                o[i] = '';
                this.props.form.setFieldsValue(o);

                //重置realtiveFeilds中对应的data(下拉表值)
                this.props.data.map((item) => {
                    if(item.id === i) {
                        item.data = [];
                    }
                });
            });

            //通过fetchFeilds获取Fetch参数，在onSelect事件中，this.props.form获取到的当前事件值不是最新的值，因此需要通过value获取
            let fieldsValue = this.props.form.getFieldsValue(option.fetchFeilds);
            option.fetchFeilds.map((i) => {
                if(i === option.id) {
                    fieldsValue[i] = value;
                }
            });

            fieldsValue && this.props.handleChange && this.props.handleChange(fieldsValue, option);
        }


    }

    render() {
        //由于在父组件components/new中传入了form,实现父子公用一个form
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                {this.props.data && this.props.data.map((option, i) => {
                    let decorator = {
                        rules: [{
                            required: option.isRequired, message: '不能为空！'
                        }],
                        initialValue: option.initialValue
                    }
                    return (
                        <FormItem label={option.name} key={i}>
                            {getFieldDecorator(`${option.id}`, decorator
                            )(
                                <Select onSelect={(value) => this._handleChange(option, value)}>
                                    {option.data && option.data.map((item, key) => <Option key={key} value={item.id || item.code}>{item.name}</Option>)}
                                </Select>
                            )}
                        </FormItem>
                    )
                })}
            </div>
        );
    }
}


CascaderDefine.propTypes = {
    form: PropTypes.object,
}

export default CascaderDefine;

