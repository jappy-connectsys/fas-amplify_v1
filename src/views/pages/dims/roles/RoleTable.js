import React, { useEffect, useState } from 'react'
import { CSmartTable, CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CCollapse,
  CForm,
  CFormInput,
  CFormTextarea,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CModal,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AddRole, GetRole, ClearRole, EditRole } from '../../../../store/reducers/roleSlice'

function RoleTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { 
    roleData, 
    roleAddLoading, 
    roleAddError, 
    roleEditLoading, 
    roleEditError 
  } = useSelector(state => state.role)
  
  const [details, setDetails] = useState([])

  const [openModal, setOpenModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [roleName, setRoleName] = useState('')
  const [roleDesc, setRoleDesc] = useState('')
  const [roleId, setRoleId] = useState(0)
  const [mes, setMes] = useState('')
  
  const data = roleData.map((res)=> ({
    id: res.id,
    role_name: res.name,
    role_desc: res.description,
  }))

  const columns = [
    { key: 'role_name', _style: { width: '30%' }},
    { key: 'role_desc', _style: { width: '60%' }},
    { key: 'show_details', label: 'Action', _style: { width: '10%' }},
  ]

  const toggleDetails = (index) => {
    console.log('~~', index);
  }

  const handleOpenRoleModal = () => {
    setRoleId(0)
    setRoleName('')
    setRoleDesc('')
    setOpenModal(true)
    setModalType('add')
  }

  const handleOpenRoleModalEdit = (item) => {
    setRoleId(item.id)
    setRoleName(item.role_name)
    setRoleDesc(item.role_desc)
    setOpenModal(true)
    setModalType('edit')
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleAdd = () => {
    const payload = {
      name:roleName,
      description:roleDesc
    }
    dispatch(AddRole(payload)).then(()=>{
        setTimeout(()=>{
          dispatch(GetRole())
          handleCloseModal()
          dispatch(ClearRole())
          setMes('')
        },2000)
    })
  }

  const handleSave = () => {
    const payload = {
      id: roleId,
      name:roleName,
      description:roleDesc
    }
    dispatch(EditRole(payload)).then(()=>{
        setTimeout(()=>{
          dispatch(GetRole())
          handleCloseModal() 
          dispatch(ClearRole())
          setMes('')
        },2000)
    })
  }

  useEffect(()=>{
    dispatch(ClearRole())
    dispatch(GetRole())
  }, [dispatch])

  useEffect(()=>{
    if(roleAddLoading === "success"){
      setMes(<span style={{color:'green',fontWeight:600}}>The role is successfully added</span>)
    }

    if(roleAddLoading === "failed"){
      setMes('Error: ', roleAddError)
    }

    if(roleEditLoading === "success"){
      setMes(<span style={{color:'green',fontWeight:600}}>The role is successfully updated</span>)
    }

    if(roleEditLoading === "failed"){
      setMes('Error: ', roleEditError)
    }
  }, [roleAddLoading, roleAddError, roleEditLoading, roleEditLoading])

  const renderModal = () => {
    return (
      <CModal
        className="position-fixed"
        keyboard={false}
        visible={openModal}
      >
        <CModalHeader closeButton={false}>
            <CModalTitle>
                {modalType === "add" ? 'Add New Role' : 'Edit Role'}
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm className="row g-3"
                noValidate
            >
                <CRow xs={{ gutterY: 2, gutterX: 4 }}>
                    <CCol md={12}  style={{marginLeft:10}}>
                        <CFormInput
                            label="Role Name" 
                            type="text"
                            id="role_name"
                            defaultValue={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                        />
                    </CCol>
                </CRow>
                <CRow xs={{ gutterY: 2, gutterX: 4 }}>  
                    <CCol md={12} style={{marginLeft:10}}>
                        <CFormTextarea
                            id="role_desc"
                            label="Role Description"
                            rows="5"
                            defaultValue={roleDesc}
                            onChange={(e) => setRoleDesc(e.target.value)}
                        ></CFormTextarea>
                    </CCol>
                </CRow>
            </CForm>
        </CModalBody>
        <CModalFooter>
            <div className="position-absolute bottom-90 start-0" style={{paddingLeft:'10px'}}>
                {mes ? mes : ''}
            </div>
            <div>
                {modalType === "add" ? (
                    <CButton 
                      disabled={roleAddLoading === "loading"}
                      style={{marginRight:'5px'}} color="success"
                        onClick={() => handleAdd()}>Add</CButton> 
                    ) : 
                    modalType === "edit" ? (
                      <CButton 
                      disabled={roleEditLoading === "loading"}
                      style={{marginRight:'5px'}} color="success"
                        onClick={() => handleSave()}>Save</CButton> 
                    ) :
                    ''
                }
                <CButton 
                  disabled={roleAddLoading === "loading"}
                  style={{marginLeft:'5px'}} color="secondary" 
                onClick={() => handleCloseModal()}>Close</CButton>
            </div>
        </CModalFooter>
      </CModal>
    )
  }

  const handleUpdate = (item) => {
    handleOpenRoleModalEdit(item)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <label style={{marginTop:3}}><strong>Role</strong> <small>All Records</small></label>
            <CButton color="success" 
                style={{
                  marginTop:3,padding:'4px 12px 4px 12px',fontSize:'12px',
                  float:'right',fontWeight:600, color:'white'
                }}
                onClick={()=>handleOpenRoleModal()}
            >
                  New Role
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
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => handleUpdate(item)}
                        style={{marginLeft:11,marginTop:8}}
                      >
                        Update
                      </CButton>
                    </td>
                  )
                },
              }}
              selectable
              sorterValue={{ column: 'product_name', state: 'asc' }}
              tableFilter
              tableHeadProps={{
                color: 'danger',
              }}
              tableProps={{
                striped: true,
                hover: true,
              }}
            />
          </CCardBody>
          {renderModal()}
        </CCard>
      </CCol>
    </CRow>
    
  )
}

export default RoleTable