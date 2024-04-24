import { Box, Button, Container, Flex, Text } from '@chakra-ui/react';

import CreateCharacter from '../components/CreateCharacter';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import List from '../components/List';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [characterList, setCharacterList] = useState([]);
  const { fetchWithToken, logout, isAdmin } = useContext(AuthContext);

  const fetchCharacters = async () => {
    try {
      const response = await fetchWithToken('/characters');
      if (response.status === 200) {
        const data = await response.json();
        setCharacterList(data);
      }
      if (response.status === 404) {
        setCharacterList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <Container maxW="xxl" centerContent>
      <Box d="flex" justifyContent={'center'} p={3} backgroundColor={'#E6E6FA'} w={'100%'}>
        <Text fontWeight={'bold'} fontSize={'4xl'} align={'center'}>
          Dashboard
        </Text>
      </Box>
      <Flex width="100%" justifyContent={'space-evenly'}>
        <Button colorScheme="red" onClick={logout}>
          Logout
        </Button>
        {isAdmin && (
          <Button colorScheme="green">
            <Link to="/stash">Alliance Stash</Link>
          </Button>
        )}
        <CreateCharacter onReload={fetchCharacters} />
      </Flex>

      <Box d="flex" flexDirection={'column'} alignItems={'center'} justifyItems={'center'} p={3} backgroundColor={'#E6E6FA'} w={'100%'}>
        <List list={characterList} onReload={fetchCharacters} />{' '}
      </Box>
    </Container>
  );
};

export default Dashboard;
