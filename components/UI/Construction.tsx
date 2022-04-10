import { Center, Text } from '@chakra-ui/react';
import React from 'react';

const Construction = () => {
  return (
    <Center
      h='80vh'
      fontWeight={'extrabold'}
      textAlign={'center'}
      flexDir='column'
    >
      <Text fontSize='4xl'>🚧</Text>
      <Text fontSize='lg' textTransform={'uppercase'}>
        Under construction
      </Text>
    </Center>
  );
};

export default Construction;
