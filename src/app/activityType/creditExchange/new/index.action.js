//添加/编辑
export let addNewCredit = (argus) => {
    let url = '/token/createAndInsert';
    if(argus.id){
        url = '/token/update'
    }
    return {
        type: 'ADD_NEW_CREDIT',
        playload: {
            url: url,
            type: 'post',
            param: argus
        }
    }
}

export let updateAddNewCreditStatus = () => {
    return {
        type: 'UPDATE_ADD_NEW_CREDIT_STATUS'
    }
}

//获取详情
export let getDetailCredit = (argus) => {
    let url = '/token/search';
    return {
        type: 'GET_DETAIL_CREDIT',
        playload: {
            url: url,
            type: 'post',
            param: {
                ...argus
            }
        }
    }
}

export let updateGetDetailCreditStatus = () => {
    return {
        type: 'UPDATE_GET_DETAIL_CREDIT_STATUS'
    }
}
