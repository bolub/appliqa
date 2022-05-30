import {
  Box,
  chakra,
  Container,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

const ManageProcess = () => {
  const Data: FC<{ emoji: string; title: string; description: string }> = ({
    emoji,
    title,
    description,
  }) => {
    const [show, setShow] = useState(false);

    return (
      <VStack
        pb={8}
        align='start'
        borderBottomWidth='1px'
        onClick={() => {
          setShow(!show);
        }}
        w='full'
        cursor='pointer'
      >
        <HStack fontSize={{ base: 'md', md: 'lg' }}>
          <Text>{emoji}</Text>
          <Text fontWeight={'bold'} color={show ? 'green.500' : ''}>
            {title}
          </Text>
        </HStack>

        <Text
          d={show ? 'block' : 'none'}
          fontSize={{ base: 'sm', md: 'md' }}
          fontWeight={'medium'}
        >
          {description}
        </Text>
      </VStack>
    );
  };

  return (
    <Container maxW='7xl' mt={{ base: 24 }} mb={10}>
      <chakra.h2 fontSize={{ base: '2xl', md: '4xl' }} fontWeight='black'>
        Manage your process
      </chakra.h2>
      <chakra.p mt={1} fontWeight='medium'>
        Track job applicatons easily
      </chakra.p>

      <Flex mt={{ base: 10, md: 16 }} flexDir={{ base: 'column', md: 'row' }}>
        {/* 1 */}
        <Box w={{ base: '100%', md: '60%' }} my='auto'>
          <Image src='/landing/ManageProcess.png' alt='Manage Process' />
        </Box>

        {/* 2 */}
        <VStack
          spacing={12}
          align={'start'}
          w={{ base: '100%', md: '40%' }}
          mb='auto'
          mt={{ base: 16, md: 'auto' }}
        >
          <Data
            emoji='ℹ️'
            title='Mange Job Information'
            description='Posts come alive on Circle. Easily add rich formatting, media, emojis, and embed your favorite 3rd-party tools.'
          />

          <Data
            emoji='📋'
            title='Log Interviews'
            description='Posts come alive on Circle. Easily add rich formatting, media, emojis, and embed your favorite 3rd-party tools.'
          />

          <Data
            emoji='🗒️'
            title='Create Tasks'
            description='Posts come alive on Circle. Easily add rich formatting, media, emojis, and embed your favorite 3rd-party tools.'
          />

          <Data
            emoji='🗒️'
            title='Add Notes'
            description='Posts come alive on Circle. Easily add rich formatting, media, emojis, and embed your favorite 3rd-party tools.'
          />
        </VStack>
      </Flex>
    </Container>
  );
};

export default ManageProcess;
