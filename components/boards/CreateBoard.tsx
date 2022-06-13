import { Button, Center, Flex, Text, useToast, VStack } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import FormInput from '../UI/Form/FormInput';
import { useMutation, useQueryClient } from 'react-query';
import { createBoard } from '../../API/boards';
import ToastBody from '../UI/ToastBody';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { DASHBOARD_ROUTES } from '../../utils/routes';

const CreateBoard: FC<any> = () => {
  const [dataToSend, setDataToSend] = useState({
    title: '',
  });

  const [addOpen, setAddOpen] = useState(false);

  const [onboard, setOnboard] = useState(false);

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

  useEffect(() => {
    if (router?.query?.onboard === 'true') {
      setOnboard(true);
    }
  }, [router?.query?.onboard]);

  const { mutate, isLoading } = useMutation(createBoard, {
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
        window.location.href = `/boards/${response?.id}`;
      } else {
        window.location.href = DASHBOARD_ROUTES.BOARDS;
      }
    },
  });

  const toast = useToast();

  const localStagesToDisplay = [
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

  const prodStagesToDisplay = [
    {
      label: 'Wishlist',
      value: 1,
      slug: 'stage-1',
    },
    {
      label: 'Applied',
      value: 2,
      slug: 'stage-2',
    },
    {
      label: 'Interview',
      value: 3,
      slug: 'stage-3',
    },
    {
      label: 'Offer',
      value: 4,
      slug: 'stage-4',
    },
    {
      label: 'Rejected',
      value: 5,
      slug: 'stage-5',
    },
  ];

  const stagesToDisplay =
    process.env.NODE_ENV === 'development'
      ? localStagesToDisplay
      : prodStagesToDisplay;

  return (
    <>
      {onboard && (
        <Center
          py={16}
          px={{ base: 8, md: 16 }}
          bg='gray.100'
          flexDir={'column'}
          mb={10}
          borderRadius='xl'
          textAlign={'center'}
        >
          <Text fontSize={'3xl'}>🥳 🎊 🎉</Text>
          <Text fontSize={'md'} fontWeight='bold'>
            Welcome, Glad to have you
          </Text>
          <Text fontSize={'sm'}>
            Create your first board to get started managing your applications
          </Text>
        </Center>
      )}

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
      </VStack>

      <Flex justifyContent={'end'} mt={12}>
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
          isLoading={isLoading}
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
