import { Box, Button, Checkbox, Container, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Link, useParams } from 'react-router-dom';

const DailiesPage = () => {
  const [character, setCharacter] = useState();
  const { fetchWithToken } = useContext(AuthContext);
  const { characterId } = useParams();

  const hideColumns = useBreakpointValue({ base: true, md: false });

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
        setCharacter(data);
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
              {"'"}s Dailies
            </Text>
            <Link to="/dashboard">
              <Button backgroundColor={'#005C5C'} color="gold" margin="1em 0">
                Back to your characters
              </Button>
            </Link>
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th textAlign={'center'}>Name</Th>
                    {!hideColumns && <Th textAlign={'center'}>Starting NPC</Th>}
                    {!hideColumns && <Th textAlign={'center'}>Requirements</Th>}
                    <Th textAlign={'center'}>Complete?</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {character.availableQuests.map((quest) => (
                    <Tr key={quest.uid}>
                      <Td textAlign={'center'} fontSize={'1em'}>
                        {quest.name}
                      </Td>
                      {!hideColumns && (
                        <Td textAlign={'center'} fontSize={'1em'}>
                          {quest.startingNPC}
                        </Td>
                      )}
                      {!hideColumns && (
                        <Td textAlign={'center'} fontSize={'1em'}>
                          {quest.requirements}
                        </Td>
                      )}
                      <Td textAlign={'center'}>
                        <Checkbox
                          borderColor="black"
                          isChecked={quest.isComplete}
                          onChange={() => {
                            handleChange(quest.uid, !quest.isComplete);
                          }}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Container>
  );
};

export default DailiesPage;
