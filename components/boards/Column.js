import { Badge, Box, Heading, HStack, VStack } from '@chakra-ui/react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';

const Column = ({ column, tasks }) => {
  const [draggingOver, setIsDraggingOver] = useState(false);

  return (
    <Box
      borderWidth={!draggingOver ? '1px' : '2px'}
      borderColor={!draggingOver ? 'gray.300' : 'green.600'}
      bg='gray.50'
      borderRadius={'13px'}
      minW='380px'
      px={6}
      pt={6}
      pb={8}
      maxH='63vh'
      overflowY='auto'
      transition='all 0.2s ease'
      minH='200px'
    >
      <HStack>
        <Heading as='h2' fontWeight={'semibold'} fontSize='md'>
          {column.title}
        </Heading>

        <Badge
          size={'lg'}
          bg='gray.800'
          color='white'
          rounded='full'
          px={3}
          py={1}
          fontWeight='bold'
          fontSize={'md'}
        >
          {tasks.length}
        </Badge>
      </HStack>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => {
          setIsDraggingOver(snapshot.isDraggingOver);

          return (
            <VStack
              align={'start'}
              spacing={4}
              mt={2}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => {
                return <Task key={task.id} task={task} index={index} />;
              })}
              {provided.placeholder}
            </VStack>
          );
        }}
      </Droppable>
    </Box>
  );
};

export default Column;
