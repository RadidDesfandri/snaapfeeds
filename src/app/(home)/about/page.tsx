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
          Create and customize professional photobooth style images seamlessly
          from any device with our web-based platform. Select from a range of
          customization options, including frame colors, and instantly download
          4K photo strips and no account required. Our service is engineered for
          an intuitive creative experience, perfect for generating shareable
          digital keepsakes. Create studio-quality photo strips instantly, from
          any device
        </p>

        <ul className="list-disc pl-10 md:max-w-[600px]">
          <li>
            <b>Universal Accessibility:</b> No install or accounts required.
            Begin creating immediately on any computer, tablet, or smartphone.
          </li>
          <li>
            <b>High-Resolution Output:</b> Download crisp, 4K photo strips
            perfect for printing or digital sharing.
          </li>
          <li>
            <b>Intuitive Customization:</b> Effortlessly personalize your
            creations with a selection of professional frame colors and layouts.
          </li>
        </ul>

        <p className="font-poppins md:max-w-[600px]">
          Designed for streamlined creativity and generating high-impact,
          shareable content for any occasion.
        </p>
      </LayoutProvider>
    </main>
  );
};

export default About;
