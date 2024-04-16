import {
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { forgotPasswordOp } from '../API/auth';
import AuthLayout from '../components/auth/AuthLayout';
import CustomLink from '../components/UI/CustomLink';
import FormInput from '../components/UI/Form/FormInput';
import ToastBody from '../components/UI/ToastBody';
import { AUTH_ROUTES } from '../utils/routes';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const toast = useToast();

  const [sentMessage, setSentMessage] = useState(false);

  const { mutate, isLoading } = useMutation(forgotPasswordOp, {
    onSuccess: () => {
      toast({
        position: 'top-right',
        isClosable: true,
        render: () => (
          <ToastBody
            title='Success'
            message='Password reset link sent successfully  '
          />
        ),
      });
      setSentMessage(true);
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
    <AuthLayout imgSrc='password.svg'>
      <Heading
        mt={16}
        as='h1'
        fontWeight={'black'}
        fontSize='4xl'
        color='gray.800'
      >
        Forgot Password?
      </Heading>

      <Text
        mb={12}
        fontWeight={'semibold'}
        color='gray.800'
        fontSize={'lg'}
        mt={2}
      >
        Enter your email to reset your password 😇
      </Text>

      {!sentMessage ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            mutate({ email });
          }}
        >
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

          <Flex mt={8} flexDir='column'>
            <Button
              colorScheme={'green'}
              type='submit'
              isLoading={isLoading}
            >
              Send Password Reset Link
            </Button>
            <CustomLink
              href={AUTH_ROUTES.LOGIN}
              containerProps={{
                fontSize: 'sm',
                fontWeight: 'bold',
                color: 'green.500',
                mt: 2,
                mx: 'auto',
              }}
            >
              Back to Login
            </CustomLink>
          </Flex>
        </form>
      ) : (
        <Center
          flexDir={'column'}
          py={16}
          borderRadius='xl'
          borderWidth={'1px'}
          borderColor='green.600'
          bg='green.50'
          px={{ base: 2, md: 10 }}
          textAlign='center'
        >
          <Text fontSize={'4xl'}> ✅</Text>
          <Text fontSize={'xl'} fontWeight={'black'}>
            Password Reset link sent successfully
          </Text>
          <Text mt={0} fontWeight={'medium'}>
            Check your email to proceed
          </Text>
          <CustomLink
            href={AUTH_ROUTES.LOGIN}
            containerProps={{
              fontSize: 'sm',
              fontWeight: 'bold',
              color: 'green.500',
              mt: 4,
              mx: 'auto',
            }}
          >
            Back to Login
          </CustomLink>
        </Center>
      )}
    </AuthLayout>
  );
}
