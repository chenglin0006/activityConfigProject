export default function(state={}, action) {
    switch(action.type) {
        //获取列表
        case 'GET_PIC_TEXT_LIST':
            return {
                ...state,
                picTextListStatus: true,
                picTextListCode: action.playload.code,
                picTextListData: action.playload.data,
                picTextListPage: action.playload.page
            }
            break;
        case 'GET_PIC_TEXT_LIST_FAIL':
            return {
                ...state,
                picTextListStatus: true,
                picTextListCode: action.playload.code,
                picTextListMessage: action.playload.message
            }
            break;
        case 'UPDATE_GET_PIC_TEXT_LIST_STATUS':
            return {
                ...state,
                picTextListStatus: false
            }
            break;

        //delete
        case 'DELETE_PIC_TEXT':
            return {
                ...state,
                deletePicTextStatus: true,
                deletePicTextCode: action.playload.code,
                deletePicTextData: action.playload.data,
                deletePicTextPage: action.playload.page
            }
            break;
        case 'DELETE_PIC_TEXT_FAIL':
            return {
                ...state,
                deletePicTextStatus: true,
                deletePicTextCode: action.playload.code,
                deletePicTextMessage: action.playload.message
            }
            break;
        case 'UPDATE_DELETE_PIC_TEXT_STATUS':
            return {
                ...state,
                deletePicTextStatus: false
            }
            break;
        default:
            return state;
    }
}
