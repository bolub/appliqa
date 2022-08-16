import {
  Box,
  Button,
  Collapse,
  Flex,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState, FC } from 'react';
import { useQuery } from 'react-query';
import { logout } from '../../../../../utils/functions';
import CreateTask from './CreateTask';
import Loader from '../../../../UI/Loader';
import SingleTask from './SingleTask';
import { fetchTasks } from '../../../../../API/task';

const Tasks: FC<{ jobId: string }> = ({ jobId }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [allTasks, setAllTasks] = useState([]);

  const { status } = useQuery(
    [`${jobId} tasks`, jobId],
    () => fetchTasks(jobId),
    {
      onSuccess: (data) => {
        setAllTasks(data);
      },
      onError: (data: any) => {
        const errors = { ...data };
        if (!errors?.response) {
          logout();
        }
      },
    }
  );

  return (
    <>
      <Flex mt={3} mb={-6}>
        <Box
          my='auto'
          borderWidth={'1px'}
          borderStyle='dashed'
          w='100%'
          borderColor={'gray.300'}
          mr={4}
        ></Box>
        <Button
          ml='auto'
          mt={{ base: 3, md: 'auto' }}
          colorScheme={!isOpen ? 'green' : 'gray'}
          bg={isOpen ? 'white' : 'green.500'}
          borderWidth={isOpen ? '1px' : ''}
          onClick={onToggle}
        >
          {isOpen ? 'Close' : 'Create Task'}
        </Button>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <CreateTask onClose={onClose} jobId={jobId.toString()} />
      </Collapse>

      {/* Interview list */}
      <Loader status={status}>
        <SimpleGrid columns={{ base: 1 }} spacing={4} mt={12} mb={5}>
          {allTasks?.map((interviewData: any) => {
            return (
              <SingleTask
                key={interviewData?.id}
                id={interviewData?.id}
                interviewData={interviewData?.attributes}
              />
            );
          })}
        </SimpleGrid>
      </Loader>
    </>
  );
};

export default Tasks;
