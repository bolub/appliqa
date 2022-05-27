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
import { fetchInterviews } from '../../../../../API/interview';
import { logout } from '../../../../../utils/functions';
import LogInterview from './LogInterview';
import Loader from '../../../../../components/UI/Loader';
import Singleinterview from './Singleinterview';

const Interview: FC<{ jobId: string }> = ({ jobId }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [allInterviews, setAllInterviews] = useState([]);

  const { status } = useQuery(
    [`${jobId} interviews`, jobId],
    () => fetchInterviews(jobId),
    {
      onSuccess: (data) => {
        setAllInterviews(data);
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
          {isOpen ? 'Close' : 'Log Interview'}
        </Button>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <LogInterview onClose={onClose} jobId={jobId.toString()} />
      </Collapse>

      {/* Interview list */}
      <Loader status={status}>
        <SimpleGrid columns={{ base: 1 }} spacing={4} mt={12} mb={5}>
          {allInterviews?.map((interviewData: any) => {
            return (
              <Singleinterview
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

export default Interview;
