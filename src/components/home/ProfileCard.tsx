import { DATA } from "@/lib/data";
import { Github, Linkedin, Twitter } from "lucide-react";

const ProfileCard = () => {
  return (
    <div className="relative flex flex-col justify-center items-center h-full p-6 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800">
      {/* Status Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full">
        <div className="relative">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
        </div>
        <span className="text-xs font-medium text-green-700 dark:text-green-400">Available</span>
      </div>

      {/* Avatar */}
      <div className="relative w-28 h-28 mb-3 rounded-full overflow-hidden border-4 border-neutral-100 dark:border-neutral-800 shadow-lg">
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl">
          👨‍💻
        </div>
      </div>

      {/* Name & Title */}
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
        {DATA.profile.name}
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
        {DATA.profile.title}
      </p>

      {/* Bio */}
      <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center leading-relaxed mb-4 max-w-[280px]">
        {DATA.profile.bio}
      </p>

      {/* Social Icons */}
      <div className="flex items-center gap-2 mt-auto">
        {DATA.profile.social.github && (
          <a
            href={DATA.profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors border border-neutral-200 dark:border-neutral-700"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
          </a>
        )}
        {DATA.profile.social.linkedin && (
          <a
            href={DATA.profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors border border-neutral-200 dark:border-neutral-700"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
          </a>
        )}
        {DATA.profile.social.twitter && (
          <a
            href={DATA.profile.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors border border-neutral-200 dark:border-neutral-700"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
