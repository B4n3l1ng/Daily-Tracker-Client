import {
  Box,
  Button,
  Flex,
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
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { useNavigate } from 'react-router-dom';

const EditItem = ({ donatedBy, quantity, onReload, stashToon, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newQuantity, setNewQuantity] = useState(quantity);
  const [newDonatedBy, setNewDonatedBy] = useState(donatedBy ? donatedBy.join(' ') : '');
  const [newStashToon, setNewStashToon] = useState(stashToon);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchWithToken } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const reqBody = { newQuantity, newDonatedBy: newDonatedBy.split(' '), newStashToon };
      const response = await fetchWithToken(`/items/${id}`, 'PUT', reqBody);
      if (response.status === 202) {
        toast({ title: 'Item Update Successful', status: 'success', duration: 5000, isClosable: true, position: 'bottom' });
        setIsLoading(false);
        onClose();
        await onReload();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Update Failed',
        status: 'warning',
        description: error.response.data.message,
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      const response = await fetchWithToken(`/items/${id}`, 'DELETE');
      if (response.status === 202) {
        toast({ title: 'Item Deletion Successful', status: 'success', duration: 5000, isClosable: true, position: 'bottom' });
        setIsLoading(false);
        onClose();
        navigate('/stash');
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Deletion Failed',
        status: 'warning',
        description: error.response.data.message,
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <Box w="75%" margin={'0 auto'} display="flex" justifyContent={'center'} backgroundColor={'transparent'}>
      <Button _hover={{}} onClick={onOpen} colorScheme="red">
        Edit Item
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>Edit Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="quantity" isRequired marginBottom="1em">
              <FormLabel>Quantity:</FormLabel>
              <NumberInput
                w={'100%'}
                onChange={(value) => {
                  setNewQuantity(value);
                }}
                value={newQuantity}
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
            <FormControl id="donatedBy" isRequired marginBottom="1em">
              <FormLabel>Donated by:</FormLabel>
              <Input value={newDonatedBy} onChange={(event) => setNewDonatedBy(event.target.value)} placeholder="Player names seperated by spaces" />
            </FormControl>
            <FormControl id="stashToon" isRequired marginBottom="1em">
              <FormLabel>Stash Toon:</FormLabel>
              <Input value={newStashToon} onChange={(event) => setNewStashToon(event.target.value)} />
            </FormControl>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Button onClick={onSubmit} isLoading={isLoading} backgroundColor="#005C5C" color="#FFD700" width="45%" style={{ marginTop: 15 }}>
                Update
              </Button>
              <Button width="45%" colorScheme="red" style={{ marginTop: 15 }} onClick={onDelete} isLoading={isLoading}>
                Delete Item
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditItem;
