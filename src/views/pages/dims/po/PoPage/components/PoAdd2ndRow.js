import React, {memo} from 'react';
import {
    CCol,
    CFormInput,
    CRow,
    CDatePicker,
    CFormLabel,
  } from '@coreui/react-pro'
  
import { fixDateReturn } from '../../../../../../helper/date'

function PoAdd2ndRow(props){
    const {
        po_approval,
        approval_flag,
        approved_date,
        dr_status,

        onPOApproval,
        onApprovalFlag,
        onApprovedDate,
        onDRStatus
    } = props;

    return (
        <CRow xs={{ gutterY: 2 }}>
            <CCol md={3}>
            <CFormInput
                disabled
                label="PO Approval" 
                type="text"
                id="approval_flag"
                defaultValue={po_approval}
                onChange={(e) => onPOApproval(e.target.value)}
            />
            </CCol>
            <CCol md={3}>
            <CFormInput
                disabled
                label="Approval By" 
                type="text"
                id="approval_flag"
                defaultValue={approval_flag}
                onChange={(e) => onApprovalFlag(e.target.value)}
            />
            </CCol>
            <CCol md={3}>
            <CFormLabel htmlFor="approved_date">Approved Date</CFormLabel>
            <CDatePicker 
                id="approved_date"
                locale="en-US"
                disabled
                footer
                date={approved_date}
                onDateChange={(date) => onApprovedDate(fixDateReturn(date))}
                
            />
            </CCol>
            <CCol md={3}>
            <CFormInput
                disabled
                label="DR Status" 
                type="text"
                id="dr_status"
                defaultValue={dr_status}
                onChange={(e) => onDRStatus(e.target.value)}
            />
            </CCol>
        </CRow>
    )
}

export default memo(PoAdd2ndRow);