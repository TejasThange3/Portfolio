const MapWidget = () => {
  return (
    <div className="relative w-full h-full bg-neutral-200 dark:bg-neutral-800 rounded-3xl overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping absolute" />
        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-neutral-900" />
        <span className="mt-2 text-xs font-medium bg-white/80 dark:bg-black/80 px-2 py-1 rounded-full backdrop-blur-sm">
          San Francisco, CA
        </span>
      </div>
    </div>
  );
};

export default MapWidget;
