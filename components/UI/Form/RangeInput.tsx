import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  VStack,
  FormLabel,
  Flex,
} from '@chakra-ui/react';
import CurrencyInput from './CurrencyInput';

const RangeInput = () => {
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
        defaultValue={[10, 30]}
        colorScheme='green'
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
        />

        <CurrencyInput
          for='min'
          groupProps={{
            maxW: '150px',
          }}
        />
      </Flex>
    </VStack>
  );
};

export default RangeInput;
