import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react-pro'
import {
  cilBell,
  cilLockLocked,
  cilAccountLogout,
  cilSettings,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'


import avatar8 from './../../assets/images/avatars/8.jpg'

function AppHeaderDropdown (props) {
  const { onLogout } = props

  return (
    <>
    <CDropdown variant="nav-item" alignment="end">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" container="body">
        <CDropdownHeader className="bg-light dark:bg-white dark:bg-opacity-10 fw-semibold py-2">
          Account
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info-gradient" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light dark:bg-white dark:bg-opacity-10 fw-semibold py-2">
          Settings
        </CDropdownHeader>
        <CDropdownItem href="/company/1">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Lock Account
        </CDropdownItem>
        <CDropdownItem onClick={onLogout} >
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
    </>
  )
}

export default AppHeaderDropdown
