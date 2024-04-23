import { Box, Button, Container, Flex, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Link } from 'react-router-dom';

const RemovalsPage = () => {
  const { logout, fetchWithToken } = useContext(AuthContext);
  const [removals, setRemovals] = useState([]);

  const fetchRemovals = async () => {
    try {
      const response = await fetchWithToken('/items/removals');
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setRemovals(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRemovals();
  }, []);

  return (
    <Container maxW="xxl" centerContent>
      <Box d="flex" justifyContent="center" p={3} backgroundColor="transparent" width="100%">
        <Text fontWeight={'bold'} fontSize={'4xl'} align={'center'}>
          Item Removals
        </Text>
        <Flex justifyContent={'space-evenly'} width="100%">
          <Button colorScheme="red" onClick={logout}>
            Logout
          </Button>
          <Button colorScheme="blue">
            <Link to="/stash">Stash</Link>
          </Button>
          <Button colorScheme="green">
            <Link to="/dashboard">Dashboard Page</Link>
          </Button>
        </Flex>
      </Box>

      <TableContainer>
        <Table>
          <Thead>
            <Th>Item Name</Th>
            <Th>Item Type</Th>
            <Th>Quantity</Th>
            <Th>Given to</Th>
          </Thead>
          <Tbody>
            {removals.map((item) => (
              <Tr key={item._id}>
                <Td>{item.itemType === 'Charm Part' ? `${item.itemName} - ${item.itemCharmPartType}` : item.itemName}</Td>
                <Td>{item.itemType}</Td>
                <Td>{item.quantityRemoved}</Td>
                <Td>{item.removedBy}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RemovalsPage;
