import React, { useEffect, useState } from 'react'
import { CSmartTable, CCard, CCardBody, CCardHeader, CCol, CRow, CButton,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CModal,
  CForm,
  CFormInput,
  CFormSelect
} from '@coreui/react-pro';
import { useDispatch, useSelector } from 'react-redux';
import { 
    ClearCustomerWarClearProductsehouse, 
    GetProducts, 
    AddProducts, 
    UpdateProducts
} from '../../../../store/reducers/productSlice';


const ProductTable = () => {

  const dispatch = useDispatch();

  //const { data:customerData } = useSelector((state) => state.customer)
  const { loading, data, message } = useSelector((state) => state.product)

  const [openModal, setOpenModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [mes, setMes] = useState('')

  //Set Fields
  const company_id = 1;
  const [cs_product_id, setCSProductId] = useState('');
  const [product_name, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [sub_category, setSubCategory] = useState('');
  const [uom, setUom] = useState('');
  const [upc, setUpc] = useState('');
  const [upc_barcode, setUpcBarcode] = useState('');
  const [sku, setSku] = useState('');
  const [sku_barcode, setSkuBarcode] = useState('');
  const [packaging_length, setPackagingLength] = useState('');
  const [packaging_width, setPackagingWidth] = useState('');
  const [packaging_height, setPackagingHeight] = useState('');
  const [size, setSize] = useState('');
  const [net_weight, setNetWeight] = useState('');
  const [gross_weight, setGrossWeight] = useState('');
  const [unit_type, setUnitType] = useState('');
  const [qty_per_unit, setQtyPerUnit] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [nutrition_facts, setNutritionFacts] = useState('');
  const [eff_start_date, setEffStartDate] = useState('');
  const [eff_end_date, setEffEndDate] = useState(fixDateReturn('2999-12-30'));
  const [inventory_posting_group, setInventoryPostingGroup] = useState('');
  const [gen_posting_group, setGenPostingGroup] = useState('');
  const [input_vat_posting_group, setInputVatPostingGroup] = useState('');
  const [output_vat_posting_group, setOutputVatPostingGroup] = useState('');
  const [productStatus, setProductStatus] = useState('active');
  const [date_created, setDateCreated] = useState(new Date().toISOString());
  const [date_updated, setDateUpdated] = useState(new Date().toISOString());
  const [updated_by, setUpdatedBy] = useState(logged);
  const [created_by, setCreatedBy] = useState(logged);


  useEffect(()=>{
    dispatch(ClearProducts())
    dispatch(GetProducts())
    //dispatch(getCustomers())
  }, [dispatch])

  useEffect(()=>{
      if(loading === "loading"){
          setMes("loading...")
      }
    
      if(message){
          setMes(
              <label style={{color:'red',fontWeight:600}}>
                  Error:, {message}
              </label>    
          )
      }
  }, [loading, message])


  const [details, setDetails] = useState([])
  const columns = [
    { key: 'product_id', label: 'ID', _style: { width: '10%' }},
    { key: 'product_name', _style: { width: '20%' }},
    { key: 'category', sorter: false },
    { key: 'date_created', sorter: true },
    { key: 'status', _style: { width: '20%' }},
    { key: 'show_details', label: 'Action', _style: { width: '1%' }},
  ]

  const productData = data.map((res)=> {
    return ({
    id: res.product_id, 
    company_id: res.company_id,
    cs_product_id: res.cs_product_id,
    upc_barcode: res.upc_barcode,
    sku_barcode: res.sku_barcode,
    category: res.category,
    sub_category: res.sub_category,
    uom: res.uom,
    size: res.size,
    packaging_length: res.packaging_length,
    packaging_width: res.packaging_width,
    packaging_height: res.packaging_height,
    net_weight: res.net_weight,
    gross_weight: res.gross_weight,
    ingredients: res.ingredients,
    nutrition_facts: res.nutrition_facts,
    unit_type: res.unit_type,
    qty_per_unit: res.qty_per_unit,
    inventory_posting_group: res.inventory_posting_group,
    gen_posting_group: res.gen_posting_group,
    input_vat_posting_group: res.input_vat_posting_group,
    output_vat_posting_group: res.output_vat_posting_group,
    status: productStatus,
    updated_by: res.updated_by,
    date_updated: res.date_updated,
    date_created: new Date(res.date_created).toLocaleString("en-US")
    })
  });

  const handleOpenModal = () => {
    setCSProductId('');
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

    setOpenModal(true)
    setModalType('add')
    setMes('')
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const renderSuccess = (type, warehouseName) => {
    if(type === "add"){
        setMes(<span style={{color:'green',fontWeight:600}}>
        {warehouseName} warehouse has been successfully added.
        </span>)   
    }else{
        setMes(<span style={{color:'green',fontWeight:600}}>
        {warehouseName} warehouse has been successfully updated.
        </span>)   
    }

    setTimeout(()=>{
      setCSProductId('');
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

      dispatch(GetCustomerWarehouse())

      setOpenModal(false)
      setMes('')
    },1000)
  }



  const getBadge = (status) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'deleted':
        return 'danger'
      default:
        return 'active'
    }
  }

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  //Toast
  const [toast, addToast] = useState(0);
  const toaster = useRef();

  const toastAlertMsg = () => (
    <AppToast pagename={'Products'} message={`Details successfully added!`}/>
  );

  useEffect(() => {
    toastAlertMsg();
  },[added]);

  // Popper
  const [deletingItem, setDeletingItem] = useState(false)
  const [popper, setPopper] = useState(false)

  const handleSubmitPopper = (id) => {
    const payload = {
      product_id: id, 
      status: 'deleted'
    }
    dispatch(updateProduct(payload)).then(() => {
      setPopper(0);
      window.location.reload(true);
    });
  }

  const handleClosePopper = () => {
    console.log(popper);
    setPopper(0);
  }

  const handleOpenTriggerPopper = (id) => {
    setPopper(id);
  }
 
 
  return (
    <CRow>
      <CCol xs={12}>

        <CToaster ref={toaster} push={toast} placement="top-end" />
        
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Products</strong> <small>All Records</small>
          </CCardHeader>
          <CCardBody>
            <CSmartTable
            activePage={1}
            cleaner
            clickableRows
            columns={columns}
            columnSorter
            footer
            items={data}
            itemsPerPageSelect
            itemsPerPage={20}
            pagination
            scopedColumns={{
              status: (item) => (
                <td>
                  <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                </td>
              ),
              show_details: (item) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="info"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(item.product_id)
                      }}
                    >
                      {details.includes(item.product_id) ? 'Hide' : 'Show'}
                    </CButton>
                  </td>
                )
              },
              details: (item) => {
                return (
                  <CCollapse visible={details.includes(item.product_id)}>
                    <CCardBody>
                      <h5>{item.product_name}</h5>
                      <p className="text-muted">Date Updated: {item.date_updated}</p>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CPopover
                          visible={item.product_id === popper}
                          content={
                            <AppPopper 
                              id={item.product_id} 
                              message={'Are you sure you want to delete this item?'} 
                              buttonYes={() => handleSubmitPopper(item.product_id)}
                              buttonNo={() => handleClosePopper()}
                            ></AppPopper>
                          }
                          onShow={() => handleOpenTriggerPopper(item.product_id)}
                          placement="top"
                          offset={[-70,8]}
                        >
                          <CButton size="sm" color="danger" style={{marginLeft:'5px'}}>
                            Delete
                          </CButton>
                        </CPopover>
                        
                        <CButton size="sm" color="dark" onClick={() => navigate(`/product/${item.product_id}`)}>
                          View / Update
                        </CButton>
                      </div>
                    </CCardBody>
                  </CCollapse>
                )
              },
            }}
            selectable
            sorterValue={{ column: 'product_name', state: 'asc' }}
            tableFilter
            tableHeadProps={{
              color: 'info',
            }}
            tableProps={{
              striped: true,
              hover: true,
              responsive: true,
            }}
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    
  )
}

export default ProductTable