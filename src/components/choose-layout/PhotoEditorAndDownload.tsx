import { backgroundTypeOptions } from "@/constants/data";
import { cn } from "@/lib/utils";
import { BackgroundType, useCanvasStore } from "@/store/useCanvasStore";
import useStep from "@/store/useStep";
import { ImageLoadedType, SizeName } from "@/types/global-type";
import { renderPhotosToCanvas } from "@/utils/rendering";
import { useEffect, useRef, useState } from "react";
import LayoutProvider from "../LayoutProvider";
import TabRenderer from "./TabRenderer";
import Button from "../ui/button";
import { ImageIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

interface PhotoEditorAndDownloadProps {
  photos: string[];
  sizeName: SizeName;
}

const PhotoEditorAndDownload: React.FC<PhotoEditorAndDownloadProps> = ({
  photos,
  sizeName,
}) => {
  const { step, payload } = useStep();
  const {
    backgroundType,
    changeBackgroundType,
    selectedColor,
    selectedImage,
    selectedGradient,
  } = useCanvasStore();

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const downloadCanvasRef = useRef<HTMLCanvasElement>(null);

  const [loadedImages, setLoadedImages] = useState<ImageLoadedType[]>([]);
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);
  // prettier-ignore
  const [backgroundLoaded, setBackgroundLoaded]  = useState<HTMLImageElement | null>(null)
  const [isRendering, setIsRendering] = useState(false);

  const [showDate, setShowDate] = useState<boolean>(false);

  // Handle download
  const handleDownload = async () => {
    if (!downloadCanvasRef.current || !loadedImages.length) return;

    const layoutName = payload?.layoutName;
    if (!layoutName) return;

    try {
      // Render dengan ukuran penuh
      renderPhotosToCanvas({
        layoutName,
        sizeName,
        loadedImages,
        canvas: downloadCanvasRef.current,
        logoImage: logoImage!,
        isPreview: false,
        backgroundType,
        color: selectedColor,
        backgroundImage: backgroundLoaded,
        gradientId: selectedGradient,
        showDate,
      });

      const ua = navigator.userAgent || navigator.vendor;
      const isInstagram = /Instagram/i.test(ua);

      if (isInstagram) {
        // prettier-ignore
        alert('Tidak bisa download dari Instagram. Silakan buka di browser lain.')
      } else {
        // Convert to blob dan download
        downloadCanvasRef.current.toBlob(
          (blob) => {
            if (!blob) return;

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `snapfeeds-${layoutName}-${sizeName}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          },
          "image/png",
          1.0,
        );
      }
    } catch (error) {
      console.error("Error downloading:", error);
    }
  };

  // Effect load image
  useEffect(() => {
    if (!photos.length) return;

    const loadImages = async () => {
      setIsRendering(true);
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
      setIsRendering(false);
    };

    loadImages();
  }, [photos]);

  // Effect untuk render preview
  useEffect(() => {
    // prettier-ignore
    if (!previewCanvasRef.current || !loadedImages.length || isRendering) return;

    const layoutName = payload.layoutName;

    if (!layoutName) return;

    try {
      renderPhotosToCanvas({
        layoutName,
        sizeName,
        loadedImages,
        canvas: previewCanvasRef.current,
        logoImage: logoImage!,
        isPreview: true,
        backgroundType,
        color: selectedColor,
        backgroundImage: backgroundLoaded,
        gradientId: selectedGradient,
        showDate,
      });
    } catch (error) {
      console.error("Error rendering preview:", error);
    }
  }, [
    isRendering,
    loadedImages,
    loadedImages.length,
    payload.layoutName,
    logoImage,
    sizeName,
    backgroundType,
    selectedColor,
    backgroundLoaded,
    selectedGradient,
    showDate,
  ]);

  // Effect untuk load logo
  useEffect(() => {
    const loadLogo = () => {
      const img = new Image();
      img.onload = () => {
        setLogoImage(img);
      };
      img.onerror = (error) => {
        console.warn("Logo failed to load", error);
        setLogoImage(null);
      };

      img.src = "/logo-black.png";
    };

    loadLogo();
  }, []);

  // Effect untuk render image background
  useEffect(() => {
    if (!selectedImage) return;

    const loadBackground = () => {
      const img = new Image();
      img.onload = () => {
        setBackgroundLoaded(img);
      };
      img.onerror = (error) => {
        console.warn("Background failed to load", error);
        setBackgroundLoaded(null);
      };

      img.src = selectedImage;
    };

    loadBackground();
  }, [selectedImage]);

  if (!step || step !== "photo-editor") return null;

  return (
    <LayoutProvider
      center
      className="flex-col gap-9 gap-x-20 pt-24 pb-10 md:flex-row"
    >
      <div className="flex min-w-0 items-center justify-center">
        <div className="inline-block overflow-visible border-1 border-gray-300">
          {isRendering ? (
            <div className="flex h-96 w-96 items-center justify-center bg-gray-100">
              <div className="text-gray-500">Loading preview...</div>
            </div>
          ) : (
            // <canvas
            //   ref={previewCanvasRef}
            //   className="block h-auto max-w-full rounded-lg bg-white"
            //   style={{
            //     maxWidth: "90vw",
            //     maxHeight: "70vh",
            //     width: "auto",
            //     height: "auto",
            //   }}
            // />
            <canvas
              ref={previewCanvasRef}
              className="block bg-white shadow"
              style={{
                maxWidth: "300px",
                maxHeight: "400px", // biar 2R nggak panjang banget di layar
                width: "auto",
                height: "auto",
              }}
            />
          )}
        </div>
      </div>

      <div>
        <div className="mb-6 flex w-fit items-center justify-center gap-3">
          {/* Add options here */}
          <div className="flex items-center space-x-2">
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
              onClick={() => changeBackgroundType(item as BackgroundType)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mb-6 grid w-fit grid-cols-6 gap-4 lg:grid-cols-5">
          <TabRenderer />
        </div>

        <Button onClick={handleDownload}>
          <ImageIcon /> Download Foto
        </Button>
      </div>

      <canvas ref={downloadCanvasRef} style={{ display: "none" }} />
    </LayoutProvider>
  );
};

export default PhotoEditorAndDownload;
