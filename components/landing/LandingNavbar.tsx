import { Container, chakra, Button, HStack, Avatar } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AUTH_ROUTES, DASHBOARD_ROUTES } from "../../utils/routes";
import Logo from "../UI/Logo";

const LandingNavbar = () => {
  const pathname = usePathname();

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

        <HStack ml="auto" display={{ base: "none", md: "flex" }}>
          {pathname !== DASHBOARD_ROUTES.JOBS && (
            <Link href={DASHBOARD_ROUTES.JOBS}>
              <Button variant={"ghost"}>Browse jobs</Button>
            </Link>
          )}

          {getCookie("USER_AUTHENTICATED") ? (
            <Link href={DASHBOARD_ROUTES.ANALYTICS}>
              <Button variant={"ghost"}>
                <Avatar
                  w="36px"
                  h="36px"
                  p="1"
                  bg="white"
                  src="https://api.dicebear.com/7.x/bottts/svg"
                  mr={2}
                />
                My account
              </Button>
            </Link>
          ) : (
            <>
              <Link href={AUTH_ROUTES.SIGNUP}>
                <Button colorScheme={"green"}>Get Started 😇</Button>
              </Link>
            </>
          )}
        </HStack>
      </Container>
    </chakra.nav>
  );
};

export default LandingNavbar;
