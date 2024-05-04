import { Box, Flex, Text } from '@chakra-ui/react';
import NotFoundImg from '../assets/NotFoundPowa.jpg';

const NotFound = () => {
  return (
    <Flex height="90vh" justifyContent={'center'}>
      <Flex width="100%" justifyContent={'flex-start'} alignItems={'center'} flexDirection={'column'}>
        <img src={NotFoundImg} alt="" style={{ width: '40%', height: '40%', marginTop: '1em' }} />
        <Text fontSize="4xl">Page not found!</Text>
        <Text>If you think this page should exist, contact Aliyah on Discord.</Text>
      </Flex>
    </Flex>
  );
};

export default NotFound;
