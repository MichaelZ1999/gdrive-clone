// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// const ProtectedRoute = ({ children }) => {


//   const { currentUser } = useAuth();

//   if (!currentUser) {
//     return <Navigate to='/' />;
//   }
//   return children;
// };

// export default ProtectedRoute;

import React, { FC } from 'react';
import { Navigate, Route, RouteProps ,Routes} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Dashboard from '../google-drive/Dashboard';

type ProtectedRouteProps = {
  component: React.FC;
} & RouteProps;

const ProtectedRoute: FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to='/' />;
  }
  return <Routes>
    <Route {...rest} path='/*' element={<Dashboard />} />
  </Routes>;
};

export default ProtectedRoute;
