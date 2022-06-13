import {
  Container,
  Heading,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useQuery } from 'react-query';
import { fetchAllBoards } from '../API/boards';
import AnalyticsCard from '../components/analytics/AnalyticsCard';
import OverviewDuration from '../components/analytics/OverviewDuration';
import UpcomingTasksAndInterviews from '../components/analytics/UpcomingTasksAndInterviews';
import CustomSeo from '../components/UI/CustomSeo';
import Loader from '../components/UI/Loader';
import AnalyticsLoader from '../components/UI/Loaders/AnalyticsLoader';

const Analytics = () => {
  const [currentBoard, setCurrentBoard] = useState<any>();
  const [allBoards, setAllBoards] = useState<any>();

  const { status } = useQuery('all-boards', fetchAllBoards, {
    onSuccess: (data) => {
      setAllBoards(data);
      if (data.length > 0) {
        setCurrentBoard(data[0]);
      }
    },
  });

  const getAnalytics = () => {
    const appliedJobs = currentBoard?.attributes?.jobs.data?.filter(
      (job: any) => job?.attributes?.stage === 'stage-2'
    );
    const interviewdJobs = currentBoard?.attributes?.jobs.data?.filter(
      (job: any) => job?.attributes?.stage === 'stage-3'
    );
    const offeredJobs = currentBoard?.attributes?.jobs.data?.filter(
      (job: any) => job?.attributes?.stage === 'stage-4'
    );

    return {
      jobsSaved: currentBoard?.attributes?.jobs?.data?.length ?? 0,
      applications: appliedJobs?.length ?? 0,
      interviews: interviewdJobs?.length ?? 0,
      offers: offeredJobs?.length ?? 0,
    };
  };

  const router = useRouter();

  return (
    <Container maxW='7xl' pt={{ base: 12 }}>
      <CustomSeo title='Analytics' />

      <HStack>
        <Heading as='h1' flex={1} fontWeight={'black'} fontSize='2xl'>
          Analytics
        </Heading>

        <Menu>
          <MenuButton as={Button} rightIcon={<HiOutlineChevronDown />}>
            {currentBoard?.attributes?.title}
          </MenuButton>
          <MenuList>
            {allBoards?.map((bd: any) => {
              return (
                <MenuItem
                  fontSize='15px'
                  key={bd?.id}
                  onClick={() => {
                    setCurrentBoard(bd);
                  }}
                >
                  {bd?.attributes?.title}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </HStack>

      <Loader
        status={status}
        loader={<AnalyticsLoader />}
        length={allBoards?.length}
        emptyTextTitle='No boards found'
        emptyText='Get started by creating your first job board'
        emptyActionText='Create Board'
        emptyAction={() => {
          router.push('/boards?new=true');
        }}
      >
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
          mt={{ base: 5, md: 6 }}
          spacing={6}
        >
          <AnalyticsCard
            title='Jobs Saved'
            emoji='💼'
            value={getAnalytics().jobsSaved}
          />
          <AnalyticsCard
            title='Applications'
            emoji='✍'
            value={getAnalytics().applications}
          />
          <AnalyticsCard
            title='Interviews'
            emoji='🤓'
            value={getAnalytics().interviews}
          />
          <AnalyticsCard
            title='Offers'
            emoji='💰'
            value={getAnalytics().offers}
          />
        </SimpleGrid>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          mt={{ base: 5, md: 10 }}
          spacing={6}
        >
          <OverviewDuration {...getAnalytics()} />
          <UpcomingTasksAndInterviews boardId={currentBoard?.id} />
        </SimpleGrid>
      </Loader>
    </Container>
  );
};

export default Analytics;
