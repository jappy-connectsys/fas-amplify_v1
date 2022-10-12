import React, { useState, useEffect } from 'react'
import { CCardBody, CButton, CSmartTable } from '@coreui/react-pro'
import axios from 'axios'

const VendorTable = () => {

  //Directus Form
  const [tableItems, setCurrentData] = useState([])
  const [loading, setLoading] = useState(false)

  const dUrl = 'https://moandbear-cms-dev.5i9kftpno7oc0.ap-southeast-1.cs.amazonlightsail.com/items/'
  const tablename = "vendor"
  const token = '?access_token=TH181SMY2NDT0K3N'
  const queryFields = "&fields=vendor_id,vendor_name,updated_by,status"
  const url = dUrl + tablename + token + queryFields

  const directusItems = async () => {
    try {
      const res = await axios.get(url)
        setCurrentData(res.data.data)
        setLoading(true)
        
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    directusItems()
  }, [directusItems])

  console.log(tableItems)

  //Download CSV
  //const [currentItems, setCurrentItems] = useState(tableItems)
  //const csvContent = JSON.parse(tableItems)
  //console.log(csvContent)
  //const csvContent = currentItems.map((item) => Object.values(item).join(',')).join('\n')

  //const csvCode = 'data:text/csv;charset=utf-8,SEP=,%0A' + encodeURIComponent(csvContent)

  return (
    <CCardBody>
      
      <CSmartTable
        columnFilter
        columnSorter
        items={tableItems}
        itemsPerPage={8}
        pagination
        tableProps={{
          hover: true,
          responsive: true,
        }}
      />
    </CCardBody>
  )
}

export default VendorTable