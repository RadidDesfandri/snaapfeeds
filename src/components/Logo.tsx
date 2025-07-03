import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/logo-no-bg.png"
      alt="Logo"
      width={200}
      height={200}
      priority
      className="w-40 md:w-52"
    />
  );
};

export default Logo;
