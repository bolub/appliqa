import React, { FC } from 'react';
import { Flex, HStack, Text } from '@chakra-ui/react';

interface Props {
  title: string;
  emoji: string;
  value: string | number;
}

const AnalyticsCard: FC<Props> = ({ title, emoji, value }) => {
  return (
    <Flex
      flexDir={'column'}
      borderWidth='1px'
      borderColor={'gray.300'}
      bg='white'
      borderRadius={'8px'}
      p={6}
    >
      <HStack mb={10}>
        <Text flex={1} fontWeight={'bold'} fontSize='sm' color='gray.500'>
          {title}
        </Text>
        <Text fontSize={'xl'}>{emoji}</Text>
      </HStack>

      <Text fontWeight={'black'} mt='auto' fontSize={'2xl'}>
        {value}
      </Text>
    </Flex>
  );
};

export default AnalyticsCard;
