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
} from '../../../../store/reducers/references/customerWarehouseSlice';


function Customer(){
    const dispatch = useDispatch();

    const { data:customerData } = useSelector((state) => state.customer)

    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [mes, setMes] = useState('')

    const data = customerData?.map((res)=> {
        return ({
        id: res.company_id,
        customer_name: res.customer_name,
        email:  res.email,
        phone_number:res.phone_number,
        date_created: new Date(res.date_created).toLocaleString("en-US"),
        status:res.status,
        })
    })

    useEffect(()=>{
        dispatch(getCustomers())
    }, [dispatch])

    const columns = [
        { label: 'Customer Name', key: 'customer_name', _style: { width: '20%' }},
        { label: 'Email', key: 'email', _style: { width: '20%' }},
        { label: 'Phone Number', key: 'phone_number', _style: { width: '20%' }},
        { label: 'Date Created', key: 'date_created', _style: { width: '20%' }},
        { key: 'show_details', label: 'Action', _style: { width: '20%' }},
    ]


    const handleOpenModal = () => {
        setOpenModal(true)
        setModalType('add')
        setMes('')
    }
   
    const handleCloseModal = () => {
        setOpenModal(false)
    

        setTimeout(()=>{
            setOpenModal(false)
            setMes('')
        },1000)
    }

    const handleSubmit = (type) => {
        console.log('~~', type);
    }

    const handleUpdate = (item) => {
        console.log('~~', item);
    }

    const [customerId, setCustomerId] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [customerType, setCustomerType] = useState('')
    const [customerStatus, setCustomerStatus] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [website, setWebsite] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

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
                        {modalType === "add" ? 'Add Customer' : 'Edit Customer'}
                        </CModalTitle>
                    </CModalHeader>
                    <CModalBody style={{height:'420px', overflowY: 'scroll'}}>
                        <CForm className="row g-3 ps-2" noValidate >
                            <CRow  xs={{ gutterY: 2, gutterX: 2 }} >
                                <CCol md={6}>
                                    <CFormInput
                                        label={<>Customer Name<label style={{color:'red'}}>*</label></>}
                                        placeholder='Airspeed'
                                        type="text"
                                        id="customerName"
                                        defaultValue={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                    />
                                </CCol>
                                <CCol md={3}>
                                    <CFormSelect 
                                        id="customerType" 
                                        label="Customer Type"
                                        defaultValue={customerType} 
                                        onChange={(e) => setCustomerType(e.target.value)}
                                        >
                                        <option value="">Select a Customer Type</option>
                                        <option value="distribution">Distributor</option>
                                        <option value="wholesaler">Wholesaler</option>
                                    </CFormSelect>
                                </CCol>
                                <CCol md={3}>
                                    <CFormSelect 
                                        id="customerStatus"
                                        label="Status" 
                                        defaultValue={customerStatus} 
                                        onChange={(e) => setCustomerStatus(e.target.value)} 
                                    >
                                        <option value="">Select a Status</option>
                                        <option value="active">Active</option>
                                        <option value="deleted">Deleted</option>
                                    </CFormSelect>
                                </CCol>
                            </CRow>

                            <CRow xs={{ gutterY: 2, gutterX: 2 }} >
                                <CCol md={3}>
                                    <CFormInput
                                        id="email" 
                                        label="Email"
                                        placeholder='juan_delacruz@gmail.com'
                                        type="text"
                                        defaultValue={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </CCol>
                                <CCol md={3}>
                                    <CFormInput
                                        id="phoneNumber" 
                                        label="Phone Number"
                                        placeholder='+(63)934-4567-245'
                                        type="text"
                                        defaultValue={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </CCol>
                                <CCol md={3}>
                                    <CFormInput
                                        id="mobileNumber"
                                        label="Mobile Number" 
                                        placeholder='+(02)934-4567'
                                        type="text"
                                        defaultValue={mobileNumber} 
                                        onChange={(e) => setMobileNumber(e.target.value)} 
                                    />
                                </CCol>
                                <CCol md={3}>
                                    <CFormInput
                                        id="website"
                                        label="Website" 
                                        placeholder='https://www.alibaba.com'
                                        type="text"
                                        defaultValue={website} 
                                        onChange={(e) => setWebsite(e.target.value)} 
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
                                <CCol md={3}>
                                    <CFormInput
                                        id="city" 
                                        label="City"
                                        placeholder='Enter a City'
                                        type="text"
                                        defaultValue={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </CCol>
                                <CCol md={3}>
                                    <CFormInput
                                        id="phoneNumber" 
                                        label="Phone Number"
                                        placeholder='+(63)934-4567-245'
                                        type="text"
                                        defaultValue={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </CCol>
                                <CCol md={3}>
                                    <CFormInput
                                        id="mobileNumber"
                                        label="Mobile Number" 
                                        placeholder='+(02)934-4567'
                                        type="text"
                                        defaultValue={mobileNumber} 
                                        onChange={(e) => setMobileNumber(e.target.value)} 
                                    />
                                </CCol>
                                <CCol md={3}>
                                    <CFormInput
                                        id="website"
                                        label="Website" 
                                        placeholder='https://www.alibaba.com'
                                        type="text"
                                        defaultValue={website} 
                                        onChange={(e) => setWebsite(e.target.value)} 
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
                                // disabled={customerWarehouseAddLoading === 'loading'}
                                style={{marginRight:'5px'}} color="success"
                                    onClick={() => handleSubmit("add")}>Add</CButton> 
                                ) : 
                                modalType === "edit" ? (
                                <CButton
                                // disabled={customerWarehouseAddLoading === 'loading'}
                                style={{marginRight:'5px'}} color="success"
                                    onClick={() => handleSubmit("edit")}>Save</CButton> 
                                ) :
                                ''
                            }
                            <CButton 
                            //  disabled={customerWarehouseAddLoading === 'loading'}
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
                    <label style={{marginTop:3}}><strong>Customer</strong> <small>All Records</small></label>
                    <CButton color="success" 
                        style={{
                        marginTop:3,padding:'4px 12px 4px 12px',fontSize:'12px',
                        float:'right',fontWeight:600, color:'white'
                        }}
                        onClick={()=>handleOpenModal()}
                    >
                        New Customer
                    </CButton>
                </CCardHeader>
                <CCardBody>
                <CSmartTable
                    // loading={customerWarehouseLoading === 'loading'}
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
                {renderModal()}
            </CCard>
            </CCol>
        </CRow>
        )
}

export default Customer