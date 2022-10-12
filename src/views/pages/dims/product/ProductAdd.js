// import React, { useState, useRef } from 'react';
// import {
//   CButton,
//   CHeaderText,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CForm,
//   CFormInput,
//   CFormSelect,
//   CFormTextarea,
//   CRow,
//   CDatePicker,
//   CFormLabel,
//   CToaster,
//   CInputGroup
// } from '@coreui/react-pro';
// import CIcon from '@coreui/icons-react';
// import { cilPlus } from '@coreui/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { AppToast, AppModal } from './../../../../components';
// import { createProduct, selectProducts, productExist } from '../../../../store/reducers/productSlice';
// import { selectUser } from './../../../../store/reducers/users';
// import { selectPostingGroups } from '../../../../store/reducers/references/pstgroupSlice';
// import { selectProductCategories } from '../../../../store/reducers/references/productCategorySlice';
// import { fixDateReturn } from '../../../../helper/date';


// const ProductAdd = () => {
  
//   //Get initial data
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const { user } = useSelector(selectUser);

//   const logged = user ? user.first_name : 'anonymous';

//   /* Load Selection Options */
//   const { pstgroupData } = useSelector(selectPostingGroups);
//   const { pcategoryData } = useSelector(selectProductCategories);
  
//   //Set Fields
//   const company_id = 1;
//   const [cs_product_id, setCSProductId] = useState('');
//   const [product_name, setProductName] = useState('');
//   const [category, setCategory] = useState('');
//   const [sub_category, setSubCategory] = useState('');
//   const [uom, setUom] = useState('');
//   const [upc, setUpc] = useState('');
//   const [upc_barcode, setUpcBarcode] = useState('');
//   const [sku, setSku] = useState('');
//   const [sku_barcode, setSkuBarcode] = useState('');
//   const [packaging_length, setPackagingLength] = useState('');
//   const [packaging_width, setPackagingWidth] = useState('');
//   const [packaging_height, setPackagingHeight] = useState('');
//   const [size, setSize] = useState('');
//   const [net_weight, setNetWeight] = useState('');
//   const [gross_weight, setGrossWeight] = useState('');
//   const [unit_type, setUnitType] = useState('');
//   const [qty_per_unit, setQtyPerUnit] = useState('');
//   const [ingredients, setIngredients] = useState('');
//   const [nutrition_facts, setNutritionFacts] = useState('');
//   const [eff_start_date, setEffStartDate] = useState('');
//   const [eff_end_date, setEffEndDate] = useState(fixDateReturn('2999-12-30'));
//   const [inventory_posting_group, setInventoryPostingGroup] = useState('');
//   const [gen_posting_group, setGenPostingGroup] = useState('');
//   const [input_vat_posting_group, setInputVatPostingGroup] = useState('');
//   const [output_vat_posting_group, setOutputVatPostingGroup] = useState('');
//   const [productStatus, setProductStatus] = useState('active');
//   const [date_created, setDateCreated] = useState(new Date().toISOString());
//   const [date_updated, setDateUpdated] = useState(new Date().toISOString());
//   const [updated_by, setUpdatedBy] = useState(logged);
//   const [created_by, setCreatedBy] = useState(logged);
  

//   //Form validation 
//   const [validated, setValidated] = useState(false);
//   const [updated, setUpdated] = useState(false);
//   const [requestStatus, setRequestStatus] = useState('idle');


//   const data = useSelector((state) => productExist(state, product_name));

//   if(!data){
//     console.log('no match');
//   } else {
//     console.log({data});
//   }


//   const handleAddProduct = () => {
//     if(product_name === ''){
//       setIsValid(false)
//       setValidMes(
//         <CCol md={12} style={{height:'50px',padding:'12px 0 0 10px',margin:'10px 0 10px 0', backgroundColor:'#f9000059'}}>
//           <b style={{color:'black'}}>PO Number is required</b>
//         </CCol>
//       )
//     }else if(vendor_id === 0){
//       setIsValid(false)
//       setValidMes(
//         <CCol md={12} style={{height:'50px',padding:'12px 0 0 10px',margin:'10px 0 10px 0', backgroundColor:'#f9000059'}}>
//           <b style={{color:'black'}}>Vendor ID is required</b>
//         </CCol>
//       )
//     }else{
//       const payload = {
//           po_number,
//           po_date,
//           vendor_id,
//           requested_date,
//           approval_flag:po_approval,
//           approval_by:approval_flag,
//           approved_date,
//           dr_status,
//           warehouse_id,
//           remark,
//           subtotal_amount:null,
//           tax_amount:null,
//           grand_total_amount:null,
//           fulfillment_expiry_date,
//           status:'active',
//           created_by:user?.id,
//           date_created:new Date().toISOString(),
//           date_updated:null,
//           updated_by:null,
//       }

//       setIsValid(true)
//       setValidMes('')
  
//       dispatch(createPo(payload)).then((res)=>{
//         if(res.type === "po/createPo/fulfilled"){
//         navigate(`/po`)
//         }
//       })
//     }
//   }



//   // && d.upc === upc && d.sku === sku && d.eff_start_date === eff_start_date);

//   const canSave = [product_name,eff_start_date,productStatus].every(Boolean) && requestStatus === 'idle';

  
//   //Submit Form
//   const handleSubmit = (event) => {
//     /*
//     const form = event.currentTarget
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }
//     */
    
//     const onSavePostClicked = () => {  
//       if (canSave) {
//         try {
//           setRequestStatus('pending');
//           dispatch(createProduct({   
//               product_name,
//               cs_product_id,
//               company_id,
//               upc,
//               upc_barcode,
//               sku,
//               sku_barcode,
//               category,
//               sub_category,
//               uom,
//               size,
//               packaging_length,
//               packaging_width,
//               packaging_height,
//               net_weight,
//               gross_weight,
//               ingredients,
//               nutrition_facts,
//               unit_type,
//               qty_per_unit,
//               eff_start_date,
//               eff_end_date,
//               inventory_posting_group,
//               gen_posting_group,
//               input_vat_posting_group,
//               output_vat_posting_group,
//               status: productStatus,
//               created_by,
//               updated_by,
//               date_created,
//               date_updated
//             })).unwrap()

//             setProductName('');
//             setCSProductId('');
//             setUpc('');
//             setUpcBarcode('');
//             setSku('');
//             setSkuBarcode('');
//             setCategory('');
//             setSubCategory('');
//             setUom('');
//             setSize('');
//             setPackagingLength('');
//             setPackagingWidth('');
//             setPackagingHeight('');
//             setNetWeight('');
//             setGrossWeight('');
//             setIngredients('');
//             setNutritionFacts('');
//             setUnitType('');
//             setQtyPerUnit('');
//             setEffStartDate('');
//             setInventoryPostingGroup('');
//             setGenPostingGroup('');
//             setInputVatPostingGroup('');
//             setOutputVatPostingGroup('');
//             setProductStatus('');
//             setDateCreated('');
//             setDateUpdated('');
//             setUpdatedBy('');
//             setCreatedBy('');
            
//             setUpdated(true);
//             navigate(`/products`);
  
//         } catch (err) {
//           console.error('Failed to save the post', err)
//         } finally {
//           setRequestStatus('idle');
//         }
//       }
//     }
//     setValidated(true);
//     addToast(toastAlertMsg);
//     onSavePostClicked();
//   }

//   //Toast
//   const [toast, addToast] = useState(0);
//   const toaster = useRef();

//   const toastAlertMsg = () => (
//     <AppToast pagename={'Products'} message={`Product successfully added!`}/>
//   );

//   //Modal
//   const [visibleModal, setVisibleModal] = useState(false);
//   const openModalWindow = () => (
//     <AppModal 
//       modalTitle={'Add Product Category'} 
//       modalContent={`Product successfully added!`}
//       visible='visible'
//       buttonSave={()=>console.log('saved')}
//     />
//   );

//   const handleBack = () => {
//     return navigate('/products');
//   }

//   const handleAdd = () => {
//     return navigate('/products');
//   }


//   return (
//     <CRow>
//       <CCol xs={12}>
//         <CCard className="mb-4">
//           <CCardHeader>
//             <CHeaderText className="header-brand mb-0 h1">ADD NEW PRODUCT</CHeaderText>
//           </CCardHeader>
//           <CCardBody>
//           <CForm className="row g-3 needs-validation"
//               noValidate
//             >
//             <CRow xs={{ gutterY: 2 }}>
//               <CCol md={6}>
//               <CFormInput
//                   label="Product Name *" 
//                   type="text"
//                   id="product_name"
//                   feedback="Required"
//                   onChange={(e) => setProductName(e.target.value)}
//                   required
//                 />
//               </CCol>
//               <CCol md={3}>
//               <CFormInput
//                   label="CS Cart Product ID" 
//                   type="text"
//                   id="cs_product_id"
//                   feedback="Required"
//                   onChange={(e) => setCSProductId(e.target.value)}
//                 />
//               </CCol>
//               <CCol md={3}>
//               <CFormInput
//                   label="UOM" 
//                   type="text"
//                   id="uom"
//                   onChange={(e) => setUom(e.target.value)}
//                 />
//               </CCol>
//             </CRow>

//             <CRow xs={{ gutterY: 1 }}>
//               <CCol md={6}>
//                 <CFormLabel htmlFor="category">Category</CFormLabel>
//                 <CInputGroup>
//                   <CFormSelect
//                     id="category"
//                     onChange={(e) => setCategory(e.target.value)}
//                     required
//                   >
//                     <option></option>
//                     { pcategoryData.map(filteredName => (
//                         <option key={filteredName.category_id}>{filteredName.category}</option>
//                       ))
//                     }
//                   </CFormSelect>
//                   <CButton type="button" color="secondary" variant="outline" onClick={() => setVisibleModal(!visible)}><CIcon icon={cilPlus} /></CButton>
//                 </CInputGroup>
//               </CCol>
//               <CCol md={6}>
//                 <CFormLabel htmlFor="sub_category">Sub-Category *</CFormLabel>
//                 <CInputGroup>
//                   <CFormSelect
//                     id="sub_category"
//                     onChange={(e) => setSubCategory(e.target.value)}
//                     required
//                   >
//                     <option></option>
//                     { pcategoryData.map(filteredName => (
//                         <option key={filteredName.category_id}>{filteredName.sub_category}</option>
//                       ))
//                     }
//                   </CFormSelect>
//                   <CButton type="button" color="secondary" variant="outline"><CIcon icon={cilPlus} /></CButton>
//                 </CInputGroup>
//               </CCol>
//             </CRow>

//             <CRow xs={{ gutterY: 2 }}>
//               <CCol md={3}>
//               <CFormInput
//                   label="UPC *" 
//                   type="text"
//                   id="upc"
//                   onChange={(e) => setUpc(e.target.value)}
//                   required
//                 />
//               </CCol>
//               <CCol md={3}>
//               <CFormInput
//                   label="UPC Barcode" 
//                   type="text"
//                   id="upc_barcode"
//                   onChange={(e) => setUpcBarcode(e.target.value)}
//                 />
//               </CCol>
//               <CCol md={3}>
//               <CFormInput
//                   label="SKU *" 
//                   type="text"
//                   id="sku"
//                   onChange={(e) => setSku(e.target.value)}
//                   required
//                 />
//               </CCol>
//               <CCol md={3}>
//               <CFormInput
//                   label="SKU Barcode" 
//                   type="text"
//                   id="sku_barcode"
//                   onChange={(e) => setSkuBarcode(e.target.value)}
//                 />
//               </CCol>
//             </CRow>

//             <CRow xs={{ gutterY: 4 }}>
//               <CCol md={12} className="bg-light p-3">
//               <CHeaderText className="header-brand mb-0 h3">Packaging Details</CHeaderText>
//               </CCol>
//               <CCol md={3}>
//               <CFormInput
//                   label="Packaging Length" 
//                   type="text"
//                   id="packaging_length"
//                   onChange={(e) => setPackagingLength(e.target.value)}
//                 />
//               </CCol>
//               <CCol md={3}>
//               <CFormInput
//                   label="Packaging Width" 
//                   type="text"
//                   id="packaging_width"
//                   onChange={(e) => setPackagingWidth(e.target.value)}
//                 />
//               </CCol>
//               <CCol md={3}>
//               <CFormInput
//                   label="Packaging Height" 
//                   type="text"
//                   id="packaging_height"
//                   onChange={(e) => setPackagingHeight(e.target.value)}
//                 />
//               </CCol>
//               <CCol md={3}>
//               <CFormInput
//                   label="Size" 
//                   type="text"
//                   id="size"
//                   defaultValue={size}
//                   onChange={(e) => setSize(e.target.value)}
//                 />
//               </CCol>
//             </CRow>

//             <CRow xs={{ gutterY: 1 }}>
//               <CCol md={3}>
//               <CFormInput
//                   label="Net Weight" 
//                   type="text"
//                   id="net_weight"
//                   onChange={(e) => setNetWeight(e.target.value)}
//                 />
//               </CCol>
//               <CCol md={3}>
//               <CFormInput
//                   label="Gross Weight" 
//                   type="text"
//                   id="gross_weight"
//                   onChange={(e) => setGrossWeight(e.target.value)}
//                 />
//               </CCol>
//               <CCol md={3}>
//               <CFormInput
//                   label="Unit Type *" 
//                   type="text"
//                   id="unit_type"
//                   onChange={(e) => setUnitType(e.target.value)}
//                   required
//                 />
//               </CCol>
//               <CCol md={3}>
//               <CFormInput
//                   label="Qty Per Unit *" 
//                   type="text"
//                   id="qty_per_unit"
//                   onChange={(e) => setQtyPerUnit(e.target.value)}
//                   required
//                 />
//               </CCol>
//             </CRow>

//             <CRow xs={{ gutterY: 4 }}>
//               <CCol md={12} className="bg-light p-3">
//               <CHeaderText className="header-brand mb-0 h3">Other Details</CHeaderText>
//               </CCol>
//               <CCol md={6}>
//               <CFormTextarea
//                   id="ingredients"
//                   label="Ingredients"
//                   rows="5"
//                   text="One ingredient per line"
//                   onChange={(e) => setIngredients(e.target.value)}
//                 ></CFormTextarea>
//               </CCol>
//               <CCol md={6}>
//               <CFormTextarea
//                   id="nutrition_facts"
//                   label="Nutrition Facts"
//                   rows="5"
//                   text="One nutrition fact per line"
//                   onChange={(e) => setNutritionFacts(e.target.value)}
//                 ></CFormTextarea>
//               </CCol>
//             </CRow>

//             <CRow xs={{ gutterY: 4 }}>
//               <CCol md={12} className="bg-light p-3">
//               <span className="header-brand mb-0 h1">Posting Group</span>
//               </CCol>
//               <CCol md={3}>
//                 <CFormSelect
//                   label="Inventory Posting Group"
//                   id="inventory_posting_group"
//                   onChange={(e) => setInventoryPostingGroup(e.target.value)}
//                 >
//                     <option>-- Select --</option>
//                     {pstgroupData.filter(name => name.posting_group_type.includes('Inventory')).map(filteredName => (
//                         <option key={filteredName.posting_group_id}> {filteredName.posting_group_name} </option>
//                     ))}
//                 </CFormSelect>
//               </CCol>
//               <CCol md={3}>
//                 <CFormSelect
//                   label="Gen Posting Group" 
//                   type="text"
//                   id="gen_posting_group"
//                   defaultValue={gen_posting_group}
//                   onChange={(e) => setGenPostingGroup(e.target.value)}
//                   >
//                     <option>-- Select --</option>
//                     {pstgroupData.filter(name => name.posting_group_type.includes('Gen Prod')).map(filteredName => (
//                         <option key={filteredName.posting_group_id}> {filteredName.posting_group_name} </option>
//                     ))}
//                 </CFormSelect>
//               </CCol>
//               <CCol md={3}>
//               <CFormSelect
//                 label="Input VAT Posting Group" 
//                 type="text"
//                 id="input_vat_posting_group"
//                 defaultValue={input_vat_posting_group}
//                 feedbackValid="Looks good!"
//                 onChange={(e) => setInputVatPostingGroup(e.target.value)}
//                 >
//                     <option>-- Select --</option>
//                     {pstgroupData.filter(name => name.posting_group_type.includes('Vendor VAT Bus')).map(filteredName => (
//                         <option key={filteredName.posting_group_id}> {filteredName.posting_group_name} </option>
//                     ))}
//                 </CFormSelect>
//               </CCol>
//               <CCol md={3}>
//               <CFormSelect
//                 label="Output VAT Posting Group" 
//                 type="text"
//                 id="output_vat_posting_group"
//                 defaultValue={output_vat_posting_group}
//                 feedbackValid="Looks good!"
//                 onChange={(e) => setOutputVatPostingGroup(e.target.value)}
//                 >
//                     <option>-- Select --</option>
//                     {pstgroupData.filter(name => name.posting_group_type.includes('Customer VAT Bus')).map(filteredName => (
//                         <option key={filteredName.posting_group_id}> {filteredName.posting_group_name} </option>
//                     ))}
//                 </CFormSelect>
//               </CCol>
//             </CRow>

//             <CRow xs={{ gutterY: 4 }}>
//               <CCol md={12} className="bg-light p-3">
//                 <CHeaderText className="header-brand mb-0 h3">Effectivity Date</CHeaderText>
//               </CCol>
//               <CCol md={4}>
//                 <CFormLabel htmlFor="eff_start_date">Eff Start Date</CFormLabel>
//                 <CDatePicker 
//                   id="eff_start_date"
//                   locale="en-US"
//                   onDateChange={(date) => setEffStartDate(fixDateReturn(date))}
//                   required
//                 />
//               </CCol>
//               <CCol md={4}>
//                 <CFormLabel htmlFor="eff_end_date">Eff End Date</CFormLabel>
//                 <CDatePicker 
//                   id="eff_end_date"
//                   locale="en-US"
//                   date={eff_end_date}
//                   onDateChange={(date) => setEffEndDate(fixDateReturn(date))}
//                 />
//               </CCol>
//             </CRow>

//             <CRow xs={{ gutterY: 4 }} className="justify-content-end">
//               <CCol xs={12}>
//                 <div className="d-grid gap-2 d-md-flex justify-content-md-end">
//                     <CButton 
//                       color="light" 
//                       type="button"
//                       onClick={handleBack}
//                     >
//                       Back
//                     </CButton>
//                     <CButton 
//                       color="dark" 
//                       type="submit"
//                       //disabled={!canSave}
//                     >
//                       Add Record
//                     </CButton>
//                     <CToaster ref={toaster} push={toast} placement="top-end" />
//                 </div>
//               </CCol>
//             </CRow>
//             </CForm>
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   )
// }

// export default ProductAdd