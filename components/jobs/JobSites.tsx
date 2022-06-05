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
import { fetchJobSites } from '../../API/jobs';
import { logout } from '../../utils/functions';
import CustomModal from '../UI/CustomModal';
import Loader from '../UI/Loader';
import Card from './Card';

const JobSites: FC = () => {
  const jobSitesDisclosure = useDisclosure();

  const [allJobSites, setAllJobSites] = useState([]);

  const { status } = useQuery('job_sites', fetchJobSites, {
    onSuccess: (data) => {
      setAllJobSites(data?.data);
    },
    onError: (data: any) => {
      const errors = { ...data };
      if (!errors?.response) {
        logout();
      }
    },
  });

  return (
    <>
      <Card
        flexProps={{
          onClick: () => {
            jobSitesDisclosure.onOpen();
          },
        }}
      >
        <HStack spacing={4} align='center' mx='auto'>
          <Text fontSize={'xl'} fontWeight='bold'>
            💼
          </Text>
          <Text fontSize={'md'} fontWeight='bold'>
            Explore Popular Job Sites
          </Text>
        </HStack>
      </Card>

      <CustomModal title='Popular Job Sites' disclosure={jobSitesDisclosure}>
        <VStack align={'start'} spacing={6} mb={8}>
          <Loader
            status={status}
            length={allJobSites?.length}
            emptyText='None available'
          >
            {allJobSites?.map((jobSite: any) => {
              const data = jobSite?.attributes;

              return (
                <Link key={data?.id} href={data?.url} passHref>
                  <ChakraLink
                    w='full'
                    isExternal
                    fontSize={'lg'}
                    color='green.500'
                    fontWeight={'medium'}
                  >
                    <HStack spacing={2}>
                      <Text as='span' fontSize={'lg'}>
                        🔗
                      </Text>

                      <Text textDecor={'underline !important'} as='span'>
                        {data?.name}
                      </Text>
                    </HStack>
                  </ChakraLink>
                </Link>
              );
            })}
          </Loader>
        </VStack>
      </CustomModal>
    </>
  );
};

export default JobSites;
