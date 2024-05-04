import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Button, Flex } from '@chakra-ui/react';
import powa from '../assets/powapuff.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, logout, isAdmin } = useContext(AuthContext);
  return (
    <Flex justifyContent={'space-evenly'} backgroundColor={'pink'}>
      {isAuthenticated ? (
        <Flex justifyContent={'flex-start'} gap="15%">
          <img src={powa} alt="icon" style={{ width: '4%' }} />
          <Flex justifyContent={'space-evenly'} width="90%" p={3}>
            <Button colorScheme="red" onClick={logout}>
              Logout
            </Button>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : 'none')}>
              <Button colorScheme="blue">Dashboard</Button>
            </NavLink>
            <NavLink to="/stash" className={({ isActive }) => (isActive ? 'active' : 'none')}>
              <Button colorScheme="green">Alliance Stash</Button>
            </NavLink>

            {isAdmin && (
              <>
                <NavLink to="/removals" className={({ isActive }) => (isActive ? 'active' : 'none')}>
                  <Button colorScheme="purple">Removals</Button>
                </NavLink>
                <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : 'none')}>
                  <Button colorScheme="orange">Users Dashboard</Button>
                </NavLink>
              </>
            )}
          </Flex>
        </Flex>
      ) : undefined}
    </Flex>
  );
};

export default Navbar;
