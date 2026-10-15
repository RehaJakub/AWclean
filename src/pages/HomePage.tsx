import { Hero } from "../components/Hero";
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
    </div>
  );
}
