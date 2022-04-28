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
import { getCurrencySymbol } from '../../../utils/functions';
import CurrencyInput from './CurrencyInput';

interface RangeInputProps {
  onChange?: any;
  getChosenCurrency?: any;
  defaultFirstValue?: number;
  defaultSecondValue?: number;
  defaultCurrencyValue?: string;
}

const RangeInput: FC<RangeInputProps> = ({
  onChange,
  getChosenCurrency,
  defaultFirstValue = 500,
  defaultSecondValue = 500000,
  defaultCurrencyValue = '',
}) => {
  const [firstValue, setFirstValue] = useState<number>(defaultFirstValue);
  const [secondValue, setSecondValue] = useState<number>(defaultSecondValue);
  const [currencyValue, setCurrencyValue] = useState<string | undefined>(
    getCurrencySymbol(defaultCurrencyValue)
  );
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
          setChosenCurrency={setCurrencyValue}
          currencyValue={currencyValue}
        />

        <CurrencyInput
          for='max'
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
          setChosenCurrency={setCurrencyValue}
          currencyValue={currencyValue}
        />
      </Flex>
    </VStack>
  );
};

export default RangeInput;
