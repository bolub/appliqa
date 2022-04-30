import { Container, Flex, Heading, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchAllJobs } from '../API/jobs';
import SingleJob from '../components/jobs/SingleJob';
import SearchInput from '../components/UI/Form/SearchInput';
import Loader from '../components/UI/Loader';
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
  PaginationSeparator,
} from '@ajna/pagination';

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
  const [pageCount, setPageCount] = useState(1);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: pageCount,
    limits: {
      outer: 3,
      inner: 5,
    },
    initialState: { currentPage: 1 },
  });
  const { status } = useQuery(
    ['jobs', currentPage],
    () => fetchAllJobs(currentPage),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setAllJobs(data?.results);
        setOriginalData(data?.results);
        setPageCount(99);
        setIsMoreLoading(false);
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

  const handlePageChange = (nextPage: number): void => {
    setIsMoreLoading(true);
    window.scrollTo({
      top: 0,
    });
    setCurrentPage(nextPage);
  };

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
      <Loader status={status} isLoading={isMoreLoading}>
        <VStack align={'start'} w='full' spacing={10} mt={10}>
          {allJobs?.map((job: any, index) => {
            return <SingleJob key={index} job={job} />;
          })}

          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          >
            <PaginationContainer w='full' justifyContent={'space-between'}>
              <PaginationPrevious variant={'outline'}>
                Previous
              </PaginationPrevious>
              <PaginationPageGroup
                mx={3}
                separator={
                  <PaginationSeparator
                    bg='gray.100'
                    fontSize='sm'
                    py={2}
                    px={3}
                    jumpSize={5}
                  />
                }
              >
                {pages.map((page: number) => (
                  <PaginationPage
                    _current={{
                      bg: 'green.50',
                      color: 'green.600',
                      borderWidth: '1px',
                      borderColor: 'green.600',
                    }}
                    _hover={{
                      bg: 'green.50',
                      color: 'green.600',
                      borderWidth: '1px',
                      borderColor: 'green.600',
                    }}
                    py={2}
                    px={4}
                    key={`pagination_page_${page}`}
                    page={page}
                  />
                ))}
              </PaginationPageGroup>
              <PaginationNext variant={'outline'}>Next</PaginationNext>
            </PaginationContainer>
          </Pagination>
        </VStack>
      </Loader>
    </Container>
  );
};

export default BrowseJobs;
