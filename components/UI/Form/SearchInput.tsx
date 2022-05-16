import {
  Icon,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

interface Props {
  placeholder?: string;
  containerProps?: InputGroupProps;
  inputProps?: InputProps;
}

const SearchInput: FC<Props> = ({
  placeholder = 'Search...',
  containerProps,
  inputProps,
}) => {
  return (
    <InputGroup {...containerProps}>
      <InputLeftElement
        pointerEvents='none'
        // eslint-disable-next-line
        children={
          <Icon as={HiOutlineSearch} color='gray.400' fontSize={'xl'} mt={1} />
        }
      />
      <Input
        type='search'
        h='44px'
        placeholder={placeholder}
        borderColor={'gray.300'}
        fontWeight='semibold'
        _placeholder={{
          color: 'gray.400',
          fontWeight: 'bold',
        }}
        {...inputProps}
      />
    </InputGroup>
  );
};

export default SearchInput;
