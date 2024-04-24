import { Box, Button, Container, Flex, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '../contexts/Auth.context';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import NewItemModal from '../components/NewItemModal';

const StashPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);

  const [items, setItems] = useState([]);
  const { fetchWithToken, logout, isAdmin } = useContext(AuthContext);

  const fetchItems = async () => {
    try {
      const response = await fetchWithToken('/items');
      if (response.status === 200) {
        const data = await response.json();
        setItems(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner margin={'auto'} thickness="13px" speed="0.95s" emptyColor="gray.200" color="green.500" size="xl" />
      ) : (
        <>
          {isAdmin && <NewItemModal onReload={fetchItems} isOpen={isOpen} onClose={onClose} />}
          <Container maxW="xxl" centerContent>
            <Box d="flex" justifyContent={'center'} p={3} backgroundColor={'#E6E6FA'} w={'100%'}>
              <Text fontWeight={'bold'} fontSize={'4xl'} align={'center'}>
                Alliance Stash
              </Text>
            </Box>
            <Flex justifyContent={'space-evenly'} width="100%">
              <Button colorScheme="red" onClick={logout} marginBottom={'1em'}>
                Logout
              </Button>
              {isAdmin && (
                <Button onClick={onOpen} colorScheme="blue" marginBottom={'1em'}>
                  New Item
                </Button>
              )}
              <Button colorScheme="purple">
                <Link to="/removals">Removals</Link>
              </Button>
              <Button colorScheme="green">
                <Link to="/dashboard">Dashboard Page</Link>
              </Button>
            </Flex>

            <Flex
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-evenly'}
              flexWrap={'wrap'}
              p={3}
              backgroundColor="#E6E6FA"
              w="100%"
              gap="1em"
            >
              {items.map((item) => {
                return <ItemCard key={item._id} {...item} />;
              })}
            </Flex>
          </Container>
        </>
      )}
    </>
  );
};

export default StashPage;
