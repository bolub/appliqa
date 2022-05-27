import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  SimpleGrid,
  Switch,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { getCookie } from 'cookies-next';
import React, { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createTask } from '../../../../../API/task';
import CustomDateTimePicker from '../../../../UI/Form/CustomDateTimePicker';
import FormInput from '../../../../UI/Form/FormInput';
import ToastBody from '../../../../UI/ToastBody';

interface dataProps {
  title: string;
  start?: Date;
  end?: Date | undefined;
  description?: string;
  completed?: boolean;
}

interface logInterviewProps {
  jobId: string;
  onClose: any;
}

const LogInterview: FC<logInterviewProps> = ({ onClose, jobId }) => {
  const [data, setData] = useState<dataProps>({
    title: '',
    start: new Date(),
    end: undefined,
    description: '',
    completed: false,
  });

  const setInfo = (label: string, value: string | boolean) => {
    setData((prevData) => {
      return {
        ...prevData,
        [label]: value,
      };
    });
  };

  const queryClient = useQueryClient();

  const { mutate, status } = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${jobId} tasks`);
      onClose();
      setData({
        title: '',
        start: new Date(),
        end: undefined,
        description: '',
      });

      toast({
        position: 'top-right',
        render: () => (
          <ToastBody title='Success' message='Tasked successfully' />
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

  const toast = useToast();

  return (
    <Box p={8} bg='gray.100'>
      <Text fontWeight={'extrabold'} fontSize='lg'>
        Create Task
      </Text>

      <VStack mt={8} align='start' w='100%' spacing={10}>
        <SimpleGrid columns={{ base: 1 }} w='100%' spacing={10}>
          {/* <SearchableSelect
            label='Category'
            options={[
              { label: 'Phone Interview', value: 'Phone Interview' },
              {
                label: 'Onsite Interview',
                value: 'Onsite Interview',
              },
            ]}
            onChange={(value: Options) => {
              setInfo('category', value.label);
              setInfo('title', value.label);
            }}
            formControlProps={{
              isRequired: true,
            }}
          /> */}

          <FormInput
            label='Title'
            type='text'
            for='Title'
            formControlProps={{
              isRequired: true,
            }}
            inputProps={{
              placeholder: 'Update my resume',
              onChange: (e) => {
                setInfo('title', e.target.value);
              },
              value: data.title,
            }}
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} w='100%' spacing={10}>
          <CustomDateTimePicker
            label='Start Time'
            formControlProps={{
              isRequired: true,
            }}
            selected={data?.start}
            onChange={(value: any) => {
              setInfo('start', value);
            }}
          />

          <CustomDateTimePicker
            label='End Time'
            selected={data?.end}
            onChange={(value: any) => {
              setInfo('end', value);
            }}
          />
        </SimpleGrid>

        <FormInput
          label='Description/Note'
          type='textarea'
          for='Description/Note'
          formControlProps={{
            mt: 12,
          }}
          textareaProps={{
            placeholder: 'Checkout examples on the internet',
            rows: 6,
            onChange: (e) => {
              setInfo('description', e.target.value);
            },
            value: data.description,
          }}
        />

        <FormControl d='flex' alignItems='center'>
          <FormLabel
            fontWeight={'bold'}
            fontSize='sm'
            color='gray.500'
            htmlFor='completed'
            mb='0'
            mr={2}
          >
            Task completed
          </FormLabel>
          <Switch
            colorScheme={'green'}
            id='completed'
            isChecked={data?.completed}
            onChange={(e) => {
              setInfo('completed', e.target.checked);
            }}
          />
        </FormControl>
      </VStack>

      <HStack ml='auto' mt={8} spacing={4}>
        <Button ml='auto' onClick={onClose} bg='white'>
          Cancel
        </Button>

        <Button
          ml='auto'
          colorScheme={'green'}
          isDisabled={!data.title || !data.start}
          isLoading={status === 'loading'}
          onClick={() => {
            mutate({ ...data, userId: getCookie('USER_ID'), jobId });
          }}
        >
          Create Task
        </Button>
      </HStack>
    </Box>
  );
};

export default LogInterview;
