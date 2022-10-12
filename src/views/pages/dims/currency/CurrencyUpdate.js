import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CHeaderText,
  CFormSelect
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCurrency, selectCurrencyId } from './../../../../store/reducers/references/currencySlice';
import { selectUser } from './../../../../store/reducers/users';

const CurrencyUpdate = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get router params
  const {id} = useParams();
  
  const { user } = useSelector(selectUser);
  const data = useSelector((state) => selectCurrencyId(state, id));
  
  const logged = user ? user.first_name : 'anonymous';

  console.log(data);

  //Set Fields
  const [currency_code, setCurrencyCode] = useState(data?.currency_code);
  const [country, setCountry] = useState(data?.country);
  const [currency_description, setCurrencyDescription] = useState(data?.currency_description);
  const [currencyStatus, setCurrencyStatus] = useState(data?.status);

  //Form validation 
  const [validated, setValidated] = useState(false);
  const [updated, setUpdated] = useState(false);
  
  const [requestStatus, setRequestStatus] = useState('idle');
  const canSave = [currency_code, country].every(Boolean) && requestStatus === 'idle';

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
          dispatch(updateCurrency({   
                currency_code: id,
                country,
                description: currency_description,
                status: currencyStatus,
              })).unwrap();
  
              
              setCurrencyCode('');
              setCountry('');
              setCurrencyDescription('');
              setCurrencyStatus('');

              
              setUpdated(true)
              
              navigate(`/currency/${id}`)
  
        } catch (err) {
          console.error('Failed to save the post', err)
        } finally {
          setRequestStatus('idle');
        }
      }
    }
    setValidated(true);
    onSavePostClicked();
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this account "+ id + "?")) {
      dispatch(updateCurrency({currency_code: id, status: 'deleted'}));
      navigate('/currency/'+id);
      window.location.reload(true);
    }
  };

  const handleBack = () => {
    return navigate('/currencies');
  }

  return (
    <CRow>
     <CCol xs={12}>
       <CCard className="mb-4">
         <CCardHeader>
          <CHeaderText className="header-brand mb-0 h1">Currency: {id}</CHeaderText>
         </CCardHeader>
         <CCardBody>
           <CForm className="row g-3 needs-validation"
             noValidate
             validated={validated}
             onSubmit={handleSubmit}
           >

            <CRow xs={{ gutterY: 3 }}>
              <CCol md={9}></CCol>
              <CCol md={3}>
                  <CFormSelect 
                  id="currencyStatus"
                  label="Status" 
                  defaultValue={currencyStatus} 
                  onChange={(e) => setCurrencyStatus(e.target.value)} 
                  required>
                    <option>active</option>
                    <option>deleted</option>
                  </CFormSelect>
              </CCol>
            </CRow>
              
            <CRow xs={{ gutterY: 2 }}>
             <CCol md={3}>
              <CFormInput
                 label="Currency Code" 
                 type="text"
                 id="currency_code"
                 feedbackValid="Looks good!"
                 defaultValue={currency_code}
                 onChange={(e) => setCurrencyCode(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Country" 
                 type="text"
                 id="country"
                 feedbackValid="Looks good!"
                 defaultValue={country}
                 onChange={(e) => setCountry(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={6}>
              <CFormInput
                 label="Currency Description" 
                 type="text"
                 id="currency_description"
                 feedbackValid="Looks good!"
                 defaultValue={currency_description}
                 onChange={(e) => setCurrencyDescription(e.target.value)}
                 required
               />
             </CCol>
            </CRow>

            
            <CRow xs={{ gutterY: 4 }} className="justify-content-end">
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

export default CurrencyUpdate
