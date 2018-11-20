export default function(state={}, action) {
    switch(action.type) {
        //获取列表
        case 'GET_REPORT_LIST':
            return {
                ...state,
                reportListStatus: true,
                reportListCode: action.playload.code,
                reportListData: action.playload.data,
                reportListPage: action.playload.page
            }
            break;
        case 'GET_REPORT_LIST_FAIL':
            return {
                ...state,
                reportListStatus: true,
                reportListCode: action.playload.code,
                reportListMessage: action.playload.message
            }
            break;
        case 'UPDATE_GET_REPORT_LIST_STATUS':
            return {
                ...state,
                reportListStatus: false
            }
            break;
        //获取筛选项
        case 'GET_REPORT_FILTER':
            return {
                ...state,
                reportFilterStatus: true,
                reportFilterCode: action.playload.code,
                reportFilterData: action.playload.data
            }
            break;
        case 'GET_REPORT_FILTER_FAIL':
            return {
                ...state,
                reportFilterStatus: true,
                reportFilterCode: action.playload.code,
                reportFilterMessage: action.playload.message
            }
            break;
        case 'UPDATE_GET_REPORT_FILTER_STATUS':
            return {
                ...state,
                reportFilterStatus: false
            }
            break;
        //获取表头
        case 'GET_REPORT_COLUMNS':
            return {
                ...state,
                reportColumnsStatus: true,
                reportColumnsCode: action.playload.code,
                reportColumnsData: action.playload.data
            }
            break;
        case 'GET_REPORT_COLUMNS_FAIL':
            return {
                ...state,
                reportColumnsStatus: true,
                reportColumnsCode: action.playload.code,
                reportColumnsMessage: action.playload.message
            }
            break;
        case 'UPDATE_GET_REPORT_COLUMNS_STATUS':
            return {
                ...state,
                reportColumnsStatus: false
            }
            break;
        default:
            return state;
    }
}
