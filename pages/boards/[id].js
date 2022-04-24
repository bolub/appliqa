import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SearchInput from '../../components/UI/Form/SearchInput';
import { initialData } from '../../utils/board';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../../components/boards/Column';
import CustomModal from '../../components/UI/CustomModal';
import CreateJob from '../../components/boards/CreateJob';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchSingleBoard, updateStage } from '../../API/boards';
import Loader from '../../components/UI/Loader';
import { useRouter } from 'next/router';

const Boards = () => {
  const [boardData, setBoardData] = useState(initialData);

  const { query } = useRouter();

  const queryClient = useQueryClient();
  const { data, status } = useQuery(['board', query.id], () =>
    fetchSingleBoard(query.id)
  );

  const { mutate: updateCStage } = useMutation(updateStage, {
    onSuccess: () => {
      queryClient.invalidateQueries('board');
    },
  });

  useEffect(() => {
    const columnOrder =
      data?.attributes?.stage_order?.data?.attributes?.order.split(',');

    const columns = data?.attributes?.stages?.data
      .map((cd) => {
        return {
          id: cd?.id,
          slug: cd?.attributes?.slug,
          title: cd?.attributes?.title,
          taskIds: cd?.attributes?.job_ids
            ? cd?.attributes?.job_ids?.split(',')
            : [],
        };
      })
      .reduce((obj, cur) => ({ ...obj, [cur?.slug]: cur }), {});

    const tasks = data?.attributes?.jobs?.data
      .map((cd) => {
        return {
          id: cd?.id,
          ...cd.attributes,
        };
      })
      .reduce((obj, cur) => ({ ...obj, [cur.slug]: cur }), {});

    setBoardData({
      tasks,
      columns,
      columnOrder,
    });
  }, [data]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // if the content was dropped outsied the dragdrop container
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

  return (
    <Container maxW='7xl' pt={{ base: 12, md: 20 }}>
      <Heading as='h1' fontWeight={'black'} fontSize='2xl'>
        Job Search 2022
      </Heading>

      <Flex flexDir={{ base: 'column', md: 'row' }} mt={{ base: 5, md: 10 }}>
        <SearchInput
          containerProps={{
            maxW: '400px',
            my: 'auto',
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

      <Loader status={status} loadingText='Fetching Board Data...'>
        <DragDropContext onDragEnd={onDragEnd}>
          <HStack align='start' spacing={6} mt={8} overflowX='scroll'>
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
          />
        </CustomModal>
      </Loader>
    </Container>
  );
};

export default Boards;
