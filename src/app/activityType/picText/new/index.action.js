//添加/编辑
export let addNewPicText = (argus) => {
    let url = '/couponType/def/add';
    if(argus[0]&&argus[0].id){
        url = '/couponType/def/update'
    }
    return {
        type: 'ADD_NEW_PIC_TEXT',
        playload: {
            url: url,
            type: 'post',
            param: argus
        }
    }
}

export let updateAddNewPicTextStatus = () => {
    return {
        type: 'UPDATE_ADD_NEW_PIC_TEXT_STATUS'
    }
}

//获取详情
export let getDetailPicText = (argus) => {
    let url = '/couponType/def/query';
    return {
        type: 'GET_DETAIL_PIC_TEXT',
        playload: {
            url: url,
            type: 'post',
            param: {
                ...argus
            }
        }
    }
}

export let updateGetDetailPicTextStatus = () => {
    return {
        type: 'UPDATE_GET_DETAIL_PIC_TEXT_STATUS'
    }
}
