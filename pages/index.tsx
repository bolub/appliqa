import type { NextPage } from "next";
import Footer from "../components/landing/Footer";
import LandingNavbar from "../components/landing/LandingNavbar";
import CustomSeo from "../components/UI/CustomSeo";
import { BrowseJobs } from "../containers/browse-jobs/BrowseJobs";

const Home: NextPage = () => {
  return (
    <>
      <CustomSeo title="Home" />
      <LandingNavbar />
      <main>
        <BrowseJobs
          filterValues={{
            search: "",
            category: "",
            experience: "",
            page: 1,
          }}
        />
      </main>
      <Footer />
    </>
  );
};

export default Home;
