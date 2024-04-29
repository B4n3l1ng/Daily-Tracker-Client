/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Container, Flex, Text, useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Link, useParams } from 'react-router-dom';
import QuestBoard from '../components/QuestBoard';

const DailiesPage = () => {
  const [character, setCharacter] = useState();
  const [completeQuests, setCompleteQuests] = useState([]);
  const [completeQuestsDisplay, setCompleteQuestsDisplay] = useState(completeQuests);
  const [incompleteQuests, setIncompleteQuests] = useState([]);
  const [incompleteQuestsDisplay, setIncompleteQuestsDisplay] = useState(incompleteQuests);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchWithToken } = useContext(AuthContext);
  const { characterId } = useParams();
  const toast = useToast();

  const handleSearchComplete = (query) => {
    if (query.length === 0) {
      setCompleteQuestsDisplay(completeQuests);
    } else {
      const copy = JSON.parse(JSON.stringify(completeQuests));
      const filtered = copy.filter((quest) => quest.name.toLowerCase().includes(query.toLowerCase()));
      setCompleteQuestsDisplay(filtered);
    }
  };

  const handleSearchIncomplete = (query) => {
    if (query.length === 0) {
      setIncompleteQuestsDisplay(incompleteQuests);
    } else {
      const copy = JSON.parse(JSON.stringify(incompleteQuests));
      const filtered = copy.filter((quest) => quest.name.toLowerCase().includes(query.toLowerCase()));
      setIncompleteQuestsDisplay(filtered);
    }
  };

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
        setCompleteQuestsDisplay(completeQuestsArray);
        setIncompleteQuests(incompleteQuestsArray);
        setIncompleteQuestsDisplay(incompleteQuestsArray);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (uid, value) => {
    setIsLoading(true);
    const isComplete = completeQuests.find((quest) => quest.uid === uid);
    const isIncomplete = incompleteQuests.find((quest) => quest.uid === uid);
    if (isComplete && value === true) {
      return;
    } else if (isIncomplete && value === false) {
      return;
    }
    try {
      const response = await fetchWithToken(`/characters/${character._id}/quest/${uid}`, 'PUT', { isComplete: value });
      if (response.status === 202) {
        await fetchInfo();
        toast({ title: 'Quest updated!', status: 'success', duration: 5000, isClosable: true, position: 'bottom' });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [characterId]);

  const levelUp = async (id) => {
    setIsLoading(true);
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
    setIsLoading(true);
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
      <Box d="flex" justifyContent={'center'} p={3} backgroundColor={'#E6E6FA'} w={'100%'}>
        <Text fontSize="4xl" align={'center'} fontWeight={'bold'}>
          Dailies Tracker
        </Text>
      </Box>
      <Box d="flex" flexDirection={'column'} alignItems={'center'} justifyItems={'center'} p={3} backgroundColor={'#E6E6FA'} w={'100%'}>
        {character && (
          <>
            <Text fontSize={'xl'} align={'center'}>
              {character.name}
              {"'"}s Dailies, Level {character.level}
            </Text>
            <Flex direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Link to="/dashboard">
                <Button isLoading={isLoading} backgroundColor={'#005C5C'} color="gold" margin="1em 0" colorScheme="green">
                  Back to your characters
                </Button>
              </Link>

              <Button
                colorScheme="yellow"
                onClick={() => {
                  levelUp(character._id);
                }}
                isLoading={isLoading}
                isDisabled={character.level >= 150}
              >
                Level Up Character
              </Button>
              <Button isLoading={isLoading} colorScheme="red" onClick={() => resetServer(character._id)}>
                Manual Server Reset
              </Button>
            </Flex>
            <QuestBoard
              completeQuests={completeQuestsDisplay}
              incompleteQuests={incompleteQuestsDisplay}
              handleChange={handleChange}
              handleSearchComplete={handleSearchComplete}
              handleSearchIncomplete={handleSearchIncomplete}
            />
          </>
        )}
      </Box>
    </Container>
  );
};

export default DailiesPage;
