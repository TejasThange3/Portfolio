import { DATA } from "@/lib/data";
import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";

const ProfileCard = () => {
  return (
    <div className="relative flex flex-col h-full p-8 bg-neutral-900/50 backdrop-blur-md rounded-3xl border border-white/5 shadow-xl">
      {/* Status Indicator */}
      <div className="absolute top-5 right-5 flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm">
        <div className="relative">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
        </div>
        <span className="text-xs font-semibold text-green-400">Available for Work</span>
      </div>

      {/* Avatar */}
      <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-white/5 shadow-2xl">
        <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-5xl">
          👨‍💻
        </div>
      </div>

      {/* Name & Title */}
      <h1 className="text-3xl font-bold text-white mb-1">
        {DATA.profile.name}
      </h1>
      <p className="text-base text-neutral-400 mb-1">
        {DATA.profile.title}
      </p>
      
      {/* Location */}
      <div className="flex items-center gap-1.5 text-sm text-neutral-500 mb-4">
        <MapPin className="w-4 h-4" />
        <span>{DATA.profile.location}</span>
      </div>

      {/* Bio */}
      <p className="text-sm text-neutral-400 leading-relaxed mb-6">
        {DATA.profile.bio}
      </p>

      {/* Social Links */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        {DATA.profile.social.github && (
          <a
            href={DATA.profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-800/50 hover:bg-neutral-800/70 rounded-xl transition-colors border border-white/5 group backdrop-blur-sm"
          >
            <Github className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">GitHub</span>
          </a>
        )}
        {DATA.profile.social.linkedin && (
          <a
            href={DATA.profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-800/50 hover:bg-neutral-800/70 rounded-xl transition-colors border border-white/5 group backdrop-blur-sm"
          >
            <Linkedin className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">LinkedIn</span>
          </a>
        )}
        {DATA.profile.social.twitter && (
          <a
            href={DATA.profile.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-800/50 hover:bg-neutral-800/70 rounded-xl transition-colors border border-white/5 group backdrop-blur-sm"
          >
            <Twitter className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">Twitter</span>
          </a>
        )}
        <a
          href={`mailto:${DATA.profile.email}`}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-neutral-100 text-neutral-900 rounded-xl transition-colors group"
        >
          <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Email</span>
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
