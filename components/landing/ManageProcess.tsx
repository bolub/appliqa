import {
  Box,
  chakra,
  Container,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { FC } from 'react';

const ManageProcess = () => {
  const Data: FC<{ emoji: string; title: string; description: string }> = ({
    emoji,
    title,
    description,
  }) => {
    return (
      <AccordionItem mb={8} borderTop={0} borderBottomWidth='1px'>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton pl={0} pb={!isExpanded ? 8 : 4}>
                <HStack fontSize={{ base: 'md', md: 'lg' }} flex={1}>
                  <Text>{emoji}</Text>
                  <Text
                    fontWeight={'bold'}
                    color={isExpanded ? 'green.500' : ''}
                  >
                    {title}
                  </Text>
                </HStack>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{description}</AccordionPanel>
          </>
        )}
      </AccordionItem>
    );
  };

  return (
    <Container maxW='7xl' mt={{ base: 24, md: 32 }} mb={10}>
      <chakra.h2 fontSize={{ base: '2xl', md: '4xl' }} fontWeight='black'>
        Manage your process
      </chakra.h2>
      <chakra.p mt={1} fontWeight='medium'>
        Track job applicatons easily
      </chakra.p>

      <Flex mt={{ base: 10, md: 16 }} flexDir={{ base: 'column', md: 'row' }}>
        {/* 1 */}
        <Box w={{ base: '100%', md: '60%' }} my='auto'>
          <Image src='/landing/ManageProcess.png' alt='Manage Process' />
        </Box>

        {/* 2 */}
        <VStack
          spacing={12}
          align={'start'}
          w={{ base: '100%', md: '40%' }}
          mb='auto'
          mt={{ base: 16, md: 'auto' }}
        >
          <Accordion w='full' allowMultiple defaultIndex={0}>
            <Data
              emoji='ℹ️'
              title='Mange Job Information'
              description='Easily manage your job application information, Company information, salary and more in one central location'
            />

            <Data
              emoji='📋'
              title='Log Interviews'
              description='Easily add and manage your upcoming job interviews. Add the date, time, type of interview and write a description/note..'
            />

            <Data
              emoji='🗒️'
              title='Create Tasks'
              description='Create task lists for job applications, using a simple and intuitive UI.'
            />
          </Accordion>
        </VStack>
      </Flex>
    </Container>
  );
};

export default ManageProcess;
