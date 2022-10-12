import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import { DocsExample } from 'src/components'

import VendorTable from './VendorTable'
import SmartTableBasicExample from './SmartTableBasixExample'

const SmartTable = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Directus</strong> <small>Moandbear</small>
          </CCardHeader>
          <CCardBody>
            <VendorTable />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Directus</strong> <small>Moandbear</small>
          </CCardHeader>
          <CCardBody>
            <SmartTableBasicExample />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SmartTable
