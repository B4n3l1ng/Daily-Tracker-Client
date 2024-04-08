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
    <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      <Text fontSize="5xl" marginLeft={'-5%'}>
        {title}
      </Text>
      <Box
        ref={drop}
        display="flex"
        flexDirection="row"
        flexWrap={'wrap'}
        justifyContent="flex-start"
        alignItems="center"
        width="80%"
        gap="1em"
        minH="60vh"
      >
        {quests.map((quest) => (
          <QuestCard key={quest.uid} quest={quest} onMove={onMove} />
        ))}
      </Box>
    </Flex>
  );
};

export default QuestColumn;
