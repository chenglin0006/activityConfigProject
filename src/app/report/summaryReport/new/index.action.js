//添加/编辑
export let addNewSummaryReport = (argus) => {
    let url = '/token/createAndInsert';
    if(argus.id){
        url = '/token/update'
    }
    return {
        type: 'ADD_NEW_SUMMARY_REPORT',
        playload: {
            url: url,
            type: 'post',
            param: argus
        }
    }
}

export let updateAddNewSummaryReportStatus = () => {
    return {
        type: 'UPDATE_ADD_NEW_SUMMARY_REPORT_STATUS'
    }
}

//获取详情
export let getDetailSummaryReport = (argus) => {
    let url = '/token/search';
    return {
        type: 'GET_DETAIL_SUMMARY_REPORT',
        playload: {
            url: url,
            type: 'post',
            param: {
                ...argus
            }
        }
    }
}

export let updateGetDetailSummaryReportStatus = () => {
    return {
        type: 'UPDATE_GET_DETAIL_SUMMARY_REPORT_STATUS'
    }
}
