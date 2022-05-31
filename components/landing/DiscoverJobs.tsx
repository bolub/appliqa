import {
  Box,
  Button,
  chakra,
  Container,
  Flex,
  Image,
  Link,
} from '@chakra-ui/react';
import { AUTH_ROUTES } from '../../utils/routes';

const DiscoverJobs = () => {
  return (
    <Container maxW='7xl' mt={{ md: 24 }} mb={10}>
      <Flex mt={16} flexDir={{ base: 'column', md: 'row' }}>
        {/* 1 */}
        <Box w={{ base: '100%', md: '40%' }} my='auto' pr={{ md: 10 }}>
          <chakra.h2 fontSize={{ base: '2xl', md: '4xl' }} fontWeight='black'>
            Discover Jobs
          </chakra.h2>
          <chakra.p
            mt={1}
            fontWeight='medium'
            fontSize={{ base: 'sm', md: 'md' }}
          >
            Discover new job postings, get links to popular job sites, and
            explore more opportunities.
          </chakra.p>

          <Link href={AUTH_ROUTES.SIGNUP} isExternal>
            <Button mt={{ base: 4, md: 10 }} colorScheme={'green'}>
              Get Started, Its free 😇
            </Button>
          </Link>
        </Box>

        {/* 2 */}
        <Box
          w={{ base: '100%', md: '60%' }}
          mb='auto'
          mt={{ base: 12, md: 'auto' }}
        >
          <Image src='/landing/Discover.svg' alt='Discover' />
        </Box>
      </Flex>
    </Container>
  );
};

export default DiscoverJobs;
