import LayoutProvider from "@/components/LayoutProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Snapfeeds",
  description:
    "Baca kebijakan privasi Online Photobooth untuk mengetahui bagaimana kami mengelola data pengguna, keamanan informasi, dan perlindungan privasi Anda.",
  keywords: [
    "kebijakan privasi photobooth",
    "privacy policy photobooth online",
    "data pengguna photobox",
  ],
  alternates: {
    canonical: "https://www.snapfeeds.fun/privacy",
  },
  openGraph: {
    title: "Kebijakan Privasi | Snapfeeds",
    description:
      "Pelajari bagaimana Online Photobooth menjaga dan melindungi data pengguna Anda.",
    url: "https://www.snapfeeds.fun/",
    type: "website",
  },
  robots: {
    index: true, // boleh diindex. Kalau kamu punya halaman admin atau private → bisa pakai index: false.
    follow: true, // boleh follow link di halaman ini
  },
};

const Privacy = () => {
  return (
    <main>
      <LayoutProvider className="flex-col items-start gap-3 pt-24" center>
        <h1 className="font-poppins text-4xl font-black md:text-5xl">
          Privacy and Policy
        </h1>
        <h2 className="font-poppins text-lg font-semibold">
          Your Privacy Isn&apos;t a Feature, It&apos;s Our Architecture.
        </h2>
        <p className="font-poppins md:max-w-[600px]">
          We believe your data is yours, period. This commitment is the
          foundation of our Photobooth app, which is fundamentally designed to
          operate <b>exclusively on your device.</b>
        </p>
        <p className="font-poppins md:max-w-[600px]">
          The entire process—from capturing an image to personalization—happens
          locally in your browser. This means {` `}
          <b>
            your photos are never uploaded, transferred, or touch our servers at
            all.{` `}
          </b>
          Because of this design, it is technically impossible for us to view,
          collect, or share your memories.
        </p>
      </LayoutProvider>
    </main>
  );
};

export default Privacy;
