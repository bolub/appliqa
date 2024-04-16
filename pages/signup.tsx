import {
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { reSendEmailConfirmation, signupOp } from '../API/auth';
import AuthLayout from '../components/auth/AuthLayout';
import CustomLink from '../components/UI/CustomLink';
import FormInput from '../components/UI/Form/FormInput';
import ToastBody from '../components/UI/ToastBody';

const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();
  const [isRegistered, setIsRegistered] = useState(false);

  const [resendDisabled, setResendDisabled] = useState(true);
  // const [resendCounter, setResendCounter] = useState<number>(30);

  const startResendTimer = () => {
    setTimeout(() => {
      setResendDisabled(false);
    }, 30000);
  };

  const { mutate, isLoading } = useMutation(signupOp, {
    onSuccess: () => {
      setIsRegistered(true);

      startResendTimer();

      toast({
        position: 'top-right',
        isClosable: true,
        render: () => (
          <ToastBody title='Success' message='Signed up successfully' />
        ),
      });
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

  const { mutate: resendConfirmation, isLoading: resendLoading } = useMutation(
    reSendEmailConfirmation,
    {
      onSuccess: () => {
        startResendTimer();
        toast({
          position: 'top-right',
          isClosable: true,
          render: () => (
            <ToastBody
              title='Success'
              message='Confirmation email resent successfully'
            />
          ),
        });
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
    }
  );

  return (
    <AuthLayout imgSrc='signup.svg'>
      <Heading
        mt={16}
        as='h1'
        fontWeight={'black'}
        fontSize='4xl'
        color='gray.800'
      >
        Signup
      </Heading>

      <Text color='gray.800' fontSize={'lg'} mt={2} mb={12}>
        This won&apos;t take long i promise 🙃
      </Text>

      {!isRegistered ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            mutate({ email, password, fullname, username: fullname });
          }}
        >
          <VStack spacing={8}>
            <FormInput
              type='text'
              label='Fullname'
              for='fullname'
              inputProps={{
                placeholder: 'Temisan Omatsola',
                onChange: (e) => {
                  setFullname(e.target.value);
                },
              }}
              formControlProps={{
                isRequired: true,
              }}
            />

            <FormInput
              type='email'
              label='Email'
              for='email'
              inputProps={{
                placeholder: 'temisan@email.com',
                onChange: (e) => {
                  setEmail(e.target.value);
                },
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
              }}
              formControlProps={{
                isRequired: true,
              }}
            />
          </VStack>

          <Flex mt={12} flexDir='column'>
            <Button
              type='submit'
              isLoading={isLoading}
              colorScheme={'green'}
            >
              Signup
            </Button>
            <CustomLink
              href='/login'
              containerProps={{
                fontSize: 'sm',
                fontWeight: 'bold',
                color: 'green.500',
                mt: 2,
                mx: 'auto',
              }}
            >
              Already have an account?
            </CustomLink>
          </Flex>
        </form>
      ) : (
        <Center
          flexDir={'column'}
          py={12}
          borderRadius='xl'
          borderWidth={'1px'}
          borderColor='green.600'
          bg='green.50'
          px={{ base: 2, md: 10 }}
          textAlign='center'
        >
          <Text fontSize={'4xl'}> ✅</Text>
          <Text fontSize={'xl'} fontWeight={'black'}>
            Registration successful
          </Text>
          <Text mt={0} fontWeight={'medium'}>
            Check your email verify your account (Might be in spam).
          </Text>

          <Button
            textAlign={'center'}
            isDisabled={resendDisabled}
            bg='none'
            isLoading={resendLoading}
            fontSize={'sm'}
            fontWeight={'bold'}
            color={'green.500'}
            mt={4}
            mx={'auto'}
            px={3}
            onClick={() => {
              resendConfirmation({ email });
            }}
          >
            Resend Verification link in 30s
          </Button>
        </Center>
      )}
    </AuthLayout>
  );
};

export default Signup;
