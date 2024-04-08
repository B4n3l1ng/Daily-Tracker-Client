/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import QuestCard from './QuestCard';
import { Box, Button } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

const QuestColumn = ({ title, quests, onMove }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const questsPerPage = 6;

  const [, drop] = useDrop({
    accept: 'QUEST_CARD',
    drop: (item) => onMove(item.uid, title),
  });

  // Logic to calculate which quests to display based on current page
  const indexOfLastQuest = currentPage * questsPerPage;
  const indexOfFirstQuest = indexOfLastQuest - questsPerPage;
  const currentQuests = quests.slice(indexOfFirstQuest, indexOfLastQuest);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      <Text fontSize="5xl" marginX="auto" marginBottom="1rem">
        {title}
      </Text>
      {/* Pagination */}
      <Flex justifyContent="center" alignItems="center" marginTop="1rem">
        {Array.from({ length: Math.ceil(quests.length / questsPerPage) }, (_, index) => (
          <Button
            key={index}
            onClick={() => paginate(index + 1)}
            marginBottom={'1em'}
            marginX="0.5em"
            colorScheme={title === 'Incomplete' ? 'yellow' : 'green'}
          >
            {index + 1}
          </Button>
        ))}
      </Flex>
      <Box
        ref={drop}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="center"
        width="80%"
        gap="1em"
        minHeight="40vh"
        marginX="auto"
        backgroundColor={'#E6E6FA'}
      >
        {currentQuests.map((quest) => (
          <QuestCard key={quest.uid} quest={quest} onMove={onMove} />
        ))}
      </Box>
    </Flex>
  );
};

export default QuestColumn;
