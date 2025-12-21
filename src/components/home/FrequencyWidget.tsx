"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface FrequencyOption {
  hz: number;
  label: string;
  description: string;
  color: string;
}

const frequencies: FrequencyOption[] = [
  {
    hz: 432,
    label: "432 Hz",
    description: "Clarity & Peace",
    color: "from-blue-500 to-cyan-500",
  },
  {
    hz: 852,
    label: "852 Hz",
    description: "Intuition & Balance",
    color: "from-purple-500 to-pink-500",
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
    <div className="relative h-full p-6 bg-neutral-900 rounded-3xl border border-neutral-800 shadow-xl overflow-hidden">
      {/* Background Animation */}
      {activeFreq && (
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${frequencies.find(f => f.hz === activeFreq)?.color}`} />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Frequency Tuner</h3>
            <p className="text-xs text-neutral-400">Binaural Sound Generator</p>
          </div>
          {activeFreq && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              <Volume2 className="w-4 h-4 text-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-white">Playing</span>
            </motion.div>
          )}
        </div>

        {/* Frequency Buttons */}
        <div className="grid grid-cols-1 gap-3 mt-auto">
          {frequencies.map((freq) => (
            <motion.button
              key={freq.hz}
              onClick={() => toggleFrequency(freq.hz)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-4 rounded-2xl border-2 transition-all ${
                activeFreq === freq.hz
                  ? "border-white bg-white/10 backdrop-blur-sm"
                  : "border-neutral-700 bg-neutral-800 hover:border-neutral-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-2xl font-bold text-white mb-1">{freq.label}</div>
                  <div className="text-xs text-neutral-400">{freq.description}</div>
                </div>
                {activeFreq === freq.hz ? (
                  <VolumeX className="w-6 h-6 text-white" />
                ) : (
                  <Volume2 className="w-6 h-6 text-neutral-400" />
                )}
              </div>

              {/* Waveform Visualization */}
              {activeFreq === freq.hz && (
                <motion.div className="absolute bottom-2 left-4 right-4 flex items-center gap-1 h-8">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`flex-1 bg-gradient-to-t ${freq.color} rounded-full`}
                      animate={{
                        height: ["20%", "80%", "20%"],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Info Text */}
        <div className="mt-4 pt-4 border-t border-neutral-800">
          <p className="text-xs text-neutral-500 text-center">
            Click to play • Auto-stops after 10s • Safe volume
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrequencyWidget;
