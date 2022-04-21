import { Box, HStack, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

interface Props {
  status?: 'success' | 'error' | 'warning';
  title?: string;
  message?: string;
}

const ToastBody: FC<Props> = ({ title, message, status = 'success' }) => {
  const getEmoji = (stat: string) => {
    const emojis: any = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      default: '',
    };
    return emojis[stat] || emojis['default'];
  };

  const getColor = (stat: string) => {
    const emojis: any = {
      success: 'green.500',
      error: 'red.500',
      warning: 'yellow.500',
      default: '',
    };
    return emojis[stat] || emojis['default'];
  };

  return (
    <Box
      py={4}
      px={5}
      bg='white'
      borderRadius={'8px'}
      borderWidth='1px'
      borderColor={'gray.300'}
      fontWeight={'bold'}
      minW={{ base: 'auto', md: '300px' }}
    >
      <HStack align={'start'}>
        <Text color={getColor(status)} fontSize={'19px'}>
          {getEmoji(status)}
        </Text>

        <Box fontSize={'md'} fontWeight='bold'>
          <Text color={getColor(status)}> {title}</Text>
          <Text color={'gray.500'}>{message}</Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default ToastBody;
