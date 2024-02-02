import { Box, Center, Flex, Image } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import Logo from "../UI/Logo";

interface Props {
  imgSrc?: string;
  children: ReactNode;
}

const AuthLayout: FC<Props> = ({ children, imgSrc }) => {
  return (
    <Flex h="100vh" overflowY={{ md: "hidden" }}>
      <Center w={{ base: "100%", md: "50%" }} py={10} px={{ base: 10, md: 36 }}>
        <Box w={{ base: "100%" }} maxW="md">
          <Logo />
          {children}
        </Box>
      </Center>

      <Box
        d={{ base: "none", md: "flex" }}
        w={{ base: "100%", md: "50%" }}
        bg="green.50"
        p={10}
        justifyContent="center"
        alignItems="center"
      >
        {imgSrc && <Image src={imgSrc} alt="layout illustration" />}
      </Box>
    </Flex>
  );
};

export default AuthLayout;
