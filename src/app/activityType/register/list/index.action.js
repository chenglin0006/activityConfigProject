//获取列表
export let getRegisterList = (argus) => {
    return {
        type: 'GET_REGISTER_LIST',
        playload: {
            url: '/token/search',
            type: 'post',
            param: {
                ...argus
            }
        }
    }
}

export let updateGetRegisterListStatus = () => {
    return {
        type: 'UPDATE_GET_REGISTER_LIST_STATUS'
    }
}
