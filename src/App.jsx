import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-[#FBFFE4] text-[#2F2F2F] overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
