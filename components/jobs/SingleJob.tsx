import {
  Avatar,
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  IconButton,
  Tag,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
  Link,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineCalendar,
  HiOutlineDotsVertical,
  HiOutlineTag,
} from 'react-icons/hi';
import { formatDateAgo } from '../../utils/functions';

const SingleJob: FC<{ job: any }> = ({ job }) => {
  const { isOpen, onToggle } = useDisclosure();

  const DateTags = () => (
    <>
      <HStack mb={{ base: 5, md: 8 }} fontSize={'sm'} color='gray.500'>
        <Text fontSize={'md'}>
          <HiOutlineCalendar />
        </Text>

        <Text fontWeight='bold'>
          Posted {formatDateAgo(job?.publication_date)}
        </Text>
      </HStack>

      <VStack align={'start'} d={{ base: 'none', md: 'flex' }}>
        <HStack fontSize={'sm'} color='gray.500'>
          <Text fontSize={'md'}>
            <HiOutlineTag />
          </Text>

          <Text fontWeight='bold'>Tags</Text>
        </HStack>

        <Wrap>
          {job?.locations?.map((ld: any) => {
            return (
              <WrapItem key={ld?.name}>
                <Tag
                  colorScheme='green'
                  fontWeight={'bold'}
                  py={2}
                  px={3}
                  textAlign={'center'}
                  d='inline-block'
                >
                  {' '}
                  📍 {ld?.name}
                </Tag>
              </WrapItem>
            );
          })}
          {job?.levels?.map((levelData: any) => {
            return (
              <WrapItem key={levelData?.name}>
                <Tag
                  colorScheme='green'
                  fontWeight={'bold'}
                  py={2}
                  px={3}
                  textAlign={'center'}
                  d='inline-block'
                >
                  {' '}
                  {levelData?.name}
                </Tag>
              </WrapItem>
            );
          })}
          {job?.categories?.map((categoryData: any) => {
            return (
              <WrapItem key={categoryData?.name}>
                <Tag
                  colorScheme='green'
                  fontWeight={'bold'}
                  alignItems='center'
                  d='inline-block'
                  py={2}
                  px={3}
                >
                  {' '}
                  {categoryData?.name}
                </Tag>
              </WrapItem>
            );
          })}
        </Wrap>
      </VStack>

      <Link href={job?.refs?.landing_page} isExternal>
        <Button
          w='full'
          mt={6}
          variant='unstyled'
          colorScheme='green'
          bg='green.50'
          _hover={{
            bg: 'green.100',
          }}
          color='green.500'
        >
          Apply
        </Button>
      </Link>
    </>
  );

  return (
    <Flex
      flexDir={'column'}
      w='full'
      borderWidth='1px'
      borderColor={'gray.300'}
      borderRadius='8px'
      pt={6}
      pb={6}
    >
      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        w='full'
        px={{ base: 4, md: 8 }}
      >
        <HStack
          flexDir={{ base: 'column', md: 'row' }}
          align={'start'}
          spacing={{ md: 6 }}
          w={{ base: '100%', md: '50%' }}
          my='auto'
        >
          <Avatar
            src={`https://logo.clearbit.com/${job?.company?.name}.com`}
            size={'lg'}
          />

          <Box w='full' pt={{ base: 4, md: 0 }}>
            <Text fontSize={'sm'} fontWeight='bold' color='gray.500'>
              {job?.company?.name}
            </Text>
            <Text fontWeight='bold'>{job?.name}</Text>

            <Wrap mt={2}>
              {job?.locations?.map((ld: any) => {
                return (
                  <WrapItem key={ld?.name}>
                    <Tag
                      colorScheme='green'
                      fontWeight={'bold'}
                      py={2}
                      px={3}
                      textAlign={'center'}
                      d='inline-block'
                    >
                      {' '}
                      📍 {ld?.name}
                    </Tag>
                  </WrapItem>
                );
              })}
              {job?.levels?.map((levelData: any) => {
                return (
                  <WrapItem key={levelData?.name}>
                    <Tag
                      colorScheme='green'
                      fontWeight={'bold'}
                      py={2}
                      px={3}
                      textAlign={'center'}
                      d='inline-block'
                    >
                      {' '}
                      {levelData?.name}
                    </Tag>
                  </WrapItem>
                );
              })}
              {job?.categories?.map((categoryData: any) => {
                return (
                  <WrapItem key={categoryData?.name}>
                    <Tag
                      colorScheme='green'
                      fontWeight={'bold'}
                      alignItems='center'
                      d='inline-block'
                      py={2}
                      px={3}
                    >
                      {' '}
                      {categoryData?.name}
                    </Tag>
                  </WrapItem>
                );
              })}
            </Wrap>
          </Box>
        </HStack>

        <Box w={{ base: '100%', md: '30%' }} my={{ base: 3, md: 'auto' }}>
          <Text
            fontSize={'sm'}
            fontWeight='bold'
            color='gray.500'
            textAlign={{ md: 'center' }}
          >
            {formatDateAgo(job?.publication_date)}
          </Text>
        </Box>

        <HStack
          mt={{ base: 8, md: 0 }}
          w={{ base: '100%', md: '20%' }}
          justifyContent={{ md: 'end' }}
        >
          <Link href={job?.refs?.landing_page} isExternal>
            <Button colorScheme={'green'}>Apply</Button>
          </Link>
          <IconButton
            ml='auto'
            my='auto'
            size='sm'
            variant={'ghost'}
            aria-label='More Options'
            color='gray.500'
            fontSize={'lg'}
            icon={<HiOutlineDotsVertical />}
          />
        </HStack>
      </Flex>

      <Flex px={{ base: 4, md: 8 }}>
        <IconButton
          mx='auto'
          onClick={onToggle}
          mt={3}
          size='sm'
          bg='green.100'
          rounded={'full'}
          color='green.500'
          aria-label='More Options'
          fontSize={'lg'}
          icon={isOpen ? <HiChevronUp /> : <HiChevronDown />}
        />
      </Flex>

      {/* More Info */}
      <Collapse in={isOpen} animateOpacity>
        <Flex
          borderTopWidth={'1px'}
          borderColor='gray.300'
          borderStyle={'dashed'}
          px={{ base: 4, md: 8 }}
          pt={10}
          mt={3}
          w='full'
          flexDir={{ base: 'column', md: 'row' }}
        >
          {/* Content */}
          <Box w={{ base: '100%', md: '70%' }} pr={{ md: 24 }}>
            <Text fontWeight='bold' color='gray.500'>
              {job?.company?.name} is hiring a
            </Text>

            <Text fontWeight='bold' fontSize={'2xl'} color='gray.800'>
              {job?.name}
            </Text>

            <Box mt={6} d={{ base: 'block', md: 'none' }}>
              <DateTags />
            </Box>

            <Text mt={6} dangerouslySetInnerHTML={{ __html: job?.contents }} />
          </Box>

          <Box
            w={{ base: '100%', md: '30%' }}
            d={{ base: 'none', md: 'block' }}
          >
            <Box pos='sticky' top={10}>
              <DateTags />
            </Box>
          </Box>
        </Flex>

        <Flex px={{ base: 4, md: 8 }}>
          <Button
            mx='auto'
            onClick={onToggle}
            mt={6}
            bg='green.50'
            color='green.500'
            aria-label='More Options'
            fontSize={'md'}
          >
            Close
          </Button>
        </Flex>
      </Collapse>
    </Flex>
  );
};

export default SingleJob;
