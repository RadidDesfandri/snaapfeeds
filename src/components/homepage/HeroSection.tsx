import { Camera, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LayoutProvider from "../LayoutProvider";
import { ButtonMoving } from "../ui/button-moving";

const HeroSection = () => {
  return (
    <LayoutProvider className="w-full md:pt-20" center>
      <div className="relative flex min-h-80 w-full items-center justify-center rounded-3xl bg-gray-100 shadow md:min-h-[450px]">
        <div className="absolute left-14 hidden lg:block">
          <Image
            src="/photo-layouts/layout-a.png"
            alt="Photobooth"
            width={400}
            height={400}
            className="w-44"
          />
        </div>
        <div className="absolute right-14 hidden lg:block">
          <Image
            src="/photo-layouts/layout-b.png"
            alt="Photobooth"
            width={400}
            height={400}
            className="w-44"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <Image
            src="/title-hero-section.png"
            alt="Title hero section"
            width={400}
            height={400}
            className="w-[450px]"
          />

          <p className="font-poppins text-center text-sm font-medium">
            Transform your photo into stunning masterpiece with our AI-powered{" "}
            <br className="hidden md:block" />
            online photo booth. No download, no waiting - just pure creative{" "}
            <br className="hidden md:block" /> magic at your fingertips
          </p>

          <Link href="/chose-layout" className="mt-3">
            <ButtonMoving className="flex cursor-pointer items-center gap-2 px-5 py-1">
              <Camera /> Start Taking Photos <ChevronRight />
            </ButtonMoving>
          </Link>
        </div>
      </div>
    </LayoutProvider>
  );
};

export default HeroSection;

{
  /* <div className="mt-4 grid grid-cols-3 gap-3 md:gap-8">
        <div className="text-center">
          <div className="mb-2 flex items-center justify-center">
            <Users className="mr-2 h-5 w-5 text-pink-400 md:h-6 md:w-6" />
            <span className="text-xl font-bold text-black md:text-2xl">
              50K+
            </span>
          </div>
          <p className="text-sm text-gray-500">Happy Users</p>
        </div>
        <div className="text-center">
          <div className="mb-2 flex items-center justify-center">
            <Trophy className="mr-2 h-5 w-5 text-violet-400 md:h-6 md:w-6" />
            <span className="text-xl font-bold text-black md:text-2xl">
              1M+
            </span>
          </div>
          <p className="text-sm text-gray-500">Photos Created</p>
        </div>
        <div className="text-center">
          <div className="mb-2 flex items-center justify-center">
            <Zap className="mr-2 h-5 w-5 text-yellow-400 md:h-6 md:w-6" />
            <span className="text-xl font-bold text-black md:text-2xl">2s</span>
          </div>
          <p className="text-sm text-gray-500">Processing Time</p>
        </div>
      </div> */
}
