import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { formatDataForBoard, formatDateAgo } from '../../../utils/functions';

import { boardState } from '../../../recoil/board';
import { useRecoilValue } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';
import { updateStage } from '../../../API/boards';

interface Props {
  data: any;
  stage: any;
}

const ModalTitleComponent: FC<Props> = ({ data, stage }) => {
  const boardData = useRecoilValue(boardState);
  const allStages = boardData?.attributes?.stages?.data?.map((sd: any) => {
    return {
      label: sd.attributes.title,
      value: sd.id,
      slug: sd.attributes.slug,
    };
  });

  const [selectedStage, setSelectedStage] = React.useState({
    label: '',
    value: '',
    slug: '',
  });

  const title = `${data?.level} ${data?.role}`;

  const queryClient = useQueryClient();
  const { mutate: updateCStage } = useMutation(updateStage, {
    onSuccess: () => {
      queryClient.invalidateQueries('board');
    },
  });

  const moveJob = (stageData: any) => {
    const start = stage;
    const finish = formatDataForBoard(boardData)?.columns[stageData?.slug];

    const clonedStartTaskIds = [...start.taskIds];
    let filteredStart = clonedStartTaskIds?.filter((st) => {
      return st !== data?.slug;
    });

    const newStart = {
      ...start,
      taskIds: filteredStart,
    };

    const newStartForAPI = {
      job_ids: filteredStart.toString(),
    };

    const clonedFinishTaskIds = [...finish.taskIds];
    clonedFinishTaskIds.push(data?.slug);

    const newFinish = {
      ...finish,
      taskIds: clonedFinishTaskIds,
    };
    const newFinishForAPI = {
      job_ids: clonedFinishTaskIds.toString(),
    };

    updateCStage({ id: newStart.id, body: newStartForAPI });
    updateCStage({ id: newFinish.id, body: newFinishForAPI });
  };

  return (
    <Box>
      <ButtonGroup size='sm' isAttached mb={8}>
        <Button borderRadius='md' mr='-px' fontSize={'sm'} h='40px' px={5}>
          {selectedStage?.label || stage?.title}
        </Button>
        <Menu autoSelect={false}>
          <MenuButton
            as={IconButton}
            borderRadius='md'
            aria-label='Change Stage'
            borderLeftWidth={'1px'}
            icon={<HiOutlineChevronDown />}
            h='40px'
          />
          <MenuList zIndex={3}>
            {allStages?.map((stageData: any) => {
              if (stageData.slug === stage.slug) return;

              return (
                <MenuItem
                  zIndex={100}
                  key={stageData?.value}
                  onClick={() => {
                    setSelectedStage(stageData);
                    moveJob(stageData);
                  }}
                  fontSize='md'
                  fontWeight={'medium'}
                >
                  {stageData?.label}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </ButtonGroup>

      <HStack flexDir={{ base: 'column', md: 'row' }} spacing={4} my='auto'>
        <Avatar
          src={`https://logo.clearbit.com/${data?.company_name}.com`}
          size={'lg'}
        />

        <VStack align='start' spacing={0} w='full'>
          <Text fontSize={'xl'} fontWeight='black' color='gray.800'>
            {title}
          </Text>

          <Flex>
            <Text my='auto' fontWeight='bold' color='gray.500' fontSize={'md'}>
              {data?.company_name}
            </Text>

            <Text my='auto' fontSize={'xs'} color='gray.500' mx={1}>
              &bull;
            </Text>

            <Text my='auto' fontWeight='bold' color='gray.500' fontSize={'sm'}>
              {formatDateAgo(data?.publishedAt)}
            </Text>
          </Flex>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ModalTitleComponent;
