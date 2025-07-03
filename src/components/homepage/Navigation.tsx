"use client";

import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { ForwardedRef, useRef, useState } from "react";
import SlideInAnimate from "../animations/SlideInAnimate";
import { useClickOutside } from "../hooks/useClickOutside";
import LayoutProvider from "../LayoutProvider";
import Logo from "../Logo";

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
    <LayoutProvider className="py-5">
      <div className="hidden md:flex items-center justify-between">
        {routes.slice(0, 2).map((item) => (
          <RouteItem key={item.label} label={item.label} url={item.url} />
        ))}
        <Logo />
        {routes.slice(2, 4).map((item) => (
          <RouteItem key={item.label} label={item.label} url={item.url} />
        ))}
      </div>

      <div className="md:hidden flex justify-between">
        <div></div>
        <Logo />
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
  <Link href={url} className="hover:font-semibold transition-all duration-300">
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
  <SlideInAnimate position="right" isOpen={isOpen} ref={ref}>
    konten here
  </SlideInAnimate>
);
