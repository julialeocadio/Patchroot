import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChoose from "@/components/WhyChoose";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <WhyChoose />
      <CTA />
      <Footer />
    </>
  );
}