import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  CButtonGroup,
  CFormCheck,
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';
import { cilMenu, cilMoon, cilSun } from '@coreui/icons';

import { AppBreadcrumb } from './index';

import {
  AppHeaderDropdown,
  AppHeaderDropdownNotif,
} from './header/index';

import { logo } from '../assets/brand/logo';

import { SignOut } from '../store/reducers/users';

const AppHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.user);

  const handleLogout = () => {
    const payload = {
      refresh_token:user.refresh_token
    }
    dispatch(SignOut(payload)).then(()=>{
        setTimeout(()=>{
          navigate("/login");
        },2000)
    })
  }

  const theme = useSelector((state) => state.coreuistate.theme)

  theme === 'dark'
    ? document.body.classList.add('dark-theme')
    : document.body.classList.remove('dark-theme')

  const sidebarShow = useSelector((state) => state.coreuistate.sidebarShow)
  //sconst asideShow = useSelector((state) => state.coreuistate.asideShow)

  return (
    <>
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto me-4">
          <CButtonGroup aria-label="Theme switch">
            <CFormCheck
              type="radio"
              button={{ color: 'primary' }}
              name="theme-switch"
              id="btn-light-theme"
              autoComplete="off"
              label={<CIcon icon={cilSun} />}
              checked={theme === 'default'}
              onChange={() => dispatch({ type: 'set', theme: 'light' })}
            />
            <CFormCheck
              type="radio"
              button={{ color: 'primary' }}
              name="theme-switch"
              id="btn-dark-theme"
              autoComplete="off"
              label={<CIcon icon={cilMoon} />}
              checked={theme === 'dark'}
              onChange={() => dispatch({ type: 'set', theme: 'dark' })}
            />
          </CButtonGroup>
        </CHeaderNav>
        <CHeaderNav>
          <AppHeaderDropdownNotif />
        </CHeaderNav>
        <CHeaderNav className="ms-3 me-4">
          <AppHeaderDropdown onLogout={handleLogout} />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
    </>
  )
}

export default AppHeader
