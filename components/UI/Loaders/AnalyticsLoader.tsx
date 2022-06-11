import {
  Flex,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const AnalyticsLoader = () => {
  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        mt={{ base: 5, md: 6 }}
        spacing={6}
      >
        <Skeleton borderRadius={'8px'} w='full' h='156px' />
        <Skeleton borderRadius={'8px'} w='full' h='156px' />
        <Skeleton borderRadius={'8px'} w='full' h='156px' />
        <Skeleton borderRadius={'8px'} w='full' h='156px' />
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        mt={{ base: 5, md: 10 }}
        spacing={6}
      >
        <Flex
          flexDir={'column'}
          borderWidth='1px'
          borderColor={'gray.300'}
          bg='white'
          borderRadius={'8px'}
          px={6}
          pt={8}
          pb={6}
          maxH='52vh'
          overflowY={'auto'}
        >
          <SkeletonText noOfLines={1} w='60px' />

          <Skeleton height='full' borderRadius={'6px'} mt={8} w='full' />
        </Flex>

        <Flex
          flexDir={'column'}
          borderWidth='1px'
          borderColor={'gray.300'}
          bg='white'
          borderRadius={'8px'}
          px={6}
          pt={8}
          pb={4}
          maxH='52vh'
          overflowY={'auto'}
        >
          <SkeletonText noOfLines={1} w='60px' />

          <VStack mt={8} spacing={7} align={'start'}>
            <Skeleton h='42px' w='full' borderRadius={'6px'} />
            <Skeleton h='42px' w='full' borderRadius={'6px'} />
            <Skeleton h='42px' w='full' borderRadius={'6px'} />
            <Skeleton h='42px' w='full' borderRadius={'6px'} />
            <Skeleton h='42px' w='full' borderRadius={'6px'} />
          </VStack>
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default AnalyticsLoader;
