'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import AboutUs from "@/components/AboutUs";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import SplashOverlay from "@/components/SplashOverlay";
import WaitlistWidget from "@/components/WaitlistWidget";


export type LandingPhase = 'splash' | 'settling' | 'questions' | 'content';

// Synchronously detect hash BEFORE first render to avoid any flash of the splash screen
function hasUrlHash(): boolean {
  if (typeof window === 'undefined') return false;
  return !!window.location.hash;
}

export default function Home() {
  // Lazy initialisers run synchronously on first render — no useEffect delay
  const [phase, setPhase] = useState<LandingPhase>(() =>
    hasUrlHash() ? 'content' : 'splash'
  );
  const [showNavLinks, setShowNavLinks] = useState<boolean>(() =>
    hasUrlHash()
  );

  // Whether we arrived via a hash link (skip intro animations entirely)
  const arrivedViaHash = useRef<boolean>(hasUrlHash());

  // After content mounts, scroll to the hash target
  useEffect(() => {
    if (!arrivedViaHash.current) return;
    const hash = window.location.hash.substring(1);
    if (!hash) return;
    // Small delay to allow sections to be rendered in the DOM
    const timer = setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  const handleSplashFinish = () => {
    setPhase('settling');
    setTimeout(() => setPhase('questions'), 800);
  };

  const handleQuestionsFinish = () => setPhase('content');

  return (
    <div className="relative min-h-screen">
      {/* Premium Background Layers */}
      <div className="motion-bg" />
      <div className="ai-grid" />

      <AnimatePresence>
        {phase === 'splash' ? (
          <SplashOverlay key="splash" onFinish={handleSplashFinish} />
        ) : (
          <motion.div
            key="main"
            // No fade-in when arriving via hash — content should appear instantly
            initial={{ opacity: arrivedViaHash.current ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: arrivedViaHash.current ? 0 : 0.5, ease: "easeOut" }}
            className="flex flex-col relative z-10"
          >
            <Navbar showLinks={showNavLinks} />

            <main className="flex-1">
              <Hero
                phase={phase}
                onQuestionsFinish={handleQuestionsFinish}
                onContentReveal={() => setShowNavLinks(true)}
              />

              <AnimatePresence>
                {phase === 'content' && (
                  <motion.div
                    initial={{ opacity: arrivedViaHash.current ? 1 : 0, y: arrivedViaHash.current ? 0 : 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: arrivedViaHash.current ? 0 : 0.8, delay: arrivedViaHash.current ? 0 : 0.5 }}
                  >
                    <div id="features"><Features /></div>
                    <div id="how-it-works"><HowItWorks /></div>
                    <div id="about"><AboutUs /></div>
                    <div id="pricing"><Pricing /></div>
                    <div id="waitlist"><WaitlistWidget /></div>
                    <Footer />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
