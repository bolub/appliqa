import {
  chakra,
  Container,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Button,
  Text,
  Avatar,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HiOutlineMenu } from "react-icons/hi";
import { useRecoilValue } from "recoil";
import { profileState } from "../../../recoil/profile";
import { logout } from "../../../utils/functions";
import { AUTH_ROUTES, DASHBOARD_ROUTES } from "../../../utils/routes";
import CustomLink from "../CustomLink";
import Logo from "../Logo";
import AllBoards from "./AllBoards";
import NavItem from "./NavItem";
import SideNavItem from "./SideNavItem";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  return (
    <chakra.nav bg="green.500" h="68px" display="flex" alignItems={"center"}>
      <Container maxW="7xl" display="flex">
        <chakra.button
          aria-label="Menu"
          color="white"
          mr={5}
          p={2}
          borderRadius="lg"
          display={{ base: "inline", md: "none" }}
          onClick={onOpen}
        >
          <HiOutlineMenu size="18px" />
        </chakra.button>

        <CustomLink href="/analytics" containerProps={{ my: "auto", mr: 20 }}>
          <Logo color="#ffffff" />
        </CustomLink>

        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          <NavItem
            className="my-first-step"
            label="Analytics"
            href={DASHBOARD_ROUTES.ANALYTICS}
          />
          <NavItem
            className="goals"
            label="Goals"
            href={DASHBOARD_ROUTES.GOALS}
          />
          <AllBoards />
          <NavItem
            className="browse-jobs"
            label="Browse Jobs (beta)"
            href={DASHBOARD_ROUTES.JOBS}
            isExternal
          />
          <NavItem
            className="contacts"
            label="Contacts"
            href={DASHBOARD_ROUTES.CONTACTS}
          />
        </HStack>

        <HStack ml={"auto"} spacing={3}>
          <Button
            variant={"ghost"}
            color="white"
            _hover={{
              color: "white",
              bg: "green.700",
            }}
            _active={{
              color: "white",
              bg: "green.700",
            }}
            colorScheme={"green"}
            transition="all 0.3s"
            onClick={() => {
              if (router.asPath.includes("tour")) {
                router.push(router.asPath);
              } else {
                router.push(`${router.asPath}?tour=true`);
              }
            }}
            px={3}
          >
            <HStack display={{ base: "none", md: "inline" }}>
              <Text as="span" fontSize={"lg"}>
                🚀
              </Text>
              <Text as="span">Take tour</Text>
            </HStack>
          </Button>

          <Button
            variant={"ghost"}
            color="white"
            _hover={{
              color: "white",
              bg: "green.700",
            }}
            _active={{
              color: "white",
              bg: "green.700",
            }}
            colorScheme={"green"}
            transition="all 0.3s"
            onClick={() => {
              window.location.href = "javascript:void(Tawk_API.toggle())";
            }}
            px={3}
          >
            <HStack>
              <Text as="span" fontSize={"lg"}>
                🙋
              </Text>
              <Text as="span" display={{ base: "none", md: "inline" }}>
                Help
              </Text>
            </HStack>
          </Button>

          <Menu autoSelect={false}>
            <MenuButton pl={{ md: 5 }} aria-label="profile" color="white">
              {/* <HiUserCircle /> */}

              <Avatar
                w="36px"
                h="36px"
                p="1"
                bg="white"
                src="https://api.dicebear.com/7.x/bottts/svg"
              />
            </MenuButton>
            <MenuList>
              <CustomLink href={DASHBOARD_ROUTES.PROFILE}>
                <MenuItem fontSize={"md"}>My Profile</MenuItem>
              </CustomLink>
              <Link href="/">
                <MenuItem fontSize={"md"}>Go to Homepage</MenuItem>
              </Link>
              <CustomLink href={AUTH_ROUTES.LOGIN}>
                <MenuItem fontSize={"md"} onClick={logout}>
                  Logout
                </MenuItem>
              </CustomLink>
            </MenuList>
          </Menu>
        </HStack>

        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          // finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Logo containerProps={{ my: "auto", mr: 20 }} />
            </DrawerHeader>

            <DrawerBody>
              <VStack spacing={4} align="start">
                <SideNavItem
                  className="my-first-step"
                  label="Analytics"
                  href={DASHBOARD_ROUTES.ANALYTICS}
                  close={onClose}
                />
                <SideNavItem
                  className="goals"
                  label="Goals"
                  href={DASHBOARD_ROUTES.GOALS}
                  close={onClose}
                />
                <AllBoards isMobile />
                <SideNavItem
                  className="browse-jobs"
                  label="Browse Jobs (beta)"
                  href={DASHBOARD_ROUTES.JOBS}
                  close={onClose}
                  isExternal
                />
                <SideNavItem
                  className="contacts"
                  label="Contacts"
                  href={DASHBOARD_ROUTES.CONTACTS}
                  close={onClose}
                />
              </VStack>
            </DrawerBody>

            {/* <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter> */}
          </DrawerContent>
        </Drawer>
      </Container>
    </chakra.nav>
  );
};

export default Navbar;
