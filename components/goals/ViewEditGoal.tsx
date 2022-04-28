import { Button, Flex, SimpleGrid, useToast, VStack } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updateGoal } from '../../API/goals';
import { COUNTRIES } from '../../utils/data';
import { getCurrencyLabel } from '../../utils/functions';
import FormInput from '../UI/Form/FormInput';
import RangeInput from '../UI/Form/RangeInput';
import SearchableSelect from '../UI/Form/SearchableSelect';
import { Options } from './../../utils/GeneralProps';
import ToastBody from '../UI/ToastBody';
import { GoalProps } from '../../pages/goals';
import _ from 'lodash';

const ViewEditGoal: FC<{ disclosure: any; data: GoalProps }> = ({
  disclosure,
  data,
}) => {
  const [dataToSend, setDataToSend] = useState({
    minimum_salary_range: data?.attributes?.minimum_salary_range,
    maximum_salary_range: data?.attributes?.maximum_salary_range,
    level: '',
    role: '',
    job_type: '',
    country: '',
    currency: data?.attributes?.currency,
  });

  const [initialData, setInitialData] = useState({
    minimum_salary_range: data?.attributes?.minimum_salary_range,
    maximum_salary_range: data?.attributes?.maximum_salary_range,
    level: '',
    role: '',
    job_type: '',
    country: '',
    currency: '',
  });

  useEffect(() => {
    setDataToSend({
      minimum_salary_range: data?.attributes?.minimum_salary_range,
      maximum_salary_range: data?.attributes?.maximum_salary_range,
      level: data?.attributes?.level,
      role: data?.attributes?.role,
      job_type: data?.attributes?.job_type,
      country: data?.attributes?.country,
      currency: data?.attributes?.currency,
    });

    setInitialData({
      minimum_salary_range: data?.attributes?.minimum_salary_range,
      maximum_salary_range: data?.attributes?.maximum_salary_range,
      level: data?.attributes?.level,
      role: data?.attributes?.role,
      job_type: data?.attributes?.job_type,
      country: data?.attributes?.country,
      currency: data?.attributes?.currency,
    });
  }, [data]);

  const setData = (label: string, value: string | number | undefined) => {
    setDataToSend((prev) => {
      return {
        ...prev,
        [label]: value,
      };
    });
  };

  const queryClient = useQueryClient();

  const noChangesDetected = _.isEqual(initialData, dataToSend);
  const { mutate, status } = useMutation(updateGoal, {
    onSuccess: () => {
      queryClient.invalidateQueries('goals');
      toast({
        position: 'top-right',
        render: () => (
          <ToastBody title='Success' message='Goal updated successfully' />
        ),
      });

      disclosure.onClose();
    },
    onError: (data: any) => {
      const errors = { ...data };

      toast({
        position: 'top-right',
        render: () => (
          <ToastBody
            status='error'
            title={errors?.response?.data?.error?.name || 'Error'}
            message={
              errors?.response?.data?.error?.message || 'Something happened'
            }
          />
        ),
      });
    },
  });

  const toast = useToast();
  return (
    <>
      <VStack align='start' w='100%' spacing={8}>
        <RangeInput
          onChange={(data: any) => {
            setData('minimum_salary_range', data[0]);
            setData('maximum_salary_range', data[1]);
          }}
          getChosenCurrency={(value: string) => {
            setData('currency', getCurrencyLabel(value));
          }}
          defaultFirstValue={Number(dataToSend?.minimum_salary_range)}
          defaultSecondValue={Number(dataToSend?.maximum_salary_range)}
          defaultCurrencyValue={dataToSend?.currency}
        />

        <SimpleGrid columns={{ base: 1, md: 2 }} w='100%' spacing={8}>
          <FormInput
            label='Level'
            type='string'
            for='level'
            inputProps={{
              placeholder: 'Senior',
              value: dataToSend?.level,
              onChange: (e) => {
                setData('level', e.target.value);
              },
            }}
            listLabel='levels'
            listData={[
              'CEO',
              'CTO',
              'CPO',
              'Principal',
              'Senior',
              'Mid',
              'Junior',
            ]}
          />

          <FormInput
            label='Role'
            type='string'
            for='role'
            inputProps={{
              placeholder: 'Frontend Developer',
              value: dataToSend?.role,
              onChange: (e) => {
                setData('role', e.target.value);
              },
            }}
            listLabel='roles'
            listData={[
              'Marketer',
              'Fullstack Developer',
              'Frontend Developer',
              'Backend Developer',
            ]}
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} w='100%' spacing={8}>
          <FormInput
            label='Job Type'
            type='string'
            for='job_type'
            inputProps={{
              placeholder: 'Remote',
              value: dataToSend?.job_type,
              onChange: (e) => {
                setData('job_type', e.target.value);
              },
            }}
            listLabel='job_types'
            listData={[
              'Remote',
              'Remote Full-Time',
              'Remote Part-Time',
              'Fulltime',
              'PartTime',
            ]}
          />

          <SearchableSelect
            label='Country'
            value={COUNTRIES?.filter((option: Options) => {
              return option.label === dataToSend?.country;
            })}
            options={COUNTRIES}
            onChange={(value: Options) => {
              setData('country', value.label);
            }}
          />
        </SimpleGrid>
      </VStack>

      <Flex justifyContent={'end'} mt={16}>
        <Button
          onClick={disclosure.onClose}
          isDisabled={status === 'loading'}
          variant={'ghost'}
        >
          Cancel
        </Button>
        <Button
          isDisabled={status === 'loading'}
          onClick={() => {
            mutate({
              id: data?.id,
              body: {
                ...dataToSend,
              },
            });
          }}
          ml={2}
          colorScheme={'green'}
          disabled={
            !dataToSend.level ||
            !dataToSend.role ||
            !dataToSend.job_type ||
            !dataToSend.country ||
            !dataToSend.minimum_salary_range ||
            !dataToSend.maximum_salary_range ||
            noChangesDetected
          }
        >
          Update goal
        </Button>
      </Flex>
    </>
  );
};

export default ViewEditGoal;
