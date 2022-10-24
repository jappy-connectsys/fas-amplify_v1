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
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
//import { updateCountry, selectCountryId } from './../../../../store/reducers/references/countrySlice';
import { selectUser } from './../../../../store/reducers/users';

const CountryUpdate = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get router params
  const {id} = useParams();
  
  const { user } = useSelector(selectUser);
  const countryData = useSelector((state) => selectCountryId(state, Number(id)));
  
  const logged = user ? user.first_name : 'anonymous';

  console.log({countryData})

  //Set Fields
  const [country_abbr, setCountryAbbr] = useState(data?.country_abbr);
  const [country, setCountry] = useState(data?.country);
  const [country_code, setCountryCode] = useState(data?.country_code);
  const [date_updated, setDateUpdated] = useState(data?.date_updated);
  const [updated_by, setUpdatedBy] = useState(data?.updated_by);
  const [countryStatus, setCountryStatus] = useState(data?.status);

  //Form validation 
  const [validated, setValidated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [dataRecord, setDataRecord] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');
  const canSave = [country_abbr, country, country_code].every(Boolean) && requestStatus === 'idle';

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
          dispatch(updateCountry({   
                country_abbr,
                country,
                country_code,
                date_updated,
                updated_by,
                status: countryStatus,
              })).unwrap();
              
              setCountryAbbr('');
              setCountry('');
              setCountryCode('');
              setDateUpdated('');
              setUpdatedBy('');
              setCountryStatus('');
              
              setUpdated(true)
              
              navigate(`/country/${id}`)
  
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
    if (window.confirm("Are you sure you want to delete this country "+ id + "?")) {
      dispatch(updateCountry({id, status: 'deleted'}));
      navigate('/countries');
      window.location.reload(true);
    }
  };

  const handleBack = () => {
    return navigate('/countries');
  }

  return (
    <CRow>
     <CCol xs={12}>
       <CCard className="mb-4">
         <CCardHeader>
          <CHeaderText className="header-brand mb-0 h1">Account ID: {id}</CHeaderText>
         </CCardHeader>
         <CCardBody>
           <CForm className="row g-3 needs-validation"
             noValidate
             validated={validated}
             onSubmit={handleSubmit}
           >
            <CRow xs={{ gutterY: 2 }}>
             <CCol md={4}>
              <CFormInput
                 label="Countr Abbr" 
                 type="text"
                 id="country_abbr"
                 defaultValue={country_abbr}
                 onChange={(e) => setCountryAbbr(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={4}>
              <CFormInput
                 label="Country" 
                 type="text"
                 id="country"
                 defaultValue={country}
                 onChange={(e) => setCountry(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={4}>
              <CFormInput
                 label="Country Code" 
                 type="text"
                 id="country_code"
                 defaultValue={country_code}
                 onChange={(e) => setEmail(e.target.value)}
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

export default CountryUpdate
