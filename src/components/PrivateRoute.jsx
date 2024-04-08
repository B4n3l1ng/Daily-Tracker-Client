/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Navigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  return isLoading ? (
    <Spinner margin={'auto'} thickness="13px" speed="0.95s" emptyColor="gray.200" color="green.500" size="xl" />
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
