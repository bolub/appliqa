import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Flex,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Switch,
  Text,
  Textarea,
  Tooltip,
  useToast,
} from '@chakra-ui/react';

import _ from 'lodash';

import {
  HiOutlineCheck,
  HiOutlineClock,
  HiOutlineTrash,
  HiOutlineX,
} from 'react-icons/hi';

import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useMutation, useQueryClient } from 'react-query';
import ToastBody from '../../../../UI/ToastBody';
import CustomDateTimePickerStripped from '../../../../UI/Form/CustomDateTimePickerStripped';
import { deleteTask, updateTask } from '../../../../../API/task';
dayjs.extend(advancedFormat);

interface dataProps {
  title: string;
  category: string;
  start?: any;
  end?: Date | undefined;
  description?: string;
  completed?: boolean;
}

const Singleinterview: FC<any> = ({ interviewData, id }) => {
  const { title, description, completed, start, end, category } = interviewData;

  const [data, setData] = useState<dataProps>({
    title: title ?? '',
    description: description ?? '',
    category: category ?? '',
    completed: completed ?? false,
    start: start ?? new Date(),
    end: end ?? undefined,
  });

  const [initialData, setInitialData] = useState<dataProps>({
    title: title ?? '',
    description: description ?? '',
    category: category ?? '',
    completed: completed ?? false,
    start: start ?? new Date(),
    end: end ?? undefined,
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
  }, [data.description]);

  const startDate = dayjs(data?.start);
  const endDate = dayjs(data?.end);
  const currentDate = dayjs(new Date());
  let difference = startDate.diff(currentDate, 'day');
  if (data?.end) {
    difference = endDate.diff(currentDate, 'day');
  }

  const queryClient = useQueryClient();

  // delete task
  const { mutate: deleteCTask, isLoading } = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(`${id} tasks`);
      toast({
        position: 'top-right',
        render: () => (
          <ToastBody
            title='Success'
            message='Task Deleted successfully'
            status='success'
          />
        ),
      });
    },
  });

  // update task
  const { mutate: updateCTask, isLoading: isUpdateLoading } = useMutation(
    updateTask,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`${id} tasks`);
        toast({
          position: 'top-right',
          render: () => (
            <ToastBody
              title='Success'
              message='Task Updated successfully'
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
      <HStack>
        {/* <Text fontSize={'md'} fontWeight='bold'>
          {data?.category === 'Phone Interview' ? '📱' : '🏗️'}
        </Text> */}

        <Input
          variant={'unstyled'}
          color='gray.800'
          fontSize={'md'}
          fontWeight='bold'
          value={data?.title}
          onChange={(e) => {
            setInfo('title', e.target.value);
          }}
        />

        <Tooltip label='Completed'>
          <FormControl ml='auto' w={'fit-content'} alignItems='center'>
            <Switch
              colorScheme={'green'}
              isChecked={data?.completed}
              onChange={(e: any) => {
                setInfo('completed', e.target.checked);
              }}
              id='completed'
            />
          </FormControl>
        </Tooltip>
      </HStack>

      <Flex color='green.500' align={'center'}>
        <Icon as={HiOutlineClock} my='auto' />

        <CustomDateTimePickerStripped
          formControlProps={{
            mt: -1,
          }}
          inputProps={{
            fontSize: 'sm',
            fontWeight: 'bold',
            color: 'green.500',
            maxWidth: '120px',
            w: 'fit-content',
            mx: 1,
          }}
          selected={new Date(data?.start)}
          onChange={(value: any) => {
            setInfo('start', value);
          }}
        />

        <Flex my='auto' fontSize={'sm'} fontWeight='bold'>
          {data.end && (
            <>
              {'  '}
              <Text as='span' mr={1}>
                to
              </Text>{' '}
              <CustomDateTimePickerStripped
                formControlProps={{
                  mt: -1,
                }}
                inputProps={{
                  fontSize: 'sm',
                  fontWeight: 'bold',
                  color: 'green.500',
                }}
                selected={new Date(data?.end)}
                onChange={(value: any) => {
                  setInfo('end', value);
                }}
              />
            </>
          )}
          {difference <= 0 && (
            <Text as='span' textTransform={'capitalize'}>
              {' '}
              (
              {!data?.end
                ? dayjs(data?.start).fromNow()
                : dayjs(data?.end).fromNow()}
              )
            </Text>
          )}
        </Flex>
      </Flex>

      <Textarea
        mt={3}
        ref={textareaRef}
        variant={'unstyled'}
        placeholder='+ Make a note'
        maxH='250px'
        transition={'all 0.2s'}
        value={data?.description}
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
            deleteCTask({ id });
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
              updateCTask({
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

export default Singleinterview;
