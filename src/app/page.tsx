import { HeroSection } from "./_sections/HeroSection";
import { CapabilityStrip } from "./_sections/CapabilityStrip";
import { StackedServices } from "./_sections/StackedServices";
import { SiteWideFlowMap } from "@/components/motion/SiteWideFlowMap";
import { CaseStudiesGallery } from "./_sections/CaseStudiesGallery";
import { ProcessTeaser } from "./_sections/ProcessTeaser";
import { RentTeaser } from "./_sections/RentTeaser";
import { CTABand } from "./_sections/CTABand";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionDivider variant="line" />
      <CapabilityStrip />
      <SectionDivider variant="dot" />
      <StackedServices />
      <SectionDivider variant="wave" />
      <SiteWideFlowMap />
      <SectionDivider variant="wave" />
      <CaseStudiesGallery />
      <SectionDivider variant="dot" />
      <ProcessTeaser />
      <SectionDivider variant="line" />
      <RentTeaser />
      <SectionDivider variant="wave" />
      <CTABand />
    </>
  );
}
