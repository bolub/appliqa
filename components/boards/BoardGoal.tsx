import { Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { formatNumber } from '../../utils/functions';

const BoardGoal: FC<{ data: any }> = ({ data }) => {
  return (
    <Text fontWeight={'medium'}>
      Your goal is to become a{' '}
      <Text
        as='span'
        color='green.500'
        fontWeight={'semibold'}
        textDecor='underline'
      >
        {`${data?.level} ${data?.role}`}({data?.job_type})
      </Text>{' '}
      with a salary range between {''}
      <Text
        as='span'
        color='green.500'
        fontWeight={'semibold'}
        textDecor='underline'
      >
        {formatNumber(data?.minimum_salary_range, data?.currency)}
      </Text>{' '}
      and{' '}
      <Text
        as='span'
        color='green.500'
        fontWeight={'semibold'}
        textDecor='underline'
      >
        {formatNumber(data?.maximum_salary_range, data?.currency)}
      </Text>
    </Text>
  );
};

export default BoardGoal;
