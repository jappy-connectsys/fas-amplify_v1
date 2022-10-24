import React, { useEffect } from 'react';
import {
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import {
  cilBell,
} from '@coreui/icons';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { ReadNotification, ClearNotification, GetNotification } from '../../store/reducers/notificationSlice';

const AppHeaderDropdownNotif = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user)

  const itemsCount = 5

  useEffect(()=>{
    dispatch(ClearNotification());
    dispatch(GetNotification(user?.id));
}, [dispatch])

const { 
  notificationData, 
} = useSelector(state => state.notification)


const data = notificationData
  .slice(0, 5)
  .sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime())
  .map((item) => {
    return {
      id:item.id,
      reference_id:item.reference_id,
      read_at:item.read_at,
      collection:item.collection,
      subject:item.subject,
      message:item.message,
      date_created:new Date(item.date_created).toLocaleString("en-US"),
    }
  })

  const unreadCount =  data.filter(res => res.read_at === null).length

  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " year/s age";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " month/s age";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " day/s ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hour/s ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minute ago";
    }
    return Math.floor(seconds) + " second/s ago";
  }

  const handleView = (notification_id, reference_id) => {
    dispatch(ReadNotification(notification_id)).then(()=>{
      dispatch(GetNotification(user?.id))
      navigate(`/po?po_number=${reference_id}`)
    })
  }

  return (
    <CDropdown variant="nav-item" alignment="end">
      
      <CDropdownToggle caret={false}>
        <CIcon icon={cilBell} size="lg" className="my-1 mx-2" />
      {unreadCount > 0 ? (
        <CBadge
          shape="rounded-pill"
          color="danger-gradient"
          className="position-absolute top-0 end-0"
        >
          {unreadCount}
        </CBadge>
      ) : ''}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
       <CDropdownHeader className="bg-light dark:bg-white dark:bg-opacity-10">
       {unreadCount > 0 ? (
          <strong>You have {unreadCount} notifications</strong>
        ): (
          <strong>You have no notifications</strong>
        )}
        </CDropdownHeader>
        {data.map((res, i) => {
          return (
            <CDropdownItem key={i} className="d-block" style={{width:'250px',border:'1px solid #d3d3d3'}}>
              <div style={{cursor:"pointer"}} onClick={()=>handleView(res.id,res.reference_id)}>
                  <div
                     className="text-uppercase"
                     style={{
                     whiteSpace: 'nowrap',
                     overflow: 'hidden',
                     textOverflow: 'ellipsis'
                  }}>
                      <small>
                        {res.read_at === null ? 
                        (
                          <b>{res.subject}</b>
                        ) : 
                        res.subject}
                      </small>
                  </div>

                  <div style={{
                     whiteSpace: 'nowrap',
                     overflow: 'hidden',
                     textOverflow: 'ellipsis'
                  }}>
                    <small className="text-medium-emphasis">
                        {res.read_at === null ? (
                          <b>{res.message}</b> ) : 
                          res.message
                        }
                    </small>
                  </div>
                  
                  <div>
                      <small className="text-medium-emphasis">
                      {res.read_at === null ? (
                          <b>{timeSince(new Date(res.date_created))}</b> ) : 
                          timeSince(new Date(res.date_created))
                        }
                        
                      </small>
                  </div>
              </div>
            </CDropdownItem>
          )
        })}
        <CDropdownItem>
          <Link to={`/notifications`} style={{textDecoration:'none'}}>
           <center>View all notification</center>
          </Link>
        </CDropdownItem>

      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdownNotif;
