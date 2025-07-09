import { Slot } from "@radix-ui/react-slot";
import Image, { ImageProps } from "next/image";

type LogoProps = {
  asChild?: boolean;
} & Omit<ImageProps, "src" | "alt">;

const Logo = ({ asChild, ...props }: LogoProps) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp>
      <Image
        src="/logo-no-bg.png"
        alt="Logo"
        width={200}
        height={200}
        priority
        className="w-40 md:w-52"
        {...props}
      />
    </Comp>
  );
};

export default Logo;
