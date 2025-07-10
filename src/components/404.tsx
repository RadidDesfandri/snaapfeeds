"use client";

import Link from "next/link";
// import FloatingElemet from "./ui/FloatingElemet";
import Button from "./ui/button";

const NotFound404: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="mx-auto max-w-2xl text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <h1 className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-9xl font-bold text-transparent opacity-10 select-none md:text-[200px]">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse text-6xl font-bold md:text-8xl">
              4<span className="text-gray-400">0</span>4
            </div>
          </div>
        </div>

        {/* Glitch Effect Title */}
        <div className="relative mb-6">
          <h2 className="relative mb-2 text-3xl font-bold md:text-5xl">
            <span className="relative z-10">Page Not Found</span>
            <span className="pointer-events-none absolute top-0 left-0 -translate-x-1 -translate-y-1 animate-pulse text-red-500 opacity-70">
              Page Not Found
            </span>
            <span className="pointer-events-none absolute top-0 left-0 translate-x-1 translate-y-1 animate-pulse text-blue-500 opacity-70">
              Page Not Found
            </span>
          </h2>
        </div>

        {/* Description */}
        <p className="mb-8 text-lg leading-relaxed text-gray-400 md:text-xl">
          Oops! The page you&apos;re looking for seems to have vanished into the
          digital void. It might have been moved, deleted, or never existed at
          all.
        </p>

        {/* Animated Elements */}
        <div className="mb-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="h-3 w-3 animate-bounce rounded-full bg-white"></div>
            <div
              className="h-3 w-3 animate-bounce rounded-full bg-gray-500"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="h-3 w-3 animate-bounce rounded-full bg-gray-700"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-2 flex items-center justify-center gap-4">
          <Button variant="secondary" className="rounded-full" asChild>
            <Link href="/">Go Home</Link>
          </Button>

          <Button
            onClick={() => window.history.back()}
            className="rounded-full border-white"
            variant="outline"
          >
            Go Back
          </Button>
        </div>

        {/* <FloatingElemet color="white" /> */}

        {/* Bottom Message */}
        <div className="mt-12 text-sm text-gray-600">
          <p>Error Code: 404 | Page Not Found</p>
          <p className="mt-2">
            If you believe this is a mistake, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;
