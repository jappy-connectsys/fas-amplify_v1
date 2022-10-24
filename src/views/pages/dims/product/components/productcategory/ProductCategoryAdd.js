import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
} from '@coreui/react-pro';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../../../../../store/reducers/users';

const ProductCategoryAdd = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(selectUser);
  
  const logged = user ? user.first_name : 'anonymous';

  //Set Fields
  const [category, setCategory] = useState('');
  const [sub_category, setSubCategory] = useState('');
  const [date_created, setDateCreated] = useState(new Date().toISOString());
  const [date_updated, setDateUpdated] = useState(new Date().toISOString());
  const [created_by, setCreatedBy] = useState(logged);
  const [updated_by, setUpdatedBy] = useState(logged);
  const [productCategoryStatus, setProductCategoryStatus] = useState('active');

  //Form validation 
  const [validated, setValidated] = useState(false);
  const [updated, setUpdated] = useState(false);
  
  const [requestStatus, setRequestStatus] = useState('idle');
  const canSave = [category, sub_category].every(Boolean) && requestStatus === 'idle';

  //Submit Form
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (canSave) {
      try {
        setRequestStatus('pending');
        dispatch(createProductCategory({   
            category,
            sub_category,
            date_created,
            created_by,
            date_updated,
            updated_by,
            status: productCategoryStatus,
          })).unwrap();

          setCategory('');
          setSubCategory('');
          setDateCreated('');
          setCreatedBy('');
          setDateUpdated('');
          setUpdatedBy('');
          setProductCategoryStatus('');

          setUpdated(true);
          //navigate(`/productcategories`);
          
      } catch (err) {
          console.error('Failed to save the post', err)
      } finally {
          setRequestStatus('idle');
      }
    }
    setValidated(true);
    onSavePostClicked();
  }

  const handleBack = () => {
    return navigate('/productcategories');
  }

  return (
    <CRow>
     <CCol xs={12}>
       <CCard className="mb-4">
         <CCardHeader>
          <CHeaderText className="header-brand mb-0 h1">Add Product Category</CHeaderText>
         </CCardHeader>
         <CCardBody>
           <CForm className="row g-3"
             onSubmit={handleSubmit}
           >  
            <CRow xs={{ gutterY: 2 }}>
             <CCol md={6}>
              <CFormInput
                 label="Category *" 
                 type="text"
                 id="category"
                 onChange={(e) => setCategory(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={6}>
              <CFormInput
                 label="Sub-Category *" 
                 type="text"
                 id="sub_category"
                 onChange={(e) => setSubCategory(e.target.value)}
                 required
               />
             </CCol>
            </CRow>

            <CRow xs={{ gutterY: 5 }}>
             <CCol md={3}>
               <CFormInput
                 label="Created By" 
                 type="text"
                 id="created_by"
                 value={created_by}
                 disabled
               />
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Date Created" 
                 type="text"
                 id="date_created"
                 value={date_created}
                 disabled
               />
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Updated By" 
                 type="text"
                 id="created_by"
                 defaultValue={created_by}
                 disabled
               />
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Date Updated" 
                 type="text"
                 id="date_created"
                 defaultValue={date_updated}
                 disabled
               />
             </CCol>
            </CRow> 

            <CRow xs={{ gutterY: 4 }} className="justify-content-end">
              <CCol xs={12}>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton 
                      color="light" 
                      type="button"
                      onClick={handleBack}
                    >
                      Back
                    </CButton>
                    <CButton 
                      color="dark" 
                      type="submit"
                      //disabled={!canSave}
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

export default ProductCategoryAdd
