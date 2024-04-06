/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  return isLoading ? <h1>Loading...</h1> : isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
