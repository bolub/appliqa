import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { FC, useMemo, useState } from 'react';
import FormInput from '../UI/Form/FormInput';
import SearchableSelect from '../UI/Form/SearchableSelect';
import { Options } from './../../utils/GeneralProps';
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

const CreateJob: FC = ({
  boardData,
  originalBoardData,
  disclosure,
  currentStage,
}: any) => {
  const [dataToSend, setDataToSend] = useState({
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
  const [boardId, setBoardId] = useState<string | number>('');
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

  const { mutate: updateCStage } = useMutation(updateStage, {
    onSuccess: () => {
      queryClient.invalidateQueries('board');
    },
  });

  const { mutate: updateCBoard } = useMutation(updateBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries('board');
      toast({
        position: 'top-right',
        render: () => (
          <ToastBody
            title='Success'
            message='Job Added successfully'
            status='success'
          />
        ),
      });

      if (addOpen) {
        router.push(`/boards/${boardId}?jobId=${newJobId}`);
      } else {
        disclosure.onClose && disclosure.onClose();
      }
    },
  });

  const { mutate } = useMutation(createJob, {
    onSuccess: (data) => {
      const createdData = data;
      setNewJobId(createdData.id);

      const columnToUpdate = {
        job_ids: [
          ...boardData.columns[dataToSend.stage_slug].taskIds,
          createdData?.attributes?.slug,
        ].toString(),
      };

      const mappedJobIds = originalBoardData.attributes.jobs.data.map(
        (jd: any) => {
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

  const allStages = originalBoardData.attributes.stages.data.map((sd: any) => {
    return {
      label: sd.attributes.title,
      value: sd.id,
      slug: sd.attributes.slug,
    };
  });

  const [addOpen, setAddOpen] = useState(false);
  const boardsToDisplay = useMemo(() => {
    return allBoards?.map((bd: any) => {
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
              onChange={(value: any) => {
                setData('stage_id', value.value);
                setData('stage_slug', value.slug);
              }}
              value={allStages?.filter((option: Options) => {
                return option?.value === currentStage?.id;
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
        {/* <Button onClick={disclosure.onClose} variant={'ghost'}>
          Cancel
        </Button> */}
        <Button
          isDisabled={
            !dataToSend.board ||
            !dataToSend.stage_id ||
            !dataToSend.role ||
            !dataToSend.company_name
          }
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
