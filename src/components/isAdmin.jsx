import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Flex, Spinner } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

const IsAdmin = ({ children }) => {
  const { isAuthenticated, isLoading, isAdmin } = useContext(AuthContext);
  return isLoading ? (
    <Flex width="100%" height={'90vh'} alignContent={'center'}>
      <Spinner margin={'auto'} thickness="13px" speed="0.95s" emptyColor="gray.200" color="green.500" size="xl" />
    </Flex>
  ) : isAuthenticated && isAdmin ? (
    children
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default IsAdmin;
