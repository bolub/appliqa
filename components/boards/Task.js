import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index }) => {
  return (
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
          <HStack align='start'>
            <Text as='span' mr={2} fontWeight='bold' fontSize={'md'}>
              💼
            </Text>

            <VStack align='start' spacing={0}>
              <Text as='span' my='auto' fontWeight='extrabold' fontSize={'sm'}>
                {task?.level} {task?.role}
              </Text>
              <Text color='gray.500' fontSize={'sm'}>
                {task?.company_name}
              </Text>
            </VStack>
          </HStack>

          <Text
            mt={3}
            fontSize='xs'
            ml='auto'
            fontWeight={'semibold'}
            color='gray.500'
          >
            {task?.created}
          </Text>
        </Flex>
      )}
    </Draggable>
  );
};

export default Task;
