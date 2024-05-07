import { Box, Container, Flex, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';

const RemovalsPage = () => {
  const { fetchWithToken } = useContext(AuthContext);
  const [removals, setRemovals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRemovals = async () => {
    try {
      const response = await fetchWithToken('/items/removals');
      if (response.status === 200) {
        const data = await response.json();
        setRemovals(data);
        setIsLoading(false);
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
      </Box>
      {isLoading ? (
        <Flex width="100%" height={'60vh'} alignContent={'center'}>
          <Spinner margin={'auto'} thickness="13px" speed="0.95s" emptyColor="gray.200" color="green.500" size="xl" />
        </Flex>
      ) : (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Item Name</Th>
                <Th>Item Type</Th>
                <Th>Quantity</Th>
                <Th>Given to</Th>
                <Th>Given by</Th>
              </Tr>
            </Thead>
            <Tbody>
              {removals.map((item) => {
                return (
                  <Tr key={item._id}>
                    <Td>{item.itemType === 'Charm Part' ? `${item.itemName} - ${item.itemCharmPartType}` : item.itemName}</Td>
                    <Td>{item.itemType}</Td>
                    <Td>{item.quantityRemoved}</Td>
                    <Td>
                      {typeof item.givenTo === 'string' && item.givenTo}
                      {typeof item.removedBy === 'string' && item.removedBy}
                    </Td>
                    <Td>{typeof item.removedBy === 'object' && item.removedBy.username}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default RemovalsPage;
