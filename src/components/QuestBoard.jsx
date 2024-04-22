/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/react';
import QuestColumn from './QuestColumn';
import { useState } from 'react';

const QuestBoard = ({ completeQuests, incompleteQuests, handleChange, handleSearchComplete, handleSearchIncomplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleMove = async (uid, destination) => {
    setIsLoading(true);
    await handleChange(uid, destination === 'Complete');
    setIsLoading(false);
  };

  return (
    <Flex justifyContent="space-evenly" alignItems="flex-start" gap="2%">
      <QuestColumn title="Incomplete" quests={incompleteQuests} onMove={handleMove} handleSearch={handleSearchIncomplete} isLoading={isLoading} />
      <QuestColumn title="Complete" quests={completeQuests} onMove={handleMove} handleSearch={handleSearchComplete} isLoading={isLoading} />
    </Flex>
  );
};

export default QuestBoard;
