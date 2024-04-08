import { Flex } from '@chakra-ui/react';
import QuestColumn from './QuestColumn';

const QuestBoard = ({ completeQuests, incompleteQuests, handleChange }) => {
  const handleMove = (uid, destination) => {
    handleChange(uid, destination === 'Complete');
  };

  return (
    <Flex justifyContent="space-evenly" alignItems="flex-start" gap="2%">
      <QuestColumn title="Incomplete" quests={incompleteQuests} onMove={handleMove} />
      <QuestColumn title="Complete" quests={completeQuests} onMove={handleMove} />
    </Flex>
  );
};

export default QuestBoard;
