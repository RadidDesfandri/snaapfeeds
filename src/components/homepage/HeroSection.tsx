"use client";

import { Camera, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LayoutProvider from "../LayoutProvider";
import { ButtonMoving } from "../ui/button-moving";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  {
    mobile: "/hero-mobile.JPG",
    desktop: "/hero-desktop.JPG",
    position: "bg-cover bg-center",
  },
  {
    mobile: "/hero-mobile2.JPG",
    desktop: "/hero-desktop2.JPG",
    position: "bg-cover bg-bottom",
  },
  {
    mobile: "/hero-mobile3.JPG",
    desktop: "/hero-desktop3.JPG",
    position: "bg-cover bg-top",
  },
  // {
  //   mobile: "/hero-mobile4.JPG",
  //   desktop: "/hero-desktop4.JPG",
  //   position: "bg-cover bg-right",
  // },
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  const currentImage = heroImages[currentImageIndex];

  return (
    <div className="relative overflow-hidden">
      {/* Background Images Container */}
      <div className="absolute inset-0 bg-black/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={`absolute inset-0 ${currentImage.position}`}
            style={{
              backgroundImage: `url(${currentImage.mobile})`,
            }}
          />
        </AnimatePresence>

        {/* Desktop Background - Hidden on mobile */}
        <div className="absolute inset-0 hidden bg-black/50 md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={`desktop-${currentImageIndex}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`absolute inset-0 ${currentImage.position}`}
              style={{
                backgroundImage: `url(${currentImage.desktop})`,
              }}
            />
          </AnimatePresence>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <LayoutProvider className="relative z-10 w-full md:pt-20" center>
        <div className="relative flex min-h-80 w-full items-center justify-center rounded-3xl bg-gray-100/30 shadow md:min-h-80">
          <motion.div
            className="flex flex-col items-center justify-center gap-3 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h1
              className="font-poppins text-center text-3xl font-bold md:text-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Snap your moment
            </motion.h1>

            <motion.p
              className="font-poppins text-center text-sm font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Welcome to Snapfeeds! Your go-to spot for creating awesome
              photobooth photos in <br className="hidden lg:block" /> stunning
              4K quality, directly in your browser. Anytime, anywhere, and free.
              Snap your fun <br className="hidden lg:block" /> moments and
              instantly share them to your favorite social media without any
              hassle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <Link href="/choose-layout" className="mt-3">
                <ButtonMoving className="flex cursor-pointer items-center gap-2 px-5 py-1">
                  <Camera /> Start Taking Photos <ChevronRight />
                </ButtonMoving>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </LayoutProvider>

      {/* Image Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 transform">
        <div className="flex gap-2">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white shadow-lg"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + index * 0.1 }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute right-0 bottom-0 left-0 z-20 h-1 bg-white/20">
        <motion.div
          className="h-full bg-white/80"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
          key={currentImageIndex}
        />
      </div>
    </div>
  );

  // return (
  //   <div className="bg-[url('/hero-mobile2.JPG')] bg-cover bg-bottom md:bg-[url('/hero-desktop2.JPG')]">
  //     <LayoutProvider className="w-full md:pt-20" center>
  //       <div className="relative flex min-h-80 w-full items-center justify-center rounded-3xl bg-gray-100/30 shadow md:min-h-80">
  //         <div className="flex flex-col items-center justify-center gap-3 text-white">
  //           <h1 className="font-poppins text-center text-3xl font-bold md:text-4xl">
  //             Snap your moment
  //           </h1>

  //           <p className="font-poppins text-center text-sm font-medium">
  //             Welcome to Snapfeeds! Your go-to spot for creating awesome
  //             photobooth photos in <br className="hidden lg:block" /> stunning
  //             4K quality, directly in your browser. Anytime, anywhere, and free.
  //             Snap your fun <br className="hidden lg:block" /> moments and
  //             instantly share them to your favorite social media without any
  //             hassle.
  //           </p>

  //           <Link href="/choose-layout" className="mt-3">
  //             <ButtonMoving className="flex cursor-pointer items-center gap-2 px-5 py-1">
  //               <Camera /> Start Taking Photos <ChevronRight />
  //             </ButtonMoving>
  //           </Link>
  //         </div>
  //       </div>
  //     </LayoutProvider>
  //   </div>
  // );
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
