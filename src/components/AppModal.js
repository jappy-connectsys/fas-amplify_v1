import React from 'react';
import PropTypes from 'prop-types';
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CButton
  } from '@coreui/react-pro';

const AppModal = (props) => {
    
    const { modalTitle, visible, modalContent, buttonSave } = props;

    const [visibleModal, setVisibleModal] = useState(false);

    return (
    <>

        <CModal alignment="center" scrollable visible={visible} onClose={() => setVisibleModal(false)}>
        <CModalHeader>
            <CModalTitle>{modalTitle}</CModalTitle>
        </CModalHeader>
        <CModalBody>
            {modalContent}
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleModal(false)}>
            Close
            </CButton>
            <CButton color="dark" onClick={buttonSave}>Save changes</CButton>
        </CModalFooter>
        </CModal>
    </>
    )
      
}

AppModal.propTypes = {
  modalTitle: PropTypes.string,
  modalContent: PropTypes.any,
  buttonSave: PropTypes.func,
}

export default React.memo(AppModal)