import { Text } from '@chakra-ui/react';
import React, { FC } from 'react';

const Logo: FC<{ color?: string }> = ({ color = '#16A34A' }) => {
  return (
    <Text
      fontSize={'sm'}
      fontWeight='900'
      color='white'
      textTransform={'uppercase'}
      textShadow={`-1px -1px 0 ${color}, 1px -1px 0 ${color}, -1px 1px 0 ${color}, 1px 1px 0 ${color}`}
      // style={{
      //   WebkitTextStrokeWidth: '1px',
      //   WebkitTextStrokeColor: color,
      // }}
    >
      Appliqa
    </Text>
  );
};

export default Logo;
