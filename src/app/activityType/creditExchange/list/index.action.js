//获取列表
export let getCreditList = (argus) => {
    return {
        type: 'GET_CREDIT_LIST',
        playload: {
            url: '/token/search',
            type: 'post',
            param: {
                ...argus
            }
        }
    }
}

export let updateGetCreditListStatus = () => {
    return {
        type: 'UPDATE_GET_CREDIT_LIST_STATUS'
    }
}
