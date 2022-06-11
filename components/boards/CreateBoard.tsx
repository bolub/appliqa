import { Button, Flex, useToast, VStack } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import FormInput from '../UI/Form/FormInput';
import { useMutation, useQueryClient } from 'react-query';
import { createBoard } from '../../API/boards';
import ToastBody from '../UI/ToastBody';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

const CreateBoard: FC<any> = ({ disclosure }) => {
  const [dataToSend, setDataToSend] = useState({
    title: '',
  });

  const [addOpen, setAddOpen] = useState(false);

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

  const { mutate } = useMutation(createBoard, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('all-boards');
      toast({
        position: 'top-right',
        isClosable: true,
        render: () => (
          <ToastBody
            title='Success'
            message='Board created successfully'
            status='success'
          />
        ),
      });
      if (addOpen) {
        router.push(`/boards/${response?.id}`);
      } else {
        disclosure.onClose();
      }
    },
  });

  const toast = useToast();

  const stagesToDisplay = [
    {
      label: 'Wishlist',
      value: 5,
      slug: 'stage-1',
    },
    {
      label: 'Applied',
      value: 7,
      slug: 'stage-2',
    },
    {
      label: 'Interview',
      value: 8,
      slug: 'stage-3',
    },
    {
      label: 'Offer',
      value: 9,
      slug: 'stage-4',
    },
    {
      label: 'Rejected',
      value: 10,
      slug: 'stage-5',
    },
  ];

  return (
    <>
      <VStack align='start' w='100%' spacing={6}>
        <FormInput
          label='Board Title'
          type='text'
          for='board_title'
          inputProps={{
            placeholder: `Job Search ${new Date().getFullYear()}`,
            onChange: (e) => {
              setData('title', e.target.value);
            },
          }}
        />

        {/* <Box w='100%'>
          <SimpleGrid columns={{ base: 1 }} w='100%' spacing={8}>
            <SearchableSelect
              label='Stages'
              options={stagesToDisplay}
              onChange={(value: any) => {
                setData('stage_id', value.value);
                setData('stage_slug', value.slug);
              }}
              isMulti
            />
          </SimpleGrid>
        </Box> */}
      </VStack>

      <Flex justifyContent={'end'} mt={12}>
        {/* <Button onClick={disclosure.onClose} variant={'ghost'}>
          Cancel
        </Button> */}
        <Button
          isDisabled={!dataToSend.title}
          onClick={() => {
            setAddOpen(true);
            const stagesToSend = stagesToDisplay.map(
              (stageData) => stageData.value
            );

            mutate({
              userId: getCookie('USER_ID'),

              title: dataToSend.title,
              stages: stagesToSend,
              stage_order: 1,
            });
          }}
          mr={2}
          colorScheme={'green'}
          variant='outline'
        >
          Create & Open
        </Button>
        <Button
          isDisabled={!dataToSend.title}
          onClick={() => {
            const stagesToSend = stagesToDisplay.map(
              (stageData) => stageData.value
            );

            mutate({
              userId: getCookie('USER_ID'),

              title: dataToSend.title,
              stages: stagesToSend,
              stage_order: 1,
            });
          }}
          ml={2}
          colorScheme={'green'}
        >
          Create Board
        </Button>
      </Flex>
    </>
  );
};

export default CreateBoard;
