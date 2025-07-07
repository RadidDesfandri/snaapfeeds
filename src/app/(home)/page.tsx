import LayoutProvider from "@/components/LayoutProvider";
import { Camera } from "lucide-react";

export default function Home() {
  return (
    <LayoutProvider className="grid min-h-screen grid-cols-1 gap-10 pt-20 md:grid-cols-2">
      <div className="order-2 flex flex-col justify-center md:order-1">
        <h1 className="mb-4 text-2xl font-semibold md:text-3xl md:font-bold lg:text-4xl">
          Snap Your Moment
        </h1>
        <p>
          Welcome to <strong>Snapfeeds!</strong> Your go-to spot for creating
          awesome photobooth photos directly in your browser, anytime, anywhere.
          Snap and share your fun moments without any hassle.
        </p>
      </div>
      <div className="order-1 flex items-center justify-center md:order-2">
        <button className="flex items-center gap-3 bg-black p-2 text-white">
          START <Camera size={20} />
        </button>
      </div>
    </LayoutProvider>
  );
}
