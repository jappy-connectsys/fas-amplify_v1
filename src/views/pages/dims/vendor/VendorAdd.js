import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createVendor, selectVendors } from './../../../../store/reducers/vendorSlice';
import { selectUser } from './../../../../store/reducers/users';
import { selectCurrencies } from '../../../../store/reducers/references/currencySlice';
import { selectCountries } from '../../../../store/reducers/references/countrySlice';
import { selectPaymentTerms } from '../../../../store/reducers/references/paymenttermSlice';
import { selectPostingGroups } from '../../../../store/reducers/references/pstgroupSlice';
import { selectPaymentModes } from '../../../../store/reducers/references/paymentmodeSlice';



const VendorAdd = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get router params
  const { user } = useSelector(selectUser);

  const logged = user ? user.first_name : 'anonymous';
  
  /* Load Selection Options */
  const { pstgroupData } = useSelector(selectPostingGroups);
  const { currenciesData } = useSelector(selectCurrencies);
  const { countriesData } = useSelector(selectCountries);
  const { ptermsData } = useSelector(selectPaymentTerms);
  const { pmodesData } = useSelector(selectPaymentModes);

  // Set Fields
  const company_id = 1;
  const [vendor_name, setVendorName] = useState('');
  const [vendor_type, setVendorType] = useState('');
  const [email, setEmail] = useState('email@email.com');
  const [phone_number, setPhoneNumber] = useState('');
  const [mobile_number, setMobileNumber] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [post_code, setPostCode] = useState('');
  const [country_abbr, setCountry] = useState('');
  const [payment_terms, setPaymentTerms] = useState('');
  const [payment_mode, setPaymentMode] = useState('');
  const [contact_person_first_name, setContactFirstName] = useState('First Name');
  const [contact_person_last_name, setContactLastName] = useState('Last Name');
  const [bank_name, setBankName] = useState('');
  const [bank_account_number, setBankAccountNumber] = useState('');
  const [currency_code, setCurrencyCode] = useState('');
  const [business_posting_group, setBusinessPostingGroup] = useState('');
  const [vat_posting_group, setVatPostingGroup] = useState('');
  const [vendor_posting_group, setVendorPostingGroup] = useState('');
  const [website, setWebsite] = useState('https://');
  const [vendorStatus, setVendorStatus] = useState('active');
  const [created_by, setCreatedBy] = useState(logged);
  const [updated_by, setUpdatedBy] = useState(logged);
  const [date_created, setDateCreated] = useState(new Date().toISOString());
  const [date_updated, setDateUpdated] = useState(new Date().toISOString());
  

  //Form validation 
  const [validated, setValidated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');

  const canSave = [vendor_name, address1, city, province, post_code, country_abbr, email, contact_person_first_name, contact_person_last_name].every(Boolean) && requestStatus === 'idle';

  console.log({canSave, vendor_name, address1, city, province, post_code, country_abbr, email, contact_person_first_name, contact_person_last_name, vendorStatus});

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
          console.log({canSave, vendor_name, vendorStatus})
          dispatch(createVendor({
              company_id,
              vendor_name, 
              vendor_type, 
              email, 
              phone_number,
              mobile_number,
              address1,
              address2,
              city,
              province,
              post_code,
              country_abbr,
              payment_terms,
              payment_mode,
              contact_person_first_name,
              contact_person_last_name,
              bank_name,
              bank_account_number,
              currency_code,
              business_posting_group,
              vat_posting_group,
              vendor_posting_group,
              website,
              status: vendorStatus,
              created_by,
              updated_by,
              date_created,
              date_updated,
            })).unwrap()
    
            setVendorName('');
            setVendorType('');
            setEmail('');
            setPhoneNumber('');
            setMobileNumber('');
            setAddress1('');
            setAddress2('');
            setCity('');
            setProvince('');
            setPostCode('');
            setCountry('');
            setPaymentTerms('');
            setPaymentMode('');
            setContactFirstName('');
            setContactLastName('');
            setBankName('');
            setBankAccountNumber('');
            setCurrencyCode('');
            setBusinessPostingGroup('');
            setVatPostingGroup('');
            setVendorPostingGroup('');
            setWebsite('');
            setVendorStatus('');
            setCreatedBy('');
            setUpdatedBy('');
            setDateCreated('');
            setDateUpdated('');
            
            setUpdated(true)

            navigate(`/vendors`);
          
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

  const handleBack = () => {
    return navigate('/vendors');
  }

  return (

  <CRow>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>ADD NEW VENDOR</strong> <small></small>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
           <CRow xs={{ gutterY: 1 }}>
             <CCol md={6}>
               <CFormInput
                 label="Vendor Name" 
                 type="text"
                 id="vendor_name"
                 feedbackValid="Looks good!"
                 placeholder={vendor_name}
                 onChange={(e) => setVendorName(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
             <CFormSelect 
                 id="vendor_type" 
                 label="Vendor Type"
                 placeholder={vendor_type} 
                 onChange={(e) => setVendorType(e.target.value)}
                 >
                 <option>Supplier</option>
                 <option>Fulfillment</option>
               </CFormSelect>
             </CCol>
             <CCol md={3}>
              <CFormSelect 
               id="vendorStatus"
               label="Status" 
               placeholder={vendorStatus} 
               onChange={(e) => setVendorStatus(e.target.value)} 
               required>
                 <option>active</option>
                 <option>deleted</option>
                 <option>pending</option>
              </CFormSelect>
            </CCol>
           </CRow>
           <CRow xs={{ gutterY: 1 }}>
             <CCol md={3}>
              <CFormInput
                label="Email" 
                type="text"
                id="email"
                placeholder={email}
                feedbackValid="Looks good!"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
             </CCol>
             <CCol md={3}>
              <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
              <CInputGroup className="has-validation">
                <CInputGroupText id="inputGroupPrepend">+63</CInputGroupText>
                <CFormInput
                  type="text"
                  id="phone_number"
                  placeholder={phone_number}
                  feedbackValid="Looks good!"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </CInputGroup>
             </CCol>
             <CCol md={3}>
              <CFormLabel htmlFor="mobileNumber">Mobile Number</CFormLabel>
              <CInputGroup className="has-validation">
                <CInputGroupText id="inputGroupPrepend">+63</CInputGroupText>
                <CFormInput
                  type="text"
                  id="mobile_number"
                  placeholder={mobile_number}
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
                 placeholder={website}
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
                 placeholder={address1}
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
                 placeholder={address2}
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
                 onChange={(e) => setCity(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
             <CFormInput 
                 label="Province" 
                 type="text"
                 id="province"
                 placeholder={province}
                 feedbackValid="Looks good!"
                 onChange={(e) => setProvince(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
               <CFormSelect 
                 id="country" 
                 name="country" 
                 label="Country" 
                 onChange={(e) => setCountry(e.target.value)} 
                 placeholder={country_abbr}
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
                 id="post_code"
                 placeholder={post_code}
                 feedbackInvalid="Please provide a valid post code."
                 feedbackValid="Looks good!"
                 onChange={(e) => setPostCode(e.target.value)}
                 required
               />
             </CCol>
           </CRow>
           <CRow xs={{ gutterY: 5 }}>
            <CCol md={6}>
               <CInputGroup>
                 <CInputGroupText>Contact Person</CInputGroupText>
                 <CFormInput 
                   aria-label="First name" 
                   type="text" 
                   placeholder={contact_person_first_name}
                   onChange={(e)=>setContactFirstName(e.target.value)} 
                   required
                 />
                 <CFormInput 
                   aria-label="Last name" 
                   type="text"
                   placeholder={contact_person_last_name}
                   onChange={(e)=>setContactLastName(e.target.value)} 
                   required
                 />
               </CInputGroup>
               <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
           </CRow>
           <CRow xs={{ gutterY: 2 }}>
             <CCol md={4}>
               <CFormInput
                 label="Bank Name" 
                 type="text"
                 id="bank_name"
                 feedbackValid="Looks good!"
                 placeholder={bank_name}
                 onChange={(e) => setBankName(e.target.value)}
               />
             </CCol>
             <CCol md={4}>
               <CFormInput
                 label="Bank Account Number" 
                 type="text"
                 id="bank_account_number"
                 placeholder={bank_account_number}
                 feedbackValid="Looks good!"
                 onChange={(e) => setBankAccountNumber(e.target.value)}
               />
             </CCol>
             <CCol md={4}>
               <CFormSelect 
                 label="Currency Code"
                 id="currency_code"
                 name="currency_code"
                 onChange={(e) => setCurrencyCode(e.target.value)}
                 placeholder={currency_code}
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
                 placeholder={payment_terms}
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
                 placeholder={payment_mode}
                 onChange={(e) => setPaymentMode(e.target.value)}
                 options={
                     pmodesData.map(filteredName => (
                       { 'label': filteredName.payment_mode, 'value': filteredName.payment_mode }
                 ))
                 }
               />
             </CCol>
           </CRow>
           <CRow xs={{ gutterY: 5 }}>
             <CCol md={4}>
               <CFormSelect
                 label="Business Posting Group" 
                 id="business_posting_group"
                 name="business_posting_group"
                 placeholder={business_posting_group}
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
                 placeholder={vat_posting_group}
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
                 label="Vendor Posting Group" 
                 type="text"
                 id="vendor_posting_group"
                 name="vendor_posting_group"
                 placeholder={vendor_posting_group}
                 feedbackValid="Looks good!"
                 onChange={(e) => setVendorPostingGroup(e.target.value)}
                 options={
                     pstgroupData.filter(name => name.posting_group_type.includes('Vendor')).map(filteredName => (
                       { 'label': filteredName.posting_group_name, 'value': filteredName.posting_group_name }
                   ))
                 }
               />
             </CCol>
           </CRow>
           <CRow xs={{ gutterY: 2 }}>
             <CCol md={3}>
               <CFormInput
                 label="Created By" 
                 type="text"
                 id="created_by"
                 placeholder={created_by}
                 disabled
               />
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Date Created" 
                 type="text"
                 id="date_created"
                 placeholder={date_created}
                 disabled
               />
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Updated By" 
                 type="text"
                 id="updated_by"
                 placeholder={updated_by}
                 disabled
               />
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Date Updated" 
                 type="text"
                 id="date_updated"
                 placeholder={new Date().toISOString()}
                 disabled
               />
             </CCol>
           </CRow> 
           <CRow xs={{ gutterY: 4 }}>
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
                   color="info" 
                   type="submit"
                   disabled={!canSave}
                 >
                   Add Record
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

export default VendorAdd