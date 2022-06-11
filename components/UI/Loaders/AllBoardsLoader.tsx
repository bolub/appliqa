import { SimpleGrid, Skeleton } from '@chakra-ui/react';

const AllBoardsLoader = () => {
  return (
    <SimpleGrid mt={10} columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
      <Skeleton height={'230px'} w='full' borderRadius='8px' />
      <Skeleton height={'230px'} w='full' borderRadius='8px' />
      <Skeleton height={'230px'} w='full' borderRadius='8px' />
      <Skeleton height={'230px'} w='full' borderRadius='8px' />
    </SimpleGrid>
  );
};

export default AllBoardsLoader;
