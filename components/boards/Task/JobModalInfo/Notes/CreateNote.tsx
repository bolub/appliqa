import { Box, Button, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { getCookie } from 'cookies-next';
import React, { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createNote } from '../../../../../API/notes';
import FormInput from '../../../../UI/Form/FormInput';
import ToastBody from '../../../../UI/ToastBody';

interface dataProps {
  content: string;
}

interface logInterviewProps {
  jobId: string;
  onClose: any;
}

const CreateNote: FC<logInterviewProps> = ({ onClose, jobId }) => {
  const [data, setData] = useState<dataProps>({
    content: '',
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

  const { mutate, status } = useMutation(createNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${jobId} notes`);
      onClose();
      setData({
        content: '',
      });

      toast({
        position: 'top-right',
        render: () => (
          <ToastBody title='Success' message='Note created successfully' />
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
        Add Note
      </Text>

      <VStack mt={6} align='start' w='100%' spacing={10}>
        <FormInput
          label='Content'
          type='textarea'
          for='Content'
          textareaProps={{
            placeholder: '',
            rows: 6,
            onChange: (e) => {
              setInfo('content', e.target.value);
            },
            value: data.content,
          }}
        />
      </VStack>

      <HStack ml='auto' mt={8} spacing={4}>
        <Button ml='auto' onClick={onClose} bg='white'>
          Cancel
        </Button>

        <Button
          ml='auto'
          colorScheme={'green'}
          isDisabled={!data.content}
          isLoading={status === 'loading'}
          onClick={() => {
            mutate({ ...data, userId: getCookie('USER_ID'), jobId });
          }}
        >
          Add Note
        </Button>
      </HStack>
    </Box>
  );
};

export default CreateNote;
