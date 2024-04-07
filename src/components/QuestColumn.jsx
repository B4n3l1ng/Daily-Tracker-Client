import { useDrop } from 'react-dnd';
import QuestCard from './QuestCard';
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

const QuestColumn = ({ title, quests, onMove }) => {
  const [, drop] = useDrop({
    accept: 'QUEST_CARD',
    drop: (item) => onMove(item.uid, title),
  });

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" width="90%">
      <Text fontSize="5xl">{title}</Text>
      <Box ref={drop} display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" width="80%" gap="1em" minH="60vh">
        {quests.map((quest) => (
          <QuestCard key={quest.uid} quest={quest} />
        ))}
      </Box>
    </Flex>
  );
};

export default QuestColumn;
