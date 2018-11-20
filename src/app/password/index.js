import React, { Component } from 'react';
import { Modal, Form, Icon, Input } from 'antd';
import sha1 from 'js-sha1';

const FormItem = Form.Item;

class UpdatePassword extends Component {
	constructor(props) {
		super(props);

		this._updatePasswordHandle = this._updatePasswordHandle.bind(this);
		this._handleCancel = this._handleCancel.bind(this);

		this.state = {
			visible: this.props.visible || false
		}
	}

	_updatePasswordHandle() {
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	this._handleCancel();
	      	for(let i in values) {
	      		values[i] = sha1(values[i]);
	      	}
	      	this.props.updatePassword(values);
	      }
	    });
	}

	_handleCancel() {
		this.setState({visible: false});
		this.props.handleCancel();
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Modal
	          	title="密码重置"
	          	visible={this.state.visible}
	          	onOk={this._updatePasswordHandle}
	          	onCancel={this._handleCancel}
	        >
	          	<Form>
	          		<FormItem>
			          	{getFieldDecorator('oldPassword', {
			            	rules: [{ required: true, message: '旧密码不能为空!' }],
			          	})(
			            	<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入旧密码" />
			          	)}
			        </FormItem>
			        <FormItem>
			          	{getFieldDecorator('password', {
			            	rules: [{ required: true, message: '新密码不能为空!' }],
			          	})(
			            	<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入新密码" />
			          	)}
			        </FormItem>
			        <FormItem>
			          	{getFieldDecorator('confirmPassword', {
			            	rules: [{ required: true, message: '再次输入新密码不能为空!' }],
			          	})(
			            	<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请再次输入新密码" />
			          	)}
			        </FormItem>
	          	</Form>
	        </Modal>
		);
	}
}

const WrappedUpdatePassword = Form.create()(UpdatePassword);

export default WrappedUpdatePassword;
