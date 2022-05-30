import { Button, Center, chakra, Container, Link } from '@chakra-ui/react';
import { AUTH_ROUTES } from '../../utils/routes';

const CallToAction = () => {
  return (
    <chakra.section
      id='callToAction'
      bg='green.500'
      py={24}
      mt={{ base: 20, md: 40 }}
    >
      <Container maxW='7xl'>
        <Center flexDir={'column'} textAlign='center' maxW='300px' mx='auto'>
          <chakra.h2
            lineHeight={{ md: '47px' }}
            fontWeight={'black'}
            fontSize={{ base: '2xl', md: '4xl' }}
            color='white'
          >
            Ready to dive in? Start now
          </chakra.h2>

          <Link href={AUTH_ROUTES.SIGNUP} isExternal>
            <Button mt={{ base: 6, md: 10 }} color='green.500'>
              Get Started, Its free 😇
            </Button>
          </Link>
        </Center>
      </Container>
    </chakra.section>
  );
};

export default CallToAction;
