import React, { FC, useEffect, useRef, useState } from 'react';
import { Flex, HStack, IconButton, Textarea, useToast } from '@chakra-ui/react';

import _ from 'lodash';

import { HiOutlineCheck, HiOutlineTrash, HiOutlineX } from 'react-icons/hi';

import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useMutation, useQueryClient } from 'react-query';
import ToastBody from '../../../../UI/ToastBody';
import { deleteNote, updateNote } from '../../../../../API/notes';
dayjs.extend(advancedFormat);

interface dataProps {
  content?: string;
}

const SingleNote: FC<any> = ({ interviewData, id }) => {
  const { content } = interviewData;

  const [data, setData] = useState<dataProps>({
    content: content ?? '',
  });

  const [initialData, setInitialData] = useState<dataProps>({
    content: content ?? '',
  });

  const setInfo = (label: string, value: string) => {
    setData({
      ...data,
      [label]: value,
    });
  };

  const textareaRef = useRef<any>(null);

  useEffect(() => {
    textareaRef.current.style.height = '0px';
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + 'px';
  }, [data.content]);

  const queryClient = useQueryClient();

  // delete note
  const { mutate: deleteCNote, isLoading } = useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${id} notess`);
      toast({
        position: 'top-right',
        render: () => (
          <ToastBody
            title='Success'
            message='Note Deleted successfully'
            status='success'
          />
        ),
      });
    },
  });

  // update note
  const { mutate: updateCNote, isLoading: isUpdateLoading } = useMutation(
    updateNote,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`${id} notes`);
        toast({
          position: 'top-right',
          render: () => (
            <ToastBody
              title='Success'
              message='Note Updated successfully'
              status='success'
            />
          ),
        });
        setInitialData(data);
      },
    }
  );

  const toast = useToast();
  const noChangesDetected = _.isEqual(initialData, data);
  return (
    <Flex
      borderWidth={'1px'}
      borderColor='gray.300'
      borderRadius={'8px'}
      pt={8}
      pb={5}
      px={8}
      flexDir='column'
    >
      <Textarea
        mt={3}
        ref={textareaRef}
        variant={'unstyled'}
        placeholder='+ Make a note'
        maxH='250px'
        transition={'all 0.2s'}
        value={data?.content}
        onChange={(e) => {
          setInfo('description', e.target.value);
        }}
      />

      {noChangesDetected ? (
        <IconButton
          aria-label='Delete Interview'
          icon={<HiOutlineTrash size={'16px'} />}
          colorScheme='red'
          variant={'ghost'}
          ml='auto'
          bg='red.50'
          mt={6}
          isLoading={isLoading}
          onClick={() => {
            deleteCNote({ id });
          }}
        />
      ) : (
        <HStack ml='auto' mt={12}>
          <IconButton
            aria-label='Update Interview'
            icon={<HiOutlineCheck />}
            rounded='full'
            colorScheme={'green'}
            fontSize='xl'
            size='md'
            w='50px'
            isLoading={isUpdateLoading}
            onClick={() => {
              updateCNote({
                id,
                body: {
                  ...data,
                },
              });
            }}
          />
          <IconButton
            aria-label='Close'
            icon={<HiOutlineX />}
            rounded='full'
            fontSize='xl'
            size='md'
            w='50px'
            isDisabled={isUpdateLoading}
            onClick={() => {
              setData(initialData);
            }}
          />
        </HStack>
      )}
    </Flex>
  );
};

export default SingleNote;
