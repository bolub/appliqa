import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react';
import { HiOutlineClock } from 'react-icons/hi';

import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchInterviewsForAnalytics } from '../../API/interview';
import { logout } from '../../utils/functions';
import { fetchTasksForAnalytics } from '../../API/task';
import Link from 'next/link';
// import advancedFormat from 'dayjs/plugin/advancedFormat';

const UpcomingTasksAndInterviews: FC<{ boardId: string }> = ({ boardId }) => {
  const [allInterviews, setAllInterviews] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  useQuery(
    [`${boardId} interviews`, boardId],
    () => fetchInterviewsForAnalytics(boardId),
    {
      enabled: !!boardId,
      onSuccess: (data) => {
        const mappedInterviews = data?.map((ind: any) => {
          return {
            id: ind?.id,
            ...ind?.attributes,
            type: 'interview',
          };
        });

        setAllInterviews(mappedInterviews);
      },
      onError: (data: any) => {
        const errors = { ...data };
        if (!errors?.response) {
          logout();
        }
      },
    }
  );

  useQuery(
    [`${boardId} tasks`, boardId],
    () => fetchTasksForAnalytics(boardId),
    {
      onSuccess: (data) => {
        const mappedTasks = data?.map((td: any) => {
          return {
            id: td?.id,
            ...td?.attributes,
            type: 'task',
          };
        });
        setAllTasks(mappedTasks);
      },
      onError: (data: any) => {
        const errors = { ...data };
        if (!errors?.response) {
          logout();
        }
      },
    }
  );

  const allData = [...allInterviews, ...allTasks].filter((data: any) => {
    const startDate = dayjs(data?.start);
    const endDate = dayjs(data?.end);
    const currentDate = dayjs(new Date());
    let difference = startDate.diff(currentDate, 'day');
    if (data?.end) {
      difference = endDate.diff(currentDate, 'day');
    }

    return difference > 0;
  });

  return (
    <>
      <Box
        flexDir={'column'}
        borderWidth='1px'
        borderColor={'gray.300'}
        bg='white'
        borderRadius={'8px'}
        px={6}
        py={8}
        maxH='52vh'
        overflowY={'auto'}
      >
        <Text flex={1} fontWeight={'bold'} fontSize='sm' color='gray.500'>
          Upcoming Tasks and Interviews
        </Text>

        <VStack mt={8} spacing={8} align={'start'}>
          {allData?.map((data: any) => {
            const job = data?.job?.data?.attributes;
            return (
              <Flex key={data?.id} w='100%'>
                {/* 1 */}
                <HStack w='55%'>
                  <Switch
                    isReadOnly
                    isChecked={data?.completed}
                    colorScheme={'green'}
                    id='email-alerts'
                  />

                  <Box w='full'>
                    <Text
                      fontSize={'sm'}
                      fontWeight='bold'
                      isTruncated
                      pr={6}
                      w='240px'
                    >
                      {data?.title}
                    </Text>

                    <HStack spacing={4}>
                      <HStack spacing={1} color='green.500'>
                        <Icon as={HiOutlineClock} my='auto' />
                        <Text
                          fontWeight={'bold'}
                          fontSize={'xs'}
                          textTransform='capitalize'
                        >
                          {dayjs(data?.start).fromNow()}
                        </Text>
                      </HStack>

                      <HStack spacing={1} color='green.500'>
                        <Text fontSize={'sm'}>🗒️</Text>

                        <Text
                          fontWeight={'bold'}
                          fontSize={'xs'}
                          textTransform='capitalize'
                        >
                          {data?.type}
                        </Text>
                      </HStack>
                    </HStack>
                  </Box>
                </HStack>

                {/* 2 */}
                <Box w='35%' fontSize={'13px'} fontWeight='medium' pr={6}>
                  <Text isTruncated>
                    {job?.level} {job?.role}
                  </Text>
                  <HStack spacing={1}>
                    <Avatar
                      rounded='full'
                      objectFit={'cover'}
                      bg='green.500'
                      src={`https://logo.clearbit.com/${job?.company_name}.com`}
                      boxSize='20px'
                    />

                    <Text>{job?.company_name}</Text>
                  </HStack>
                </Box>

                <Center ml='auto' w='10%'>
                  <Link
                    passHref
                    href={`/boards/2?jobId=${data?.jobId}&tab=${data?.type}`}
                  >
                    <Button
                      colorScheme={'green'}
                      variant='ghost'
                      bg='green.50'
                      rounded='full'
                      size='sm'
                      fontSize={'13px'}
                    >
                      View
                    </Button>
                  </Link>
                </Center>
              </Flex>
            );
          })}

          {allData?.length === 0 && (
            <Center w='100%' textAlign={'center'} h='250px' flexDir={'column'}>
              <Text fontSize={'2xl'}>🥲</Text>
              <Text fontSize={'sm'} color='gray.500'>
                No Upcoming tasks or Interviews
              </Text>
            </Center>
          )}
        </VStack>
      </Box>
    </>
  );
};

export default UpcomingTasksAndInterviews;
