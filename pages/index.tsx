import type { NextPage } from 'next';
import CallToAction from '../components/landing/CallToAction';
import DiscoverJobs from '../components/landing/DiscoverJobs';
import Footer from '../components/landing/Footer';
import LandingHeader from '../components/landing/LandingHeader';
import LandingNavbar from '../components/landing/LandingNavbar';
import ManageProcess from '../components/landing/ManageProcess';

const Home: NextPage = () => {
  return (
    <>
      <LandingNavbar />
      <LandingHeader />
      <main>
        <ManageProcess />
        <DiscoverJobs />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default Home;
