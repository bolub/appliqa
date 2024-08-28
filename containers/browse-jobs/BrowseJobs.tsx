"use client";

import { Container, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchAllJobs } from "../../API/jobs";
import SingleJob from "../../components/jobs/SingleJob";
import Loader from "../../components/UI/Loader";
import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
  PaginationSeparator,
} from "@ajna/pagination";
import JobSites from "../../components/jobs/JobSites";
import JobInterviewTips from "../../components/jobs/JobInterviewTips";
import BrowseJobsLoader from "../../components/UI/Loaders/BrowseJobsLoader";
import CustomSeo from "../../components/UI/CustomSeo";
import { Filters } from "./components/Filters";
import { BrowseJobsProps } from "../../app/browse-jobs/page";
import { useQueryParamsActions } from "../../hooks/useQueryParamsActions";
import { useFilterParams } from "./hooks/useFilterParams";

export const BrowseJobs = ({
  filterValues,
}: {
  filterValues: BrowseJobsProps["searchParams"];
}) => {
  const { category, experience, page, search } = filterValues;

  const currentPage = Number(page) || 1;

  const { setQueryParam } = useQueryParamsActions();

  const [allJobs, setAllJobs] = useState<any>([]);
  const [pageCount, setPageCount] = useState(1);

  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const { categories, experiences } = useFilterParams(category, experience);

  const combineFilters = () => {
    const newCategories = categories?.map((cd: string, index) => {
      const isLast = index === categories?.length - 1;

      return `category=${cd}${!isLast ? "&" : ""}`;
    });

    const newLevels = experiences?.map((cd: string, index) => {
      const isLast = index === experiences?.length - 1;

      return `level=${cd}${!isLast ? "&" : ""}`;
    });

    const posted_date = "";

    return `posted_date=${posted_date}&${newCategories.join(
      ""
    )}&${newLevels.join("")}`;
  };

  const searchJobs = (jobs: any) => {
    if (!search || search === "") return allJobs;

    return [...jobs].filter((job: any) => {
      return `${job.name.toLowerCase()}`.includes(search.toLowerCase());
    });
  };

  const { status } = useQuery(
    ["jobs", currentPage, category, experience],
    () => fetchAllJobs(currentPage, combineFilters()),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setAllJobs(data?.results);

        setPageCount(data?.page_count >= 99 ? 99 : data?.page_count);

        setIsMoreLoading(false);
      },
    }
  );

  const handlePageChange = (nextPage: number): void => {
    setIsMoreLoading(true);
    window.scrollTo({
      top: 0,
    });

    setQueryParam({
      name: "page",
      value: nextPage,
      pathname: "/browse-jobs",
    });
  };

  const jobsToDisplay = searchJobs(allJobs);

  return (
    <Container maxW="7xl" py={{ base: 12, md: 20 }}>
      <CustomSeo title="Browse Jobs" />

      <Heading as="h1" fontWeight={"black"} fontSize="2xl">
        Browse Jobs
      </Heading>

      <Filters activeCategories={categories} activeExperiences={experiences} />

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 1, md: 10 }}
        mt={6}
      >
        <JobSites />

        <JobInterviewTips />
      </SimpleGrid>

      <Loader
        status={status}
        isLoading={isMoreLoading}
        loader={<BrowseJobsLoader />}
        length={jobsToDisplay?.length}
      >
        <VStack align={"start"} w="full" spacing={10} mt={10}>
          {/* @ts-ignore */}
          {jobsToDisplay?.map((job: any, index) => {
            return <SingleJob key={index} job={job} />;
          })}

          {/* @ts-ignore */}
          <Pagination
            pagesCount={pageCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          >
            <PaginationContainer
              w={{ base: "auto", md: "full" }}
              justifyContent={"space-between"}
            >
              <PaginationPrevious variant={"outline"}>
                Previous
              </PaginationPrevious>
              <PaginationPageGroup
                mx={3}
                display={{ base: "none", md: "flex" }}
                separator={
                  <PaginationSeparator
                    bg="gray.100"
                    fontSize="sm"
                    py={2}
                    px={3}
                    jumpSize={5}
                  />
                }
              >
                {/* {pages.map((page: number) => (
                  <PaginationPage
                    _current={{
                      bg: "green.50",
                      color: "green.600",
                      borderWidth: "1px",
                      borderColor: "green.600",
                    }}
                    _hover={{
                      bg: "green.50",
                      color: "green.600",
                      borderWidth: "1px",
                      borderColor: "green.600",
                    }}
                    py={2}
                    px={4}
                    key={`pagination_page_${page}`}
                    page={page}
                  />
                ))} */}
              </PaginationPageGroup>
              <PaginationNext variant={"outline"}>Next</PaginationNext>
            </PaginationContainer>
          </Pagination>
        </VStack>
      </Loader>
    </Container>
  );
};
