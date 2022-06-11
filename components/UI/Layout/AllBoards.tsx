import React, { FC } from 'react';
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
  Box,
} from '@chakra-ui/react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { DASHBOARD_ROUTES } from '../../../utils/routes';
import CustomLink from '../CustomLink';
import { useRouter } from 'next/router';

const AllBoards: FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const { pathname } = useRouter();

  const isActive = pathname.includes('board');
  const { data = [] } = useQuery('all-boards', fetchAllBoards);

  const isDesktopActive = !isMobile && isActive;

  return (
    <Menu autoSelect={false}>
      <Box
        fontWeight='extrabold'
        color={isMobile ? '' : 'white'}
        fontSize='sm'
        borderRadius='4px'
        px={isMobile ? 0 : 4}
        py={isMobile ? 0 : 2}
        bg={isDesktopActive ? 'green.700' : ''}
        className='boards'
      >
        <HStack>
          <CustomLink href={data[0]?.id ? `/boards/${data[0]?.id}` : '/boards'}>
            Boards
          </CustomLink>

          <MenuButton>
            <HiOutlineChevronDown />
          </MenuButton>
        </HStack>
      </Box>

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
