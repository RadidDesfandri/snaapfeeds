"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Image as ImageIcon } from "lucide-react";
import { useState, useRef, ReactNode, RefObject, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import Button from "../ui/button";
import { LayoutOptions } from "@/app/(home)/chose-layout/page";

const frameColors = [
  { color: "#B20000" },
  { color: "#FCF1F1" },
  { color: "#EEF1BC" },
  { color: "#8A90FC" },
  { color: "#B9F3B5" },
  { color: "#5E56F6" },
  { color: "#F6E3AD" },
  { color: "#CDDCBD" },
  { color: "#A5ECD7" },
  { color: "#F2899A" },
];

interface CardPreviewProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  photos: string[];
  layoutOption: LayoutOptions;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  canvasRef,
  photos,
  layoutOption,
}) => {
  const [selectedFrameColor, setselectedFrameColor] =
    useState<string>("#FFFFFF");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const colorRef = useRef<HTMLDivElement | null>(null);

  useClickOutside([colorRef], () => setShowColorPicker(false), showColorPicker);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const maxPhoto = layoutOption.maxPhoto;
    const layoutName = layoutOption.layoutName;

    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const frameWidth = 10;

      ctx.fillStyle = selectedFrameColor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const photoArea = {
        x: frameWidth,
        y: frameWidth,
        width: canvasWidth - frameWidth * 2,
        height: canvasHeight - frameWidth * 2,
      };

      if (!photos || photos.length === 0) {
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(
          photoArea.x,
          photoArea.y,
          photoArea.width,
          photoArea.height,
        );

        // Teks placeholder
        ctx.fillStyle = "#999";
        ctx.font = "18px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Load photo...", canvasWidth / 2, canvasHeight / 2);
        return;
      }

      const loadAndDrawImage = (src: string, slotIndex: number) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = src;

          img.onload = () => {
            const spacingX = 10;
            const spacingY = 10;
            const logoHeight = 50;
            const logoMarginTop = 20;

            let photoWidth = 0;
            let photoHeight = 0;
            let x = 0;
            let y = 0;

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            const usableHeight = canvasHeight - logoHeight - logoMarginTop;

            const drawPhoto = () => {
              ctx!.drawImage(img, x, y, photoWidth, photoHeight);
              resolve();
            };

            switch (layoutName) {
              case "Layout A": {
                const topPadding = 20;
                const totalSpacing = spacingY * (maxPhoto - 1);
                const columnWidth = canvasWidth / 2;
                const photoAreaPadding = 5;

                photoWidth = columnWidth - photoAreaPadding * 2;
                photoHeight =
                  (usableHeight - totalSpacing - topPadding) / maxPhoto;

                y =
                  frameWidth +
                  topPadding +
                  slotIndex * (photoHeight + spacingY);

                const xLeft = photoAreaPadding;
                const xRight = columnWidth + photoAreaPadding;

                ctx.drawImage(img, xLeft, y, photoWidth, photoHeight);
                ctx.drawImage(img, xRight, y, photoWidth, photoHeight);

                resolve();
                break;
              }
              case "Layout C": {
                const spacingY = 10;
                photoHeight = 120;
                photoWidth = canvasWidth / 2;

                const y = slotIndex * (photoHeight + spacingY);

                const xLeft = 0;
                ctx.drawImage(img, xLeft, y, photoWidth, photoHeight);

                const xRight = canvasWidth / 2;
                ctx.drawImage(img, xRight, y, photoWidth, photoHeight);

                resolve();
                break;
              }
              case "Layout B": {
                const topPaddingLeft = 120;
                const topPaddingRight = 20;
                const columnWidth = canvasWidth / 2;
                const photoAreaPadding = 10;

                photoWidth = columnWidth - photoAreaPadding * 2;
                photoHeight = 200;

                const yLeft =
                  frameWidth +
                  topPaddingLeft +
                  slotIndex * (photoHeight + spacingY);
                const yRight =
                  frameWidth +
                  topPaddingRight +
                  slotIndex * (photoHeight + spacingY);

                const xLeft = photoAreaPadding;
                const xRight = columnWidth + photoAreaPadding;

                ctx.drawImage(img, xLeft, yLeft, photoWidth, photoHeight);
                ctx.drawImage(img, xRight, yRight, photoWidth, photoHeight);

                resolve();
                break;
              }
              case "Layout D": {
                const totalSpacing = spacingY * (maxPhoto - 1);
                photoHeight =
                  (usableHeight - 40 - totalSpacing) / maxPhoto + 20;
                photoWidth = canvasWidth - spacingX * 2;

                x = spacingX;
                y = frameWidth + slotIndex * (photoHeight + spacingY);
                drawPhoto();
                break;
              }

              default:
                reject("Invalid layout");
            }
          };

          img.onerror = (err) => reject(err);
        });
      };

      const loadAllPhotos = async () => {
        const promises = photos.slice(0, maxPhoto).map((photoSrc, index) => {
          return loadAndDrawImage(photoSrc, index);
        });

        try {
          await Promise.all(promises);
          console.log(
            `Successfully loaded ${maxPhoto} photos for ${layoutName}`,
          );

          const logoHeight = 25;
          const logoWidth = 120;

          const drawLogo = (yPosition: number, xPosition: number) => {
            const logo = new Image();
            logo.src = "/logo-no-bg.png";

            logo.onload = () => {
              ctx.drawImage(logo, xPosition, yPosition, logoWidth, logoHeight);
            };
          };

          const halfCanvas = canvas.width / 2;
          const y = canvas.height - logoHeight - 10;
          const xLeft = (halfCanvas - logoWidth) / 2;
          const xRight = halfCanvas + (halfCanvas - logoWidth) / 2;

          switch (layoutName) {
            case "Layout A":
              drawLogo(y, xLeft);
              drawLogo(y, xRight);

              break;

            case "Layout C":
              drawLogo(y, xLeft);
              drawLogo(y, xRight);

              break;

            case "Layout B":
              drawLogo(60, xLeft);
              drawLogo(490, xRight);
              break;

            case "Layout D":
              drawLogo(
                canvas.height - logoHeight - 15,
                (canvas.width - logoWidth) / 2,
              );
              break;
            default:
              break;
          }
        } catch (error) {
          console.error("Error loading photos:", error);
        }
      };

      loadAllPhotos();
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.download = `photobooth-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  useEffect(() => {
    drawCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFrameColor]);

  return (
    <div className="object grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
      <div className="flex items-center">
        <canvas
          width={380}
          height={570}
          ref={canvasRef}
          className="border border-gray-300 shadow-md"
          // h-[525px] w-[230px]
        />
      </div>
      <div className="scrollbar-none overflow-y-auto lg:max-h-[700px]">
        <div className="grid w-fit grid-cols-6 gap-4 lg:grid-cols-5">
          <div ref={colorRef} className="relative inline-block">
            <CardColor
              onClick={() => setShowColorPicker(!showColorPicker)}
              background="conic-gradient(red, yellow, lime, cyan, blue, magenta, red)"
            />
            {showColorPicker && (
              <div className="absolute top-14 left-0 z-50">
                <HexColorPicker
                  color={selectedFrameColor}
                  onChange={setselectedFrameColor}
                />
              </div>
            )}
          </div>
          <CardColor
            onClick={() => setselectedFrameColor("#FFFFFF")}
            isActive={selectedFrameColor === "#FFFFFF"}
          >
            <X />
          </CardColor>

          {frameColors.map((item) => (
            <CardColor
              key={item.color}
              onClick={() => setselectedFrameColor(item.color)}
              backgroundColor={item.color}
              isActive={selectedFrameColor === item.color}
            />
          ))}
        </div>
        <Button onClick={handleDownload} className="mt-7">
          <ImageIcon /> Download Foto
        </Button>
      </div>
    </div>
  );
};

export default CardPreview;

const CardColor = ({
  isActive,
  onClick,
  children,
  backgroundColor,
  background,
}: {
  isActive?: boolean;
  onClick: () => void;
  children?: ReactNode;
  background?: string;
  backgroundColor?: string;
}) => (
  <div
    onClick={onClick}
    className={cn(
      "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border",
      isActive ? "border-2 border-black" : "border-gray-300",
    )}
    style={{ background, backgroundColor }}
  >
    {children}
  </div>
);
