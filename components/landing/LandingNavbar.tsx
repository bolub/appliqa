import { Container, chakra } from "@chakra-ui/react";
import Logo from "../UI/Logo";

const LandingNavbar = () => {
  return (
    <chakra.nav
      bg="white"
      h="90px"
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Container maxW="7xl" display="flex" px={{ base: 4 }}>
        <Logo containerProps={{ my: "auto", mr: 20 }} />
      </Container>
    </chakra.nav>
  );
};

export default LandingNavbar;
