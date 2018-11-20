import React, {Component} from 'react';
import {Select, Form} from 'antd';
import PropTypes from 'prop-types';
import Toast from '../../../components/prompt/toast';
import Fetch from '../../../middleware/fetch/fetch';


const Option = Select.Option;
const FormItem = Form.Item;

class CascaderAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        {
          id: 'provinceId',
          name: '省',
          type: 'select',
          isRequired: 'true',
          enumName: 'provinces'
        },
        {
          id: 'cityId',
          name: '市',
          type: 'select',
          isRequired: 'true',
          enumName: 'cities'
        },
        {
          id: 'districtId',
          name: '区',
          type: 'select',
          isRequired: 'true',
          enumName: 'districts'
        },
      ],
      provinceId: '',
    };
    this._handleProvinceChange = this._handleProvinceChange.bind(this);
    this._handleCityChange = this._handleCityChange.bind(this);
  }

  componentDidMount() {
    const cascaderInitialValue = this.props.cascaderInitialValue;

    if (cascaderInitialValue && cascaderInitialValue.provinceId) {
      const cascaderInitialValue = this.props.cascaderInitialValue;
      this._handleProvinceChange(cascaderInitialValue.provinceId);
    }
    if (cascaderInitialValue && cascaderInitialValue.cityId) {
      const cascaderInitialValue = this.props.cascaderInitialValue;
      this._handleCityChange(cascaderInitialValue.cityId);
    }

    Fetch({
      url: `/provinces`,
      type: 'GET',
      isAddress:'true'
    }).then(res => {
      if (res.code === 0) {
        let province = res.result.data;
        let options = this.state.options;
        options && options.length > 0 && options.map((item, index) => {
          if (item.type == 'select') {
            if (item.enumName === 'provinces') {
              item['data'] = [];
              province.provinces.map((val, i) => {
                let obj = {};
                obj['value'] = val.id;
                obj['text'] = val.name;
                item['data'].push(obj)
              })
            }
          }
        })
        this.setState({});
      }
    }).catch((res) => {
      Toast.show('服务器出错，省市区数据获取失败')
    })
  }


  _handleProvinceChange = (value) => {
    this.props.form.resetFields(["cityId", "districtId"]);
    Fetch({
      url: `/citys?provinceId=${value}`,
      type: 'GET',
      isAddress:'true',
      // contentType: 'application/x-www-from-urlencoded'
    }).then(res => {
      if (res.code === 0) {
        let cityList = res.result.data;
        let options = this.state.options;
        options && options.length > 0 && options.map((item, index) => {
          if (item.type == 'select') {
            if (item.enumName === 'cities') {
              item['data'] = [];
              cityList.cityList.map((val, i) => {
                let obj = {};
                obj['value'] = val.id;
                obj['text'] = val.name;
                item['data'].push(obj)
              })
            }
          }
        })
        this.setState({});
      }
    }).catch((res) => {
      Toast.show('服务器出错，省市区数据获取失败')
    })
  }

  _handleCityChange = (value) => {
    this.props.form.resetFields(["districtId"]);
    Fetch({
      url: `/districts?cityId=${value}`,
      type: 'GET',
      isAddress:'true'
    }).then(res => {
      if (res.code === 0) {
        let districts = res.result.data;
        let options = this.state.options;
        options && options.length > 0 && options.map((item, index) => {
          if (item.type == 'select') {
            if (item.enumName === 'districts') {
              item['data'] = [];
              districts.districts.map((val, i) => {
                let obj = {};
                obj['value'] = val.id;
                obj['text'] = val.name;
                item['data'].push(obj)
              })
            }
          }
        })
        this.setState({});
      }
    }).catch((res) => {
      Toast.show('服务器出错，省市区数据获取失败')
    })


  }

  render() {
    //由于在父组件components/new中传入了form,实现父子公用一个form
    const {getFieldDecorator} = this.props.form;
    const cascaderInitialValue = this.props.cascaderInitialValue;

    return (
      <div className={'cascaderAddress'}>
        {this.state.options.map((option, i) => {
          let decorator = {};
          decorator = this.props.isNotRequired ? {} : {
            rules: [{
              required: option.isRequired, message: '不能为空！'
            }]
          }
          if (option.enumName === "provinces") {
            if (cascaderInitialValue && cascaderInitialValue.provinceId) {
              decorator.initialValue = cascaderInitialValue.provinceId;
            }
          }
          if (option.enumName === "cities") {
            if (cascaderInitialValue && cascaderInitialValue.cityId) {
              decorator.initialValue = cascaderInitialValue.cityId;
            }
          }
          if (option.enumName === "districts") {
            if (cascaderInitialValue && cascaderInitialValue.districtId) {
              decorator.initialValue = cascaderInitialValue.districtId;
            }
          }

          return (
            <FormItem label={option.name}  key={i}>
              {getFieldDecorator(`${option.id}`, decorator
              )(
                <Select
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

export default CascaderAddress = Form.create()(CascaderAddress);

CascaderAddress
  .propTypes = {
  form: PropTypes.object,


}

