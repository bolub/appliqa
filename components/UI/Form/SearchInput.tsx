import {
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
  Text,
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
          <Text color='gray.400' fontSize={'xl'} mt={1}>
            <HiOutlineSearch />
          </Text>
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
