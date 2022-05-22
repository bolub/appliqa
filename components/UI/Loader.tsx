import { Center, Text, Image } from '@chakra-ui/react';
import React, { FC } from 'react';

const Loader: FC<{
  status: 'success' | 'loading' | 'error' | 'idle';
  loadingText?: string;
  errorText?: string;
  isLoading?: boolean;
  length?: number;
  emptyText?: string;
}> = ({
  loadingText = 'Fetching data...',
  status,
  errorText = 'Something happened, Please try again',
  children,
  emptyText = 'No data found',
  isLoading = false,
  length = 1,
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

      {!dataLoading && status === 'success' && (
        <>
          {length > 0 ? (
            children
          ) : (
            <Center
              flexDir={'column'}
              mt={16}
              maxW='500px'
              mx='auto'
              textAlign={'center'}
            >
              <Image src='NoData.svg' />
              <Text
                mt={3}
                fontWeight='bold'
                maxW='290px'
                fontSize={'15px'}
                color='gray.500'
              >
                {emptyText}
              </Text>
            </Center>
          )}
        </>
      )}
    </>
  );
};

export default Loader;
