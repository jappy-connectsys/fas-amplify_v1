import React from 'react';
import PropTypes from 'prop-types';
import { CToast, CToastHeader, CToastBody } from '@coreui/react-pro';


const AppToast = (props) => {

const { pagename, message } = props

return (
   <CToast autohide={false} visible={true}>
      <CToastHeader closeButton>
         <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
         >
            <rect width="100%" height="100%" fill="#007aff"></rect>
         </svg>
         <strong className="me-auto">{pagename}</strong>
         <small></small>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
   </CToast>
   )
}

AppToast.propTypes = {
   pagename: PropTypes.string,
   message: PropTypes.string,
 }
 
export default React.memo(AppToast)