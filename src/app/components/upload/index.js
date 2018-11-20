import React, {Component} from 'react';
import {Upload, message, Button, Icon} from 'antd';
import config from '../../../../config/index'
import * as Util from '../../../util/index'


const ENV=Util.getEnv();
export default class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: 'file',
      action: `${config[ENV].apiUrlFilter}/futureShop/excel/import.do?bizObjType=screen`,
      headers: {
        authorization: 'authorization-text',
      },
    }
    this.onChange=this.onChange.bind(this);
  }

  onChange(info) {
    if (info.file.response) {
      if (info.file.response.code === 0) {//导入成功
        message.success(`${info.file.name} 文件导入成功`);
        this.props.setFatherDisabled(true)
      } else if (info.file.response.code === 1) {//文件类型错误
        message.success(`${info.file.name} 文件导入失败,失败原因：${info.file.response.msg}`);
      } else {//全部或者部分导入失败，查看详情按钮可见
        message.success(`${info.file.name} 文件导入失败,失败原因：${info.file.response.msg}`);
        this.props.setFatherDisabled(false,info)
      }
    }
  }

  render() {
    return (
      <Upload {...this.state} onChange={(e)=>{
        this.onChange(e)
      }}>
        <Button>
          <Icon type="upload"/> 点击上传
        </Button>
      </Upload>
    )
  }
}
