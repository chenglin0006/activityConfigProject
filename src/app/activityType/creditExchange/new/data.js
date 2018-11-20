import * as Common from '../../../../util/common';
export const newData = [
    {
        id: 'sysName',
        name: '活动名称',
        isRequired: true,
    },
    {
        id: 'sysCode',
        name: '活动code',
        isRequired: true,
    },{
        type:'uploadImg',
        name: '主页背景图',
        disabled: true,   //是否可点
        id: 'mainPic',       //用来标识该组件，一个页面上可以有多个上传图片组件
        className: 'test',   //可以定制样式
        fileList:[],      //用来存放上传的图片列表
        imgDesc:'图片说明',       //上传图片的格式说明
        isUploadDefine:false,  //是否是自定义的照片墙
        showPicListDealDiv:false,
        refreshList:(data)=>{console.log(data)},
        fileSizeLimit:3,
        uploadImgLimitNumber:1 //可上传图片张数
    }
];
