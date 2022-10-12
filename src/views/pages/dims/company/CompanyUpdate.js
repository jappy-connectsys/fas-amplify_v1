import React, { useEffect, useState } from 'react'
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
  CRow,
  CHeader,
  CHeaderText,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { selectUser } from './../../../../store/reducers/users';
import { selectCompanies, selectCompanyId, updateCompany } from './../../../../store/reducers/companySlice';
import { selectCurrencies } from '../../../../store/reducers/references/currencySlice';
import { selectCountries } from '../../../../store/reducers/references/countrySlice';
import { selectPaymentTerms } from '../../../../store/reducers/references/paymenttermSlice';
import { selectPostingGroups } from '../../../../store/reducers/references/pstgroupSlice';
import { selectPaymentModes } from '../../../../store/reducers/references/paymentmodeSlice';


const CompanyUpdate = () => {

   //Get initial data
   const dispatch = useDispatch();
   const navigate = useNavigate();

   //Get router params
   const {id} = useParams();
   const { user } = useSelector(selectUser);
   const { status, error } = useSelector(selectCompanies);
   const data = useSelector((state) => selectCompanyId(state, Number(id)));

   const logged = user ? user.first_name : 'anonymous';

   /* Load Selection Options */
   const { pstgroupData } = useSelector(selectPostingGroups);
   const { currenciesData } = useSelector(selectCurrencies);
   const { countriesData } = useSelector(selectCountries);
   const { ptermsData } = useSelector(selectPaymentTerms);
   const { pmodesData } = useSelector(selectPaymentModes);

   //Set Fields
   const [company_name, setCompanyName] = useState(data?.company_name);
   const [company_short_name, setCompanyShortName] = useState(data?.company_short_name);
   const [email, setEmail] = useState(data?.email);
   const [phone_number, setPhoneNumber] = useState(data?.phone_number);
   const [mobile_number, setMobileNumber] = useState(data?.mobile_number);
   const [address1, setAddress1] = useState(data?.address1);
   const [address2, setAddress2] = useState(data?.address2);
   const [country_abbr, setCountry] = useState(data?.country_abbr);
   const [city, setCity] = useState(data?.city);
   const [province, setProvince] = useState(data?.province);
   const [post_code, setPostCode] = useState(data?.post_code);
   const [website, setWebsite] = useState(data?.website);
   const [tax_identification_number, setTin] = useState(data?.tax_identification_number);
   const [currency_code, setCurrencyCode] = useState(data?.currency_code);
   const [business_posting_group, setBusinessPostingGroup] = useState(data?.business_posting_group);
   const [vat_posting_group, setVatPostingGroup] = useState(data?.vat_posting_group);
   const [customer_posting_group, setCustomerPostingGroup] = useState(data?.customer_posting_group);
   const [contact_person_first_name, setContactFirstName] = useState(data?.contact_person_first_name);
   const [contact_person_last_name, setContactLastName] = useState(data?.contact_person_last_name);
   const [payment_terms, setPaymentTerms] = useState(data?.payment_terms);
   const [payment_mode, setPaymentMode] = useState(data?.payment_mode);
   const [companyStatus, setCompanyStatus] = useState(data?.companyStatus);
   const [created_by, setCreatedBy] = useState(logged);
   const [updated_by, setUpdatedBy] = useState(logged);
   const [date_created, setDateCreated] = useState(data?.date_created);

   //Form validation 
   const [validated, setValidated] = useState(false);
   const [updated, setUpdated] = useState(false);
   const [requestStatus, setRequestStatus] = useState('idle');

   const canSave = [company_name, address1, city, post_code, tax_identification_number, contact_person_first_name, contact_person_last_name].every(Boolean) && requestStatus === 'idle';

   console.log({canSave, logged, company_name, address1, city, post_code, tax_identification_number, contact_person_first_name, contact_person_last_name});
   
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
            dispatch(updateCompany({
               company_id: id, 
               company_name,
               company_short_name,
               email,
               phone_number,
               mobile_number,
               address1,
               address2,
               country_abbr,
               city,
               province,
               post_code,
               website,
               tax_identification_number,
               currency_code,
               business_posting_group,
               vat_posting_group,
               customer_posting_group,
               contact_person_first_name,
               contact_person_last_name,
               payment_terms,
               payment_mode,
               status: companyStatus,
               created_by,
               updated_by,
               date_created,
               date_updated: new Date().toISOString(),
               })).unwrap()
      
               setCompanyName('');
               setCompanyShortName('');
               setEmail('');
               setPhoneNumber('');
               setMobileNumber('');
               setAddress1('');
               setAddress2('');
               setCountry('');
               setCity('');
               setProvince('');
               setPostCode('');
               setWebsite('');
               setTin('');
               setCurrencyCode('');
               setBusinessPostingGroup('');
               setVatPostingGroup('');
               setCustomerPostingGroup('');
               setContactFirstName('');
               setContactLastName('');
               setPaymentTerms('');
               setPaymentMode('');
               setCompanyStatus('');
               
               setUpdated(true);
               navigate(`/company/${id}`);
            
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
      navigate('/companies');
   }

   return (
      <CRow>
      <CCol xs={12}>
      <CCard className="mb-4">
         <CCardHeader>
            <strong>COMPANY DETAILS </strong> <small></small>
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
                        label="Company Name"
                        type="text"
                        id="company_name"
                        defaultValue={company_name}
                        onChange={(e) => setCompanyName(e.target.value)} 
                        feedbackValid="Looks good!"
                        required
                     />
                  </CCol>
                  <CCol md={3}>
                     <CFormInput
                        label="Company Short Name"
                        type="text"
                        id="company_short_name"
                        defaultValue={company_short_name}
                        onChange={(e) => setCompanyShortName(e.target.value)} 
                        feedbackValid="Looks good!"
                     />
                  </CCol>
                  <CCol md={3}>
                     <CFormSelect 
                     id="companyStatus"
                     label="Status" 
                     defaultValue={companyStatus} 
                     onChange={(e) => setCompanyStatus(e.target.value)} 
                     required>
                        <option>active</option>
                        <option>deleted</option>
                     </CFormSelect>
                  </CCol>
               </CRow>
               <CRow xs={{ gutterY: 2 }}>    
                  <CCol md={4}>
                     <CFormInput
                        label="Email"
                        type="text"
                        id="email"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        feedbackValid="Looks good!"
                        required
                     />
                     <CFormFeedback valid>Looks good!</CFormFeedback>
                  </CCol>
                  <CCol md={4}>
                     <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
                     <CInputGroup className="has-validation">
                        <CInputGroupText id="inputGroupPrepend">+63</CInputGroupText>
                        <CFormInput
                        type="text"
                        id="phone_number"
                        defaultValue={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        aria-describedby="inputGroupPrepend"
                        required
                        />
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                     </CInputGroup>
                  </CCol>
                  <CCol md={4}>
                     <CFormLabel htmlFor="mobileNumber">Mobile Number</CFormLabel>
                     <CInputGroup className="has-validation">
                        <CInputGroupText id="inputGroupPrepend">+63</CInputGroupText>
                        <CFormInput
                        type="text"
                        id="mobile_number"
                        defaultValue={mobile_number}
                        onChange={(e) => setMobileNumber(e.target.value)} 
                        feedbackValid="Looks good!"
                        required
                        />
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                     </CInputGroup>
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
                        id={post_code}
                        defaultValue={post_code}
                        feedbackInvalid="Please provide a valid post code."
                        feedbackValid="Looks good!"
                        onChange={(e) => setPostCode(e.target.value)}
                        required
                     />
                  </CCol>
               </CRow>
            
               <CRow xs={{ gutterY: 2 }}>
                  <CCol md={6}>
                     <CFormInput 
                        label="Website"
                        type="text" 
                        id="website" 
                        defaultValue={website} 
                        placeholder="https://"
                     />
                     <CFormFeedback valid></CFormFeedback>
                  </CCol>
               </CRow>

               <CRow xs={{ gutterY: 4 }}> 
                  <CCol md={12} className="bg-light p-3">
                     <CHeaderText className="header-brand mb-0 h3">Terms</CHeaderText>
                  </CCol>
                  <CCol md={4}>
                     <CFormInput 
                        id="contact_first_name"
                        label="Contact Person First name" 
                        placeholder="First Name"
                        type="text" 
                        defaultValue={contact_person_first_name}
                        onChange={(e) => setContactFirstName(e.target.value)}
                        required
                     />
                  </CCol>
                  <CCol md={4}>
                     <CFormInput 
                        id="contact_last_name"
                        label="Contact Person Last name" 
                        placeholder="Last Name"
                        type="text" 
                        defaultValue={contact_person_last_name} 
                        onChange={(e) => setContactLastName(e.target.value)}
                        required
                     />
                  </CCol>
                  <CCol md={4}>
                     <CFormLabel htmlFor="tin">TIN</CFormLabel>
                     <CFormInput
                        type="text"
                        id="tax_identification_number"
                        defaultValue={tax_identification_number}
                     />
                  </CCol>
               </CRow>
               <CRow xs={{ gutterY: 2 }}> 
                  <CCol md={4}>
                     <CFormSelect 
                        id="currency_code"
                        name="currency_code"
                        onChange={(e) => setCurrencyCode(e.target.value)}
                        label="Currency Code"
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
                        id="payment_terms" 
                        name="Payment Terms" 
                        onChange={(e) => setPaymentTerms(e.target.value)}
                        label="Payment Terms"
                        defaultValue={payment_terms}
                        options={
                           ptermsData.map(filteredName => (
                              { 'label': filteredName.payment_terms, 'value': filteredName.payment_terms }
                           ))
                        }
                     />
                  </CCol>
                  <CCol md={4}>
                     <CFormSelect 
                        id="payment_mode" 
                        name="payment_mode"
                        onChange={(e) => setPaymentMode(e.target.value)}
                        label="Payment Mode"
                        defaultValue={payment_mode}
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
                     <CHeaderText className="header-brand mb-0 h3">Posting Group</CHeaderText>
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

export default CompanyUpdate;