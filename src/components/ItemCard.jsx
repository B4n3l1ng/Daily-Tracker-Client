import { Box, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ _id, type, donatedBy, faction, charmPartType, itemName, quantity }) => {
  const [fullItemName] = useState(type === 'Charm Part' ? `${itemName} - ${charmPartType}` : itemName);

  return (
    <Box
      marginTop={'1em'}
      minH={'25vh'}
      p={3}
      borderWidth="1px"
      borderRadius="md"
      backgroundColor={'green.200'}
      width="20%"
      minWidth={['20vw']}
      textAlign={'center'}
      marginBottom="1em"
    >
      <Text fontSize="xl" as="b" mb="2">
        {fullItemName}
      </Text>
      {window.innerWidth > 600 && ( // Hide quantity on smaller screens
        <Text>Quantity available: {quantity}</Text>
      )}
      <br />
      <Button colorScheme="yellow" m={3}>
        <Link to={`/stash/${_id}`}>More Info</Link>
      </Button>
    </Box>
  );
};

export default ItemCard;
