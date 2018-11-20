
const areaTreeData = [
    { key: '0', title: '区域', children:
            [
                { key: '0-0', title: '华东 /0-1', children:
                        [
                            { key: '0-0-0', title: '上海 /0-0-0',code:100000},
                            { key: '0-0-1', title: '杭州 /0-0-1',code:100001},
                        ],
                },
                { key: '0-1', title: '华北 /0-1'},
                { key: '0-2', title: '华南 /0-2'},
                { key: '0-3', title: '华西 /0-3'},
            ],
    },
];

const categoryTreeData = [
    { key: '0', title: 'Category', children:
            [
                { key: '51', title: '（51）装饰建材', children:
                        [
                            { key: '5151', title: '(5151)移动板'},
                            { key: '5152', title: '(5152)室内门',children:
                                [
                                    { key: '515201', title: '(515201)室内门'},
                                    { key: '515202', title: '(515202)隔断门'},
                                    { key: '515203', title: '(515203)门窗密封条'},
                                ]
                            },
                        ],
                },
                { key: '52', title: '(52)家庭舒适',children:
                    [
                        { key: '5252', title: '(5252)中央采暖',children:
                            [
                                { key: '526101', title: '(526101)采暖系统'},
                                { key: '526102', title: '(526102)散热器'},
                            ]
                        }
                    ]
                }
            ],
    },
];

const cardTreeData = [
    {key:'0',title:'全部卡类型',children:
        [
            {key:15,title:'(15)北区315零售促销折扣卡'},
            {key:14,title:'(14)315DC折扣卡'},
            {key:13,title:'(13)315DS85折卡'},
            {key:12,title:'(12)VIVID CARD'},
            {key:11,title:'(11)vivid store discount card'}
        ]
    }
]

let resourceData =[{
    id: 1,
    resourceName: "促销管理",
    resourceValue: "促销管理",
    resourceLink: "sales",
    resourceIcon: "appstore",
    parentId: 0,
    resourceType: 10,
    path: "0",
    resourceStatus: 10,
    status: 10,
    sort: 0,
    startTime: null,
    endTime: null,
    remark: "",
    creatorId: null,
    createTime: null,
    modifyTime: null,
    modifierId: null,
    childNodes: [
        {
            childNodes: [
                {
                    childNodes: null,
                    creatorId: null,
                    modifierId: null,
                    resourceName: "新增",
                    remark: "",
                    sort: 0,
                    parentId: 2,
                    path: "1,2,3",
                    resourceStatus: 11,
                    pathNum: null,
                    modifyTime: null,
                    createTime: null,
                    resourceIcon: "",
                    startTime: null,
                    resourceLink: "",
                    id: 3,
                    endTime: null,
                    resourceValue: "addActivityBtn",
                    resourceType: 12,
                    status: 10
                },
                {
                    childNodes: null,
                    creatorId: null,
                    modifierId: null,
                    resourceName: "批量审核",
                    remark: "",
                    sort: 0,
                    parentId: 2,
                    path: "1,2,4",
                    resourceStatus: 11,
                    pathNum: null,
                    modifyTime: null,
                    createTime: null,
                    resourceIcon: "",
                    startTime: null,
                    resourceLink: "",
                    id: 4,
                    endTime: null,
                    resourceValue: "batchVerify",
                    resourceType: 12,
                    status: 10
                },
                {
                    childNodes: null,
                    creatorId: null,
                    modifierId: null,
                    resourceName: "批量发布",
                    remark: "",
                    sort: 0,
                    parentId: 2,
                    path: "1,2,5",
                    resourceStatus: 11,
                    pathNum: null,
                    modifyTime: null,
                    createTime: null,
                    resourceIcon: "",
                    startTime: null,
                    resourceLink: "",
                    id: 5,
                    endTime: null,
                    resourceValue: "batchPublish",
                    resourceType: 12,
                    status: 10
                },
                {
                    childNodes: null,
                    creatorId: null,
                    modifierId: null,
                    resourceName: "批量退回",
                    remark: "",
                    sort: 0,
                    parentId: 2,
                    path: "1,2,6",
                    resourceStatus: 11,
                    pathNum: null,
                    modifyTime: null,
                    createTime: null,
                    resourceIcon: "",
                    startTime: null,
                    resourceLink: "",
                    id: 6,
                    endTime: null,
                    resourceValue: "batchReturn",
                    resourceType: 12,
                    status: 10
                },
                {
                    childNodes: null,
                    creatorId: null,
                    modifierId: null,
                    resourceName: "批量提交",
                    remark: "",
                    sort: 0,
                    parentId: 2,
                    path: "1,2,7",
                    resourceStatus: 11,
                    pathNum: null,
                    modifyTime: null,
                    createTime: null,
                    resourceIcon: "",
                    startTime: null,
                    resourceLink: "",
                    id: 7,
                    endTime: null,
                    resourceValue: "batchSubmit",
                    resourceType: 12,
                    status: 10
                },
                {
                    childNodes: null,
                    creatorId: null,
                    modifierId: null,
                    resourceName: "批量删除",
                    remark: "",
                    sort: 0,
                    parentId: 2,
                    path: "1,2,8",
                    resourceStatus: 11,
                    pathNum: null,
                    modifyTime: null,
                    createTime: null,
                    resourceIcon: "",
                    startTime: null,
                    resourceLink: "",
                    id: 8,
                    endTime: null,
                    resourceValue: "batchDelete",
                    resourceType: 12,
                    status: 10
                }
            ],
            creatorId: null,
            modifierId: null,
            resourceName: "活动列表",
            remark: "",
            sort: 0,
            parentId: 1,
            path: "1,2",
            resourceStatus: 10,
            pathNum: null,
            modifyTime: null,
            createTime: null,
            resourceIcon: "appstore",
            startTime: null,
            resourceLink: "/sales/activity/list",
            id: 2,
            endTime: null,
            resourceValue: "活动列表",
            resourceType: 10,
            status: 10
        },
        {
            childNodes: [
                {
                    childNodes: null,
                    creatorId: null,
                    modifierId: null,
                    resourceName: "批量退回",
                    remark: "",
                    sort: 0,
                    parentId: 9,
                    path: "1,9,10",
                    resourceStatus: 11,
                    pathNum: null,
                    modifyTime: null,
                    createTime: null,
                    resourceIcon: "",
                    startTime: null,
                    resourceLink: "",
                    id: 10,
                    endTime: null,
                    resourceValue: "batchReturn",
                    resourceType: 12,
                    status: 10
                },
                {
                    childNodes: null,
                    creatorId: null,
                    modifierId: null,
                    resourceName: "批量终止",
                    remark: "",
                    sort: 0,
                    parentId: 9,
                    path: "1,9,11",
                    resourceStatus: 11,
                    pathNum: null,
                    modifyTime: null,
                    createTime: null,
                    resourceIcon: "",
                    startTime: null,
                    resourceLink: "",
                    id: 11,
                    endTime: null,
                    resourceValue: "batchEnd",
                    resourceType: 12,
                    status: 10
                }
            ],
            creatorId: null,
            modifierId: null,
            resourceName: "正式列表",
            remark: "",
            sort: 0,
            parentId: 1,
            path: "0",
            resourceStatus: 10,
            pathNum: null,
            modifyTime: null,
            createTime: null,
            resourceIcon: "appstore",
            startTime: null,
            resourceLink: "/sales/formal/list",
            id: 9,
            endTime: null,
            resourceValue: "正式列表",
            resourceType: 10,
            status: 10
        }
    ]
}]


export {
    areaTreeData,
    categoryTreeData,
    cardTreeData,
    resourceData
}