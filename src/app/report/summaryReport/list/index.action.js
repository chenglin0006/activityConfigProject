//获取列表
export let getSummaryReportList = (argus) => {
    return {
        type: 'GET_SUMMARY_REPORT_LIST',
        playload: {
            url: '/token/search',
            type: 'post',
            param: {
                ...argus
            }
        }
    }
}

export let updateGetSummaryReportListStatus = () => {
    return {
        type: 'UPDATE_GET_SUMMARY_REPORT_LIST_STATUS'
    }
}
