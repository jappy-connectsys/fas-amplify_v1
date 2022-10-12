import React, { useEffect, useState } from 'react'
import { CSmartTable, CCard, CCardBody, CCardHeader, CCol, CRow, CButton,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CModal,
  CForm,
  CFormInput,
  CFormSelect
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux'
import { getCompanies } from '../../../../store/reducers/companySlice';
import { 
    ClearCompanyWarehouse, 
    GetCompanyWarehouse, 
    AddCompanyWarehouse, 
    UpdateCompanyWarehouse
} from '../../../../store/reducers/references/companyWarehouseSlice';


function CompanyWarehouse(){
    const dispatch = useDispatch();

    const { data:companyData } = useSelector((state) => state.company)
    const { 
        companyWarehouseLoading,
        companyWarehouseData,
        companyWarehouseError,
        companyWarehouseAddLoading,
        companyWarehouseAddError
    } = useSelector((state) => state.company_warehouse)

    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [mes, setMes] = useState('')

    const [companyWarehouse_id, setCompanyWarehouseId] = useState('')
    const [warehouseName, setWarehouseName] = useState('')
    const [warehouseType, setWarehouseType] = useState('')
    const [warehousePriority, setWarehousePriority] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [countryAbbr, setCountryAbbr] = useState('')
    const [mCountryCode, setMCountryCode] = useState('')
    const [pCountryCode, setPCountryCode] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [telephoneNo, setTelephoneNo] = useState('')
    const [email, setEmail] = useState('')
    const [contactPerson, setContactPerson] = useState('')
    const [companyId, setCompanyId] = useState(0)

    useEffect(()=>{
        dispatch(ClearCompanyWarehouse())
        dispatch(GetCompanyWarehouse())
        dispatch(getCompanies())
    }, [dispatch])

    useEffect(()=>{
        if(companyWarehouseAddLoading === "loading"){
            setMes("loading...")
        }
      
        if(companyWarehouseAddError){
            setMes(
                <label style={{color:'red',fontWeight:600}}>
                    Error:, {companyWarehouseAddError}
                </label>    
            )
        }
    }, [companyWarehouseAddLoading, companyWarehouseAddError])

    const columns = [
        { label: 'Warehouse Name', key: 'warehouse_name', _style: { width: '30%' }},
        { label: 'Company Name', key: 'company_name', _style: { width: '20%' }},
        { label: 'Type', key: 'warehouse_type', _style: { width: '10%' }},
        { label: 'Priority', key: 'warehouse_priority', _style: { width: '10%' }},
        { label: 'Date Created', key: 'date_created', _style: { width: '20%' }},
        { key: 'show_details', label: 'Action', _style: { width: '10%' }},
    ]

    // const data = [];

    const renderCompanyName = (company_id) => {
       const company = companyData.find(res => res.company_id === company_id)
       return company?.company_name
    }
    console.log('~~', companyWarehouseData);
    const data = companyWarehouseData.map((res)=> ({
        id: res.warehouse_id,
        warehouse_name: res.warehouse_name,
        company_name: renderCompanyName(res.company_id),
        warehouse_type: res.warehouse_type,
        warehouse_priority: res.warehouse_priority,
        address1:res.address1,
        address2:res.address2,
        city:res.city,
        province:res.province,
        post_code:res.post_code,
        country_abbr:res.country_abbr,
        mcountry_code:res.mcountry_code,
        pcountry_code:res.pcountry_code,
        company_id:res.company_id,
        email:res.email,
        mobileNo:res.mobile_number,
        telephoneNo:res.phone_number,
        contactPerson:res.contact_person,
        module: res.collection,
        date_created: new Date(res.date_created).toLocaleString("en-US"),
    }))

    
    const handleOpenModal = () => {
        setCompanyWarehouseId('')
        setWarehouseName('')
        setWarehouseType('')
        setWarehousePriority('')
        setAddress1('')
        setAddress2('')
        setCity('')
        setProvince('')
        setPostalCode('')
        setCountryAbbr('')
        setMCountryCode('')
        setPCountryCode('')
        setCompanyId(0)
        setMobileNo('')
        setTelephoneNo('')
        setContactPerson('')
        setEmail('')
        setOpenModal(true)
        setModalType('add')
        setMes('')
    }

    const handleCompanyId = (event) => {
        setCompanyId(event.target.value)
    }

    const companySelect = companyData?.map((data) => {
        const exportData = {
           'company_id': data.company_id,
           'company_name': data.company_name,
         };
   
         return exportData;
   });
   const addEmptyCompany = {
       'company_id': 0,
       'company_name': 'Select a Company',
   }
   companySelect.unshift(addEmptyCompany)

   
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const renderSuccess = (type, warehouseName) => {
    if(type === "add"){
        setMes(<span style={{color:'green',fontWeight:600}}>
        {warehouseName} warehouse has been successfully added.
        </span>)   
    }else{
        setMes(<span style={{color:'green',fontWeight:600}}>
        {warehouseName} warehouse has been successfully updated.
        </span>)   
    }

    setTimeout(()=>{
        setCompanyWarehouseId('')
        setWarehouseName('')
        setWarehouseType('')
        setWarehousePriority('')
        setAddress1('')
        setAddress2('')
        setCity('')
        setProvince('')
        setPostalCode('')
        setCountryAbbr('')
        setMCountryCode('')
        setPCountryCode('')
        setCompanyId(0)
        setMobileNo('')
        setTelephoneNo('')
        setContactPerson('')
        setEmail('')
        dispatch(GetCompanyWarehouse())
        setOpenModal(false)
        setMes('')
    },1000)
  }

  const handleSubmit = (type) => {
    if(warehouseName === ""){
        setMes(<span style={{color:'red',fontWeight:600}}>The Warehouse Name is required</span>)
    }else if(warehouseType === ""){
        setMes(<span style={{color:'red',fontWeight:600}}>The Warehouse Type is required</span>)    
    }else if(companyId === 0){
        setMes(<span style={{color:'red',fontWeight:600}}>The Company Name is required</span>)    
    }else{
        console.log('~~', companyWarehouse_id)
        const payload = {
            id:companyWarehouse_id,
            warehouse_name:warehouseName,
            company_id:companyId,
            address1,
            address2,
            city,
            province,
            post_code:postalCode,
            country_abbr:countryAbbr,
            mobile_number:mobileNo,
            mcountry_code:mCountryCode,
            pcountry_code:pCountryCode,
            phone_number:mobileNo,
            email,
            contact_person:contactPerson,
            warehouse_type:warehouseType,
            warehouse_priority:warehousePriority
        }
        if(type === "add"){
            dispatch(AddCompanyWarehouse(payload)).then(()=>{
                renderSuccess(type, warehouseName)
            })
        }else{
            dispatch(UpdateCompanyWarehouse(payload)).then(()=>{
                renderSuccess(type, warehouseName)
            })
        }
    }
  }

  const handleUpdate = (item) => {
    setCompanyWarehouseId(item.id)
    setWarehouseName(item.warehouse_name)
    setWarehouseType(item.warehouse_type)
    setWarehousePriority(item.warehouse_priority)
    setAddress1(item.address1)
    setAddress2(item.address2)
    setCity(item.city)
    setProvince(item.province)
    setPostalCode(item.post_code)
    setCountryAbbr(item.country_abbr)
    setMCountryCode(item.mcountry_code)
    setPCountryCode(item.pcountry_code)
    setCompanyId(item.company_id)
    setMobileNo(item.mobileNo)
    setTelephoneNo(item.telephoneNo)
    setContactPerson(item.contactPerson)
    setEmail(item.email)
    setOpenModal(true)
    setModalType('edit')
  }

  const renderModal = () => {
        return (
            <CModal
                size="lg"
                className="position-fixed"
                keyboard={false}
                visible={openModal}
            >
                <CModalHeader closeButton={false}>
                    <CModalTitle>
                    {modalType === "add" ? 'Add Company Warehouse' : 'Edit Company Warehouse'}
                    </CModalTitle>
                </CModalHeader>
                <CModalBody style={{height:'420px', overflowY: 'scroll'}}>
                    <CForm className="row g-3 ps-2" noValidate >
                        <CRow  xs={{ gutterY: 2, gutterX: 2 }} >
                            <CCol md={4}>
                                <CFormInput
                                    label={<>Warehouse Name<label style={{color:'red'}}>*</label></>}
                                    placeholder='Airspeed'
                                    type="text"
                                    id="warehouseName"
                                    defaultValue={warehouseName}
                                    onChange={(e) => setWarehouseName(e.target.value)}
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    label={<>Warehouse Type<label style={{color:'red'}}>*</label></>}
                                    placeholder='Third Party'
                                    type="text"
                                    id="warehouseType"
                                    defaultValue={warehouseType}
                                    onChange={(e) => setWarehouseType(e.target.value)}
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    label="Warehouse Priority"
                                    placeholder='0'
                                    type="text"
                                    id="warehousePriority"
                                    defaultValue={warehousePriority}
                                    onChange={(e) => setWarehousePriority(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                        <CRow  xs={{ gutterY: 2, gutterX: 2 }} >
                            <CCol md={4}>
                                <CFormInput
                                    label="City"
                                    placeholder="Quezon City"
                                    type="text"
                                    id="city"
                                    defaultValue={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    label="Province"
                                    placeholder='Metro Manila'
                                    type="text"
                                    id="province"
                                    defaultValue={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    label="Postal Code"
                                    placeholder='1106'
                                    type="text"
                                    id="postalCode"
                                    defaultValue={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                        <CRow  xs={{ gutterY: 2, gutterX: 2 }} >
                            <CCol md={4}>
                                <CFormInput
                                    label="Country Abbr"
                                    placeholder="PHP"
                                    type="text"
                                    id="countryAbbr"
                                    defaultValue={countryAbbr}
                                    onChange={(e) => setCountryAbbr(e.target.value)}
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    label="M. Country Code"
                                    placeholder='Enter M. Country Code'
                                    type="text"
                                    id="mCountryCode"
                                    defaultValue={mCountryCode}
                                    onChange={(e) => setMCountryCode(e.target.value)}
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    label="P. Country Code"
                                    placeholder='Enter P. Country Code'
                                    type="text"
                                    id="pCountryCode"
                                    defaultValue={pCountryCode}
                                    onChange={(e) => setPCountryCode(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                        <CRow  xs={{ gutterY: 2, gutterX: 2 }} >
                            <CCol md={4}>
                                <CFormInput
                                    label="Mobile No,"
                                    placeholder="+639568194643"
                                    type="text"
                                    id="mobileNo"
                                    defaultValue={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    label="Telephone No."
                                    placeholder='02-8362-95-67'
                                    type="text"
                                    id="telephoneNo"
                                    defaultValue={telephoneNo}
                                    onChange={(e) => setTelephoneNo(e.target.value)}
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    label="Contact Person"
                                    placeholder='Pedro Santos'
                                    type="text"
                                    id="contactPerson"
                                    defaultValue={contactPerson}
                                    onChange={(e) => setContactPerson(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                        <CRow  xs={{ gutterY: 2, gutterX: 2 }} >
                            <CCol md={6}>
                                <CFormInput
                                    label="Address 1"
                                    placeholder="Enter address 1"
                                    type="text"
                                    id="address1"
                                    defaultValue={address1}
                                    onChange={(e) => setAddress1(e.target.value)}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    label="Address 2"
                                    placeholder="Enter address 2"
                                    type="text"
                                    id="address2"
                                    defaultValue={address2}
                                    onChange={(e) => setAddress2(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                        <CRow  xs={{ gutterY: 2, gutterX: 2 }} >
                            <CCol md={6}>
                                    <CFormSelect
                                        label={<>Company Name<label style={{color:'red'}}>*</label></>}
                                        id="company_id"
                                        value={companyId}
                                        onChange={(e) => handleCompanyId(e)}
                                        options={
                                            companySelect.length === 0 ?
                                                [{ 'label': 'Select a Company', 'value': 0 }] :
                                                companySelect.map(company => (
                                                { 'label': company.company_name, 'value': company.company_id }
                                            ))
                                        }
                                    />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    label="Email Address"
                                    placeholder='juan_delacruz01@gmail.com'
                                    type="text"
                                    id="email"
                                    defaultValue={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
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
                            disabled={companyWarehouseAddLoading === 'loading'}
                            style={{marginRight:'5px'}} color="success"
                                onClick={() => handleSubmit("add")}>Add</CButton> 
                            ) : 
                            modalType === "edit" ? (
                            <CButton
                            disabled={companyWarehouseAddLoading === 'loading'}
                            style={{marginRight:'5px'}} color="success"
                                onClick={() => handleSubmit("edit")}>Save</CButton> 
                            ) :
                            ''
                        }
                        <CButton 
                         disabled={companyWarehouseAddLoading === 'loading'}
                        style={{marginLeft:'5px'}} color="secondary" 
                        onClick={() => handleCloseModal()}>Close</CButton>
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
                <label style={{marginTop:3}}><strong>Company Warehouse</strong> <small>All Records</small></label>
                <CButton color="success" 
                    style={{
                    marginTop:3,padding:'4px 12px 4px 12px',fontSize:'12px',
                    float:'right',fontWeight:600, color:'white'
                    }}
                    onClick={()=>handleOpenModal()}
                >
                    New Company Warehouse
                </CButton>
            </CCardHeader>
            {companyWarehouseError ? companyWarehouseError : (
            <CCardBody>
              <CSmartTable
                loading={companyWarehouseLoading === 'loading'}
                activePage={1}
                cleaner
                clickableRows
                columns={columns}
                columnFilter
                columnSorter
                footer
                items={data}
                itemsPerPage={10}
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
                              View
                            </CButton>
                          </td>
                        )
                      },
                }}
                selectable
                sorterValue={{ column: 'date_created', state: 'asc' }}
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
            )}
            {renderModal()}
          </CCard>
        </CCol>
      </CRow>
    )
}

export default CompanyWarehouse