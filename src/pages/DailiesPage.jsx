/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Container, Flex, Text, useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Link, useParams } from 'react-router-dom';
import QuestBoard from '../components/QuestBoard';

const DailiesPage = () => {
  const [character, setCharacter] = useState();
  const [completeQuests, setCompleteQuests] = useState([]);
  const [incompleteQuests, setIncompleteQuests] = useState([]);
  const { fetchWithToken } = useContext(AuthContext);
  const { characterId } = useParams();
  const toast = useToast();

  const fetchInfo = async () => {
    try {
      const response = await fetchWithToken(`/characters/${characterId}`);
      if (response.status === 200) {
        const data = await response.json();
        data.availableQuests.sort((a, b) => {
          if (a.minimumLevel !== b.minimumLevel) {
            return a.minimumLevel - b.minimumLevel;
          }

          return a.name.localeCompare(b.name);
        });
        const completeQuestsArray = data.availableQuests.filter((quest) => quest.isComplete);
        const incompleteQuestsArray = data.availableQuests.filter((quest) => !quest.isComplete);
        setCharacter(data);
        setCompleteQuests(completeQuestsArray);
        setIncompleteQuests(incompleteQuestsArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (uid, value) => {
    try {
      const response = await fetchWithToken(`/characters/${character._id}/quest/${uid}`, 'PUT', { isComplete: value });
      if (response.status === 202) {
        fetchInfo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [characterId]);

  const levelUp = async (id) => {
    try {
      const response = await fetchWithToken(`/characters/${id}/levelUp`, 'PUT');
      if (response.status === 202) {
        toast({ title: 'Character leveled up!', status: 'success', duration: 5000, isClosable: true, position: 'bottom' });
        await fetchInfo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetServer = async (id) => {
    try {
      const response = await fetchWithToken(`/characters/${id}/questReset`, 'PUT');
      if (response.status === 202) {
        const data = await response.json();
        toast({ title: data.message, status: 'success', duration: 5000, isClosable: true, position: 'bottom' });
        await fetchInfo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxW="xxl">
      <Box d="flex" justifyContent={'center'} p={3} bg={'white'} w={'100%'}>
        <Text fontSize="4xl" align={'center'}>
          Dailies Tracker
        </Text>
      </Box>
      <Box d="flex" flexDirection={'column'} alignItems={'center'} justifyItems={'center'} p={3} bg={'white'} w={'100%'}>
        {character && (
          <>
            <Text fontSize={'xl'} align={'center'}>
              {character.name}
              {"'"}s Dailies, Level {character.level}
            </Text>
            <Flex direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Link to="/dashboard">
                <Button backgroundColor={'#005C5C'} color="gold" margin="1em 0" colorScheme="green">
                  Back to your characters
                </Button>
              </Link>
              <Button
                colorScheme="yellow"
                onClick={() => {
                  levelUp(character._id);
                }}
              >
                Level Up Character
              </Button>
              <Button colorScheme="red" onClick={() => resetServer(character._id)}>
                Manual Server Reset
              </Button>
            </Flex>
            <QuestBoard completeQuests={completeQuests} incompleteQuests={incompleteQuests} handleChange={handleChange} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default DailiesPage;
