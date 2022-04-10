import { Button, Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import FormInput from '../UI/Form/FormInput';
import RangeInput from '../UI/Form/RangeInput';

const CreateGoal = () => {
  return (
    <>
      <VStack align='start' w='100%' spacing={8}>
        <RangeInput />

        <SimpleGrid columns={{ base: 1, md: 2 }} w='100%' spacing={8}>
          <FormInput
            label='Level'
            type='string'
            for='level'
            inputProps={{
              placeholder: 'Senior',
            }}
            listLabel='levels'
            listData={[
              'CEO',
              'CTO',
              'CPO',
              'Principal',
              'Senior',
              'Mid',
              'Junior',
            ]}
          />

          <FormInput
            label='Role'
            type='string'
            for='role'
            inputProps={{
              placeholder: 'Frontend Developer',
            }}
            listLabel='roles'
            listData={[
              'Marketer',
              'Fullstack Developer',
              'Frontend Developer',
              'Backend Developer',
            ]}
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} w='100%' spacing={8}>
          <FormInput
            label='Job Type'
            type='string'
            for='job_type'
            inputProps={{
              placeholder: 'Remote',
            }}
            listLabel='job_types'
            listData={[
              'Remote',
              'Remote Full-Time',
              'Remote Part-Time',
              'Fulltime',
              'PartTime',
            ]}
          />

          <FormInput label='Country' type='string' for='country' />
        </SimpleGrid>
      </VStack>

      <Flex justifyContent={'end'} mt={16}>
        <Button variant={'ghost'}>Cancel</Button>
        <Button ml={2} colorScheme={'green'}>
          Create goal
        </Button>
      </Flex>
    </>
  );
};

export default CreateGoal;
