import React from 'react';
import { useQuery } from 'react-query';
import { fetchAllBoards } from '../../../API/boards';
import {
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Text,
} from '@chakra-ui/react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { DASHBOARD_ROUTES } from '../../../utils/routes';
import CustomLink from '../CustomLink';
import { useRouter } from 'next/router';

const AllBoards = () => {
  const { pathname } = useRouter();

  const isActive = pathname.includes('board');
  const { data } = useQuery('all-boards', fetchAllBoards);

  return (
    <Menu autoSelect={false}>
      <MenuButton
        fontWeight='extrabold'
        color='white'
        fontSize='sm'
        borderRadius='4px'
        px={4}
        py={2}
        bg={isActive ? 'green.700' : ''}
        _hover={{
          bg: 'green.700',
        }}
      >
        <HStack>
          <Text>Boards</Text>
          <HiOutlineChevronDown />
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuGroup title='Boards'>
          {data?.map((bd: any) => {
            return (
              <CustomLink key={bd.id} href={`/boards/${bd.id}`}>
                <MenuItem fontSize='15px' key={bd?.id}>
                  {bd?.attributes?.title}
                </MenuItem>
              </CustomLink>
            );
          })}
        </MenuGroup>
        <MenuDivider />

        <MenuGroup>
          <CustomLink href={DASHBOARD_ROUTES.BOARDS}>
            <MenuItem
              w='full'
              color='green.500'
              fontWeight={'extrabold'}
              fontSize='sm'
            >
              View All Boards
            </MenuItem>
          </CustomLink>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default AllBoards;
