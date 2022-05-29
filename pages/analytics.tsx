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
import React, { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useQuery } from 'react-query';
import { fetchAllBoards } from '../API/boards';
import AnalyticsCard from '../components/analytics/AnalyticsCard';
import OverviewDuration from '../components/analytics/OverviewDuration';
import UpcomingTasksAndInterviews from '../components/analytics/UpcomingTasksAndInterviews';
import { formatDataForBoard } from '../utils/functions';

const Analytics = () => {
  const [currentBoard, setCurrentBoard] = useState<any>();
  const [allBoards, setAllBoards] = useState<any>();

  useQuery('all-boards', fetchAllBoards, {
    onSuccess: (data) => {
      // const mappedboards = data?.map((bd: any) => {
      //   return {
      //     title: bd?.attributes?.title,
      //     value: bd?.id,
      //   };
      // });

      setAllBoards(data);

      if (data.length > 0) {
        setCurrentBoard(data[0]);
      }
    },
  });

  // const { data: singleBoard, status: singleBoardStatus } = useQuery(
  //   ['board', allBoards[0]?.id],
  //   () => fetchSingleBoard(allBoards[0]?.id),
  //   {
  //     enabled: allBoards.length > 0,
  //   }
  // );

  const getAnalytics = () => {
    const boardData = formatDataForBoard(currentBoard);

    return {
      jobsSaved: currentBoard?.attributes?.jobs?.data?.length ?? 0,
      applications: boardData?.columns?.['stage-2']?.taskIds?.length ?? 0,
      interviews: boardData?.columns?.['stage-3']?.taskIds?.length ?? 0,
      offers: boardData?.columns?.['stage-4']?.taskIds?.length ?? 0,
    };
  };
  return (
    <Container maxW='7xl' pt={{ base: 12 }}>
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
                  // onClick={() => {
                  //   setCurrentBoard(bd);
                  // }}
                >
                  {bd?.attributes?.title}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </HStack>

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
    </Container>
  );
};

export default Analytics;
