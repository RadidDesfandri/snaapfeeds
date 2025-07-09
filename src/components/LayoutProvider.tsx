import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LayoutProviderProps {
  id?: string;
  children: ReactNode;
  className?: string;
  center?: boolean;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({
  id,
  children,
  className,
  center,
}) => {
  return (
    <div
      id={id}
      className={cn(
        "mx-auto max-w-7xl px-5 md:px-14 lg:px-16",
        center && "flex min-h-screen items-center justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default LayoutProvider;
