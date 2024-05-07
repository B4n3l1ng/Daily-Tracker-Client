/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';

const CreateCharacter = ({ onReload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);
  const [isAscended, setIsAscended] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchWithToken } = useContext(AuthContext);
  const toast = useToast();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const reqBody = { name, level, isAscended };
      const response = await fetchWithToken('/characters', 'POST', reqBody);
      if (response.status === 201) {
        toast({ title: 'Creation Successful', status: 'success', duration: 5000, isClosable: true, position: 'bottom' });
        setIsLoading(false);
        setName('');
        setLevel(1);
        onClose();
        await onReload();
      }
    } catch (error) {
      toast({
        title: 'Creation Failed',
        status: 'warning',
        description: error.response.data.message,
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      setIsLoading(false);
    }
  };

  return (
    <>
      <Button _hover={{}} onClick={onOpen} colorScheme="yellow">
        New Character
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>New Character</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" isRequired marginBottom="1em">
              <FormLabel>Name:</FormLabel>
              <Input placeholder="Character name" onChange={(event) => setName(event.target.value)} value={name} />
            </FormControl>
            <FormControl id="level" isRequired marginBottom="1em">
              <FormLabel>Level:</FormLabel>
              <NumberInput
                w={'100%'}
                onChange={(value) => {
                  setLevel(value);
                }}
                value={level}
                min={1}
                max={150}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl id="ascended">
              <Checkbox checked={isAscended} onChange={(event) => setIsAscended(event.target.checked)} colorScheme="green">
                Ascended?
              </Checkbox>
            </FormControl>
            <Button onClick={onSubmit} isLoading={isLoading} backgroundColor="#005C5C" color="#FFD700" width="100%" style={{ marginTop: 15 }}>
              Create
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCharacter;
