import React, {Component} from 'react';
import {Form, Input, Button, Select, DatePicker, InputNumber, Checkbox, Switch, Radio} from 'antd';
import CascaderShop from '../cascaderShop/index';
import Cascader from '../cascader/index';
import PicturesWall from '../uploadImage/index';
import PicTextModel from '../picTextModel/index'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './index.less';
import * as Util from "../../../util";
import Dialog from "../../../components/dialog";
import Toast from "../../../components/prompt/toast";

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const {TextArea} = Input;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

export default class New extends Component {
  constructor(props) {
    super(props);

    this._handelRegister = this._handelRegister.bind(this);
    this._getFields = this._getFields.bind(this);
    this._getFormItem = this._getFormItem.bind(this);
    this._checkErr = this._checkErr.bind(this);

    this.state = {
      provinces: [],
      endDate: '',
    };
  }

  componentWillMount() {
    this.props.getCommonSelect && this.props.getCommonSelect();
  }

  //修复场景：isRequired元素点击保存后有错误提示，但是切换选项后该元素隐藏了，但是保存时依然还在错误范围内
  _checkErr(err,newData){
      let errStatus = false;
      let keys = err&&Object.keys(err) || [];
      keys.forEach((ele)=>{
          newData.forEach((item)=>{
              if(item.id==ele&&item.isRequired){
                  errStatus = true
              }
          })
      });
      return errStatus;
  }

  _handelRegister(e,item) {
    e.preventDefault();
    //notCheck:是否校验表单，默认false，如果配置了按钮，并且该按钮指定notCheck，则直接执行定义的方法
    if(item&&item.notCheck){
        item.clickHandle?item.clickHandle():this.props.history.go(-1);
        return
    }
    this.props.form.validateFields((err, values) => {
      //用来记录一些非表格元素的非空校验状态
      let errorStatus = false;
      if (!this._checkErr(err,this.props.newData)) {
        let datas = this.props.newData;
        if (datas) {
            try{
                datas.forEach((data) => {
                    //如果有CheckBox类型的且不是多选的，将true改成1，undefined改为0
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
                    if (data.type === 'uploadImg') {//上传图片组件，传值
                        if(data.notNull && data.fileList.length==0){
                            errorStatus = true;
                            Toast.show('请上传'+data.name);
                            foreach.break=new Error("StopIteration");
                            return
                        }
                        if(data.uploadImgLimitNumber&&data.uploadImgLimitNumber>1){
                            values[data.id] = data.fileList || [];
                        } else {
                            values[data.id] = data.fileList[0] && data.fileList[0].url ||'';
                        }
                    }
                    if (data.type === 'inputList') {
                        let list = this.props.inputListConfig.listData || [];
                        list.forEach((item)=>{
                            if(!item.url || !item.name){
                                errorStatus = true;
                                Toast.show('请补充全景图数据');
                                foreach.break=new Error("StopIteration");
                                return
                            }
                        });
                        values[data.id] = list;
                    }
                    if (data.type === 'rangedatepicker'){
                        let arry = [];
                        values[data.id]&&values[data.id].forEach((ele,index)=>{
                            arry.push(data.showTime?Util.msToDate(new Date(ele)).hasTime:Util.msToDate(new Date(ele)).withoutTime);
                        })
                        values[data.id] = arry
                    }
                    if(data.isRequired && (!values[data.id]&&values[data.id]!==0 || values[data.id].length==0)){
                        errorStatus = true
                        Toast.show(data.name+'不能为空');
                        foreach.break=new Error("StopIteration");
                        return
                    }
                });
            }catch (e) {
                console.log(e.message);
                if(e.message==="foreach is not defined") {
                    console.log("跳出forEach循环");//
                    return;
                }else throw e;
            }

        }
        if(errorStatus){
            return;
        }
        if(item){
            values.id = this.props.detailData?this.props.detailData.id:'';
            if(item.submitAlertInfo){
                Dialog.open({
                    message: '',
                    showInputSelect: [
                        {
                            type: 'detail',
                            className: 'sure-text',
                            id: 'sureText',
                            value: item.submitAlertInfo.mainText
                        },
                        {
                            type: 'detail',
                            className: 'sure-info',
                            id: 'sureInfo',
                            value: item.submitAlertInfo.secondText
                        }
                    ],
                    dialogButton: [
                        {
                            text: '取消',
                            clickHandle: () => {
                                Dialog.close();
                                return
                            }
                        },
                        {
                            text: '确定',
                            type: 'primary',
                            clickHandle: () => {
                                Dialog.close();
                                //执行父组件的addNew函数（在父组件redux调接口）
                                item.clickHandle(values)
                                return
                            }
                        }
                    ]
                })
            } else {
                item.clickHandle(values);
            }
        }
      }
    });
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
        return <TextArea maxLength={option.maxlength} disabled={option.disabled} cols={30} rows={4}/>;
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
      case 'uploadImg':
        return <PicturesWall disabled={option.disabled}
                             id={option.id}
                             className={(option.isHide?'hide':'')+(' '+option.className)}
                             fileList={option.fileList}
                             imgDesc={option.imgDesc}               //图片说明
                             uploadImgLimitNumber={option.uploadImgLimitNumber}//允许上传图片的张数
                             fileSizeLimit={option.fileSizeLimit}   //上传图片的size限制
                             isUploadDefine={option.isUploadDefine} //是否是自定义的照片墙
                             refreshList={this.props.refreshListFun} />
        break;
      case 'radio' :
        return <RadioGroup disabled={option.disabled} name={option.id} onChange={option.onChange}>
            {option.data && option.data.map((item,key) => <Radio key={key} value={item.id}>{item.name}</Radio>)}
        </RadioGroup>
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

  _getFields() {
    const {getFieldDecorator} = this.props.form;
    const that = this;
    return that.props.newData.map((option, i) => {
      if (option.type === 'cascaderShop') {
        return (//将父组件的form传递给子组件，共用一个form控件
          <CascaderShop
            isDisableCascaderShop={this.props.isDisableCascaderShop}
            key={i}
            form={that.props.form}
            detailData={this.props.detailData}
          />
        )
      } else if (option.type === 'cascader') {
        return (//将父组件的form传递给子组件，共用一个form控件
          <Cascader
            data={option.linkage}
            key={i}
            form={that.props.form}
            handleChange={this.props.handleChange}
          />
        )
      } else if(option.type === 'picTextModel'){
          return (
              <PicTextModel
                  form = {this.props.form}
                  key={i}
                  inputListConfig = {this.props.inputListConfig}
              />
          )
      } else if(option.type =='button'){
          return <span key={i} className={option.isHide?'hide':''}><Button key={i} size={option.size} type={option.buttonType} style={option.style} onClick={
              ()=>{
                  //按钮需要重置的field
                  if(option.resetFields){
                      this.props.form.resetFields(option.resetFields);
                  }
                  this.props[option.clickHandleName](this.props.form.getFieldsValue())
              }
          }>{option.name}</Button><span style={{marginLeft:'10px'}}>{option.desc}</span></span>
              ;
      } else{
        let decoratorRules = option.type === 'switch' ? {
          valuePropName: 'checked',
          initialValue: option.initialValue
        } : {
          rules: [{
            required: option.isRequired, message: '不能为空！'
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
          <FormItem label={option.name} className={(option.desc?'has-desc ':'')+(option.isHide?'hide':'') +(option.notNull?' not-null':'') +' '+option.className} key={i}>
            {getFieldDecorator(`${option.id}`, (option.type=='input' || !option.type)?inputRules:decoratorRules
            )(
              that._getFormItem(option)
            )}
              {option.desc?<div className={'desc-dev'}>{option.desc}</div>:''}
          </FormItem>
        );
      }
    });
  }

  //定义多个按钮，按钮都要执行表单校验后再通过触发的按钮标识来调用不同的方法
  _renderButtons(){
    if(this.props.actionButtons && this.props.actionButtons.length){
        return this.props.actionButtons.map((item,i)=>{
              return(
                  <Button id={item.actionId} type={item.type} key={i} disabled={item.disabled} onClick={(e)=>this._handelRegister(e,item)}>{item.text}</Button>
              )
          })
    }
  }

  render() {
      // 默认是展示一个提交按钮，一个取消按钮，提交按钮的默认方法指向_handelRegister，取消则默认返回前一页，如果有多个按钮，则为每个按钮配置方法
    return (
        <Form
          layout={'inline'}
          className={"new-form"}
          onSubmit={this.props.actionButtons&&this.props.actionButtons.length?null:this._handelRegister}
        >
        {/*此处动态生成表单域*/}
        {this._getFields()}
        <div className='btnItem'>
            {this._renderButtons()}
            {this.props.buttonsDesc?<div style={{color:'#999999'}}>{this.props.buttonsDesc}</div>:''}
        </div>
      </Form>
    );
  }
}

New.propTypes = {
  newData: PropTypes.arrayOf(PropTypes.object),
  addNew: PropTypes.func,
  history: PropTypes.object,
    actionButtons: PropTypes.arrayOf(PropTypes.object)
}

/*如果没有配置actionButtons,则默认组件的提交和取消按钮，此时必须传addNew方法
* actionButtons-》object-》info
* text:'按钮名称'-必须
* id:'按钮标识'-非必须
* notCheck:'提交前不校验表单数据 默认false'
* actionSubmitAlert:'提交前是否需要进行弹窗提示 默认false'
* submitAlertInfo:'弹窗提示语，包含两条文字'
* clickHandle:'按钮对应的执行方法'
* */

