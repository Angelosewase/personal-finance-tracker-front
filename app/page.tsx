import HeroSection from "@/components/hero-section";
import Features from "@/components/features-1";
import Testimonials from "@/components/testimonials";
import CallToAction from "@/components/call-to-action";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="">
      <HeroSection />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
