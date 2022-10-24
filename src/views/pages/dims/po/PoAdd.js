import React, { useEffect, useState } from 'react'
import {
  CButton,
  CHeaderText,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CRow,
  CDatePicker,
  CFormLabel,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { createProduct, selectProducts } from '../../../../store/reducers/productSlice';
import { selectUser } from '../../../../store/reducers/users';
import { selectCurrencies } from '../../../../store/reducers/currencySlice';
import { selectCountries } from '../../../../store/reducers/countrySlice';
import { selectPaymentTerms } from '../../../../store/reducers/paymenttermSlice';
import { selectPostingGroups } from '../../../../store/reducers/pstgroupSlice';
import { selectPaymentModes } from '../../../../store/reducers/paymentmodeSlice';


const ProductAdd = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector(selectUser);
  const { status, error } = useSelector(selectProducts);
  
  const logged = user ? user.first_name : 'anonymous';

  /* Load Selection Options */
  const { pstgroupData } = useSelector(selectPostingGroups);
  

  //Set Fields
  const [company_id, setCompanyId] = useState('1'); //options on company dim
  const [cs_product_id, setCsProductId] = useState('');
  const [product_name, setProductName] = useState('');
  const [product_type, setProductType] = useState('');
  const [upc, setUpc] = useState('');
  const [upc_barcode, setUpcBarcode] = useState('');
  const [sku, setSku] = useState('');
  const [sku_barcode, setSkuBarcode] = useState('');
  const [category, setCategory] = useState('');
  const [sub_category, setSubCategory] = useState('');
  const [uom, setUom] = useState('');
  const [size, setSize] = useState('');
  const [packaging_length, setPackagingLength] = useState('');
  const [packaging_width, setPackagingWidth] = useState('');
  const [packaging_height, setPackagingHeight] = useState('');
  const [net_weight, setNetWeight] = useState('');
  const [gross_weight, setGrossWeight] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [nutrition_facts, setNutritionFacts] = useState('');
  const [unit_type, setUnitType] = useState('');
  const [qty_per_unit, setQtyPerUnit] = useState('');
  const [eff_start_date, setEffStartDate] = useState(new Date().toISOString());
  const [eff_end_date, setEffEndDate] = useState(new Date().toISOString());
  const [inventory_posting_group, setInventoryPostingGroup] = useState('');
  const [gen_posting_group, setGenPostingGroup] = useState('');
  const [input_vat_posting_group, setInputVatPostingGroup] = useState('');
  const [output_vat_posting_group, setOutputVatPostingGroup] = useState('');
  const [productStatus, setProductStatus] = useState('active');
  const [date_created, setDateCreated] = useState(new Date().toISOString());
  const [date_updated, setDateUpdated] = useState(new Date().toISOString());
  const [updated_by, setUpdatedBy] = useState(logged);
  const [created_by, setCreatedBy] = useState(logged);
  
  //Form validation 
  const [validated, setValidated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');
  const canSave = [productStatus].every(Boolean) && requestStatus === 'idle';

  console.log({productStatus});

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
          console.log({created_by, eff_start_date, product_name, upc, sku, size})
          dispatch(createProduct({   
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
                created_by,
                updated_by,
                date_created,
                date_updated
              })).unwrap()
  
              setProductName('');
              setProductType('');
              setCsProductId('');
              setUpc('');
              setUpcBarcode('');
              setSku('');
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
              setEffStartDate('');
              setEffEndDate('');
              setInventoryPostingGroup('');
              setGenPostingGroup('');
              setInputVatPostingGroup('');
              setOutputVatPostingGroup('');
              setProductStatus('');
              setDateCreated('');
              setDateUpdated('');
              setUpdatedBy('');
              setCreatedBy('');
              
              setUpdated(true)
              
              navigate(`/products`)
  
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

  const handleBack = () => {
    return navigate('/products');
  }

  return (
    <CRow>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
         <CHeaderText className="header-brand mb-0 h2">ADD NEW PRODUCT</CHeaderText>
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
                onChange={(e) => setPackagingLength(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
             <CFormInput
                label="Packaging Width" 
                type="text"
                id="packaging_width"
                feedbackValid="Looks good!"
                onChange={(e) => setPackagingWidth(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
             <CFormInput
                label="Packaging Height" 
                type="text"
                id="packaging_height"
                feedbackValid="Looks good!"
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
                onChange={(e) => setNetWeight(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
             <CFormInput
                label="Gross Weight" 
                type="text"
                id="gross_weight"
                feedbackValid="Looks good!"
                onChange={(e) => setGrossWeight(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
             <CFormInput
                label="Unit Type" 
                type="text"
                id="unit_type"
                feedbackValid="Looks good!"
                onChange={(e) => setUnitType(e.target.value)}
              />
            </CCol>
            <CCol md={3}>
             <CFormInput
                label="Qty Per Unit" 
                type="text"
                id="qty_per_unit"
                feedbackValid="Looks good!"
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
               ></CFormTextarea>
            </CCol>
            <CCol md={6}>
             <CFormTextarea
                 id="nutrition_facts"
                 label="Nutrition Facts"
                 rows="5"
                 text="One nutrition fact per line"
                 onChange={(e) => setNutritionFacts(e.target.value)}
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
               date={eff_start_date}
               onChange={(e) => setEffStartDate(e.target.value)}
               required
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

export default ProductAdd