import React, { useState } from 'react'
import { CSmartTable, CCard, CCardBody, CCardHeader, CCol, CRow, CBadge, CButton, CCollapse, CFormCheck, CFormLabel } from '@coreui/react-pro'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrencies, updateCurrency } from './../../../../store/reducers/references/currencySlice';
import { selectUser } from './../../../../store/reducers/users';


const CurrencyTable = () => {

  const navigate = useNavigate();
  
  const { currenciesData } = useSelector(selectCurrencies);
  const { user } = useSelector(selectUser);

  const logged = user ? user.first_name : 'anonymous';

  const prices = {}
  console.log({currenciesData});
  
  const handleDelete = (id) => {
    if(prices.status !== 'deleted') {
      if (window.confirm("Are you sure you want to delete this currency "+ id + "?")) {
        // dispatch(updateCurrency({currency_code: id, status: 'deleted'}));
        window.location.reload(true);
      }
    }
  };

  const [selected, setSelected] = useState([2, 3])
  const loadData = currenciesData.map((item, id) => {
    const _selected = selected.includes(id)
    return {
      ...item,
      id,
      _selected,
      _classes: [item._classes, _selected && 'table-selected'],
    }
  })

  console.log({loadData})

  const check = (e, id) => {
    if (e.target.checked) {
      setSelected([...selected, id])
    } else {
      setSelected(selected.filter((itemId) => itemId !== id))
    }
  }

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
 
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Vendor Prices</strong> <small>All Records</small>
          </CCardHeader>
          <CCardBody>
            <CSmartTable
            activePage={1}
            cleaner
            clickableRows
            columns={[
               { key: 'currency_code', label: 'Code'},
               { key: 'country', label: 'Country' },
               { key: 'currency_description', label: 'Description' },
               { key: 'updated_by', label: 'Updated By' },
               { key: 'date_updated', label: 'Date Updated' },
               { key: 'status', label: 'Status' },
               'action',
            ]}
            tableFilter
            columnSorter
            footer
            items={currenciesData}
            itemsPerPageSelect
            itemsPerPage={20}
            pagination
            selectable
            scopedColumns={{
               select: (item) => {
                 return (
                   <td>
                     <CFormCheck
                       id={`checkbox${item.id}`}
                       checked={item._selected}
                       onChange={(e) => check(e, item.id)}
                     />
                     <CFormLabel variant="custom-checkbox" htmlFor={`checkbox${item.id}`} />
                   </td>
                 )
               },
               status: (item) => (
                 <td>
                   <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                 </td>
               ),
               action: (item) => (
                  <td>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton size="sm" color="light" className="ml-1" onClick={() => handleDelete(`${item.currency_code}`)}>
                           Delete
                        </CButton>
                        <CButton size="sm" color="dark" onClick={() => navigate(`/currency/${item.currency_code}`)}>
                           View
                        </CButton>
                    </div>
                  </td>
               ),
             }}
             tableProps={{
               hover: true,
               striped: true,
               responsive: true,
             }}
           />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    
  )
}

export default CurrencyTable