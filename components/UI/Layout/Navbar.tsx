import {
  chakra,
  Container,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { DASHBOARD_ROUTES } from '../../../utils/routes';
import CustomLink from '../CustomLink';
import Logo from '../Logo';
import NavItem from './NavItem';

const Navbar = () => {
  const { pathname } = useRouter();

  const isActive = pathname.includes('board');

  return (
    <chakra.nav bg='green.500' h='68px' d='flex' alignItems={'center'}>
      <Container maxW='7xl' d='flex'>
        <Logo
          color='white'
          textColor='green.500'
          containerProps={{ my: 'auto', mr: 20 }}
        />

        <HStack spacing={4} d={{ base: 'none', md: 'flex' }}>
          <NavItem label='Analytics' href={DASHBOARD_ROUTES.ANALYTICS} />
          <NavItem label='Goals' href={DASHBOARD_ROUTES.GOALS} />
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
                <MenuItem fontSize='15px'>Job Search 2022</MenuItem>
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
          <NavItem label='Browse Jobs' href={DASHBOARD_ROUTES.JOBS} />
          <NavItem label='Contacts' href={DASHBOARD_ROUTES.CONTACTS} />
        </HStack>
      </Container>
    </chakra.nav>
  );
};

export default Navbar;
