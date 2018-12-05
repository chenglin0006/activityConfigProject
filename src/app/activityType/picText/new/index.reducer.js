export default function(state={}, action) {
    switch(action.type) {
        case 'ADD_NEW_PIC_TEXT':
            return {
                ...state,
                addNewPicTextStatus: true,
                addNewPicTextCode: action.playload.code,
                addNewPicTextMessage: action.playload.message,
                addNewPicTextData: action.playload.data
            }
            break;
        case 'ADD_NEW_PIC_TEXT_FAIL':
            return {
                ...state,
                addNewPicTextStatus: true,
                addNewPicTextCode: action.playload.code,
                addNewPicTextMessage: action.playload.message
            }
            break;
        case 'UPDATE_ADD_NEW_PIC_TEXT_STATUS':
            return {
                ...state,
                addNewPicTextStatus: false
            }
            break;
        //获取初始化详情
        case 'GET_DETAIL_PIC_TEXT':
            return {
                ...state,
                getDetailPicTextStatus: true,
                getDetailPicTextCode: action.playload.code,
                getDetailPicTextData: action.playload.data
            }
            break;
        case 'GET_DETAIL_PIC_TEXT_FAIL':
            return {
                ...state,
                getDetailPicTextStatus: true,
                getDetailPicTextCode: action.playload.code,
                getDetailPicTextMessage: action.playload.message
            }
            break;
        case 'UPDATE_GET_DETAIL_PIC_TEXT_STATUS':
            return {
                ...state,
                getDetailPicTextStatus: false
            }
            break;
        default:
            return state;
    }
}
