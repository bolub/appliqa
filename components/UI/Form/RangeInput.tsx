import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  VStack,
  FormLabel,
  Flex,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import CurrencyInput from './CurrencyInput';

interface RangeInputProps {
  onChange?: any;
  getChosenCurrency?: any;
}

const RangeInput: FC<RangeInputProps> = ({ onChange, getChosenCurrency }) => {
  const [firstValue, setFirstValue] = useState<number>(500);
  const [secondValue, setSecondValue] = useState<number>(500000);
  const [currencyValue, setCurrencyValue] = useState<string>('$');

  return (
    <VStack w='full' align='start' spacing={2}>
      <FormLabel
        fontWeight={'bold'}
        fontSize='sm'
        color='gray.500'
        htmlFor='Range Slider'
        mb={1}
      >
        Salary Range
      </FormLabel>

      <RangeSlider
        aria-label={['min', 'max']}
        value={[firstValue, secondValue]}
        colorScheme='green'
        onChange={(values) => {
          onChange(values);
          setFirstValue(values[0]);
          setSecondValue(values[1]);
        }}
        min={500}
        max={1000000}
        step={1000}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb
          borderWidth={'3px'}
          borderColor='green.500'
          boxSize={6}
          index={0}
        />
        <RangeSliderThumb
          borderWidth={'3px'}
          borderColor='green.500'
          boxSize={6}
          index={1}
        />
      </RangeSlider>

      <Flex w='100%' justifyContent='space-between'>
        <CurrencyInput
          for='min'
          groupProps={{
            maxW: '150px',
          }}
          inputProps={{
            value: firstValue,
            onChange: (e) => {
              onChange([Number(e.target.value), secondValue]);
              setFirstValue(Number(e.target.value));
            },
          }}
          getChosenCurrency={(value: string) => {
            getChosenCurrency(value);
            setCurrencyValue(value);
          }}
          currencyValue={currencyValue}
        />

        <CurrencyInput
          for='min'
          groupProps={{
            maxW: '150px',
            ml: 'auto',
          }}
          inputProps={{
            value: secondValue,
            onChange: (e) => {
              onChange([firstValue, Number(e.target.value)]);
              setSecondValue(Number(e.target.value));
            },
          }}
          getChosenCurrency={(value: string) => {
            getChosenCurrency(value);
            setCurrencyValue(value);
          }}
          currencyValue={currencyValue}
        />
      </Flex>
    </VStack>
  );
};

export default RangeInput;
