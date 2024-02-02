import {
  HStack,
  Text,
  useDisclosure,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchJobTips } from '../../API/jobs';
import { logout } from '../../utils/functions';
import CustomModal from '../UI/CustomModal';
import Loader from '../UI/Loader';
import Card from './Card';

const JobInterviewTips: FC = () => {
  const jobInterviewTipsDisclosure = useDisclosure();

  const [allJobTips, setAllJobTips] = useState([]);

  const { status } = useQuery('job_tips', fetchJobTips, {
    onSuccess: (data) => {
      setAllJobTips(data?.data);
    },
    onError: (data: any) => {
      const errors = { ...data };
      if (!errors?.response) {
        logout();
      }
    },
  });
  return <>
    <Card
      flexProps={{
        onClick: () => {
          jobInterviewTipsDisclosure.onOpen();
        },
      }}
    >
      <HStack spacing={4} align='center' mx='auto'>
        <Text fontSize={'xl'} fontWeight='bold'>
          🤔
        </Text>
        <Text fontSize={'md'} fontWeight='bold'>
          Explore Job Search Tips
        </Text>
      </HStack>
    </Card>

    <CustomModal
      title='Popular Job Sites'
      disclosure={jobInterviewTipsDisclosure}
    >
      <VStack align={'start'} spacing={6} mb={6}>
        <Link href={''} passHref legacyBehavior>
          <Loader
            status={status}
            length={allJobTips?.length}
            emptyText='None available'
          >
            {allJobTips?.map((jobTip: any) => {
              const data = jobTip?.attributes;

              return (
                <Link key={data?.id} href={data?.url} passHref legacyBehavior>
                  <ChakraLink
                    w='full'
                    isExternal
                    fontSize={'lg'}
                    fontWeight={'medium'}
                  >
                    <HStack align='start' spacing={2}>
                      <Text as='span' fontSize={'lg'}>
                        🔗
                      </Text>

                      <VStack align='start' spacing={0}>
                        <Text
                          color='green.500'
                          as='span'
                          fontWeight={'bold'}
                          _hover={{
                            textDecor: 'underline !important',
                          }}
                        >
                          {data?.name}
                        </Text>
                        <Text fontSize={'md'} as='span' color='gray.500'>
                          {data?.description}
                        </Text>
                      </VStack>
                    </HStack>
                  </ChakraLink>
                </Link>
              );
            })}
          </Loader>
        </Link>
      </VStack>
    </CustomModal>
  </>;
};

export default JobInterviewTips;
