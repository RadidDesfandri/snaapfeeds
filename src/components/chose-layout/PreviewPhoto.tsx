import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Button from "../ui/button";

interface PreviewPhotoProps {
  isOpen: boolean;
  photo: string;
  photoIndex: number | null;
  retake: () => void;
  takingPhoto: boolean;
  onClose: () => void;
  aspectRatio: string;
}

const PreviewPhoto: React.FC<PreviewPhotoProps> = ({
  isOpen,
  photo,
  photoIndex,
  retake,
  takingPhoto,
  onClose,
  aspectRatio,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside([ref], onClose, isOpen);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          ref={ref}
          className="scrollbar-none max-h-[90vh] max-w-[90vw] overflow-hidden overflow-y-auto rounded-xl bg-white p-4"
          initial={{
            opacity: 0,
            scale: 0.7,
            rotateX: -15,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateX: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            y: -20,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: 0.4,
          }}
        >
          <div className={cn("relative", aspectRatio)}>
            <Image
              src={photo}
              alt={`Photo ${photoIndex! + 1}`}
              width={800}
              height={600}
              className="max-h-[100vh] object-contain"
            />
          </div>

          <div className="mt-4">
            <Button onClick={retake} disabled={takingPhoto}>
              Retake Foto
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PreviewPhoto;
