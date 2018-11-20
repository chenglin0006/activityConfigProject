export default function(state={}, action) {
    switch(action.type) {
        case 'ADD_NEW_CREDIT':
            return {
                ...state,
                addNewCreditStatus: true,
                addNewCreditCode: action.playload.code,
                addNewCreditMessage: action.playload.message,
                addNewCreditData: action.playload.data
            }
            break;
        case 'ADD_NEW_CREDIT_FAIL':
            return {
                ...state,
                addNewCreditStatus: true,
                addNewCreditCode: action.playload.code,
                addNewCreditMessage: action.playload.message
            }
            break;
        case 'UPDATE_ADD_NEW_CREDIT_STATUS':
            return {
                ...state,
                addNewCreditStatus: false
            }
            break;
        //获取初始化详情
        case 'GET_DETAIL_CREDIT':
            return {
                ...state,
                getDetailCreditStatus: true,
                getDetailCreditCode: action.playload.code,
                getDetailCreditData: action.playload.data
            }
            break;
        case 'GET_DETAIL_CREDIT_FAIL':
            return {
                ...state,
                getDetailCreditStatus: true,
                getDetailCreditCode: action.playload.code,
                getDetailCreditMessage: action.playload.message
            }
            break;
        case 'UPDATE_GET_DETAIL_CREDIT_STATUS':
            return {
                ...state,
                getDetailCreditStatus: false
            }
            break;
        default:
            return state;
    }
}
