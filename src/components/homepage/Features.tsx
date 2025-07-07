import { Camera, Download, Star } from "lucide-react";
import { IconType } from "react-icons";

const dummyFeature = [
  {
    title: "Instant Capture",
    description:
      "Take high-quality photos directly from your browser with advanced camera controls and real-time filters.",
    icon: Camera,
  },
  {
    title: "Easy Download",
    description:
      "Save your masterpieces in multiple formats and resolutions, ready for any platform or print.",
    icon: Download,
  },
  {
    title: "Premium Effect",
    description:
      "Access exclusive filters, frames, and artistic effects to make your photos truly unique.",
    icon: Star,
  },
];

const Features = () => {
  return (
    <div className="pb-16">
      <div className="mb-16 text-center">
        <h2 className="font-poppins mb-6 text-4xl font-bold text-black lg:text-5xl">
          Why Choose{" "}
          <span className="text-stroke bg-clip-text text-white">
            Snapfeeds?
          </span>
        </h2>
        <p className="mx-auto text-lg text-gray-700 md:max-w-2xl md:text-xl">
          Experience the future of photography with our cutting-edge features
          designed for creators like you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {dummyFeature.map((item, idx) => (
          <CardFeature
            key={idx}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;

const CardFeature = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: IconType;
}) => (
  <div className="hover:bg-border group transform rounded-2xl border-neutral-600 bg-black p-6 backdrop-blur-lg transition-all duration-700 hover:scale-[102%] hover:border-2 hover:bg-transparent">
    <div className="mb-4 transform text-pink-400 transition-transform duration-300 hover:scale-110">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="mb-2 transform text-xl font-bold text-white transition-all duration-700 group-hover:text-black">
      {title}
    </h3>
    <p className="transform text-sm leading-relaxed text-gray-300 transition-all duration-700 group-hover:text-gray-900">
      {description}
    </p>
  </div>
);
