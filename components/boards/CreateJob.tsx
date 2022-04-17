import { Box, Button, Flex, SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import { DUMMY_STAGES } from '../../utils/data';
import FormInput from '../UI/Form/FormInput';
import RangeInput from '../UI/Form/RangeInput';
import SearchableSelect from '../UI/Form/SearchableSelect';

const CreateJob = () => {
  return (
    <>
      <VStack align='start' w='100%' spacing={6}>
        <SimpleGrid columns={{ base: 1, md: 2 }} w='100%' spacing={8}>
          <FormInput
            label='Post url'
            type='url'
            for='post_url'
            inputProps={{
              placeholder: 'https://abstergo.com/frontend',
            }}
          />

          <FormInput
            label='Company Name'
            type='text'
            for='company_name'
            inputProps={{
              placeholder: 'Abstergo',
            }}
          />
        </SimpleGrid>

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

        <Box w='100%'>
          <SimpleGrid
            mt={4}
            borderTopWidth={'1px'}
            pt={10}
            columns={{ base: 1, md: 2 }}
            w='100%'
            spacing={8}
          >
            <SearchableSelect label='Stage' options={DUMMY_STAGES} />
            <SearchableSelect
              label='Board'
              options={[{ label: 'Job Search 2022', value: 'js2' }]}
            />
          </SimpleGrid>
        </Box>
      </VStack>

      <Flex justifyContent={'end'} mt={16}>
        <Button variant={'ghost'}>Cancel</Button>
        <Button ml={2} colorScheme={'green'}>
          Add Job
        </Button>
      </Flex>
    </>
  );
};

export default CreateJob;
