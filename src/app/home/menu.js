export let mockmenu = [
	{
		name: '活动配置中心',
		url: 'activity',
		icon: 'appstore',
        children:[
            {
                name:'积分兑换活动',
                icon:'appstore',
                url:'/activity-credit-list'
            },
            {
                name:'注册报名活动',
                icon:'appstore',
                url:'/activity-register-list'
            },
            {
                name:'图文活动',
                icon:'appstore',
                url:'/activity-picText-list'
            },
            {
                name:'拖拽demo',
                icon:'appstore',
                url:'/activity-drag-list'
            }
        ]
	}
]
