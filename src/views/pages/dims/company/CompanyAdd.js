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
import { selectCompanies, selectCompanyId, createCompany } from './../../../../store/reducers/companySlice';
import { selectCurrencies } from '../../../../store/reducers/currencySlice';
import { selectCountries } from '../../../../store/reducers/countrySlice';
import { selectPaymentTerms } from '../../../../store/reducers/paymenttermSlice';
import { selectPostingGroups } from '../../../../store/reducers/pstgroupSlice';
import { selectPaymentModes } from '../../../../store/reducers/paymentmodeSlice';


const CompanyAdd = () => {

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
   const [company_name, setCompanyName] = useState('');
   const [company_short_name, setCompanyShortName] = useState('');
   const [email, setEmail] = useState('');
   const [phone_number, setPhoneNumber] = useState('');
   const [mobile_number, setMobileNumber] = useState('');
   const [address1, setAddress1] = useState('');
   const [address2, setAddress2] = useState('');
   const [country_abbr, setCountry] = useState('');
   const [city, setCity] = useState('');
   const [province, setProvince] = useState('');
   const [post_code, setPostCode] = useState('');
   const [website, setWebsite] = useState('');
   const [tax_identification_number, setTin] = useState('');
   const [currency_code, setCurrencyCode] = useState('');
   const [business_posting_group, setBusinessPostingGroup] = useState('');
   const [vat_posting_group, setVatPostingGroup] = useState('');
   const [customer_posting_group, setCustomerPostingGroup] = useState('');
   const [contact_person_first_name, setContactFirstName] = useState('');
   const [contact_person_last_name, setContactLastName] = useState('');
   const [payment_terms, setPaymentTerms] = useState('');
   const [payment_mode, setPaymentMode] = useState('');
   const [companyStatus, setCompanyStatus] = useState('active');
   const [created_by, setCreatedBy] = useState(logged);
   const [updated_by, setUpdatedBy] = useState(logged);
   const [date_created, setDateCreated] = useState(new Date().toISOString());
   const [date_updated, setDateUpdated] = useState(new Date().toISOString());

   //Form validation 
   const [validated, setValidated] = useState(false);
   const [updated, setUpdated] = useState(false);
   const [requestStatus, setRequestStatus] = useState('idle');

   const canSave = [company_name, address1, city, country_abbr, post_code, tax_identification_number, contact_person_first_name, contact_person_last_name].every(Boolean) && requestStatus === 'idle';

   console.log({canSave, logged, company_name, address1, city, country_abbr, post_code, tax_identification_number, contact_person_first_name, contact_person_last_name});
   
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
            dispatch(createCompany({
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
               companyStatus,
               status: companyStatus,
               created_by,
               updated_by,
               date_created,
               date_updated
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
               navigate(`/companies`);
            
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
               <CRow xs={{ gutterY: 1 }}>
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
                        <option>pending</option>
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
                        feedbackInvalid="Please provide a city"
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
                        feedbackInvalid="Please select a country" 
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
                  <CCol md={3}>
                     <CFormLabel htmlFor="tin">TIN</CFormLabel>
                     <CFormInput
                        type="text"
                        id="tax_identification_number"
                        defaultValue={tax_identification_number}
                        feedbackInvalid="Please provide a valid TIN."
                        required
                     />
                  </CCol>

               </CRow>

               <CRow xs={{ gutterY: 4 }}> 
                  <CCol md={8}>
                     <CInputGroup>
                        <CInputGroupText>Contact Person</CInputGroupText>
                        <CFormInput 
                           id="contact_first_name"
                           aria-label="First name" 
                           placeholder="First Name"
                           feedbackInvalid="Please provide contact person first name" 
                           type="text" 
                           defaultValue={contact_person_first_name}
                           onChange={(e) => setContactFirstName(e.target.value)}
                           required
                        />
                        <CFormInput 
                           id="contact_last_name"
                           aria-label="Last name" 
                           placeholder="Last Name"
                           feedbackInvalid="Please provide contact person last name" 
                           type="text" 
                           defaultValue={contact_person_last_name} 
                           onChange={(e) => setContactLastName(e.target.value)}
                           required
                        />
                     </CInputGroup>
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
               <CRow xs={{ gutterY: 2 }}>
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

export default CompanyAdd;