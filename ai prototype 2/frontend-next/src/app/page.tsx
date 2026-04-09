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

export default function Home() {
  const [splashFinished, setSplashFinished] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Premium Background Layers */}
      <div className="motion-bg" />
      <div className="ai-grid" />

      <AnimatePresence>
        {!splashFinished && (
          <SplashOverlay onFinish={() => setSplashFinished(true)} />
        )}
      </AnimatePresence>

      <div id="main-content" className="flex flex-col relative z-10">
        <Navbar />
        
        <main className="flex-1">
          <Hero startAnims={splashFinished} />
          
          <div id="features">
            <Features />
          </div>

          <AboutUs />

          <Pricing />
        </main>

        <Footer />
      </div>

      {/* Persistent floating particles */}
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className="glow-particle" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }} 
        />
      ))}

      <WaitlistWidget />
    </div>
  );
}
