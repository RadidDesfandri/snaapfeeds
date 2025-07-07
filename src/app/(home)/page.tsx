import LayoutProvider from "@/components/LayoutProvider";
import { Camera } from "lucide-react";

export default function Home() {
  return (
    <LayoutProvider className="pt-20 min-h-screen grid grid-cols-1 gap-10 md:grid-cols-2">
      <div className="order-2 md:order-1 flex flex-col justify-center">
        <h1 className="text-2xl font-semibold mb-4 md:text-3xl md:font-bold lg:text-4xl">
          Snap Your Moment
        </h1>
        <p>
          Welcome to <strong>Snapfeeds!</strong> Your go-to spot for creating
          awesome photobooth photos directly in your browser, anytime, anywhere.
          Snap and share your fun moments without any hassle.
        </p>
      </div>
      <div className="order-1 md:order-2 flex items-center justify-center">
        <button className="p-2 bg-black text-white flex items-center gap-3">
          START <Camera size={20} />
        </button>
      </div>
    </LayoutProvider>
  );
}
