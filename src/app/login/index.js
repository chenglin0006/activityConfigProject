import React, { Component } from 'react';
import sha1 from 'js-sha1';
import { Redirect } from 'react-router-dom';
import Toast from '../../components/prompt/toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './index.action';
import Loader from '../../components/loader/';
import LockImage from './images/icon_lock.png';
import PhoneImage from './images/icon_phone.png';
import './index.less';

class Login extends Component {
	constructor(props) {
		super(props);

		this.login = this.login.bind(this);

		this.state = {
			username: '',
			password: '',
			spinning: this.props.FetchState.spinning || false
		}
	}

	login() {
		let username = this.state.username;
		let password = sha1(this.state.password);
		this.props.loginUser(username, password);
	}

	handleUserChange(e) {
		let value = e.target.value;
		this.setState({
			username: value
		})
	}

	handlePasswordChange(e) {
		let value = e.target.value;
		this.setState({
			password: value
		})
	}

	componentWillUpdate (nextProps, nextState) {
		if(nextProps.LoginState.loginStatus) {
			let msg = nextProps.LoginState.code == 0 ? '登录成功' : nextProps.LoginState.message;
			Toast.show(msg);
			nextProps.updateLoginStatus();
		}
	}

	render() {
		if(this.props.LoginState.loginStatus && this.props.LoginState.code == 0) {
			return <Redirect push to="/" />
		}

		return (
			<div className="login">
				<div className="bg"></div>
				<div className="loginContainer">
					<div className="inputContainer">
						<img htmlFor="username" src={PhoneImage} alt="用户名" />
						<input type="text" id="username" placeholder="请输入用户名" value={this.state.username} onChange={this.handleUserChange.bind(this)} />
					</div>
					<div className="inputContainer">
						<img htmlFor="password" src={LockImage} alt="密码" />
						<input type="password" id="password" placeholder="请输入密码"  value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
					</div>
					<button onClick={this.login}>登录</button>
				</div>
				<Loader spinning={this.props.FetchState.spinning || this.state.spinning} />
			</div>
		);
	}
}

export default connect(
	(state) => {
		return {FetchState: state.Fetch, LoginState: state.Login}
	},
	(dispatch) => bindActionCreators({...actions}, dispatch)
)(Login);
