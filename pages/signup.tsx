import { Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import CustomLink from '../components/UI/CustomLink';
import FormInput from '../components/UI/Form/FormInput';

const Signup = () => {
  return (
    <AuthLayout>
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lacinia
        risus id ligula sodales imperdiet.
      </Text>

      <VStack spacing={8}>
        <FormInput
          type='text'
          label='Fullname'
          for='fullname'
          inputProps={{
            placeholder: 'Temisan Omatsola',
          }}
        />

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

      <Flex mt={12} flexDir='column'>
        <Button isFullWidth colorScheme={'green'}>
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
    </AuthLayout>
  );
};

export default Signup;
