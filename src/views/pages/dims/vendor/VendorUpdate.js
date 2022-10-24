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
import { useNavigate, useParams } from 'react-router-dom';
import { selectVendors, selectVendorId, updateVendor } from './../../../../store/reducers/vendorSlice';
import { selectUser } from './../../../../store/reducers/users';
import { selectCurrencies } from '../../../../store/reducers/currencySlice';
import { selectCountries } from '../../../../store/reducers/countrySlice';
import { selectPaymentTerms } from '../../../../store/reducers/paymenttermSlice';
import { selectPostingGroups } from '../../../../store/reducers/pstgroupSlice';
import { selectPaymentModes } from '../../../../store/reducers/paymentmodeSlice';


const VendorUpdate = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get router params
  const {id} = useParams();
  const { user } = useSelector(selectUser);
  const data = useSelector((state) => selectVendorId(state, Number(id)));

  const logged = user ? user.first_name : 'user not logged';
  
  /* Load Selection Options */
  const { pstgroupData } = useSelector(selectPostingGroups);
  const { currenciesData } = useSelector(selectCurrencies);
  const { countriesData } = useSelector(selectCountries);
  const { ptermsData } = useSelector(selectPaymentTerms);
  const { pmodesData } = useSelector(selectPaymentModes);


  // Set Fields
  const [vendorId, setVendorId] = useState(id);
  const [vendor_name, setVendorName] = useState(data?.vendor_name);
  const [vendor_type, setVendorType] = useState(data?.vendor_type);
  const [email, setEmail] = useState(data?.email);
  const [vendorStatus, setVendorStatus] = useState(data?.status);
  const [phone_number, setPhoneNumber] = useState(data?.phone_number);
  const [mobile_number, setMobileNumber] = useState(data?.mobile_number);
  const [address1, setAddress1] = useState(data?.address1);
  const [address2, setAddress2] = useState(data?.address2);
  const [city, setCity] = useState(data?.city);
  const [province, setProvince] = useState(data?.province);
  const [post_code, setPostCode] = useState(data?.post_code);
  const [country_abbr, setCountry] = useState(data?.country_abbr);
  const [payment_terms, setPaymentTerms] = useState(data?.payment_terms);
  const [payment_mode, setPaymentMode] = useState(data?.payment_mode);
  const [contact_person_first_name, setContactFirstName] = useState(data?.contact_person_first_name);
  const [contact_person_last_name, setContactLastName] = useState(data?.contact_person_last_name);
  const [bank_name, setBankName] = useState(data?.bank_name);
  const [bank_account_number, setBankAccountNumber] = useState(data?.bank_account_number);
  const [currency_code, setCurrencyCode] = useState(data?.currency_code);
  const [business_posting_group, setBusinessPostingGroup] = useState(data?.business_posting_group);
  const [vat_posting_group, setVatPostingGroup] = useState(data?.vat_posting_group);
  const [vendor_posting_group, setVendorPostingGroup] = useState(data?.vendor_posting_group);
  const [website, setWebsite] = useState(data?.website);
  const [updated_by, setUpdatedBy] = useState(logged);
  const created_by = data?.created_by;
  const date_created = data?.date_created;
  
  //Form validation 
  const [validated, setValidated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');

  const canSave = [vendor_name, vendorStatus].every(Boolean) && requestStatus === 'idle';
  
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
          dispatch(updateVendor({
              vendor_id: vendorId, 
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
              date_updated: new Date().toISOString(),
            })).unwrap();
    
            setVendorId('');
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
            setVatPostingGroup('')
            setVendorPostingGroup('');
            setWebsite('');
            setVendorStatus('');
            
            setUpdated(true);
            navigate(`/vendor/${id}`);
          
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
      
      if (window.confirm("Are you sure you want to delete this vendor "+ id + "?")) {
        dispatch(updateVendor({vendor_id: id, status: 'deleted'}));
        //window.location.reload(true);
      }
    }
  };

  const handleBack = () => {
    navigate('/vendors');
  }
  return (

   <CRow>
     <CCol xs={12}>
       <CCard className="mb-4">
         <CCardHeader>
           <strong>Update Vendor ID: {id}</strong> <small></small>
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
                  defaultValue={vendor_name}
                  onChange={(e) => setVendorName(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={3}>
              <CFormSelect 
                  id="vendor_type" 
                  label="Vendor Type"
                  defaultValue={vendor_type} 
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
                defaultValue={vendorStatus} 
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
                 defaultValue={email}
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
                   defaultValue={phone_number}
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
                  defaultValue={city}
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
                  defaultValue={province}
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
                  id="post_code"
                  defaultValue={post_code}
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
              <CCol md={4}>
                <CFormInput
                  label="Bank Name" 
                  type="text"
                  id="bank_name"
                  feedbackValid="Looks good!"
                  defaultValue={bank_name}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="Bank Account Number" 
                  type="text"
                  id="bank_account_number"
                  defaultValue={bank_account_number}
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
                  defaultValue={currency_code}
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
            <CRow xs={{ gutterY: 5 }}>
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
                  label="Vendor Posting Group" 
                  type="text"
                  id="vendor_posting_group"
                  name="vendor_posting_group"
                  defaultValue={vendor_posting_group}
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
                  defaultValue={new Date().toISOString()}
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
                    color="danger"
                    type="button"
                    onClick={handleDelete}
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

export default VendorUpdate