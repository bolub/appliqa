import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuButtonProps,
  MenuListProps,
  MenuItemProps,
} from '@chakra-ui/react';
import { FC, ReactComponentElement } from 'react';

interface itemProps {
  title: any;
  actions: MenuItemProps;
}

interface Props {
  buttonProps: MenuButtonProps;
  listProps: MenuListProps;
  items: itemProps[];
}

const CustomMenu: FC<Props> = ({ buttonProps, listProps, children, items }) => {
  return (
    <Menu autoSelect={false}>
      <MenuButton {...buttonProps}>{children}</MenuButton>
      <MenuList {...listProps}>
        {items?.map((item: any) => {
          return <MenuItem {...item.actions}>{item.title}</MenuItem>;
        })}
      </MenuList>
    </Menu>
  );
};

export default CustomMenu;
