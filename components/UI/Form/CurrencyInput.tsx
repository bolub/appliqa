import {
  FormControlProps,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  Flex,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

interface CurrencyInputProps {
  for: string;
  inputProps?: InputProps;
  formControlProps?: FormControlProps;
  groupProps?: InputGroupProps;
}

const CurrencyInput: FC<CurrencyInputProps> = (props) => {
  const [chosenCurrency, setChosenCurrency] = useState('$');

  return (
    <InputGroup size='md' {...props.groupProps}>
      <InputLeftElement mt={1} ml={4}>
        <Menu autoSelect={false}>
          <MenuButton
            as={Button}
            variant='unstyled'
            fontWeight={'semibold'}
            fontSize='15px'
            color='gray.500'
            _focus={{
              outline: 'none',
            }}
          >
            <Flex>
              <Text my='auto' mr={1}>
                {chosenCurrency}
              </Text>

              <Text my='auto'>
                <HiOutlineChevronDown />
              </Text>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                setChosenCurrency('£');
              }}
            >
              £
            </MenuItem>
            <MenuItem
              onClick={() => {
                setChosenCurrency('$');
              }}
            >
              $
            </MenuItem>
          </MenuList>
        </Menu>
      </InputLeftElement>

      <Input
        pl={12}
        h='48px'
        borderColor={'gray.300'}
        borderRadius='8px'
        fontWeight='semibold'
        _placeholder={{
          color: 'gray.400',
        }}
        id={props.for}
        type='text'
        {...props.inputProps}
      />
    </InputGroup>
  );
};

export default CurrencyInput;
