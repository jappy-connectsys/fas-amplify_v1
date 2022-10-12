import React, { useEffect, useState } from 'react'
import { CSmartTable, CCard, CCardBody, CCardHeader, CCol, CRow, CBadge, CButton, CCollapse } from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectCustomers, updateCustomer } from './../../../../store/reducers/customerSlice';

const CustomerTable = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, status, error } = useSelector(selectCustomers);

  const [details, setDetails] = useState([])
  const columns = [
    { key: 'customer_name', _style: { width: '20%' }},
    { key: 'email', sorter: false },
    { key: 'phone_number', sorter: false },
    { key: 'date_updated', sorter: false },
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      //Just change status to deleted
      dispatch((updateCustomer({ customer_id: id, status: 'deleted'})));
      window.location.reload(true);
    }
  };

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
                      color="info"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(item.customer_id)
                      }}
                    >
                      {details.includes(item.customer_id) ? 'Hide' : 'Show'}
                    </CButton>
                  </td>
                )
              },
              details: (item) => {
                return (
                  <CCollapse visible={details.includes(item.customer_id)}>
                    <CCardBody>
                      <h6>Contact Person: {item.contact_person_first_name} {item.contact_person_last_name}</h6>
                      <p className="text-muted">Last Updated: {item.date_updated}</p>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton size="sm" color="light" className="ml-1" onClick={() => handleDelete(`${item.customer_id}`)}>
                          Delete
                        </CButton>
                        <CButton size="sm" color="dark" onClick={() => navigate(`/customer/${item.customer_id}`)}>
                          View / Update
                        </CButton>
                      </div>
                    </CCardBody>
                  </CCollapse>
                )
              },
            }}
            selectable
            sorterValue={{ column: 'customer_name', state: 'asc' }}
            tableFilter
            tableHeadProps={{
              color: 'info',
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

export default CustomerTable