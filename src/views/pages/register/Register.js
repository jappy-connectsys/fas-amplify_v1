import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { 
  SignUp, 
  ClearSignUp 
} from '../../../store/reducers/users';
import { Link } from "react-router-dom";

import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react-pro'
import { COMPANY_ROLE } from '../../../config'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'


const Register = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ClearSignUp()).then(()=>{
      setMsg(null);
      setErrorFname(false)
      setErrorLname(false)
      setErrorEmail(false)
      setErrorPassword(false)
      setErrorConfirmPassword(false)
    })
  }, [dispatch])

  const { 
    signing_up, 
    errors_sign_up, 
    success_sign_up
  } = useSelector((state) => state.user);

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const [errorFname, setErrorFname] = useState(false);
  const [errorLname, setErrorLname] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  
  
  useEffect(()=>{
    if(typeof errors_sign_up === "object"){
      setErrorFname(true)
      setErrorLname(true)
      setErrorEmail(true)
      setErrorPassword(true)
      setErrorConfirmPassword(true)
      setMsg(
          <CCardText style={{color:'red'}}>
              Error: {errors_sign_up.errors[0].message}
          </CCardText>
      )
  }
},[errors_sign_up])

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setMsg(null);
    const payload = {
      first_name,
      last_name,
      email,
      password,
      role: COMPANY_ROLE,
      status: 'active',
      provider: 'default'
    }

    dispatch(SignUp(payload))
  }

  const renderRegisterPage = () => {
    return (
      <CCard className="mx-4">
        <CCardBody className="p-4">
          <CForm
              onSubmit={handleSubmit}
              className="form-horizontal"
              disabled={signing_up}
          >
            <h1>Register</h1>
            <p className="text-medium-emphasis">
            {msg ? msg : 'Sign In to your account' }
            </p>
            <div style={{margin:'10px 0 10px 0'}}>Create your account</div>
        
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput 
                className={errorFname ? "form-control is-invalid" :  ""}
                type="text"
                placeholder="First Name"
                value={first_name}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                onBlur={(e) => {
                  setErrorFname(false)
                }}
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput 
               className={errorLname ? "form-control is-invalid" :  ""}
                type="text"
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                onBlur={(e) => {
                  setErrorLname(false)
                }}
                autoComplete="last_name" 
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-3 has-validation">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput 
                className={errorEmail ? "form-control is-invalid" :  ""}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={(e) => {
                  setErrorEmail(false)
                }}
                autoComplete="email" 
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                className={errorPassword ? "form-control is-invalid" :  ""}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onBlur={(e) => {
                  setErrorPassword(false)
                }}
                autoComplete="password" 
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                className={errorConfirmPassword ? "form-control is-invalid" :  ""}
                type="password"
                placeholder="Confirm Password"
                value={confirm_password}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                onBlur={(e) => {
                  setErrorConfirmPassword(false)
                }}
                autoComplete="confirm_password" 
                required
              />
            </CInputGroup>
            <div className="d-grid" style={{marginBottom:10}}>
              <CButton type="submit" disabled={signing_up} color="success">Create Account</CButton>
            </div>
            <Link to="/login">
            <div className="d-grid">
                <CButton type="Login" color="info">Login</CButton>
            </div>
            </Link>
          </CForm>
        </CCardBody>
      </CCard>
    )
  }

  const renderSuccessPage = () => {
    return (
      <CCard className="mx-4">
        <CCardBody className="p-4">
          <CCardTitle className="text-success">Register Sucess</CCardTitle>
          <CCardText>Thanks for signing up. Welcome to Mo and Bear. We are happy to have you on board.</CCardText>
          <Link to="/login">
            <CButton className="alignVertical" href="#" color="success" variant="outline" size="xs">
              Login
              </CButton>
          </Link>
        </CCardBody>
      </CCard>
    )
  }

  const renderLoadingPage = () => {
    return (
      <CCard className="mx-4">
        <CCardBody className="p-4">
          <center><CCardText>Signing Up...</CCardText></center>
        </CCardBody>
      </CCard>
    )
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            {signing_up ? renderLoadingPage() : !success_sign_up ?  renderRegisterPage() : renderSuccessPage()}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
