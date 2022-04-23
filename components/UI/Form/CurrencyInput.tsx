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
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

interface CurrencyInputProps {
  for: string;
  inputProps?: InputProps;
  formControlProps?: FormControlProps;
  groupProps?: InputGroupProps;
  getChosenCurrency?: any;
  currencyValue?: string;
  label?: string;
}

const CurrencyInput: FC<CurrencyInputProps> = (props) => {
  const [chosenCurrency, setChosenCurrency] = useState<string | undefined>(
    props.currencyValue
  );

  return (
    <FormControl {...props.formControlProps}>
      {props.label && (
        <FormLabel
          fontWeight={'bold'}
          fontSize='sm'
          color='gray.500'
          htmlFor={props.for}
          mb={1}
        >
          {props.label}
        </FormLabel>
      )}

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
                  if (!props.getChosenCurrency) return;
                  props.getChosenCurrency('£');
                }}
              >
                £
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setChosenCurrency('$');
                  if (!props.getChosenCurrency) return;
                  props.getChosenCurrency('$');
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
          type='number'
          {...props.inputProps}
        />
      </InputGroup>
    </FormControl>
  );
};

export default CurrencyInput;
