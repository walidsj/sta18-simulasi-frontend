import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Flex, Heading, Text } from '@chakra-ui/layout';
import AuthLayout from '../../layouts/AuthLayout';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import authService from '../../services/authService';
import { userState } from '../../stores/user';
import { useSetRecoilState } from 'recoil';
import { useHistory, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Icon from '@chakra-ui/icon';
import jwtDecode from 'jwt-decode';

const Login = () => {
  // get URL params redirect
  const location = useLocation();
  const redirectURI = new URLSearchParams(location.search);

  const router = useHistory();
  const setUser = useSetRecoilState(userState);

  const [isShow, setIsShow] = useState();

  // validation form
  const schema = object().shape({
    email: string()
      .required('Alamat email harus diisi.')
      .email('Alamat email tidak valid.')
      .max(60, 'Alamat email maksimal 60 karakter.'),
    password: string().required('Kata sandi harus diisi.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const onSubmit = async values => {
    await authService
      .login(values)
      .then(({ token }) => {
        setUser(jwtDecode(token));
        localStorage.setItem('token', token);
        return router.push(
          `${redirectURI.get('redirectpath')}${
            redirectURI.get('redirectquery')
              ? `?${redirectURI.get('redirectquery')}`
              : ''
          }`
        );
      })
      .catch(({ response }) => {
        return swal('Failed', response.data.message, 'error');
      });
  };

  return (
    <AuthLayout>
      <Helmet title="Login" />
      <Heading size="lg">Login</Heading>
      <Text mb="6">Masuk ke akun STA'18</Text>

      <Flex as="form" flexDir="column" onSubmit={handleSubmit(onSubmit)}>
        <FormControl my="2.5" isRequired isInvalid={errors.email}>
          <FormLabel>Alamat Email</FormLabel>
          <Input
            {...register('email')}
            size="md"
            variant="flushed"
            type="email"
            placeholder="Alamat Email"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl my="2.5" isRequired isInvalid={errors.password}>
          <FormLabel>Kata Sandi</FormLabel>
          <InputGroup size="md">
            <Input
              {...register('password')}
              variant="flushed"
              type={isShow ? 'text' : 'password'}
              placeholder="Kata Sandi"
            />
            <InputRightElement>
              <Button onClick={() => setIsShow(!isShow)} bgColor="transparent">
                <Icon as={isShow ? FaEyeSlash : FaEye} fontSize="20px" />
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl my="2.5">
          <Button
            w="full"
            type="submit"
            colorScheme="red"
            boxShadow="lg"
            isLoading={isSubmitting}
          >
            Login
          </Button>
        </FormControl>
      </Flex>
      <FormControl mt="6" mb="3" fontSize="sm">
        Belum memiliki akun?{' '}
        <a
          href="https://sta18pknstan.com/register"
          target="_blank"
          rel="noreferrer"
        >
          <Button type="button" size="sm" variant="link" colorScheme="red">
            Daftar di web utama
          </Button>
        </a>
      </FormControl>
    </AuthLayout>
  );
};

export default Login;
