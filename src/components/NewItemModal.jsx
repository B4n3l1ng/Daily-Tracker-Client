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
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { useNavigate } from 'react-router-dom';

const factions = ['Jadeon', 'Skysong', 'Mage', 'Vim', 'Lupin', 'Modo', 'Arden', 'Balo', 'Rayan', 'Celan', 'Forta', 'Voida'];

const NewItemModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = useState('');
  const [charmPartType, setCharmPartType] = useState('');
  const [faction, setFaction] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { fetchWithToken } = useContext(AuthContext);
  const [donatedBy, setDonatedBy] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const reqBody = {
        type,
        faction: faction.length > 0 ? faction : undefined,
        charmPartType: charmPartType.length > 0 ? charmPartType : undefined,
        itemName: name,
        donatedBy: donatedBy.split(' '),
        quantity,
      };
      const response = await fetchWithToken('/items', 'POST', reqBody);
      if (response.status === 201) {
        toast({ title: 'Item Creaion Successful', status: 'success', duration: 5000, isClosable: true, position: 'bottom' });
        const data = await response.json();
        onClose();
        navigate(`/stash/${data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box w="75%" margin={'0 auto'} display="flex" justifyContent={'center'} backgroundColor={'transparent'}>
      <Button _hover={{}} onClick={onOpen} colorScheme="blue" marginBottom={'1em'}>
        New Item
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>New Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired={true} id="type">
              <FormLabel>Item type:</FormLabel>
              <Select onChange={(event) => setType(event.target.value)} placeholder="Select an option">
                <option value="Charm Part">Charm Part</option>
                <option value="Cosmetic">Cosmetic</option>
                <option value="Equipment">Equipment</option>
                <option value="Pet">Pet</option>
                <option value="Consumables/Miscleaneous">Consumables/Miscleaneous</option>
              </Select>
            </FormControl>
            {type === 'Charm Part' ? (
              <FormControl isRequired={true} id="charmPartType">
                <FormLabel>Charm part type:</FormLabel>
                <Select onChange={(event) => setCharmPartType(event.target.value)} placeholder="Select an option">
                  <option value="Water">Water</option>
                  <option value="Earth">Earth</option>
                  <option value="Metal">Metal</option>
                  <option value="Fire">Fire</option>
                  <option value="Wood">Wood</option>
                </Select>
              </FormControl>
            ) : null}
            {type === 'Charm Part' ? (
              <FormControl isRequired={true} id="faction">
                <FormLabel>For what Faction:</FormLabel>
                <Select onChange={(event) => setFaction(event.target.value)} placeholder="Select an option">
                  {factions.map((faction) => (
                    <option key={faction} value={faction}>
                      {faction}
                    </option>
                  ))}
                </Select>
              </FormControl>
            ) : null}
            <FormControl isRequired={true} id="name">
              <FormLabel>Item Name:</FormLabel>
              <Input value={name} placeholder="Item name" onChange={(event) => setName(event.target.value)} />
            </FormControl>
            <FormControl isRequired={true} id="quantity">
              <FormLabel>Quantity:</FormLabel>
              <NumberInput value={quantity} onChange={(value) => setQuantity(value)} min={1}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl isRequired={true} id="donated">
              <FormLabel>Donated By:</FormLabel>
              <Input value={donatedBy} placeholder="Player names seperated by spaces" onChange={(event) => setDonatedBy(event.target.value)} />
            </FormControl>
            <Button onClick={onSubmit} /* isLoading={isLoading} */ backgroundColor="#005C5C" color="#FFD700" width="100%" style={{ marginTop: 15 }}>
              Create
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default NewItemModal;