import {
  Button,
  Center,
  chakra,
  Container,
  Image,
  Link,
} from "@chakra-ui/react";

const LandingHeader = () => {
  return (
    <Container maxW="7xl" mt={{ base: 6, md: 16 }}>
      <Center flexDir={"column"} textAlign="center" maxW="700px" mx="auto">
        <chakra.h1
          lineHeight={{ md: "57px" }}
          fontWeight={"black"}
          fontSize={{ base: "3xl", md: "5xl" }}
          maxW={{ base: "300px", md: "full" }}
        >
          Working on some interesting things
        </chakra.h1>
        <chakra.p
          fontSize={{ base: "sm", md: "md" }}
          fontWeight={"medium"}
          mt={5}
        >
          Track your application process with the Appliqa App. Log your
          interviews and tasks, make notes, stay organized and be prepared for
          future opportunities.
        </chakra.p>
      </Center>
    </Container>
  );
};

export default LandingHeader;
