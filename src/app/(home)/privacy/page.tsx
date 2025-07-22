import LayoutProvider from "@/components/LayoutProvider";

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
