import { Alert, Box, Button, Container, Flex, Spinner, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EditItem from '../components/EditItemModal';
import { AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import GiveItemModal from '../components/GiveItemModal';

const ItemDetails = () => {
  const { isAdmin, fetchWithToken } = useContext(AuthContext);
  const { id } = useParams();
  const [itemData, setItemData] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const fetchItemInfo = async () => {
    try {
      const response = await fetchWithToken(`/items/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setItemData(data);
      } else if (response.status === 404) {
        setErrorMessage('Item not found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItemInfo();
  }, [id]);

  return (
    <>
      {!itemData && !errorMessage ? (
        <Spinner margin={'auto'} thickness="13px" speed="0.95s" emptyColor="gray.200" color="green.500" size="xl" />
      ) : errorMessage ? (
        <Box width="50%" height="100px" margin={'auto'} textAlign={'center'}>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
          <Button colorScheme="blue" marginX={'auto'} p={3} margin="1em" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>
      ) : (
        <Container maxW="xxl" centerContent>
          <Box justifyContent={'center'} p={3} backgroundColor={'#E6E6FA'} w={'100%'}>
            <Text fontWeight={'bold'} fontSize={'4xl'} align={'center'}>
              Item Details
            </Text>
          </Box>
          <Button marginX="auto" colorScheme="green">
            <Link to="/stash">Back to all items</Link>
          </Button>
          <Box width="60%" backgroundColor={'green.200'} textAlign={'center'} marginTop="1em" marginX="auto" p={3}>
            <Text fontSize={'2xl'} fontWeight={'bold'}>
              {itemData.itemName}
              {itemData.type === 'Charm Part' ? ` - ${itemData.charmPartType}` : null}
            </Text>
            <br />
            <Text fontSize={'xl'}>
              Type: {itemData.type} {itemData.faction ? ` for ${itemData.faction}` : null}
            </Text>
            <br />
            <Text>Quantity available: {itemData.quantity}</Text>
            <br />

            {itemData.donatedBy.length !== 0 ? <Text>Donated by: {itemData.donatedBy.map((name) => `${name} `)}</Text> : undefined}
            <br />
            {itemData.stashToon?.length > 1 ? <Text>On toon {itemData.stashToon}</Text> : undefined}
            <Flex justifyContent={'center'} alignContent={'center'} margin="1em 0">
              {isAdmin && (
                <EditItem
                  itemName={itemData.itemName}
                  donatedBy={itemData.donatedBy}
                  quantity={itemData.quantity}
                  stashToon={itemData.stashToon}
                  onReload={fetchItemInfo}
                  id={id}
                />
              )}
              {isAdmin && (
                <GiveItemModal
                  originalQuantity={itemData.quantity}
                  itemName={itemData.type === 'Charm Part' ? `${itemData.itemName} - ${itemData.charmPartType}` : itemData.itemName}
                  _id={itemData._id}
                  onReload={fetchItemInfo}
                />
              )}
            </Flex>
          </Box>
        </Container>
      )}
    </>
  );
};

export default ItemDetails;
