import {
  Badge,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
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
import { Options } from '../utils/GeneralProps';
import { HiChevronDown } from 'react-icons/hi';
import JobSites from '../components/jobs/JobSites';
import JobInterviewTips from '../components/jobs/JobInterviewTips';
import BrowseJobsLoader from '../components/UI/Loaders/BrowseJobsLoader';

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
  const [filters, setFilters] = useState({
    posted_date: '',
    categories: [],
    experience: [],
  });
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: pageCount,
    limits: {
      outer: 3,
      inner: 3,
    },
    initialState: { currentPage: 1 },
  });

  const updateFilters = (label: string, value: string | string[]) => {
    setFilters((prev) => {
      return {
        ...prev,
        [label]: value,
      };
    });
  };
  const combineFilters = () => {
    const newCategories = filters?.categories?.map((cd: string, index) => {
      const isLast = index === filters?.categories?.length - 1;

      return `category=${cd}${!isLast ? '&' : ''}`;
    });

    const newLevels = filters?.experience?.map((cd: string, index) => {
      const isLast = index === filters?.experience?.length - 1;

      return `level=${cd}${!isLast ? '&' : ''}`;
    });

    return `posted_date=${filters?.posted_date}&${newCategories.join(
      ''
    )}&${newLevels.join('')}`;
  };

  const { status } = useQuery(
    ['jobs', currentPage, filters],
    () => fetchAllJobs(currentPage, combineFilters()),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setAllJobs(data?.results);
        setOriginalData(data?.results);
        setPageCount(data?.page_count >= 99 ? 99 : data?.page_count);
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

  // const duration = [
  //   {
  //     label: 'Last 7 days',
  //     value: 'Last 7 days',
  //   },
  //   {
  //     label: 'Last 14 days',
  //     value: 'last_14d',
  //   },
  //   {
  //     label: 'Last 30 days',
  //     value: 'last_30d',
  //   },
  // ];

  const jobCategories = [
    {
      label: 'Design and UX',
      value: 'Design and UX',
    },
    {
      label: 'Data and Analytics',
      value: 'Data and Analytics',
    },
    {
      label: 'Software Engineering',
      value: 'Software Engineering',
    },
    {
      label: 'Computer and IT',
      value: 'Computer and IT',
    },
    {
      label: 'Product Management',
      value: 'Product Management',
    },
    {
      label: 'Project Management',
      value: 'Project Management',
    },
  ];

  const Experience = [
    {
      label: 'Internship',
      value: 'Internship',
    },
    {
      label: 'Entry Level (0-1 years)',
      value: 'Entry Level',
    },
    {
      label: 'Mid Level (1-5 years)',
      value: 'Mid Level',
    },
    {
      label: 'Senior (5-10 years)',
      value: 'Senior Level',
    },
    {
      label: 'Management',
      value: 'management',
    },
  ];

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

        <HStack
          flexDir={{ base: 'column', md: 'row' }}
          ml={{ md: 'auto' }}
          mt={{ base: '5', md: 0 }}
          spacing={{ md: 2 }}
        >
          {/* duration */}
          {/* <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              w='130px'
              variant='ghost'
              color='gray.500'
              fontWeight={'bold'}
              rightIcon={
                <Icon as={HiChevronDown} fontSize='lg' color='gray.600' />
              }
            >
              Duration
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type='radio'
                onChange={(value: string | string[]) => {
                  updateFilters('posted_date', value);
                  setIsMoreLoading(true);
                }}
              >
                {duration?.map((d: Options) => {
                  return (
                    <MenuItemOption key={d.value} value={d.value}>
                      {d.label}
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
            </MenuList>
          </Menu> */}

          {/* Category */}
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              w={{ base: 'full', md: '160px' }}
              variant='ghost'
              borderWidth={{ base: '1px', md: 0 }}
              color='gray.500'
              fontWeight={'bold'}
              rightIcon={
                <Icon as={HiChevronDown} fontSize='lg' color='gray.600' />
              }
            >
              Category
              {filters?.categories?.length > 0 && (
                <Badge ml={2} fontWeight='bold' fontSize={'sm'}>
                  {filters?.categories?.length}
                </Badge>
              )}
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type='checkbox'
                onChange={(value: string | string[]) => {
                  updateFilters('categories', value);
                  setIsMoreLoading(true);
                }}
              >
                {jobCategories?.map((d: Options) => {
                  return (
                    <MenuItemOption key={d.value} value={d.value}>
                      {d.label}
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
            </MenuList>
          </Menu>

          {/* Experience */}
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              w={{ base: 'full', md: '170px' }}
              variant='ghost'
              borderWidth={{ base: '1px', md: 0 }}
              color='gray.500'
              fontWeight={'bold'}
              rightIcon={
                <Icon as={HiChevronDown} fontSize='lg' color='gray.600' />
              }
            >
              Experience
              {filters?.experience?.length > 0 && (
                <Badge ml={2} fontWeight='bold' fontSize={'sm'}>
                  {filters?.experience?.length}
                </Badge>
              )}
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type='checkbox'
                onChange={(value: string | string[]) => {
                  updateFilters('experience', value);
                  setIsMoreLoading(true);
                }}
              >
                {Experience?.map((d: Options) => {
                  return (
                    <MenuItemOption key={d.value} value={d.value}>
                      {d.label}
                    </MenuItemOption>
                  );
                })}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      <SimpleGrid columns={2} spacing={10} mt={6}>
        <JobSites />

        <JobInterviewTips />
      </SimpleGrid>

      <Loader
        status={status}
        isLoading={isMoreLoading}
        loader={<BrowseJobsLoader />}
        length={allJobs?.length}
      >
        <VStack align={'start'} w='full' spacing={10} mt={10}>
          {allJobs?.map((job: any, index) => {
            return <SingleJob key={index} job={job} />;
          })}

          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          >
            <PaginationContainer
              w={{ base: 'auto', md: 'full' }}
              justifyContent={'space-between'}
            >
              <PaginationPrevious variant={'outline'}>
                Previous
              </PaginationPrevious>
              <PaginationPageGroup
                mx={3}
                d={{ base: 'none', md: 'flex' }}
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
