import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CHeader,
  CHeaderText,
  CDatePicker,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateAccount, selectAccounts, selectAccountId, selectAccountProfile } from './../../../../store/reducers/accountSlice';
import { selectUser } from './../../../../store/reducers/users';

const UserUpdate = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get router params
  const {id} = useParams();
  
  const { user } = useSelector(selectUser);
  const { status, error } = useSelector(selectAccounts);
  const data = useSelector((state) => selectAccountId(state, Number(id)));
  const profile = useSelector((state) => selectAccountProfile(state, Number(data.id)));
  
  
  const logged = user ? user.first_name : 'anonymous';

  console.log({user, data, profile})

  //Set Fields
  const [first_name, setFirstName] = useState(data?.first_name);
  const [last_name, setLastName] = useState(data?.last_name);
  const [email, setEmail] = useState(data?.email);
  const [password, setPassword] = useState(data?.password);
  const [location, setLocation] = useState(data?.location);
  const [title, setTitle] = useState(data?.title);
  const [avatar, setAvatar] = useState(data?.avatar);
  const [role, setRole] = useState(data?.role);


  const [app_module, setAppModule] = useState(data?.role);
  const [task_description, setTaskDescription] = useState(data?.role);

  //Form validation 
  const [validated, setValidated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [dataRecord, setDataRecord] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');
  const canSave = [first_name, email].every(Boolean) && requestStatus === 'idle';

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
          dispatch(updateAccount({   
                id,
                first_name,
                last_name,
                email,
                password,
                location,
                title,
                avatar,
                role
              })).unwrap();
  
              
              setFirstName('');
              setLastName('');
              setEmail('');
              setPassword('');
              setLocation('');
              setTitle('');
              setAvatar('');
              setRole('');
              
              setUpdated(true)
              
              navigate(`/account/${id}`)
  
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
      dispatch(updateAccount({id, status: 'deleted'}));
      navigate('/account/'+id);
      window.location.reload(true);
    }
  };

  const handleBack = () => {
    return navigate('/accounts');
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
                 label="First Name" 
                 type="text"
                 id="first_name"
                 feedbackValid="Looks good!"
                 defaultValue={first_name}
                 onChange={(e) => setFirstName(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={4}>
              <CFormInput
                 label="Last Name" 
                 type="text"
                 id="last_name"
                 feedbackValid="Looks good!"
                 defaultValue={first_name}
                 onChange={(e) => setLastName(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={4}>
              <CFormInput
                 label="Email" 
                 type="text"
                 id="email"
                 feedbackValid="Looks good!"
                 defaultValue={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
               />
             </CCol>
            </CRow>

            <CRow xs={{ gutterY: 4 }}>
             <CCol md={12} className="bg-light p-3">
              <CHeaderText className="header-brand mb-0 h3">Other Details</CHeaderText>
             </CCol>
             <CCol md={4}>
              <CFormInput
                 label="Role" 
                 type="text"
                 id="role"
                 feedbackValid="Looks good!"
                 defaultValue={role}
                 onChange={(e) => setRole(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={4}>
              <CFormInput
                 label="App Module" 
                 type="text"
                 id="app_module"
                 feedbackValid="Looks good!"
                 defaultValue={role}
                 onChange={(e) => setAppModule(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={6}>
              <CFormTextarea
                  id="task"
                  label="task"
                  rows="5"
                  text="Task description"
                  onChange={(e) => setTaskDescription(e.target.value)}
                  defaultValue={task_description}
                ></CFormTextarea>
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

export default UserUpdate
