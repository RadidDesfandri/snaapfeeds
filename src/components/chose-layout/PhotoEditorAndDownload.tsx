import { SelectedLayoutValue, StepType } from "@/types/global-type";
import { getAvailableLayouts, getLayoutConfig } from "@/utils/canvasUtils";
import { useCallback, useEffect, useRef, useState } from "react";
import LayoutProvider from "../LayoutProvider";
import Button from "../ui/button";
import LayoutOptions, { OptionsLayoutType } from "./LayoutOptions";
import { formatDate } from "@/utils/formatDate";
import { Checkbox } from "../ui/checkbox";
import CardColor from "./CardColor";
import { HexColorPicker } from "react-colorful";
import { X, Image as ImageIcon } from "lucide-react";
import {
  backgroundGradientOptions,
  backgroundOptions,
  backgroundTypeOptions,
  colorOptions,
} from "@/constants/data";
import { useClickOutside } from "@/hooks/useClickOutside";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

interface PhotoEditorAndDownloadProps {
  isStep: StepType;
  photos: string[];
  ratio: string;
  maxPhoto: number;
}

interface ImageLoadedType {
  image: HTMLImageElement;
  index: number;
  loaded: boolean;
  src: string;
}

type BackgroundType = "color" | "gradient" | "image";

const PhotoEditorAndDownload: React.FC<PhotoEditorAndDownloadProps> = ({
  isStep,
  photos,
  ratio,
  maxPhoto,
}) => {
  // prettier-ignore
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const downloadCanvasRef = useRef<HTMLCanvasElement>(null);

  const availableLayout = getAvailableLayouts(ratio, maxPhoto);

  const layoutOptions = availableLayout.map((item) => ({
    src: item.src,
    label: `${item.layoutType} | ${item.variant}`,
    value: {
      layoutType: item.layoutType,
      variant: item.variant,
    },
  }));

  const layoutValue = {
    layoutType: availableLayout[0].layoutType,
    variant: availableLayout[0].variant,
  };

  // prettier-ignore
  const [selectedLayout, setSelectedLayout] = useState<SelectedLayoutValue>(layoutValue as SelectedLayoutValue);
  const [loadedImages, setLoadedImages] = useState<ImageLoadedType[]>([]);
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);
  const [showDate, setShowDate] = useState<boolean>(false);

  const [backgroundType, setBackgroundType] = useState<BackgroundType>("color");

  // Color frame
  // prettier-ignore
  const [selectedFrameColor, setselectedFrameColor] = useState<string | null>("#FFFFFF");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const colorRef = useRef<HTMLDivElement | null>(null);

  // prettier-ignore
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  // prettier-ignore
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  // prettier-ignore
  const [selectedBackgroundGradient, setSelectedBackgroundGradient] = useState<string>();

  useClickOutside([colorRef], () => setShowColorPicker(false), showColorPicker);

  const createGradient = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      gradientId: string,
    ) => {
      const gradientOption = backgroundGradientOptions.find(
        (g) => g.id === gradientId,
      );
      if (!gradientOption) return null;

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradientOption.colors.forEach((color, index) => {
        gradient.addColorStop(
          index / (gradientOption.colors.length - 1),
          color,
        );
      });
      return gradient;
    },
    [],
  );

  // Render Preview Canvas
  const renderPreviewCanvas = useCallback(() => {
    const canvas = previewCanvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const layout = getLayoutConfig(maxPhoto, ratio, selectedLayout, logoImage);

    if (!ctx) return;

    let scaleFactor = 0.3;
    if (ratio === "16:9") scaleFactor = 0.2;

    // Set canvas size yang tepat berdasarkan scale factor
    const previewWidth = layout.canvas.width! * scaleFactor;
    const previewHeight = layout.canvas.height! * scaleFactor;

    canvas.width = previewWidth;
    canvas.height = previewHeight;

    // Draw background
    if (backgroundType === "image" && backgroundImage) {
      // Draw background image to fill entire canvas
      ctx.drawImage(backgroundImage, 0, 0, previewWidth, previewHeight);
    } else if (backgroundType === "gradient") {
      // Draw gradient background
      const gradient = createGradient(
        ctx,
        previewWidth,
        previewHeight,
        selectedBackgroundGradient!,
      );
      if (gradient) {
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, previewWidth, previewHeight);
      }
    } else {
      // Draw solid color background
      ctx.fillStyle = selectedFrameColor || "#fff";
      ctx.fillRect(0, 0, previewWidth, previewHeight);
    }

    loadedImages.forEach((imageData, index) => {
      if (imageData.loaded && imageData.image) {
        const pos = layout.positions![index];
        ctx.drawImage(
          imageData.image,
          pos.x * scaleFactor,
          pos.y * scaleFactor,
          pos.width * scaleFactor,
          pos.height * scaleFactor,
        );
      } else {
        // Placeholder
        const pos = layout.positions![index];
        ctx.fillStyle = "#e5e5e5";
        ctx.fillRect(
          pos.x * scaleFactor,
          pos.y * scaleFactor,
          pos.width * scaleFactor,
          pos.height * scaleFactor,
        );
        ctx.fillStyle = "#666";
        ctx.font = `${Math.max(8, 12 * scaleFactor)}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(
          `Pose ${index + 1}`,
          (pos.x + pos.width / 2) * scaleFactor,
          (pos.y + pos.height / 2) * scaleFactor,
        );
      }
    });

    // Render Logo
    if (logoImage && layout.logoPosition) {
      const logoPos = layout.logoPosition;
      ctx.drawImage(
        logoImage,
        logoPos.x * scaleFactor,
        logoPos.y * scaleFactor,
        logoPos.width * scaleFactor,
        logoPos.height * scaleFactor,
      );
    }

    // Render date
    if (showDate && layout.datePosition) {
      const datePos = layout.datePosition;
      const currentDate = formatDate(new Date());

      ctx.fillStyle = "#333";
      ctx.font = `${Math.max(10, 12 * scaleFactor)}px Arial`;
      ctx.textAlign =
        selectedLayout.layoutType === "vertical" ? "center" : "left";
      ctx.fillText(
        currentDate,
        datePos.x * scaleFactor,
        datePos.y * scaleFactor,
      );
    }
  }, [
    backgroundImage,
    backgroundType,
    createGradient,
    loadedImages,
    logoImage,
    maxPhoto,
    ratio,
    selectedBackgroundGradient,
    selectedFrameColor,
    selectedLayout,
    showDate,
  ]);

  const renderDownloadCanvas = useCallback(() => {
    const canvas = downloadCanvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const layout = getLayoutConfig(maxPhoto, ratio, selectedLayout, logoImage);

    if (!ctx) return;

    // Set canvas size untuk preview
    canvas.width = layout.canvas.width!;
    canvas.height = layout.canvas.height!;

    // Draw background
    if (backgroundType === "image" && backgroundImage) {
      // Draw background image to fill entire canvas
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    } else if (backgroundType === "gradient") {
      // Draw gradient background
      const gradient = createGradient(
        ctx,
        canvas.width,
        canvas.height,
        selectedBackgroundGradient || "#fff",
      );
      if (gradient) {
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    } else {
      // Draw solid color background
      ctx.fillStyle = selectedFrameColor || "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    loadedImages.forEach((imageData, index) => {
      if (imageData.loaded && imageData.image) {
        const pos = layout.positions![index];
        ctx.drawImage(imageData.image, pos.x, pos.y, pos.width, pos.height);
      }
    });

    if (logoImage && layout.logoPosition) {
      const logoPos = layout.logoPosition;
      ctx.drawImage(
        logoImage,
        logoPos.x,
        logoPos.y,
        logoPos.width,
        logoPos.height,
      );
    }

    // Render date
    if (showDate && layout.datePosition) {
      const datePos = layout.datePosition;
      const currentDate = formatDate(new Date());

      ctx.fillStyle = "#333";
      ctx.font = `26px Arial`;
      ctx.textAlign =
        selectedLayout.layoutType === "vertical" ? "center" : "left";
      ctx.fillText(currentDate, datePos.x, datePos.y);
    }
  }, [
    backgroundImage,
    backgroundType,
    createGradient,
    loadedImages,
    logoImage,
    maxPhoto,
    ratio,
    selectedBackgroundGradient,
    selectedFrameColor,
    selectedLayout,
    showDate,
  ]);

  const handleChangeColor = (color: string) => {
    setSelectedBackground(null);
    setBackgroundImage(null);
    setselectedFrameColor(color);
  };

  const handleChangeBackground = (imageSrc: string) => {
    setselectedFrameColor(null);
    setSelectedBackground(imageSrc);
  };

  const handleDownload = () => {
    const canvas = downloadCanvasRef.current;

    if (!canvas) return;

    renderDownloadCanvas(); // Ensure latest render

    const dataURL = canvas.toDataURL("image/png", 1.0);

    const ua = navigator.userAgent || navigator.vendor;
    const isInstagram = /Instagram/i.test(ua);

    if (isInstagram) {
      // prettier-ignore
      alert('Tidak bisa download dari Instagram. Silakan buka di browser lain.')
    } else {
      const link = document.createElement("a");
      link.download = `snapfeeds-${Date.now()}.png`;
      link.href = dataURL;
      link.click();
    }
  };

  useEffect(() => {
    if (!photos.length) return;

    const loadImages = async () => {
      const imagePromises = photos.map((blobUrl, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            resolve({ index, image: img, loaded: true, src: blobUrl });
          };
          img.onerror = () => {
            resolve({ index, image: null, loaded: false, src: blobUrl });
          };
          img.src = blobUrl;
        });
      });

      const results = await Promise.all(imagePromises);
      setLoadedImages(results as ImageLoadedType[]);
    };

    loadImages();
  }, [photos]);

  // Rerender when layout change
  useEffect(() => {
    const timer = setTimeout(() => {
      renderPreviewCanvas();
      renderDownloadCanvas();
    }, 100);

    return () => clearTimeout(timer);
  }, [renderDownloadCanvas, renderPreviewCanvas]);

  // Load logo
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLogoImage(img);
    };
    img.src = "/logo-no-bg.png";
  }, []);

  // Load background image
  useEffect(() => {
    const bgOption = backgroundOptions.find(
      (item) => selectedBackground === item.src,
    );

    if (!bgOption) {
      setBackgroundImage(null);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setBackgroundImage(img);
    };
    img.onerror = () => {
      console.error("Failed to load background image:", bgOption.src);
      setBackgroundImage(null);
    };
    img.src = bgOption.src;
  }, [selectedBackground]);

  if (!isStep || isStep !== "photo-editor") return null;

  return (
    <LayoutProvider
      center
      className="flex-col gap-9 gap-x-20 pt-24 pb-10 md:flex-row"
    >
      <div className="flex min-w-0 items-center justify-center">
        <div className="inline-block overflow-visible border-1 border-gray-300">
          <canvas
            ref={previewCanvasRef}
            className="block h-auto max-w-full bg-white"
            style={{
              maxWidth: "90vw",
              maxHeight: "70vh",
              width: "auto",
              height: "auto",
            }}
          />
        </div>
      </div>

      <div>
        <div className="mb-6 flex w-fit items-center justify-center gap-3">
          <LayoutOptions
            onChange={(value) => setSelectedLayout(value)}
            options={layoutOptions as OptionsLayoutType[]}
          />
          <div className="flex w-1/4 items-center space-x-2">
            <Checkbox
              id="show-date"
              checked={showDate}
              onCheckedChange={(c) => setShowDate(!!c)}
            />
            <label
              htmlFor="show-date"
              className="cursor-pointer text-xs font-medium text-nowrap text-gray-700"
            >
              Show date
            </label>
          </div>
        </div>

        {/* Background section */}
        <h1 className="font-poppins mb-3 font-medium">Background</h1>
        <div className="mb-4 flex rounded-lg border border-gray-300 p-1">
          {backgroundTypeOptions.map((item, index) => (
            <button
              key={item}
              className={cn(
                "flex-1 cursor-pointer capitalize transition-colors",
                backgroundType === item ? "font-bold" : "font-light",
                index !== backgroundTypeOptions.length - 1 &&
                  "border-r-2 border-gray-300",
              )}
              onClick={() => setBackgroundType(item as BackgroundType)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mb-6 grid w-fit grid-cols-6 gap-4 lg:grid-cols-5">
          {backgroundType === "color" && (
            <>
              <div ref={colorRef} className="relative inline-block">
                <CardColor
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  background="conic-gradient(red, yellow, lime, cyan, blue, magenta, red)"
                />
                {showColorPicker && (
                  <div className="absolute top-14 left-4 z-50">
                    <HexColorPicker
                      color={selectedFrameColor || "#fff"}
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
              {colorOptions.map((item) => (
                <CardColor
                  key={item.color}
                  onClick={() => handleChangeColor(item.color)}
                  backgroundColor={item.color}
                  isActive={selectedFrameColor === item.color}
                />
              ))}
            </>
          )}

          {backgroundType === "gradient" && (
            <>
              {backgroundGradientOptions.map((item) => (
                <CardColor
                  key={item.id}
                  onClick={() => setSelectedBackgroundGradient(item.id)}
                  background={item.gradient}
                  isActive={item.id === selectedBackgroundGradient}
                />
                // <div
                //   key={item.id}
                //   onClick={() => setSelectedBackgroundGradient(item.id)}
                //   className={cn(
                //     "relative cursor-pointer rounded-lg border p-1 transition-all",
                //     selectedBackgroundGradient === item.id
                //       ? "border-2 border-black"
                //       : "border-gray-300",
                //   )}
                // >
                //   <div
                //     style={{ background: item.gradient }}
                //     className="aspect-video rounded"
                //   ></div>
                //   <p className="mt-1 text-center text-xs text-gray-700">
                //     {item.name}
                //   </p>
                //   {selectedBackgroundGradient === item.id && (
                //     <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-500">
                //       <div className="flex h-full w-full items-center justify-center">
                //         <div className="h-2 w-2 rounded-full bg-white"></div>
                //       </div>
                //     </div>
                //   )}
                // </div>
              ))}
            </>
          )}

          {backgroundType === "image" && (
            <>
              {backgroundOptions.map((item, index) => (
                <CardColor
                  key={index}
                  onClick={() => handleChangeBackground(item.src)}
                  isActive={selectedBackground === item.src}
                >
                  <NextImage
                    src={item.src}
                    alt={`Background-${index}`}
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                </CardColor>
              ))}
            </>
          )}
        </div>

        <Button onClick={handleDownload}>
          <ImageIcon /> Download Foto
        </Button>
      </div>

      <canvas ref={downloadCanvasRef} className="hidden" />
    </LayoutProvider>
  );
};

export default PhotoEditorAndDownload;
