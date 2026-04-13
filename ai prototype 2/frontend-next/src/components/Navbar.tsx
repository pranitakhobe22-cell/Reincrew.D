"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "Our AI" }
];

export default function Navbar({ 
  showLinks = false,
  isStatic = false 
}: { 
  showLinks?: boolean;
  isStatic?: boolean;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const NavContainer = isStatic ? "nav" : motion.nav;
  const SubSection = isStatic ? "div" : motion.div;

  return (
    <NavContainer 
      {...(!isStatic && {
        initial: { y: -100 },
        animate: { y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      })}
      className="fixed top-0 left-0 w-full z-50 px-6 sm:px-[8%] py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo size={32} isStatic={isStatic} />
          </Link>
        </div>

        {/* Center: Floating Dock (Only show if showLinks is true) */}
        <SubSection 
          {...(!isStatic ? {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: showLinks ? 1 : 0, y: showLinks ? 0 : -20 }
          } : {
            className: showLinks ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
          })}
          className="hidden md:flex flex-1 justify-center pointer-events-auto transition-all duration-300"
        >
          <div 
            className="flex items-center gap-1 p-1.5 backdrop-blur-2xl bg-white/40 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-full relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {NAV_LINKS.map((link, idx) => (
              <Link 
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="relative px-5 py-2 rounded-full text-sm font-medium text-slate-700 hover:text-indigo-950 transition-colors z-10"
              >
                {link.label}
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-white/70 rounded-full -z-10 shadow-sm border border-white/80"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </SubSection>

        {/* Right Side: Auth */}
        <SubSection 
          {...(!isStatic ? {
            initial: { opacity: 0 },
            animate: { opacity: showLinks ? 1 : 0 }
          } : {
            className: showLinks ? "opacity-100" : "opacity-0"
          })}
          className="flex-1 flex items-center justify-end gap-6 transition-opacity duration-300"
        >
          <Link 
            href="/login" 
            className="hidden sm:block text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="#waitlist" 
            className="px-6 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            Get Early Access
          </Link>
        </SubSection>

      </div>
    </NavContainer>
  );
}
