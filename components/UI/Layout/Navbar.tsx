import { chakra, Container, HStack } from '@chakra-ui/react';
import { DASHBOARD_ROUTES } from '../../../utils/routes';
import Logo from '../Logo';
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

        <HStack spacing={4}>
          <NavItem label='Analytics' href={DASHBOARD_ROUTES.ANALYTICS} />
          <NavItem label='Goals' href={DASHBOARD_ROUTES.GOALS} />
          <NavItem label='Boards' href={DASHBOARD_ROUTES.BOARDS} />
          <NavItem label='Browse Jobs' href={DASHBOARD_ROUTES.JOBS} />
          <NavItem label='Contacts' href={DASHBOARD_ROUTES.CONTACTS} />
        </HStack>
      </Container>
    </chakra.nav>
  );
};

export default Navbar;
