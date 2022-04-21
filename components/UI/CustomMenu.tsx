import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  MenuButtonProps,
  MenuListProps,
} from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  buttonProps: MenuButtonProps;
  listProps: MenuListProps;
}

const CustomMenu: FC<Props> = () => {
  return (
    <Menu>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CustomMenu;
