"use client";
import { ChakraProvider } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { ReactQueryDevtools } from "react-query/devtools";

import { RecoilRoot } from "recoil";
import { theme } from "../chakra/theme";

export const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <ChakraProvider theme={theme}>
      {/* @ts-ignore */}
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <RecoilRoot>{children}</RecoilRoot>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
