import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustMetrics from "@/components/TrustMetrics";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <TrustMetrics />
      <CTA />
      <Footer />
    </>
  );
}