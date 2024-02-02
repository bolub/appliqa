import { Flex, FlexProps } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

const Card: FC<{ flexProps?: FlexProps; children: ReactNode }> = ({
  children,
  flexProps,
}) => {
  return (
    <Flex
      flexDir={"column"}
      w="full"
      borderWidth="1.4px"
      borderColor={"green.500"}
      bg="green.100"
      _hover={{
        bg: "green.500",
        color: "white",
      }}
      transition="all 0.2s"
      color="green.500"
      cursor={"pointer"}
      borderRadius="8px"
      py={4}
      px={{ base: 4, md: 8 }}
      {...flexProps}
    >
      {children}
    </Flex>
  );
};

export default Card;
