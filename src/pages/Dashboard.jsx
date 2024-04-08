import { Box, Button, Container, Text } from '@chakra-ui/react';

import CreateCharacter from '../components/CreateCharacter';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import List from '../components/List';

const Dashboard = () => {
  const [characterList, setCharacterList] = useState([]);
  const { fetchWithToken, logout } = useContext(AuthContext);

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
      <Button colorScheme="red" onClick={logout}>
        Logout
      </Button>
      <Box d="flex" flexDirection={'column'} alignItems={'center'} justifyItems={'center'} p={3} backgroundColor={'#E6E6FA'} w={'100%'}>
        <CreateCharacter onReload={fetchCharacters} />
        <List list={characterList} onReload={fetchCharacters} />{' '}
      </Box>
    </Container>
  );
};

export default Dashboard;
