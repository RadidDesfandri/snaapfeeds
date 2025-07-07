import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LayoutProviderProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({
  id,
  children,
  className,
}) => {
  return (
    <div
      id={id}
      className={cn("mx-auto max-w-7xl px-5 md:px-14 lg:px-16", className)}
    >
      {children}
    </div>
  );
};

export default LayoutProvider;
