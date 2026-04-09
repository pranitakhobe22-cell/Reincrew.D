"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function Logo({ className = "", size = 40, showText = true }: LogoProps) {
  return (
    <motion.div 
      layout
      layoutId="brand-logo-container"
      className={`flex items-center gap-3 cursor-pointer ${className}`}
      transition={{ 
        type: "spring", 
        stiffness: 80, 
        damping: 18,
        mass: 1.2
      }}
    >
      <motion.div 
        layout
        className="relative flex-shrink-0" 
        style={{ width: size, height: size }}
      >
        <Image 
          src="/logo.png" 
          alt="Reincrew Logo" 
          fill 
          className="object-contain"
          priority
        />
      </motion.div>
      {showText && (
        <motion.div 
          layout
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-brand text-[#1E293B] tracking-tight font-bold whitespace-nowrap"
        >
          Reincrew<span className="text-primary">.AI</span>
        </motion.div>
      )}
    </motion.div>
  );
}
