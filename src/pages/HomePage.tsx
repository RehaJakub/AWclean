import { TrustBar } from "../components/TrustBar";
import { About } from "../components/About";
import { Hero } from "../components/Hero";
import { ServiceGrid } from "../components/ServiceGrid";
import { WhyUs } from "../components/WhyUs";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { Process } from "../components/Process";
import { Press } from "../components/Press";
import { ContactForm } from "../components/ContactForm";
import { services } from "../data/services";
import { comparisons } from "../data/references";
export function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <TrustBar />
      <BeforeAfterSlider items={comparisons} />
      <ServiceGrid services={services} />
      <About />
      <WhyUs />
      <Process />
      <Press />
      <ContactForm endpoint={import.meta.env.VITE_CONTACT_ENDPOINT} />
    </div>
  );
}
