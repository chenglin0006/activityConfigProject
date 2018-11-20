export default function(state={}, action) {
    switch(action.type) {
        //获取列表
        case 'GET_SUMMARY_REPORT_LIST':
            return {
                ...state,
                summaryReportListStatus: true,
                summaryReportListCode: action.playload.code,
                summaryReportListData: action.playload.data,
                summaryReportListPage: action.playload.page
            }
            break;
        case 'GET_SUMMARY_REPORT_LIST_FAIL':
            return {
                ...state,
                summaryReportListStatus: true,
                summaryReportListCode: action.playload.code,
                summaryReportListMessage: action.playload.message
            }
            break;
        case 'UPDATE_GET_SUMMARY_REPORT_LIST_STATUS':
            return {
                ...state,
                summaryReportListStatus: false
            }
            break;
        default:
            return state;
    }
}
