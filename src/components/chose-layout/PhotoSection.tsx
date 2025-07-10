import { useEffect, useRef, useState } from "react";
import LayoutProvider from "../LayoutProvider";
import Button from "../ui/button";
import { Camera, Check, RotateCcw } from "lucide-react";
import { Image as ImageIcon } from "lucide-react";
import { LayoutOptions } from "@/app/(home)/chose-layout/page";
import Image from "next/image";
import Logo from "../Logo";

// 1. countdown ✅
// 2. take, and retake picture ✅
// 3. preview image ✅
// 4. select color layout
// 5. download photo
// 6. filter kamera ✅
// 7. filter output photo ✅

interface PhotoSectionProps {
  isOpen: boolean;
  layoutOption: LayoutOptions;
}

type StepPhoto = "camera" | "preview" | "cards";
type FilterOption =
  | "normal"
  | "black-white"
  | "sepia"
  | "vintage"
  | "cool"
  | "warm"
  | "blur"
  | "contrast"
  | "brightness"
  | "invert";

const PhotoSection = ({ isOpen, layoutOption }: PhotoSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Step
  const [currentStep, setCurrentStep] = useState<StepPhoto>("camera");

  // Photo
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);

  // Countdown
  const [countdown, setCountdown] = useState<number>(3);
  const [isCountdown, setIsCountdown] = useState<boolean>(false);

  // Filter
  const [currentFilter, setCurrentFilter] = useState<FilterOption>("normal");

  const filters = {
    normal: "",
    "black-white": "grayscale(100%)",
    sepia: "sepia(100%)",
    vintage: "sepia(50%) contrast(120%) brightness(110%)",
    cool: "hue-rotate(180deg) saturate(120%)",
    warm: "hue-rotate(20deg) saturate(120%) brightness(110%)",
    blur: "blur(2px)",
    contrast: "contrast(150%)",
    brightness: "brightness(130%)",
    invert: "invert(100%)",
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },

        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;

        await videoRef.current.play();
      }
    } catch (error) {
      console.log("Errror accessing camera:", error);
      alert(
        "Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan.",
      );
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (context) {
      context.save();

      context.translate(canvas.width, 0);
      context.scale(-1, 1);

      context.filter = filters[currentFilter];

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      context.restore();
    }

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const photoUrl = URL.createObjectURL(blob);
          setCurrentPhoto(photoUrl);
          setCurrentStep("preview");
        }
      },
      "image/jpeg",
      0.9,
    );
  };

  const savePhoto = () => {
    if (currentPhoto) {
      setPhotos((prev) => [...prev, currentPhoto]);
      setCurrentPhoto(null);
    }

    if (photos.length + 1 >= layoutOption.maxPhoto) {
      setCurrentStep("cards");
    } else {
      setCurrentStep("camera");
    }
  };

  const retakePhoto = () => {
    if (currentPhoto) {
      URL.revokeObjectURL(currentPhoto);
      setCurrentPhoto(null);
    }

    setCurrentStep("camera");
  };

  const startCoundown = () => {
    setIsCountdown(true);
    setCountdown(3);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            capturePhoto();
            setIsCountdown(false);
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleFilterChange = (filterName: FilterOption) => {
    setCurrentFilter(filterName);
  };

  useEffect(() => {
    if (currentStep === "preview" && currentPhoto) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [currentStep, currentPhoto]);

  useEffect(() => {
    if (isOpen && currentStep === "camera") {
      startCamera();
    }
  }, [isOpen, currentStep]);

  if (!isOpen) return null;

  return (
    <LayoutProvider className="flex-col gap-9 pt-20 md:flex-row" center>
      {currentStep === "cards" ? (
        <div>Cards</div>
      ) : (
        <>
          <div>
            <div className="font-poppins mb-2 flex justify-center font-semibold">
              {photos.length}/{layoutOption.maxPhoto}
            </div>

            <div className="relative mb-3 overflow-hidden rounded-2xl border bg-gray-300 md:h-[500px] md:w-[740px]">
              {currentStep === "camera" && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-full w-full scale-x-[-1] object-cover"
                  style={{ filter: filters[currentFilter] }}
                />
              )}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
                <Button
                  onClick={startCoundown}
                  size="lg"
                  className="rounded-full"
                >
                  <Camera /> Take Photo
                </Button>
              </div>

              {isCountdown && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="font-poppins animate-pulse text-8xl font-bold text-white">
                    {countdown > 0 ? countdown : "📸"}
                  </div>
                </div>
              )}
            </div>

            {/* Filter camera */}
            <div className="flex w-[350px] gap-5 overflow-x-auto p-1 md:w-[740px]">
              {Object.keys(filters).map((filterName) => (
                <div
                  key={filterName}
                  title={filterName}
                  className={`shrink-0 cursor-pointer overflow-hidden rounded-full border-2 transition-all ${
                    currentFilter === filterName
                      ? "border-blue-500 ring-2 ring-blue-300"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => handleFilterChange(filterName as FilterOption)}
                >
                  <Image
                    src="/filter-thumbnail.jpg"
                    alt={`Filter ${filterName}`}
                    width={300}
                    height={300}
                    className="h-12 w-12 object-cover"
                    style={{ filter: filters[filterName as FilterOption] }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-5 flex w-[350px] flex-row gap-4 overflow-x-auto md:w-full md:flex-col">
              {photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="flex h-28 w-48 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-gray-300 text-center text-gray-600"
                >
                  <Image
                    src={photo}
                    alt="Photo"
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                </div>
              ))}
              {Array.from({
                length: layoutOption.maxPhoto - photos.length,
              }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex h-28 w-48 shrink-0 items-center justify-center rounded-2xl border bg-gray-300 text-center text-gray-600"
                >
                  <ImageIcon />
                </div>
              ))}
            </div>
          </div>

          {currentStep === "preview" && currentPhoto && (
            <div className="fixed inset-0 top-0 left-0 z-50 flex h-screen min-w-screen items-center justify-center bg-black/70 p-5">
              <div className="relative overflow-hidden rounded-2xl bg-gray-200 p-4 md:px-7 md:py-6">
                <Logo />

                <Image
                  src={currentPhoto}
                  alt="Preview"
                  width={900}
                  height={550}
                  className="mt-3 w-full object-contain"
                />

                <div className="mt-4 flex items-center justify-end gap-3 md:mt-6">
                  <Button onClick={retakePhoto} variant="outline" size="lg">
                    <RotateCcw /> Retake Photo
                  </Button>
                  <Button onClick={savePhoto} size="lg">
                    <Check /> Save Photo
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </LayoutProvider>
  );
};

export default PhotoSection;
