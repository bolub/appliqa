import '../styles/globals.css';
import '../styles/datetimepicker.css';

import type { AppProps } from 'next/app';
import { ChakraProvider, Text } from '@chakra-ui/react';
import { theme } from '../chakra/theme';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AUTH_ROUTES, DASHBOARD_ROUTES } from '../utils/routes';
import Navbar from '../components/UI/Layout/Navbar';
import Joyride from 'react-joyride';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  const [isAuthRoute, setIsAuthRoute] = useState<boolean>(false);
  const [isDashboardRoute, setIsDashboardRoute] = useState<boolean>(false);

  const { pathname, query } = useRouter();

  useEffect(() => {
    for (const key in AUTH_ROUTES) {
      //@ts-ignore
      if (pathname.includes(AUTH_ROUTES[key])) {
        setIsAuthRoute(true);
        setIsDashboardRoute(false);
      }
    }

    for (const key in DASHBOARD_ROUTES) {
      //@ts-ignore
      if (pathname.includes(DASHBOARD_ROUTES[key])) {
        setIsDashboardRoute(true);
        setIsAuthRoute(false);
      }
    }
  }, [pathname]);

  const steps = [
    {
      target: '.boards',
      title: (
        <Text fontWeight={'extrabold'} mt={4}>
          Boards
        </Text>
      ),
      content:
        'Manage your jobs in the board section and find the best job for you.',
      disableBeacon: true,
    },
    {
      target: '.goals',
      title: (
        <Text fontWeight={'extrabold'} mt={4}>
          Goals
        </Text>
      ),
      content: 'Manage your goals in the goals section',
      disableBeacon: true,
    },
    {
      target: '.browse-jobs',
      title: (
        <Text fontWeight={'extrabold'} mt={4}>
          Browse Jobs
        </Text>
      ),
      content: 'Browse through different jobs and add to boards to track them',
      disableBeacon: true,
    },
  ];
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (query?.signup === 'true') {
      setRun(true);
    }
  }, [query?.signup]);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RecoilRoot>
          <Head>
            <title>Appliqa</title>
            <meta
              name='description'
              content='Track your job applications with ease'
            />
            <link
              href='https://api.fontshare.com/css?f[]=satoshi@300,400,500,700,900,1&display=swap'
              rel='stylesheet'
            />
            <link rel='icon' href='/Logo.svg' />
          </Head>

          {isDashboardRoute && !isAuthRoute && <Navbar />}
          {query?.signup === 'true' && (
            <Joyride
              continuous={true}
              run={run}
              scrollToFirstStep={true}
              // showProgress={true}
              showSkipButton={true}
              steps={steps}
              styles={{
                options: {
                  zIndex: 10000,
                  primaryColor: '#16a34a',
                },
              }}
            />
          )}

          <Component {...pageProps} />
        </RecoilRoot>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
