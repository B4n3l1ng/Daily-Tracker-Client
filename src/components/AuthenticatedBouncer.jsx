import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Navigate } from 'react-router-dom';

const AuthenticatedBouncer = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  return isLoading ? <h1>Loading...</h1> : !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default AuthenticatedBouncer;
