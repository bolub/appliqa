import { Button, Center, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';

const Custom404 = () => {
  return (
    <Center flexDir={'column'} textAlign={'center'} h='100vh'>
      <Image src='/404.svg' maxW='600px' alt='Not found' />
      <Text
        mt={3}
        fontWeight='bold'
        maxW='290px'
        fontSize={'md'}
        color='gray.500'
      >
        Oops! Page not found
      </Text>

      <Link href='/' mt={2}>
        <Button colorScheme={'green'} variant='outline'>
          Go Home
        </Button>
      </Link>
    </Center>
  );
};

export default Custom404;
