import { Button, Container, Flex, Heading, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SearchInput from '../components/UI/Form/SearchInput';
import { initialData } from '../utils/board';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './../components/boards/Column';

const Boards = () => {
  const [testData, setTestData] = useState(initialData);

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

    // const column = testData.columns[source.droppableId];

    // get column where we picked the content to drag and column where we are going to drop
    const start = testData.columns[source.droppableId];
    const finish = testData.columns[destination.droppableId];

    if (start === finish) {
      // get taskIds from column
      const clonedTaskIds = Array.from(start.taskIds);
      // clonedTaskIds.splice(source.index, 1);
      // clonedTaskIds.splice(destination.index, 0, source.index);

      [clonedTaskIds[source.index], clonedTaskIds[destination.index]] = [
        clonedTaskIds[destination.index],
        clonedTaskIds[source.index],
      ];

      const newColumn = {
        ...start,
        taskIds: clonedTaskIds,
      };

      setTestData((prevData) => ({
        ...prevData,
        columns: {
          ...prevData.columns,
          [newColumn.id]: newColumn,
        },
      }));
    } else {
      const clonedStartTaskIds = [...start.taskIds];
      clonedStartTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: clonedStartTaskIds,
      };

      const clonedFinishTaskIds = [...finish.taskIds];
      clonedFinishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: clonedFinishTaskIds,
      };

      setTestData((prevData) => {
        return {
          ...prevData,
          columns: {
            ...prevData.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
          },
        };
      });
    }
  };

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
        >
          Create Goal
        </Button>
      </Flex>

      <DragDropContext
        // onDragStart
        // onDragUpdate
        onDragEnd={onDragEnd}
      >
        <HStack align='start' spacing={6} mt={8} overflowX='scroll'>
          {/* <DragDropContext
          // onDragStart
          // onDragUpdate
          onDragEnd={onDragEnd}
        > */}
          {/* Map through the columnOrder */}
          {testData.columnOrder.map((columnId) => {
            // get columnData based on the current columId
            const column = testData.columns[columnId];

            // get all tasks related to the gotten column
            const tasks = column.taskIds.map(
              (taskId) => testData.tasks[taskId]
            );

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}{' '}
          {/* </DragDropContext> */}
        </HStack>
      </DragDropContext>
    </Container>
  );
};

export default Boards;
