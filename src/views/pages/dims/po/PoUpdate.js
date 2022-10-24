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
import { updateProduct, selectProducts, selectProductId } from '../../../../store/reducers/productSlice';
import { selectUser } from '../../../../store/reducers/users';
import { selectCurrencies } from '../../../../store/reducers/currencySlice';
import { selectCountries } from '../../../../store/reducers/countrySlice';
import { selectPaymentTerms } from '../../../../store/reducers/paymenttermSlice';
import { selectPostingGroups } from '../../../../store/reducers/pstgroupSlice';
import { selectPaymentModes } from '../../../../store/reducers/paymentmodeSlice';



const ProductUpdate = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get router params
  const {id} = useParams();
  
  const { user } = useSelector(selectUser);
  const { status, error } = useSelector(selectProducts);
  const data = useSelector((state) => selectProductId(state, Number(id)));
  
  const logged = user ? user.first_name : 'anonymous';

  /* Load Selection Options */
  const { pstgroupData } = useSelector(selectPostingGroups);

  //Set Fields
  const [company_id, setCompanyId] = useState('1'); //options on company dim
  const [cs_product_id, setCsProductId] = useState(data?.cs_product_id);
  const [product_name, setProductName] = useState(data?.product_name);
  const [product_type, setProductType] = useState(data?.product_type);
  const [upc, setUpc] = useState(data?.upc);
  const [upc_barcode, setUpcBarcode] = useState(data?.upc_barcode);
  const [sku, setSku] = useState(data?.sku_barcode);
  const [sku_barcode, setSkuBarcode] = useState(data?.sku_barcode);
  const [category, setCategory] = useState(data?.category);
  const [sub_category, setSubCategory] = useState(data?.category);
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
  const [dataRecord, setDataRecord] = useState(false);
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
                product_name,
                company_id,
                cs_product_id,
                upc,
                upc_barcode,
                sku,
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
                eff_start_date,
                eff_end_date,
                cs_product_id,
                inventory_posting_group,
                gen_posting_group,
                input_vat_posting_group,
                output_vat_posting_group,
                status: productStatus,
                updated_by,
                date_updated,
              })).unwrap()
  
              setProductName('')
              setProductType('')
              setCompanyId('')
              setCsProductId('')
              setUpc('')
              setUpcBarcode('')
              setSku('')
              setSkuBarcode('')
              setCategory('')
              setSubCategory('')
              setUom('')
              setSize('')
              setPackagingLength('')
              setPackagingWidth('')
              setPackagingHeight('')
              setNetWeight('')
              setGrossWeight('')
              setIngredients('')
              setNutritionFacts('')
              setUnitType('')
              setQtyPerUnit('')
              setEffStartDate('')
              setEffEndDate('')
              setInventoryPostingGroup('')
              setGenPostingGroup('')
              setInputVatPostingGroup('')
              setOutputVatPostingGroup('')
              setProductStatus('')
              setDateUpdated('')
              setUpdatedBy('')
              
              setUpdated(true)
              
              navigate(`/product/${id}`)
  
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
    if (window.confirm("Are you sure you want to delete this product "+ id + "?")) {
      dispatch(updateProduct({product_id: id, status: 'deleted'}));
      navigate('/product/'+id);
      window.location.reload(true);
    }
  };

  const handleBack = () => {
    return navigate('/products');
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
                 onChange={(e) => setProductName(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={2}>
              <CFormInput
                 label="CS Product Id" 
                 type="text"
                 id="cs_Product_id"
                 feedbackValid="Looks good!"
                 defaultValue={cs_product_id}
                 onChange={(e) => setCsProductId(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
               <CFormSelect 
                id="productStatus"
                label="Status" 
                defaultValue={productStatus} 
                onChange={(e) => setProductStatus(e.target.value)} 
                required>
                  <option>active</option>
                  <option>deleted</option>
                  <option>pending</option>
               </CFormSelect>
             </CCol>
            </CRow>

            <CRow xs={{ gutterY: 1 }}>
             <CCol md={4}>
              <CFormSelect 
                aria-label="Select Category"
                label="Category" 
                id="category"
                feedbackValid="Looks good!"
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option>Select Category</option>
                <option>{category}</option>
              </CFormSelect>
             </CCol>
             <CCol md={4}>
              <CFormSelect 
                aria-label="Select Sub-Category"
                label="Sub-Category" 
                id="sub_category"
                feedbackValid="Looks good!"
                defaultValue={sub_category}
                onChange={(e) => setSubCategory(e.target.value)}
                required
              >
                <option>Select Sub-category</option>
                <option>{sub_category}</option>
              </CFormSelect>
             </CCol>
             <CCol md={4}>
              <CFormInput
                 label="UOM" 
                 type="text"
                 id="uom"
                 feedbackValid="Looks good!"
                 defaultValue={uom}
                 onChange={(e) => setUom(e.target.value)}
                 required
               />
             </CCol>
            </CRow>

            <CRow xs={{ gutterY: 2 }}>
             <CCol md={3}>
              <CFormInput
                 label="UPC" 
                 type="text"
                 id="upc"
                 defaultValue={upc}
                 feedbackValid="Looks good!"
                 onChange={(e) => setUpc(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="UPC Barcode" 
                 type="text"
                 id="upc_barcode"
                 defaultValue={upc_barcode}
                 feedbackValid="Looks good!"
                 onChange={(e) => setUpcBarcode(e.target.value)}
               />
             </CCol>
            </CRow>

            <CRow xs={{ gutterY: 2 }}>
             <CCol md={3}>
              <CFormInput
                 label="SKU" 
                 type="text"
                 id="sku"
                 feedbackValid="Looks good!"
                 defaultValue={sku}
                 onChange={(e) => setSku(e.target.value)}
                 required
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
                 required
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
                 label="Unit Type" 
                 type="text"
                 id="unit_type"
                 feedbackValid="Looks good!"
                 defaultValue={unit_type}
                 onChange={(e) => setUnitType(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Qty Per Unit" 
                 type="text"
                 id="qty_per_unit"
                 feedbackValid="Looks good!"
                 defaultValue={qty_per_unit}
                 onChange={(e) => setQtyPerUnit(e.target.value)}
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
                feedbackValid="Looks good!"
                defaultValue={inventory_posting_group}
                onChange={(e) => setInventoryPostingGroup(e.target.value)}
                options={
                  pstgroupData.filter(name => name.posting_group_type.includes('Inventory')).map(filteredName => (
                    { 'label': filteredName.posting_group_name, 'value': filteredName.posting_group_name }
                ))
              }
              />
             </CCol>
             <CCol md={3}>
              <CFormSelect
                label="Gen Posting Group" 
                type="text"
                id="gen_posting_group"
                feedbackValid="Looks good!"
                defaultValue={gen_posting_group}
                onChange={(e) => setGenPostingGroup(e.target.value)}
                options={
                    pstgroupData.filter(name => name.posting_group_type.includes('Gen Bus')).map(filteredName => (
                      { 'label': filteredName.posting_group_name, 'value': filteredName.posting_group_name }
                  ))
                }
              />
             </CCol>
             <CCol md={3}>
              <CFormSelect
                label="Input VAT Posting Group" 
                type="text"
                id="input_vat_posting_group"
                defaultValue={input_vat_posting_group}
                feedbackValid="Looks good!"
                onChange={(e) => setInputVatPostingGroup(e.target.value)}
                options={
                    pstgroupData.filter(name => name.posting_group_type.includes('Vendor VAT Bus')).map(filteredName => (
                      { 'label': filteredName.posting_group_name, 'value': filteredName.posting_group_name }
                  ))
                }
              />
             </CCol>
             <CCol md={3}>
              <CFormSelect
                label="Output VAT Posting Group" 
                type="text"
                id="outputt_vat_posting_group"
                defaultValue={output_vat_posting_group}
                feedbackValid="Looks good!"
                onChange={(e) => setOutputVatPostingGroup(e.target.value)}
                options={
                  pstgroupData.filter(name => name.posting_group_type.includes('Customer VAT Bus')).map(filteredName => (
                    { 'label': filteredName.posting_group_name, 'value': filteredName.posting_group_name }
                ))
              }
              />
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
                value={eff_start_date}
                onChange={(e) => setEffStartDate(e.target.value)}
              />
             </CCol>
             <CCol md={4}>
              <CFormLabel htmlFor="eff_end_date">Eff End Date</CFormLabel>
              <CDatePicker 
                id="eff_end_date"
                locale="en-US" 
                timepicker
                footer
                value={eff_end_date}
                onChange={(e) => setEffEndDate(e.target.value)}
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

export default ProductUpdate
