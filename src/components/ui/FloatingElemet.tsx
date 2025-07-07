import { cn } from "@/lib/utils";

interface FloatingElemetProps {
  color?: "black" | "white";
  opacity?: "10" | "15" | "20" | "25";
}

const FloatingElemet: React.FC<FloatingElemetProps> = ({
  color = "black",
  opacity = "10",
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={cn(
          "absolute top-20 left-10 h-20 w-20 animate-ping rounded-full border",
          `border-${color}/${opacity}`,
        )}
      />
      <div
        className={cn(
          "absolute top-40 right-20 h-16 w-16 animate-ping rounded-full border",
          `border-${color}/${opacity}`,
        )}
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className={cn(
          "absolute bottom-32 left-20 h-12 w-12 animate-ping rounded-full border",
          `border-${color}/${opacity}`,
        )}
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className={cn(
          "absolute right-10 bottom-20 h-24 w-24 animate-ping rounded-full border",
          `border-${color}/${opacity}`,
        )}
        style={{ animationDelay: "0.5s" }}
      ></div>
    </div>
  );
};

export default FloatingElemet;
