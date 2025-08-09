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
import { frameColors } from "@/constants/data";
import { useClickOutside } from "@/hooks/useClickOutside";

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

  // Color frame
  // prettier-ignore
  const [selectedFrameColor, setselectedFrameColor] = useState<string>("#FFFFFF");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const colorRef = useRef<HTMLDivElement | null>(null);

  useClickOutside([colorRef], () => setShowColorPicker(false), showColorPicker);

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

    // Clear canvas
    ctx.fillStyle = selectedFrameColor;
    ctx.fillRect(0, 0, previewWidth, previewHeight);

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
    loadedImages,
    logoImage,
    maxPhoto,
    ratio,
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

    // Clear canvas
    ctx.fillStyle = selectedFrameColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    loadedImages,
    logoImage,
    maxPhoto,
    ratio,
    selectedFrameColor,
    selectedLayout,
    showDate,
  ]);

  const handleDownload = () => {
    const canvas = downloadCanvasRef.current;

    if (!canvas) return;

    renderDownloadCanvas(); // Ensure latest render

    const link = document.createElement("a");
    link.download = `snapfeeds-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
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

        {/* Frame Color */}
        <h1 className="font-poppins mb-2 font-medium">Frame Color</h1>
        <div className="mb-6 grid w-fit grid-cols-6 gap-4 lg:grid-cols-5">
          <div ref={colorRef} className="relative inline-block">
            <CardColor
              onClick={() => setShowColorPicker(!showColorPicker)}
              background="conic-gradient(red, yellow, lime, cyan, blue, magenta, red)"
            />
            {showColorPicker && (
              <div className="absolute top-14 left-4 z-50">
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

        <Button onClick={handleDownload}>
          <ImageIcon /> Download Foto
        </Button>
      </div>

      <canvas ref={downloadCanvasRef} className="hidden" />
    </LayoutProvider>
  );
};

export default PhotoEditorAndDownload;
