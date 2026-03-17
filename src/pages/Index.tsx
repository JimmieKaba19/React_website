import { Layout } from "@/components/layout";
import {
  Hero,
  PracticesSection,
  PartnersCarousel,
  // FlagshipSolution,
  SolutionsGrid,
  IndustriesSection,
  RegionsSection,
  CTASection,
} from "@/components/home";

// making updates to the project, removing the partners carousel and replacing with practices

const Index = () => {
  return (
    <Layout>
      <Hero />     
      <PracticesSection />
      {/* <FlagshipSolution /> */}
      <SolutionsGrid />
      <IndustriesSection />
      <RegionsSection />
      <PartnersCarousel />
      <CTASection />
    </Layout>
  );
};

export default Index;
