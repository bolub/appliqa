import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';

const Column = ({
  column,
  tasks,
  originalData,
  AddJobHandler,
  setCurrentStage,
}) => {
  const [draggingOver, setIsDraggingOver] = useState(false);

  const filteredTasks = tasks?.filter((element) => {
    return element !== undefined;
  });
  return (
    <Box
      borderWidth={!draggingOver ? '1px' : '2px'}
      borderColor={!draggingOver ? 'gray.300' : 'green.600'}
      bg='gray.50'
      borderRadius={'13px'}
      minW='380px'
      px={6}
      pt={6}
      pb={4}
      maxH='63vh'
      overflowY='auto'
      transition='all 0.2s ease'
      // minH='200px'
    >
      <HStack>
        <Heading
          as='h2'
          fontWeight={'semibold'}
          fontSize='md'
          textTransform={'capitalize'}
        >
          {column?.title}
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
          {filteredTasks?.length}
          {/* {tasks?.length && tasks[0] ? tasks?.length : 0} */}
        </Badge>
      </HStack>

      <Droppable droppableId={column?.slug}>
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
              {tasks?.map((task, index) => {
                return (
                  <Task
                    key={task?.id}
                    task={task}
                    index={index}
                    column={column}
                    originalBoardData={originalData}
                  />
                );
              })}
              {provided.placeholder}
            </VStack>
          );
        }}
      </Droppable>

      <Button
        w='100%'
        mt={2}
        variant='unstyled'
        textAlign='left'
        onClick={() => {
          AddJobHandler();
          setCurrentStage(column);
        }}
        py={2}
        color='gray.500'
        _hover={{
          bg: 'gray.200',
        }}
        borderRadius='md'
      >
        <HStack px={3}>
          <Icon as={HiOutlinePlus} />
          <Text fontSize={'sm'} as='span'>
            Add Job
          </Text>
        </HStack>
      </Button>
    </Box>
  );
};

export default Column;
