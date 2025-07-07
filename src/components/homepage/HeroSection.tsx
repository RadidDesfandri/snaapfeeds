import Button from "@/components/ui/button";
import {
  Camera,
  ChevronRight,
  Play,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 pb-16">
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <div className="flex h-20 w-20 rotate-3 transform animate-pulse items-center justify-center rounded-2xl bg-black">
            <Camera className="h-11 w-11 text-white" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 h-8 w-8 animate-spin text-yellow-400" />
        </div>
      </div>

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

      <div className="mt-2 flex items-center gap-3">
        <Button className="rounded-full" asChild>
          <Link href="/chose-layout">
            <Camera /> Start Taking Photos <ChevronRight />
          </Link>
        </Button>

        <Button className="rounded-full" variant="outline">
          <Play /> Watch Demo
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 md:gap-8">
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
      </div>
    </div>
  );
};

export default HeroSection;
