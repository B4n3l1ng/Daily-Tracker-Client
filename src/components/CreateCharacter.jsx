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
import { success, fail } from '../utils/ToastIcons';

const CreateCharacter = ({ onReload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchWithToken } = useContext(AuthContext);
  const toast = useToast();

  const [reqBody, setReqBody] = useState({ name: '', level: 1, isAscended: false });

  const handleInput = (value, name) => {
    setReqBody((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetchWithToken('/characters', 'POST', reqBody);
      if (response.status === 201) {
        toast({
          title: 'Creation Successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
          icon: success,
        });
        setIsLoading(false);
        setReqBody({ name: '', level: 1, isAscended: false });
        onClose();
        await onReload();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Creation Failed',
        status: 'warning',
        description: error.response?.data?.message || 'Internal Server Error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
        icon: fail,
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
              <Input
                placeholder="Character name"
                name="name"
                onChange={(event) => handleInput(event.target.value, event.target.name)}
                value={reqBody.name}
              />
            </FormControl>
            <FormControl id="level" isRequired marginBottom="1em">
              <FormLabel>Level:</FormLabel>
              <NumberInput w={'100%'} name="level" onChange={(value) => handleInput(value, 'level')} value={reqBody.level} min={1} max={150}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl id="ascended">
              <Checkbox
                name="isAscended"
                checked={reqBody.isAscended}
                onChange={(event) => handleInput(event.target.checked, event.target.name)}
                colorScheme="green"
              >
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
