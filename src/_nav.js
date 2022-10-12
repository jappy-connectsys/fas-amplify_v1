import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilGrid,
  cilMap,
  cilPencil,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
  cilPeople,
  cilTags
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Company Profile',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
    to: '/company/1',
    badge: {
      color: 'info-gradient',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Customer',
    to: '/apps/invoicing',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Customers',
        to: '/customers',
      },
      {
        component: CNavItem,
        name: 'Add New Customer',
        to: '/customer/add',
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Vendor',
    to: '/apps/invoicing',
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Vendors',
        to: '/vendors',
      },
      {
        component: CNavItem,
        name: 'Add New Vendor',
        to: '/vendor/add',
      },
      {
        component: CNavItem,
        name: 'Invoice',
        to: '/apps/invoicing/invoice',
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Products',
    to: '/apps/invoicing',
    icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Products',
        to: '/products',
      },
      {
        component: CNavItem,
        name: 'Add New Product',
        to: '/product/add',
      },
      {
        component: CNavItem,
        name: 'Product Category',
        to: '/productcategories',
      },
      {
        component: CNavItem,
        name: 'Add Product Category',
        to: '/productcategory/add',
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Vendor Price',
    to: '/vendorprice',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Vendor Price',
        to: '/vendorprice',
      },
      {
        component: CNavItem,
        name: 'Add Vendor Price',
        to: '/vendorprice/add',
      },
    ]
  },
  {
    component: CNavItem,
    name: 'Purchase Orders',
    to: '/po',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Company Warehouse',
    to: '/company_warehouse',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Customer Warehouse',
    to: '/customer_warehouse',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'User Management',
    to: '/role',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Users',
        to: '/user_management',
      },
      {
        component: CNavItem,
        name: 'Role',
        to: '/role',
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Settings',
    to: '/notifications',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Notifications',
        to: '/notifications',
      },
    ]
  },
  {
    component: CNavTitle,
    name: 'Transactions',
  },

  {
    component: CNavGroup,
    name: 'Account',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Invoice',
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
        to: '/forms/fas-dims/invoice',
      },
    ],
  },
  /*{
    component: CNavGroup,
    name: 'Accounts',
    to: '/apps/invoicing',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Accounts',
        to: '/accounts',
      },
      {
        component: CNavItem,
        name: 'Add New Account',
        to: '/account/add',
      },
    ]
  },*/
]

export default _nav
