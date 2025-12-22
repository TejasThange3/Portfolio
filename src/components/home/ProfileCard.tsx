"use client";

import { DATA } from "@/lib/data";
import { Github, Linkedin, Twitter, Mail, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const ProfileCard = () => {
  return (
    <div className="group relative flex flex-col h-full p-8 rounded-3xl overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800" />
      
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glass overlay */}
      <div className="absolute inset-[1px] rounded-3xl bg-neutral-900/90 backdrop-blur-xl" />
      
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header Row - Avatar & Status */}
        <div className="flex items-start justify-between mb-5">
          {/* Avatar with glow */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl blur-md opacity-60" />
            <div className="relative w-16 h-8 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center">
              <span className="text-xl">👋</span>
            </div>
          </div>

          {/* Status Indicator */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-sm"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
              <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
            </div>
            <span className="text-xs font-semibold text-green-400 tracking-wide">Available for Work</span>
          </motion.div>
        </div>

        {/* Name & Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-white mb-1 tracking-tight"
        >
          {DATA.profile.name}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-base font-medium text-neutral-300 mb-2"
        >
          {DATA.profile.title}
        </motion.p>
        
        {/* Location */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-1.5 text-sm text-neutral-500 mb-4"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>{DATA.profile.location}</span>
        </motion.div>

        {/* Bio */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-sm text-neutral-400 leading-relaxed mb-6 line-clamp-3"
        >
          {DATA.profile.bio}
        </motion.p>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-2.5 mt-auto"
        >
          {DATA.profile.social.github && (
            <a
              href={DATA.profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/5 hover:border-white/10 group/btn"
            >
              <Github className="w-4 h-4 text-neutral-400 group-hover/btn:text-white transition-colors" />
              <span className="text-sm font-medium text-neutral-400 group-hover/btn:text-white transition-colors">GitHub</span>
            </a>
          )}
          {DATA.profile.social.linkedin && (
            <a
              href={DATA.profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/5 hover:border-white/10 group/btn"
            >
              <Linkedin className="w-4 h-4 text-neutral-400 group-hover/btn:text-white transition-colors" />
              <span className="text-sm font-medium text-neutral-400 group-hover/btn:text-white transition-colors">LinkedIn</span>
            </a>
          )}
          {DATA.profile.social.twitter && (
            <a
              href={DATA.profile.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/5 hover:border-white/10 group/btn"
            >
              <Twitter className="w-4 h-4 text-neutral-400 group-hover/btn:text-white transition-colors" />
              <span className="text-sm font-medium text-neutral-400 group-hover/btn:text-white transition-colors">Twitter</span>
            </a>
          )}
          <a
            href={`mailto:${DATA.profile.email}`}
            className="relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden group/btn"
          >
            {/* Gradient background for email button */}
            <div className="absolute inset-0 bg-gradient-to-r from-white to-neutral-100" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <Mail className="relative w-4 h-4 text-neutral-900 group-hover/btn:text-white transition-colors" />
            <span className="relative text-sm font-medium text-neutral-900 group-hover/btn:text-white transition-colors">Email</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileCard;
