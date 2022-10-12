import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

const Invoice = React.lazy(() => import('./views/apps/invoicing/Invoice'))

//Forms - FAS
const CustomerList = React.lazy(() => import('./views/pages/dims/customer/CustomerTable'))
const CustomerAddForm = React.lazy(() => import('./views/pages/dims/customer/CustomerAdd'))
const CustomerUpdateForm = React.lazy(() => import('./views/pages/dims/customer/CustomerUpdate'))

const VendorList = React.lazy(() => import('./views/pages/dims/vendor/VendorTable'))
const VendorAddForm = React.lazy(() => import('./views/pages/dims/vendor/VendorAdd'))
const VendorUpdateForm = React.lazy(() => import('./views/pages/dims/vendor/VendorUpdate'))
const VendorPriceList = React.lazy(() => import('./views/pages/dims/vendorprice/VendorPriceTable'))
const VendorPriceAddForm = React.lazy(() => import('./views/pages/dims/vendorprice/VendorPriceAdd'))
const VendorPriceUpdateForm = React.lazy(() => import('./views/pages/dims/vendorprice/VendorPriceUpdate'))

const ProductList = React.lazy(() => import('./views/pages/dims/product/ProductTable'))
const ProductAddForm = React.lazy(() => import('./views/pages/dims/product/ProductAdd'))
const ProductUpdateForm = React.lazy(() => import('./views/pages/dims/product/ProductUpdate'))
const ProductCategoryList = React.lazy(() => import('./views/pages/dims/product/components/productcategory/ProductCategoryTable'))
const ProductCategoryAddForm = React.lazy(() => import('./views/pages/dims/product/components/productcategory/ProductCategoryAdd'))
const ProductCategoryUpdateForm = React.lazy(() => import('./views/pages/dims/product/components/productcategory/ProductCategoryUpdate'))

const CompanyList = React.lazy(() => import('./views/pages/dims/company/CompanyTable'))
const CompanyAddForm = React.lazy(() => import('./views/pages/dims/company/CompanyAdd'))
const CompanyUpdateForm = React.lazy(() => import('./views/pages/dims/company/CompanyUpdate'))

const AccountList = React.lazy(() => import('./views/pages/dims/account/accountTable'))
const AccountAddForm = React.lazy(() => import('./views/pages/dims/account/accountAdd'))
const AccountUpdateForm = React.lazy(() => import('./views/pages/dims/account/accountUpdate'))

const POList = React.lazy(() => import('./views/pages/dims/po/PoTable'))
const PoPage = React.lazy(() => import('./views/pages/dims/po/PoPage/PoPage'))
//const POUpdateForm = React.lazy(() => import('./views/pages/dims/po/PoUpdate'))

const CurrencyList = React.lazy(() => import('./views/pages/dims/currency/CurrencyTable'))
const CurrencyAddForm = React.lazy(() => import('./views/pages/dims/currency/CurrencyAdd'))
const CurrencyUpdateForm = React.lazy(() => import('./views/pages/dims/currency/CurrencyUpdate'))

const PostingGroupList = React.lazy(() => import('./views/pages/dims/postinggroups/PostingGroupTable'))
const PostingGroupAddForm = React.lazy(() => import('./views/pages/dims/postinggroups/PostingGroupAdd'))
const PostingGroupUpdateForm = React.lazy(() => import('./views/pages/dims/postinggroups/PostingGroupUpdate'))

const CountryList = React.lazy(() => import('./views/pages/dims/country/CountryTable'))
const CountryAddForm = React.lazy(() => import('./views/pages/dims/country/CountryAdd'))
const CountryUpdateForm = React.lazy(() => import('./views/pages/dims/country/CountryUpdate'))

const UserList = React.lazy(() => import('./views/pages/dims/users/UserTable'))
const RoleList = React.lazy(() => import('./views/pages/dims/roles/RoleTable'))
const CompanyWarehouse = React.lazy(() => import('./views/pages/dims/company_warehouse/CompanyWarehouse'))
const CustomerWarehouse = React.lazy(() => import('./views/pages/dims/customer_warehouse/CustomerWarehouse'))


const NotificationList = React.lazy(() => import('./views/pages/dims/notifications/NotificationsTable'))

const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))


const routes = [
  { path: '/', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/dashboard', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/notifications', name: 'Notifications', element: NotificationList },

  { path: '/customers', name: 'All Customers', element: CustomerList },
  { path: '/customer/add', name: 'Add New Customer', element: CustomerAddForm },
  { path: '/customer/:id', exact: true, name: 'Update Customer', element: CustomerUpdateForm },
  
  { path: '/vendors', name: 'All Vendors', element: VendorList },
  { path: '/vendor/add', name: 'Add New Vendor', element: VendorAddForm },
  { path: '/vendor/:id', name: 'Update Vendor', element: VendorUpdateForm },
  { path: '/vendorprice', name: 'All Vendor Price', element: VendorPriceList },
  { path: '/vendorprice/add', name: 'Add New Vendor Price', element: VendorPriceAddForm },
  { path: '/vendorprice/:id', name: 'Update Vendor Price', element: VendorPriceUpdateForm },
  
  { path: '/products', name: 'All Products', element: ProductList },
  { path: '/product/add', name: 'Add New Product', element: ProductAddForm },
  { path: '/product/:id', exact: true, name: 'Update Product', element: ProductUpdateForm },
  { path: '/productcategories', name: 'All Product Categories', element: ProductCategoryList },
  { path: '/productcategory/add', name: 'Add New Product Category', element: ProductCategoryAddForm },
  { path: '/productcategory/:id', exact: true, name: 'Update Product Category', element: ProductCategoryUpdateForm },
  
  { path: '/po', name: 'All Purchase Order', element: POList },
  { path: '/po/add', name: 'Add New PO', element: PoPage },
  { path: '/po/:id', exact: true, name: 'Update PO', element: PoPage },
  
  { path: '/companies', name: 'All Companies', element: CompanyList },
  { path: '/company/add', name: 'Add New Company', element: CompanyAddForm },
  { path: '/company/:id', exact: true, name: 'Update Company', element: CompanyUpdateForm },
  
  { path: '/accounts', name: 'All Accounts', element: AccountList },
  { path: '/account/add', name: 'Add New Account', element: AccountAddForm },
  { path: '/account/:id', exact: true, name: 'Update Account', element: AccountUpdateForm },
  
  { path: '/currencies', name: 'All Currencies', element: CurrencyList },
  { path: '/currencies/add', name: 'Add New Currency', element: CurrencyAddForm },
  { path: '/currency/:id', exact: true, name: 'Update Currency', element: CurrencyUpdateForm },

  { path: '/postinggroups', name: 'All Posting Groups', element: PostingGroupList },
  { path: '/postinggroup/add', name: 'Add New Posting Group', element: PostingGroupAddForm },
  { path: '/postinggroup/:id', exact: true, name: 'Update Posting Group', element: PostingGroupUpdateForm },

  { path: '/countries', name: 'All Countries', element: CountryList },
  { path: '/country/add', name: 'Add New Posting Group', element: CountryAddForm },
  { path: '/country/:id', exact: true, name: 'Update Posting Group', element: CountryUpdateForm },
  
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/user_management', name: 'User Management', element: UserList },
  { path: '/role', name: 'Role', element: RoleList },

  { path: '/company_warehouse', name: 'Company Warehouse', element: CompanyWarehouse },
  { path: '/customer_warehouse', name: 'Customer Warehouse', element: CustomerWarehouse },
]

export default routes
