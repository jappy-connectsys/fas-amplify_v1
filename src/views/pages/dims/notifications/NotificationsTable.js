import React, { useEffect, useState } from 'react'
import { CSmartTable, CCard, CCardBody, CCardHeader, CCol, CRow, CButton,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CModal,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { ReadNotification, ClearNotification, GetNotification } from '../../../../store/reducers/notificationSlice'


function NotificationTable(){
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false)
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [moedule, setModule] = useState('')
    const [reference_id, setReferenceId] = useState(null)
    const [multiRead, setMultiRead] = useState([])

    const { user } = useSelector(state => state.user)

    useEffect(()=>{
        dispatch(ClearNotification())
        dispatch(GetNotification(user?.id))
    }, [dispatch])

    const { 
        notificationData, 
        notificationLoading, 
        notificationError, 
    } = useSelector(state => state.notification)

    const columns = [
        { label: 'Subject', key: 'subject', _style: { width: '20%' }},
        { label: 'Message', key: 'message', _style: { width: '40%' }},
        { label: 'Module', key: 'collection', _style: { width: '20%' }},
        { label: 'Date Created', key: 'date_created', _style: { width: '20%' }},
    ]

    const moduleType = (type) => {
        switch(type) {
            case 'po':
              return 'Purchase Order'
            default:
                return ''
          }
    }

    const isRead = (read_at, mes) => {
        if(read_at === null) {
            return (
            <div style={{fontWeight:'bold'}}>
                {mes}
            </div>
            )
        }else{
            return mes
        }
    }

    const data = notificationData.map((res)=> ({
        id: res.id,
        subject: res.subject,
        message: res.message,
        read_at: res.read_at,
        reference_id: res.reference_id,
        module: res.collection,
        date_created: new Date(res.date_created).toLocaleString("en-US"),
        collection: moduleType(res.collection),
    }))
    
    const handleView = (item) => {
        const id = item.id
        if(item.read_at === null){
            dispatch(ReadNotification(id)).then(()=>{
                dispatch(GetNotification(user?.id))
            })
        }
        setSubject(item.subject)
        setMessage(item.message)
        setModule(item.module)
        setReferenceId(item.reference_id)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setSubject('')
        setMessage('')
        setModule('')
        setReferenceId(null)
        setOpenModal(false)
    }

    const renderLink = () => {
        if(moedule === 'po'){
            return (
                <Link to={`/po?po_number=`+reference_id}>
                    Go to the page
                </Link>
            )
        }
    }

    const renderModal = () => {
        return (
            <CModal
                className="position-fixed"
                keyboard={false}
                visible={openModal}
            >
                <CModalHeader closeButton={false}>
                    <CModalTitle>
                        {subject}
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow xs={{ gutterY: 2, gutterX: 4 }}>  
                        <CCol md={12} style={{marginLeft:10}}>
                            {message}
                        </CCol>
                    </CRow>
                    <CRow xs={{ gutterY: 2, gutterX: 4 }}>  
                        <CCol md={12} style={{marginLeft:10}}>
                           {renderLink()}
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <div>
                        <CButton 
                            style={{marginLeft:'5px'}} color="secondary" 
                            onClick={() => handleCloseModal()}
                        >
                            Close
                        </CButton>
                    </div>
                </CModalFooter>
            </CModal>
        )
    }

    const handleSelect = (items) => {
        setMultiRead(items)
    }

    const handleMultiRead = () => {
        multiRead.map(res => {
            if(res.read_at === null){
                dispatch(ReadNotification(res.id)).then(()=>{
                    dispatch(GetNotification(user?.id))
                })
            }
        })
    }

    return (
        <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <label style={{marginTop:3}}><strong>Notification</strong> <small>All Records</small></label>
            </CCardHeader>
            <CCardBody>
              <CSmartTable
                loading={notificationLoading === 'loading'}
                activePage={1}
                cleaner
                clickableRows
                columns={columns}
                columnFilter
                columnSorter
                footer
                items={data}
                itemsPerPage={10}
                pagination
                scopedColumns={{
                  subject: (item) => {
                    return (
                        <td onClick={()=>handleView(item)}>
                            {isRead(item.read_at, item.subject)}
                        </td>
                    )
                  },
                  message: (item) => {
                    return (
                        <td onClick={()=>handleView(item)}>
                            {isRead(item.read_at, item.message)}
                        </td>
                    )
                  },
                }}
                selectable
                onSelectedItemsChange={items => handleSelect(items)}
                sorterValue={{ column: 'date_created', state: 'asc' }}
                tableFilter
                tableHeadProps={{
                  color: 'danger',
                }}
                tableProps={{
                  striped: true,
                  hover: true,
                }}
              />
              {multiRead.length > 0 ? (
                <CButton 
                  style={{marginLeft:'10px'}} color="primary" size="sm" 
                  onClick={() => handleMultiRead()}>Read All</CButton>
                ): ''}
            </CCardBody>
            {renderModal()}
          </CCard>
        </CCol>
      </CRow>
    )
}

export default NotificationTable