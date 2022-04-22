import { Button, Flex, SimpleGrid, useToast, VStack } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createGoal } from '../../API/goals';
import { COUNTRIES } from '../../utils/data';
import { getCurrencyLabel } from '../../utils/functions';
import FormInput from '../UI/Form/FormInput';
import RangeInput from '../UI/Form/RangeInput';
import SearchableSelect from '../UI/Form/SearchableSelect';
import { Options } from './../../utils/GeneralProps';
import { getCookie } from 'cookies-next';
import ToastBody from '../UI/ToastBody';

const CreateGoal: FC<{ disclosure: any }> = ({ disclosure }) => {
  const [dataToSend, setDataToSend] = useState({
    minimum_salary_range: 5000,
    maximum_salary_range: 500000,
    level: '',
    role: '',
    job_type: '',
    country: '',
    currency: getCurrencyLabel('$'),
  });

  const setData = (label: string, value: string | number | undefined) => {
    setDataToSend((prev) => {
      return {
        ...prev,
        [label]: value,
      };
    });
  };

  const queryClient = useQueryClient();

  const { mutate, status } = useMutation(createGoal, {
    onSuccess: () => {
      queryClient.invalidateQueries('goals');
      toast({
        position: 'top-right',
        render: () => (
          <ToastBody title='Success' message='Goal created successfully' />
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
        />

        <SimpleGrid columns={{ base: 1, md: 2 }} w='100%' spacing={8}>
          <FormInput
            label='Level'
            type='string'
            for='level'
            inputProps={{
              placeholder: 'Senior',
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
            mutate({ ...dataToSend, userId: getCookie('USER_ID') });
          }}
          ml={2}
          colorScheme={'green'}
          disabled={
            !dataToSend.level ||
            !dataToSend.role ||
            !dataToSend.job_type ||
            !dataToSend.country ||
            !dataToSend.minimum_salary_range ||
            !dataToSend.maximum_salary_range
          }
        >
          Create goal
        </Button>
      </Flex>
    </>
  );
};

export default CreateGoal;
