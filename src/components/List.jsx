/* eslint-disable react/prop-types */
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth.context';

const List = ({ list, onReload }) => {
  const { fetchWithToken } = useContext(AuthContext);
  const toast = useToast();

  const deleteCharacter = async (id) => {
    try {
      const response = await fetchWithToken(`/characters/${id}`, 'DELETE');
      if (response.status === 202) {
        toast({ title: 'Character Deleted', status: 'success', duration: 5000, isClosable: true, position: 'bottom' });
        await onReload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const levelUp = async (id) => {
    try {
      const response = await fetchWithToken(`/characters/${id}/levelUp`, 'PUT');
      if (response.status === 202) {
        toast({ title: 'Character leveled up!', status: 'success', duration: 5000, isClosable: true, position: 'bottom' });
        await onReload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box textAlign={'center'} marginTop="1em" backgroundColor="#005C5C" paddingBottom="1em">
      <Text fontSize={'4xl'} color="white">
        Character List
      </Text>
      {list.map((character) => (
        <Flex
          margin="1em auto"
          justifyContent={'space-evenly'}
          padding="0.5em"
          border="1px solid #FFD700"
          flexDirection={'row'}
          w="80%"
          key={character._id}
          color="#FFD700"
          flexWrap={'wrap'}
          rowGap={'1em'}
        >
          <Flex minW="50%" justifyContent={'space-evenly'} gap="1em" alignContent={'center'}>
            <Text minW="50%" padding="0">
              {character.name}
            </Text>

            <Text minW="60%">Level {character.level}</Text>
          </Flex>
          <Flex minW="50%" justifyContent={'space-evenly'} gap="1em" alignContent={'center'}>
            <Link to={`/character/${character._id}`}>
              <Button size="sm" minW="25%" colorScheme="yellow">
                Dailies
              </Button>
            </Link>
            <Button colorScheme="red" size="sm" minW="25%" onClick={() => deleteCharacter(character._id)}>
              Delete
            </Button>
            <Button colorScheme="yellow" size="sm" minW="25%" onClick={() => levelUp(character._id)}>
              Level Up
            </Button>
          </Flex>
        </Flex>
      ))}
    </Box>
  );
};

export default List;
