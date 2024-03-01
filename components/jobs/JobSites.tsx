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
import { jobSites } from "./data";

const JobSites = () => {
  const jobSitesDisclosure = useDisclosure();

  return (
    <>
      <Card
        flexProps={{
          onClick: () => {
            jobSitesDisclosure.onOpen();
          },
        }}
      >
        <HStack spacing={4} align="center" mx="auto">
          <Text fontSize={"xl"} fontWeight="bold">
            💼
          </Text>
          <Text fontSize={"md"} fontWeight="bold">
            Explore Popular Job Sites
          </Text>
        </HStack>
      </Card>

      <CustomModal title="Popular Job Sites" disclosure={jobSitesDisclosure}>
        <VStack align={"start"} spacing={6} mb={8}>
          {jobSites?.map((jobSite) => {
            return (
              <Link key={jobSite.id} href={jobSite.url} passHref legacyBehavior>
                <ChakraLink
                  w="full"
                  isExternal
                  fontSize={"lg"}
                  color="green.500"
                  fontWeight={"medium"}
                >
                  <HStack spacing={2}>
                    <Text as="span" fontSize={"lg"}>
                      🔗
                    </Text>

                    <Text textDecor={"underline !important"} as="span">
                      {jobSite.name}
                    </Text>
                  </HStack>
                </ChakraLink>
              </Link>
            );
          })}
        </VStack>
      </CustomModal>
    </>
  );
};

export default JobSites;
