import {
  Container,
  chakra,
  Button,
  HStack,
  Link,
  Avatar,
} from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { useRecoilValue } from "recoil";
import { profileState } from "../../recoil/profile";
import { AUTH_ROUTES, DASHBOARD_ROUTES } from "../../utils/routes";
import Logo from "../UI/Logo";

const LandingNavbar = () => {
  const username = useRecoilValue(profileState)?.username;
  const pathname = usePathname();

  return (
    <chakra.nav
      bg="white"
      h="90px"
      d="flex"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Container maxW="7xl" d="flex" px={{ base: 4 }}>
        <Logo containerProps={{ my: "auto", mr: 20 }} />

        <HStack ml="auto" d={{ base: "none", md: "flex" }}>
          {pathname !== DASHBOARD_ROUTES.JOBS && (
            <Link href={DASHBOARD_ROUTES.JOBS} isExternal>
              <Button variant={"ghost"}>Browse jobs</Button>
            </Link>
          )}

          {getCookie("USER_AUTHENTICATED") ? (
            <Link href={DASHBOARD_ROUTES.ANALYTICS} isExternal>
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
              <Link href={AUTH_ROUTES.SIGNUP} isExternal>
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
