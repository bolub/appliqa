import { Button, Center, HStack, Link } from '@chakra-ui/react';
import type { NextPage } from 'next';
// import CustomLink from '../components/UI/CustomLink';

const Home: NextPage = () => {
  return (
    <>
      <main>
        <Center h='100vh'>
          <HStack>
            <Link href='/login'>
              <Button colorScheme={'green'}>Go to login</Button>
            </Link>

            <Link href='/goals'>
              <Button colorScheme={'green'}>Go to dashboard</Button>
            </Link>
          </HStack>
        </Center>
      </main>
    </>
  );
};

export default Home;
