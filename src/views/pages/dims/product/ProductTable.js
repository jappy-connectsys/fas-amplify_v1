import React, { useState, useRef, useEffect } from 'react';
import { 
  CSmartTable, 
  CCard, 
  CCardBody, 
  CCardHeader, 
  CCol, 
  CRow, 
  CBadge, 
  CButton, 
  CCollapse,
  CPopover, 
  CToaster 
} from '@coreui/react-pro';
import { AppPopper, AppToast } from './../../../../components';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { selectProducts, updateProduct } from './../../../../store/reducers/productSlice';


const ProductTable = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { added } = useParams();
  
  const { data } = useSelector(selectProducts);

  const [details, setDetails] = useState([])
  const columns = [
    { key: 'product_id', label: 'ID', _style: { width: '10%' }},
    { key: 'product_name', _style: { width: '20%' }},
    { key: 'category', sorter: false },
    { key: 'date_created', sorter: true },
    { key: 'status', _style: { width: '20%' }},
    { key: 'show_details', label: 'Action', _style: { width: '1%' }},
  ]

  const getBadge = (status) => {
    switch (status) {
      case 'active':
        return 'success'
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

  //Toast
  const [toast, addToast] = useState(0);
  const toaster = useRef();

  const toastAlertMsg = () => (
    <AppToast pagename={'Products'} message={`Details successfully added!`}/>
  );

  useEffect(() => {
    toastAlertMsg();
  },[added]);

  // Popper
  const [deletingItem, setDeletingItem] = useState(false)
  const [popper, setPopper] = useState(false)

  const handleSubmitPopper = (id) => {
    const payload = {
      product_id: id, 
      status: 'deleted'
    }
    dispatch(updateProduct(payload)).then(() => {
      setPopper(0);
      window.location.reload(true);
    });
  }

  const handleClosePopper = () => {
    console.log(popper);
    setPopper(0);
  }

  const handleOpenTriggerPopper = (id) => {
    setPopper(id);
  }
 
 
  return (
    <CRow>
      <CCol xs={12}>

        <CToaster ref={toaster} push={toast} placement="top-end" />
        
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Products</strong> <small>All Records</small>
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
            itemsPerPage={20}
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
                        toggleDetails(item.product_id)
                      }}
                    >
                      {details.includes(item.product_id) ? 'Hide' : 'Show'}
                    </CButton>
                  </td>
                )
              },
              details: (item) => {
                return (
                  <CCollapse visible={details.includes(item.product_id)}>
                    <CCardBody>
                      <h5>{item.product_name}</h5>
                      <p className="text-muted">Date Updated: {item.date_updated}</p>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CPopover
                          visible={item.product_id === popper}
                          content={
                            <AppPopper 
                              id={item.product_id} 
                              message={'Are you sure you want to delete this item?'} 
                              buttonYes={() => handleSubmitPopper(item.product_id)}
                              buttonNo={() => handleClosePopper()}
                            ></AppPopper>
                          }
                          onShow={() => handleOpenTriggerPopper(item.product_id)}
                          placement="top"
                          offset={[-70,8]}
                        >
                          <CButton size="sm" color="danger" style={{marginLeft:'5px'}}>
                            Delete
                          </CButton>
                        </CPopover>
                        
                        <CButton size="sm" color="dark" onClick={() => navigate(`/product/${item.product_id}`)}>
                          View / Update
                        </CButton>
                      </div>
                    </CCardBody>
                  </CCollapse>
                )
              },
            }}
            selectable
            sorterValue={{ column: 'product_name', state: 'asc' }}
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

export default ProductTable