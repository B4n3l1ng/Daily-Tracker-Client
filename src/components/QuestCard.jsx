/* eslint-disable react/prop-types */
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';

const QuestCard = ({ quest }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'QUEST_CARD', // Define the drag item type
    item: { uid: quest.uid },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const backgroundColor = quest.isComplete ? 'green.200' : 'yellow.200';
  const color = quest.isComplete ? 'green.800' : 'black';

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
      width="90%"
    >
      <Text fontSize="xl" fontWeight="bold" mb="2">
        {quest.name}
      </Text>
      <Text fontSize="lg">Starting NPC: {quest.startingNPC}</Text>
      <Text fontSize="lg">Requirements: {quest.requirements.length > 0 ? quest.requirements : 'none'}</Text>
    </Box>
  );
};

export default QuestCard;
