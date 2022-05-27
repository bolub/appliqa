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
import CreateNote from './CreateNote';
import Loader from '../../../../../components/UI/Loader';
import SingleNote from './SingleNote';
import { fetchNotes } from '../../../../../API/notes';

const Notes: FC<{ jobId: string }> = ({ jobId }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [allNotes, setAllNotes] = useState([]);

  const { status } = useQuery(
    [`${jobId} notes`, jobId],
    () => fetchNotes(jobId),
    {
      onSuccess: (data) => {
        setAllNotes(data);
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
          {isOpen ? 'Close' : 'Add Note'}
        </Button>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <CreateNote onClose={onClose} jobId={jobId.toString()} />
      </Collapse>

      {/* Interview list */}
      <Loader status={status}>
        <SimpleGrid columns={{ base: 1 }} spacing={4} mt={12} mb={5}>
          {allNotes?.map((interviewData: any) => {
            return (
              <SingleNote
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

export default Notes;
