import Navigation from "@/components/homepage/Navigation";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navigation /> {children}
    </div>
  );
};

export default HomeLayout;
