import React, { useState } from 'react'
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
  CHeaderText,
  CDatePicker,
  CRow,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createVendorPrice } from './../../../../store/reducers/vendorpriceSlice';
import { selectUser } from './../../../../store/reducers/users';
import { selectCurrencies } from '../../../../store/reducers/references/currencySlice';


const VendorPriceAdd = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get router params
  const { user } = useSelector(selectUser);

  const logged = user ? user.first_name : 'anonymous';

  
  /* Load Selection Options */
  const productData = useSelector((state) => state.product.data);
  const vendorData = useSelector((state) => state.vendor.data);
  const { currenciesData } = useSelector(selectCurrencies);


  // Set Fields
  const [vendor_id, setVendorId] = useState('');
  const [vendor_name, setVendorName] = useState('');
  const [product_id, setProductId] = useState('');
  const [product_name, setProductName] = useState('');
  const [vendor_barcode, setVendorBarcode] = useState('');
  const [cost_price, setCostPrice] = useState('');
  const [discount_pct, setDiscountPct] = useState('');
  const [discount_amount, setDiscountAmount] = useState('');
  const [final_cost, setFinalCost] = useState('');
  const [wholesale_price, setWholesalePrice] = useState('');
  const [wholesale_min_qty, setWholesaleMinQty] = useState('');
  const [currency_code, setCurrencyCode] = useState('');
  const [tax_amount, setTaxAmount] = useState('');
  const [tax_type, setTaxType] = useState('');
  const [eff_start_date, setEffStartDate] = useState(new Date().toISOString());
  const [eff_end_date, setEffEndDate] = useState('');
  const [vendorpriceStatus, setVendorPriceStatus] = useState('active');
  const [created_by, setCreatedBy] = useState(logged);
  const [updated_by, setUpdatedBy] = useState(logged);
  const [date_created, setDateCreated] = useState(new Date().toISOString());
  const [date_updated, setDateUpdated] = useState(new Date().toISOString());

  
  //Form validation 
  const [validated, setValidated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');

  const canSave = [vendor_name, product_name, final_cost, eff_start_date].every(Boolean) && requestStatus === 'idle';
  
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
          dispatch(createVendorPrice({
              vendor_id,
              vendor_name,
              product_id,
              product_name,
              vendor_barcode,
              cost_price,
              discount_pct,
              discount_amount,
              final_cost,
              wholesale_price,
              wholesale_min_qty,
              currency_code,
              tax_amount,
              tax_type,
              eff_start_date,
              eff_end_date,
              status: vendorpriceStatus,
              created_by,
              updated_by,
              date_created,
              date_updated,
            })).unwrap();
    
            setVendorId('');
            setVendorName('');
            setProductId('');
            setProductName('');
            setVendorBarcode('');
            setCostPrice('');
            setDiscountPct('');
            setDiscountAmount('');
            setFinalCost('');
            setWholesalePrice('');
            setWholesaleMinQty('');
            setTaxAmount('');
            setTaxType('');
            setEffStartDate('');
            setEffEndDate('');
            setCurrencyCode('');
            setVendorPriceStatus('');
            setCreatedBy('');
            setUpdatedBy('');
            setDateCreated('');
            setDateUpdated('');

            setUpdated(true);
            navigate(`/vendorprice`);
          
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
    navigate('/vendorprice');
  };

  const handleSetVendor = (e) => {
    const vid = vendorData.find(post => post.vendor_name === e.target.value).vendor_id;
    setVendorName(e.target.value);
    setVendorId(vid);
  };

  const handleSetProduct = (e) => {
    const pid = productData.find(post => post.product_name === e.target.value).product_id;
    setProductName(e.target.value);
    setProductId(pid);
  };

  console.log({canSave, vendor_name, product_name, final_cost, eff_start_date})


  return (

   <CRow>
     <CCol xs={12}>
       <CCard className="mb-4">
         <CCardHeader>
           <strong>Add Vendor Price</strong> <small></small>
         </CCardHeader>
         <CCardBody>
           <CForm className="row g-3 needs-validation"
             noValidate
             validated={validated}
             onSubmit={handleSubmit}
           >
            <CRow xs={{ gutterY: 1 }}>
              <CCol md={9}></CCol>
              <CCol md={3}>
               <CFormSelect 
                id="vendorpriceStatus"
                label="Status" 
                onChange={(e) => setVendorPriceStatus(e.target.value)} 
                required>
                  <option>active</option>
                  <option>deleted</option>
                  <option>pending</option>
               </CFormSelect>
              </CCol>
            </CRow>

            <CRow xs={{ gutterY: 2 }}>
              <CCol md={12} className="bg-light p-3">
                <CHeaderText className="header-brand mb-0 h3">Vendor Product Details</CHeaderText>
              </CCol>
              <CCol md={2}>
                <CFormInput 
                  label="Vendor ID"
                  id="vendor_id" 
                  name="vendor_id" 
                  value={vendor_id}
                />
              </CCol>
              <CCol md={6}>
                <CFormSelect 
                  label="Vendor Name"
                  id="vendor_name" 
                  name="vendor_name"
                  onChange={handleSetVendor}
                  options={
                      vendorData.map(filteredName => (
                        { 'key': filteredName.vendor_id, 'label': filteredName.vendor_name, 'value': filteredName.vendor_name }
                      ))
                  }
                />
              </CCol>
              <CCol md={4}>
                <CFormInput 
                  label="Vendor Barcode"
                  id="vendor_barcode" 
                  name="vendor_barcode" 
                  onChange={(e) => setVendorBarcode(e.target.value)}
                />
              </CCol>
            </CRow>

            <CRow xs={{ gutterY: 2 }}>
              <CCol md={2}>
                <CFormInput 
                  label="Product ID"
                  id="product_id" 
                  name="product_id" 
                  value={product_id}
                />
              </CCol>
              <CCol md={6}>
                <CFormSelect 
                  label="Product Name"
                  id="product_name" 
                  name="product_name"
                  onChange={handleSetProduct}
                  options={
                      productData.map(filteredName => (
                        { 'key': filteredName.product_id, 'label': filteredName.product_name, 'value': filteredName.product_name }
                      ))
                  }
                />
              </CCol>
            </CRow>

            <CRow xs={{ gutterY: 4 }}>
              <CCol md={12} className="bg-light p-3">
                <CHeaderText className="header-brand mb-0 h3">Prices and Discounts</CHeaderText>
              </CCol>

              <CCol md={2}>
                <CFormInput 
                  label="Cost Price"
                  id="cost_price" 
                  name="cost_price"
                  onChange={(e) => setCostPrice(e.target.value)}
                />
              </CCol>
              <CCol md={2}>
                <CFormInput 
                  label="Discount Pct"
                  id="discount_pct" 
                  name="discount_pct"
                  onChange={(e) => setDiscountPct(e.target.value)}
                />
              </CCol>
              <CCol md={2}>
                <CFormInput 
                  label="Discount Amount"
                  id="discount_amount" 
                  name="discount_amount"
                  onChange={(e) => setDiscountAmount(e.target.value)}
                />
              </CCol>
              <CCol md={2}>
                <CFormInput 
                  label="Final Cost"
                  id="final_cost" 
                  name="final_cost"
                  onChange={(e) => setFinalCost(e.target.value)}
                />
              </CCol>
              <CCol md={2}>
                <CFormInput 
                  label="Wholesale Price"
                  id="wholesale_price" 
                  name="wholesale_price" 
                  defaultValue={wholesale_price}
                  onChange={(e) => setWholesalePrice(e.target.value)}
                />
              </CCol>
              <CCol md={2}>
                <CFormInput 
                  label="Wholesale Min Qty"
                  id="wholesale_min_qty" 
                  name="wholesale_min_qty"
                  onChange={(e) => setWholesaleMinQty(e.target.value)}
                />
              </CCol>
            </CRow>

            <CRow xs={{ gutterY: 2 }}>
              <CCol md={3}>
                <CFormInput 
                  label="Tax Amount"
                  id="tax_amount" 
                  name="tax_amount"
                  onChange={(e) => setTaxAmount(e.target.value)}
                />
              </CCol>
              <CCol md={3}>
                <CFormInput 
                  label="Tax Type"
                  id="tax_type" 
                  name="tax_type"
                  onChange={(e) => setTaxType(e.target.value)}
                />
              </CCol>
              <CCol md={3}>
                <CFormSelect 
                  label="Currency Code"
                  id="currency_code"
                  name="currency_code"
                  onChange={(e) => setCurrencyCode(e.target.value)}
                  options={
                     currenciesData.map(filteredName => (
                        { 'label': filteredName.currency_code, 'value': filteredName.currency_code }
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
                  onChange={(e) => setEffStartDate(e.target.value)}
                  date={eff_start_date}
                  required
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="eff_end_date">Eff End Date</CFormLabel>
                <CDatePicker 
                  id="eff_end_date"
                  locale="en-US" 
                  footer
                  onChange={(e) => setEffEndDate(e.target.value)}
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

export default VendorPriceAdd