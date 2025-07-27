import { filters, ratioOptions, timerOptions } from "@/constanta/data";
import { cn } from "@/lib/utils";
import { FilterOption, StepType } from "@/types/global-type";
import { getRatioFoto } from "@/utils/getRatioFoto";
import { Camera, Expand, Image as ImageIcon, Minimize } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LayoutProvider from "../LayoutProvider";
import Button from "../ui/button";
import Dropdown from "../ui/dropdown";
import PhotoEditorAndDownload from "./PhotoEditorAndDownload";
import PreviewPhoto from "./PreviewPhoto";

interface CameraCaptureProps {
  isStep: StepType;
  maxPose: number;
  handleChangeStep: (step: StepType) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
  isStep,
  maxPose,
  handleChangeStep,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  const [photos, setPhotos] = useState<string[]>([]);

  const [selectedRatio, setSelectedRatio] = useState<string>("16:9");
  const [selectedTimer, setSelectedTimer] = useState<number>(3);

  // Countdown
  const [countdown, setCountdown] = useState<number>(selectedTimer);
  const [isTakingPhoto, setIsTakingPhoto] = useState<boolean>(false);

  const [currentFilter, setCurrentFilter] = useState<FilterOption>("normal");

  // prettier-ignore
  const handleFilterChange = (filterName: FilterOption) => setCurrentFilter(filterName);

  // prettier-ignore
  const { previewWidth, tailwindWidth, aspectRatio, height, width } = getRatioFoto(selectedRatio);

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // prettier-ignore
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [showPhotoPreview, setShowPhotoPreview] = useState<boolean>(false);

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
      // prettier-ignore
      alert("Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan.");
    }
  };

  const capturePhoto = (replaceIndex: number | null = null) => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    if (context) {
      context.save();

      context.translate(width, 0);
      context.scale(-1, 1);

      context.filter = filters[currentFilter];

      const videoAspectRatio = video.videoWidth / video.videoHeight;
      const canvasAspectRatio = width / height;

      let sx = 0,
        sy = 0,
        sw = video.videoWidth,
        sh = video.videoHeight;

      if (videoAspectRatio > canvasAspectRatio) {
        const newWidth = video.videoHeight * canvasAspectRatio;
        sx = (video.videoWidth - newWidth) / 2;
        sw = newWidth;
      } else {
        const newHeight = video.videoWidth / canvasAspectRatio;
        sy = (video.videoHeight - newHeight) / 2;
        sh = newHeight;
      }

      context.drawImage(video, sx, sy, sw, sh, 0, 0, width, height);

      context.restore();
    }

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const photoUrl = URL.createObjectURL(blob);

          if (replaceIndex !== null) {
            setPhotos((prev) => {
              const newPhotos = [...prev];
              URL.revokeObjectURL(newPhotos[replaceIndex]);
              newPhotos[replaceIndex] = photoUrl;
              return newPhotos;
            });
          } else {
            setPhotos((prev) => [...prev, photoUrl]);
          }
        }
      },
      "image/jpeg",
      0.9,
    );
  };

  const startPhoto = () => {
    setIsTakingPhoto(true);

    let currentCount = selectedTimer;
    let poseTaken = 0;

    const timer = setInterval(() => {
      if (currentCount > 0) {
        currentCount -= 1;
        setCountdown(currentCount);
      } else {
        capturePhoto();
        poseTaken += 1;

        if (poseTaken >= maxPose) {
          clearInterval(timer);
          setIsTakingPhoto(false);
        } else {
          currentCount = selectedTimer;
          setCountdown(currentCount);
        }
      }
    }, 1000);
  };

  const handleFullScreen = () => {
    const container = videoContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch((err) => {
        console.error("Gagal masuk fullscreen:", err);
      });
    } else {
      document.exitFullscreen?.();
    }
  };

  const openPhotoPreview = (index: number) => {
    setSelectedPhotoIndex(index);
    setShowPhotoPreview(true);
  };

  const closePhotoPreview = () => {
    setShowPhotoPreview(false);
    setSelectedPhotoIndex(null);
  };

  const retakePhoto = (index: number) => {
    setIsTakingPhoto(true);
    closePhotoPreview();

    let currentCount = selectedTimer;
    setCountdown(currentCount);

    const timer = setInterval(() => {
      if (currentCount > 0) {
        currentCount -= 1;
        setCountdown(currentCount);
      } else {
        capturePhoto(index);
        clearInterval(timer);
        setIsTakingPhoto(false);
      }
    }, 1000);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    setCountdown(selectedTimer);
  }, [selectedTimer]);

  useEffect(() => {
    if (isStep === "camera-capture") {
      startCamera();
    }
  }, [isStep]);

  if (isStep === "photo-editor") {
    return <PhotoEditorAndDownload isStep={isStep} />;
  }

  if (isStep !== "camera-capture") return null;

  return (
    <LayoutProvider
      center
      className="flex-col items-start gap-9 pt-24 pb-10 lg:flex-row"
    >
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex w-[70%] items-center gap-4 md:w-[55%]">
            <Dropdown
              disabled={isTakingPhoto || maxPose === photos.length}
              onChange={(value) => setSelectedRatio(value)}
              options={ratioOptions}
            />
            <Dropdown
              disabled={isTakingPhoto || maxPose === photos.length}
              onChange={(value) => setSelectedTimer(Number(value))}
              options={timerOptions}
            />
          </div>
          <Button
            disabled
            variant="outline"
            className="pointer-events-none rounded-full"
          >
            Upload Photo(Coming soon)
          </Button>
        </div>

        <div
          ref={videoContainerRef}
          className={cn(
            "relative mx-auto overflow-hidden rounded-2xl border bg-gray-300",
            aspectRatio,
            tailwindWidth,
            // prettier-ignore
            isFullscreen && "flex !h-screen !max-h-none !w-screen !max-w-none items-center justify-center rounded-none bg-black",
          )}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={cn(
              "h-full w-full scale-x-[-1] object-cover",
              isFullscreen && "max-h-full max-w-full object-contain",
            )}
            style={{ filter: filters[currentFilter] }}
          />
          <div className="font-poppins absolute top-4 left-1/2 -translate-x-1/2 transform rounded-md bg-black/40 p-2 px-4 text-xs text-white">
            {photos.length}/{maxPose}
          </div>
          {maxPose !== photos.length && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
              <Button
                size="lg"
                onClick={startPhoto}
                className="rounded-full"
                disabled={isTakingPhoto}
              >
                <Camera /> Take Photo
              </Button>
            </div>
          )}

          {isTakingPhoto && (
            <div
              className={cn(
                "pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-300",
                countdown === 0 ? "flash-effect bg-white" : "bg-black/50",
              )}
            >
              {countdown > 0 && (
                <div className="font-poppins animate-pulse text-8xl font-bold text-white">
                  {countdown}
                </div>
              )}
            </div>
          )}

          {/* Fullscreen */}
          <div className="absolute right-5 bottom-4">
            <Button size="icon" onClick={handleFullScreen}>
              {isFullscreen ? <Minimize /> : <Expand />}
            </Button>
          </div>
        </div>

        <div className="mt-3 flex w-[350px] gap-5 overflow-x-auto p-1 md:w-[740px]">
          {Object.keys(filters).map((filterName) => (
            <div
              key={filterName}
              title={filterName}
              onClick={() => handleFilterChange(filterName as FilterOption)}
              className={`shrink-0 cursor-pointer overflow-hidden rounded-full border-2 transition-all ${
                currentFilter === filterName
                  ? "border-blue-500 ring-2 ring-blue-300"
                  : "border-gray-300 hover:border-gray-400"
              }`}
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

      <div className="lg:mt-14">
        <div
          className={cn(
            "mb-5 flex w-full max-w-[40vh] flex-row gap-4 overflow-x-auto md:w-[740px] lg:flex-col lg:overflow-y-auto lg:pr-1",
            selectedRatio === "16:9"
              ? "lg:max-h-[60vh] lg:w-[200px]"
              : selectedRatio === "4:3"
                ? "lg:max-h-[90vh] lg:w-[170px]"
                : "lg:max-h-[72vh] lg:w-[140px]",
          )}
        >
          {photos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => !isTakingPhoto && openPhotoPreview(idx)}
              className={cn(
                "flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-gray-300 text-center text-gray-600",
                isTakingPhoto ? "pointer-events-none" : "cursor-pointer",
                aspectRatio,
                previewWidth,
              )}
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
            length: maxPose - photos.length,
          }).map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-gray-300 text-center text-gray-600",
                aspectRatio,
                previewWidth,
              )}
            >
              <ImageIcon />
            </div>
          ))}
        </div>
      </div>

      <PreviewPhoto
        isOpen={showPhotoPreview && selectedPhotoIndex !== null}
        photo={photos[selectedPhotoIndex!]}
        photoIndex={selectedPhotoIndex}
        retake={() => retakePhoto(selectedPhotoIndex!)}
        takingPhoto={isTakingPhoto}
        onClose={closePhotoPreview}
        aspectRatio={`${aspectRatio} ${tailwindWidth}`}
      />

      {/* Next step */}
      {maxPose === photos.length && (
        <div className="fixed right-8 bottom-10 md:right-14 md:bottom-5 lg:right-32">
          <Button
            disabled={maxPose !== photos.length}
            onClick={() => handleChangeStep("photo-editor")}
          >
            Next Step
          </Button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </LayoutProvider>
  );
};

export default CameraCapture;
