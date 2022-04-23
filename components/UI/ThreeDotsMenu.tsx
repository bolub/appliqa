import { IconButton } from '@chakra-ui/react';
import React, { FC } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';

const ThreeDotsMenu: FC = () => {
  return (
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
  );
};

export default ThreeDotsMenu;
