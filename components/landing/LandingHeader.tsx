import {
  Avatar,
  Button,
  Center,
  chakra,
  Container,
  Flex,
  HStack,
  Image,
  Text,
  Link,
} from '@chakra-ui/react';
import { AUTH_ROUTES } from '../../utils/routes';

const LandingHeader = () => {
  return (
    <Container maxW='7xl' mt={{ base: 6, md: 16 }}>
      <Center flexDir={'column'} textAlign='center' maxW='700px' mx='auto'>
        <chakra.h1
          lineHeight={{ md: '57px' }}
          fontWeight={'black'}
          fontSize={{ base: '3xl', md: '5xl' }}
          maxW={{ base: '300px', md: 'full' }}
        >
          Manage your{' '}
          <chakra.span color='green.500'>job search process</chakra.span>
        </chakra.h1>
        <chakra.p
          fontSize={{ base: 'sm', md: 'md' }}
          fontWeight={'medium'}
          mt={5}
        >
          Track your application process with the Appliqa App. Log your
          interviews and tasks, make notes, stay organized and be prepared for
          future opportunities.
        </chakra.p>

        <Link href={AUTH_ROUTES.SIGNUP} isExternal>
          <Button colorScheme={'green'} mt={10}>
            Get Started, Its free 😇
          </Button>
        </Link>
      </Center>

      {/* <motion */}
      <Image mt={20} src='/landing/headerF.png' alt='Appliqa' />

      <Flex
        bg='green.100'
        pt={{ base: 16, md: 40 }}
        pb={{ base: 16, md: 32 }}
        px={{ base: 8 }}
        borderRadius='12px'
        textAlign={'center'}
        mt={10}
        mb={10}
        flexDir='column'
        pos='relative'
      >
        <chakra.svg
          d={{ base: 'none', md: 'block' }}
          width='204'
          height='204'
          viewBox='0 0 204 204'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          pos='absolute'
          top={16}
          left={40}
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M81.0494 28.6521C113.966 52.5504 91.4144 105.409 51.6647 89.38C49.3412 124.806 61.0668 126.598 91.6312 137.18C10.6607 146.463 13.6624 0.438938 81.0497 28.6521H81.0494Z'
            fill='#86EFAC'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M169.99 90.1507C146.875 102.695 130.808 96.4254 126.098 92.1189C133.938 116.017 133.614 127.542 174.292 138.742C111.999 137.953 96.1744 73.6773 120.622 39.6152C142.557 9.05597 196.245 50.9797 169.987 90.1518L169.99 90.1507Z'
            fill='#86EFAC'
          />
        </chakra.svg>

        <Text mx='auto' fontWeight={'bold'} maxW='650px'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices
          vulputate pretium. Mauris facilisis sapien ut neque facilisis
          eleifend. Etiam id eros vel ipsum accumsan elementum a eu nisl.
        </Text>

        <HStack mt={8} mx='auto'>
          <Avatar boxSize={'40px'} />
          <Text
            fontWeight={'medium'}
            fontSize={{ base: 'sm', md: 'left' }}
            textAlign={{ base: 'center' }}
          >
            Mathew Black /{' '}
            <Text as='span' color='gray.500'>
              Software Developer
            </Text>
          </Text>
        </HStack>
      </Flex>
    </Container>
  );
};

export default LandingHeader;
