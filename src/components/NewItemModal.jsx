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

const NewItemModal = ({ onReload, isOpen, onClose }) => {
  const factions = ['Jadeon', 'Skysong', 'Mage', 'Vim', 'Lupin', 'Modo', 'Arden', 'Balo', 'Rayan', 'Celan', 'Forta', 'Voida'];

  const [type, setType] = useState('');
  const [charmPartType, setCharmPartType] = useState('');
  const [faction, setFaction] = useState('');
  const [name, setName] = useState('');
  const [stashToon, setStashToon] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [donatedBy, setDonatedBy] = useState('');
  const { fetchWithToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const reqBody = {
        type,
        faction: faction.length > 0 ? faction : undefined,
        charmPartType: charmPartType.length > 0 ? charmPartType : undefined,
        itemName: name,
        donatedBy: donatedBy.split(' '),
        quantity,
        stashToon,
      };
      const response = await fetchWithToken('/items', 'POST', reqBody);
      if (response.status === 201) {
        toast({ title: 'Item Creation Successful', status: 'success', duration: 5000, isClosable: true, position: 'bottom' });
        const data = await response.json();
        setIsLoading(false);
        onClose();
        navigate(`/stash/${data._id}`);
      } else {
        toast({ title: 'Item Creation Failed, please try again', status: 'error', duration: 5000, isClosable: true, position: 'bottom' });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          ) : undefined}
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
          ) : undefined}
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
          <FormControl id="donated">
            <FormLabel>Donated By:</FormLabel>
            <Input value={donatedBy} placeholder="Player names seperated by spaces" onChange={(event) => setDonatedBy(event.target.value)} />
          </FormControl>
          <FormControl id="stash">
            <FormLabel>Stash Toon Name:</FormLabel>
            <Input value={stashToon} onChange={(event) => setStashToon(event.target.value)} />
          </FormControl>
          <Button onClick={onSubmit} isLoading={isLoading} backgroundColor="#005C5C" color="#FFD700" width="100%" style={{ marginTop: 15 }}>
            Create
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewItemModal;
