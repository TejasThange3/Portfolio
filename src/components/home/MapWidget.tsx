import Image from "next/image";

const MapWidget = () => {
  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
      {/* Map Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800"
          alt="Map"
          fill
          className="object-cover opacity-60 dark:opacity-40"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20" />

      {/* Location Marker */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {/* Pulsing Rings */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-500/30 rounded-full animate-ping" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-blue-500/40 rounded-full animate-pulse" />
          </div>
          {/* Center Dot */}
          <div className="relative w-5 h-5 bg-blue-500 rounded-full border-3 border-white shadow-xl" />
        </div>

        {/* Location Label */}
        <div className="mt-4 px-4 py-2 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-full shadow-lg border border-neutral-200 dark:border-neutral-700">
          <span className="text-sm font-semibold text-neutral-900 dark:text-white">
            🇮🇳 Pune, India
          </span>
        </div>
      </div>
    </div>
  );
};

export default MapWidget;
