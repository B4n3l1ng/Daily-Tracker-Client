import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Spinner } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

const IsAdmin = ({ children }) => {
  const { isAuthenticated, isLoading, isAdmin } = useContext(AuthContext);
  return isLoading ? (
    <Spinner margin={'auto'} thickness="13px" speed="0.95s" emptyColor="gray.200" color="green.500" size="xl" />
  ) : isAuthenticated && isAdmin ? (
    children
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default IsAdmin;
