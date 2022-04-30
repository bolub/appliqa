import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { COUNTRIES } from '../../../../utils/data';
import { Options } from '../../../../utils/GeneralProps';
import FormInput from '../../../UI/Form/FormInput';
import SearchableSelect from '../../../UI/Form/SearchableSelect';
import _ from 'lodash';
import CurrencyInput from '../../../UI/Form/CurrencyInput';
import { useMutation, useQueryClient } from 'react-query';
import { updateJob } from '../../../../API/boards';
import ToastBody from '../../../UI/ToastBody';

const JobDetails: FC<any> = ({ data }) => {
  const [editMode, setEditMode] = useState(false);

  const [dataToSend, setDataToSend] = useState({
    post_url: '',
    company_name: '',
    level: '',
    role: '',
    salary: '',
    job_type: '',
    country: '',
    currency: '',
  });

  const [initialData, setInitialData] = useState({
    post_url: '',
    company_name: '',
    level: '',
    role: '',
    salary: '',
    job_type: '',
    country: '',
    currency: '',
  });

  const setData = (label: string, value: string | number | undefined) => {
    setDataToSend((prev) => {
      return {
        ...prev,
        [label]: value,
      };
    });
  };

  const setCurrencyValue = (value: string) => {
    setDataToSend((prev) => {
      return {
        ...prev,
        currency: value,
      };
    });
  };

  const toast = useToast();

  const queryClient = useQueryClient();
  const { mutate: updateCJob, isLoading } = useMutation(updateJob, {
    onSuccess: () => {
      queryClient.invalidateQueries('board');
      toast({
        position: 'top-right',
        render: () => (
          <ToastBody title='Success' message='Job Updated successfully' />
        ),
      });
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

  useEffect(() => {
    setDataToSend({
      post_url: data?.post_url,
      company_name: data?.company_name,
      level: data?.level,
      role: data?.role,
      salary: data?.salary,
      job_type: data?.job_type,
      country: data?.country,
      currency: data?.currency,
    });

    setInitialData({
      post_url: data?.post_url,
      company_name: data?.company_name,
      level: data?.level,
      role: data?.role,
      salary: data?.salary,
      job_type: data?.job_type,
      country: data?.country,
      currency: data?.currency,
    });
  }, [data]);

  const noChangesDetected = _.isEqual(initialData, dataToSend);
  const updateData = () => {
    updateCJob({
      id: data?.id,
      body: {
        ...dataToSend,
      },
    });
  };
  return (
    <VStack w='full' align='start' mt={8} spacing={10}>
      {/* Company Name, Level and Role */}
      <SimpleGrid columns={{ base: 1, md: 2 }} w='100%' spacing={8}>
        <FormInput
          label='Company Name'
          type='text'
          for='company_name'
          inputProps={{
            placeholder: 'Abstergo',
            value: dataToSend?.company_name,
            onFocus: () => {
              setEditMode(true);
            },
            onBlur: () => {
              setEditMode(false);
            },
            variant: editMode ? 'outline' : 'unstyled',
            onChange: (e) => {
              setData('company_name', e.target.value);
            },
          }}
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
              onFocus: () => {
                setEditMode(true);
              },
              onBlur: () => {
                setEditMode(false);
              },
              variant: editMode ? 'outline' : 'unstyled',
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
              onFocus: () => {
                setEditMode(true);
              },
              onBlur: () => {
                setEditMode(false);
              },
              variant: editMode ? 'outline' : 'unstyled',
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
      </SimpleGrid>

      {/* Post url and salary */}
      <SimpleGrid columns={{ base: 1, md: 2 }} w='100%' spacing={8}>
        <FormInput
          label='Post url'
          type='url'
          for='post_url'
          inputProps={{
            placeholder: 'https://abstergo.com/frontend',
            value: dataToSend?.post_url,
            onFocus: () => {
              setEditMode(true);
            },
            onBlur: () => {
              setEditMode(false);
            },
            variant: editMode ? 'outline' : 'unstyled',
            onChange: (e) => {
              setData('post_url', e.target.value);
            },
          }}
        />

        {!editMode ? (
          <Box
            onClick={() => {
              setEditMode(true);
            }}
          >
            <Text mb={1} fontWeight={'bold'} fontSize='sm' color='gray.500'>
              Salary
            </Text>
            <Text
              color={dataToSend?.salary ? 'gray.800' : 'gray.400'}
              fontWeight={'medium'}
            >
              {dataToSend?.currency} {dataToSend?.salary || 'Add salary'}
            </Text>
          </Box>
        ) : (
          <CurrencyInput
            label='Salary'
            for='min'
            inputProps={{
              value: dataToSend?.salary,
              onChange: (e) => {
                setData('salary', e.target.value);
              },
            }}
            getChosenCurrency={(value: string) => {
              setData('currency', value);
            }}
            currencyValue={dataToSend?.currency}
            setChosenCurrency={setCurrencyValue}
          />
        )}
      </SimpleGrid>

      {/* Job type and country */}
      <SimpleGrid columns={{ base: 1, md: 2 }} w='100%' spacing={8}>
        <FormInput
          label='Job Type'
          type='string'
          for='job_type'
          inputProps={{
            placeholder: 'Add job type e.g Remote',
            value: dataToSend?.job_type,
            onFocus: () => {
              setEditMode(true);
            },
            onBlur: () => {
              setEditMode(false);
            },
            variant: editMode ? 'outline' : 'unstyled',
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

        {!editMode ? (
          <Box
            onClick={() => {
              setEditMode(true);
            }}
          >
            <Text mb={1} fontWeight={'bold'} fontSize='sm' color='gray.500'>
              Country
            </Text>
            <Text
              color={dataToSend?.country ? 'gray.800' : 'gray.400'}
              fontWeight={'medium'}
            >
              {dataToSend?.country || 'Add country'}
            </Text>
          </Box>
        ) : (
          <SearchableSelect
            label='Country'
            options={COUNTRIES}
            value={COUNTRIES?.filter((option: Options) => {
              return option?.label === dataToSend?.country;
            })}
            onChange={(value: Options) => {
              setData('country', value.label);
            }}
            onBlur={() => {
              setEditMode(false);
            }}
          />
        )}
      </SimpleGrid>

      <HStack alignSelf={'end'}>
        <Button
          onClick={() => {
            setEditMode((prev: boolean) => {
              return !prev;
            });
          }}
        >
          {' '}
          Edit Mode
        </Button>
        <Button
          isDisabled={noChangesDetected}
          isLoading={isLoading}
          colorScheme='green'
          onClick={updateData}
        >
          Update
        </Button>
      </HStack>
    </VStack>
  );
};

export default JobDetails;
