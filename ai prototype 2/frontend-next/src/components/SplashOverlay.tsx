"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import Logo from "./Logo";

interface SplashOverlayProps {
  onFinish: () => void;
}

export default function SplashOverlay({ onFinish }: SplashOverlayProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1500); // Snappier start

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: "blur(20px)",
        scale: 1.1
      }}
      transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white"
    >
      <div className="relative">
        {/* Subtle pulsing glow */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.4, opacity: [0, 0.2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-primary/30 blur-[60px] rounded-full"
        />

        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="relative z-10"
        >
          <Logo 
            hideIcon={false} 
            className="flex-col gap-5! scale-[2.5]" 
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
