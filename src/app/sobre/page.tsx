import AboutSection from "@/components/sections/AboutSection";

export const revalidate = 120;

export default function SobrePage() {
  return (
    <div className="py-2">
      <AboutSection />
    </div>
  );
}