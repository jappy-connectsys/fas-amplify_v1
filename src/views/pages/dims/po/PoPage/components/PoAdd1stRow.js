import React, {memo} from 'react';
import {
    CHeaderText,
    CCol,
    CFormInput,
    CFormSelect,
    CRow,
    CDatePicker,
    CFormLabel,
} from '@coreui/react-pro'
import { fixDateReturn } from '../../../../../../helper/date'

function PoAdd1stRow(props){
    const {
        vendors=[],
        po_header_id,
        po_number,
        po_date,
        vendor_id,
        requested_date,

        onPONumber,
        onPODate,
        onVendorId,
        onRequestDate
    } = props;

    const handleVendor = (event) => {
        // const el = document.getElementById('vendor_id');
        // const text = el.options[el.selectedIndex].innerHTML;
        onVendorId(event.target.value)
    }

    const vendorCustom = vendors.map((data) => {
         const exportData = {
            'vendor_id': data.vendor_id,
            'vendor_name': data.vendor_name,
          };
    
          return exportData;
    });
    const addEmptyVendor = {
        'vendor_id': 0,
        'vendor_name': 'Select a Vendor',
    }
    vendorCustom.unshift(addEmptyVendor)

    return (
        <CRow xs={{ gutterY: 3 }}>
            <CCol md={12} className="bg-light p-1">
            <CHeaderText className="header-brand mb-0 h3">PO Header</CHeaderText>
            </CCol>
            <CCol md={2}>
            <CFormInput
                label="PO Header ID" 
                type="number"
                id="po_header_id"
                defaultValue={po_header_id}
                disabled
            />
            </CCol>
            <CCol md={2}>
            <CFormInput
                label="PO Number" 
                type="text"
                id="po_number"
                defaultValue={po_number}
                onBlur={(e) => onPONumber(e.target.value)}
            />
            </CCol>
            <CCol md={3}>
            <CFormLabel htmlFor="po_date">PO Date</CFormLabel>
            <CDatePicker 
                id="po_date"
                locale="en-US" 
                footer
                date={po_date}
                onDateChange={(date) => onPODate(fixDateReturn(date))}
            />
            </CCol>
            <CCol md={3}>
            <CFormSelect
                label="Vendor Name"
                id="vendor_id"
                value={vendor_id}
                onChange={(e) => handleVendor(e)}
                options={
                    vendorCustom.length === 0 ?
                    [{ 'label': 'Select a Vendor', 'value': 0 }] :
                    vendorCustom.map(vendor => (
                    { 'label': vendor.vendor_name, 'value': vendor.vendor_id }
                   ))
                }
            />
            </CCol>
            <CCol md={2}>
            <CFormLabel htmlFor="requested_date">Requested Date</CFormLabel>
            <CDatePicker 
                id="requested_date"
                locale="en-US" 
                footer
                date={requested_date}
                onDateChange={(date) => onRequestDate(fixDateReturn(date))}
            />
            </CCol>
        </CRow>
    )
}

export default memo(PoAdd1stRow);