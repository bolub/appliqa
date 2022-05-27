import { Center, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';

const Construction: FC<{ height?: string; maxW?: string }> = ({
  height = '80vh',
  maxW = '500px',
}) => {
  return (
    <Center
      h={height}
      fontWeight={'extrabold'}
      textAlign={'center'}
      flexDir='column'
      px={10}
      py={10}
    >
      {/* <Text fontSize='4xl'>🚧</Text>
       */}
      <Image src='../building.svg' alt='Under Construction' maxW={maxW} />
      <Text fontSize='lg'>Under construction</Text>
    </Center>
  );
};

export default Construction;
