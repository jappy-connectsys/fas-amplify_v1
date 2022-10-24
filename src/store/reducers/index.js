import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import { LOCAL_AUTH_TOKEN_KEY } from '../../config';

import userReducer from './users';
import changeState from './../coreuistate/changeState';
import companySlice from './companySlice';
import customerSlice from './customerSlice';
import vendorSlice from './vendorSlice';
import vendorpriceSlice from './vendorpriceSlice';
import productSlice from './productSlice';
import poSlice from './poSlice';
import poDetailSlice from './poDetailSlice';
//import accountSlice from './accountSlice';
//import fasreferenceSlice from './references/fasrefereceSlice';
import currencySlice from './currencySlice';
import countrySlice from './countrySlice';
import paymenttermSlice from './paymenttermSlice';
import paymentmodeSlice from './paymentmodeSlice';
import pstgroupSlice from './pstgroupSlice';
import productCategorySlice from './productCategorySlice';
import roleSlice from './roleSlice';
import userManagementSlice from './userManagementSlice';
import notificationSlice from './notificationSlice';
import companyWarehouseSlice from './companyWarehouseSlice';
import customerWarehouseSlice from './customerWarehouseSlice';

const userDataPersistConfig = {
    key: LOCAL_AUTH_TOKEN_KEY,
    storage: storage,
    blacklist: ['errors', 'fetching'],
};

const rootReducer = combineReducers({
    user: persistReducer(userDataPersistConfig, userReducer),
    role: roleSlice,
    user_management: userManagementSlice,
    coreuistate: changeState,
    //fasreference: fasreferenceSlice,
    company: companySlice,
    customer: customerSlice,
    vendor: vendorSlice,
    vendorprice: vendorpriceSlice,
    product: productSlice,
    po: poSlice,
    currency: currencySlice,
    country: countrySlice,
    paymentterm: paymenttermSlice,
    paymentmode: paymentmodeSlice,
    pstgroup: pstgroupSlice,
    podetail: poDetailSlice,
    productcategory: productCategorySlice,
    notification: notificationSlice,
    company_warehouse: companyWarehouseSlice,
    customer_warehouse: customerWarehouseSlice
});

export default rootReducer;
