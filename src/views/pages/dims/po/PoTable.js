import React, { useState, useEffect } from 'react'
import { 
  CSmartTable, 
  CCard, 
  CCardBody, 
  CCardHeader, 
  CCol, 
  CRow, 
  CBadge, 
  CButton, 
  CPopover, 
  CContainer,
  CCollapse
} from '@coreui/react-pro';
import { AppPopper } from './../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { selectPos, getPo, deletePo, approvePO } from './../../../../store/reducers/poSlice';
import { selectPoDetail, deletePoDetail, getPoDetail } from './../../../../store/reducers/poDetailSlice';
import { selectVendors } from './../../../../store/reducers/vendorSlice';

const PoTable = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();
  const search_po_number = searchParams.get("po_number")

  const { data:vendors } = useSelector(selectVendors);
  const { data:poHeader, loadingApprovePO } = useSelector(selectPos);
  const { data:poDetail } = useSelector(selectPoDetail);
  const { user } = useSelector((state) => state.user);
  
  const data = poHeader?.map(resMap=> {
    const { vendor_id:v_id_map, ...rest } = resMap;
    const data = vendors ? vendors.find(res=>res.vendor_id === v_id_map) : [].find(res=>res.vendor_id === v_id_map)
   
    const cus = {
      vendor_id:data?.vendor_id || '',
      vendor_name:data?.vendor_name || '',
      ...rest 
    }
    return cus
  })

  const [details, setDetails] = useState([])
  const [deletingPO, setDeletingPO] = useState(false)
  const [popper, setPopper] = useState(false)

  useEffect(()=>{
    dispatch(getPo({ search_po_number }))
  },[dispatch, search_po_number])

  const columns = [
    { label: 'ID', key: 'po_header_id', _style: { width: '10%' }},
    { key: 'po_number', label: 'PO Number', sorter: false },
    { key: 'vendor_name', label: 'Vendor Name', sorter: true, _style: { width: '20%' } },
    { key: 'po_date', label: 'Date', _style: { width: '20%' }},
    { key: 'approval_flag', label: 'Approved', _style: { width: '15%' }},
    { key: 'show_details', label: 'Action', sorter: false, _style: { width: '15%' }},
  ]

  const getBadge = (approval_flag) => {
    switch (approval_flag) {
      case 'Y':
        return 'success'
      case 'N':
        return 'danger'
      case 'null':
        return 'warning'
      default:
        return 'null'
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

  const handleSubmitPopper = (id) => {
    const payload = {
      id,
    }
    dispatch(deletePo(payload)).then(()=>{
        if(poDetail.length > 0){
          poDetail.map(({ po_detail_id })=>{
              const params = {
                id:po_detail_id,
              }
              dispatch(deletePoDetail(params))
          })
        }
        dispatch(getPo({}))
        setPopper(0)
    })
  }

  const handleClosePopper = () => {
    setPopper(0)
  }

  const handleOpenTriggerPopper = (id) => {
    handleClickDeletePOHeader(id)
    setPopper(id)
  }
  
  const handleClickDeletePOHeader = (id) => {
    const params = {
      po_header_id: id
    }
    dispatch(getPoDetail(params))
  }

  const renderDeletePopperOver = (id) => {
    return (
      <>
      { deletingPO ? 'Deleting PO...' : poDetail.length === 0 ? (
          <AppPopper 
            id={id} 
            message={'This PO Header has no details are you sure you want to delete it?'} 
            buttonYes={() => handleSubmitPopper(id)}
            buttonNo={() => handleClosePopper()}
          />
        ) : (
          <AppPopper 
            id={id} 
            message={`Are you sure you want to delete this PO? all the details will be deleted.`} 
            buttonYes={() => handleSubmitPopper(id)}
            buttonNo={() => handleClosePopper()}
          />
        )
      }
      </>
    )
  }

  const handleApprovePO = (id, YorN) => {
    let payload = {}
    if(YorN === "Y"){
      payload = {
        header_id:id,
        approval_flag: YorN,
        approved_by:user.id,
        approved_date: new Date().toISOString(),
      }
    }else{
      payload = {
        header_id:id,
        approval_flag: YorN,
      }
    }
    dispatch(approvePO(payload)).then(()=>{
      dispatch(getPo({}))
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="py-2">
            <strong>PURCHASE ORDERS</strong>
          </CCardHeader>
          <CCardBody>
            <CContainer>
              <CRow className="align-items-end">
                <CCol md={12} xs={{ span: true, order: 5 }}>
                  <CButton size="sm" color="primary" onClick={() => navigate(`/po/add`)}>
                    Create Purchase Order
                  </CButton>
                </CCol>
              </CRow>
            </CContainer>

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
              approval_flag: (item) => {
                return (
                  <td className="py-2">
                    {loadingApprovePO === "loading" ? "loading" : (
                    <CBadge color={getBadge(item.approval_flag)}>{item.approval_flag}</CBadge>
                    )}
                  </td>
                )
              },
              show_details: (item) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="info"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(item.po_header_id)
                      }}
                    >
                      {details.includes(item.po_header_id) ? 'Hide' : 'Show'}
                    </CButton>
                  </td>
                )
              },
              details: (item) => {
                return (
                  <CCollapse visible={details.includes(item.po_header_id)}>
                    <CCardBody>
                      <h5>Approved By: {item.approved_by}</h5>
                      <p className="text-muted">Requested Date: {item.requested_date}</p>
                      <p className="text-muted">Date Created: {item.date_created}</p>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CPopover
                          visible={item.po_header_id === popper}
                          content={renderDeletePopperOver(item.po_header_id)}
                          onShow={() => handleOpenTriggerPopper(item.po_header_id)}
                          placement="top"
                          offset={[-70,8]}
                        >
                          <CButton size="sm" color="light" style={{marginLeft:'5px'}}>
                            Delete
                          </CButton>
                        </CPopover>

                        <CButton size="sm" color="dark" style={{marginLeft:'5px'}} onClick={() => navigate(`/po/${item.po_header_id}`)}>
                          Update
                        </CButton>
                        {item.approval_flag === "Y" ? (
                          <CButton size="sm" color="danger" style={{marginLeft:'5px'}} onClick={() => handleApprovePO(item.po_header_id,'N')}>
                            Disapprove
                          </CButton> 
                        ) : (
                          <CButton size="sm" color="info" style={{marginLeft:'5px'}} onClick={() => handleApprovePO(item.po_header_id,'Y')}>
                            Approve
                          </CButton>      
                        )}         
                      </div>
                    </CCardBody>
                  </CCollapse>
                )
              },
            }}
            selectable
            sorterValue={{ column: 'po_header_id', state: 'desc' }}
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

export default PoTable