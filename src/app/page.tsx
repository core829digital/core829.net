import { HeroSection } from "./_sections/HeroSection";
import { CapabilityStrip } from "./_sections/CapabilityStrip";
import { StackedServices } from "./_sections/StackedServices";
import { FlowMapSection } from "./_sections/FlowMapSection";
import { CaseStudiesGallery } from "./_sections/CaseStudiesGallery";
import { ProcessTeaser } from "./_sections/ProcessTeaser";
import { RentTeaser } from "./_sections/RentTeaser";
import { CTABand } from "./_sections/CTABand";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CapabilityStrip />
      <StackedServices />
      <FlowMapSection />
      <CaseStudiesGallery />
      <ProcessTeaser />
      <RentTeaser />
      <CTABand />
    </>
  );
}
