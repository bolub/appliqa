import { Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';

const BrowseJobsLoader = () => {
  return (
    <VStack align={'start'} w='full' spacing={10} mt={10}>
      <Skeleton h='180px' borderRadius='8px' w='full' />
      <Skeleton h='180px' borderRadius='8px' w='full' />
      <Skeleton h='180px' borderRadius='8px' w='full' />
      <Skeleton h='180px' borderRadius='8px' w='full' />
      <Skeleton h='180px' borderRadius='8px' w='full' />
      <Skeleton h='180px' borderRadius='8px' w='full' />
      <Skeleton h='180px' borderRadius='8px' w='full' />
      <Skeleton h='180px' borderRadius='8px' w='full' />
      <Skeleton h='180px' borderRadius='8px' w='full' />
      <Skeleton h='180px' borderRadius='8px' w='full' />
    </VStack>
  );
};

export default BrowseJobsLoader;
