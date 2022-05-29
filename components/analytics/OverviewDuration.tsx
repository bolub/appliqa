import { Box, Flex, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const OverviewDuration: FC<any> = (data) => {
  let options = {
    chart: {
      id: 'basic-bar',
      fontFamily: 'Satoshi',
    },
    colors: ['#16a34a'],
    xaxis: {
      categories: ['Jobs Saved', 'Applications', 'Interviews', 'Offers'],
    },
  };

  let series = [
    {
      name: '',
      data: [
        data?.jobsSaved,
        data?.applications,
        data?.interviews,
        data?.offers,
      ],
    },
  ];

  return (
    <Flex
      flexDir={'column'}
      borderWidth='1px'
      borderColor={'gray.300'}
      bg='white'
      borderRadius={'8px'}
      px={6}
      pt={8}
      pb={4}
      maxH='52vh'
      overflowY={'auto'}
    >
      <Text flex={1} fontWeight={'bold'} fontSize='sm' color='gray.500'>
        Chart view
      </Text>

      <Box mt={8}>
        <Chart options={options} series={series} type='bar' width='500' />
      </Box>
    </Flex>
  );
};

export default OverviewDuration;
