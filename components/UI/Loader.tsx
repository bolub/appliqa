import { Center, Text, Button } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

const Loader: FC<{
  status: "success" | "loading" | "error" | "idle";
  loadingText?: string;
  errorText?: string;
  isLoading?: boolean;
  length?: number;
  emptyTextTitle?: string;
  emptyText?: string;
  emptyActionText?: string;
  loader?: React.ReactNode;
  emptyAction?: () => void;
  children: ReactNode;
}> = ({
  loadingText = "Fetching data...",
  status,
  errorText = "Something happened, Please try again",
  children,
  emptyTextTitle = "No data found",
  emptyText = "No data found",
  emptyActionText = "",
  emptyAction = () => {},
  isLoading = false,
  length = 1,
  loader,
}) => {
  const dataLoading = status === "loading" || isLoading;

  return (
    <>
      {(!status || status === "error") && (
        <Center flexDir={"column"} h="50vh">
          <Text>{errorText}</Text>
        </Center>
      )}

      {dataLoading && (
        <>
          {loader || (
            <Center flexDir={"column"} h="50vh">
              <Text>{loadingText}</Text>
            </Center>
          )}
        </>
      )}

      {!dataLoading && status === "success" && (
        <>
          {length > 0 ? (
            children
          ) : (
            <Center h="58vh" w="full" my={6}>
              <Center
                flexDir={"column"}
                mt={16}
                maxW="500px"
                py={16}
                px={20}
                mx="auto"
                textAlign={"center"}
                m="auto"
                borderWidth={"1px"}
                borderColor="gray.400"
                borderStyle="dashed"
                rounded={"lg"}
              >
                <Text fontSize={"4xl"}>🥲</Text>

                <Text mt={3} fontWeight="bold" maxW="290px">
                  {emptyTextTitle}
                </Text>

                <Text mt={1} fontWeight="medium" maxW="290px" color="gray.500">
                  {emptyText}
                </Text>

                {emptyAction && emptyActionText && (
                  <Button mt={8} color="green.500" onClick={emptyAction}>
                    {emptyActionText}
                  </Button>
                )}
              </Center>
            </Center>
          )}
        </>
      )}
    </>
  );
};

export default Loader;
