"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Camera } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LayoutProvider from "../LayoutProvider";
import Button from "../ui/button";
import { ButtonMoving } from "../ui/button-moving";

const heroImages = [
  {
    mobile: "/hero-sections/hero-mobile.JPG",
    desktop: "/hero-sections/hero-desktop.JPG",
    position: "bg-cover bg-left",
  },
  {
    mobile: "/hero-sections/hero-mobile2.JPG",
    desktop: "/hero-sections/hero-desktop2.JPG",
    position: "bg-cover bg-bottom",
  },
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = heroImages[currentImageIndex];

  return (
    <LayoutProvider className="relative w-full pt-10" center>
      {/* Desktop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={cn(
            "relative hidden h-full min-h-[700px] w-full items-center overflow-hidden rounded-2xl bg-black/80 md:flex md:min-h-[480px]",
            currentImage.position,
          )}
          style={{
            backgroundImage: `url(${currentImage.desktop})`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={cn(
              "absolute",
              "md:top-0 md:left-0 md:h-full md:w-[65%]",
              "bg-gradient-to-r backdrop-blur-sm md:from-black/50 md:to-transparent",
              "md:[mask-image:linear-gradient(to_right,black_60%,transparent_100%)]",
            )}
          />

          {/* Konten di atas blur */}
          <div className="font-poppins relative z-10 flex flex-col gap-4 p-12 text-white">
            <motion.span
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
              }}
              className="w-fit rounded-full border border-purple-200/20 bg-purple-300/30 p-1 px-2 text-center text-xs backdrop-blur-md"
            >
              Capture your best vibe
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="max-w-[50%] text-4xl font-bold md:text-5xl"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                Snapfeeds
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-purple-300"
              >
                &mdash;
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                Capture Fun in 4K, Anytime, Anywhere
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.9,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="mt-2 max-w-[50%] text-sm text-gray-200"
            >
              Snap, style, and share your photos in seconds—no apps, no hassle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="flex items-center gap-4"
            >
              <Link href="/choose-layout">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <ButtonMoving className="flex cursor-pointer items-center gap-2 px-5 py-1">
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <Camera />
                    </motion.div>
                    Start Snapping
                  </ButtonMoving>
                </motion.div>
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20"
                >
                  View Booths
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mobile */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`mobile-${currentImageIndex}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={cn(
            "relative flex h-full min-h-[700px] w-full flex-col justify-end overflow-hidden rounded-2xl bg-black/80 md:hidden",
            currentImage.position,
          )}
          style={{
            backgroundImage: `url(${currentImage.mobile})`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={cn(
              "absolute",
              "right-0 bottom-0 left-0 h-1/2",
              "bg-gradient-to-t from-black/50 to-transparent backdrop-blur-sm",
              "[mask-image:linear-gradient(to_top,black_60%,transparent_100%)]",
            )}
          />

          {/* Konten di atas blur */}
          <div className="font-poppins relative z-10 flex flex-col gap-3 p-5 pb-14 text-white">
            <motion.span
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
              }}
              className="w-fit rounded-full border border-purple-200/20 bg-purple-300/30 p-1 px-2 text-center text-xs backdrop-blur-md"
            >
              Capture your best vibe
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-3xl font-bold md:text-5xl"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                Snapfeeds
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-purple-300"
              >
                &mdash;
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                Capture Fun in 4K, Anytime, Anywhere
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.9,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="mt-2 text-sm text-gray-200"
            >
              Snap, style, and share your photos in seconds—no apps, no hassle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 1.1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="flex items-center gap-4"
            >
              <Link href="/choose-layout">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <ButtonMoving className="flex cursor-pointer items-center gap-2 px-3 py-1 md:px-5">
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <Camera />
                    </motion.div>
                    Start Snapping
                  </ButtonMoving>
                </motion.div>
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20"
                >
                  View Booths
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2 transform"
      >
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
              whileHover={{
                scale: 1.3,
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
              }}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: index === currentImageIndex ? 1.1 : 1,
              }}
              transition={{
                delay: 1.8 + index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            />
          ))}
        </div>
      </motion.div>
    </LayoutProvider>
  );
};

export default HeroSection;
