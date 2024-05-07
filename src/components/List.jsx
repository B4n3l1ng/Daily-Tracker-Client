/* eslint-disable react/prop-types */
import { Box, Button, Flex, Text, useToast, Menu, MenuButton, MenuList, MenuItem, useBreakpointValue } from '@chakra-ui/react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth.context';
import { ChevronDownIcon } from '@chakra-ui/icons';

const List = ({ list, onReload }) => {
  const { fetchWithToken } = useContext(AuthContext);
  const toast = useToast();
  const isSmallerThan768 = useBreakpointValue({ base: true, md: false }, { fallback: false });
  const navigate = useNavigate();

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

  const ascendCharacter = async (id) => {
    try {
      const response = await fetchWithToken(`/characters/${id}/ascend`, 'PUT');
      if (response.status === 202) {
        toast({ title: 'Character ascended and reset to 15!', status: 'success', duration: 5000, isClosable: true, position: 'bottom' });
        await onReload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box textAlign={'center'} marginTop="1em" backgroundColor="#005C5C" paddingBottom="1em">
      <Text fontSize={'4xl'} color="white" as="b">
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
          alignItems={'center'}
        >
          <Flex minW="40%" justifyContent={'space-evenly'} gap="1em" alignContent={'center'}>
            <Text fontSize={'xl'}>{character.name}</Text>

            <Text fontSize={'xl'}>Level {character.level}</Text>
          </Flex>
          {isSmallerThan768 ? (
            <Menu>
              <MenuButton as={Button} colorScheme="blue" rightIcon={<ChevronDownIcon />}>
                Character Actions
              </MenuButton>
              <MenuList color="black">
                <MenuItem onClick={() => navigate(`/character/${character._id}`)}>See Dailies</MenuItem>
                <MenuItem color="red" onClick={() => deleteCharacter(character._id)}>
                  Delete Character
                </MenuItem>
                <MenuItem onClick={() => levelUp(character._id)}>Level Up Character</MenuItem>
                <MenuItem isDisabled={character.isAscended} onClick={() => ascendCharacter(character._id)}>
                  Ascend Character
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Flex minW="60%" justifyContent={'space-evenly'} gap="0.5em" alignContent={'center'}>
              <Link to={`/character/${character._id}`}>
                <Button size="sm" minW="20%" colorScheme="yellow">
                  Dailies
                </Button>
              </Link>
              <Button colorScheme="red" size="sm" minW="20%" onClick={() => deleteCharacter(character._id)}>
                Delete
              </Button>
              <Button colorScheme="yellow" size="sm" minW="20%" onClick={() => levelUp(character._id)}>
                Level Up
              </Button>
              <Button
                isDisabled={character.isAscended}
                colorScheme="blue"
                size="sm"
                minW="20%"
                marginRight="1em"
                onClick={() => ascendCharacter(character._id)}
              >
                Ascend
              </Button>
            </Flex>
          )}
        </Flex>
      ))}
    </Box>
  );
};

export default List;
