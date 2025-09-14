import {
  backgroundGradientOptions,
  backgroundOptions,
  colorOptions,
} from "@/constants/data";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useCanvasStore } from "@/store/useCanvasStore";
import { X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import CardColor from "./CardColor";

const TabRenderer = () => {
  const { backgroundType } = useCanvasStore();

  switch (backgroundType) {
    case "color":
      return <TabColorContent />;
    case "gradient":
      return <TabGradientContent />;
    case "image":
      return <TabImageContent />;
    default:
      return <TabColorContent />;
  }
};

const TabColorContent = () => {
  const { selectedColor, changeColor } = useCanvasStore();
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const colorRef = useRef<HTMLDivElement | null>(null);

  useClickOutside([colorRef], () => setShowColorPicker(false), showColorPicker);

  return (
    <>
      <div ref={colorRef} className="relative inline-block">
        <CardColor
          onClick={() => setShowColorPicker(!showColorPicker)}
          background="conic-gradient(red, yellow, lime, cyan, blue, magenta, red)"
        />
        {showColorPicker && (
          <div className="absolute top-14 left-4 z-50">
            <HexColorPicker
              color={selectedColor || "#fff"}
              onChange={changeColor}
            />
          </div>
        )}
      </div>
      <CardColor
        onClick={() => changeColor("#FFFFFF")}
        isActive={selectedColor === "#FFFFFF"}
      >
        <X />
      </CardColor>
      {colorOptions.map((item) => (
        <CardColor
          key={item.color}
          onClick={() => changeColor(item.color)}
          backgroundColor={item.color}
          isActive={selectedColor === item.color}
        />
      ))}
    </>
  );
};

const TabImageContent = () => {
  const { selectedImage, changeImage } = useCanvasStore();

  return (
    <>
      {backgroundOptions.map((item, index) => (
        <CardColor
          key={index}
          onClick={() => changeImage(item.src)}
          isActive={selectedImage === item.src}
        >
          <Image
            src={item.src}
            alt={`Background-${index}`}
            width={500}
            height={500}
            className="object-cover"
          />
        </CardColor>
      ))}
    </>
  );
};

const TabGradientContent = () => {
  const { changeGradient, selectedGradient } = useCanvasStore();

  return (
    <>
      {backgroundGradientOptions.map((item) => (
        <CardColor
          key={item.id}
          onClick={() => changeGradient(item.id)}
          background={item.gradient}
          isActive={item.id === selectedGradient}
        />
      ))}
    </>
  );
};

export default TabRenderer;
