// import Footer from "@/components/homepage/Footer";
import Navigation from "@/components/homepage/Navigation";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navigation /> {children} 
      {/* <Footer /> */}
    </div>
  );
};

export default HomeLayout;
