import {
  Box,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const BoardLoader = () => {
  return (
    <HStack align='start' spacing={6} mt={8} overflowX='scroll'>
      <Box
        borderWidth='1px'
        borderColor='gray.300'
        bg='gray.50'
        borderRadius={'13px'}
        minW='380px'
        px={6}
        pt={6}
        pb={8}
        maxH='63vh'
        overflowY='auto'
        transition='all 0.2s ease'
        minH='200px'
      >
        <HStack>
          <SkeletonText noOfLines={1} w='60px' />

          <SkeletonCircle size='8' />
        </HStack>

        <VStack align={'start'} spacing={4} mt={4}>
          <Skeleton h='114px' w='full' borderRadius={'8px'} />
          <Skeleton h='114px' w='full' borderRadius={'8px'} />
        </VStack>
      </Box>

      <Box
        borderWidth='1px'
        borderColor='gray.300'
        bg='gray.50'
        borderRadius={'13px'}
        minW='380px'
        px={6}
        pt={6}
        pb={8}
        maxH='63vh'
        overflowY='auto'
        transition='all 0.2s ease'
        minH='200px'
      >
        <HStack>
          <SkeletonText noOfLines={1} w='60px' />

          <SkeletonCircle size='8' />
        </HStack>

        <VStack align={'start'} spacing={4} mt={4}>
          <Skeleton h='114px' w='full' borderRadius={'8px'} />
          <Skeleton h='114px' w='full' borderRadius={'8px'} />
          <Skeleton h='114px' w='full' borderRadius={'8px'} />
          <Skeleton h='114px' w='full' borderRadius={'8px'} />
        </VStack>
      </Box>

      <Box
        borderWidth='1px'
        borderColor='gray.300'
        bg='gray.50'
        borderRadius={'13px'}
        minW='380px'
        px={6}
        pt={6}
        pb={8}
        maxH='63vh'
        overflowY='auto'
        transition='all 0.2s ease'
        minH='200px'
      >
        <HStack>
          <SkeletonText noOfLines={1} w='60px' />

          <SkeletonCircle size='8' />
        </HStack>

        <VStack align={'start'} spacing={4} mt={4}>
          <Skeleton h='114px' w='full' borderRadius={'8px'} />
          <Skeleton h='114px' w='full' borderRadius={'8px'} />
          <Skeleton h='114px' w='full' borderRadius={'8px'} />
        </VStack>
      </Box>

      <Box
        borderWidth='1px'
        borderColor='gray.300'
        bg='gray.50'
        borderRadius={'13px'}
        minW='380px'
        px={6}
        pt={6}
        pb={8}
        maxH='63vh'
        overflowY='auto'
        transition='all 0.2s ease'
        minH='200px'
      >
        <HStack>
          <SkeletonText noOfLines={1} w='60px' />

          <SkeletonCircle size='8' />
        </HStack>

        <VStack align={'start'} spacing={4} mt={4}>
          <Skeleton h='114px' w='full' borderRadius={'8px'} />
          <Skeleton h='114px' w='full' borderRadius={'8px'} />
        </VStack>
      </Box>
    </HStack>
  );
};

export default BoardLoader;
