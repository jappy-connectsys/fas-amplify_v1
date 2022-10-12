import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

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

import { ClearResetPassword, ValidateExpirationDateResetPassword, ResetingPassword } from '../../../store/reducers/users';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  
  const [mes, setMes] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const { 
    status_validate_reset_password, 
    status_reset_password, 
    reset_password_error,
    reset_password_user_id 
  } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(ClearResetPassword())
    dispatch(ValidateExpirationDateResetPassword({ token }))
  }, [])

  useEffect(() => {
    if(status_reset_password === 'loading'){
      setMes('Saving...')
    }
    else if(status_reset_password === 'success'){
      setPassword('')
      setConfirm('')
      setMes(
        <div style={{background:'#29cd29db',borderRadius:5,padding:20,color:'white'}}>
          <label style={{fontSize:14,fontWeight:600}}>Your account password has been successfully changed.</label>
          <br /><br />
          <label style={{fontSize:14,fontWeight:600}}>This will redirect to login page in 5 seconds.</label>  
        </div>
      )
    //   setTimeout(() => {
    //     navigate("/login");
    // },5000);
    }
    else if(status_reset_password === 'failed'){
      setMes(
        <div style={{background:'#ff3b3bcf',borderRadius:5,padding:5,color:'white'}}>
          Reset Password Failed
        </div>
      )
    }
    else if(status_reset_password === 'idle'){
      setMes('')
    }
  }, [status_reset_password])


  const handleResetPassword = () => {
    if(password === ''){
      setMes(
        <label style={{color:'red'}}>The password is required!</label>
      )
    }else if(confirm === ''){
      setMes(
        <label style={{color:'red'}}>The confirm password is required!</label>
      )
    }else if(confirm !== password){
      setMes(
        <label style={{color:'red'}}>Password and confirm password should match!</label>
      )
    }else{
      dispatch(ResetingPassword({userId:reset_password_user_id,password}))
    }
  }

  const renderRPForm = () => {
      return (
        <CForm    
        noValidate
          className="form-horizontal needs-validation"
        >
          <h1>Reset Password</h1>
          <p className="text-medium-emphasis">
            {mes}
          </p>
          {status_reset_password === "success" ? '' : 
          (<>
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                disabled={status_reset_password === "success"}
              />
            </CInputGroup>
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                id="password"
                type="password"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                }}
                disabled={status_reset_password === "success"}
              />
            </CInputGroup>
          
            <CRow>
              <div className="d-grid gap-2">
                <CButton disabled={status_reset_password === "success"} color="primary" onClick={() => handleResetPassword()}>Submit</CButton>
              </div>
            </CRow>    
          </>
          )}
        </CForm>
      
      )
  }

  const renderLoadingPage = () =>  (
    <>
      <CCard className="p-4">
        <CCardBody>
            <div><center>Validating Link...</center></div>
        </CCardBody>
      </CCard>
    </>
  ) 

  const renderExpiredLinkPage = () =>  {
    if(reset_password_error === "ERROR_EXPIRED"){
      return (
        <>
          <CCard className="p-4">
            <CCardBody>
                <div style={{fontSize:"15px",fontWeight:600}}><center>Reset Password Link Expired</center></div>
                <div style={{fontSize:"12px"}}><center>Looks like the reset password link has expired. 
                  Not to worry, you can request a forgot password again.</center></div>
                <div style={{marginTop:"10px"}}>
                  <center>
                    <Link to="/forgot-password">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Forgot Password
                      </CButton>
                    </Link>
                  </center>
                </div>
            </CCardBody>
          </CCard>
        </>
      ) 
    }else if(reset_password_error === "ERROR_INVALID_LINK"){
      return (
        <>
          <CCard className="p-4">
            <CCardBody>
                <div style={{fontSize:"15px",fontWeight:600}}><center>Reset Password Link Invalid</center></div>
                <div style={{fontSize:"12px"}}><center>Looks like the reset password link has invalid. 
                  Not to worry, you can request a forgot password again.</center></div>
                <div style={{marginTop:"10px"}}>
                  <center>
                    <Link to="/forgot-password">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Forgot Password
                      </CButton>
                    </Link>
                  </center>
                </div>
            </CCardBody>
          </CCard>
        </>
      ) 
    }

    return;
  }

  const renderRPPage = () => {
    if(status_validate_reset_password === "loading"){
      return renderLoadingPage()
    }else if(status_validate_reset_password === "failed"){
      return renderExpiredLinkPage()
    }

    return (
      <>
      <CCard className="p-4">
        <CCardBody>
        {renderRPForm()}
        </CCardBody>
      </CCard>
      <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
        <CCardBody className="text-center">
          <div>
            <h2>Sign in</h2>
            <Link to="/login">
              <CButton color="primary" className="mt-3" active tabIndex={-1}>
                Login
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
            {renderRPPage()}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ResetPassword
