import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchAllJobs } from '../API/jobs';
import SingleJob from '../components/jobs/SingleJob';
import SearchInput from '../components/UI/Form/SearchInput';
import Loader from '../components/UI/Loader';

export interface GoalProps {
  id: string | number;
  attributes: {
    level: string;
    role: string;
    job_type: string;
    country: string;
    currency: string;
    minimum_salary_range: string;
    maximum_salary_range: string;
  };
}

const BrowseJobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const [page, setPage] = useState(1);

  const { status, isPreviousData } = useQuery(
    ['jobs', page],
    () => fetchAllJobs(page),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setAllJobs(data.results);
        setOriginalData(data.results);
      },
    }
  );

  const searchGoals = (value: string) => {
    if (!value || value === '') {
      setAllJobs(originalData);
      return;
    }

    const filteredGoals = [...allJobs].filter((goal: any) => {
      return `${goal.name}`.includes(value);
    });

    setAllJobs(filteredGoals);
  };

  // function shuffle(array: []) {
  //   let currentIndex = array.length,
  //     randomIndex;

  //   // While there remain elements to shuffle.
  //   while (currentIndex != 0) {
  //     // Pick a remaining element.
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     // And swap it with the current element.
  //     [array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex],
  //       array[currentIndex],
  //     ];
  //   }

  //   return array;
  // }

  return (
    <Container maxW='7xl' py={{ base: 12, md: 20 }}>
      <Heading as='h1' fontWeight={'black'} fontSize='2xl'>
        Browse Jobs
      </Heading>
      <Flex flexDir={{ base: 'column', md: 'row' }} mt={{ base: 5, md: 10 }}>
        <SearchInput
          containerProps={{
            maxW: '400px',
            my: 'auto',
          }}
          inputProps={{
            onChange: (e) => {
              searchGoals(e.target.value);
            },
          }}
        />
      </Flex>
      <Loader status={status}>
        <VStack align={'start'} w='full' spacing={10} mt={10}>
          {allJobs?.map((job: any, index) => {
            return <SingleJob key={index} job={job} />;
          })}

          <HStack alignSelf={'end'} spacing={4}>
            <Button
              onClick={() => {
                window.scrollTo({ top: 0 });
                setPage((old) => Math.max(old - 1, 0));
              }}
              disabled={page === 1}
              variant={'outline'}
            >
              Previous
            </Button>

            <Button
              variant={'outline'}
              onClick={() => {
                window.scrollTo({ top: 0 });
                if (!isPreviousData) {
                  setPage((old) => old + 1);
                }
              }}
              // Disable the Next Page button until we know a next page is available
              disabled={isPreviousData}
            >
              Next
            </Button>
          </HStack>
        </VStack>
      </Loader>
    </Container>
  );
};

export default BrowseJobs;
