import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AuthContext } from '../contexts/Auth.context';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import NewItemModal from '../components/NewItemModal';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';

const StashPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const [isLoadingQuery, setIsLoadingQuery] = useState(false);
  const [originalData, setOriginalData] = useState();
  const [items, setItems] = useState([]);
  const { fetchWithToken, logout, isAdmin } = useContext(AuthContext);
  const [query, setQuery] = useState('');

  const fetchItems = async () => {
    try {
      const response = await fetchWithToken('/items');
      if (response.status === 200) {
        const data = await response.json();
        setOriginalData(data);
        setItems(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchType = async (type) => {
    setIsLoadingQuery(true);
    try {
      const response = await fetchWithToken(`/items/query?t=${type}`);
      if (response.status === 200) {
        const data = await response.json();
        setOriginalData(data);
        setItems(data);
        setIsLoadingQuery(false);
      }
    } catch (error) {
      console.log(error);

      toast({ title: 'Search Failed, please try again.', status: 'error', duration: 5000, isClosable: true, position: 'bottom' });
      setIsLoadingQuery(false);
    }
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
    const copy = JSON.parse(JSON.stringify(originalData));
    if (event.target.value.length > 0) {
      const filtered = copy.filter((item) => item.itemName.toLowerCase().includes(event.target.value.toLowerCase()));
      setItems(filtered);
    } else {
      setItems(originalData);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner margin={'auto'} thickness="13px" speed="0.95s" emptyColor="gray.200" color="green.500" size="xl" />
      ) : (
        <>
          {isAdmin && <NewItemModal onReload={fetchItems} isOpen={isOpen} onClose={onClose} />}
          <Container maxW="xxl" centerContent>
            <Box d="flex" justifyContent={'center'} p={3} backgroundColor={'#E6E6FA'} w={'100%'}>
              <Text fontWeight={'bold'} fontSize={'4xl'} align={'center'}>
                Alliance Stash
              </Text>
            </Box>
            <Flex justifyContent={'space-evenly'} width="100%">
              <Button colorScheme="red" onClick={logout} marginBottom={'1em'}>
                Logout
              </Button>
              {isAdmin && (
                <Button onClick={onOpen} colorScheme="blue" marginBottom={'1em'}>
                  New Item
                </Button>
              )}
              <Link to="/removals">
                <Button colorScheme="purple">Removals</Button>
              </Link>
              <Link to="/dashboard">
                <Button colorScheme="green">Dashboard Page</Button>
              </Link>
            </Flex>
            <Flex alignItems={'center'} justifyContent={'space-evenly'} width="90%" gap="2em">
              <Menu closeOnSelect={false}>
                <MenuButton isLoading={isLoadingQuery} as={Button} colorScheme="teal" rightIcon={<ChevronDownIcon />}>
                  Filter Options
                </MenuButton>
                <MenuList color="black">
                  <MenuOptionGroup defaultValue="" title="Type" type="radio">
                    <MenuItemOption
                      value="Charm Part"
                      onClick={() => {
                        fetchType('Charm-Part');
                      }}
                    >
                      Charm Part
                    </MenuItemOption>
                    <MenuItemOption
                      value="Equipment"
                      onClick={() => {
                        fetchType('Equipment');
                      }}
                    >
                      Equipment
                    </MenuItemOption>
                    <MenuItemOption
                      value="Pet"
                      onClick={() => {
                        fetchType('Pet');
                      }}
                    >
                      Pet
                    </MenuItemOption>
                    <MenuItemOption
                      value="Cosmetic"
                      onClick={() => {
                        fetchType('Cosmetic');
                      }}
                    >
                      Cosmetic{' '}
                    </MenuItemOption>
                    <MenuItemOption
                      value="Consumables and Miscelaneous"
                      onClick={() => {
                        fetchType('Consumables/Miscleaneous');
                      }}
                    >
                      Consumables and Miscelaneous
                    </MenuItemOption>
                    <MenuItemOption
                      value=" "
                      onClick={() => {
                        setQuery('');
                        fetchItems();
                      }}
                    >
                      Reset
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
              <FormControl width="90%">
                <InputGroup>
                  <InputLeftAddon>
                    <SearchIcon />
                  </InputLeftAddon>
                  <Input value={query} onChange={handleSearch} backgroundColor={'white'} placeholder="Input item name" />
                </InputGroup>
              </FormControl>
            </Flex>

            <Flex
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-evenly'}
              flexWrap={'wrap'}
              p={3}
              backgroundColor="#E6E6FA"
              w="100%"
              gap="1em"
            >
              {items.map((item) => {
                return <ItemCard key={item._id} {...item} />;
              })}
            </Flex>
          </Container>
        </>
      )}
    </>
  );
};

export default StashPage;
