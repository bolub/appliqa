import React, { FC, ReactNode } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

// pick a date util library
import {
  Box,
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
  InputProps,
  Text,
  VStack,
} from "@chakra-ui/react";

import "react-datepicker/dist/react-datepicker.css";

interface pickerProps {
  labelIcon?: ReactNode;
  label?: string;
  onChange?: any;
  generalProps?: ReactDatePickerProps;
  selected?: Date;
  formControlProps?: FormControlProps;
  inputProps?: InputProps;
}

const CustomDateTimePickerStripped: FC<pickerProps> = ({
  labelIcon,
  label,
  selected,
  onChange = () => {},
  formControlProps,
  inputProps,
}) => {
  return (
    <VStack align={"start"} spacing={0}>
      <FormControl {...formControlProps}>
        <FormLabel
          fontWeight={"bold"}
          fontSize="sm"
          color="gray.500"
          htmlFor="date"
          mb={1}
          display="flex"
          w="100%"
        >
          <Text as="span" my="auto">
            {label}
          </Text>

          {labelIcon && (
            <Box ml="auto" my="auto">
              {labelIcon}
            </Box>
          )}
        </FormLabel>

        {/* @ts-ignore */}
        <DatePicker
          selected={selected}
          onChange={onChange}
          customInput={<Input variant={"unstyled"} {...inputProps} />}
          timeInputLabel="Time:"
          dateFormat="do MMM h:mm aa"
          showTimeInput
          shouldCloseOnSelect={false}
          showMonthDropdown
        />
      </FormControl>
    </VStack>
  );
};

export default CustomDateTimePickerStripped;
