import { Center, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

const Loader: FC<{
  status: 'success' | 'loading' | 'error' | 'idle';
  loadingText?: string;
  errorText?: string;
  isLoading?: boolean;
}> = ({
  loadingText = 'Fetching data...',
  status,
  errorText = 'Something happened, Please try again',
  children,
  isLoading = false,
}) => {
  const dataLoading = status === 'loading' || isLoading;

  return (
    <>
      {(!status || status === 'error') && (
        <Center flexDir={'column'} h='50vh'>
          <Text>{errorText}</Text>
        </Center>
      )}

      {dataLoading && (
        <Center flexDir={'column'} h='50vh'>
          <Text>{loadingText}</Text>
        </Center>
      )}

      {!dataLoading && status === 'success' && <>{children}</>}
    </>
  );
};

export default Loader;
