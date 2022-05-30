import { Center, chakra, HStack, Link, Text } from '@chakra-ui/react';

import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <chakra.footer id='footer' bg='white' py={20}>
      <Center flexDir={'column'} textAlign='center' maxW='300px' mx='auto'>
        {/* Made by */}
        <HStack fontSize={'sm'} fontWeight='medium'>
          <Text as='span'>Proudly made in</Text>
          <chakra.svg
            width='20px'
            height='20px'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M13.3332 2.5H6.6665V17.5H13.3332V2.5Z' fill='#E6E6E6' />
            <path
              d='M20.0002 16.6667C20.0002 17.1271 19.6272 17.5 19.1668 17.5H13.3335V2.5H19.1668C19.6272 2.5 20.0002 2.87292 20.0002 3.33333V16.6667Z'
              fill='#078754'
            />
            <path
              d='M6.66667 17.5H0.833333C0.372917 17.5 0 17.1271 0 16.6667V3.33333C0 2.87292 0.372917 2.5 0.833333 2.5H6.66667V17.5Z'
              fill='#078754'
            />
          </chakra.svg>
          <Text as='span'>by Boluwatife Abiola</Text>
        </HStack>

        {/* Links */}
        <HStack mt={5}>
          <Link
            isExternal
            href='mailto:abiol5202@gmail.com'
            rounded='full'
            p={3}
            bg='gray.300'
            fontSize={'xl'}
            color='white'
            _hover={{
              bg: 'green.500',
            }}
          >
            <FaEnvelope />
          </Link>

          <Link
            isExternal
            href='https://twitter.com/BoluwatifeAbio1'
            rounded='full'
            p={3}
            bg='gray.300'
            fontSize={'xl'}
            color='white'
            _hover={{
              bg: 'green.500',
            }}
          >
            <FaTwitter />
          </Link>

          <Link
            isExternal
            href='https://www.linkedin.com/in/abiola-boluwatife-2569a915b/'
            rounded='full'
            p={3}
            bg='gray.300'
            fontSize={'xl'}
            color='white'
            _hover={{
              bg: 'green.500',
            }}
          >
            <FaLinkedin />
          </Link>

          <Link
            isExternal
            href='https://github.com/bolub/'
            rounded='full'
            p={3}
            bg='gray.300'
            fontSize={'xl'}
            color='white'
            _hover={{
              bg: 'green.500',
            }}
          >
            <FaGithub />
          </Link>
        </HStack>
        <Text fontSize={'sm'} color='gray.500' mt={4} fontWeight='medium'>
          &copy; {new Date().getFullYear()} Appliqa. All rights reserved.
        </Text>
      </Center>
    </chakra.footer>
  );
};

export default Footer;
