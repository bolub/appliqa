import {
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import {
  HiOutlineDotsVertical,
  HiOutlineInformationCircle,
  HiOutlineTrash,
} from 'react-icons/hi';
import { useMutation, useQueryClient } from 'react-query';
import { deleteGoal } from '../../API/goals';
import { GoalProps } from '../../pages/goals';
import { getRange } from '../../utils/functions';
import CustomMenu from '../UI/CustomMenu';
import CustomModal from '../UI/CustomModal';
import ToastBody from '../UI/ToastBody';
import ViewEditGoal from './ViewEditGoal';

const SingleGoal: FC<{ data: GoalProps }> = ({ data }) => {
  const viewGoalDisclosure = useDisclosure();
  const deleteGoalDisclosure = useDisclosure();
  const toast = useToast();

  const queryClient = useQueryClient();

  const { mutate: deleteCGoal, isLoading } = useMutation(deleteGoal, {
    onSuccess: () => {
      queryClient.invalidateQueries('goals');

      toast({
        position: 'top-right',
        isClosable: true,
        render: () => (
          <ToastBody
            title='Success'
            message='Goal Deleted successfully'
            status='success'
          />
        ),
      });
      deleteGoalDisclosure.onClose();
    },
  });

  return (
    <Flex
      flexDir={'column'}
      borderWidth='1px'
      borderColor={'gray.300'}
      borderRadius='8px'
      px={6}
      pt={6}
      pb={8}
    >
      <Flex>
        <Heading
          onClick={viewGoalDisclosure.onOpen}
          cursor='pointer'
          as='h2'
          fontWeight='bold'
          fontSize={'md'}
          d='flex'
        >
          <Text as='span' my='auto' mr={2}>
            🥅
          </Text>
          <Text as='span' my='auto'>
            {data.attributes.level} {data.attributes.role}
          </Text>
        </Heading>

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
                  <Text fontSize={'sm'} fontWeight='bold' color='gray.500'>
                    View Info
                  </Text>
                </HStack>
              ),
              actions: {
                onClick: () => {
                  viewGoalDisclosure.onOpen();
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
                    Delete Goal
                  </Text>
                </HStack>
              ),
              actions: {
                onClick: () => {
                  deleteGoalDisclosure.onOpen();
                },
              },
            },
          ]}
        >
          <HiOutlineDotsVertical />
        </CustomMenu>

        <CustomModal
          disclosure={viewGoalDisclosure}
          title={`${data.attributes.level} ${data.attributes.role} Goal`}
        >
          <ViewEditGoal disclosure={viewGoalDisclosure} data={data} />
        </CustomModal>

        <CustomModal
          disclosure={deleteGoalDisclosure}
          title='Delete Job'
          minW={{ base: 'auto', md: 'md' }}
        >
          <Text>Are you sure you want to delete this goal?</Text>

          <HStack justifyContent={'end'} mt={8}>
            <Button
              onClick={deleteGoalDisclosure.onClose}
              isDisabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleteCGoal({ id: data?.id });
              }}
              colorScheme='red'
              isLoading={isLoading}
            >
              Delete
            </Button>
          </HStack>
        </CustomModal>
      </Flex>

      <VStack
        cursor={'pointer'}
        onClick={viewGoalDisclosure.onOpen}
        align={'start'}
        mt={4}
        spacing={1}
      >
        <HStack fontSize={'sm'} fontWeight='semibold' color='gray.500'>
          <Text as='span'>💰</Text>
          <Text as='span'>
            {getRange(
              data?.attributes?.currency,
              data.attributes.minimum_salary_range,
              data.attributes.maximum_salary_range
            )}
          </Text>
        </HStack>

        <HStack fontSize={'sm'} fontWeight='semibold' color='gray.500'>
          <Text as='span'>💼</Text>
          <Text as='span'>{data.attributes.job_type}</Text>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default SingleGoal;
