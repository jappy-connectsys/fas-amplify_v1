import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react-pro'

import ProtectedRoute from '../views/pages/ProtectedRoute'

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route exact path="/" element={<ProtectedRoute />}>
              {routes.map((route, idx) => {
                return (
                  route.element && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={<route.element />}
                    />
                  )
                )
              })}
            </Route>
          <Route path="/dashboard" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
