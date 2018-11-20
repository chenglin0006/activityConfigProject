const ActivityActionTypeDesc={
    'submit':'提交',
    'verify':'审批',
    'return':'退回',
    'delete':'删除',
    'publish':'发布',
    'refuse':'拒绝',
    'end':'终止'
}

//1：提交，2：审批，3：发布，4：拒绝，5：终止，6：删除，7：回退
const ActivityTypeEnum={
    'submit':1,
    'verify':2,
    'publish':3,
    'refuse':4,
    'end':5,
    'delete':6,
    'return':7
}

const skuCludeEnum = [
    {name:'包含',id:1},
    {name:'排他',id:2},
]

const loopStatusEnum=[
    {name:'满减',id:1},
    {name:'每满',id:2},
]

const rewardStatusEnum=[
    {name:'立减',id:1},
    {name:'折扣',id:2},
]
export {
    ActivityActionTypeDesc,
    ActivityTypeEnum,
    skuCludeEnum,
    loopStatusEnum,
    rewardStatusEnum
}