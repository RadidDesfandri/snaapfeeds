import { useEffect, useRef } from "react";
import LayoutProvider from "../LayoutProvider";
import Button from "../ui/button";
import { Camera } from "lucide-react";

interface PhotoSectionProps {
  isOpen: boolean;
}

const PhotoSection = ({ isOpen }: PhotoSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    if (isOpen) {
      startCamera();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <LayoutProvider className="flex-col gap-9 pt-20 md:flex-row" center>
      <div>
        <div className="font-poppins mb-2 flex justify-center font-semibold">
          0/4
        </div>
        <div className="relative mb-4 overflow-hidden rounded-2xl border bg-gray-300 md:mb-6 md:h-[500px] md:w-[740px]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full scale-x-[-1] object-cover"
          />
        </div>
        <div className="flex justify-center">filter here</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-5 flex w-[300px] flex-row gap-4 overflow-x-auto md:w-full md:flex-col">
          <div className="h-24 w-48 shrink-0 rounded-2xl border bg-gray-300 p-5 text-center">
            dummy 1
          </div>
          <div className="h-24 w-48 shrink-0 rounded-2xl border bg-gray-300 p-5 text-center">
            dummy 2
          </div>
          <div className="h-24 w-48 shrink-0 rounded-2xl border bg-gray-300 p-5 text-center">
            dummy 3
          </div>
        </div>

        <Button>
          <Camera /> Take Photo
        </Button>
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </LayoutProvider>
  );
};

export default PhotoSection;
