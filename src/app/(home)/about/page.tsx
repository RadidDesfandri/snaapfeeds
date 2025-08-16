import LayoutProvider from "@/components/LayoutProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami | Snapfeeds",
  description:
    "Kenali lebih dekat Online Photobooth, layanan photobox digital yang menghadirkan pengalaman seru, mudah, dan praktis. Cocok untuk berbagai acara seperti pernikahan, ulang tahun, dan event perusahaan.",
  keywords: [
    "tentang photobooth",
    "photobox digital",
    "photobooth online",
    "photobooth event indonesia",
  ],
  alternates: {
    canonical: "https://www.snapfeeds.fun/about",
  },
  openGraph: {
    title: "Tentang Kami | Snapfeeds",
    description:
      "Kenali Online Photobooth lebih dekat – layanan photobox digital untuk berbagai event spesial Anda.",
    url: "https://www.snapfeeds.fun/",
    type: "website",
  },
  robots: {
    index: true, // boleh diindex
    follow: true, // boleh follow link di halaman ini. Kalau kamu punya halaman admin atau private → bisa pakai index: false.
  },
};

const About = () => {
  return (
    <main>
      <LayoutProvider className="flex-col items-start gap-3 pt-24" center>
        <h1 className="font-poppins text-5xl font-black">About Us</h1>
        <p className="font-poppins md:max-w-[600px]">
          Instantly capture and personalize photobooth-style memories from any
          device, anywhere, with our online tool. Choose from frame colors and
          download high-resolution photo strips, no accounts needed. It&apos;s
          designed for effortless creativity and shareable online fun.
        </p>
      </LayoutProvider>
    </main>
  );
};

export default About;
