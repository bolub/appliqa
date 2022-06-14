import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { loginOp } from '../API/auth';
import AuthLayout from '../components/auth/AuthLayout';
import CustomLink from '../components/UI/CustomLink';
import FormInput from '../components/UI/Form/FormInput';
import ToastBody from '../components/UI/ToastBody';
import { setCookies } from 'cookies-next';
import { DASHBOARD_ROUTES } from '../utils/routes';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();

  const router = useRouter();

  const { mutate, isLoading } = useMutation(loginOp, {
    onSuccess: (data) => {
      const { user, jwt } = data;

      toast({
        position: 'top-right',
        isClosable: true,
        render: () => (
          <ToastBody title='Success' message='Logged in successfully' />
        ),
      });

      setCookies('USER_TOKEN', jwt, { maxAge: 604800 });
      setCookies('USER_ID', user.id, { maxAge: 604800 });
      setCookies('USER_AUTHENTICATED', 'true');
      setCookies('USER_NAME', user.username, { maxAge: 604800 });

      if (router?.query?.onboard === 'true') {
        window.location.href = `${DASHBOARD_ROUTES.BOARDS}?onboard=true`;
      } else {
        window.location.href = DASHBOARD_ROUTES.ANALYTICS;
      }
    },
    onError: (data: any) => {
      const errors = { ...data };

      toast({
        position: 'top-right',
        isClosable: true,
        render: () => (
          <ToastBody
            status='error'
            title={errors?.response?.data?.error?.name || 'Error'}
            message={
              errors?.response?.data?.error?.message || 'Something happened'
            }
          />
        ),
      });
    },
  });
  return (
    <AuthLayout imgSrc='login.svg'>
      <Heading
        mt={16}
        as='h1'
        fontWeight={'black'}
        fontSize='4xl'
        color='gray.800'
      >
        Login
      </Heading>

      <Text
        fontWeight={'semibold'}
        color='gray.800'
        fontSize={'lg'}
        mt={2}
        // mb={12}
      >
        Nice to have you back 😇
      </Text>

      {router?.query?.onboard === 'true' && (
        <Center
          mt={6}
          flexDir={'column'}
          py={6}
          borderRadius='lg'
          borderWidth={'1px'}
          borderColor='green.600'
          bg='green.50'
          px={{ base: 2, md: 10 }}
          textAlign='center'
        >
          <HStack spacing={3}>
            <Text fontSize={'lg'}> ✅</Text>
            <Text fontSize={'md'} fontWeight='bold'>
              Email confirmed, please login
            </Text>
          </HStack>
        </Center>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();

          mutate({ identifier: email, password });
        }}
      >
        <VStack spacing={8} mt={12}>
          <FormInput
            type='email'
            label='Email'
            for='email'
            inputProps={{
              placeholder: 'temisan@email.com',
              onChange: (e) => {
                setEmail(e.target.value);
              },
              value: email,
            }}
            formControlProps={{
              isRequired: true,
            }}
          />

          <FormInput
            type='password'
            label='Password'
            for='password'
            inputProps={{
              placeholder: '*********',
              onChange: (e) => {
                setPassword(e.target.value);
              },
              value: password,
            }}
            formControlProps={{
              isRequired: true,
            }}
          />
        </VStack>

        <Flex mt={8} flexDir='column'>
          <CustomLink
            href='/forgot-password'
            containerProps={{
              fontSize: 'sm',
              fontWeight: 'bold',
              color: 'green.500',
              ml: 'auto',
              mb: 2,
            }}
          >
            Forgot Password?
          </CustomLink>
          <Button
            isFullWidth
            colorScheme={'green'}
            type='submit'
            isLoading={isLoading}
          >
            Login
          </Button>
          <CustomLink
            href='/signup'
            containerProps={{
              fontSize: 'sm',
              fontWeight: 'bold',
              color: 'green.500',
              mt: 2,
              mx: 'auto',
            }}
          >
            Don&apos;t have an account?
          </CustomLink>
        </Flex>
      </form>
    </AuthLayout>
  );
}
