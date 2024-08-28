import { Box, Container, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Footer from "../components/landing/Footer";
import LandingNavbar from "../components/landing/LandingNavbar";
import CustomSeo from "../components/UI/CustomSeo";
import { BrowseJobs } from "../containers/browse-jobs/BrowseJobs";

const Home: NextPage = () => {
  return (
    <>
      <CustomSeo title="Home" />

      <LandingNavbar />

      <main>
        <Container maxW="7xl" display="flex" px={{ base: 4 }}>
          <Box rounded="lg" bgColor="gray.200" w="full" py="10px" px="20px">
            <Text fontWeight={500}>
              We are currently working on enhancing Appliqa at the moment. Stay
              tuned—exciting new functionalities are on the way! Thank you for
              your patience and support.
            </Text>
          </Box>
        </Container>

        <BrowseJobs
          filterValues={{
            search: "",
            category: "",
            experience: "",
            page: 1,
          }}
        />
      </main>
      <Footer />
    </>
  );
};

export default Home;
