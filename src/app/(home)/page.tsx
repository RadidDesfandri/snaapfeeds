import HeroSection from "@/components/homepage/HeroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Photobooth | Snapfeeds",
  description:
    "Nikmati pengalaman photobooth online dengan mudah, seru, dan instan. Ambil foto langsung dari perangkat Anda, edit, dan cetak dengan kualitas terbaik. Cocok untuk event, pesta, dan kenangan spesial.",
  keywords: [
    "photobooth online",
    "photobox",
    "photobooth virtual",
    "photobooth event",
    "cetak foto instant",
    "photobooth online indonesia",
  ],
  alternates: {
    canonical: "https://www.snapfeeds.fun/",
  },
  openGraph: {
    title: "Online Photobooth | Snapfeeds",
    description:
      "Photobooth online seru untuk event dan kenangan spesial. Ambil foto, edit, dan cetak dengan mudah.",
    url: "https://www.snapfeeds.fun/",
    type: "website",
  },
  robots: {
    index: true, // boleh diindex
    follow: true, // boleh follow link di halaman ini. Kalau kamu punya halaman admin atau private → bisa pakai index: false.
  },
};

export default function Home() {
  return <HeroSection />;
}
