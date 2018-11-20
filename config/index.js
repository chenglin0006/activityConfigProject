/*
* apiUrl:开发环境时本地代理，线上环境为服务器地址
* addressUrl：省市区服务器地址
* qiniuUrl：七牛云获取token服务器地址
* authUrl：登录，权限地址
* */
const url = {
    //本地开发环境
	development: {
        targetUrl:'http://promotion-dev.bnq.com.cn',
        apiUrl: 'http://web.futureshop.dev-zt.bnq.com.cn:8091',
        apiUrlFilter: '/promotion-man',
        proxyFilter: '/promotion-man',

        // targetUrl:'http://192.168.111.133:8089',
        // apiUrl: 'http://web.futureshop.dev-zt.bnq.com.cn:8091',
        // apiUrlFilter: '/dictionary',
        // proxyFilter: '/dictionary',

        authUrl: 'http://auth-dev.bnq.com.cn',
        authUrlFilter: '/auth',
        port: 8091,
        autoOpenBrowser: true,
        addressUrl:'https://customer-dev.bnq.com.cn/customerAdmin/district',
        qiniuUrl:'http://xres.bnq.com.cn/file',
        uploadExcelFilter:'/salesAdmin',
        targetUploadUrl:'http://api.futureshop.dev-zt.bnq.com.cn',
        targetContentUrl:'http://admin-dev.cms.bnq.com.cn',
	},
    //线上生产环境
	production: {
        apiUrl:'//promotion.bnq.com.cn',
        apiUrlFilter: '/salesAdmin',
        addressUrl:'//admin.customer.bos.b-and-qchina.com/customerAdmin/district',//促销系统还没有相应的地址接口
        qiniuUrl:'//xres.bnq.com.cn/file',
        authUrl: '//auth.bnq.com.cn',
        authUrlFilter: '/auth',
    },
    //线上开发环境
    productionDev: {
        apiUrl:'//promotion-dev.bnq.com.cn',
        apiUrlFilter: '/promotion-man',
        addressUrl:'//customer-dev.bnq.com.cn/customerAdmin/district',
        qiniuUrl:'//xres.bnq.com.cn/file',
        authUrl: '//auth-dev.bnq.com.cn',
        authUrlFilter: '/auth',
    },
    //线上uat环境
    productionUat: {
        apiUrl:'//promotion-uat.bnq.com.cn',
        apiUrlFilter: '/promotion-man',
        addressUrl:'//dev-fb-member-center-bos.bnq.com.cn/areas/district',//还没有对应的uat接口
        qiniuUrl:'//xres.bnq.com.cn/file',
        authUrl: '//auth-dev.bnq.com.cn',//登录还没有对应的uat接口
        authUrlFilter: '/auth',
    }
}

module.exports = url;
