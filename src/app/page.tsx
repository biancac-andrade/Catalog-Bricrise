import HeroSection from "@/components/sections/HeroSection";
import HomeFrontsSection from "@/components/sections/HomeFrontsSection";

export const revalidate = 120;

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeFrontsSection />
    </>
  );
}