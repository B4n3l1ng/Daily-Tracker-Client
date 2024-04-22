import { Box, Button, Container, Spinner, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { Link, useParams } from 'react-router-dom';
import EditItem from '../components/EditItemModal';

const ItemDetails = () => {
  const { isAdmin, fetchWithToken } = useContext(AuthContext);
  const { id } = useParams();
  const [itemData, setItemData] = useState();

  const fetchItemInfo = async () => {
    try {
      const response = await fetchWithToken(`/items/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setItemData(data);
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
      {!itemData ? (
        <Spinner margin={'auto'} thickness="13px" speed="0.95s" emptyColor="gray.200" color="green.500" size="xl" />
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

            <Text>Donated by: {itemData.donatedBy.map((name) => `${name}`)}</Text>
            <br />
            <Text fontWeight={'bold'}>Please contact Eunice, devZey or Lord_Z to request any items from the stash.</Text>

            {isAdmin && <EditItem quantity={itemData.quantity} onReload={fetchItemInfo} id={id} />}
          </Box>
        </Container>
      )}
    </>
  );
};

export default ItemDetails;
