import React, { useState, useRef } from 'react'
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
  CFormTextarea,
  CRow,
  CHeaderText,
  CDatePicker,
  CPopover,
  CToaster,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppPopper, AppToast } from './../../../../components';

import { selectUser } from './../../../../store/reducers/users';
import { updateProduct, selectProductId } from './../../../../store/reducers/productSlice';
import { selectPostingGroups } from '../../../../store/reducers/references/pstgroupSlice';
import { selectProductCategories } from '../../../../store/reducers/references/productCategorySlice';



const ProductUpdate = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Toast
  const [toast, addToast] = useState(0);
  const toaster = useRef();

  const toastAlertMsg = () => (
    <AppToast pagename={'Product Update'} message={`Details successfully updated!`}/>
  );

  //Get router params
  const {id} = useParams();
  
  const { user } = useSelector(selectUser);
  const data = useSelector((state) => selectProductId(state, Number(id)));

  const logged = user ? user.first_name : 'anonymous';

  /* Load Selection Options */
  const { pstgroupData } = useSelector(selectPostingGroups);
  const { pcategoryData } = useSelector(selectProductCategories);

  //Set Fields
  const company_id = '1'; //options on company dim
  const [cs_product_id, setCsProductId] = useState(data?.cs_product_id);
  const [product_name, setProductName] = useState(data?.product_name);
  const [upc, setUpc] = useState(data?.upc);
  const [upc_barcode, setUpcBarcode] = useState(data?.upc_barcode);
  const [sku, setSku] = useState(data?.sku_barcode);
  const [sku_barcode, setSkuBarcode] = useState(data?.sku_barcode);
  const [category, setCategory] = useState(data?.category);
  const [sub_category, setSubCategory] = useState(data?.sub_category);
  const [uom, setUom] = useState(data?.uom);
  const [size, setSize] = useState(data?.size);
  const [packaging_length, setPackagingLength] = useState(data?.packaging_length);
  const [packaging_width, setPackagingWidth] = useState(data?.packaging_width);
  const [packaging_height, setPackagingHeight] = useState(data?.packaging_height);
  const [net_weight, setNetWeight] = useState(data?.net_weight);
  const [gross_weight, setGrossWeight] = useState(data?.gross_weight);
  const [ingredients, setIngredients] = useState(data?.ingredients);
  const [nutrition_facts, setNutritionFacts] = useState(data?.nutrition_facts);
  const [unit_type, setUnitType] = useState(data?.unit_type);
  const [qty_per_unit, setQtyPerUnit] = useState(data?.qty_per_unit);
  const [eff_start_date, setEffStartDate] = useState(data?.eff_start_date);
  const [eff_end_date, setEffEndDate] = useState(data?.eff_end_date);
  const [inventory_posting_group, setInventoryPostingGroup] = useState(data?.inventory_posting_group);
  const [gen_posting_group, setGenPostingGroup] = useState(data?.gen_posting_group);
  const [input_vat_posting_group, setInputVatPostingGroup] = useState(data?.input_vat_posting_group);
  const [output_vat_posting_group, setOutputVatPostingGroup] = useState(data?.output_vat_posting_group);
  const [productStatus, setProductStatus] = useState(data?.status);
  const [updated_by, setUpdatedBy] = useState(logged);
  const [date_updated, setDateUpdated] = useState(new Date().toISOString());
  
  //Form validation 
  const [validated, setValidated] = useState(false);
  const [updated, setUpdated] = useState(false);
  
  const [requestStatus, setRequestStatus] = useState('idle');
  const canSave = [company_id, product_name].every(Boolean) && requestStatus === 'idle';
  

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
          dispatch(updateProduct({   
                product_id: id, 
                company_id,
                cs_product_id,
                upc_barcode,
                sku_barcode,
                category,
                sub_category,
                uom,
                size,
                packaging_length,
                packaging_width,
                packaging_height,
                net_weight,
                gross_weight,
                ingredients,
                nutrition_facts,
                unit_type,
                qty_per_unit,
                inventory_posting_group,
                gen_posting_group,
                input_vat_posting_group,
                output_vat_posting_group,
                status: productStatus,
                updated_by,
                date_updated,
              })).unwrap()
  
              setCsProductId('');
              setUpcBarcode('');
              setSkuBarcode('');
              setCategory('');
              setSubCategory('');
              setUom('');
              setSize('');
              setPackagingLength('');
              setPackagingWidth('');
              setPackagingHeight('');
              setNetWeight('');
              setGrossWeight('');
              setIngredients('');
              setNutritionFacts('');
              setUnitType('');
              setQtyPerUnit('');
              setEffEndDate('');
              setInventoryPostingGroup('');
              setGenPostingGroup('');
              setInputVatPostingGroup('');
              setOutputVatPostingGroup('');
              setProductStatus('');
              setDateUpdated('');
              setUpdatedBy('');
              
              setUpdated(true)
              //navigate(`/product/${id}`)
  
        } catch (err) {
          console.error('Failed to save the post', err)
        } finally {
          setRequestStatus('idle');
        }
      }
    }
    setValidated(true);
    //window.location.reload(true);
    addToast(toastAlertMsg);
    onSavePostClicked();
  }

  const handleBack = () => {
    return navigate('/products');
  }

  // Popper
  const [deletingItem, setDeletingItem] = useState(false)
  const [popper, setPopper] = useState(false)

  const canDelete = data?.status === 'deleted';

  const handleSubmitPopper = (id) => {
    const payload = {
      product_id: id, 
      status: 'deleted'
    }
    dispatch(updateProduct(payload)).then(() => {
      setPopper(0);
      navigate('/product/'+id);
      window.location.reload(true);
    });
  }

  const handleClosePopper = () => {
    setPopper(0);
    console.log(popper);
  }

  const handleOpenTriggerPopper = (id) => {
    setPopper(id);
  }

  return (
    <CRow>
     <CCol xs={12}>
       <CCard className="mb-4">
         <CCardHeader>
          <CHeaderText className="header-brand mb-0 h1">Product ID: {id}</CHeaderText>
         </CCardHeader>
         <CCardBody>
           <CForm className="row g-3 needs-validation"
             noValidate
             validated={validated}
             onSubmit={handleSubmit}
           >
            <CRow xs={{ gutterY: 2 }}>
             <CCol md={7}>
              <CFormInput
                 label="Product Name" 
                 type="text"
                 id="product_name"
                 feedbackValid="Looks good!"
                 defaultValue={product_name}
                 disabled
               />
             </CCol>
             <CCol md={2}>
              <CFormInput
                 label="CS Cart Product ID" 
                 type="text"
                 id="cs_Product_id"
                 feedbackValid="Looks good!"
                 defaultValue={cs_product_id}
                 onChange={(e) => setCsProductId(e.target.value)}
                 required
               />
             </CCol>
            </CRow>

            <CRow xs={{ gutterY: 1 }}>
            <CCol md={4}>
             <CFormSelect
               label="Category *"
               id="category"
               defaultValue={category}
               onChange={(e) => setCategory(e.target.value)}
               >
                  <option>-- Select Category --</option>
                  { pcategoryData.map(filteredName => (
                    <option key={filteredName.category_id}>{filteredName.category}</option>
                  ))
                }
              </CFormSelect>
            </CCol>
            <CCol md={4}>
              <CFormSelect
               label="Sub-Category *"
               id="sub-category"
               defaultValue={sub_category}
               onChange={(e) => setSubCategory(e.target.value)}
               >
                  <option>-- Select Sub-Category --</option>
                  { pcategoryData.map(filteredName => (
                    <option key={filteredName.category_id}>{filteredName.sub_category}</option>
                  ))
                }
              </CFormSelect>
             </CCol>
             <CCol md={4}>
              <CFormInput
                 label="UOM" 
                 type="text"
                 id="uom"
                 defaultValue={uom}
                 onChange={(e) => setUom(e.target.value)}
               />
             </CCol>
            </CRow>

            <CRow xs={{ gutterY: 2 }}>
             <CCol md={3}>
              <CFormInput
                 label="UPC *" 
                 type="text"
                 id="upc"
                 defaultValue={upc}
                 disabled
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="UPC Barcode" 
                 type="text"
                 id="upc_barcode"
                 defaultValue={upc_barcode}
                 onChange={(e) => setUpcBarcode(e.target.value)}
               />
             </CCol>
            </CRow>

            <CRow xs={{ gutterY: 2 }}>
             <CCol md={3}>
              <CFormInput
                 label="SKU *" 
                 type="text"
                 id="sku"
                 defaultValue={sku}
                 disabled
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="SKU Barcode" 
                 type="text"
                 id="sku_barcode"
                 feedbackValid="Looks good!"
                 defaultValue={sku_barcode}
                 onChange={(e) => setSkuBarcode(e.target.value)}
               />
             </CCol>
            </CRow>

            <CRow xs={{ gutterY: 4 }}>
             <CCol md={12} className="bg-light p-3">
              <CHeaderText className="header-brand mb-0 h3">Packaging Details</CHeaderText>
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Packaging Length" 
                 type="text"
                 id="packaging_length"
                 feedbackValid="Looks good!"
                 defaultValue={packaging_length}
                 onChange={(e) => setPackagingLength(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Packaging Width" 
                 type="text"
                 id="packaging_width"
                 feedbackValid="Looks good!"
                 defaultValue={packaging_width}
                 onChange={(e) => setPackagingWidth(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Packaging Height" 
                 type="text"
                 id="packaging_height"
                 feedbackValid="Looks good!"
                 defaultValue={packaging_height}
                 onChange={(e) => setPackagingHeight(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Size" 
                 type="text"
                 id="size"
                 feedbackValid="Looks good!"
                 defaultValue={size}
                 onChange={(e) => setSize(e.target.value)}
               />
             </CCol>
            </CRow>

            <CRow xs={{ gutterY: 1 }}>
             <CCol md={3}>
              <CFormInput
                 label="Net Weight" 
                 type="text"
                 id="net_weight"
                 feedbackValid="Looks good!"
                 defaultValue={net_weight}
                 onChange={(e) => setNetWeight(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Gross Weight" 
                 type="text"
                 id="gross_weight"
                 feedbackValid="Looks good!"
                 defaultValue={gross_weight}
                 onChange={(e) => setGrossWeight(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Unit Type *" 
                 type="text"
                 id="unit_type"
                 feedbackValid="Looks good!"
                 defaultValue={unit_type}
                 onChange={(e) => setUnitType(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Qty Per Unit *" 
                 type="text"
                 id="qty_per_unit"
                 feedbackValid="Looks good!"
                 defaultValue={qty_per_unit}
                 onChange={(e) => setQtyPerUnit(e.target.value)}
                 required
               />
             </CCol>
            </CRow>

            <CRow xs={{ gutterY: 4 }}>
             <CCol md={12} className="bg-light p-3">
              <CHeaderText className="header-brand mb-0 h3">Other Details</CHeaderText>
             </CCol>
             <CCol md={6}>
              <CFormTextarea
                  id="ingredients"
                  label="Ingredients"
                  rows="5"
                  text="One ingredient per line"
                  onChange={(e) => setIngredients(e.target.value)}
                  defaultValue={ingredients}
                ></CFormTextarea>
             </CCol>
             <CCol md={6}>
              <CFormTextarea
                  id="nutrition_facts"
                  label="Nutrition Facts"
                  rows="5"
                  text="One nutrition fact per line"
                  onChange={(e) => setNutritionFacts(e.target.value)}
                  defaultValue={nutrition_facts}
                ></CFormTextarea>
             </CCol>
            </CRow>

            <CRow xs={{ gutterY: 4 }}>
            <CCol md={12} className="bg-light p-3">
             <span className="header-brand mb-0 h1">Posting Group</span>
            </CCol>
            <CCol md={3}>
              <CFormSelect
                label="Inventory Posting Group"
                id="inventory_posting_group"
                defaultValue={inventory_posting_group}
                onChange={(e) => setInventoryPostingGroup(e.target.value)}
              >
                  <option>-- Select --</option>
                  {pstgroupData.filter(name => name.posting_group_type.includes('Inventory')).map(filteredName => (
                      <option key={filteredName.posting_group_id}> {filteredName.posting_group_name} </option>
                  ))}
              </CFormSelect>
            </CCol>
            <CCol md={3}>
              <CFormSelect
                label="Gen Posting Group" 
                type="text"
                id="gen_posting_group"
                defaultValue={gen_posting_group}
                onChange={(e) => setGenPostingGroup(e.target.value)}
                >
                  <option>-- Select --</option>
                  {pstgroupData.filter(name => name.posting_group_type.includes('Gen Prod')).map(filteredName => (
                      <option key={filteredName.posting_group_id}> {filteredName.posting_group_name} </option>
                  ))}
              </CFormSelect>
            </CCol>
            <CCol md={3}>
             <CFormSelect
               label="Input VAT Posting Group" 
               type="text"
               id="input_vat_posting_group"
               defaultValue={input_vat_posting_group}
               onChange={(e) => setInputVatPostingGroup(e.target.value)}
               >
                  <option>-- Select --</option>
                  {pstgroupData.filter(name => name.posting_group_type.includes('Vendor VAT Bus')).map(filteredName => (
                      <option key={filteredName.posting_group_id}> {filteredName.posting_group_name} </option>
                  ))}
              </CFormSelect>
            </CCol>
            <CCol md={3}>
             <CFormSelect
               label="Output VAT Posting Group" 
               type="text"
               id="output_vat_posting_group"
               defaultValue={output_vat_posting_group}
               onChange={(e) => setOutputVatPostingGroup(e.target.value)}
               >
                  <option>-- Select --</option>
                  {pstgroupData.filter(name => name.posting_group_type.includes('Customer VAT Bus')).map(filteredName => (
                      <option key={filteredName.posting_group_id}> {filteredName.posting_group_name} </option>
                  ))}
              </CFormSelect>
            </CCol>
           </CRow>

            <CRow xs={{ gutterY: 4 }}>
             <CCol md={12} className="bg-light p-3">
              <CHeaderText className="header-brand mb-0 h3">Effectivity Date</CHeaderText>
             </CCol>
             <CCol md={4}>
              <CFormLabel htmlFor="eff_start_date">Eff Start Date</CFormLabel>
              <CDatePicker 
                id="eff_start_date"
                locale="en-US" 
                footer
                date={eff_start_date}
                disabled
              />
             </CCol>
             <CCol md={4}>
              <CFormLabel htmlFor="eff_end_date">Eff End Date</CFormLabel>
              <CDatePicker 
                id="eff_end_date"
                locale="en-US" 
                footer
                date={eff_end_date}
                onChange={(e) => setEffEndDate(e.target.value)}
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

                    <CPopover
                      visible={id === popper}
                      content={
                        <AppPopper 
                          id={Number(id)} 
                          message={'Are you sure you want to delete this item?'} 
                          buttonYes={() => handleSubmitPopper(id)}
                          buttonNo={() => handleClosePopper()}
                        ></AppPopper>
                      }
                      onShow={() => handleOpenTriggerPopper(id)}
                      placement="top"
                      offset={[-70,8]}
                    >
                      <CButton size="sm" color="danger" style={{marginLeft:'5px'}} disabled={canDelete}>
                        Delete
                      </CButton>
                    </CPopover>

                    <CButton 
                      color="dark" 
                      type="submit"
                      //disabled={!canSave}
                    >
                      Update Record
                    </CButton>
                    <CToaster ref={toaster} push={toast} placement="top-end" />
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

export default ProductUpdate
