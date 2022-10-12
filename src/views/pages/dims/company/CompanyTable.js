import React, { useState } from 'react';
import { CSmartTable, CCard, CCardBody, CCardHeader, CCol, CRow, CBadge, CButton, CCollapse } from '@coreui/react-pro';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCompanies } from './../../../../store/reducers/companySlice';


const CompanyTable = () => {

  const navigate = useNavigate();

  const { data, status, error } = useSelector(selectCompanies);
  console.log({data, status, error})

  const [details, setDetails] = useState([]);
  const columns = [
    { key: 'company_name', _style: { width: '20%' }},
    { key: 'email', sorter: false },
    { key: 'phone_number', sorter: false },
    { key: 'status', _style: { width: '20%' }},
    {
      key: 'show_details',
      label: 'Action',
      _style: { width: '1%' }
    },
  ]

  const getBadge = (status) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'archived':
        return 'secondary'
      case 'pending':
        return 'warning'
      case 'deleted':
        return 'danger'
      default:
        return 'active'
    }
  }

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
 
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Customer</strong> <small>All Records</small>
            
          </CCardHeader>
          <CCardBody>
            <CSmartTable
            activePage={1}
            cleaner
            clickableRows
            columns={columns}
            columnFilter
            columnSorter
            footer
            items={data}
            itemsPerPageSelect
            itemsPerPage={10}
            pagination
            scopedColumns={{
              status: (item) => (
                <td>
                  <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                </td>
              ),
              show_details: (item) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(item.company_id)
                      }}
                    >
                      {details.includes(item.company_id) ? 'Hide' : 'Show'}
                    </CButton>
                  </td>
                )
              },
              details: (item) => {
                return (
                  <CCollapse visible={details.includes(item.company_id)}>
                    <CCardBody>
                      <h6>Contact Person: {item.contact_person_first_name} {item.contact_person_last_name}</h6>
                      <p className="text-muted">Last Updated: {item.date_updated}</p>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton size="sm" color="dark" onClick={() => navigate(`/company/${item.company_id}`)}>
                          View / Update
                        </CButton>
                      </div>
                    </CCardBody>
                  </CCollapse>
                )
              },
            }}
            selectable
            sorterValue={{ column: 'company_name', state: 'asc' }}
            tableFilter
            tableHeadProps={{
              color: 'danger',
            }}
            tableProps={{
              striped: true,
              hover: true,
              responsive: true,
            }}
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    
  )
}

export default CompanyTable