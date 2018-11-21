//添加/编辑
export let addNewRegister = (argus) => {
    let url = '/token/createAndInsert';
    if(argus.id){
        url = '/token/update'
    }
    return {
        type: 'ADD_NEW_REGISTER',
        playload: {
            url: url,
            type: 'post',
            param: argus
        }
    }
}

export let updateAddNewRegisterStatus = () => {
    return {
        type: 'UPDATE_ADD_NEW_REGISTER_STATUS'
    }
}

//获取详情
export let getDetailRegister = (argus) => {
    let url = '/token/search';
    return {
        type: 'GET_DETAIL_REGISTER',
        playload: {
            url: url,
            type: 'post',
            param: {
                ...argus
            }
        }
    }
}

export let updateGetDetailRegisterStatus = () => {
    return {
        type: 'UPDATE_GET_DETAIL_REGISTER_STATUS'
    }
}
