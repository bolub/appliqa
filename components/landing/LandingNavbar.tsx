import { Container, chakra, Button, HStack, Link } from '@chakra-ui/react';
import React from 'react';
import { AUTH_ROUTES } from '../../utils/routes';
import Logo from '../UI/Logo';

const LandingNavbar = () => {
  return (
    <chakra.nav
      bg='white'
      h='90px'
      d='flex'
      justifyContent={'center'}
      alignItems={'center'}
      // borderWidth='1px'
    >
      <Container maxW='7xl' d='flex' px={{ base: 4, md: 8 }}>
        <Logo containerProps={{ my: 'auto', mr: 20 }} />

        <HStack ml='auto' d={{ base: 'none', md: 'flex' }}>
          <Link href={AUTH_ROUTES.LOGIN} isExternal>
            <Button variant={'ghost'}>Login</Button>
          </Link>

          <Link href={AUTH_ROUTES.SIGNUP} isExternal>
            <Button colorScheme={'green'}>Get Started 😇</Button>
          </Link>
        </HStack>
      </Container>
    </chakra.nav>
  );
};

export default LandingNavbar;
