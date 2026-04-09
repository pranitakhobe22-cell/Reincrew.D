"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    // Show links after the initial splash/logo move (~2.5s)
    const timer = setTimeout(() => setShowLinks(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.nav 
      className="fixed top-0 left-0 w-full z-50 px-[8%] py-4"
    >
      <motion.div 
        layout
        className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-[#FCFCF9]/80 border border-white shadow-sm rounded-full px-8 py-3"
      >
        {/* Left Side: Features */}
        <motion.div 
          animate={{ opacity: showLinks ? 1 : 0 }}
          className="flex items-center gap-10 flex-1"
        >
          <Link href="#features" className="text-sm font-medium text-[#1E293B] hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-[#1E293B] hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="text-sm font-medium text-[#1E293B] hover:text-primary transition-colors">
            Our AI
          </Link>
        </motion.div>

        {/* Center: Logo (Physical target) */}
        <div className="flex justify-center">
          <Link href="/">
            <Logo size={32} />
          </Link>
        </div>

        {/* Right Side: Auth */}
        <motion.div 
          animate={{ opacity: showLinks ? 1 : 0 }}
          className="flex items-center justify-end gap-8 flex-1"
        >
          <Link href="/login" className="text-sm font-medium text-[#1E293B] hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link 
            href="/login?tab=register" 
            className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/95 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}
