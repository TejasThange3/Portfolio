"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUpRight, Sparkles } from "lucide-react";
import { DATA } from "@/lib/data";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "X", href: DATA.profile.social.twitter, icon: Twitter },
    { name: "LinkedIn", href: DATA.profile.social.linkedin, icon: Linkedin },
    { name: "GitHub", href: DATA.profile.social.github, icon: Github },
    { name: "Email", href: `mailto:${DATA.profile.email}`, icon: Mail },
  ];

  return (
    <footer className="relative w-full border-t border-white/5 bg-neutral-950/80 backdrop-blur-xl overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Top section - CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Open to opportunities</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-4 font-display">
            <span className="text-white">Let's work </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 italic">together</span>
          </h2>
          
          <p className="text-neutral-400 text-lg mb-8 max-w-lg mx-auto">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          
          <motion.a
            href={`mailto:${DATA.profile.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-semibold shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.4)] transition-shadow"
          >
            <Mail className="w-5 h-5" />
            <span>Get in Touch</span>
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left - Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-display">{DATA.profile.name.split(" ")[0]}</span>
            </div>
            <p className="text-neutral-500 text-sm">
              &copy; {currentYear} All rights reserved.
            </p>
            <p className="text-neutral-600 text-xs flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> using Next.js & Tailwind
            </p>
          </div>

          {/* Center - Links */}
          <div className="flex items-center gap-6 text-sm">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right - Social Icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                aria-label={link.name}
              >
                <link.icon className="w-4 h-4 text-neutral-400 group-hover:text-purple-400 transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
