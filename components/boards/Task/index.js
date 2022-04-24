import {
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CustomModal from '../../UI/CustomModal';
import ModalTitleComponent from './ModalTitleComponent';
import JobModalInfo from './JobModalInfo';
import CustomMenu from '../../UI/CustomMenu';
import {
  HiOutlineDotsVertical,
  HiOutlineInformationCircle,
  HiOutlineTrash,
} from 'react-icons/hi';
import { deleteJob, updateBoard, updateStage } from '../../../API/boards';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import ToastBody from '../../UI/ToastBody';

const Task = ({ task, index, column, originalBoardData }) => {
  const viewJobDisclosure = useDisclosure();
  const deleteJobDisclosure = useDisclosure();
  const toast = useToast();

  const title = `${task?.level} ${task?.role}`;
  const company = task?.company_name;

  const queryClient = useQueryClient();
  const { query } = useRouter();

  const { mutate: updateCStage } = useMutation(updateStage);

  const { mutate: updateCBoard } = useMutation(updateBoard);

  const { mutate: deleteCJob, isLoading } = useMutation(deleteJob, {
    onSuccess: () => {
      queryClient.invalidateQueries('board');
      toast({
        position: 'top-right',
        render: () => (
          <ToastBody
            title='Success'
            message='Job Deleted successfully'
            status='success'
          />
        ),
      });
      deleteJobDisclosure.onClose();
    },
  });

  const deleteJobHandler = () => {
    const stageDataToUpdate = {
      job_ids: column?.taskIds
        ?.filter((jid) => {
          return jid !== task?.slug;
        })
        .toString(),
    };

    const mappedJobIds = originalBoardData.attributes.jobs.data.map((jd) => {
      return jd.id;
    });

    const boardDataToUpdate = {
      jobs: mappedJobIds?.filter((jid) => {
        return jid !== task?.id;
      }),
    };

    updateCStage({ id: column?.id, body: stageDataToUpdate });

    updateCBoard({ id: query.id, body: boardDataToUpdate });

    deleteCJob({ id: task?.id });
  };

  return (
    <>
      <Draggable draggableId={task?.slug} index={index}>
        {(provided, snapshot) => (
          <Flex
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            w='full'
            borderRadius='8px'
            bg={!snapshot?.isDragging ? 'white' : 'green.50'}
            borderWidth='1px'
            borderColor={!snapshot?.isDragging ? 'gray.300' : 'green.500'}
            boxShadow={snapshot?.isDragging ? 'lg' : ''}
            pt={6}
            px={5}
            pb={4}
            flexDir='column'
            transition='border 0.2s ease'
          >
            <Flex align='start'>
              <Text
                onClick={viewJobDisclosure.onOpen}
                as='span'
                mr={4}
                fontWeight='bold'
                fontSize={'md'}
              >
                💼
              </Text>

              <VStack
                onClick={viewJobDisclosure.onOpen}
                align='start'
                spacing={0}
              >
                <Text
                  as='span'
                  my='auto'
                  fontWeight='extrabold'
                  fontSize={'sm'}
                >
                  {title}
                </Text>
                <Text color='gray.500' fontSize={'sm'} fontWeight='semibold'>
                  {company}
                </Text>
              </VStack>

              <CustomMenu
                buttonProps={{
                  ml: 'auto',
                  color: 'gray.500',
                  fontSize: 'xl',
                }}
                items={[
                  {
                    title: (
                      <HStack>
                        <Text fontSize={'lg'} color='gray.500'>
                          <HiOutlineInformationCircle />
                        </Text>
                        <Text
                          fontSize={'sm'}
                          fontWeight='bold'
                          color='gray.500'
                        >
                          View Info
                        </Text>
                      </HStack>
                    ),
                    actions: {
                      onClick: () => {
                        viewJobDisclosure.onOpen();
                      },
                    },
                  },
                  {
                    title: (
                      <HStack>
                        <Text fontSize={'md'} color='red.500'>
                          <HiOutlineTrash />
                        </Text>
                        <Text fontSize={'sm'} fontWeight='bold' color='red.500'>
                          Delete Job
                        </Text>
                      </HStack>
                    ),
                    actions: {
                      onClick: () => {
                        deleteJobDisclosure.onOpen();
                      },
                    },
                  },
                ]}
              >
                <HiOutlineDotsVertical />
              </CustomMenu>
            </Flex>

            <Text
              mt={3}
              fontSize='xs'
              ml='auto'
              fontWeight={'semibold'}
              color='gray.500'
            >
              5 days ago
            </Text>
          </Flex>
        )}
      </Draggable>

      <CustomModal
        disclosure={viewJobDisclosure}
        titleComponent={
          <ModalTitleComponent title={title} company={task?.company_name} />
        }
        minW={{ base: 'auto', md: '856px' }}
      >
        <JobModalInfo data={task} />
      </CustomModal>

      <CustomModal
        disclosure={deleteJobDisclosure}
        title='Delete Job'
        minW={{ base: 'auto', md: 'md' }}
      >
        <Text>Are you sure you want to delete this job?</Text>

        <HStack justifyContent={'end'} mt={8}>
          <Button onClick={deleteJobDisclosure.onClose} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={deleteJobHandler}
            colorScheme='red'
            isLoading={isLoading}
          >
            Delete
          </Button>
        </HStack>
      </CustomModal>
    </>
  );
};

export default Task;
