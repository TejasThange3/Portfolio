"use client";

import React from "react";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
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
    <footer className="w-full border-t border-white/5 bg-neutral-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left - Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-neutral-400 text-sm">
              &copy; {currentYear} | {DATA.profile.name.split(" ")[0]}
            </p>
            <p className="text-neutral-500 text-xs flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> using Next.js
            </p>
          </div>

          {/* Center - Get in touch */}
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-light italic text-white mb-3 relative inline-block">
              Get in touch
              <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
            </h3>
            <div className="flex items-center gap-3 text-sm">
              {socialLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                  {index < socialLinks.length - 1 && (
                    <span className="text-neutral-600">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right - Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                aria-label={link.name}
              >
                <link.icon className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
