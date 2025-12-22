"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Waves, Radio } from "lucide-react";

interface FrequencyOption {
  hz: number;
  label: string;
  description: string;
  color: string;
  glowColor: string;
  bgGradient: string;
}

const frequencies: FrequencyOption[] = [
  {
    hz: 432,
    label: "432 Hz",
    description: "Clarity & Peace",
    color: "from-emerald-400 to-green-500",
    glowColor: "rgba(34, 197, 94, 0.5)",
    bgGradient: "from-emerald-500/20 via-green-500/10 to-transparent",
  },
  {
    hz: 852,
    label: "852 Hz",
    description: "Intuition & Balance",
    color: "from-violet-400 to-purple-500",
    glowColor: "rgba(139, 92, 246, 0.5)",
    bgGradient: "from-violet-500/20 via-purple-500/10 to-transparent",
  },
];

const FrequencyWidget = () => {
  const [activeFreq, setActiveFreq] = useState<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveFreq(null);
  };

  const playFrequency = (hz: number) => {
    // Stop any existing sound
    stopSound();

    // Create or resume AudioContext
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;

    // Resume context if suspended (browser autoplay policy)
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    // Create oscillator and gain nodes
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(hz, audioContext.currentTime);
    
    // Set low volume for safety
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Start playing
    oscillator.start();

    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    setActiveFreq(hz);

    // Auto-stop after 10 seconds
    timeoutRef.current = setTimeout(() => {
      stopSound();
    }, 10000);
  };

  const toggleFrequency = (hz: number) => {
    if (activeFreq === hz) {
      stopSound();
    } else {
      playFrequency(hz);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSound();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="group relative h-full rounded-3xl overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800" />
      
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-emerald-500/20 via-transparent to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glass inner */}
      <div className="absolute inset-[1px] rounded-3xl bg-neutral-900/95 backdrop-blur-xl" />
      
      {/* Active frequency glow */}
      <AnimatePresence>
        {activeFreq && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 transition-all duration-700"
            style={{
              boxShadow: `inset 0 0 100px ${frequencies.find(f => f.hz === activeFreq)?.glowColor}`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Animated background gradient */}
      <AnimatePresence>
        {activeFreq && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-br ${frequencies.find(f => f.hz === activeFreq)?.bgGradient}`}
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`absolute -inset-1 rounded-lg blur-md transition-all duration-500 ${activeFreq ? 'bg-gradient-to-r from-emerald-500 to-violet-500 opacity-50' : 'opacity-0'}`} />
              <div className="relative p-2 bg-white/5 rounded-lg border border-white/10">
                <Waves className={`w-5 h-5 transition-colors duration-300 ${activeFreq ? 'text-white' : 'text-neutral-400'}`} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Frequency Tuner</h3>
              <p className="text-xs text-neutral-500">Binaural Sound Generator</p>
            </div>
          </div>
          
          {/* Playing indicator */}
          <AnimatePresence>
            {activeFreq && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              >
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-white rounded-full"
                      animate={{ height: ["8px", "16px", "8px"] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-white">Live</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Frequency Buttons */}
        <div className="flex-1 flex flex-col gap-3">
          {frequencies.map((freq) => {
            const isActive = activeFreq === freq.hz;
            return (
              <motion.button
                key={freq.hz}
                onClick={() => toggleFrequency(freq.hz)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`relative flex-1 rounded-2xl transition-all duration-300 overflow-hidden ${
                  isActive
                    ? freq.hz === 432 
                      ? 'ring-2 ring-emerald-500/50 ring-offset-2 ring-offset-neutral-900'
                      : 'ring-2 ring-violet-500/50 ring-offset-2 ring-offset-neutral-900'
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Button background */}
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-r ${freq.color} opacity-10` 
                    : 'bg-white/[0.02]'
                }`} />
                
                {/* Border */}
                <div className={`absolute inset-0 rounded-2xl border transition-all duration-300 ${
                  isActive 
                    ? `border-${freq.hz === 432 ? 'emerald' : 'violet'}-500/50` 
                    : 'border-white/5 hover:border-white/10'
                }`} />

                {/* Content */}
                <div className="relative z-10 h-full flex items-center justify-between p-4">
                  <div className="text-left">
                    <div className={`text-2xl font-bold mb-0.5 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-neutral-200'
                    }`}>
                      {freq.label}
                    </div>
                    <div className={`text-xs transition-colors duration-300 ${
                      isActive ? 'text-neutral-300' : 'text-neutral-500'
                    }`}>
                      {freq.description}
                    </div>
                  </div>
                  
                  <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${freq.color} shadow-lg` 
                      : 'bg-white/5'
                  }`}>
                    {isActive ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-neutral-400" />
                    )}
                  </div>
                </div>

                {/* Waveform Visualization */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-[2px] h-8 px-4 pb-2"
                    >
                      {[...Array(32)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`w-1 bg-gradient-to-t ${freq.color} rounded-full`}
                          animate={{
                            height: ["4px", `${Math.random() * 20 + 8}px`, "4px"],
                          }}
                          transition={{
                            duration: 0.6 + Math.random() * 0.4,
                            repeat: Infinity,
                            delay: i * 0.02,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <p className="text-[10px] text-neutral-600 text-center font-mono tracking-wider uppercase">
            Click to play • Auto-stops after 10s • Safe volume
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrequencyWidget;
