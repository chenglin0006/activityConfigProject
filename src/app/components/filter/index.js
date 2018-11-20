import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Row, Col, Input, Button, Icon, Select, DatePicker,Divider,Cascader,InputNumber} from 'antd';
import CascaderShop from '../cascaderShop/index';
import CascaderDefine from '../cascader/index'
import './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

export default class Filter extends Component {
  state = {
      expand: false,
  };
  constructor(props) {
    super(props);
    this._handleSearch = this._handleSearch.bind(this);
    this._handleReset = this._handleReset.bind(this);
    this._handleBack = this._handleBack.bind(this);
    this._getFields = this._getFields.bind(this);
    this._getFormItem = this._getFormItem.bind(this);
    this._handleLevelChange = this._handleLevelChange.bind(this);

  }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

  _handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.handleSearch(values);
    });
  }

  _handleReset() {
    this.props.form.resetFields();
    this.props.handleReset();
  }

  _handleBack(){
    if(this.props.history){
        this.props.history.goBack()
    }
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

  _getFormItem(option) {
    switch (option.type) {
      case 'select':
        return (
          <Select
              placeholder={option.placeholder}
              showSearch={option.showSearch}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onChange={(value)=>{this._handleLevelChange(option,value)}}
          >
            {option.isHidePleaseSelect ? null : <Option key="undefined" value="undefined">全部</Option>}
            {option.data && option.data.map((item, key) => <Option key={key} value={item.id}>{item.name}</Option>)}
          </Select>
        );
        break;
      case 'datepicker':
        let dateFormat = 'YYYY-MM-DD';
        if(option.showTime){
          dateFormat = 'YYYY-MM-DD HH:mm:ss';
        }
        return <RangePicker allowClear={false} showTime={option.showTime?true:false} format={dateFormat}/>;
        break;
      case 'number':
            return <InputNumber parser={option.parse}/>;
            break;
      case 'cascader':
          let {changeOnSelect=true}=option
        return <Cascader placeholder={option.placeholder || '请选择'} options={option.data} changeOnSelect={changeOnSelect} style={{width:'350px'}}/>
      default:
        return <Input placeholder={option.placeholder}/>;
    }
  }

  _getFields() {
    const {filterData} = this.props;
    let count = this.state.expand ? filterData.length : this.props.collapseNum;
    if(!this.props.collapseNum){
        count=filterData.length;
    }
    const {getFieldDecorator} = this.props.form;
    const that = this;
    return filterData.map((option, i) => {
      if (option.type === 'cascaderShop') {
        return (
          <CascaderShop key={i} form={that.props.form} isNotRequired={true}/>
        )
      } else if (option.type === 'cascaderDefine') {
        return (
          <CascaderDefine
              data={option.linkage}
              key={i}
              form={that.props.form}
              handleChange={this.props.handleChange}
          />
        )
      } else {
          let decoratorRules = {
              initialValue: option.initialValue
          }
        return (
          <div key={i}>
            <FormItem label={option.name} className={option.isHide?'hide':''} style={{ display: i < count ? 'block' : 'none' }}>
              {getFieldDecorator(`${option.id}`,decoratorRules)(
                that._getFormItem(option)
              )}
            </FormItem>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <Form
        layout="inline"
        className="filter-form"
        onSubmit={this._handleSearch}
      >
        {this._getFields()}
        <div className={"btnContainer filter-action-div"+(this.props.filterBtnInline?' inline':'')}>
          <Button type="primary" htmlType="submit">搜索</Button>
          <Button className="reset" onClick={this._handleReset}>重置</Button>
          <Button className={this.props.hideBackBtn?'hide back':'back'} onClick={this._handleBack}>返回</Button>
            {!this.props.collapseNum?'':<a style={{ marginLeft: 8, fontSize: 16 }} onClick={this.toggle}>
                {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'}/>
            </a>}
        </div>
        <Divider></Divider>
      </Form>
    );
  }
}

Filter.propTypes = {
  filterData: PropTypes.arrayOf(PropTypes.object),
  handleSearch: PropTypes.func,
  handleReset: PropTypes.func,
    collapseNum: PropTypes.number
}
