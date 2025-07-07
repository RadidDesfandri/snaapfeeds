"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, { forwardRef } from "react";

interface SlideInAnimateProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  position?: "left" | "right";
  width?: "small" | "medium" | "large";
  isOpen: boolean;
  className?: string;
}

const SlideInAnimate = forwardRef<HTMLDivElement, SlideInAnimateProps>(
  (
    { children, position = "left", width = "small", isOpen, className },
    ref
  ) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            initial={position === "left" ? { x: "-100%" } : { x: "100%" }}
            animate={{ x: 0 }}
            exit={position === "left" ? { x: "-100%" } : { x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed top-0 z-50 h-full bg-white shadow",
              position === "left" && "left-0",
              position === "right" && "right-0",
              width === "small" && "w-64",
              width === "medium" && "w-64 md:w-80",
              width === "large" && "w-80 md:w-[400px]",
              className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

SlideInAnimate.displayName = "SlideInAnimate";

export default SlideInAnimate;
