import React, { FC, useEffect } from 'react';
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
import Interview from './Interview/index';
import Tasks from './Tasks';
import Notes from './Notes';
import { useRouter } from 'next/router';

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

  const { query } = useRouter();

  const [defaultTabIndex, setDefaultTabIndex] = React.useState(0);

  useEffect(() => {
    if (query?.tab === 'task') {
      setDefaultTabIndex(2);
    }

    if (query?.tab === 'interview') {
      setDefaultTabIndex(1);
    }
  }, [query?.tab]);

  return (
    <Tabs
      mt={6}
      index={defaultTabIndex}
      onChange={(index) => {
        setDefaultTabIndex(Number(index));
      }}
    >
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
          <TabHeader emoji='🗒️' title='Notes' />
        </Tab>
        <Tab
          color='gray.800'
          _selected={{ color: 'green.500', borderColor: 'green.500' }}
          mr={5}
        >
          <TabHeader emoji='🤝' title='Contacts' />
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <JobDetails data={data} />
        </TabPanel>
        <TabPanel>
          <Interview jobId={data?.id} />
        </TabPanel>
        <TabPanel>
          <Tasks jobId={data?.id} />
        </TabPanel>
        <TabPanel>
          <Notes jobId={data?.id} />
        </TabPanel>
        <TabPanel>
          <Construction height='50vh' maxW='350px' />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default JobModalInfo;
