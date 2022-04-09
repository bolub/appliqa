import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputProps,
  FormControlProps,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

interface FormInputProps {
  label: string;
  for: string;
  type: string;
  helperText?: string;
  inputProps?: InputProps;
  formControlProps?: FormControlProps;
  rightElement?: any;
}

const FormInput: FC<FormInputProps> = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl {...props.formControlProps}>
      <FormLabel
        fontWeight={'bold'}
        fontSize='sm'
        color='gray.500'
        htmlFor={props.for}
        mb={1}
      >
        {props.label}
      </FormLabel>

      <InputGroup size='md'>
        <Input
          h='48px'
          borderColor={'gray.300'}
          fontWeight='semibold'
          _placeholder={{
            color: 'gray.400',
          }}
          id={props.for}
          type={!show ? props.type : 'text'}
          {...props.inputProps}
        />

        {(props.rightElement || props.type === 'password') && (
          <InputRightElement>
            {props.rightElement}

            {props.type === 'password' && (
              <Button
                size='sm'
                mt={2}
                mr={2}
                p={0}
                fontSize='lg'
                variant={'ghost'}
                onClick={handleClick}
                color='gray.400'
              >
                {show ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </Button>
            )}
          </InputRightElement>
        )}
      </InputGroup>

      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
};

export default FormInput;
