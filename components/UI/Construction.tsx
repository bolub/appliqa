import { Center, Text } from '@chakra-ui/react';
import { FC } from 'react';

const Construction: FC<{ height?: string }> = ({ height = '80vh' }) => {
  return (
    <Center
      h={height}
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
