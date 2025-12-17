import { Music } from "lucide-react";

const SpotifyWidget = () => {
  return (
    <div className="w-full h-full bg-[#1DB954] p-6 rounded-3xl flex flex-col justify-between text-white relative overflow-hidden">
      <Music className="absolute -right-4 -bottom-4 w-32 h-32 opacity-20 rotate-12" />
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider opacity-90">
          Offline
        </span>
      </div>
      <div>
        <p className="font-bold text-lg leading-tight">Not Playing</p>
        <p className="text-sm opacity-80">Spotify</p>
      </div>
    </div>
  );
};

export default SpotifyWidget;
