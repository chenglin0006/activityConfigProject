import {combineReducers} from 'redux';
import Login from './app/login/index.reducer';
import Fetch from './middleware/fetch/index.reducer';
import CascaderShop from './app/components/cascaderShop/index.reducer';
import Home from './app/home/index.reducer'

import CreditList from './app/activityType/creditExchange/list/index.reducer'
import NewCredit from './app/activityType/creditExchange/new/index.reducer'

export default combineReducers({
  Login,
  Fetch,
  CascaderShop,
  Home,
    CreditList,
    NewCredit
});
