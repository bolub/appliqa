import { Button, Center, HStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import CustomLink from '../components/UI/CustomLink';

const Home: NextPage = () => {
  return (
    <>
      <main>
        <Center h='100vh'>
          <HStack>
            <CustomLink href='/login'>
              <Button colorScheme={'green'}>Go to login</Button>
            </CustomLink>

            <CustomLink href='/goals'>
              <Button colorScheme={'green'}>Go to dashboard</Button>
            </CustomLink>
          </HStack>
        </Center>
      </main>
    </>
  );
};

export default Home;
