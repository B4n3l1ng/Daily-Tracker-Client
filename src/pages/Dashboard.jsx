import { Box, Container, Flex, Spinner, Text } from '@chakra-ui/react';

import CreateCharacter from '../components/CreateCharacter';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import List from '../components/List';

const Dashboard = () => {
  const [characterList, setCharacterList] = useState([]);
  const { fetchWithToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const fetchCharacters = async () => {
    try {
      const response = await fetchWithToken('/characters');
      if (response.status === 200) {
        const data = await response.json();
        setCharacterList(data);
        setIsLoading(false);
      }
      if (response.status === 404) {
        setCharacterList([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Flex width="100%" height={'90vh'} alignContent={'center'}>
          <Spinner margin={'auto'} thickness="13px" speed="0.95s" emptyColor="gray.200" color="green.500" size="xl" />
        </Flex>
      ) : (
        <Container maxW="xxl" centerContent>
          <Box d="flex" justifyContent={'center'} p={3} backgroundColor={'#E6E6FA'} w={'100%'}>
            <Text fontWeight={'bold'} fontSize={'4xl'} align={'center'}>
              Dashboard
            </Text>
            <Flex justifyContent={'center'} marginTop="1em">
              <CreateCharacter onReload={fetchCharacters} />
            </Flex>
          </Box>
          <Box d="flex" flexDirection={'column'} alignItems={'center'} justifyItems={'center'} p={3} backgroundColor={'#E6E6FA'} w={'100%'}>
            <List list={characterList} onReload={fetchCharacters} />{' '}
          </Box>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
