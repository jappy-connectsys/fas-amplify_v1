import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import axios from 'axios'
import { DatabaseAPI } from 'src/components'

const CustomerTable = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Customer</strong> <small>All Records</small>
          </CCardHeader>
          <CCardBody>
            <DatabaseAPI tablename='customer' querytype='fields=' query='customer_id,customer_name,status' uid='customer_id'/>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    
  )
}

export default CustomerTable