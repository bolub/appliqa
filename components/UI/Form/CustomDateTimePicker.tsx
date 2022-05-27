import React, { FC } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

// pick a date util library
import {
  Box,
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

import 'react-datepicker/dist/react-datepicker.css';

interface pickerProps {
  labelIcon?: any;
  label?: string;
  onChange?: any;
  generalProps?: ReactDatePickerProps;
  selected?: Date;
  formControlProps?: FormControlProps;
}

const CustomDateTimePicker: FC<pickerProps> = ({
  labelIcon,
  label,
  selected,
  onChange = () => {},
  formControlProps,
}) => {
  return (
    <VStack align={'start'} spacing={0}>
      <FormControl {...formControlProps}>
        <FormLabel
          fontWeight={'bold'}
          fontSize='sm'
          color='gray.500'
          htmlFor='date'
          mb={1}
          d='flex'
          w='100%'
        >
          <Text as='span' my='auto'>
            {label}
          </Text>

          {labelIcon && (
            <Box ml='auto' my='auto'>
              {labelIcon}
            </Box>
          )}
        </FormLabel>
        <DatePicker
          selected={selected}
          onChange={onChange}
          customInput={
            <Input
              bg='white'
              h='48px'
              borderColor={'gray.300'}
              fontWeight='semibold'
              _placeholder={{
                color: 'gray.400',
              }}
            />
          }
          timeInputLabel='Time:'
          dateFormat='MM/dd/yyyy h:mm aa'
          showTimeInput
          shouldCloseOnSelect={false}
          showMonthDropdown
        />
      </FormControl>
    </VStack>
  );
};

export default CustomDateTimePicker;
