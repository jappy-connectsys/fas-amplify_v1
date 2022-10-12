import React from 'react';
import PropTypes from 'prop-types';
import {
    CRow,
    CCol,
    CButton
  } from '@coreui/react-pro';

const AppPopper = (props) => {
    
    const { id, message, buttonYes, buttonNo } = props
    

    return (
        <CRow>
            <CCol style={{width:'300px'}}>
                <CRow xs={{ gutterY: 2 }}>
                    <CCol md={12}  style={{marginBottom:'10px'}}>
                        <CRow>
                            <CCol md={12} style={{padding:'0 10px 0 10px'}}><h5>Confirm Action</h5></CCol>
                            <CCol md={12} style={{padding:'0 10px 0 10px'}}>{message}</CCol>
                        </CRow>
                    </CCol>
                </CRow>
                <CRow xs={{ gutterY: 2 }}>
                    <CCol md={12}>

                        <div style={{float:'right'}}>
                            <CButton onClick={buttonNo}  size="sm" color="light" style={{marginLeft:'5px'}}>
                                No
                            </CButton>
                            <CButton onClick={buttonYes}  size="sm" color="dark" style={{marginLeft:'5px'}} >
                                Yes
                            </CButton>
                        </div>

                    </CCol>
                </CRow>
            </CCol>
        </CRow>
    )
      
}

AppPopper.propTypes = {
  id: PropTypes.number,
  message: PropTypes.string,
  buttonYes: PropTypes.func,
  buttonNo: PropTypes.func,
}

export default React.memo(AppPopper)