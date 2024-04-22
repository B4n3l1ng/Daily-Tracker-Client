import { Box, Button, Container, Flex, Text } from '@chakra-ui/react';
import { AuthContext } from '../contexts/Auth.context';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import NewItemModal from '../components/NewItemModal';

const StashPage = () => {
  const [items, setItems] = useState([]);
  const { fetchWithToken, logout, isAdmin } = useContext(AuthContext);

  const fetchItems = async () => {
    try {
      const response = await fetchWithToken('/items');
      if (response.status === 200) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Container maxW="xxl" centerContent>
      <Box d="flex" justifyContent={'center'} p={3} backgroundColor={'#E6E6FA'} w={'100%'}>
        <Text fontWeight={'bold'} fontSize={'4xl'} align={'center'}>
          Alliance Stash
        </Text>
      </Box>
      <Button colorScheme="red" onClick={logout} marginBottom={'1em'}>
        Logout
      </Button>
      {isAdmin && <NewItemModal />}
      <Button colorScheme="green">
        <Link to="/dashboard">Dashboard Page</Link>
      </Button>
      <Flex
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-evenly'}
        flexWrap={'wrap'}
        p={3}
        backgroundColor="#E6E6FA"
        w="100%"
        gap="7%"
      >
        {items.map((item) => {
          return <ItemCard key={item._id} {...item} />;
        })}
      </Flex>
    </Container>
  );
};

export default StashPage;
