"use client";

import { motion } from "framer-motion";

export default function BackgroundWaves() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Wave Layer 1 - Soft Indigo */}
      <motion.div
        animate={{
          x: [-150, 150, -75],
          y: [-80, 80, -30],
          scale: [1, 1.4, 0.8],
          rotate: [0, 120, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vh] bg-indigo-500/15 blur-[100px] rounded-full mix-blend-soft-light"
      />

      {/* Wave Layer 2 - Warm Amber */}
      <motion.div
        animate={{
          x: [150, -150, 75],
          y: [80, -80, 30],
          scale: [1.3, 0.7, 1.2],
          rotate: [0, -60, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vh] bg-orange-400/12 blur-[120px] rounded-full mix-blend-soft-light"
      />

      {/* Wave Layer 3 - Subtle Deep Indigo */}
      <motion.div
        animate={{
          x: [-80, 80, 0],
          y: [120, -120, 60],
          scale: [0.8, 1.2, 1],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] right-[10%] w-[60vw] h-[60vh] bg-indigo-600/8 blur-[90px] rounded-full mix-blend-soft-light"
      />
    </div>
  );
}
