import {
  Button,
  Flex,
  Heading,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { resetPasswordOp } from '../API/auth';
import AuthLayout from '../components/auth/AuthLayout';
import FormInput from '../components/UI/Form/FormInput';
import ToastBody from '../components/UI/ToastBody';
import { setCookies } from 'cookies-next';
import { DASHBOARD_ROUTES } from '../utils/routes';
import { useRouter } from 'next/router';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toast = useToast();

  const { query } = useRouter();

  const { mutate, isLoading } = useMutation(resetPasswordOp, {
    onSuccess: (data) => {
      const { user, jwt } = data;
      toast({
        position: 'top-right',
        render: () => (
          <ToastBody title='Success' message='Logged in successfully' />
        ),
      });

      setCookies('USER_TOKEN', jwt, { maxAge: 604800 });
      setCookies('USER_ID', user.id, { maxAge: 604800 });
      setCookies('USER_AUTHENTICATED', 'true');

      window.location.href = DASHBOARD_ROUTES.ANALYTICS;
    },
    onError: (data: any) => {
      const errors = { ...data };

      toast({
        position: 'top-right',
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
    <AuthLayout>
      <Heading
        mt={16}
        as='h1'
        fontWeight={'black'}
        fontSize='4xl'
        color='gray.800'
      >
        Reset Password
      </Heading>

      <Text
        fontWeight={'semibold'}
        color='gray.800'
        fontSize={'lg'}
        mt={2}
        mb={12}
      >
        Set a new password
      </Text>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          mutate({
            password,
            code: query?.code,
            passwordConfirmation: confirmPassword,
          });
        }}
      >
        <VStack spacing={8}>
          <FormInput
            type='password'
            label='New Password'
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

          <FormInput
            type='password'
            label='Confirm New Password'
            for='password'
            inputProps={{
              placeholder: '*********',
              onChange: (e) => {
                setConfirmPassword(e.target.value);
              },
              value: confirmPassword,
            }}
            formControlProps={{
              isRequired: true,
            }}
          />
        </VStack>

        <Flex mt={8} flexDir='column'>
          <Button
            isDisabled={password !== confirmPassword}
            isFullWidth
            colorScheme={'green'}
            type='submit'
            isLoading={isLoading}
          >
            Set New Password
          </Button>
        </Flex>
      </form>
    </AuthLayout>
  );
}
