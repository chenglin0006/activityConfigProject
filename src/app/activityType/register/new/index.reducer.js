export default function(state={}, action) {
    switch(action.type) {
        case 'ADD_NEW_REGISTER':
            return {
                ...state,
                addNewRegisterStatus: true,
                addNewRegisterCode: action.playload.code,
                addNewRegisterMessage: action.playload.message,
                addNewRegisterData: action.playload.data
            }
            break;
        case 'ADD_NEW_REGISTER_FAIL':
            return {
                ...state,
                addNewRegisterStatus: true,
                addNewRegisterCode: action.playload.code,
                addNewRegisterMessage: action.playload.message
            }
            break;
        case 'UPDATE_ADD_NEW_REGISTER_STATUS':
            return {
                ...state,
                addNewRegisterStatus: false
            }
            break;
        //获取初始化详情
        case 'GET_DETAIL_REGISTER':
            return {
                ...state,
                getDetailRegisterStatus: true,
                getDetailRegisterCode: action.playload.code,
                getDetailRegisterData: action.playload.data
            }
            break;
        case 'GET_DETAIL_REGISTER_FAIL':
            return {
                ...state,
                getDetailRegisterStatus: true,
                getDetailRegisterCode: action.playload.code,
                getDetailRegisterMessage: action.playload.message
            }
            break;
        case 'UPDATE_GET_DETAIL_REGISTER_STATUS':
            return {
                ...state,
                getDetailRegisterStatus: false
            }
            break;
        default:
            return state;
    }
}
