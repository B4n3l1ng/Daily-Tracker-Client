/* eslint-disable react/prop-types */
import {
  Box,
  Button,
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
import { useNavigate } from 'react-router-dom';

import { success, fail } from '../utils/ToastIcons';

const GiveItemModal = ({ _id, originalQuantity, itemName, onReload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState(1);
  const [player, setPlayer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { fetchWithToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const reqBody = { quantity, player };
      const response = await fetchWithToken(`/items/${_id}/giveTo`, 'PUT', reqBody);
      if (response.status === 200) {
        toast({ title: 'Item Removal Successful', status: 'success', duration: 5000, isClosable: true, position: 'bottom', icon: success });
        setIsLoading(false);
        onClose();
        onReload();
      } else if (response.status === 404) {
        toast({ title: 'Item not Found', status: 'error', duration: 5000, isClosable: true, position: 'bottom', item: fail });
        setIsLoading(false);
        onClose();
        navigate('/stash');
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Update Failed',
        status: 'warning',
        description: error.response?.data?.message || 'Internal Server Error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
        icon: fail,
      });
    }
  };

  return (
    <Box w="75%" margin={'0 auto'} display="flex" justifyContent={'center'} backgroundColor={'transparent'}>
      <Button _hover={{}} onClick={onOpen} colorScheme="blue">
        Give Item to Player
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Give {itemName} to Player</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={'center'}>
            <FormControl isRequired="true" id="quantity">
              <FormLabel>Quantity:</FormLabel>
              <NumberInput value={quantity} onChange={(value) => setQuantity(value)} min={1} max={originalQuantity}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl isRequired="true" id="playerName">
              <FormLabel>Player name:</FormLabel>
              <Input placeholder="Player name" value={player} onChange={(event) => setPlayer(event.target.value)}></Input>
            </FormControl>
            <Button onClick={onSubmit} isLoading={isLoading} colorScheme="blue" width="60%" marginTop="1em">
              Save
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GiveItemModal;
