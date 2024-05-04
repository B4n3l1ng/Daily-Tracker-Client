/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Navigate } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';

const AuthenticatedBouncer = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  return isLoading ? (
    <Flex width="100%" height={'100vh'} alignContent={'center'}>
      <Spinner margin={'auto'} thickness="13px" speed="0.95s" emptyColor="gray.200" color="green.500" size="xl" />
    </Flex>
  ) : !isAuthenticated ? (
    children
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default AuthenticatedBouncer;
