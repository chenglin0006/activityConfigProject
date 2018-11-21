export default function(state={}, action) {
    switch(action.type) {
        //获取列表
        case 'GET_REGISTER_LIST':
            return {
                ...state,
                registerListStatus: true,
                registerListCode: action.playload.code,
                registerListData: action.playload.data,
                registerListPage: action.playload.page
            }
            break;
        case 'GET_REGISTER_LIST_FAIL':
            return {
                ...state,
                registerListStatus: true,
                registerListCode: action.playload.code,
                registerListMessage: action.playload.message
            }
            break;
        case 'UPDATE_GET_REGISTER_LIST_STATUS':
            return {
                ...state,
                registerListStatus: false
            }
            break;
        default:
            return state;
    }
}
