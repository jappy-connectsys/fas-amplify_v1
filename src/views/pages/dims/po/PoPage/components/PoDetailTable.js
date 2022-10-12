import React, { useState, memo, useEffect } from 'react';
import {
    CCol,
    CRow,
    CSmartTable,
    CHeaderText,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
    CFormInput,
    CFormSelect,
    CFormTextarea
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import {
    cilZoom,
    cilPen,
    cilTrash
  } from '@coreui/icons'


import { useSelector } from 'react-redux';
import { selectProducts, selectProductId } from './../../../../../../store/reducers/productSlice';
import { selectVendors } from '../../../../../../store/reducers/vendorSlice';


function PoDetailTable(props){
    const { 
        po_header_id_prop, po_number, user_id,
        poDetail, vendor_id, onPODetailAdd,
        onPODetailUpdate, onDeletePODetail
     } = props;
    const { data:products }  = useSelector(selectProducts);
    const { data:vendors } = useSelector(selectVendors);

    const [visible, setVisible] = useState(false)
    const [poDetailState, setPODetailState] = useState(null)
    const [poDetailStateTable, setPODetailStateTable] = useState(null)
    const [po_detail_id, setPODetailId] = useState(0)
    const [po_detail_header_id, setPODetailHeaderId] = useState(0)
    const [po_detail_po_number, setPODetailPONumber] = useState(0)
    const [po_detail_vendor_name, setPODetailPOVendorName] = useState('')
    const [po_detail_vendor_id, setPODetailPOVendorId] = useState(0)
    const [po_detail_line_number, setPODetailLineNumber] = useState(0)
    const [po_detail_product_id, setPODetailProductId] = useState(0)
    const [po_detail_product_name, setPODetailProductName] = useState('')
    const [po_detail_qty, setPODetailQty] = useState(0)
    const [po_detail_cost_price, setPODetailCostPrice] = useState(0)
    const [po_detail_discount_pct, setPODetailDiscountPct] = useState(0)
    const [po_detail_final_cost, setPODetailFinalCost] = useState(0)
    const [po_detail_total_amount, setPODetailTotalAmount] = useState(0)
    const [po_detail_remark, setPODetailRemark] = useState('')
    const [po_detail_status, setPODetailStatus] = useState('')
    const [po_detail_date_created, setPODetailDateCreated] = useState(null)
    const [po_detail_created_by, setPODetailCreatedBy] = useState(null)
    const [po_detail_date_updated, setPODetailDateUpdated] = useState(null)
    const [po_detail_updated_by, setPODetailUpdatedBy] = useState(null)

    const [confirmDeleteMES, setConfirmDeleteMES] = useState(false)
    const [errorMES, setErrorMES] = useState('')
    const [modalType, setModalType] = useState('view')

    
    useEffect(()=> {
        const poHeaderCustomTable = poDetail.map((data) => {
            const { product_name } = products?.filter((filtered) =>filtered.product_id === data.product_id)
            .reduce((_, post) => {
                return {...post};
            }, {});
            const exportData = {
                id:data.po_detail_id,
                product_name,
                po_detail_id:data.po_detail_id,
                po_header_id:data.po_header_id,
                po_line_number:data.po_line_number,
                qty:data.qty,
                product_id: data.product_id,
                cost_price:data.cost_price,
                final_cost:data.final_cost,
            };
            return exportData;
       });
       setPODetailStateTable(poHeaderCustomTable)


       const poHeaderCustom = poDetail.map((data) => {
            const { product_name } = products?.filter((filtered) =>filtered.product_id === data.product_id)
            .reduce((_, post) => {
                return {...post};
            }, {});
            const exportData = {
                id:data.po_detail_id,
                product_name,
                po_detail_id:data.po_detail_id,
                po_header_id:data.po_header_id,
                po_line_number:data.po_line_number,
                qty:data.qty,
                product_id: data.product_id,
                cost_price:data.cost_price,
                discount_pct:data.discount_pct,
                total_amount:data.total_amount,
                final_cost:data.final_cost,
                remark:data.remark,
            };
            return exportData;
        });
       setPODetailState(poHeaderCustom)
       
       setPODetailPONumber(po_number)

      const vendor = vendors.find(res=>res.vendor_id === vendor_id);
       setPODetailPOVendorId(vendor_id)
       setPODetailPOVendorName(vendor?.vendor_name)
    },[poDetail, po_number, vendors, vendor_id])

    let po_detail_id_latest = 1;
    const data = poDetailStateTable === null ? [] :
        !Array.isArray(poDetailStateTable) ? [] :
        poDetailStateTable.map(({
            po_detail_id,
            po_header_id,
            po_line_number,
            qty,
            product_name,
            cost_price,
            final_cost
        }, i, row) => {
            if (i + 1 === row.length) {
                po_detail_id_latest = po_detail_id;
            }
            
            return (
                { 
                    id:po_detail_id,
                    po_detail_id,
                    po_header_id,
                    po_line_number,
                    qty,
                    product_name,
                    cost_price,
                    final_cost
                }
            )
        }) 

    const columns = [
        { key: 'po_detail_id', label: 'DETAIL ID', _style: { width: '13%' }, sorter: true, filter: true },
        { key: 'po_header_id', label: 'HEADER ID', _style: { width: '13%' }, sorter: true, filter: true }, // sorter: false
        { key: 'po_line_number', label: 'LINE NUMBER', _style: { width: '16%' }, sorter: true, filter: true },
        { key: 'qty', label: 'QTY',  _style: { width: '9%' }, sorter: true, filter: true },
        { key: 'product_name', label: 'PRODUCT NAME',  _style: { width: '18%' }, sorter: true, filter: true },
        { key: 'cost_price', label: 'UNITY PRICE',  _style: { width: '15%' }, sorter: true, filter: true },
        { key: 'final_cost', label: 'TOTAL',  _style: { width: '9%' }, sorter: true, filter: true },
        { key: 'options', label: 'OPTIONS',  _style: { width: '2%' }, sorter: false, filter: false }
    ]

    const productsCustom = products.map((data) => {
        const exportData = {
           'product_id': data.product_id,
           'product_name': data.product_name,
         };
         return exportData;
   });
   const addEmptyProduct = {
       'product_id': 0,
       'product_name': 'Select a Product',
   }
   productsCustom.unshift(addEmptyProduct)

    const handleProductName = (event) => {
        const el = document.getElementById('po_detail_product_id');
        const text = el.options[el.selectedIndex].innerHTML;
        setPODetailProductId(event.target.value)
        setPODetailProductName(text)
    }

    const renderModal = () => {
        return (
            <CModal
                size="lg"
                className="position-fixed"
                keyboard={false}
                visible={visible}
                >
                <CModalHeader closeButton={false}>
                    <CModalTitle>
                        {
                            modalType === "view" ? 'View PO Details' : 
                            modalType === "edit"  ? 'Edit PO Details' :
                            modalType === "add"  ? 'Add PO Details' :
                            modalType === "delete"  ? 'Delete PO Details' : ''
                        }
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <table cellPadding="3" border="1" style={{width:'100%',border:'1px solid #d8d8d8'}}>
                        <tbody>
                            <tr>
                                {/* 1st Column */}
                                <td style={{ maxWidth:'80px',border:'1px solid #d3d3d3'}} valign="top">
                                    <div style={{fontWeight:600}}>PO Number:</div>
                                        <a title={po_detail_po_number}>
                                            <div style={{marginTop:'5px',overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                                            {po_detail_po_number}
                                            </div>
                                        </a>
                                </td>
                           
                                {/* 2nd Column */}
                                <td style={{maxWidth:'80px',border:'1px solid #d3d3d3'}} valign="top">
                                    <div style={{fontWeight:600}}>Product Name:</div>
                                        {modalType === "view" || modalType === "delete" ? (
                                            <div>
                                                <a title={po_detail_product_name}>
                                                    <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                                                        {po_detail_product_name}
                                                    </div>
                                                </a>
                                            </div> ) : 
                                            modalType === "add" ||  modalType === "edit" ?
                                            <div>
                                                <CFormSelect
                                                    id="po_detail_product_id"
                                                    defaultValue={po_detail_product_id}
                                                    onChange={(e) => handleProductName(e)}
                                                    options={
                                                        productsCustom.length === 0 ?
                                                        [{ 'label': 'Select a product', 'value': 0 }] :
                                                        productsCustom.map(product => (
                                                        { 'label': product.product_name, 'value': product.product_id }
                                                    ))
                                                    }
                                                    required
                                                />
                                            </div> :  (
                                            <div>
                                                <a title={po_detail_product_name}>
                                                    <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                                                        {po_detail_product_name}
                                                    </div>
                                                </a>
                                            </div>
                                            )
                                        }
                                </td>
                                {/* 3rd Column */}
                                <td style={{maxWidth:'80px',border:'1px solid #d3d3d3' }} valign="top">
                                    <div style={{fontWeight:600}}>Vendor Name:</div>
                                    <div style={{marginTop:'5px',overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                                        <a title={po_detail_vendor_name}>
                                            <div style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                                                {po_detail_vendor_name}
                                            </div>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                    
                            <tr>
                                {/* 1st Column */}
                                <td style={{maxWidth:'80px',border:'1px solid #d3d3d3'}} valign="top">
                                    <div style={{fontWeight:600}}>PO Detail ID:</div>
                                    <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                                        <a title={po_detail_id}>
                                            <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                                                {po_detail_id}
                                            </div>
                                        </a>
                                    </div>
                                </td>
                                {/* 2nd Column */}
                                <td style={{ maxWidth:'80px',border:'1px solid #d3d3d3' }} valign="top">
                                    <div style={{fontWeight:600}}>Cost Price:</div>
                                    <div style={{
                                        overflow:'hidden', textOverflow:'ellipsis',
                                        whiteSpace:'nowrap'}}
                                    >
                                        <a title={po_detail_cost_price}>
                                            <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}> 
                                                {po_detail_cost_price}
                                            </div>
                                        </a>
                                    </div>
                                </td>
                                {/* 3rd Column */}
                                <td style={{ maxWidth:'80px',border:'1px solid #d3d3d3', }} valign="top" rowSpan={4}>
                                    <div style={{fontWeight:600}}>Remarks:</div>
                                        {modalType === "view" || modalType === "delete" ? (
                                            <div style={{overflowWrap: 'break-word',wordWrap:'break-word',hyphens: 'auto',
                                                        whitespace: 'normal!important', overflow: 'auto', maxHeight:'200px', padding:'5px 5px', }}>
                                                {po_detail_remark}
                                            </div> ) :
                                            <div>
                                                <CFormTextarea 
                                                    id="po_detail_remark"
                                                    rows="2"
                                                    defaultValue={po_detail_remark}
                                                    onChange={(e) => setPODetailRemark(e.target.value)}
                                                    style={{ resize:'none', maxHeight:'200px', minHeight:'200px'}}
                                                />
                                            </div>
                                        }
                                  
                                </td>
                            </tr>

                            <tr>
                                {/* 1st Column */}
                                <td style={{ maxWidth:'80px',border:'1px solid #d3d3d3' }} valign="top">
                                    <div style={{fontWeight:600}}>PO Header ID:</div>
                                    <div style={{overflow:'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                                        <a title={po_detail_header_id}>
                                            <div style={{overflow:'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                                               {po_detail_header_id}
                                            </div>
                                        </a>
                                    </div>
                                </td>
                                {/* 2nd Column */}
                                <td style={{maxWidth:'80px',border:'1px solid #d3d3d3'}} valign="top">
                                    <div style={{fontWeight:600}}>Discount Pct:</div>
                                    <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                                        <a title={po_detail_discount_pct}>
                                            <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                                                {po_detail_discount_pct}
                                            </div>
                                        </a>
                                    </div>
                                </td>
                                {/* 3rd Column */}
                            </tr>

                            <tr>
                                {/* 1st Column */}
                                <td style={{maxWidth:'80px',border:'1px solid #d3d3d3' }} valign="top">
                                    <div style={{fontWeight:600}}>PO Line Number:</div>
                                    <div style={{overflow:'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                                        <a title={po_detail_line_number}>
                                            <div style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                                             {po_detail_line_number}
                                            </div>
                                        </a>
                                    </div>
                                </td>
                                {/* 2nd Column */}
                                <td style={{maxWidth:'80px',border:'1px solid #d3d3d3' }} valign="top">
                                    <div style={{fontWeight:600}}>Final Cost:</div>
                                    <div style={{overflow:'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                                        <a title={po_detail_final_cost}>
                                            <div style={{overflow:'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                                                {po_detail_final_cost}
                                            </div>
                                        </a>
                                    </div>
                                </td>
                                {/* 3rd Column */}
                            </tr>

                            <tr>
                                {/* 1st Column */}
                                <td style={{maxWidth:'80px',border:'1px solid #d3d3d3' }} valign="top">
                                    <div style={{fontWeight:600}}>Quantity:</div>
                                    <div style={{overflow:'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                                        {modalType === "view" || modalType === "delete" ? (
                                            <a title={po_detail_qty}>
                                                <div style={{overflow:'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                                                    {po_detail_qty}
                                                </div>
                                            </a> ) :
                                            <div>
                                                 <CFormInput
                                                    maxLength={5}
                                                    max={10000}
                                                    min={0}
                                                    type="number"
                                                    id="po_detail_qty"
                                                    defaultValue={po_detail_qty}
                                                    onChange={(e) => setPODetailQty(e.target.value)}
                                                 />
                                            </div>
                                        }
                                    </div>
                                </td>
                                {/* 2nd Column */}
                                <td style={{maxWidth:'80px',border:'1px solid #d3d3d3' }} valign="top">
                                    <div style={{fontWeight:600}}>Total Cost:</div>
                                    <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                                        <a title={po_detail_total_amount}>
                                            <div style={{overflow:'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                                              {po_detail_total_amount}
                                            </div>
                                        </a>
                                    </div>
                                </td>
                                {/* 3rd Column */}
                            </tr>
                        </tbody>
                    </table>
                </CModalBody>
                <CModalFooter>
                    <div className="position-absolute bottom-90 start-0" style={{paddingLeft:'10px'}}>
                       {confirmDeleteMES ? errorMES : ''}
                    </div>
                    <div>
                        {modalType === "view" ? ( 
                            <>
                                <CButton  style={{marginRight:'5px'}} color="info" onClick={() => handleEditPODetail()}>Edit</CButton> 
                                <CButton color="danger" onClick={() => handleDeletePODetail()}>Delete</CButton>
                            </>
                        ) :  modalType === "add" ? (
                            <CButton  style={{marginRight:'5px'}} color="success"
                             onClick={() => handleAddPODetail()}>Save</CButton> 
                        ) : modalType === "edit" ? (
                            <>
                                <CButton style={{marginRight:'5px'}} color="primary" onClick={() => handleViewPODetail(po_detail_id)}>Cancel Edit</CButton>
                                <CButton style={{marginRight:'5px'}} color="success" onClick={() => handleSavePODetail()}>Save</CButton>
                            </>
                        ) : modalType === "delete" ? (
                            <>
                                <CButton style={{marginRight:'5px'}} color="primary" onClick={() => handleCancelDeletePODetail()}>No</CButton>
                                <CButton style={{marginRight:'2px'}} color="danger" onClick={() => handleConfirmDeletePODetail(po_detail_id)}>Yes</CButton>
                            </>
                        ) : <CButton color="danger" onClick={() => handleDeletePODetail()}>Delete</CButton>
                        }
                         <CButton style={{marginLeft:'5px'}} color="secondary" onClick={() => setVisible(false)}>Close</CButton>
                    </div>
                </CModalFooter>
            </CModal>
        )
    } 

    const handleAddPODetail = () => {
        setErrorMES('')
        if(po_number === ''){
            setErrorMES(<div style={{color:'red'}}><b>PO Number</b> is required, select on PO Header.</div>)
            setConfirmDeleteMES(true)
        }else if (po_detail_vendor_id === 0){
            setErrorMES(<div style={{color:'red'}}><b>Vendor Name</b> is required, select on PO Header.</div>)
            setConfirmDeleteMES(true)
        }else if (po_detail_product_id === 0){
            setErrorMES(<div style={{color:'red'}}><b>Product Name</b> is required.</div>)
            setConfirmDeleteMES(true)
        }else if (po_detail_qty === 0){
            setErrorMES(<div style={{color:'red'}}><b>Quantity</b> is required.</div>)
            setConfirmDeleteMES(true)
        }else {
            setConfirmDeleteMES(false)
            const payload = {
                po_detail_id:po_detail_id,
                po_header_id:po_detail_header_id,
                po_line_number:po_detail_line_number,
                product_id: po_detail_product_id,
                product_name:po_detail_product_name,
                qty:po_detail_qty,
                cost_price:po_detail_cost_price,
                discount_pct:po_detail_discount_pct,
                final_cost:po_detail_final_cost,
                total_amount:po_detail_total_amount,
                remark:po_detail_remark,
                status:po_detail_status,
                date_created:po_detail_date_created,
                created_by:po_detail_created_by,
                date_updated:po_detail_date_updated,
                updated_by:po_detail_updated_by,
            }
            const poHeaderCustom = poDetailState.map((data) => {
                const exportData = {
                    id:po_detail_id,
                    po_detail_id:data.po_detail_id,
                    po_header_id:data.po_header_id,
                    po_line_number:data.po_line_number,
                    product_name:data.product_name,
                    product_id: data.product_id,
                    qty:data.qty,
                    cost_price:data.cost_price,
                    discount_pct:data.discount_pct,
                    final_cost:data.final_cost,
                    total_amount:data.total_amount,
                    remark:data.remark,
                 };
                 return exportData;
           });
          
           poHeaderCustom.unshift(payload)
           setPODetailStateTable(poHeaderCustom)
           setPODetailState(poHeaderCustom);
           onPODetailAdd(payload)
  

            setErrorMES(<div style={{color:'green'}}><b>PO Detail</b> has been added.</div>)
            setConfirmDeleteMES(true)

           setTimeout(()=>{
                setErrorMES('')
                setConfirmDeleteMES(false)
                setModalType('add')
                setVisible(false)
           },1000)
          
        }
    }

    const handleOpenAddPODetail = () => {
       const new_po_detail_id = po_detail_id_latest + 1;
        setPODetailId(new_po_detail_id)
        setPODetailHeaderId(po_header_id_prop)
        setPODetailLineNumber(0)
        setPODetailProductId(0)
        setPODetailProductName('')
        setPODetailQty(0)
        setPODetailCostPrice(0)
        setPODetailDiscountPct(0)
        setPODetailFinalCost(0)
        setPODetailTotalAmount(0)
        setPODetailRemark('')
        setPODetailStatus('idle')
        setPODetailDateCreated(new Date().toISOString())
        setPODetailCreatedBy(user_id)
        setPODetailDateUpdated(null)
        setPODetailUpdatedBy(null)
        
        setModalType('add')
        setConfirmDeleteMES(false)
        setVisible(true)
    }

    const handleDeletePODetail = () => {
        setModalType('delete')
        setErrorMES(<div style={{color:'red'}}>Are you sure do you want to delete this record?</div>)
        setConfirmDeleteMES(true)
    }

    const handleCancelDeletePODetail = () => {
        setModalType('view')
        setConfirmDeleteMES(false)
    }

    const handleConfirmDeletePODetail = (id) => {
        onDeletePODetail(id)
        setModalType('view')
        setConfirmDeleteMES(false)

        const datafiltered = poDetailState.filter(res=>res.po_detail_id !== id).map(res=>res)
        setPODetailStateTable(datafiltered)
        setPODetailState(datafiltered)

        setTimeout (()=>{
          setVisible(false)
        },1000)
    }
    
    const loadDetails = (id) => {
        const poDetails = poDetailState.find(po=>po.po_detail_id === id)
        setPODetailId(id)
        setPODetailHeaderId(poDetails.po_header_id)
        setPODetailLineNumber(poDetails.po_line_number)
        setPODetailProductId(poDetails.product_id)
        setPODetailProductName(poDetails.product_name)
        setPODetailQty(poDetails.qty)
        setPODetailCostPrice(poDetails.cost_price)
        setPODetailDiscountPct(poDetails.discount_pct)
        setPODetailFinalCost(poDetails.final_cost)
        setPODetailTotalAmount(poDetails.total_amount)
        setPODetailRemark(poDetails.remark)
        setPODetailStatus('active')
        setPODetailDateCreated(poDetails.date_created)
        setPODetailCreatedBy(poDetails.created_by)
        setPODetailDateUpdated(new Date().toISOString())
        setPODetailUpdatedBy(user_id)
    }

    const handleOpenPODetailModal = (id) => {
        loadDetails(id)

        setModalType('view')
        setConfirmDeleteMES(false)
        setVisible(true)

    }

    const handleOpenEditPODetail = (id) => {
        setModalType('edit')

        loadDetails(id)
        setConfirmDeleteMES(false)
        setVisible(true)
    }

    const handleOpenDeletePODetail = (id) => {
        setModalType('delete')
        setErrorMES(<div style={{color:'red'}}>Are you sure do you want to delete this record?</div>)
        setConfirmDeleteMES(true)
        setVisible(true);
    }

    const handleEditPODetail = () => {
        setModalType('edit')
        setConfirmDeleteMES(false)
    }

    const handleViewPODetail = (id) => {
        // const poDetails = poDetailState.find(po=>po.po_detail_id === id)
        // const { product_name, product_id } = products?.filter((filtered) =>filtered.product_id === poDetails.product_id)
        // .reduce((_, post) => {
        //     return {...post};
        // }, {});

        // setPODetailId(id)
        // setPODetailHeaderId(poDetails.po_header_id)
        // setPODetailLineNumber(poDetails.po_line_number)
        // setPODetailProductId(product_id ? product_id : po_detail_product_id)
        // setPODetailProductName(product_name ? product_name : po_detail_product_name)
        // setPODetailQty(poDetails.qty)
        // setPODetailCostPrice(poDetails.cost_price)
        // setPODetailDiscountPct(poDetails.discount_pct)
        // setPODetailFinalCost(poDetails.final_cost)
        // setPODetailTotalAmount(poDetails.total_amount)
        // setPODetailRemark(poDetails.remark)
        // setPODetailStatus('active')
        // setPODetailDateCreated(poDetails.date_created)
        // setPODetailCreatedBy(poDetails.created_by)
        // setPODetailDateUpdated(new Date().toISOString())
        // setPODetailUpdatedBy(user_id)

        setModalType('view')
        setConfirmDeleteMES(false)
    }

    const handleSavePODetail = () => {
        const payload = {
            id:po_detail_id,
            po_detail_id,
            po_header_id:po_detail_header_id,
            po_line_number:po_detail_line_number,
            product_id: po_detail_product_id,
            product_name: po_detail_product_name,
            qty:po_detail_qty,
            cost_price:po_detail_cost_price,
            discount_pct:po_detail_discount_pct,
            final_cost:po_detail_final_cost,
            total_amount:po_detail_total_amount,
            remark:po_detail_remark,
            status:po_detail_status,
            date_created:po_detail_date_created,
            created_by:po_detail_created_by,
            date_updated:po_detail_date_updated,
            updated_by:po_detail_updated_by,
        }
        onPODetailUpdate(payload)

        const updatedDataTable = {
            id:po_detail_id,
            product_name:po_detail_product_name,
            po_detail_id:po_detail_id,
            po_header_id:po_detail_header_id,
            po_line_number:po_detail_line_number,
            qty:po_detail_qty,
            product_id: po_detail_product_id,
            cost_price:po_detail_cost_price,
            final_cost:po_detail_final_cost,
        }
        const filteredDataTable = poDetailStateTable.filter(data=>data.po_detail_id !== po_detail_id).map((data) =>{
            const exportData = {
                id:data.po_detail_id,
                product_name:data.product_name,
                po_detail_id:data.po_detail_id,
                po_header_id:data.po_header_id,
                po_line_number:data.po_line_number,
                qty:data.qty,
                product_id: data.product_id,
                cost_price:data.cost_price,
                final_cost:data.final_cost,
            };
            return exportData;
        })
        filteredDataTable.push(updatedDataTable)
        setPODetailStateTable(filteredDataTable)

        const updatedData = {
            id:po_detail_id,
            product_name:po_detail_product_name,
            po_detail_id:po_detail_id,
            po_header_id:po_detail_header_id,
            po_line_number:po_detail_line_number,
            qty:po_detail_qty,
            product_id: po_detail_product_id,
            cost_price:po_detail_cost_price,
            final_cost:po_detail_final_cost,
            remark:po_detail_remark,
        }
        const filteredData = poDetailStateTable.filter(data=>data.po_detail_id !== po_detail_id).map((data) =>{
            const exportData = {
                id:data.po_detail_id,
                product_name:data.product_name,
                po_detail_id:data.po_detail_id,
                po_header_id:data.po_header_id,
                po_line_number:data.po_line_number,
                qty:data.qty,
                product_id: data.product_id,
                cost_price:data.cost_price,
                final_cost:data.final_cost,
                remark:data.remark,
            };
            return exportData;
        })
        filteredData.push(updatedData)
        setPODetailState(filteredData)

     
        setModalType('view')
    }

    return (
        <>
            <CRow xs={{ gutterY: 2 }}>
                <CCol md={12} className="bg-light p-3">
                <CHeaderText className="header-brand mb-0 h3">PO Details</CHeaderText>
                </CCol>
                <CCol md={12} className="p-1">
                    <CButton style={{marginRight:'5px',float:'right',marginTop:'-60px'}} color="success" onClick={() => handleOpenAddPODetail()}>New PO Detail</CButton>
                </CCol>
                <CCol md={12}>
                    <CSmartTable
                        activePage={1}
                        cleaner
                        clickableRows={false}
                        columns={columns}
                        columnFilter
                        columnSorter
                        footer
                        items={data}
                        itemsPerPageSelect
                        itemsPerPage={5}
                        pagination
                        scopedColumns={{
                            options: (item) => {
                                return (
                                    <td className="py-2">
                                    <div>
                                        <div 
                                            style={{
                                                float:'left',marginRight:'1px',
                                                border:'1px solid #d3d3d3',padding:'0 3px',
                                                borderRadius:'5px',background:'white',boxShadow:'1px 1px 2px #d3d3d3',
                                                cursor: 'pointer'
                                            }}
                                            onClick={()=>handleOpenPODetailModal(item.po_detail_id)}
                                        >
                                            <CIcon icon={cilZoom} size="sm" />
                                        </div>
                                        <div style={{
                                            float:'left',marginRight:'1px',border:'1px solid #d3d3d3',padding:'0 3px',
                                            borderRadius:'5px',background:'white',boxShadow:'1px 1px 2px #d3d3d3',
                                            cursor: 'pointer'
                                            }}
                                            onClick={()=>handleOpenEditPODetail(item.po_detail_id)}
                                        >
                                            <CIcon icon={cilPen} size="sm" />
                                        </div>
                                        <div style={{
                                            float:'left',border:'1px solid #d3d3d3',padding:'0 3px',
                                            borderRadius:'5px',background:'white',boxShadow:'1px 1px 2px #d3d3d3',
                                            cursor: 'pointer'
                                            }}
                                            onClick={()=>handleOpenDeletePODetail(item.po_detail_id)}
                                        >
                                            <CIcon icon={cilTrash} size="sm" />
                                        </div>
                                    </div>
                                    </td>
                                )
                            },
                        }}
                        selectable={false}
                        sorterValue={{ column: 'po_detail_id', state: 'desc' }}
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
                </CCol>
                {renderModal()}
            </CRow>
        </>
    )
}

export default memo(PoDetailTable);