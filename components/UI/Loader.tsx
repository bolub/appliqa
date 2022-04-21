import { Center, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

const Loader: FC<{
  status: 'success' | 'loading' | 'error' | 'idle';
  loadingText?: string;
  errorText?: string;
}> = ({
  loadingText = 'Fetching data...',
  status,
  errorText = 'Something happened, Please try again',
  children,
}) => {
  return (
    <>
      {status !== 'success' && (
        <Center flexDir={'column'} h='50vh'>
          {status === 'loading' && <Text>{loadingText}</Text>}

          {(!status || status === 'error') && <Text>{errorText}</Text>}
        </Center>
      )}

      {status === 'success' && <>{children}</>}
    </>
  );
};

export default Loader;
