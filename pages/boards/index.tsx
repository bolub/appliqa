import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  IconButton,
  Link,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useQuery } from 'react-query';
import { fetchAllBoards } from '../../API/boards';
import SearchInput from '../../components/UI/Form/SearchInput';
import Loader from '../../components/UI/Loader';
import NextLink from 'next/link';
import { DASHBOARD_ROUTES } from '../../utils/routes';
import CustomModal from '../../components/UI/CustomModal';
import CreateBoard from '../../components/boards/CreateBoard';
import AllBoardsLoader from '../../components/UI/Loaders/AllBoardsLoader';
import { useRouter } from 'next/router';

const AllBoards = () => {
  const { data, status } = useQuery('all-boards', fetchAllBoards);

  const boardDisclosure = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    if (!router.query.new || !router.query.onboard) {
      boardDisclosure.onClose();
    }

    if (router?.query?.new === 'true' || router?.query?.onboard === 'true') {
      boardDisclosure.onOpen();
    }
  }, [router?.query?.new, boardDisclosure, router?.query?.onboard]);

  return (
    <Container maxW='7xl' py={{ base: 12, md: 20 }}>
      <Heading as='h1' fontWeight={'black'} fontSize='2xl'>
        Boards
      </Heading>

      <Flex flexDir={{ base: 'column', md: 'row' }} mt={{ base: 5, md: 10 }}>
        <SearchInput
          containerProps={{
            maxW: '400px',
            my: 'auto',
          }}
          // inputProps={{
          //   onChange: (e) => {},
          // }}
        />

        <Button
          ml='auto'
          mt={{ base: 3, md: 'auto' }}
          mb={{ md: 'auto' }}
          colorScheme={'green'}
          onClick={() => {
            router.push('/boards?new=true');
          }}
        >
          Create Board
        </Button>
      </Flex>

      <Loader
        length={data?.length}
        loader={<AllBoardsLoader />}
        status={status}
        emptyTextTitle='No boards found'
        emptyText='Get started by creating your first job board'
        emptyActionText='Create Board'
        emptyAction={() => {
          router.push('/boards?new=true');
        }}
      >
        <SimpleGrid mt={10} columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {data?.map((board: any) => {
            return (
              <Flex
                key={board.id}
                borderWidth='1px'
                borderColor={'gray.300'}
                borderRadius='8px'
                pt={4}
                flexDir='column'
              >
                <IconButton
                  ml='auto'
                  mr={6}
                  my='auto'
                  size='sm'
                  variant={'ghost'}
                  aria-label='More Options'
                  color='gray.500'
                  fontSize={'lg'}
                  icon={<HiOutlineDotsVertical />}
                />

                <NextLink
                  href={`${DASHBOARD_ROUTES.BOARDS}/${board.id}`}
                  passHref
                >
                  <Link cursor={'pointer'} px={6} pb={4}>
                    <Center flexDir={'column'} pt={10} pb={16}>
                      <Text fontSize={'2xl'}>🎯</Text>
                      <Text fontWeight={'extrabold'}>
                        {board.attributes.title}
                      </Text>
                    </Center>
                  </Link>
                </NextLink>
              </Flex>
            );
          })}
        </SimpleGrid>
      </Loader>

      <CustomModal disclosure={boardDisclosure} title='Create Board'>
        <CreateBoard />
      </CustomModal>
    </Container>
  );
};

export default AllBoards;
