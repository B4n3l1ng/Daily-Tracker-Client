/* eslint-disable react/prop-types */
import { Box, Button } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';

const QuestCard = ({ quest, onMove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'QUEST_CARD', // Define the drag item type
    item: { uid: quest.uid },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const backgroundColor = quest.isComplete ? 'green.200' : 'yellow.200';

  return (
    <Box
      ref={drag}
      borderWidth="1px"
      borderRadius="md"
      p="4"
      mb="4"
      backgroundColor={isDragging ? 'gray.200' : backgroundColor}
      opacity={isDragging ? 0.5 : 1}
      cursor="move"
      width="40%"
      minW="200px"
      textAlign={'center'}
      minH={'23vh'}
      marginX="auto"
    >
      <Text fontSize="xl" as="b" mb="2">
        {quest.name}
      </Text>
      <Text fontSize="lg">{quest.startingNPC}</Text>
      <Text fontSize="lg">{quest.requirements.length > 0 ? quest.requirements : undefined}</Text>
      <br />
      <Button
        colorScheme={quest.isComplete ? 'yellow' : 'green'}
        /* margin={'0 20%'} */
        onClick={() => onMove(quest.uid, quest.isComplete ? 'Incomplete' : 'Complete')}
      >
        Set as {quest.isComplete ? 'Incomplete' : 'Complete'}
      </Button>
    </Box>
  );
};

export default QuestCard;
