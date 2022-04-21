import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuButtonProps,
  MenuListProps,
} from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  buttonProps: MenuButtonProps;
  listProps: MenuListProps;
}

const CustomMenu: FC<Props> = ({ buttonProps, listProps }) => {
  return (
    <Menu>
      <MenuButton {...buttonProps}>Actions</MenuButton>
      <MenuList {...listProps}>
        <MenuItem>Download</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CustomMenu;
