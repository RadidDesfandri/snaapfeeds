"use client";

import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { ForwardedRef, useRef, useState } from "react";
import SlideInAnimate from "../animations/SlideInAnimate";
import LayoutProvider from "../LayoutProvider";
import Logo from "../Logo";
import { useClickOutside } from "@/hooks/useClickOutside";

const routes = [
  {
    label: "home",
    url: "/",
  },
  {
    label: "privacy dan policy",
    url: "/",
  },
  {
    label: "about",
    url: "/",
  },
  {
    label: "chose layout",
    url: "/",
  },
];

const Navigation = () => {
  const [isOpenNav, setIsOpenNav] = useState<boolean>(false);
  const ref = useRef(null);

  const handleToggle = () => setIsOpenNav(!isOpenNav);

  useClickOutside([ref], handleToggle, isOpenNav);

  return (
    <LayoutProvider className="fixed top-0 left-1/2 z-50 w-full -translate-x-1/2 bg-white py-5">
      <div className="hidden items-center justify-between md:flex">
        {routes.slice(0, 2).map((item) => (
          <RouteItem key={item.label} label={item.label} url={item.url} />
        ))}
        <Link href="/">
          <Logo asChild />
        </Link>
        {routes.slice(2, 4).map((item) => (
          <RouteItem key={item.label} label={item.label} url={item.url} />
        ))}
      </div>

      <div className="flex justify-between md:hidden">
        <div></div>
        <Link href="/">
          <Logo asChild />
        </Link>
        <button onClick={() => setIsOpenNav(true)} className="cursor-pointer">
          <AlignJustify />
        </button>
      </div>
      <OpenMenuMobile isOpen={isOpenNav} ref={ref} />
    </LayoutProvider>
  );
};

export default Navigation;

const RouteItem = ({ url, label }: { url: string; label: string }) => (
  <Link href={url} className="transition-all duration-300 hover:font-semibold">
    {label}
  </Link>
);

const OpenMenuMobile = ({
  isOpen,
  ref,
}: {
  isOpen: boolean;
  ref: ForwardedRef<HTMLDivElement>;
}) => (
  <SlideInAnimate
    position="right"
    isOpen={isOpen}
    ref={ref}
    className="min-h-screen md:hidden"
  >
    konten here
  </SlideInAnimate>
);
