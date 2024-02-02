import { Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC } from 'react';
import { formatNumber } from '../../utils/functions';
import { singleGoalProps } from '../../utils/GeneralProps';
import { DASHBOARD_ROUTES } from '../../utils/routes';

const BoardGoal: FC<{ data: singleGoalProps }> = ({ data }) => {
  return <>
    {data ? (
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
    ) : (
      <Link href={DASHBOARD_ROUTES.GOALS} passHref legacyBehavior>
        <ChakraLink fontWeight={'medium'} textAlign='center'>
          <Text as={'span'} fontSize='lg' mt={2} mr={1}>
            🙂
          </Text>{' '}
          Add a goal to this board
        </ChakraLink>
      </Link>
    )}
  </>;
};

export default BoardGoal;
