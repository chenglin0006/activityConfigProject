import React, {Component} from 'react';
import {Select, Form} from 'antd';
import PropTypes from 'prop-types';
import Toast from '../../../components/prompt/toast';
import Fetch from '../../../middleware/fetch/fetch';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './index.action';
import * as Util from '../../../util/index';

const Option = Select.Option;
const FormItem = Form.Item;

class CascaderShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _value1: '',
      _value2: '',
      options: [
        {
          id: 'provinceId',
          name: '省',
          type: 'select',
          isRequired: 'true',
          enumName: 'provinces',
        },
        {
          id: 'cityId',
          name: '市',
          type: 'select',
          isRequired: 'true',
          enumName: 'cities',
        },
        {
          id: 'shopId',
          name: '门店',
          type: 'select',
          isRequired: 'true',
          enumName: 'shops',
        },
      ],
    };
    this._handleProvinceChange = this._handleProvinceChange.bind(this);
    this._handleCityChange = this._handleCityChange.bind(this);
    this._fetchAddress = this._fetchAddress.bind(this);
  }

  _fetchAddress(url, enumName, listType, callback) {
    Fetch({
      url: url,
      type: 'GET',
      isAddress: 'true'
    }).then(res => {
      if (res.code === 0) {
        let address = res.result.data;
        let options = this.state.options;
        options && options.length > 0 && options.map((item, index) => {
          if (item.enumName === enumName) {
            item['data'] = [];
            address[listType].map((val, i) => {
              let obj = {};
              obj['value'] = val.id;
              obj['text'] = val.name;
              item['data'].push(obj)
            })
          }
        })
        this.setState({});
        callback && callback()
      }
    }).catch((res) => {
      Toast.show('服务器出错，省市区数据获取失败')
    })
  }

  componentDidMount() {
    let detailData = this.props.detailData;
    //console.log('componentDidMount',detailData)

    let provinceId = detailData && detailData.provinceId;
    let cityId = detailData && detailData.cityId
    if (provinceId && cityId) {
      this._fetchAddress('/provinces', 'provinces', 'provinces');//初始化省
      this._fetchAddress(`/citys?provinceId=${provinceId}`, 'cities', 'cityList');//初始化市
      this.props.getShop({provinceId: provinceId, cityId: cityId});//初始化门店
    }
    this._fetchAddress('/provinces', 'provinces', 'provinces');//初始化省

  }

  _handleProvinceChange = (value) => {
    this.props.form.setFieldsValue({
      'cityId': '',
      'shopId': '',
    });
    this.props.getShop({provinceId: value});
    this.setState({_value1: value})
    this._fetchAddress(`/citys?provinceId=${value}`, 'cities', 'cityList')
  }

  _handleCityChange = (value) => {
    this.props.form.setFieldsValue({
      'shopId': '',
    });
    this.props.getShop({provinceId: this.state._value1, cityId: value});
  }

  componentWillUpdate(nextProps, nextState) {
    Util.fetchCallback({
      status: nextProps.CascaderShop.getShopStatus,
      code: nextProps.CascaderShop.getShopCode,
      message: nextProps.CascaderShop.getShopMessage,
      updateStatus: nextProps.updateGetShopStatus,
      successCallback: () => {
        let shops = nextProps.CascaderShop.getShopData;
        let options = this.state.options;
        options && options.length > 0 && options.map((item, index) => {
          if (item.enumName === 'shops') {
            item['data'] = [];
            shops && shops.map((val, i) => {
              let obj = {};
              obj['value'] = val.id;
              obj['text'] = val.shopName;
              item['data'].push(obj)
            })
          }
        })
        Util.setInitialValue(this.state.options, this.props.detailData);
      }
    });
  }

  render() {
    //由于在父组件components/new中传入了form,实现父子公用一个form
    const {getFieldDecorator} = this.props.form;
    //let detailData=this.props.detailData;
    //console.log('render',detailData)

    return (
      <div>
        {this.state.options.map((option, i) => {
          let decorator = this.props.isNotRequired ? {} : {
            rules: [{
              required: option.isRequired, message: '不能为空！'
            }],
            initialValue: option.initialValue
          }
          /*if (option.enumName === "provinces") {
            if (detailData && detailData.provinceId) {
              decorator.initialValue = detailData.provinceId;
            }
          }
          if (option.enumName === "cities") {
            if (detailData && detailData.cityId) {
              decorator.initialValue = detailData.cityId;
            }
          }
          if (option.enumName === "shops") {
            if (detailData && detailData.shopId) {
              decorator.initialValue = detailData.shopId;
            }
          }*/
          return (
            <FormItem label={option.name} key={i}>
              {getFieldDecorator(`${option.id}`, decorator
              )(
                <Select  disabled={this.props.isDisableCascaderShop}
                  onSelect={option.enumName == 'provinces' ? this._handleProvinceChange : (option.enumName == 'cities' ? this._handleCityChange : () => {
                  })}>
                  {option.data && option.data.map((item, key) => <Option key={key}
                                                                         value={item.value}>{item.text}</Option>)}
                </Select>
              )}
            </FormItem>
          )
        })}
      </div>
    );
  }
}


CascaderShop
  .propTypes = {
  form: PropTypes.object,
}

export default connect(
  (state) => {
    return {CascaderShop: state.CascaderShop}
  },
  (dispatch) => bindActionCreators({...actions}, dispatch)
)(CascaderShop);

