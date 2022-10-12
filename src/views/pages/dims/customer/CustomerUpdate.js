import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow
} from '@coreui/react-pro';
import { AppPopper } from './../../../../components';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateCustomer, selectCustomers, selectCustomerId } from './../../../../store/reducers/customerSlice';
import { selectUser } from './../../../../store/reducers/users';
import { selectCurrencies } from '../../../../store/reducers/references/currencySlice';
import { selectCountries } from '../../../../store/reducers/references/countrySlice';
import { selectPaymentTerms } from '../../../../store/reducers/references/paymenttermSlice';
import { selectPostingGroups } from '../../../../store/reducers/references/pstgroupSlice';
import { selectPaymentModes } from '../../../../store/reducers/references/paymentmodeSlice';



const CustomerUpdate = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get router params
  const {id} = useParams();
  const { user } = useSelector(selectUser);
  const { customers } = useSelector(selectCustomers);
  const data = useSelector((state) => selectCustomerId(state, Number(id)));

  const logged = user ? user.first_name : 'anonymouscustomer';
  
  /* Load Selection Options */
  const { pstgroupData } = useSelector(selectPostingGroups);
  const { currenciesData } = useSelector(selectCurrencies);
  const { countriesData } = useSelector(selectCountries);
  const { ptermsData } = useSelector(selectPaymentTerms);
  const { pmodesData } = useSelector(selectPaymentModes);


  // Set Fields
  const [customerId, setCustomerId] = useState(id);
  const [company_id, setCompanyId] = useState(data?.company_id);
  const [customer_name, setCustomerName] = useState(data?.customer_name);
  const [customer_type, setCustomerType] = useState(data?.customer_type);
  const [email, setEmail] = useState(data?.email);
  const [registered_name, setRegisteredName] = useState(data?.registered_name);
  const [address1, setAddress1] = useState(data?.address1);
  const [address2, setAddress2] = useState(data?.address2);
  const [city, setCity] = useState(data?.city);
  const [province, setProvince] = useState(data?.province);
  const [post_code, setPostCode] = useState(data?.post_code);
  const [country_abbr, setCountry] = useState(data?.country_abbr);
  const [pcountry_code, setPCountryCode] = useState(data?.pcountry_code);
  const [phone_number, setPhoneNumber] = useState(data?.phone_number);
  const [mcountry_code, setMCountryCode] = useState(data?.mcountry_code);
  const [mobile_number, setMobileNumber] = useState(data?.mobile_number);
  const [website, setWebsite] = useState(data?.website);
  const [contact_person_first_name, setContactFirstName] = useState(data?.contact_person_first_name);
  const [contact_person_last_name, setContactLastName] = useState(data?.contact_person_last_name); 
  const [bill_to_customer_name, setBillToCustomerName] = useState(data?.bill_to_customer_name);
  const [bill_to_address1, setBillToAddress1] = useState(data?.bill_to_address1);
  const [bill_to_address2, setBillToAddress2] = useState(data?.bill_to_address2);
  const [bill_to_city, setBillToCity] = useState(data?.bill_to_city);
  const [bill_to_province, setBillToProvince] = useState(data?.bill_to_province);
  const [bill_to_post_code, setBillToPostCode] = useState(data?.bill_to_post_code);
  const [bill_to_country_abbr, setBillToCountry] = useState(data?.bill_to_country_abbr);
  const [tax_identification_number, setTin] = useState(data?.tax_identification_number);
  const [default_currency, setDefaultCurrency] = useState(data?.default_currency);
  const [payment_terms, setPaymentTerms] = useState(data?.payment_terms);
  const [payment_mode, setPaymentMode] = useState(data?.payment_mode);
  const [business_posting_group, setBusinessPostingGroup] = useState(data?.business_posting_group);
  const [vat_posting_group, setVatPostingGroup] = useState(data?.vat_posting_group);
  const [customer_posting_group, setCustomerPostingGroup] = useState(data?.customer_posting_group);
  const [cs_user_id, setCsUserId] = useState(data?.cs_user_id);
  const [cs_company_id, setCsCompanyId] = useState(data?.cs_company_id);
  const [customerStatus, setCustomerStatus] = useState(data?.status);
  const [created_by, setCreatedBy] = useState(data?.created_by);
  const [updated_by, setUpdatedBy] = useState(logged);
  const [date_created, setDateCreated] = useState(data?.date_created);
  const [date_updated, setDateUpdated] = useState(new Date().toISOString());
  
  
  //Form validation 
  const [validated, setValidated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');

  const canSave = [customerStatus].every(Boolean) && requestStatus === 'idle';
  
  console.log({canSave})

  //Submit Form
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    const onSavePostClicked = () => {  
      if (canSave) {
        try {
          setRequestStatus('pending');
          dispatch(updateCustomer({
              customer_id: customerId,
              company_id,
              customer_name,
              customer_type,
              email,
              registered_name,
              address1,
              address2,
              city,
              province,
              post_code,
              country_abbr,
              pcountry_code,
              phone_number,
              mcountry_code,
              mobile_number,
              website,
              contact_person_first_name,
              contact_person_last_name,
              bill_to_customer_name,
              bill_to_address1,
              bill_to_address2,
              bill_to_city,
              bill_to_province,
              bill_to_post_code,
              bill_to_country_abbr,
              tax_identification_number,
              default_currency,
              payment_terms,
              payment_mode,
              business_posting_group,
              vat_posting_group,
              customer_posting_group,
              cs_user_id,
              cs_company_id,
              status: customerStatus,
              created_by,
              updated_by,
              date_created,
              date_updated,
            })).unwrap();
    
            setCustomerId('');
            setCompanyId('');
            setCustomerName('');
            setCustomerType('');
            setEmail('');
            setRegisteredName('');
            setAddress1('');
            setAddress2('');
            setCity('');
            setProvince('');
            setPostCode('');
            setCountry('');
            setPCountryCode('');
            setPhoneNumber('');
            setMCountryCode('');
            setMobileNumber('');
            setWebsite('');
            setContactFirstName('');
            setContactLastName('');
            setBillToCustomerName('');
            setBillToAddress1('');
            setBillToAddress2('');
            setBillToCity('');
            setBillToProvince('');
            setBillToPostCode('');
            setBillToCountry('');
            setTin('');
            setDefaultCurrency('');
            setPaymentTerms('');
            setPaymentMode('');
            setBusinessPostingGroup('');
            setVatPostingGroup('');
            setCustomerPostingGroup('');
            setCsUserId('');
            setCsCompanyId('');
            setCustomerStatus('');
            setCreatedBy('');
            setUpdatedBy('');
            setDateCreated('');
            setDateUpdated('');
            
            setUpdated(true);
            navigate(`/customer/${id}`);
          
        } catch (err) {
            console.error('Failed to save the post', err);
        } finally {
          setRequestStatus('idle');
          setUpdated(true);
        }
      }
    }
    setValidated(true);
    onSavePostClicked();
  }

  const handleDelete = (id) => {
    
    if(data.status !== 'deleted') {
      //Just change status to deleted
      
      if (window.confirm("Are you sure you want to delete this customer "+ id + "?")) {
        dispatch(updateCustomer({customer_id: id, status: 'deleted'}));
        navigate('/customer/'+id);
        window.location.reload(true);
      }
    }
  };

  const handleBack = () => {
    navigate('/customers');
  }

  // Popper
  const [deletingItem, setDeletingItem] = useState(false)
  const [popper, setPopper] = useState(false)

  const handleSubmitPopper = (id) => {
    const payload = {
      customer_id: id, 
      status: 'deleted'
    }
    // dispatch(updateProduct(payload)).then(() => {
    //   setPopper(0);
    //   window.location.reload(true);
    // });
  }

  const handleClosePopper = () => {
    console.log(popper);
    setPopper(0);
  }

  const handleOpenTriggerPopper = (id) => {
    setPopper(id);
  }

  return (
  
  <CRow>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>UPDATE CUSTOMER ID: {id}</strong> <small></small>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
           <CRow xs={{ gutterY: 3 }}>
             <CCol md={6}>
               <CFormInput
                 label="Customer Name" 
                 type="text"
                 id="customer"
                 feedbackValid="Looks good!"
                 defaultValue={customer_name}
                 onChange={(e) => setCustomerName(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
             <CFormSelect 
                 id="customer_type" 
                 label="Customer Type"
                 defaultValue={customer_type} 
                 onChange={(e) => setCustomerType(e.target.value)}
                 >
                 <option>Distributor</option>
                 <option>Wholesaler</option>
               </CFormSelect>
             </CCol>
             <CCol md={3}>
              <CFormSelect 
               id="customerStatus"
               label="Status" 
               defaultValue={customerStatus} 
               onChange={(e) => setCustomerStatus(e.target.value)} 
               required>
                 <option>active</option>
                 <option>deleted</option>
              </CFormSelect>
            </CCol>
           </CRow>
           <CRow xs={{ gutterY: 1 }}>
             <CCol md={3}>
              <CFormInput
                label="Email" 
                type="text"
                id="email"
                defaultValue={email}
                feedbackValid="Looks good!"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
             </CCol>
             <CCol md={3}>
              <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
              <CInputGroup className="has-validation">
                <CInputGroupText 
                  id="pcountry_code"
                  placeholder="+65"
                  defaultValue={pcountry_code}
                  onChange={(e) => setPCountryCode(e.target.value)}
                />
                <CFormInput
                  type="text"
                  id="phone_number"
                  defaultValue={phone_number}
                  feedbackValid="Looks good!"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </CInputGroup>
             </CCol>
             <CCol md={3}>
              <CFormLabel htmlFor="mobileNumber">Mobile Number</CFormLabel>
              <CInputGroup className="has-validation">
                <CInputGroupText 
                  id="mcountry_code"
                  placeholder="+65"
                  defaultValue={mcountry_code}
                  onChange={(e) => setMCountryCode(e.target.value)}
                />
                <CFormInput
                  type="text"
                  id="mobile_number"
                  defaultValue={mobile_number}
                  feedbackValid="Looks good!"
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </CInputGroup>
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Website" 
                 type="text"
                 id="website"
                 name="website"
                 placeholder="https://"
                 defaultValue={website}
                 feedbackValid="Looks good!"
                 onChange={(e) => setWebsite(e.target.value)}
               />
             </CCol>
           </CRow>
           <CRow xs={{ gutterY: 3 }}>
             <CCol md={6}>
               <CFormInput 
                 label="Address 1" 
                 type="text"
                 id="address1"
                 defaultValue={address1}
                 feedbackValid="Looks good!"
                 onChange={(e) => setAddress1(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={6}>
               <CFormInput 
                 label="Address 2" 
                 type="text"
                 id="address2"
                 defaultValue={address2}
                 feedbackValid="Looks good!"
                 onChange={(e) => setAddress2(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
               <CFormInput 
                 label="City" 
                 type="text"
                 id="city"
                 feedbackValid="Looks good!"
                 defaultValue={city}
                 onChange={(e) => setCity(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
             <CFormInput 
                 label="Province" 
                 type="text"
                 id="province"
                 defaultValue={province}
                 feedbackValid="Looks good!"
                 onChange={(e) => setProvince(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
               <CFormSelect 
                 id="country_abbr" 
                 name="country_abbr" 
                 label="Country" 
                 onChange={(e) => setCountry(e.target.value)}
                 defaultValue={country_abbr}
                 options={
                    countriesData.map(filteredName => (
                       { 'label': filteredName.country_abbr, 'value': filteredName.country_abbr }
                    ))
                 }
                 required
               />
             </CCol>
             <CCol md={3}>
               <CFormInput 
                 label="Post Code" 
                 type="text"
                 id={post_code}
                 defaultValue={post_code}
                 feedbackInvalid="Please provide a valid post code."
                 feedbackValid="Looks good!"
                 onChange={(e) => setPostCode(e.target.value)}
                 required
               />
             </CCol>
           </CRow>

           <CRow xs={{ gutterY: 4 }}>
             <CCol md={12} className="bg-light p-3">
                <span className="header-brand mb-0 h1">CS Cart Details</span>
             </CCol>
             <CCol md={3}>
               <CFormInput 
                 label="CS User Id" 
                 type="text"
                 id="cs_user_id"
                 defaultValue={cs_user_id}
                 feedbackValid="Looks good!"
                 onChange={(e) => setCsUserId(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
               <CFormInput 
                 label="CS Company Id" 
                 type="text"
                 id="cs_company_id"
                 defaultValue={cs_company_id}
                 feedbackValid="Looks good!"
                 onChange={(e) => setCsCompanyId(e.target.value)}
               />
             </CCol>
           </CRow>

           <CRow xs={{ gutterY: 4 }}>
            <CCol md={12} className="bg-light p-3">
              <span className="header-brand mb-0 h1">Shipping and Contact Details</span>
            </CCol>
            <CCol md={8}>
               <CInputGroup>
                 <CInputGroupText>Contact Person</CInputGroupText>
                 <CFormInput 
                   aria-label="First name" 
                   type="text" 
                   placeholder="First Name" 
                   defaultValue={contact_person_first_name}
                   onChange={(e)=>setContactFirstName(e.target.value)} 
                   required
                 />
                 <CFormInput 
                   aria-label="Last name" 
                   type="text" 
                   placeholder="Last Name" 
                   defaultValue={contact_person_last_name}
                   onChange={(e)=>setContactLastName(e.target.value)} 
                   required
                 />
               </CInputGroup>
               <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
           </CRow>
           <CRow xs={{ gutterY: 2 }}>
             <CCol md={6}>
               <CFormInput 
                 label="Bill to Address 1" 
                 type="text"
                 id="bill_to_address1"
                 defaultValue={bill_to_address1}
                 feedbackValid="Looks good!"
                 onChange={(e) => setBillToAddress1(e.target.value)}
               />
             </CCol>
             <CCol md={6}>
               <CFormInput 
                 label="Bill To Address 2" 
                 type="text"
                 id="bill_to_address2"
                 defaultValue={bill_to_address2}
                 feedbackValid="Looks good!"
                 onChange={(e) => setBillToAddress1(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
               <CFormInput 
                 label="Bill To City" 
                 type="text"
                 id="bill_to_city"
                 defaultValue={bill_to_city}
                 feedbackValid="Looks good!"
                 onChange={(e) => setBillToCity(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
             <CFormInput 
                 label="Bill To Province" 
                 type="text"
                 id="bill_to_province"
                 defaultValue={bill_to_province}
                 feedbackValid="Looks good!"
                 onChange={(e) => setBillToProvince(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
               <CFormSelect 
                 id="bill_to_country" 
                 name="bill_to_country" 
                 label="Bill To Country" 
                 onChange={(e) => setBillToCountry(e.target.value)} 
                 defaultValue={bill_to_country_abbr}
                 options={
                    countriesData.map(filteredName => (
                       { 'label': filteredName.country_abbr, 'value': filteredName.country_abbr }
                    ))
                 }
               />
             </CCol>
             <CCol md={3}>
               <CFormInput 
                 label="Bill To Post Code" 
                 type="text"
                 id="bill_to_post_code"
                 defaultValue={bill_to_post_code}
                 feedbackInvalid="Please provide a valid post code."
                 feedbackValid="Looks good!"
                 onChange={(e) => setBillToPostCode(e.target.value)}
                 required
               />
             </CCol>
           </CRow>

           <CRow xs={{ gutterY: 4 }}>
             <CCol md={12} className="bg-light p-3">
              <span className="header-brand mb-0 h1">Transactions</span>
             </CCol>
             <CCol md={6}>
               <CFormInput 
                 label="Registered Name"
                 id="registered_name"
                 name="registered_name"
                 type="text"
                 onChange={(e) => setRegisteredName(e.target.value)}
                 defaultValue={registered_name}
                 required
               />
            </CCol>
            <CCol md={6}>
               <CFormInput 
                 label="Tax Identification Number"
                 id="tin"
                 name="tin"
                 type="text"
                 onChange={(e) => setTin(e.target.value)}
                 defaultValue={tax_identification_number}
                 required
               />
             </CCol>
             <CCol md={4}>
               <CFormSelect 
                 label="Default Currency"
                 id="default_currency"
                 name="default_currency"
                 onChange={(e) => setDefaultCurrency(e.target.value)}
                 defaultValue={default_currency}
                 options={
                    currenciesData.map(filteredName => (
                       { 'label': filteredName.currency_code, 'value': filteredName.currency_code }
                    ))
                 }
               />
             </CCol>
             <CCol md={4}>
               <CFormSelect 
                 label="Payment Terms"
                 id="payment_terms" 
                 name="Payment Terms" 
                 defaultValue={payment_terms}
                 onChange={(e) => setPaymentTerms(e.target.value)}
                 options={
                     ptermsData.map(filteredName => (
                       { 'label': filteredName.payment_terms, 'value': filteredName.payment_terms }
                     ))
                 }
               />
             </CCol>
             <CCol md={4}>
               <CFormSelect 
                 label="Payment Mode"
                 id="payment_mode" 
                 name="payment_mode"
                 defaultValue={payment_mode}
                 onChange={(e) => setPaymentMode(e.target.value)}
                 options={
                     pmodesData.map(filteredName => (
                       { 'label': filteredName.payment_mode, 'value': filteredName.payment_mode }
                 ))
                 }
               />
             </CCol>
           </CRow>
           <CRow xs={{ gutterY: 4 }}>
             <CCol md={12} className="bg-light p-3">
              <span className="header-brand mb-0 h1">Posting Group</span>
             </CCol>
             <CCol md={4}>
               <CFormSelect
                 label="Business Posting Group" 
                 id="business_posting_group"
                 name="business_posting_group"
                 defaultValue={business_posting_group}
                 feedbackValid="Looks good!"
                 onChange={(e) => setBusinessPostingGroup(e.target.value)}
                 options={
                     pstgroupData.filter(name => name.posting_group_type.includes('Gen Bus')).map(filteredName => (
                       { 'label': filteredName.posting_group_name, 'value': filteredName.posting_group_name }
                   ))
                 }
               />
             </CCol>
             <CCol md={4}>
               <CFormSelect
                 label="VAT Posting Group" 
                 id="vat_posting_group"
                 name="vat_posting_group"
                 defaultValue={vat_posting_group}
                 feedbackValid="Looks good!"
                 onChange={(e) => setVatPostingGroup(e.target.value)}
                 options={
                     pstgroupData.filter(name => name.posting_group_type.includes('Customer VAT Bus')).map(filteredName => (
                       { 'label': filteredName.posting_group_name, 'value': filteredName.posting_group_name }
                   ))
                 }
               />
             </CCol>
             <CCol md={4}>
               <CFormSelect
                 label="Customer Posting Group" 
                 type="text"
                 id="customer_posting_group"
                 name="customer_posting_group"
                 defaultValue={customer_posting_group}
                 feedbackValid="Looks good!"
                 onChange={(e) => setCustomerPostingGroup(e.target.value)}
                 options={
                     pstgroupData.filter(name => name.posting_group_type.includes('Customer')).map(filteredName => (
                       { 'label': filteredName.posting_group_name, 'value': filteredName.posting_group_name }
                   ))
                 }
               />
             </CCol>
           </CRow>
           
           <CRow xs={{ gutterY: 5 }}>
             <CCol md={3}>
               <CFormInput
                 label="Created By" 
                 type="text"
                 id="created_by"
                 defaultValue={created_by}
                 disabled
               />
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Date Created" 
                 type="text"
                 id="date_created"
                 defaultValue={date_created}
                 disabled
               />
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Updated By" 
                 type="text"
                 id="updated_by"
                 defaultValue={updated_by}
                 disabled
               />
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Date Updated" 
                 type="text"
                 id="date_updated"
                 defaultValue={date_updated}
                 disabled
               />
             </CCol>
           </CRow> 

           <CRow xs={{ gutterY: 5 }}>
             <CCol xs={12}>
               <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                 <CButton 
                   color="secondary" 
                   type="button"
                   onClick={handleBack}
                 >
                   Back
                 </CButton>
                 <CButton 
                   color="danger"
                   type="button"
                   onClick={() => handleDelete(id)}
                 >
                   Delete
                 </CButton>
                 <CButton 
                   color="info" 
                   type="submit"
                   disabled={!canSave}
                 >
                   Update Record
                 </CButton>
               </div>
             </CCol>
           </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>  
  )
}

export default CustomerUpdate
