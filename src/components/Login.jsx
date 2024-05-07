import { Button, Checkbox, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth.context';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const navigate = useNavigate();

  const { saveToken } = useContext(AuthContext);

  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!username || !password) {
      toast({ title: 'Please fill all the fields', status: 'warning', duration: 5000, isClosable: true, position: 'bottom' });
      setIsLoading(false);
      return;
    }

    const reqBody = { username, password, stayLoggedIn };
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, reqBody, config);
      if (response.status === 200) {
        toast({ title: 'Login Successful', status: 'success', duration: 5000, isClosable: true, position: 'bottom' });
        const { data } = response;
        saveToken(data.token);
        setIsLoading(false);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response.status === 403) {
        toast({
          title: 'Login Failed',
          status: 'warning',
          description: error.response.data.message,
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="Username-login" isRequired>
        <FormLabel color="#005C5C">Username:</FormLabel>
        <Input
          _placeholder={{ opacity: 1, color: '#005C5C' }}
          placeholder="Enter your username here"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          color="#005C5C"
        />
      </FormControl>
      <FormControl id="password-login" isRequired>
        <FormLabel color="#005C5C">Password:</FormLabel>
        <InputGroup>
          <Input
            _placeholder={{ opacity: 1, color: '#005C5C' }}
            placeholder="Enter your password here"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            type={show ? 'text' : 'password'}
            color="#005C5C"
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" color="gold" _hover={{}} backgroundColor="#005C5C" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl marginTop="1em">
        <Checkbox color="green" colorScheme="green" checked={stayLoggedIn} onChange={(e) => setStayLoggedIn(e.target.checked)}>
          Stay logged in
        </Checkbox>
      </FormControl>
      <Button backgroundColor="#005C5C" width="50%" style={{ marginTop: 15 }} color="#FFD700" onClick={handleSubmit} isLoading={isLoading}>
        Login
      </Button>
    </VStack>
  );
};

export default Login;
