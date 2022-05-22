import {
  Button,
  Flex,
  Heading,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { signupOp } from '../API/auth';
import AuthLayout from '../components/auth/AuthLayout';
import CustomLink from '../components/UI/CustomLink';
import FormInput from '../components/UI/Form/FormInput';
import ToastBody from '../components/UI/ToastBody';
import { DASHBOARD_ROUTES } from '../utils/routes';
import { setCookies } from 'cookies-next';
// import axios from 'axios';

const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();

  const { mutate, isLoading } = useMutation(signupOp, {
    onSuccess: async (data) => {
      const { user, jwt } = data;

      setCookies('USER_TOKEN', jwt, { maxAge: 604800 });
      setCookies('USER_ID', user.id, { maxAge: 604800 });
      setCookies('USER_AUTHENTICATED', 'true');

      // const headers = {
      //   headers: {
      //     Authorization: `Bearer ${jwt}`,
      //   },
      // };
      // console.log(jwt, user.id);

      // await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/boards`,
      //   {
      //     data: {
      //       userId: user.id,
      //       title: `Job Search ${new Date().getFullYear()}`,
      //       stages: ['5', '7', '8', '9', '10'],
      //       stageOrder: ['stage-1', 'stage-2', 'stage-3', 'stage-4', 'stage-5'],
      //     },
      //   },
      //   headers
      // );

      toast({
        position: 'top-right',
        render: () => (
          <ToastBody title='Success' message='Signed up successfully' />
        ),
      });

      window.location.href = `${DASHBOARD_ROUTES.BOARDS}?signup=true`;
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
            isFullWidth
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
    </AuthLayout>
  );
};

export default Signup;
