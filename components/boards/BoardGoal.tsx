import { Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { getCurrencySymbol } from '../../utils/functions';

const BoardGoal: FC<{ data: any }> = ({ data }) => {
  return (
    <>
      Your goal is to become a{' '}
      <Text
        as='span'
        color='green.500'
        fontWeight={'semibold'}
        textDecor='underline'
      >
        {`${data?.level} ${data?.role}`}({data?.job_type})
      </Text>{' '}
      with a salary range of {''}
      <Text
        as='span'
        color='green.500'
        fontWeight={'semibold'}
        textDecor='underline'
      >
        {getCurrencySymbol(data?.currency)}
        {data?.minimum_salary_range} to {getCurrencySymbol(data?.currency)}
        {data?.maximum_salary_range}
      </Text>
    </>
  );
};

export default BoardGoal;
