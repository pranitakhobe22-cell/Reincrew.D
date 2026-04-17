"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// ── Animated Visuals for Candidates ──────────────────────────────────────────

function ProfileVisual() {
  return (
    <div className="relative w-14 h-12 flex items-center justify-center">
      {/* Profile Card */}
      <motion.div 
        className="w-10 h-12 bg-primary/5 rounded-lg border border-primary/20 flex flex-col items-center pt-2"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-4 h-4 rounded-full border-2 border-primary/40 mb-1.5" />
        <div className="w-6 h-1 rounded-full bg-primary/20 mb-1" />
        <div className="w-4 h-1 rounded-full bg-primary/20" />
      </motion.div>
      {/* Sparkles */}
      <motion.div 
        className="absolute top-1 right-0 w-1.5 h-1.5 bg-primary/60 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1 left-0 w-1 h-1 bg-primary/40 rounded-full"
        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  );
}

function MicVisual() {
  const bars = [8, 14, 20, 12, 6];
  return (
    <div className="flex items-center gap-1 w-14 h-12 justify-center">
      <div className="w-5 h-8 rounded-full border-2 border-primary/40 flex items-center justify-center shrink-0 mr-1 relative">
         {/* Mic head */}
         <div className="w-2 h-3 bg-primary/30 rounded-sm" />
      </div>
      <div className="flex items-center gap-0.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="w-1 bg-primary/40 rounded-full"
            animate={{ height: [h * 0.4, h, h * 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

function GrowthVisual() {
  return (
    <div className="relative w-14 h-12 flex items-end pb-1 border-b-2 border-l-2 border-slate-200">
      <motion.svg className="absolute w-full h-full inset-0 text-primary overflow-visible" fill="none">
        <motion.path
          d="M 2 35 L 15 25 L 28 28 L 45 10 L 52 12"
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Dot at the end */}
        <motion.circle 
          cx="45" cy="10" r="3" fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0, 1, 1], scale: [0, 0, 1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}

// ── Animated Visuals for Recruiters ──────────────────────────────────────────

function MailVisual() {
  return (
    <div className="relative w-14 h-12 flex items-center justify-center">
      {/* Central envelop outline */}
      <div className="relative w-8 h-6 border-2 border-primary/30 rounded bg-white z-10 flex items-center justify-center">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="absolute top-1 text-primary/40">
           <path d="M1 1L5 4L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      {/* Sending arrows */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full border-t-2 border-r-2 border-primary/40"
          style={{ transform: `rotate(45deg)` }}
          animate={{ x: [0, 12, 18], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
          initial={{ right: 8, top: 12 + i * 4 - 4 }}
        />
      ))}
    </div>
  );
}

function AIProcessVisual() {
  return (
    <div className="relative w-14 h-12 flex items-center justify-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3.5 h-3.5 rounded-full border-2 border-primary/30 flex items-center justify-center"
          animate={{ 
            borderColor: ["rgba(99,102,241,0.3)", "rgba(99,102,241,0.8)", "rgba(99,102,241,0.3)"],
            y: [0, -3, 0] 
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        >
          <div className="w-1 h-1 rounded-full bg-primary/40" />
        </motion.div>
      ))}
    </div>
  );
}

function DecisionVisual() {
  return (
    <div className="relative w-14 h-12 flex flex-col justify-center gap-1.5 pl-2">
      {[1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div 
            className="w-3 h-3 rounded-sm border-2 border-primary/30 flex items-center justify-center text-primary"
          >
            <motion.svg width="6" height="5" viewBox="0 0 6 5" fill="none">
              <motion.path 
                d="M1 2.5L2.5 4L5 1" 
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
              />
            </motion.svg>
          </motion.div>
          <div className="w-7 h-1.5 rounded-full bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"candidates" | "recruiters">("candidates");

  const candidateSteps = [
    {
      title: "Join & Prepare",
      desc: "Sign up and build your profile. Select the role you are applying for and get ready for a hyper-realistic mock interview.",
      visual: <ProfileVisual />,
      number: "01",
    },
    {
      title: "Take the AI Interview",
      desc: "Interact with our AI interviewer via voice. Your session is recorded and your responses are converted to text in real-time.",
      visual: <MicVisual />,
      number: "02",
    },
    {
      title: "Get Scored & Improve",
      desc: "Receive instant, multi-dimensional feedback on your conceptual understanding, communication, grammar, and fluency.",
      visual: <GrowthVisual />,
      number: "03",
    },
  ];

  const recruiterSteps = [
    {
      title: "Invite Candidates",
      desc: "Easily send interview links to a batch of candidates or integrate directly with your existing ATS workflow.",
      visual: <MailVisual />,
      number: "01",
    },
    {
      title: "AI Conducts Screening",
      desc: "Our platform simultaneously conducts and records hundreds of voice interviews, assessing each candidate on a uniform rubric.",
      visual: <AIProcessVisual />,
      number: "02",
    },
    {
      title: "Review & Decide",
      desc: "Access the HR dashboard to view ranked lists, watch recorded sessions, read transcripts, and make final hiring decisions.",
      visual: <DecisionVisual />,
      number: "03",
    },
  ];

  const currentSteps = activeTab === "candidates" ? candidateSteps : recruiterSteps;

  return (
    <section className="relative z-10 bg-transparent px-[8%] py-32" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 uppercase tracking-wider"
          >
            How It Works
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-[#1E293B] mb-8 font-semibold tracking-tight"
          >
            A Seamless Process for Everyone
          </motion.h2>

          <div className="flex justify-center mb-16 mt-8">
            <div className="p-1.5 bg-indigo-50/50 rounded-full flex relative w-max border border-slate-100 shadow-inner">
              {["candidates", "recruiters"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "candidates" | "recruiters")}
                  className={`relative px-8 py-3 mx-1 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeTab === tab ? "text-indigo-700" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <span className="relative z-10">
                    {tab === "candidates" ? "For Candidates" : "For Recruiters"}
                  </span>
                  {activeTab === tab && (
                    <motion.div
                      layoutId="howitworks-active-pill"
                      className="absolute inset-0 bg-card-bg rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-border z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Subtle connecting line visible on desktop */}
          <div className="hidden lg:block absolute top-[15%] left-[15%] right-[15%] h-px bg-linear-to-r from-transparent via-slate-200 to-transparent -z-10 opacity-60" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {currentSteps.map((step, i) => (
                <motion.div
                  key={`${activeTab}-${step.number}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                  className="relative group bg-card-bg border border-border/30 p-9 rounded-[32px] shadow-[0_5px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-500 z-10"
                >
                  {/* Step Number Subtle Background Background */}
                  <div className="absolute top-6 right-8 text-5xl font-black text-slate-50 group-hover:text-slate-100 transition-colors duration-500 select-none z-0">
                    {step.number}
                  </div>

                  <div className="relative z-10">
                    {/* Visual Container - Removed the harsh blue hover */}
                    <div className="w-16 h-16 rounded-2xl bg-border/40 flex items-center justify-center mb-8 border border-border group-hover:bg-indigo-50/30 group-hover:scale-105 transition-all duration-500">
                      {step.visual}
                    </div>
                    
                    <h3 className="text-xl font-serif text-[#1E293B] mb-3 relative inline-block group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-sm text-text-muted leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
