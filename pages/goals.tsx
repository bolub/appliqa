import {
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { fetchGoals } from '../API/goals';
import CreateGoal from '../components/goals/CreateGoal';
import SingleGoal from '../components/goals/SingleGoal';
import CustomModal from '../components/UI/CustomModal';
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

const Goals = () => {
  const { data, status } = useQuery('goals', fetchGoals);
  const createGoalDisclosure = useDisclosure();
  console.log(data);
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

      <Loader status={status}>
        <SimpleGrid mt={10} columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {data?.map((goal: GoalProps) => {
            return <SingleGoal key={goal.id} data={goal} />;
          })}
        </SimpleGrid>
      </Loader>

      <CustomModal disclosure={createGoalDisclosure} title='Create Goal'>
        <CreateGoal disclosure={createGoalDisclosure} />
      </CustomModal>
    </Container>
  );
};

export default Goals;
