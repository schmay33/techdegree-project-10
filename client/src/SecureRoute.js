import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Context from './Context';

const SecureRoute = () => {
  const context = useContext(Context.Context);
  const authUser = context.authenticatedUser;
  const location = useLocation();

  return authUser ? 
  <Outlet /> : 
  <Navigate to="/signin" state={{ from: location.pathname }} />
}

export default SecureRoute;