import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

interface Props {
  title: string;
  company: string;
}

const ModalTitleComponent: FC<Props> = ({ title, company }) => {
  return (
    <Box>
      <ButtonGroup size='sm' isAttached mb={8}>
        <Button borderRadius='md' mr='-px' fontSize={'sm'} h='40px' px={5}>
          Wishlist
        </Button>
        <IconButton
          h='40px'
          borderRadius='md'
          aria-label='Add to friends'
          borderLeftWidth={'1px'}
          icon={<HiOutlineChevronDown />}
        />
      </ButtonGroup>

      <HStack flexDir={{ base: 'column', md: 'row' }} spacing={4} my='auto'>
        <Avatar src={`https://logo.clearbit.com/${company}.com`} size={'lg'} />

        <VStack align='start' spacing={0} w='full'>
          <Text fontSize={'xl'} fontWeight='black' color='gray.800'>
            {title}
          </Text>

          <Flex>
            <Text my='auto' fontWeight='bold' color='gray.500' fontSize={'md'}>
              {company}
            </Text>

            <Text my='auto' fontSize={'xs'} color='gray.500' mx={1}>
              &bull;
            </Text>

            <Text my='auto' fontWeight='bold' color='gray.500' fontSize={'sm'}>
              5 days ago
            </Text>
          </Flex>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ModalTitleComponent;
