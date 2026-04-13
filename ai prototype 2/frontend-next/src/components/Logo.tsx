"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  hideIcon?: boolean;
  isStatic?: boolean;
}

export default function Logo({ 
  className = "", 
  size = 40, 
  showText = true,
  hideIcon = false,
  isStatic = false
}: LogoProps) {
  const Container = isStatic ? "div" : motion.div;
  const TextContainer = isStatic ? "div" : motion.div;
  const IconContainer = isStatic ? "div" : motion.div;

  return (
    <Container
      {...(!isStatic && {
        layout: true,
        layoutId: "brand-logo-container",
        transition: { 
          type: "spring", 
          stiffness: 80, 
          damping: 18,
          mass: 1.2
        }
      })}
      className={`flex items-center gap-3 cursor-pointer ${className}`}
    >
      {!hideIcon && (
        <IconContainer
          {...(!isStatic && { layout: true })}
          className="relative shrink-0" 
          style={{ width: size, height: size }}
        >
          <Image 
            src="/logo.png" 
            alt="Reincrew Logo" 
            fill 
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </IconContainer>
      )}
      {showText && (
        <TextContainer
          {...(!isStatic ? {
            layout: true,
            initial: { opacity: 0, x: -10 },
            animate: { opacity: 1, x: 0 }
          } : {})}
          className="text-2xl font-brand text-[#1E293B] tracking-tight font-bold whitespace-nowrap"
        >
          Reincrew<span className="text-primary">.AI</span>
        </TextContainer>
      )}
    </Container>
  );
}
