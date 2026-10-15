import { Hero } from "../components/Hero";
import { ContactForm } from "../components/ContactForm";
import {
  HomeReach,
  HomeReferences,
  HomeResults,
  HomeSample,
  HomeServices,
} from "../components/home/HomeSections";
export function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <HomeServices />
      <HomeResults />
      <HomeReach />
      <HomeSample />
      <HomeReferences />
      <ContactForm endpoint={import.meta.env.VITE_CONTACT_ENDPOINT} />
    </div>
  );
}
