import React, {memo} from 'react';
import {
    CCol,
    CFormSelect,
    CFormInput,
    CFormTextarea,
    CFormLabel,
    CDatePicker,
    CRow
} from '@coreui/react-pro'

import { fixDateReturn } from '../../../../../../helper/date'

function PoAdd3rdRow(props){
    const {
        companyWarehouse,
        remark,
        warehouse_id,
        fulfillment_expiry_in_day,
        fulfillment_expiry_date,
        visibleFulfillmentExpiryDateProps,

        onRemark,
        onWarehouseId,
        onFulfillmentExpiryInDay,
        onFulfillmentExpiryDate,
        onVisibleFulfillmentExpiryDate
    } = props;

    const companyWarehouseData = companyWarehouse.map((data) => {
        const exportData = {
           'warehouse_id': data.warehouse_id,
           'warehouse_name': data.warehouse_name,
         };
   
         return exportData;
   });
   const addEmptyCompanyWarehouse = {
       'warehouse_id': 0,
       'warehouse_name': 'Select a Company Warehouse',
   }
   companyWarehouseData.sort(() => -1)
   companyWarehouseData.unshift(addEmptyCompanyWarehouse)

    return (
        <CRow xs={{ gutterY: 2 }}>
            <CCol md={3}>
                <CFormTextarea 
                    label="Remark"
                    id="remark"
                    rows="2"
                    text="Remark description"
                    defaultValue={remark}
                    onBlur={(e) => onRemark(e.target.value)}
                />
            </CCol>
            <CCol md={3}>
                <CFormSelect 
                    label="Warehouse Name"
                    id="warehouse_id" 
                    defaultValue={warehouse_id}
                    onChange={(e) => onWarehouseId(e.target.value)}
                    options={
                        companyWarehouseData.length === 0 ?
                        [{ 'label': 'Select a Company Warehouse', 'value': 0 }] :
                        companyWarehouseData.map(companyWarehouseObj => (
                        { 'label': companyWarehouseObj.warehouse_name, 'value': companyWarehouseObj.warehouse_id }
                    ))
                    }
                />
            </CCol>
            <CCol md={3}>
                <CFormInput
                    label="PO expiry in days"
                    type="text"
                    id="fulfillment_expiry_in_day" 
                    defaultValue={fulfillment_expiry_in_day}
                    onChange={(e) => onFulfillmentExpiryInDay(e.target.value)}
                />
            </CCol>
            
            {visibleFulfillmentExpiryDateProps === false ? (
                <CCol md={3} onClick={() => onVisibleFulfillmentExpiryDate(true)}>
                    <CFormLabel htmlFor="fulfillment_expiry_date">Fulfillment Expiry Date</CFormLabel>
                    <div style={{
                        border:'1px solid #b1b7c1',borderRadius:'4px',padding:'5px 2px 5px 5px',
                        height:'37px'
                        }}>{fulfillment_expiry_date}</div>
                </CCol>
            ) :(
                <CCol md={3} >
                    <CFormLabel htmlFor="fulfillment_expiry_date">Fulfillment Expiry Date</CFormLabel>
                    <CDatePicker 
                        id="fulfillment_expiry_date"
                        locale="en-US"
                        footer
                        date={fulfillment_expiry_date}
                        onDateChange={(date) => onFulfillmentExpiryDate(fixDateReturn(date))}
                    />
                </CCol>
            )}
        </CRow>
    )
}

export default memo(PoAdd3rdRow);