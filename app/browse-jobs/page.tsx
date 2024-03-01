import LandingNavbar from "../../components/landing/LandingNavbar";
import { BrowseJobs } from "../../containers/browse-jobs/BrowseJobs";
import { BrowseJobsNavbar } from "../../containers/browse-jobs/components/BrowseJobsNavbar";

export type BrowseJobsProps = {
  searchParams: {
    search?: string;
    category?: string;
    experience?: string;
    page: number;
  };
};

export default function Page(props: BrowseJobsProps) {
  return (
    <>
      <BrowseJobsNavbar />
      <BrowseJobs filterValues={props.searchParams} />
    </>
  );
}
