import Select from 'react-select';
import { FormLabel, VStack } from '@chakra-ui/react';
import { Options } from '../../../utils/GeneralProps';

interface selectProps {
  defaultValue?: string;
  value?: any;
  isMulti?: boolean;
  options?: any;
  placeholder?: string;
  onChange?: any;
  label?: string;
  onBlur?: () => void;
}

const SearchableSelect = ({
  onChange,
  options,
  isMulti,
  value,
  defaultValue,
  placeholder,
  label,
  onBlur = () => {},
}: selectProps) => {
  const customStyles = {
    input: (provided: any) => ({
      ...provided,
      height: '40px',
      fontWeight: 'semibold',
      width: '100%',
    }),

    control: (provided: any) => ({
      ...provided,
      borderColor: '#D1D5DB',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      outline: 0,
      paddingLeft: '8px',
      width: '100%',
    }),

    container: (provided: any) => ({
      ...provided,
      height: '100%',
      outline: 0,
      fontSize: '1rem',
      paddingLeft: 0,
      width: '100%',
    }),

    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
      outline: 0,
    }),

    ValueContainer: (provided: any) => ({
      ...provided,
      paddingLeft: 0,
      outline: 0,
    }),

    placeholder: (provided: any) => ({
      ...provided,
      fontWeight: 'semibold',
      color: '#9CA3AF',
    }),
  };

  return (
    <VStack align={'start'} w='100%' spacing={-1}>
      <FormLabel fontWeight={'bold'} fontSize='sm' color='gray.500'>
        {label}
      </FormLabel>
      <Select
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        options={options}
        defaultValue={defaultValue}
        styles={customStyles}
        isMulti={isMulti}
        onBlur={onBlur}
      />
    </VStack>
  );
};

export default SearchableSelect;
