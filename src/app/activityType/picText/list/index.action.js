//获取列表
export let getPicTextList = (argus) => {
    return {
        type: 'GET_PIC_TEXT_LIST',
        playload: {
            url: '/couponType/def/query',
            type: 'post',
            param: {
                ...argus
            }
        }
    }
}

export let updateGetPicTextListStatus = () => {
    return {
        type: 'UPDATE_GET_PIC_TEXT_LIST_STATUS'
    }
}

//删除
export let deletePicText = (argus) => {
    return {
        type: 'DELETE_PIC_TEXT',
        playload: {
            url: '/couponType/def/delete',
            type: 'post',
            param: argus
        }
    }
}

export let updateDeletePicTextStatus = () => {
    return {
        type: 'UPDATE_DELETE_PIC_TEXT_STATUS'
    }
}
