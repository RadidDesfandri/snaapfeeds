import Link from "next/link";
import {
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export const Footer = () => {
  return (
    <div className="rounded-t-3xl bg-[#121313] py-16 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-16 gap-y-10 px-14 md:grid-cols-5 md:px-20">
        <div className="flex flex-col gap-y-2 text-xs md:text-sm">
          <p className="font-semibold">About us</p>
          <p>Our Company</p>
          <p>Mission and Vision</p>
          <p>The Team</p>
          <p>Careers</p>
          <p>Newsroom</p>
        </div>

        <div className="flex flex-col gap-y-2 text-xs md:text-sm">
          <p className="font-semibold">Legal</p>
          <p>Accesibility</p>
          <p>Privacy policy</p>
          <p>Terms of use</p>
          <p>Cookies</p>
          <p>Terms of conditions</p>
          <p>Sitemap</p>
        </div>

        <div className="flex flex-col gap-y-2 text-xs md:text-sm">
          <p className="font-semibold">Resource</p>
          <p>Blog</p>
          <p>Partnership</p>
          <p>Awards</p>
          <p>Testimonials</p>
          <p>Press</p>
          <p>Documentations</p>
        </div>

        <div className="flex flex-col gap-y-2 text-xs md:text-sm">
          <p className="font-semibold">Product</p>
          <p>Managed investing</p>
          <p>Key Management</p>
          <p>Private equity</p>
          <p>Mortgages</p>
          <p>Investment</p>
        </div>

        <div className="flex flex-col gap-y-2 text-xs md:text-sm">
          <p className="font-semibold">Social Media</p>
          <div className="flex items-center gap-x-2">
            <FaInstagram />
            <Link href={"#"}>Instagram</Link>
          </div>
          <div className="flex items-center gap-x-2">
            <FaXTwitter />
            <Link href={"#"}>X</Link>
          </div>
          <div className="flex items-center gap-x-2">
            <FaLinkedin />
            <Link href={"#"}>Linkedin</Link>
          </div>
          <div className="flex items-center gap-x-2">
            <FaYoutube />
            <Link href={"#"}>Youtube</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
