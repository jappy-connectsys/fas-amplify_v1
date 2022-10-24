import React, { useEffect, useState } from 'react'
import {
  CHeaderText,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CButton,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom';
import { selectUser } from '../../../../../store/reducers/users';
import { selectVendors } from '../../../../../store/reducers/vendorSlice';
import { selectPos, selectPoId, clearPo, getPo, createPo, updatePo, getPOUsersApprover } from '../../../../../store/reducers/poSlice';
import { selectPoDetail, getPoDetail, createPoDetail, updatePoDetail, deletePoDetail } from '../../../../../store/reducers/poDetailSlice';
import { GetCompanyWarehouse, selectCompanyWarehouse } from '../../../../../store/reducers/companyWarehouseSlice';
import PoAdd1stRow from './components/PoAdd1stRow'
import PoAdd2ndRow from './components/PoAdd2ndRow'
import PoAdd3rdRow from './components/PoAdd3rdRow'
import PoDetailTable from './components/PoDetailTable'

function PoAdd(){
  const { id } = useParams();
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearPo())
    dispatch(getPoDetail({po_header_id:id}))
    dispatch(GetCompanyWarehouse())
 },[id])

  const { user } = useSelector(selectUser);
  const { data:vendors } = useSelector(selectVendors);
  const { data:poDetail } = useSelector(selectPoDetail);
  const { data:poNum, status, error } = useSelector(selectPos);
  const { companyWarehouseData } = useSelector(selectCompanyWarehouse);

  const poHeader = useSelector((state) => selectPoId(state, Number(id)));

  const [po_header_id, setPOHeaderId] = useState(id);
  const [po_number, setPONumber] = useState(poHeader?.po_number);
  const [po_date, setPODate] = useState(poHeader?.po_date || new Date().toISOString());
  const [vendor_id, setVendorId] = useState(poHeader?.vendor_id);
  const [requested_date, setRequestDate] = useState(poHeader?.requested_date || new Date().toISOString());

  const [po_approval, setPOApproval] = useState('N');
  const [approval_flag, setApprovalFlag] = useState(null);
  const [approved_date, setApprovedDate] = useState(poHeader?.approved_date || new Date().toISOString());
  const [dr_status, setDRStatus] = useState(null);

  const [remark, setRemark] = useState(poHeader?.remark);
  const [warehouse_id, setWarehouseId] = useState(poHeader?.warehouse_id);

  const [fulfillment_expiry_in_day, setFulfillmentExpiryInDay] = useState(null);
  const [fulfillment_expiry_date, setFulfillmentExpiryDate] = useState(null);
  const [visibleFulfillmentExpiryDate, setVisibleFulfillmentExpiryDate] = useState(false);
  
  
  const [isValid, setIsValid] = useState(false);
  const [validMes, setValidMes] = useState('');

  useEffect(() => {
    if(!id){
        poNum.slice(-1)
        .sort((a, b) => b.po_header_id - a.po_header_id)
        .map((item) => {
          const d = new Date();
          let year = d.getFullYear();
          let po_number = item.po_header_id + 1;
          let zerofilled = ('0000000'+po_number).slice(-7);
          let po_num = `${year}-${zerofilled}`
          setPONumber(po_num)
        });
    }
  },[poNum, id])

  useEffect(() => {
    if(id && vendor_id){
      const vendorData = vendors?.find(res=>res.vendor_id == vendor_id)
      const po_expiry_in_days = vendorData.po_expiry_in_days
      if(!isNaN(parseFloat(po_expiry_in_days))){
      setFulfillmentExpiryInDay(po_expiry_in_days)

      const d = new Date(po_date);
      d.setDate(d.getDate() + parseInt(po_expiry_in_days));
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      setFulfillmentExpiryDate(new Date(d).toLocaleDateString("en-US", options))
     }
    }

  },[id, vendor_id])


  // const handleChangeVendorId = (vendor_id) => {
  //   setVendorId(vendor_id)
  //   const vendorData = vendors?.find(res=>res.vendor_id == vendor_id)
  //   const po_expiry_in_days = parseInt(vendorData.po_expiry_in_days)
  //   if(!isNaN(po_expiry_in_days)){
  //     setFulfillmentExpiryInDay(po_expiry_in_days)
  //     const d = new Date(po_date);
  //     d.setDate(d.getDate() + po_expiry_in_days);
  //     setFulfillmentExpiryDate(new Date(d).toISOString())
  //   }
  // }

  const handleChangeVendorId = (vendor_id) => {
    setVendorId(vendor_id)
    setVisibleFulfillmentExpiryDate(false)
    const vendorData = vendors?.find(res=>res.vendor_id == vendor_id)
    const po_expiry_in_days = vendorData.po_expiry_in_days
    if(!isNaN(parseFloat(po_expiry_in_days))){
      setFulfillmentExpiryInDay(po_expiry_in_days)

      const d = new Date(po_date);
      d.setDate(d.getDate() + parseInt(po_expiry_in_days));
      
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      setFulfillmentExpiryDate(new Date(d).toLocaleString("en-US",options))
    }else{
      setFulfillmentExpiryInDay(0)
      setFulfillmentExpiryDate(null)
    }
    
  }
 
  const handlePODetailAdd = (payload) => {
    dispatch(createPoDetail(payload)).then((res)=>{
      if(res.type === "podetail/createPoDetail/fulfilled"){
        dispatch(getPoDetail())
      }
    })
  }

  const handlePODetailUpdate = (payload) => {
    dispatch(updatePoDetail(payload))
  }

  const handleDeletePODetail = (id) => {
    dispatch(deletePoDetail({id})).then((res)=>{
      if(res.type === "podetail/deletePoDetail/fulfilled"){
        dispatch(getPoDetail())
      }
    })
  }
  

  const handleAddPOHeader = () => {
    if(po_number === ''){
      setIsValid(false)
      setValidMes(
        <CCol md={12} style={{height:'50px',padding:'12px 0 0 10px',margin:'10px 0 10px 0', backgroundColor:'#f9000059'}}>
          <b style={{color:'black'}}>PO Number is required</b>
        </CCol>
      )
    }else if(vendor_id === 0){
      setIsValid(false)
      setValidMes(
        <CCol md={12} style={{height:'50px',padding:'12px 0 0 10px',margin:'10px 0 10px 0', backgroundColor:'#f9000059'}}>
          <b style={{color:'black'}}>Vendor ID is required</b>
        </CCol>
      )
    }else{
      const payload = {
          po_number,
          po_date,
          vendor_id,
          requested_date,
          approval_flag:po_approval,
          approval_by:approval_flag,
          approved_date,
          dr_status,
          warehouse_id,
          remark,
          subtotal_amount:null,
          tax_amount:null,
          grand_total_amount:null,
          fulfillment_expiry_date,
          status:'active',
          created_by:user?.id,
          date_created:new Date().toISOString(),
          date_updated:null,
          updated_by:null,
      }

      setIsValid(true)
      setValidMes('')
  
      dispatch(createPo(payload)).then((res)=>{
        const po_number = res.payload.po_number
        const po_id = res.payload.id
        const payload = {
          user_id: user.id,
          po_id,
          po_number
        }
        dispatch(getPOUsersApprover(payload))
        // if(res.type === "po/createPo/fulfilled"){
        // navigate(`/po`)
        // }
      })
    }
  }

  const handleSavePOHeader = () => {
    if(po_number === ''){
      setIsValid(false)
      setValidMes(
        <CCol md={12} style={{height:'50px',padding:'12px 0 0 10px',margin:'10px 0 10px 0', backgroundColor:'#f9000059'}}>
          <b style={{color:'black'}}>PO Number is required</b>
        </CCol>
      )
    }else if(vendor_id === 'Select a Vendor'){
      setIsValid(false)
      setValidMes(
        <CCol md={12} style={{height:'50px',padding:'12px 0 0 10px',margin:'10px 0 10px 0', backgroundColor:'#f9000059'}}>
          <b style={{color:'black'}}>Vendor ID is required</b>
        </CCol>
      )
    }else{
        const payload = {
            po_header_id:id,
            po_number,
            po_date,
            vendor_id,
            requested_date,
            approval_flag:po_approval,
            approval_by:approval_flag,
            approved_date,
            dr_status,
            warehouse_id,
            remark,
            subtotal_amount:null,
            tax_amount:null,
            grand_total_amount:null,
            fulfillment_expiry_date,
            status:'active',
            created_by:user?.id,
            date_created:new Date().toISOString(),
            date_updated:null,
            updated_by:null,
        }
        
        setIsValid(true)
        setValidMes('')

        dispatch(updatePo(payload)).then((res)=>{
            setTimeout(()=>{
              dispatch(clearPo())
              dispatch(getPo({po_header_id:id}))
              dispatch(getPoDetail({po_header_id:id}))
            },2000)
        })
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
          <CHeaderText className="header-brand mb-0 h1">
            {id ? 'EDIT PURCHASE ORDER' : 'ADD PURCHASE ORDER'}</CHeaderText>
          </CCardHeader>
          <CCardBody>
         
    
            <CForm className="row g-3 needs-validation"
              noValidate
            >
              <PoAdd1stRow 
                vendors={vendors}
                po_header_id={po_header_id}
                po_number={po_number} po_date={po_date} 
                vendor_id={vendor_id} requested_date={requested_date}
                onPONumber={setPONumber} onPODate={setPODate} 
                onVendorId={handleChangeVendorId}
                onRequestDate={setRequestDate}
              />

              <PoAdd2ndRow
                po_approval={po_approval}
                approval_flag={approval_flag}
                approved_date={approved_date}
                dr_status={dr_status}

                onPOApproval={setPOApproval}
                onApprovalFlag={setApprovalFlag}
                onApprovedDate={setApprovedDate}
                onDRStatus={setDRStatus}
              />

              <PoAdd3rdRow 
                companyWarehouse={companyWarehouseData}
                remark={remark}
                warehouse_id={warehouse_id}
                fulfillment_expiry_in_day={fulfillment_expiry_in_day}
                fulfillment_expiry_date={fulfillment_expiry_date}
                visibleFulfillmentExpiryDateProps={visibleFulfillmentExpiryDate}
           
                onRemark={setRemark}
                onWarehouseId={setWarehouseId}
                onFulfillmentExpiryInDay={setFulfillmentExpiryInDay}
                onFulfillmentExpiryDate={setFulfillmentExpiryDate}
                onVisibleFulfillmentExpiryDate={setVisibleFulfillmentExpiryDate}
              />
               <CRow xs={{ gutterY: 1 }}>{!isValid ? validMes : ''}</CRow> 
               <CRow xs={{ gutterY: 1 }}>
                {
                  status === "idle" ? '' :
                  status === "loading" ? (
                    <CCol md={12} style={{height:'50px',padding:'15px 0 0 10px',margin:'10px 0 10px 0', backgroundColor:'#d3d3d3'}}>
                      <b style={{color:'black'}}>Saving...</b>
                    </CCol>) :
                  status === "success" ? (
                    <CCol md={12} style={{height:'50px',padding:'15px 0 0 10px',margin:'10px 0 10px 0', backgroundColor:'#00800012'}}>
                      <b style={{color:'green'}}>PO NUMBER # {po_number} has been updated</b>
                    </CCol>) : ''
                }
              </CRow> 
              <CRow xs={{ gutterY: 2 }}>
                <CCol md={12} className="p-1">
                    {id ? (
                      <CButton style={{marginRight:'5px',float:'right'}}
                      color="primary" onClick={() => handleSavePOHeader()}>Save PO Header</CButton>
                    ): (
                      <CButton style={{marginRight:'5px',float:'right'}}
                      color="primary" onClick={() => handleAddPOHeader()}>Add PO Header</CButton>
                    )}
                
                </CCol>
              </CRow> 
              {id && (
              <PoDetailTable 
                po_header_id_prop={id}
                po_number={po_number}
                user_id={user?.id}
                poDetail={poDetail}
                vendor_id={vendor_id}
                onPODetailAdd={handlePODetailAdd}
                onPODetailUpdate={handlePODetailUpdate}
                onDeletePODetail={handleDeletePODetail}
              />
              )}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
  </CRow>
  )
}

export default PoAdd