'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AboutUs from "@/components/AboutUs";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import SplashOverlay from "@/components/SplashOverlay";
import WaitlistWidget from "@/components/WaitlistWidget";
import BackgroundWaves from "@/components/BackgroundWaves";


export type LandingPhase = 'splash' | 'settling' | 'questions' | 'content';

export default function Home() {
  const [phase, setPhase] = useState<LandingPhase>('splash');
  const [showNavLinks, setShowNavLinks] = useState(false);

  const handleSplashFinish = () => {
    setPhase('settling');
    // Allow the logo to "settle" into the navbar position
    setTimeout(() => {
      setPhase('questions');
    }, 800);
  };

  const handleQuestionsFinish = () => {
    setPhase('content');
  };

  return (
    <div className="relative min-h-screen">
      {/* Premium Background Layers */}
      <div className="motion-bg" />
      <BackgroundWaves />

      <div className="ai-grid" />

      <AnimatePresence>
        {phase === 'splash' ? (
          <SplashOverlay key="splash" onFinish={handleSplashFinish} />
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
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
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <div id="features">
                      <Features />
                    </div>
                    <AboutUs />
                    <Pricing />
                    <div id="waitlist">
                      <WaitlistWidget />
                    </div>
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
