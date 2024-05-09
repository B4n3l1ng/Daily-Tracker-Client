/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

const QuestDetailsModal = ({ quest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Button _hover={{}} onClick={onOpen} colorScheme="purple">
        Quest Details
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>{quest.name} Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              <strong>Requirements:</strong> {quest.requirements.length === 0 ? 'None' : quest.requirements}
            </Text>

            <br />
            <Text>
              <strong>Starting NPC:</strong> {quest.startingNPC}
            </Text>
            <br />
            <Text>
              <strong>Rewards: </strong>
              {quest.rewards.map((reward, index) => {
                if (index !== quest.rewards.length - 1) {
                  return `${reward}, `;
                } else {
                  return `${reward}.`;
                }
              })}
            </Text>
            <br />
            <Text>
              <strong>Minimum Level:</strong> {quest.minimumLevel}
            </Text>
            <br />
            <Flex justifyContent={'center'}>
              <Button colorScheme="purple" onClick={onClose}>
                Close
              </Button>
            </Flex>
            <br />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default QuestDetailsModal;
