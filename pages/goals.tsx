import {
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import CreateGoal from '../components/goals/CreateGoal';
import SingleGoal from '../components/goals/SingleGoal';
import CustomModal from '../components/UI/CustomModal';
import SearchInput from '../components/UI/Form/SearchInput';

export interface GoalProps {
  id: string;
  level: string;
  role: string;
  job_type: string;
  country: string;
  currency: string;
  minRange: string;
  maxRange: string;
}

const Goals = () => {
  const dummyData: GoalProps[] = [
    {
      id: 'eweewvec',
      level: 'Senior',
      role: 'Frontend Developer',
      job_type: 'remote_fulltime',
      country: 'united_states',
      currency: '$',
      minRange: '50000',
      maxRange: '80000',
    },
    {
      id: 'nvoqewnwi',
      level: 'Senior',
      role: 'Frontend Developer',
      job_type: 'remote_fulltime',
      country: 'united_states',
      currency: '$',
      minRange: '50000',
      maxRange: '80000',
    },
    {
      id: 'nvoqewnwijkd',
      level: 'Senior',
      role: 'Frontend Developer',
      job_type: 'remote_fulltime',
      country: 'united_states',
      currency: '$',
      minRange: '50000',
      maxRange: '80000',
    },
    {
      id: 'eweewvecf',
      level: 'Senior',
      role: 'Frontend Developer',
      job_type: 'remote_fulltime',
      country: 'united_states',
      currency: '$',
      minRange: '50000',
      maxRange: '80000',
    },
    {
      id: 'nvoqewnwic',
      level: 'Senior',
      role: 'Frontend Developer',
      job_type: 'remote_fulltime',
      country: 'united_states',
      currency: '$',
      minRange: '50000',
      maxRange: '80000',
    },
    {
      id: 'nvoqewnwijkdnj',
      level: 'Senior',
      role: 'Frontend Developer',
      job_type: 'remote_fulltime',
      country: 'united_states',
      currency: '$',
      minRange: '50000',
      maxRange: '80000',
    },
  ];

  const createGoalDisclosure = useDisclosure();

  return (
    <Container maxW='7xl' py={{ base: 12, md: 20 }}>
      <Heading as='h1' fontWeight={'black'} fontSize='2xl'>
        Goals
      </Heading>

      <Flex flexDir={{ base: 'column', md: 'row' }} mt={{ base: 5, md: 10 }}>
        <SearchInput
          containerProps={{
            maxW: '400px',
            my: 'auto',
          }}
        />

        <Button
          ml='auto'
          mt={{ base: 3, md: 'auto' }}
          mb={{ md: 'auto' }}
          colorScheme={'green'}
          onClick={createGoalDisclosure.onOpen}
        >
          Create Goal
        </Button>
      </Flex>

      <SimpleGrid mt={10} columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {dummyData.map((goal: GoalProps) => {
          return <SingleGoal key={goal.id} data={goal} />;
        })}
      </SimpleGrid>

      <CustomModal disclosure={createGoalDisclosure} title='Create Goal'>
        <CreateGoal />
      </CustomModal>
    </Container>
  );
};

export default Goals;
