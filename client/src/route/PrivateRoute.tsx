import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../helper/authhelper';

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { children } = props ?? {};
  return <>{isLoggedIn() ? children : <Navigate to='/login' />}</>;
};

export default PrivateRoute;
