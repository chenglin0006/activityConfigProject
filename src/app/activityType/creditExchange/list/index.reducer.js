export default function(state={}, action) {
    switch(action.type) {
        //获取列表
        case 'GET_CREDIT_LIST':
            return {
                ...state,
                creditListStatus: true,
                creditListCode: action.playload.code,
                creditListData: action.playload.data,
                creditListPage: action.playload.page
            }
            break;
        case 'GET_CREDIT_LIST_FAIL':
            return {
                ...state,
                creditListStatus: true,
                creditListCode: action.playload.code,
                creditListMessage: action.playload.message
            }
            break;
        case 'UPDATE_GET_CREDIT_LIST_STATUS':
            return {
                ...state,
                creditListStatus: false
            }
            break;
        default:
            return state;
    }
}
