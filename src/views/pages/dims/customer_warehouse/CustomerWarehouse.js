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
import { getCustomers } from '../../../../store/reducers/customerSlice';
import { 
    ClearCustomerWarehouse, 
    GetCustomerWarehouse, 
    AddCustomerWarehouse, 
    UpdateCustomerWarehouse
} from '../../../../store/reducers/customerWarehouseSlice';


function CustomerWarehouse(){
    const dispatch = useDispatch();

    const { data:customerData } = useSelector((state) => state.customer)
    const { 
        customerWarehouseLoading,
        customerWarehouseData,
        customerWarehouseError,
        customerWarehouseAddLoading,
        customerWarehouseAddError
    } = useSelector((state) => state.customer_warehouse)

    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [mes, setMes] = useState('')

    const [customerWarehouse_id, setCustomerWarehouseId] = useState('')
    const [warehouseName, setWarehouseName] = useState('')
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
    const [customerId, setCustomerId] = useState(0)

    useEffect(()=>{
        dispatch(ClearCustomerWarehouse())
        dispatch(GetCustomerWarehouse())
        dispatch(getCustomers())
    }, [dispatch])

    useEffect(()=>{
        if(customerWarehouseAddLoading === "loading"){
            setMes("loading...")
        }
      
        if(customerWarehouseAddError){
            setMes(
                <label style={{color:'red',fontWeight:600}}>
                    Error:, {customerWarehouseAddError}
                </label>    
            )
        }
    }, [customerWarehouseAddLoading, customerWarehouseAddError])

    const columns = [
        { label: 'Warehouse Name', key: 'warehouse_name', _style: { width: '20%' }},
        { label: 'Customer Name', key: 'customer_name', _style: { width: '20%' }},
        { label: 'Email', key: 'email', _style: { width: '10%' }},
        { label: 'Mobile No.', key: 'mobileNo', _style: { width: '20%' }},
        { label: 'Date Created', key: 'date_created', _style: { width: '20%' }},
        { key: 'show_details', label: 'Action', _style: { width: '10%' }},
    ]


    // const data = [];

    const renderCustomerName = (customer_id) => {
    
       const customer = customerData.find(res => res.customer_id === customer_id)
       return customer?.customer_name
    }

    const data = customerWarehouseData.map((res)=> {
        return ({
        id: res.warehouse_id,
        warehouse_name: res.warehouse_name,
        customer_name: renderCustomerName(res.customer_id),
        address1:res.address1,
        address2:res.address2,
        city:res.city,
        province:res.province,
        post_code:res.post_code,
        country_abbr:res.country_abbr,
        mcountry_code:res.mcountry_code,
        pcountry_code:res.pcountry_code,
        customer_id:res.customer_id,
        email:res.email ? res.email : 'N/A',
        mobileNo:res.mobile_number ? res.mobile_number : 'N/A',
        telephoneNo:res.phone_number,
        contactPerson:res.contact_person,
        module: res.collection,
        date_created: new Date(res.date_created).toLocaleString("en-US")
        })
    })

    
    const handleOpenModal = () => {
        setCustomerWarehouseId('')
        setWarehouseName('')
        setAddress1('')
        setAddress2('')
        setCity('')
        setProvince('')
        setPostalCode('')
        setCountryAbbr('')
        setMCountryCode('')
        setPCountryCode('')
        setCustomerId(0)
        setMobileNo('')
        setTelephoneNo('')
        setContactPerson('')
        setEmail('')
        setOpenModal(true)
        setModalType('add')
        setMes('')
    }

    const handleCustomerId = (event) => {
        setCustomerId(event.target.value)
    }

    const customerSelect = customerData?.map((data) => {
        const exportData = {
           'customer_id': data.customer_id,
           'customer_name': data.customer_name,
         };
   
         return exportData;
   });
   const addEmptyCustomer = {
       'customer_id': 0,
       'customer_name': 'Select a Customer',
   }
   customerSelect.unshift(addEmptyCustomer)

   
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
        setCustomerWarehouseId('')
        setWarehouseName('')
        setAddress1('')
        setAddress2('')
        setCity('')
        setProvince('')
        setPostalCode('')
        setCountryAbbr('')
        setMCountryCode('')
        setPCountryCode('')
        setCustomerId(0)
        setMobileNo('')
        setTelephoneNo('')
        setContactPerson('')
        setEmail('')
        dispatch(GetCustomerWarehouse())
        setOpenModal(false)
        setMes('')
    },1000)
  }

  const handleSubmit = (type) => {
    if(warehouseName === ""){
        setMes(<span style={{color:'red',fontWeight:600}}>The Warehouse Name is required</span>)
    }else if(customerId === 0){
        setMes(<span style={{color:'red',fontWeight:600}}>The Customer Name is required</span>)    
    }else{
        console.log('~~', customerWarehouse_id)
        const payload = {
            id:customerWarehouse_id,
            warehouse_name:warehouseName,
            customer_id:customerId,
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
        }
        if(type === "add"){
            dispatch(AddCustomerWarehouse(payload)).then(()=>{
                renderSuccess(type, warehouseName)
            })
        }else{
            dispatch(UpdateCustomerWarehouse(payload)).then(()=>{
                renderSuccess(type, warehouseName)
            })
        }
    }
  }

  const handleUpdate = (item) => {
    console.log('~~', item);
    setCustomerWarehouseId(item.id)
    setWarehouseName(item.warehouse_name)
    setAddress1(item.address1)
    setAddress2(item.address2)
    setCity(item.city)
    setProvince(item.province)
    setPostalCode(item.post_code)
    setCountryAbbr(item.country_abbr)
    setMCountryCode(item.mcountry_code)
    setPCountryCode(item.pcountry_code)
    setCustomerId(item.customer_id)
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
                <CModalHeader closeButton={true}>
                    <CModalTitle>
                    {modalType === "add" ? 'Add Customer Warehouse' : 'Edit Customer Warehouse'}
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
                                    <CFormSelect
                                        label={<>Customer Name<label style={{color:'red'}}>*</label></>}
                                        id="customer_id"
                                        value={customerId}
                                        onChange={(e) => handleCustomerId(e)}
                                        options={
                                            customerSelect.length === 0 ?
                                                [{ 'label': 'Select a Customer', 'value': 0 }] :
                                                customerSelect.map(customer => (
                                                { 'label': customer.customer_name, 'value': customer.customer_id }
                                            ))
                                        }
                                    />
                            </CCol>
                            <CCol md={4}>
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
                    </CForm>
                    </CModalBody>
                <CModalFooter>
                    <div className="position-absolute bottom-90 start-0" style={{paddingLeft:'10px'}}>
                        {mes ? mes : ''}
                    </div>

                    <CButton 
                        disabled={customerWarehouseAddLoading === 'loading'}
                        style={{marginRight:'5px'}} color="light" 
                        onClick={() => handleCloseModal()}
                    >
                        Close
                    </CButton>
                    
                    <div>
                        {modalType === "add" ? (
                            <CButton 
                            disabled={customerWarehouseAddLoading === 'loading'}
                            style={{marginRight:'5px'}} color="dark"
                                onClick={() => handleSubmit("add")}>Add record</CButton> 
                            ) : 
                            modalType === "edit" ? (
                            <CButton
                            disabled={customerWarehouseAddLoading === 'loading'}
                            style={{marginRight:'5px'}} color="dark"
                                onClick={() => handleSubmit("edit")}>Save changes</CButton> 
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
                <label style={{marginTop:3}}><strong>Customer Warehouse</strong> <small>All Records</small></label>
                <CButton color="info" 
                    style={{
                    marginTop:3,padding:'4px 12px 4px 12px',fontSize:'12px',
                    float:'right',fontWeight:600, color:'white'
                    }}
                    onClick={()=>handleOpenModal()}
                >
                    New Customer Warehouse
                </CButton>
            </CCardHeader>
            {customerWarehouseError ? customerWarehouseError : (
            <CCardBody>
              <CSmartTable
                loading={customerWarehouseLoading === 'loading'}
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
                              color="info"
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
                  color: 'info',
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

export default CustomerWarehouse