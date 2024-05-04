import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, useBreakpointValue } from '@chakra-ui/react';
import powa from '../assets/powapuff.png';
import { NavLink, useLocation } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import CustomMenuItem from './CustomMenuItem';

const Navbar = () => {
  const { isAuthenticated, logout, isAdmin } = useContext(AuthContext);
  const isSmallerThan768 = useBreakpointValue({ base: true, md: false }, { fallback: false });
  const location = useLocation();
  return (
    <Flex justifyContent={'space-evenly'} backgroundColor={'pink'}>
      {isAuthenticated ? (
        <>
          <Flex justifyContent={isSmallerThan768 ? 'space-between' : 'flex-start'} gap={isSmallerThan768 ? '0px' : '10%'}>
            <img src={powa} alt="icon" style={{ width: '4%', minWidth: '80px' }} />
            {isSmallerThan768 && (
              <Menu>
                <MenuButton as={Button} colorScheme="blue" margin="1em">
                  <HamburgerIcon />
                </MenuButton>
                <MenuList color="black">
                  <MenuItem onClick={logout}>Logout</MenuItem>
                  <CustomMenuItem to="/dashboard" active={location.pathname === '/dashboard'}>
                    Dashboard
                  </CustomMenuItem>

                  <CustomMenuItem to="/stash" active={location.pathname === '/stash'}>
                    Alliance Stash
                  </CustomMenuItem>
                  {isAdmin && (
                    <>
                      <CustomMenuItem to="/removals" active={location.pathname === '/removals'}>
                        Removals
                      </CustomMenuItem>
                      <CustomMenuItem to="/users" active={location.pathname === '/users'}>
                        Users Dashboard
                      </CustomMenuItem>
                    </>
                  )}
                </MenuList>
              </Menu>
            )}
            {!isSmallerThan768 && (
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
            )}
          </Flex>
        </>
      ) : undefined}
    </Flex>
  );
};

export default Navbar;
