import Features from "@/components/homepage/Features";
import HeroSection from "@/components/homepage/HeroSection";
import LayoutProvider from "@/components/LayoutProvider";
// import FloatingElemet from "@/components/ui/FloatingElemet";

export default function Home() {
  return (
    <LayoutProvider className="w-full pt-32">
      <HeroSection />
      <Features />
      {/* <FloatingElemet /> */}
    </LayoutProvider>
  );
}
