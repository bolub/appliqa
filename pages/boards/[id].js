import {
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import SearchInput from '../../components/UI/Form/SearchInput';
import { initialData } from '../../utils/board';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../../components/boards/Column';
import BoardGoal from '../../components/boards/BoardGoal';
import CustomModal from '../../components/UI/CustomModal';
import CreateJob from '../../components/boards/CreateJob';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchSingleBoard, updateBoard, updateStage } from '../../API/boards';
import { fetchGoals } from '../../API/goals';
import Loader from '../../components/UI/Loader';
import { useRouter } from 'next/router';
import { formatDataForBoard } from '../../utils/functions';
import {
  HiOutlineCheck,
  HiOutlineInformationCircle,
  HiOutlineX,
} from 'react-icons/hi';
import ToastBody from '../../components/UI/ToastBody';
import { useSetRecoilState } from 'recoil';
import { boardState } from './../../recoil/board';
import { getCookie } from 'cookies-next';
import BoardLoader from './../../components/UI/Loaders/BoardLoader';

const Boards = () => {
  const [boardData, setBoardData] = useState(initialData);
  const setUnfilteredBoardData = useSetRecoilState(boardState);
  const [allGoals, setAllGoals] = useState([]);
  const [boardTitle, setBoardTitle] = useState('');
  const toast = useToast();
  const [currentStage, setCurrentStage] = useState({});

  const { query } = useRouter();

  const queryClient = useQueryClient();
  const { data, status } = useQuery(['board', query.id], () =>
    fetchSingleBoard(query.id)
  );
  useQuery('goals', fetchGoals, {
    onSuccess: (data) => {
      setAllGoals(data);
    },
  });

  const { mutate: updateCStage } = useMutation(updateStage, {
    onSuccess: () => {
      queryClient.invalidateQueries('board');
    },
  });

  const { mutate: updateCBoard, isLoading: isBoardUpdateLoading } = useMutation(
    updateBoard,
    {
      onSuccess: () => {
        toast({
          position: 'top-right',
          isClosable: true,
          render: () => (
            <ToastBody
              title='Success'
              message='Job updated successfully'
              status='success'
            />
          ),
        });
        setHeaderUpdate(false);
        queryClient.invalidateQueries('board');
      },
    }
  );

  useEffect(() => {
    setBoardData({
      ...formatDataForBoard(data),
    });
    setUnfilteredBoardData(data);
    setBoardTitle(data?.attributes?.title);
  }, [data, setUnfilteredBoardData]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // if the content was dropped outside the dragdrop container
    if (!destination) return;

    // If the user drops the content back where it started from
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // get column where we picked the content to drag and column where we are going to drop
    const start = boardData.columns[source.droppableId];
    const finish = boardData.columns[destination.droppableId];

    if (start === finish) {
      // get taskIds from column
      const clonedTaskIds = Array.from(start?.taskIds);
      [clonedTaskIds[source.index], clonedTaskIds[destination.index]] = [
        clonedTaskIds[destination.index],
        clonedTaskIds[source.index],
      ];
      const newColumn = {
        ...start,
        taskIds: clonedTaskIds,
      };

      const newColumnForAPI = {
        job_ids: clonedTaskIds.toString(),
      };

      updateCStage({ id: start.id, body: newColumnForAPI });

      setBoardData((prevData) => ({
        ...prevData,
        columns: {
          ...prevData.columns,
          [newColumn.slug]: newColumn,
        },
      }));
    } else {
      const clonedStartTaskIds = [...start.taskIds];
      clonedStartTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: clonedStartTaskIds,
      };
      const newStartForAPI = {
        job_ids: clonedStartTaskIds.toString(),
      };

      const clonedFinishTaskIds = [...finish.taskIds];
      clonedFinishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: clonedFinishTaskIds,
      };
      const newFinishForAPI = {
        job_ids: clonedFinishTaskIds.toString(),
      };

      updateCStage({ id: newStart.id, body: newStartForAPI });
      updateCStage({ id: newFinish.id, body: newFinishForAPI });

      setBoardData((prevData) => {
        return {
          ...prevData,
          columns: {
            ...prevData.columns,
            [newStart.slug]: newStart,
            [newFinish.slug]: newFinish,
          },
        };
      });
    }
  };

  const jobDisclosure = useDisclosure();

  const goalsToDisplay = useMemo(() => {
    return allGoals?.map((bd) => {
      return {
        label: `${bd?.attributes?.level} ${bd?.attributes?.role}`,
        value: bd?.id,
      };
    });
  }, [allGoals]);

  const [headerUpdate, setHeaderUpdate] = useState(false);

  const searchJobs = (value) => {
    if (!value || value === '') {
      setBoardData({
        ...formatDataForBoard(data),
      });
      return;
    }

    const copiedJobs = [...data.attributes.jobs.data];

    const filteredJobs = copiedJobs.filter((job) => {
      return `${job.attributes.level.toLowerCase()} ${job.attributes.role.toLowerCase()}`.includes(
        value.toLowerCase()
      );
    });

    const filteredStages = data?.attributes?.stages?.data?.map((stage) => {
      const CopiedJobIds = stage?.attributes?.job_ids?.split(',');

      let JobIds = [];

      CopiedJobIds.forEach((jobId, index) => {
        if (jobId === filteredJobs[index]?.attributes?.slug) {
          JobIds.push(jobId);
        }
      });

      return {
        ...stage,
        attributes: {
          ...stage.attributes,
          job_ids: JobIds?.toString() || '',
        },
      };
    });

    const newBoardData = {
      ...data,
      attributes: {
        ...data.attributes,
        jobs: { data: [...filteredJobs] },
        stages: { data: [...filteredStages] },
      },
    };

    setBoardData({
      ...formatDataForBoard(newBoardData),
    });
  };

  if (
    status === 'success' &&
    data?.attributes?.userId !== getCookie('USER_ID')
  ) {
    return (
      <Center w='100%' h='90vh'>
        <Text fontSize={'xl'} fontWeight='bold'>
          Board not available{' '}
        </Text>
      </Center>
    );
  }
  return (
    <Container maxW='7xl' pt={{ base: 12 }}>
      {/* Header title and goal */}
      <Flex>
        <Input
          variant={'unstyled'}
          value={boardTitle}
          fontWeight={'black'}
          fontSize='2xl'
          w='fit-content'
          onFocus={() => setHeaderUpdate(true)}
          onChange={(e) => {
            setBoardTitle(e.target.value);
          }}
          pr={3}
          my='auto'
        />

        {headerUpdate && (
          <HStack ml={2} mr={10} my='auto'>
            <IconButton
              aria-label='Update title'
              icon={<HiOutlineCheck />}
              rounded='full'
              colorScheme={'green'}
              fontSize='lg'
              size='sm'
              isLoading={isBoardUpdateLoading}
              isDisabled={!boardTitle}
              onClick={() => {
                updateCBoard({
                  id: data.id,
                  body: {
                    title: boardTitle,
                  },
                });
              }}
            />
            <IconButton
              aria-label='Close'
              icon={<HiOutlineX />}
              rounded='full'
              fontSize='lg'
              size='sm'
              isDisabled={isBoardUpdateLoading}
              onClick={() => {
                if (!boardTitle) {
                  setBoardTitle(data.attributes.title);
                }

                setHeaderUpdate(false);
              }}
            />
          </HStack>
        )}

        {/* Goal */}
        <Flex bg='gray.100' w='fit-content' rounded='lg' pr={4}>
          <Menu autoSelect={false}>
            <MenuButton
              as={Button}
              fontWeight={'bold'}
              variant='unstyled'
              pl={4}
            >
              <Flex>
                <Text as='span' my='auto' mr={3} fontSize='lg'>
                  🥅
                </Text>
              </Flex>
            </MenuButton>
            <MenuList zIndex={3}>
              {goalsToDisplay?.map((gd) => {
                return (
                  <MenuItem
                    zIndex={100}
                    key={gd.value}
                    onClick={() => {
                      // setSelectedGoal(gd);
                      updateCBoard({
                        id: data.id,
                        body: {
                          goal: gd.value,
                        },
                      });
                    }}
                  >
                    {gd.label}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>

          <Popover autoFocus={false}>
            <PopoverTrigger>
              <Text as='span' tabIndex={0} my='auto'>
                <Icon
                  as={HiOutlineInformationCircle}
                  fontSize={'18px'}
                  mt={2}
                  cursor='pointer'
                />
              </Text>
            </PopoverTrigger>
            <PopoverContent
              borderWidth='1px'
              borderRadius={'xl'}
              borderColor={'green.600'}
            >
              <PopoverArrow />
              <PopoverCloseButton />

              <PopoverBody fontSize='sm' py={5} px={5}>
                {data?.attributes?.goal?.data && (
                  <BoardGoal data={data?.attributes?.goal?.data?.attributes} />
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
      {/* Search Input and "Add Job" button */}
      <Flex flexDir={{ base: 'column', md: 'row' }} mt={{ base: 5, md: 8 }}>
        <SearchInput
          containerProps={{
            maxW: '400px',
            my: 'auto',
          }}
          inputProps={{
            onChange: (e) => {
              searchJobs(e.target.value);
            },
          }}
        />

        <Button
          ml='auto'
          mt={{ base: 3, md: 'auto' }}
          mb={{ md: 'auto' }}
          colorScheme={'green'}
          onClick={jobDisclosure.onOpen}
          isDisabled={!data}
        >
          Add Job
        </Button>
      </Flex>
      <Loader loader={<BoardLoader />} status={status}>
        <DragDropContext onDragEnd={onDragEnd}>
          <HStack align='start' spacing={6} mt={8} overflowX='scroll' h='63vh'>
            {boardData?.columnOrder?.map((columnId) => {
              // get columnData based on the current columId
              const column = boardData?.columns[columnId];

              // get all tasks related to the gotten column
              const ntasks = column?.taskIds?.map((taskId) => {
                return boardData?.tasks[taskId];
              });

              return (
                <Column
                  key={column?.slug}
                  column={column}
                  tasks={ntasks}
                  originalData={data}
                  AddJobHandler={jobDisclosure.onOpen}
                  setCurrentStage={setCurrentStage}
                />
              );
            })}{' '}
          </HStack>
        </DragDropContext>

        <CustomModal disclosure={jobDisclosure} title='Add Job'>
          <CreateJob
            boardData={boardData}
            originalBoardData={data}
            disclosure={jobDisclosure}
            currentStage={currentStage}
          />
        </CustomModal>
      </Loader>
    </Container>
  );
};

export default Boards;
