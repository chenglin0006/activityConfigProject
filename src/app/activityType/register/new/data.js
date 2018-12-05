import * as Common from '../../../../util/common';
export const newData = [
    {
        id: 'sysName',
        name: '活动名称',
        isRequired: true,
        className: 'block-div'
    },
    {
        id: 'sysCode',
        name: '活动code',
        isRequired: true,
        className: 'block-div'
    },{
        type:'uploadImg',
        name: '主页背景图',
        disabled: true,   //是否可点
        id: 'mainPic',       //用来标识该组件，一个页面上可以有多个上传图片组件
        className: 'test block-div',   //可以定制样式
        fileList:[],      //用来存放上传的图片列表
        isUploadDefine:false,  //是否是自定义的照片墙
        showPicListDealDiv:false,
        fileSizeLimit:3,
        notNull:true,
        uploadImgLimitNumber:1, //可上传图片张数
    },{
        id: 'shareText1',
        name: '分享文案标题',
        isRequired: true,
        className: 'block-div'
    },{
        id: 'shareText2',
        name: '分享文案描述',
        className: 'block-div',
        isRequired: true,
    },{
        type:'uploadImg',
        name: '分享图片log',
        className: 'block-div',
        desc:'建议上传100*100尺寸的图片',
        notNull:true,
        disabled: true,   //是否可点
        id: 'sharePic',       //用来标识该组件，一个页面上可以有多个上传图片组件
        fileList:[],      //用来存放上传的图片列表
        isUploadDefine:false,  //是否是自定义的照片墙
        showPicListDealDiv:false,
        fileSizeLimit:3,
        uploadImgLimitNumber:1 //可上传图片张数
    },{
        id: 'pvLink',
        name: '埋点编码',
        className: 'block-div'
    }
];
