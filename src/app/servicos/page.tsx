import ServicesSection from "@/components/sections/ServicesSection";

export const revalidate = 120;

export default function ServicosPage() {
  return (
    <div className="py-2">
      <ServicesSection />
    </div>
  );
}