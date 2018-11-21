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
        isUploadDefine:false,  //是否是自定义的照片墙
        showPicListDealDiv:false,
        fileSizeLimit:3,
        uploadImgLimitNumber:1 //可上传图片张数
    },{
        id: 'shareText1',
        name: '分享文案标题',
        isRequired: true,
    },{
        id: 'shareText2',
        name: '分享文案描述',
        isRequired: true,
    },{
        type:'uploadImg',
        name: '分享图片链接',
        disabled: true,   //是否可点
        id: 'sharePic',       //用来标识该组件，一个页面上可以有多个上传图片组件
        fileList:[],      //用来存放上传的图片列表
        isUploadDefine:false,  //是否是自定义的照片墙
        showPicListDealDiv:false,
        fileSizeLimit:3,
        uploadImgLimitNumber:1 //可上传图片张数
    },{
        id: 'pvLink',
        name: '埋点链接'
    }
];
