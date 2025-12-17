import Image from "next/image";
import { DATA } from "@/lib/data";

const ProfileCard = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full p-6 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800">
      <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-neutral-100 dark:border-neutral-800">
        {/* Placeholder image - replace with actual path */}
        <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-4xl">
          👨‍💻
        </div>
      </div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
        {DATA.profile.name}
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400">
        {DATA.profile.title}
      </p>
      <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-2 text-center">
        {DATA.profile.bio}
      </p>
    </div>
  );
};

export default ProfileCard;
