import LayoutProvider from "@/components/LayoutProvider";

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
