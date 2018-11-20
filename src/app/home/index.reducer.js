export default function(state={}, action) {
	switch(action.type) {
		case 'USER_LOGOUT':
			return {
				...state,
				logoutStatus: true,
				logoutCode: action.playload.code,
				logoutMessage: action.playload.message
			}
			break;
		case 'USER_LOGOUT_FAIL':
			return {
				...state,
				logoutStatus: true,
				logoutCode: action.playload.code,
				logoutMessage: action.playload.message
			}
			break;
		case 'USER_LOGOUT_STATUS':
			return {
				...state,
				logoutStatus: false
			}
			break;
		case 'UPDATE_PASSWORD':
			return {
				...state,
				updatePasswordStatus: true,
				updatePasswordCode: action.playload.code,
				updatePasswordMessage: action.playload.message
			}
			break;
		case 'UPDATE_PASSWORD_FAIL':
			return {
				...state,
				updatePasswordStatus: true,
				updatePasswordCode: action.playload.code,
				updatePasswordMessage: action.playload.message
			}
			break;
		case 'UPDATE_PASSWORD_STATUS':
			return {
				...state,
				updatePasswordStatus: false
			}
			break;
		//获取左侧菜单栏
        case 'GET_MENUS':
            return {
                ...state,
                getMenusStatus: true,
                getMenusCode: action.playload.code,
                getMenusData: action.playload.data
            }
            break;
        case 'GET_MENUS_FAIL':
            return {
                ...state,
                getMenusStatus: true,
                getMenusCode: action.playload.code,
                getMenusMessage: action.playload.message
            }
            break;
        case 'UPDATE_GET_MENUS_STATUS':
            return {
                ...state,
                getMenusStatus: false
            }
            break;

        //获取用户信息
        case 'GET_USER_INFO':
            return {
                ...state,
                getUserInfoStatus: true,
                getUserInfoCode: action.playload.code,
                getUserInfoData: action.playload.data
            }
            break;
        case 'GET_USER_INFO_FAIL':
            return {
                ...state,
                getUserInfoStatus: true,
                getUserInfoCode: action.playload.code,
                getUserInfoMessage: action.playload.message
            }
            break;
        case 'UPDATE_GET_USER_INFO_STATUS':
            return {
                ...state,
                getUserInfoStatus: false
            }
            break;
		default:
			return state;
	}
}
