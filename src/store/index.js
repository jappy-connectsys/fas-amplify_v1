import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

import {
    persistStore, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, 
} from 'redux-persist';
import authMiddleware from './middleware/authMiddleware';

/* MAIN REDUCERS
import { GetCompanies } from './reducers/companySlice';
import { getCustomers } from './reducers/customerSlice';
import { getVendors } from './reducers/vendorSlice';
import { getVendorPrices } from './reducers/vendorpriceSlice';
import { getProducts } from './reducers/productSlice';
import { getPo } from './reducers/poSlice';
import { getPoDetail } from './reducers/poDetailSlice';
*/

import { getProfiles } from './reducers/accountSlice';

/* REFERENCES 
import { GetCurrencies } from './reducers/currencySlice';
import { GetCountries } from './reducers/countrySlice';
import { GetPaymentTerms } from './reducers/paymenttermSlice';
import { GetPostingGroups } from './reducers/pstgroupSlice';
import { GetPaymentModes } from './reducers/paymentmodeSlice';
import { GetProductCategory } from './reducers/references/productCategorySlice';
*/

const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(authMiddleware),
});

store.dispatch(getProfiles());
//store.dispatch(GetCompanies());
//store.dispatch(getCustomers());
//store.dispatch(getVendors());
//store.dispatch(getProducts());
//store.dispatch(getVendorPrices());
//store.dispatch(getPoDetail());
//store.dispatch(getPo({}));

/* REFERENCES 
store.dispatch(GetCurrencies());
store.dispatch(GetCountries());
store.dispatch(GetPaymentTerms());
store.dispatch(GetPostingGroups());
store.dispatch(GetPaymentModes());
store.dispatch(getProductCategory());
*/

export const persistor = persistStore(store);
export default { store, persistor };