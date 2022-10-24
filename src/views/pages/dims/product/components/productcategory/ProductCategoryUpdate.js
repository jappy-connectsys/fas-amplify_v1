import React, { useEffect, useState } from 'react'
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
  CDatePicker,
  CFormSelect
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProductCategory, selectProductCategoryId } from '../../../../../../store/reducers/productCategorySlice';
import { selectUser } from '../../../../../../store/reducers/users';

const ProductCategoryUpdate = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get router params
  const {id} = useParams();
  
  const { user } = useSelector(selectUser);
  const data = useSelector((state) => selectProductCategoryId(state, Number(id)));
  
  const logged = user ? user.first_name : 'anonymous';

  const category_id = data?.category_id;
  const date_created = data?.date_created;
  const created_by= data?.created_by;

  //Set Fields
  const [category, setCategory] = useState(data?.category);
  const [sub_category, setSubCategory] = useState(data?.sub_category);
  const [date_updated, setDateUpdated] = useState(data?.date_updated);
  const [updated_by, setUpdatedBy] = useState(logged);
  const [productCategoryStatus, setProductCategoryStatus] = useState(data?.status);

  //Form validation 
  const [validated, setValidated] = useState(false);
  const [updated, setUpdated] = useState(false);
  
  const [requestStatus, setRequestStatus] = useState('idle');
  const canSave = [category, sub_category].every(Boolean) && requestStatus === 'idle';

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
          dispatch(updateProductCategory({   
                category_id: id,
                category,
                sub_category,
                date_updated,
                updated_by,
                status: productCategoryStatus,
              })).unwrap();
  
              
              setCategory('');
              setSubCategory('');
              setDateUpdated('');
              setUpdatedBy('');
              setProductCategoryStatus('');

              
              setUpdated(true)
              
              navigate(`/productcategory/${id}`)
  
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
    if (window.confirm("Are you sure you want to delete this productcategory "+ id + "?")) {
      dispatch(updateProductCategory({category_id: id, status: 'deleted'}));
      navigate('/productcategory/'+id);
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
          <CHeaderText className="header-brand mb-0 h1">Product Category: {id}</CHeaderText>
         </CCardHeader>
         <CCardBody>
           <CForm className="row g-3 needs-validation"
             noValidate
             validated={validated}
             onSubmit={handleSubmit}
           >  
            <CRow xs={{ gutterY: 2 }}>
             <CCol md={6}>
              <CFormInput
                 label="Category *" 
                 type="text"
                 id="category"
                 defaultValue={category}
                 onChange={(e) => setCategory(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={6}>
              <CFormInput
                 label="Sub-Category *" 
                 type="text"
                 id="sub_category"
                 defaultValue={sub_category}
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
                 defaultValue={data?.created_by}
                 disabled
               />
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Date Created" 
                 type="text"
                 id="date_created"
                 defaultValue={data?.date_created}
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
                      color="danger"
                      type="button"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </CButton>
                    <CButton 
                      color="info" 
                      type="submit"
                      //disabled={!canSave}
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

export default ProductCategoryUpdate
