import { Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import CustomLink from '../components/UI/CustomLink';
import FormInput from '../components/UI/Form/FormInput';

const Login = () => {
  return (
    <AuthLayout>
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
        mb={12}
      >
        Welcome back
      </Text>

      <VStack spacing={8}>
        <FormInput
          type='email'
          label='Email'
          for='email'
          inputProps={{
            placeholder: 'temisan@email.com',
          }}
        />

        <FormInput
          type='password'
          label='Password'
          for='password'
          inputProps={{
            placeholder: '*********',
          }}
        />
      </VStack>

      <Flex mt={8} flexDir='column'>
        <CustomLink
          href='#'
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
        <Button isFullWidth colorScheme={'green'}>
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
          Don't have an account?
        </CustomLink>
      </Flex>
    </AuthLayout>
  );
};

export default Login;
