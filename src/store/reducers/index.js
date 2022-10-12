import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from '../../store/reducers/users';
import changeState from './../coreuistate/changeState';
import companySlice from './companySlice';
import customerSlice from './customerSlice';
import vendorSlice from './vendorSlice';
import vendorpriceSlice from './vendorpriceSlice';
import productSlice from './productSlice';
import poSlice from './poSlice';
import poDetailSlice from './poDetailSlice';
//import accountSlice from './accountSlice';
import fasreferenceSlice from './references/fasrefereceSlice';
import currencySlice from './references/currencySlice';
import countrySlice from './references/countrySlice';
import paymenttermSlice from './references/paymenttermSlice';
import paymentmodeSlice from './references/paymentmodeSlice';
import pstgroupSlice from './references/pstgroupSlice';
import productCategorySlice from './references/productCategorySlice';
import roleSlice from './roleSlice';
import userManagementSlice from './userManagementSlice';
import notificationSlice from './notificationSlice';
import companyWarehouseSlice from './references/companyWarehouseSlice';
import customerWarehouseSlice from './references/customerWarehouseSlice';

const userDataPersistConfig = {
    key: 'login',
    storage: storage,
};

const rootReducer = combineReducers({
    user: persistReducer(userDataPersistConfig, userReducer),
    role: roleSlice,
    user_management: userManagementSlice,
    coreuistate: changeState,
    company: companySlice,
    customer: customerSlice,
    vendor: vendorSlice,
    vendorprice: vendorpriceSlice,
    product: productSlice,
    po: poSlice,
    fasreference: fasreferenceSlice,
    currency: currencySlice,
    country: countrySlice,
    paymentterm: paymenttermSlice,
    paymentmode: paymentmodeSlice,
    pstgroup: pstgroupSlice,
    podetail:poDetailSlice,
    productcategory: productCategorySlice,
    notification:notificationSlice,
    company_warehouse: companyWarehouseSlice,
    customer_warehouse: customerWarehouseSlice
})

export default rootReducer;
