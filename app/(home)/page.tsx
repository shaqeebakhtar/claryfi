import Cta from './_components/cta';
import Features from './_components/features';
import Footer from './_components/footer';
import Hero from './_components/hero';
import HowItWorks from './_components/how-it-works';
import Navbar from './_components/navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Cta />
      </main>
      <Footer />
    </>
  );
};

export default Home;
