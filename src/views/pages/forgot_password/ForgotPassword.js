import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react-pro';

import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

import { RequestForgotPassword, ClearForgotPassword } from '../../../store/reducers/users';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [mes, setMes] = useState('');
  const { status_validate_email, status_forgot_password } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(ClearForgotPassword())
  }, [])

  useEffect(() => {
    if(status_validate_email === 'loading'){
      setMes('Validating...')
    }else if(status_validate_email === 'failed'){
      setMes(
        <label style={{color:'red'}}>The email is not registered</label>
      )
    }else if(status_validate_email === 'idle'){
      setMes('')
    }
  }, [status_validate_email])


  useEffect(() => {
    if(status_forgot_password === 'loading'){
      setMes('Sending...')
    }
    else if(status_forgot_password === 'success'){
      setMes(
        <div style={{background:'#29cd29db',borderRadius:5,padding:5,color:'white'}}>An email message has been sent containing a link to reset the password.</div>
      )
    }
    else if(status_forgot_password === 'failed'){
      setMes(
        <div style={{background:'#ff3b3bcf',borderRadius:5,padding:5,color:'white'}}>Something went wrong, kindly repeat the procedure or contact System Admin.</div>
      )
    }
    else if(status_forgot_password === 'idle'){
      setMes('')
    }
  
  }, [status_forgot_password])

  const handleSubmit = () => {
    if(email === ''){
      setMes(
        <label style={{color:'red'}}>The email is required!</label>
      )
    }else{
      dispatch(RequestForgotPassword({email}))
    }
  }

  const renderFWForm = () => {
      return (
        <CForm    
        noValidate
          className="form-horizontal needs-validation"
        >
          <h1>Forgot Password</h1>
          <p className="text-medium-emphasis">
            {mes}
          </p>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput 
              id="email"
              type="email"
              placeholder="Email"
              defaultValue={email}
              onChange={e => setEmail(e.target.value)}

            />
          </CInputGroup>
         
          <CRow>
            <div className="d-grid gap-2">
              <CButton color="primary" onClick={()=> handleSubmit()}>Submit</CButton>
            </div>
          </CRow>
        </CForm>
      )
  }

  const renderFWPage = () => {
    return (
      <>
      <CCard className="p-4">
        <CCardBody>
        {renderFWForm()}
        </CCardBody>
      </CCard>
      <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
        <CCardBody className="text-center">
          <div>
            <h2>Sign In</h2>
            <Link to="/login">
              <CButton color="primary" className="mt-3" active tabIndex={-1}>
                Login now
              </CButton>
            </Link>
          </div>
        </CCardBody>
      </CCard>
      </>
    )
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
            {renderFWPage()}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgotPassword
