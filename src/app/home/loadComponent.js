import Loadable from 'react-loadable'
import React from "react";
// import CreditList from '../activityType/creditExchange/list/index';
// import NewCredit from '../activityType/creditExchange/new/index';

// import RegisterList from '../activityType/register/list/index';
// import NewRegister from '../activityType/register/new/index';

// import PicTextList from '../activityType/picText/list/index';
// import NewPicText from '../activityType/picText/new/index';

const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

const CreditList = Loadable({
    loader: () => import('../activityType/creditExchange/list/index'),
    loading: MyLoadingComponent
});
const NewCredit = Loadable({
    loader: () => import('../activityType/creditExchange/new/index'),
    loading: MyLoadingComponent
});
const RegisterList = Loadable({
    loader: () => import('../activityType/register/list/index'),
    loading: MyLoadingComponent
});
const NewRegister = Loadable({
    loader: () => import('../activityType/register/new/index'),
    loading: MyLoadingComponent
});

const PicTextList = Loadable({
    loader: () => import('../activityType/picText/list/index'),
    loading: MyLoadingComponent
});
const NewPicText = Loadable({
    loader: () => import('../activityType/picText/new/index'),
    loading: MyLoadingComponent
});

const NewDrag = Loadable({
    loader: () => import('../activityType/dragDemo/new/index'),
    loading: MyLoadingComponent
});

let allRouterList = [
    {path:'/activity-credit-list',component:CreditList,isLeftMenu:false},
    {path:'/activity-credit-new',component:NewCredit,isLeftMenu:false},
    {path:'/activity-register-list',component:RegisterList,isLeftMenu:false},
    {path:'/activity-register-new',component:NewRegister,isLeftMenu:false},
    {path:'/activity-picText-list',component:PicTextList,isLeftMenu:false},
    {path:'/activity-picText-new',component:NewPicText,isLeftMenu:false},
    {path:'/activity-drag-list',component:NewDrag,isLeftMenu:false},
]
export {
    allRouterList
}
