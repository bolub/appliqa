import {
  HStack,
  Text,
  useDisclosure,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import CustomModal from "../UI/CustomModal";
import Card from "./Card";
import { jobTips } from "./data";

const JobInterviewTips = () => {
  const jobInterviewTipsDisclosure = useDisclosure();

  return (
    <>
      <Card
        flexProps={{
          onClick: () => {
            jobInterviewTipsDisclosure.onOpen();
          },
        }}
      >
        <HStack spacing={4} align="center" mx="auto">
          <Text fontSize={"xl"} fontWeight="bold">
            🤔
          </Text>
          <Text fontSize={"md"} fontWeight="bold">
            Explore Job Search Tips
          </Text>
        </HStack>
      </Card>

      <CustomModal
        title="Popular Job Sites"
        disclosure={jobInterviewTipsDisclosure}
      >
        <VStack align={"start"} spacing={6} mb={6}>
          {jobTips?.map((jobTip) => {
            return (
              <ChakraLink
                w="full"
                isExternal
                fontSize={"lg"}
                fontWeight={"medium"}
                href={jobTip.url}
              >
                <HStack align="start" spacing={2}>
                  <Text as="span" fontSize={"lg"}>
                    🔗
                  </Text>

                  <VStack align="start" spacing={0}>
                    <Text
                      color="green.500"
                      as="span"
                      fontWeight={"bold"}
                      _hover={{
                        textDecor: "underline !important",
                      }}
                    >
                      {jobTip.name}
                    </Text>
                    <Text fontSize={"md"} as="span" color="gray.500">
                      {jobTip.description}
                    </Text>
                  </VStack>
                </HStack>
              </ChakraLink>
            );
          })}
        </VStack>
      </CustomModal>
    </>
  );
};

export default JobInterviewTips;
