//获取列表
export let getReportList = (argus) => {
    return {
        type: 'GET_REPORT_LIST',
        playload: {
            url: '/token/search',
            type: 'post',
            param: {
                ...argus
            }
        }
    }
}

export let updateGetReportListStatus = () => {
    return {
        type: 'UPDATE_GET_REPORT_LIST_STATUS'
    }
}

//获取筛选项
export let getReportFilter = (argus) => {
    return {
        type: 'GET_REPORT_FILTER',
        playload: {
            url: '/user/initAndGet',
            type: 'get',
            param: {
                ...argus
            }
        }
    }
}

export let updateGetReportFilterStatus = () => {
    return {
        type: 'UPDATE_GET_REPORT_FILTER_STATUS'
    }
}

//获取表头colomns
export let getReportColumns = (argus) => {
    return {
        type: 'GET_REPORT_COLUMNS',
        playload: {
            url: '/user/initAndGet',
            type: 'get',
            param: {
                ...argus
            }
        }
    }
}

export let updateGetReportColumnsStatus = () => {
    return {
        type: 'UPDATE_GET_REPORT_COLUMNS_STATUS'
    }
}

