import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CheckIcon, ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';

const UsersList = () => {
  const { fetchWithToken, logout, isAdmin } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const [userNumber, setUserNumber] = useState(0);
  const [adminNumber, setAdminNumber] = useState(0);

  const [userToDelete, setUserToDelete] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetchWithToken('/users');
      if (response.status === 200) {
        const data = await response.json();
        const admins = data.reduce((acc, user) => {
          if (user.isAdmin) {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0);
        setAdminNumber(admins);
        setUsers(data);
        setUserNumber(data.length);
        setIsLoading(false);
      } else if (response.status === 401) {
        toast({ title: 'Action unavailable unless admin', status: 'error', duration: 5000, isClosable: true, position: 'bottom' });
        setTimeout(() => {
          logout();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast({ title: 'Internal Server Error, please try again', status: 'error', duration: 5000, isClosable: true, position: 'bottom' });
    }
  };

  const changeAdmin = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetchWithToken(`/users/admin/${id}`, 'PUT');
      if (response.status === 200) {
        const data = await response.json();
        toast({ title: data, status: 'success', duration: 5000, isClosable: true, position: 'bottom' });
        await fetchUsers();
      } else if (response.status === 404) {
        toast({ title: 'User not found', status: 'error', duration: 5000, isClosable: true, position: 'bottom' });
        await fetchUsers();
      }
    } catch (error) {
      console.log(error);
      toast({ title: 'Internal Server Error, please try again', status: 'error', duration: 5000, isClosable: true, position: 'bottom' });
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetchWithToken(`/users/${id}`, 'DELETE');
      if (response.status === 200) {
        toast({ title: 'User deleted successfully', status: 'success', duration: 5000, isClosable: true, position: 'bottom' });
        onClose();
        await fetchUsers();
      } else if (response.status === 404) {
        toast({ title: 'User not found', status: 'error', duration: 5000, isClosable: true, position: 'bottom' });
        await fetchUsers();
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast({ title: 'Internal Server Error, please try again', status: 'error', duration: 5000, isClosable: true, position: 'bottom' });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteUser(userToDelete);
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {isLoading ? (
        <Flex width="100%" height={'90vh'} alignContent={'center'}>
          <Spinner margin={'auto'} thickness="13px" speed="0.95s" emptyColor="gray.200" color="green.500" size="xl" />
        </Flex>
      ) : (
        <Container maxW="xxl" centerContent>
          <Box marginBottom={'1em'} width="100%" d="flex" justifyContent="center" p={3} backgroundColor="transparent">
            <Text marginBottom={'1em'} fontWeight={'bold'} fontSize={'4xl'} align={'center'}>
              Registered Users
            </Text>
          </Box>
          <Flex>
            <Text m={3} fontWeight={'bold'}>
              Total users: {userNumber}
            </Text>
            <Text m={3} fontWeight={'bold'}>
              Admin users: {adminNumber}
            </Text>
          </Flex>

          <TableContainer>
            <Table backgroundColor="white" variant="simple" colorScheme="facebook">
              <Thead>
                <Tr>
                  <Th>Username</Th>
                  <Th>Admin?</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user._id}>
                    <Td textAlign={'center'}>{user.username}</Td>
                    <Td textAlign={'center'}>{user.isAdmin ? <CheckIcon color="green" /> : <CloseIcon color="red" />}</Td>
                    <Td>
                      <Menu>
                        <MenuButton as={Button} colorScheme="blue" rightIcon={<ChevronDownIcon />}>
                          Actions
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() => {
                              changeAdmin(user._id);
                            }}
                          >
                            {user.isAdmin ? 'Remove admin' : 'Make admin'}
                          </MenuItem>
                          <MenuItem
                            color="red"
                            onClick={() => {
                              setUserToDelete(user._id);
                              onOpen();
                            }}
                            isDisabled={user.isAdmin ? true : false}
                          >
                            Delete User
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </>
  );
};

export default UsersList;
