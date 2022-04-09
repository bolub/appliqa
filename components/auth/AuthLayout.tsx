import { Box, Center, Flex } from '@chakra-ui/react';
import React, { FC } from 'react';
import Logo from '../UI/Logo';

const AuthLayout: FC = ({ children }) => {
  return (
    <Flex h='100vh' overflowY={{ md: 'hidden' }}>
      <Center w={{ base: '100%', md: '50%' }} py={10} px={{ base: 10, md: 36 }}>
        <Box w={{ base: '100%' }}>
          <Logo />
          {children}
        </Box>
      </Center>

      <Box
        d={{ base: 'none', md: 'block' }}
        w={{ base: '100%', md: '50%' }}
        bg='green.50'
        p={10}
      ></Box>
    </Flex>
  );
};

export default AuthLayout;
