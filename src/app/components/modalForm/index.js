import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Modal, Form} from 'antd';
import UploadForm from '../upload';
import Dialog from '../../../components/dialog'

const FormItem = Form.Item;

class ModalForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      disabled:true,
      info:{},
    };
    this._setFatherDisabled=this._setFatherDisabled.bind(this);
    this._detailDialogShow=this._detailDialogShow.bind(this);

  }

  showModal = () => {
    this.setState({visible: true});
  };
  handleCancel = () => {
    this.setState({visible: false,disabled:true});
  };
  handleOk = () => {
    this.setState({visible: false,disabled:true});
  };
  saveFormRef = (form) => {
    this.form = form;
  };

  _setFatherDisabled(boolean,info){
    this.setState({disabled:boolean,info:info});
  }

  _detailDialogShow(info){
    Dialog.open({//详情弹窗
      dialogContent:info.file.response.result.data,
      dialogWidth:'1000px',
      dialogHeight:'600px',
      dialogButton: [
        {
          text: '取消',
          clickHandle: () => {
            Dialog.close();
          }
        },
        {
          text: '确定',
          type: 'primary',
          clickHandle: () => {
            Dialog.close();
          }
        }
      ]
    })
  }

  render() {
    return (
      <div style={{display: 'inline'}}>
        <Button type="primary" onClick={this.showModal}>批量导入设备</Button>
        <Modal
          visible={this.state.visible}
          title="批量导入终端设备"
          okText="确定"
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          ref={this.saveFormRef}
          destroyOnClose={true}
        >
          <Form layout="vertical">
            <FormItem label="文件名称">
              <UploadForm
                setFatherDisabled={this._setFatherDisabled}
              />
              <Button disabled={this.state.disabled} type='primary' icon="solution" style={{marginTop:'10px'}} onClick={()=>{
                this._detailDialogShow(this.state.info)
              }}>查看详情</Button>
            </FormItem>
            <FormItem label="模版文件">
              <a href='/门店设备清单模板V1.01.xlsx'>
                <Button icon="download">下载模版文件</Button>
              </a>
            </FormItem>
            <div style={{color: 'red'}}>注意：一次最多可导入500条数据哦！</div>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default ModalForm;