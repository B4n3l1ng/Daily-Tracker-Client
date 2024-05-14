import { Button, Checkbox, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth.context';
import axios from 'axios';
import { success, fail } from '../utils/ToastIcons';
const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const navigate = useNavigate();

  const { saveToken } = useContext(AuthContext);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!username || !password || !passwordConfirm) {
      toast({ title: 'Please fill all the fields', status: 'warning', duration: 5000, isClosable: true, position: 'bottom', icon: fail });
      setIsLoading(false);
      return;
    }
    if (password !== passwordConfirm) {
      toast({ title: 'Passwords do bot match', status: 'warning', duration: 5000, isClosable: true, position: 'bottom', icon: fail });
      setIsLoading(false);
      return;
    }

    const reqBody = { username, password, stayLoggedIn };

    try {
      const config = { headers: { 'Content-Type': 'application/json' } };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, reqBody, config);
      if (response.status === 201) {
        toast({ title: 'Registration Successful', status: 'success', duration: 5000, isClosable: true, position: 'bottom', icon: success });
        const { data } = response;
        saveToken(data.token);
        setIsLoading(false);
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error.response.data.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
        icon: fail,
      });
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <VStack spacing="5px">
      <FormControl id="Username" isRequired>
        <FormLabel color="#005C5C">Username:</FormLabel>
        <Input
          _placeholder={{ opacity: 1, color: '#005C5C' }}
          placeholder="Enter your username here"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          color="#005C5C"
        />
      </FormControl>
      <FormControl id="password" isRequired>
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
            <Button h="1.75rem" size="sm" onClick={handleClick} color="gold" backgroundColor="#005C5C">
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password-confirm" isRequired>
        <FormLabel color="#005C5C">Confirm your password:</FormLabel>
        <InputGroup>
          <Input
            _placeholder={{ opacity: 1, color: '#005C5C' }}
            placeholder="Enter your password again"
            onChange={(event) => setPasswordConfirm(event.target.value)}
            value={passwordConfirm}
            type={show ? 'text' : 'password'}
            color="#005C5C"
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleClick} color="gold" backgroundColor="#005C5C">
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
      <Button color="#FFD700" backgroundColor="#005C5C" width="50%" style={{ marginTop: 15 }} onClick={handleSubmit} isLoading={isLoading}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
