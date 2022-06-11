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
import { formatDataForBoard } from '../../utils/functions';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

interface Props {
  disclosure: UseDisclosureProps;
  jobData: any;
}

const AddJobToBoard: FC<Props> = ({ disclosure, jobData }) => {
  const [dataToSend, setDataToSend] = useState({
    post_url: jobData?.refs?.landing_page,
    company_name: jobData?.company?.name,
    level: jobData?.levels[0]?.name,
    role: '',
    stage_id: '',
    stage_slug: '',
    board: '',
    slug: uuidv4(),
  });
  const [allBoards, setAllBoards] = useState([]);
  const [boardId, setBoardId] = useState<string | number>('');
  const [addOpen, setAddOpen] = useState(false);

  const router = useRouter();
  const setData = (label: string, value: string | number | undefined) => {
    setDataToSend((prev) => {
      return {
        ...prev,
        [label]: value,
      };
    });
  };
  const [newJobId, setNewJobId] = useState('');

  const queryClient = useQueryClient();

  // Fetch all existing boards
  useQuery('all-boards', fetchAllBoards, {
    onSuccess: (data) => {
      setAllBoards(data);
      if (data.length > 0) {
        setBoardId(data[0].id);
        setData('board', data[0].id);
      }
    },
  });

  //
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

      const boardSelected: any = allBoards?.find(
        (board: any) => board?.id === boardId
      );
      const boardData = formatDataForBoard(boardSelected);

      const columnToUpdate = {
        job_ids: [
          ...boardData.columns[dataToSend.stage_slug].taskIds,
          createdData?.attributes?.slug,
        ].toString(),
      };

      const mappedJobIds = boardSelected.attributes.jobs.data.map((jd: any) => {
        return jd.id;
      });

      const jobsToUpdate = {
        jobs: [createdData.id, ...mappedJobIds],
      };

      // setCreatedJobId(createdData.id);
      updateCStage({ id: dataToSend.stage_id, body: columnToUpdate });
      updateCBoard({ id: boardId, body: jobsToUpdate });
    },
  });
  //

  const toast = useToast();

  const boardsToDisplay = useMemo(() => {
    return allBoards?.map((bd: any) => {
      return {
        label: bd?.attributes?.title,
        value: bd?.id,
      };
    });
  }, [allBoards]);

  const stagesToDisplay = useMemo(() => {
    // get board
    const boardSelected: any = allBoards?.find(
      (board: any) => board?.id === boardId
    );

    // use board to disaply stage
    return boardSelected?.attributes?.stages?.data?.map((sd: any) => {
      return {
        label: sd.attributes.title,
        value: sd.id,
        slug: sd.attributes.slug,
      };
    });
  }, [boardId, allBoards]);

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
              value: dataToSend?.post_url,
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
              value: dataToSend?.company_name,
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
              value: dataToSend?.level,
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
            listLabel='roles'
            listData={[
              'Marketer',
              'Fullstack Developer',
              'Frontend Developer',
              'Backend Developer',
            ]}
            formControlProps={{
              isRequired: true,
            }}
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
              label='Board'
              options={boardsToDisplay}
              value={boardsToDisplay[0]}
              onChange={(value: Options) => {
                setData('board', value.label);
                setBoardId(value.value);
              }}
              formControlProps={{
                isRequired: true,
              }}
            />
            <SearchableSelect
              label='Stage'
              options={stagesToDisplay}
              onChange={(value: any) => {
                setData('stage_id', value.value);
                setData('stage_slug', value.slug);
              }}
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
          onClick={() => {
            setAddOpen(true);
            mutate({
              post_url: dataToSend.post_url,
              company_name: dataToSend.company_name,
              level: dataToSend.level,
              role: dataToSend.role,
              slug: uuidv4(),
              userId: getCookie('USER_ID'),
            });
          }}
          ml={2}
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

export default AddJobToBoard;
