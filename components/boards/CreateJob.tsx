import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  UseDisclosureProps,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { FC, useMemo, useState } from 'react';
import FormInput from '../UI/Form/FormInput';
import SearchableSelect from '../UI/Form/SearchableSelect';
import {
  ArrangedBoardProps,
  currentStageProps,
  fullBoardProps,
  JobsDatum,
  Options,
  StagesDatum,
} from './../../utils/GeneralProps';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  createJob,
  fetchAllBoards,
  updateBoard,
  updateStage,
} from '../../API/boards';
import ToastBody from '../UI/ToastBody';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

interface dataProps {
  boardData: ArrangedBoardProps;
  originalBoardData: fullBoardProps;
  disclosure: UseDisclosureProps;
  currentStage: currentStageProps;
}

interface createStateProps {
  post_url: string;
  company_name: string;
  level: string;
  role: string;
  slug: string | number;
  stage_id: string | number;
  stage_slug: string | number;
  board: string;
}

interface stageOptions {
  label: string;
  value: string;
  slug: string;
}

const CreateJob: FC<dataProps> = ({
  boardData,
  originalBoardData,
  disclosure,
  currentStage,
}) => {
  const [dataToSend, setDataToSend] = useState<createStateProps>({
    post_url: '',
    company_name: '',
    level: '',
    role: '',
    stage_id: currentStage?.id,
    stage_slug: currentStage?.slug,
    board: originalBoardData?.id,
    slug: uuidv4(),
  });
  const [allBoards, setAllBoards] = useState([]);
  const [boardId, setBoardId] = useState<string | number>(
    originalBoardData?.id
  );
  const [newJobId, setNewJobId] = useState('');

  const setData = (label: string, value: string | number | undefined) => {
    setDataToSend((prev) => {
      return {
        ...prev,
        [label]: value,
      };
    });
  };

  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch all existing boards
  useQuery('all-boards', fetchAllBoards, {
    onSuccess: (data) => {
      setAllBoards(data);
    },
  });

  const { mutate: updateCStage, isLoading: stageLoading } = useMutation(
    updateStage,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('board');
      },
    }
  );

  const { mutate: updateCBoard, isLoading: boardLoading } = useMutation(
    updateBoard,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('board');
        toast({
          position: 'top-right',
          isClosable: true,
          render: () => (
            <ToastBody
              title='Success'
              message='Job Added successfully'
              status='success'
            />
          ),
        });

        if (addOpen) {
          // router.push(`/boards/${boardId}?jobId=${newJobId}`);
          window.location.href = `/boards/${boardId}?jobId=${newJobId}`;
        } else {
          disclosure.onClose && disclosure.onClose();
        }
      },
    }
  );

  const { mutate, isLoading: jobLoading } = useMutation(createJob, {
    onSuccess: (data) => {
      const createdData = data;
      setNewJobId(createdData.id);

      const columnToUpdate = {
        job_ids: [
          // @ts-ignore
          ...boardData.columns[dataToSend?.stage_slug].taskIds,
          createdData?.attributes?.slug,
        ].toString(),
      };

      const mappedJobIds = originalBoardData.attributes.jobs.data.map(
        (jd: JobsDatum) => {
          return jd.id;
        }
      );

      const jobsToUpdate = {
        jobs: [createdData.id, ...mappedJobIds],
      };

      updateCStage({ id: dataToSend.stage_id, body: columnToUpdate });
      updateCBoard({ id: router?.query?.id, body: jobsToUpdate });
    },
  });

  const toast = useToast();

  const allStages = originalBoardData.attributes.stages.data.map(
    (sd: StagesDatum) => {
      return {
        label: sd.attributes.title,
        value: sd.id,
        slug: sd.attributes.slug,
      };
    }
  );

  const [addOpen, setAddOpen] = useState(false);
  const boardsToDisplay = useMemo(() => {
    return allBoards?.map((bd: fullBoardProps) => {
      return {
        label: bd?.attributes?.title,
        value: bd?.id,
      };
    });
  }, [allBoards]);
  return (
    <>
      <VStack align='start' w='100%' spacing={6}>
        <SimpleGrid columns={{ base: 1, md: 2 }} w='100%' spacing={8}>
          <FormInput
            label='Post url'
            type='url'
            for='post_url'
            inputProps={{
              placeholder: 'https://abstergo.com/frontend',
              onChange: (e) => {
                setData('post_url', e.target.value);
              },
            }}
          />

          <FormInput
            label='Company Name'
            type='text'
            for='company_name'
            inputProps={{
              placeholder: 'Abstergo',
              onChange: (e) => {
                setData('company_name', e.target.value);
              },
            }}
            formControlProps={{
              isRequired: true,
            }}
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} w='100%' spacing={8}>
          <FormInput
            label='Level'
            type='string'
            for='level'
            inputProps={{
              placeholder: 'Senior',
              onChange: (e) => {
                setData('level', e.target.value);
              },
            }}
            listLabel='levels'
            listData={[
              'CEO',
              'CTO',
              'CPO',
              'Principal',
              'Senior',
              'Mid',
              'Junior',
            ]}
          />

          <FormInput
            label='Role'
            type='string'
            for='role'
            inputProps={{
              placeholder: 'Frontend Developer',
              onChange: (e) => {
                setData('role', e.target.value);
              },
            }}
            formControlProps={{
              isRequired: true,
            }}
            listLabel='roles'
            listData={[
              'Marketer',
              'Fullstack Developer',
              'Frontend Developer',
              'Backend Developer',
            ]}
          />
        </SimpleGrid>

        <Box w='100%'>
          <SimpleGrid
            mt={4}
            borderTopWidth={'1px'}
            pt={10}
            columns={{ base: 1, md: 2 }}
            w='100%'
            spacing={8}
          >
            <SearchableSelect
              label='Stage'
              options={allStages}
              onChange={(value: stageOptions) => {
                setData('stage_id', value.value);
                setData('stage_slug', value.slug);
              }}
              value={allStages?.filter((option) => {
                return option?.value === dataToSend?.stage_id;
              })}
              formControlProps={{
                isRequired: true,
              }}
            />
            <SearchableSelect
              label='Board'
              options={boardsToDisplay}
              onChange={(value: Options) => {
                setData('board', value.label);
                setBoardId(value.value);
              }}
              value={boardsToDisplay?.filter((option: Options) => {
                return option?.value === originalBoardData?.id;
              })}
              formControlProps={{
                isRequired: true,
              }}
            />
          </SimpleGrid>
        </Box>
      </VStack>

      <Flex justifyContent={'end'} mt={16}>
        <Button
          isDisabled={
            !dataToSend.board ||
            !dataToSend.stage_id ||
            !dataToSend.role ||
            !dataToSend.company_name
          }
          isLoading={jobLoading || stageLoading || boardLoading}
          onClick={() => {
            setAddOpen(true);
            mutate({
              post_url: dataToSend.post_url,
              company_name: dataToSend.company_name,
              level: dataToSend.level,
              role: dataToSend.role,
              slug: uuidv4(),
              stage: dataToSend?.stage_slug,
              userId: getCookie('USER_ID'),
              boardId: boardId.toString(),
            });
          }}
          mr={2}
          colorScheme={'green'}
          variant='outline'
        >
          Add & Open
        </Button>
        <Button
          isDisabled={
            !dataToSend.board ||
            !dataToSend.stage_id ||
            !dataToSend.role ||
            !dataToSend.company_name
          }
          isLoading={jobLoading || stageLoading || boardLoading}
          onClick={() => {
            mutate({
              post_url: dataToSend.post_url,
              company_name: dataToSend.company_name,
              level: dataToSend.level,
              role: dataToSend.role,
              slug: uuidv4(),
              stage: dataToSend?.stage_slug,
              userId: getCookie('USER_ID'),
              boardId: boardId.toString(),
            });
          }}
          ml={2}
          colorScheme={'green'}
        >
          Add Job
        </Button>
      </Flex>
    </>
  );
};

export default CreateJob;
