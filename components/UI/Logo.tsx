import { Text, TextProps } from '@chakra-ui/react';
import React, { FC } from 'react';

const Logo: FC<{
  color?: string;
  textColor?: string;
  containerProps?: TextProps;
}> = ({ color = '#16A34A', textColor = 'white', containerProps }) => {
  return (
    <Text
      fontSize={'sm'}
      fontWeight='900'
      color={textColor}
      textTransform={'uppercase'}
      textShadow={`-1px 1px 0px ${color}, 1px 1px 0px ${color}, 1px -1px 0 ${color}, -1px -1px 0 ${color}`}
      // style={{
      //   WebkitTextStrokeWidth: '1px',
      //   WebkitTextStrokeColor: color,
      //   // WebkitTextFillColor: 'white',
      // }}
      {...containerProps}
    >
      Appliqa
    </Text>
  );
};

export default Logo;
