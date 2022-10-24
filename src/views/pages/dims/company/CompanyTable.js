import React, { useEffect, useState } from 'react'
import { 
  CSmartTable, 
  CCard, 
  CCardBody, 
  CCardHeader, 
  CCol, 
  CRow, 
  CButton,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CFormCheck,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CModal,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';

import CIcon from '@coreui/icons-react';
import { cilZoom } from '@coreui/icons';

import { selectCompanies } from './../../../../store/reducers/companySlice';

const CompanyTable = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [mes, setMes] = useState('')
  
  const [userId, setUserId] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('password')
  const [isStatus, setIsStatus] = useState('active')
  const [role_id, setRoleId] = useState(0)

  const [togglePW, setTogglePW] = useState(false)
  const [isPWChange, setIsPWChange] = useState(false)
 
  useEffect(()=>{
    dispatch(ClearRole())
    dispatch(ClearUserManagement())
    dispatch(GetRole())
    dispatch(GetUsers())
  }, [dispatch])

  const { user } = useSelector((state) => state.user);

  const { 
    roleData, 
  } = useSelector(state => state.role)

  const { 
    usersData, 
    userAddLoading, 
    userAddError, 
    userEditLoading, 
    userEditError 
  } = useSelector(state => state.user_management)

  const RoleCustom = roleData.map(res=>{
    const exportData = {
      'id': res.id,
      'role_name': res.name,
    };
    return exportData;
  })
  const addEmptyRole = {
      'id': 0,
      'role_name': 'Select a Role',
  }
  RoleCustom.unshift(addEmptyRole)

  const data = usersData?.map((res)=> {
    const today = new Date();
    const role =  roleData.find(roleRes=>roleRes.id === res.role)
        return ({
        id: res.id,
        first_name: res.first_name,
        last_name: res.last_name,
        email: res.email,
        role: role?.name,
        role_id: role?.id,
        status: res.status,
        created_at:res.created_at == null ? 'N/A' : new Date(res.created_at).toLocaleString("en-US")
      })
  })

  const columns = [
    { key: 'first_name', _style: { width: '20%' }},
    { key: 'last_name', _style: { width: '15%' }},
    { key: 'email', _style: { width: '10%' }},
    { key: 'role', _style: { width: '20%' }},
    { key: 'status', _style: { width: '20%' }},
    { key: 'created_at', _style: { width: '20%' }},
    { key: 'show_details', label: 'Action', _style: { width: '10%' }},
  ]

  const handleOpenRoleModalEdit = (item) => {
    setUserId(item.id)
    setFirstName(item.first_name)
    setLastName(item.last_name)
    setEmail(item.email)
    setIsStatus(item.active)
    setRoleId(item.role_id)
    setPassword('')
    setMes('')
    
    setOpenModal(true)
    setModalType('edit')
  }
  
  const handleUpdate = (item) => {
    handleOpenRoleModalEdit(item)
  }

  const handleOpenUserModal = () => {
    setUserId(null)
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('password')
    setIsStatus('active')
    setRoleId(0)
    setMes('')

    setOpenModal(true)
    setModalType('add')
  }

  const handleAdd = () => {
    if(firstName === ""){
      setMes(
        <label style={{color:'red',fontWeight:600}}>First Name is Required</label>
      )
    }else if(lastName === ""){
      setMes(
        <label style={{color:'red',fontWeight:600}}>Last Name is Required</label>
      )
    }else if(email === ""){
      setMes(
        <label style={{color:'red',fontWeight:600}}>Email is Required</label>
      )
    }else if(password === ""){
        setMes(
          <label style={{color:'red',fontWeight:600}}>Password is Required</label>
        ) 
    }else if(role_id == 0){
      setMes(
        <label style={{color:'red',fontWeight:600}}>Role is Required</label>
      )
    }else{
        const payload = {
          first_name:firstName,
          last_name:lastName,
          email,
          password,
          role:role_id,
          status:isStatus,
          provider:'default',
          created_by: user.id,
        }
        dispatch(AddUser(payload)).then(()=>{
          setMes(
            <label style={{color:'green',fontWeight:600}}>The User has been successfully added.</label>
          )
          setTimeout(()=>{
            dispatch(GetUsers())
            handleCloseModal()
            dispatch(ClearUserManagement())
            setMes('')
          },2000)
      })
    }
  }

  const handleSave = () => {
    if(firstName === ""){
      setMes(
        <label style={{color:'red',fontWeight:600}}>First Name is Required</label>
      )
    }else if(lastName === ""){
      setMes(
        <label style={{color:'red',fontWeight:600}}>Last Name is Required</label>
      )
    }else if(email === ""){
      setMes(
        <label style={{color:'red',fontWeight:600}}>Email is Required</label>
      )
    }else if(role_id == 0){
      setMes(
        <label style={{color:'red',fontWeight:600}}>Role is Required</label>
      )
    }else{
      let payload = {}
      if(password === ""){
        payload = {
          id:userId,
          first_name:firstName,
          last_name:lastName,
          email,
          role:role_id,
          status:isStatus ? isStatus : 'active',
          created_by: user.id,
        }
      }else{
        payload = {
          id:userId,
          first_name:firstName,
          last_name:lastName,
          email,
          password,
          role:role_id,
          status:isStatus ? isStatus : 'active',
          created_by: user.id,
        }
      }
        dispatch(UpdateUser(payload)).then(()=>{
          setMes(
            <label style={{color:'green',fontWeight:600}}>The User has been successfully updated.</label>
          )
          setTimeout(()=>{
            dispatch(GetUsers())
            handleCloseModal()
            dispatch(ClearUserManagement())
            setMes('')
          },2000)
        })
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleShowPW = () => {
    setTogglePW(!togglePW)
  }

  const handleChangeRole = (event) => {
    // const el = document.getElementById('vendor_id');
    // const text = el.options[el.selectedIndex].innerHTML;
    setRoleId(event.target.value)
  }

  const handleChangeStatus = (event) => {
    // const el = document.getElementById('vendor_id');
    // const text = el.options[el.selectedIndex].innerHTML;
    setIsStatus(event.target.value)
  }

  const check = (e) => {
    if (e.target.checked) {
      setIsPWChange(true)
      setPassword('password')
    } else {
      setIsPWChange(false)
      setPassword('')
    }
  }
    
  
  const renderModal = () => {
    return (
      <CModal
        className="position-fixed"
        keyboard={false}
        visible={openModal}
      >
        <CModalHeader closeButton={true}>
            <CModalTitle>
                {modalType === "add" ? 'Add New User' : 'Edit User'}
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm className="row g-3 ps-2"
                noValidate
            >
                <CRow  xs={{ gutterY: 2, gutterX: 2 }} >
                    <CCol md={6} >
                        <CFormInput
                            label={<>First Name<label style={{color:'red'}}>*</label></>}
                            placeholder='Juan'
                            type="text"
                            id="firstName"
                            defaultValue={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </CCol>
                    <CCol md={6}>
                        <CFormInput
                            label={<>Last Name<label style={{color:'red'}}>*</label></>}
                            placeholder='Dela Cruz'
                            type="text"
                            id="lastName"
                            defaultValue={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </CCol>
                </CRow>
                <CRow xs={{ gutterY: 2, gutterX: 2 }}>  
                    <CCol md={12}>
                    <CFormInput
                            label={<>Email<label style={{color:'red'}}>*</label></>}
                            placeholder='juan_dela_cruz@gmail.com'
                            type="text"
                            id="email"
                            defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </CCol>
                </CRow>
                {userId !== null && (
                  <CRow xs={{ gutterY: 2, gutterX: 2 }}>  
                    <CCol md={12}>
                      <label for="exampleInputPassword1" class="form-label">
                        Do you want to Change Password?
                      </label>
                      &nbsp;&nbsp;
                      <CFormCheck
                        id="change_password"
                        onChange={(e) => check(e)}
                      />
                    </CCol>
                  </CRow>
                )}
                {userId === null || isPWChange  ? (
                <CRow xs={{ gutterY: 2, gutterX: 2 }}>  
                    <CCol md={12}>
                    <label for="exampleInputPassword1" class="form-label">
                      Password
                      <label style={{color:'red'}}>*</label>
                    </label>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          id="password"
                          type={togglePW ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                        <CInputGroupText style={{cursor:'pointer'}} onClick={()=>handleShowPW()}>
                          <CIcon icon={cilZoom} />
                        </CInputGroupText>
                      </CInputGroup>
                      <div style={{marginTop:-18}} class="form-text">Default password: "password"</div>
                    </CCol>
                </CRow>
                ):''}
                <CRow xs={{ gutterX: 2 }} >  
                    <CCol md={12} 
                      style={{marginTop:10}}>
                      <label class="form-label">
                          Role
                          <label style={{color:'red'}}>*</label>
                      </label>
                      <CFormSelect
                          id="role_id"
                          defaultValue={role_id}
                          onChange={(e) => handleChangeRole(e)}
                          options={
                            RoleCustom.map(role => (
                              { 'label': role.role_name, 'value': role.id }
                            ))
                          }
                      />
                    </CCol>
                </CRow>
                {modalType === "edit" && (
                <CRow xs={{ gutterY: 2, gutterX: 2 }}>  
                    <CCol md={12}>
                      <CFormSelect 
                          label="Status"
                          id="status" 
                          defaultValue={isStatus}
                          onChange={(e) => handleChangeStatus(e)}
                          options={[
                              { 'label':'active', 'value': 'active' },
                              { 'label':'draft', 'value': 'draft' },
                              { 'label':'invited', 'value': 'invited' },
                              { 'label':'suspended', 'value': 'suspended' },
                              { 'label':'archived', 'value': 'archived' }]
                          }
                      />
                    </CCol>
                </CRow>
                )}
            </CForm>
        </CModalBody>
        <CModalFooter>
            <div className="position-absolute bottom-90 start-0" style={{paddingLeft:'10px'}}>
                {mes ? mes : ''}
            </div>

            <CButton 
              disabled={userAddLoading === "loading"}
              style={{marginRight:'5px'}} color="light" 
              onClick={() => handleCloseModal()}
            >
              Close
            </CButton>

            <div>
                {modalType === "add" ? (
                    <CButton 
                      disabled={userAddLoading === "loading"}
                      style={{marginRight:'5px'}} color="dark"
                        onClick={() => handleAdd()}>Add record</CButton> 
                    ) : 
                    modalType === "edit" ? (
                      <CButton 
                      disabled={userEditLoading === "loading"}
                      style={{marginRight:'5px'}} color="dark"
                        onClick={() => handleSave()}>Save changes</CButton> 
                    ) :
                    ''
                }

            </div>
        </CModalFooter>
      </CModal>
    )
  
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <label style={{marginTop:3}}><strong>Users</strong> <small>All Records</small></label>
            <CButton color="info" 
                style={{
                  marginTop:3,padding:'4px 12px 4px 12px',fontSize:'12px',
                  float:'right',fontWeight:600, color:'white'
                }}
                onClick={()=>handleOpenUserModal()}
            >
                  New User
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CSmartTable
              activePage={1}
              cleaner
              clickableRows
              columns={columns}
              columnFilter
              columnSorter
              footer
              items={data}
              itemsPerPageSelect
              itemsPerPage={20}
              pagination
              scopedColumns={{
                show_details: (item) => {
                  return (
                    <td className="py-2">
                      <CButton
                        color="info"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() =>  handleUpdate(item)}
                        style={{marginLeft:11,marginTop:8}}
                      >
                        View
                      </CButton>
                    </td>
                  )
                },
              }}
              selectable={false}
              sorterValue={{ column: 'created_at', state: 'asc' }}
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
          {renderModal()}
        </CCard>
      </CCol>
    </CRow>
  )
}
  /*
  const navigate = useNavigate();

  const { data, status, error } = useSelector(selectCompanies);
  console.log({data, status, error})

  const [details, setDetails] = useState([]);
  const columns = [
    { key: 'company_name', _style: { width: '20%' }},
    { key: 'email', sorter: false },
    { key: 'phone_number', sorter: false },
    { key: 'status', _style: { width: '20%' }},
    {
      key: 'show_details',
      label: 'Action',
      _style: { width: '1%' }
    },
  ]

  const getBadge = (status) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'archived':
        return 'secondary'
      case 'pending':
        return 'warning'
      case 'deleted':
        return 'danger'
      default:
        return 'active'
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
 
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Customer</strong> <small>All Records</small>
            
          </CCardHeader>
          <CCardBody>
            <CSmartTable
            activePage={1}
            cleaner
            clickableRows
            columns={columns}
            columnFilter
            columnSorter
            footer
            items={data}
            itemsPerPageSelect
            itemsPerPage={10}
            pagination
            scopedColumns={{
              status: (item) => (
                <td>
                  <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                </td>
              ),
              show_details: (item) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(item.company_id)
                      }}
                    >
                      {details.includes(item.company_id) ? 'Hide' : 'Show'}
                    </CButton>
                  </td>
                )
              },
              details: (item) => {
                return (
                  <CCollapse visible={details.includes(item.company_id)}>
                    <CCardBody>
                      <h6>Contact Person: {item.contact_person_first_name} {item.contact_person_last_name}</h6>
                      <p className="text-muted">Last Updated: {item.date_updated}</p>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton size="sm" color="dark" onClick={() => navigate(`/company/${item.company_id}`)}>
                          View / Update
                        </CButton>
                      </div>
                    </CCardBody>
                  </CCollapse>
                )
              },
            }}
            selectable
            sorterValue={{ column: 'company_name', state: 'asc' }}
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>    
    )
  }
  */

export default CompanyTable