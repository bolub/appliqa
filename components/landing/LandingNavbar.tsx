import {
  Container,
  chakra,
  Button,
  HStack,
  Link,
  Avatar,
} from '@chakra-ui/react';
import { getCookie } from 'cookies-next';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { profileState } from '../../recoil/profile';
import { AUTH_ROUTES, DASHBOARD_ROUTES } from '../../utils/routes';
import Logo from '../UI/Logo';

const LandingNavbar = () => {
  const username = useRecoilValue(profileState)?.username;

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
          {getCookie('USER_AUTHENTICATED') ? (
            <Link href={DASHBOARD_ROUTES.ANALYTICS} isExternal>
              <Button variant={'ghost'}>
                <Avatar
                  w='36px'
                  h='36px'
                  p='1'
                  bg='white'
                  src={`https://avatars.dicebear.com/api/bottts/${
                    username || getCookie('USER_NAME')
                  }.svg`}
                  mr={2}
                />
                My account
              </Button>
            </Link>
          ) : (
            <>
              <Link href={AUTH_ROUTES.LOGIN} isExternal>
                <Button variant={'ghost'}>Login</Button>
              </Link>

              <Link href={AUTH_ROUTES.SIGNUP} isExternal>
                <Button colorScheme={'green'}>Get Started 😇</Button>
              </Link>
            </>
          )}
        </HStack>
      </Container>
    </chakra.nav>
  );
};

export default LandingNavbar;
