import Loadable from 'react-loadable'
import React from "react";
// import CreditList from '../activityType/creditExchange/list/index';
// import NewCredit from '../activityType/creditExchange/new/index';

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

export {
    CreditList,
    NewCredit
}
