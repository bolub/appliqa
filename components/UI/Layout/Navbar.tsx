import {
  chakra,
  Container,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { HiUserCircle } from 'react-icons/hi';
import { logout } from '../../../utils/functions';
import { AUTH_ROUTES, DASHBOARD_ROUTES } from '../../../utils/routes';
import CustomLink from '../CustomLink';
import Logo from '../Logo';
import AllBoards from './AllBoards';
import NavItem from './NavItem';

const Navbar = () => {
  return (
    <chakra.nav bg='green.500' h='68px' d='flex' alignItems={'center'}>
      <Container maxW='7xl' d='flex'>
        <Logo
          color='white'
          textColor='green.500'
          containerProps={{ my: 'auto', mr: 20 }}
        />

        <HStack spacing={4} d={{ base: 'none', md: 'flex' }}>
          <NavItem
            className='my-first-step'
            label='Analytics'
            href={DASHBOARD_ROUTES.ANALYTICS}
          />
          <NavItem
            className='goals'
            label='Goals'
            href={DASHBOARD_ROUTES.GOALS}
          />
          <AllBoards />
          <NavItem
            className='browse-jobs'
            label='Browse Jobs (beta)'
            href={DASHBOARD_ROUTES.JOBS}
          />
          <NavItem
            className='contacts'
            label='Contacts'
            href={DASHBOARD_ROUTES.CONTACTS}
          />
        </HStack>

        <Menu autoSelect={false}>
          <MenuButton
            ml='auto'
            fontSize={'3xl'}
            aria-label='profile'
            color='white'
          >
            <HiUserCircle />
          </MenuButton>
          <MenuList>
            <CustomLink href={AUTH_ROUTES.LOGIN}>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </CustomLink>
          </MenuList>
        </Menu>
      </Container>
    </chakra.nav>
  );
};

export default Navbar;
