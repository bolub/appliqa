import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import React from 'react';

const GoalsLoader = () => {
  return (
    <SimpleGrid mt={10} columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
      <Skeleton height='140px' borderRadius='8px' />
      <Skeleton height='140px' borderRadius='8px' />
      <Skeleton height='140px' borderRadius='8px' />
      <Skeleton height='140px' borderRadius='8px' />
      <Skeleton height='140px' borderRadius='8px' />
      <Skeleton height='140px' borderRadius='8px' />
    </SimpleGrid>
  );
};

export default GoalsLoader;
