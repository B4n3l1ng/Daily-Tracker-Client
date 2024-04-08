import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Signup from '../components/Signup';
import Login from '../components/Login';

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="#005C5C"
        backgroundColor="#005C5C"
        color="gold"
      >
        <Text fontSize="4xl" fontWeight={'bold'} align={'center'}>
          Dailies Tracker
        </Text>
      </Box>
      <Box
        backgroundColor={'#E6E6FA'}
        w="100%"
        p={4}
        borderRadius="lg"
        color="gold"
        borderColor="#005C5C"
        borderWidth="1px" /* backgroundColor="#005C5C" */
      >
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
