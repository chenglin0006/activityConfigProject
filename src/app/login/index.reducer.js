let initState = {
	
}

export default function(state=initState, action) {
	switch(action.type) {
		case 'LOGIN_USER':
			//登录成功之后，存储用户名
			let username = action.playload.data.fullName;
			window.localStorage.setItem('username', username);

			return {
				...state,
				loginStatus: true,
				code: action.playload.code,
				message: action.playload.message
			}
			break;
		case 'LOGIN_USER_FAIL':
			return {
				...state,
				loginStatus: true,
				code: action.playload.code,
				message: action.playload.message
			}	
			break;
		case 'UPDATE_LOGIN_STATUS':
			return {
				...state,
				loginStatus: false
			}
		default:
			return state;
	}
}