"use client";

import {
  Badge,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack,
} from "@chakra-ui/react";
import { HiChevronDown } from "react-icons/hi";
import { useQueryParamsActions } from "../../../hooks/useQueryParamsActions";
import { Options } from "../../../utils/GeneralProps";
import { Experience, jobCategories } from "./data";
import { DebouncedSearchInput } from "./DebouncedSearchInput";

export const Filters = ({
  activeCategories,
  activeExperiences,
}: {
  activeCategories: string[];
  activeExperiences: string[];
}) => {
  const { setQueryParam } = useQueryParamsActions();

  const filters = {
    posted_date: "",
    categories: [],
    experience: [],
  };

  return (
    <Flex flexDir={{ base: "column", md: "row" }} mt={{ base: 5, md: 10 }}>
      <DebouncedSearchInput
        maxW="400px"
        my="auto"
        onChange={(value) => {
          setQueryParam({
            name: "search",
            value: value as string,
          });
        }}
      />

      <Stack
        direction={{ base: "column", md: "row" }}
        ml={{ md: "auto" }}
        mt={{ base: "5", md: 0 }}
        spacing={{ base: 1, md: 2 }}
      >
        {/* Category */}
        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            w={{ base: "full", md: "160px" }}
            variant="ghost"
            borderWidth={{ base: "1px", md: 0 }}
            color="gray.500"
            fontWeight={"bold"}
            rightIcon={
              <Icon as={HiChevronDown} fontSize="lg" color="gray.600" />
            }
          >
            Category
            {filters?.categories?.length > 0 && (
              <Badge ml={2} fontWeight="bold" fontSize={"sm"}>
                {filters?.categories?.length}
              </Badge>
            )}
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              type="checkbox"
              onChange={(value) => {
                if (Array.isArray(value)) {
                  const joinedValues = value.join(",");

                  setQueryParam({
                    name: "category",
                    value: joinedValues,
                  });
                } else {
                  setQueryParam({
                    name: "category",
                    value,
                  });
                }
              }}
              value={activeCategories}
            >
              {jobCategories?.map((d: Options) => {
                return (
                  <MenuItemOption key={d.value} value={d.value}>
                    {d.label}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </Menu>

        {/* Experience */}
        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            w={{ base: "full", md: "170px" }}
            variant="ghost"
            borderWidth={{ base: "1px", md: 0 }}
            color="gray.500"
            fontWeight={"bold"}
            rightIcon={
              <Icon as={HiChevronDown} fontSize="lg" color="gray.600" />
            }
          >
            Experience
            {filters?.experience?.length > 0 && (
              <Badge ml={2} fontWeight="bold" fontSize={"sm"}>
                {filters?.experience?.length}
              </Badge>
            )}
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              type="checkbox"
              onChange={(value: string | string[]) => {
                if (Array.isArray(value)) {
                  const joinedValues = value.join(",");

                  setQueryParam({
                    name: "experience",
                    value: joinedValues,
                  });
                } else {
                  setQueryParam({
                    name: "experience",
                    value,
                  });
                }
              }}
              value={activeExperiences}
            >
              {Experience?.map((d: Options) => {
                return (
                  <MenuItemOption key={d.value} value={d.value}>
                    {d.label}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Stack>
    </Flex>
  );
};
