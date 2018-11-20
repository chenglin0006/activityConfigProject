export let loginUser = (username, password) => {
	return {
		type: 'LOGIN_USER',		
		playload: {
			url: '/login.do',
			type: 'get',
			param: {
				userName: username,
				password: password
			}
		}
	}
}

export let updateLoginStatus = () => {
	return {
		type: 'UPDATE_LOGIN_STATUS'
	}
}