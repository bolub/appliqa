import {
  Icon,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";
import React, { ChangeEvent, FC, useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useDebounceValue } from "usehooks-ts";

type SearchInputProps = {
  onChange: (value: string | number | readonly string[]) => void;
} & InputProps;

type Props = {
  containerProps?: InputGroupProps;
} & SearchInputProps;

export const DebouncedSearchInput: FC<Props> = ({
  placeholder = "Search...",
  containerProps,
  onChange,
  ...props
}) => {
  const [debouncedValue, setValue] = useDebounceValue(props.value || "", 500);

  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current(debouncedValue);
  }, [debouncedValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <InputGroup {...containerProps}>
      <InputLeftElement
        pointerEvents="none"
        children={
          <Icon as={HiOutlineSearch} color="gray.400" fontSize={"xl"} mt={1} />
        }
      />
      <Input
        type="search"
        h="44px"
        placeholder={placeholder}
        borderColor={"gray.300"}
        fontWeight="semibold"
        _placeholder={{
          color: "gray.400",
          fontWeight: "bold",
        }}
        value={props.value}
        onChange={handleInputChange}
        {...props}
      />
    </InputGroup>
  );
};
