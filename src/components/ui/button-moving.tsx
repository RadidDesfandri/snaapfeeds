/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function ButtonMoving({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative overflow-hidden bg-transparent p-[2px] text-xl",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-neutral-800 bg-black text-sm text-white antialiased backdrop-blur-xl",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 5000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      if (length) {
        const pxPerMillisecond = length / duration;
        progress.set((time * pxPerMillisecond) % length);
      }
    }
  });

  const x = useTransform(progress, (val) => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (path && svg) {
      const point = path.getPointAtLength(val);
      const rect = svg.getBoundingClientRect();
      // Convert SVG coordinates to actual pixel coordinates
      return (point.x / 100) * rect.width;
    }
    return 0;
  });

  const y = useTransform(progress, (val) => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (path && svg) {
      const point = path.getPointAtLength(val);
      const rect = svg.getBoundingClientRect();
      // Convert SVG coordinates to actual pixel coordinates
      return (point.y / 100) * rect.height;
    }
    return 0;
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  // Create a more accurate rounded rectangle path
  const createRoundedRectPath = () => {
    const w = 100;
    const h = 100;

    // Parse radius values - default to small radius if not provided
    const parseRadius = (r: string | undefined, fallback = 8) => {
      if (!r) return fallback;
      if (r.includes("%")) {
        return (parseFloat(r) / 100) * Math.min(w, h) * 0.5;
      }
      return parseFloat(r);
    };

    const radiusX = parseRadius(rx, 8);
    const radiusY = parseRadius(ry, radiusX);

    // Ensure radius doesn't exceed half of width/height
    const maxRadiusX = w / 2;
    const maxRadiusY = h / 2;
    const finalRadiusX = Math.min(radiusX, maxRadiusX);
    const finalRadiusY = Math.min(radiusY, maxRadiusY);

    return `
      M ${finalRadiusX},0
      L ${w - finalRadiusX},0
      Q ${w},0 ${w},${finalRadiusY}
      L ${w},${h - finalRadiusY}
      Q ${w},${h} ${w - finalRadiusX},${h}
      L ${finalRadiusX},${h}
      Q 0,${h} 0,${h - finalRadiusY}
      L 0,${finalRadiusY}
      Q 0,0 ${finalRadiusX},0
      Z
    `
      .replace(/\s+/g, " ")
      .trim();
  };

  return (
    <>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        {...otherProps}
      >
        <path
          fill="none"
          stroke="transparent"
          strokeWidth="1"
          d={createRoundedRectPath()}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
