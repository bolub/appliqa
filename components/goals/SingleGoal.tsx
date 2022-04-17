import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { GoalProps } from '../../pages/goals';
import { getJobType, getRange } from '../../utils/functions';

const SingleGoal: FC<{ data: GoalProps }> = ({ data }) => {
  return (
    <Flex
      flexDir={'column'}
      borderWidth='1px'
      borderColor={'gray.300'}
      borderRadius='8px'
      px={6}
      pt={6}
      pb={8}
    >
      <Flex>
        <Heading as='h2' fontWeight='bold' fontSize={'md'} d='flex'>
          <Text as='span' my='auto' mr={2}>
            🥅
          </Text>
          <Text as='span' my='auto'>
            {data.level} {data.role}
          </Text>
        </Heading>

        <IconButton
          ml='auto'
          my='auto'
          size='sm'
          variant={'ghost'}
          aria-label='More Options'
          color='gray.500'
          fontSize={'lg'}
          icon={<HiOutlineDotsVertical />}
        />
      </Flex>

      <VStack align={'start'} mt={4} spacing={1}>
        <HStack fontSize={'sm'} fontWeight='semibold' color='gray.500'>
          <Text as='span'>💰</Text>
          <Text as='span'>
            {getRange(data.currency, data.minRange, data.maxRange)}
          </Text>
        </HStack>

        <HStack fontSize={'sm'} fontWeight='semibold' color='gray.500'>
          <Text as='span'>💼</Text>
          <Text as='span'>{getJobType(data.job_type)}</Text>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default SingleGoal;