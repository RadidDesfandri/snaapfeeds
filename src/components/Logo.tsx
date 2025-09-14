import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import Image, { ImageProps } from "next/image";

type LogoProps = {
  asChild?: boolean;
} & Omit<ImageProps, "src" | "alt">;

const Logo = ({ asChild, className, ...props }: LogoProps) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp>
      <Image
        src="/newlogo-black.png"
        alt="Logo"
        width={200}
        height={200}
        priority
        className={cn("w-40 md:w-52", className)}
        {...props}
      />
    </Comp>
  );
};

export default Logo;
