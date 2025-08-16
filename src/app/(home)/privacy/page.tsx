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
        <h1 className="font-poppins text-5xl font-black">Privacy Policy</h1>
        <p className="font-poppins md:max-w-[600px]">
          We believe your data should stay yours. That&apos;s why our Photobooth
          App is built to operate entirely on your device. We don&apos;t
          collect, store online, or share any of your information or photos.
          Your images are processed locally within your browser, remaining
          completely under your control. Rest assured, there are no uploads, no
          tracking, and no secret stashes of your memories.
        </p>
      </LayoutProvider>
    </main>
  );
};

export default Privacy;
