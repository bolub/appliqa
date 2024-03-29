import {
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchGoals } from '../API/goals';
import CreateGoal from '../components/goals/CreateGoal';
import SingleGoal from '../components/goals/SingleGoal';
import CustomModal from '../components/UI/CustomModal';
import CustomSeo from '../components/UI/CustomSeo';
import SearchInput from '../components/UI/Form/SearchInput';
import Loader from '../components/UI/Loader';
import GoalsLoader from '../components/UI/Loaders/GoalsLoader';
import { logout } from '../utils/functions';
import { goalProps } from '../utils/GeneralProps';

export default function Goals() {
  const [allGoals, setAllGoals] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const { status } = useQuery('goals', fetchGoals, {
    onSuccess: (data) => {
      setAllGoals(data);
      setOriginalData(data);
    },
    onError: (data: any) => {
      const errors = { ...data };
      if (!errors?.response) {
        logout();
      }
    },
  });

  const createGoalDisclosure = useDisclosure();

  const searchGoals = (value: string) => {
    if (!value || value === '') {
      setAllGoals(originalData);
      return;
    }

    const filteredGoals = [...allGoals].filter((goal: goalProps) => {
      return `${goal.attributes.level} ${goal.attributes.role}`.includes(value);
    });

    setAllGoals(filteredGoals);
  };

  return (
    <Container maxW='7xl' py={{ base: 12, md: 20 }}>
      <CustomSeo title='Goals' />

      <Heading as='h1' fontWeight={'black'} fontSize='2xl'>
        Goals
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

      <Loader
        status={status}
        length={allGoals?.length}
        emptyTextTitle='No goals found'
        emptyText='Get started by creating your first goal'
        loader={<GoalsLoader />}
        emptyAction={createGoalDisclosure.onOpen}
        emptyActionText='Create Goal'
      >
        <SimpleGrid mt={10} columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {allGoals?.map((goal: goalProps) => {
            return <SingleGoal key={goal.id} data={goal} />;
          })}
        </SimpleGrid>
      </Loader>

      <CustomModal disclosure={createGoalDisclosure} title='Create Goal'>
        <CreateGoal close={createGoalDisclosure.onClose} />
      </CustomModal>
    </Container>
  );
}

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery('goals', fetchGoals);

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
