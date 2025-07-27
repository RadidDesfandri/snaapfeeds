import { StepType } from "@/types/global-type";
import LayoutProvider from "../LayoutProvider";

interface PhotoEditorAndDownloadProps {
  isStep: StepType;
}

const PhotoEditorAndDownload: React.FC<PhotoEditorAndDownloadProps> = ({
  isStep,
}) => {
  if (!isStep || isStep !== "photo-editor") return null;

  return (
    <LayoutProvider center className="flex-col gap-9 pt-24 pb-10 lg:flex-row">
      PhotoEditorAndDownload
    </LayoutProvider>
  );
};

export default PhotoEditorAndDownload;
