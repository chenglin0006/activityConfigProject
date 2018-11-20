export default function(state={}, action) {
    switch(action.type) {
        case 'ADD_NEW_SUMMARY_REPORT':
            return {
                ...state,
                addNewSummaryReportStatus: true,
                addNewSummaryReportCode: action.playload.code,
                addNewSummaryReportMessage: action.playload.message,
                addNewSummaryReportData: action.playload.data
            }
            break;
        case 'ADD_NEW_SUMMARY_REPORT_FAIL':
            return {
                ...state,
                addNewSummaryReportStatus: true,
                addNewSummaryReportCode: action.playload.code,
                addNewSummaryReportMessage: action.playload.message
            }
            break;
        case 'UPDATE_ADD_NEW_SUMMARY_REPORT_STATUS':
            return {
                ...state,
                addNewSummaryReportStatus: false
            }
            break;
        //获取初始化详情
        case 'GET_DETAIL_SUMMARY_REPORT':
            return {
                ...state,
                getDetailSummaryReportStatus: true,
                getDetailSummaryReportCode: action.playload.code,
                getDetailSummaryReportData: action.playload.data
            }
            break;
        case 'GET_DETAIL_SUMMARY_REPORT_FAIL':
            return {
                ...state,
                getDetailSummaryReportStatus: true,
                getDetailSummaryReportCode: action.playload.code,
                getDetailSummaryReportMessage: action.playload.message
            }
            break;
        case 'UPDATE_GET_DETAIL_SUMMARY_REPORT_STATUS':
            return {
                ...state,
                getDetailSummaryReportStatus: false
            }
            break;
        default:
            return state;
    }
}
