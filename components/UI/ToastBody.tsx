import {
  Box,
  CloseButton,
  HStack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
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

  const toast = useToast();

  return (
    <Box
      py={5}
      px={5}
      bg='white'
      borderRadius={'8px'}
      borderWidth='1px'
      borderColor={'gray.300'}
      fontWeight={'bold'}
      minW={{ base: 'auto', md: '360px' }}
    >
      <HStack align={'start'} spacing={3}>
        <CloseButton
          onClick={() => {
            toast.closeAll();
          }}
          pos='absolute'
          right={5}
          top={5}
        />
        <Text color={getColor(status)} fontSize={'19px'}>
          {getEmoji(status)}
        </Text>

        <VStack align={'start'} spacing={0} fontSize={'md'} fontWeight='bold'>
          <Text color={getColor(status)}> {title}</Text>
          <Text color={'gray.500'}>{message}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ToastBody;
