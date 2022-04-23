import React, { FC } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Text,
} from '@chakra-ui/react';
import Construction from '../../../UI/Construction';
import JobDetails from './JobDetails';

const JobModalInfo: FC<any> = ({ data }) => {
  const TabHeader = ({ emoji, title }: { emoji: string; title: string }) => {
    return (
      <HStack>
        <Text>{emoji}</Text>
        <Text fontSize={'15px'} fontWeight='bold'>
          {title}
        </Text>
      </HStack>
    );
  };

  return (
    <Tabs mt={6}>
      <TabList>
        <Tab
          color='gray.800'
          _selected={{ color: 'green.500', borderColor: 'green.500' }}
          mr={5}
        >
          <TabHeader emoji='ℹ️' title='Job Details' />
        </Tab>
        <Tab
          color='gray.800'
          _selected={{ color: 'green.500', borderColor: 'green.500' }}
          mr={5}
        >
          <TabHeader emoji='📋' title='Interview' />
        </Tab>
        <Tab
          color='gray.800'
          _selected={{ color: 'green.500', borderColor: 'green.500' }}
          mr={5}
        >
          <TabHeader emoji='🗒️' title='Tasks' />
        </Tab>
        <Tab
          color='gray.800'
          _selected={{ color: 'green.500', borderColor: 'green.500' }}
          mr={5}
        >
          <TabHeader emoji='🗒️' title='Note' />
        </Tab>
        <Tab
          color='gray.800'
          _selected={{ color: 'green.500', borderColor: 'green.500' }}
          mr={5}
        >
          <TabHeader emoji='🤝' title='Tasks' />
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <JobDetails data={data} />
        </TabPanel>
        <TabPanel>
          <Construction height='30vh' />
        </TabPanel>
        <TabPanel>
          <Construction height='30vh' />
        </TabPanel>
        <TabPanel>
          <Construction height='30vh' />
        </TabPanel>
        <TabPanel>
          <Construction height='30vh' />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default JobModalInfo;