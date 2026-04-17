"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { User, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

import { LandingPhase } from "@/app/page";

const QUESTIONS = [
  "Preparing for placements or job interviews?",
  "Not sure how to answer interview questions?",
  "Want to save time on candidate screening?",
  "Need a smarter way to evaluate candidates?",
  "Ready to improve interview outcomes?"
];

export default function Hero({ 
  phase, 
  onQuestionsFinish,
  onContentReveal
}: { 
  phase: LandingPhase, 
  onQuestionsFinish: () => void,
  onContentReveal: () => void
}) {
  const [questionIdx, setQuestionIdx] = useState(0);

  useEffect(() => {
    if (phase === "content") {
      // With the new animation, we instantly reveal without waiting for letter typing
      onContentReveal();
    }
  }, [phase, onContentReveal]);

  useEffect(() => {
    if (phase === "questions") {
      const timer = setInterval(() => {
        setQuestionIdx((prev) => {
          if (prev === QUESTIONS.length - 1) {
            clearInterval(timer);
            setTimeout(() => onQuestionsFinish(), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 2200);
      return () => clearInterval(timer);
    }
  }, [phase, onQuestionsFinish]);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-[5%] lg:px-[8%] pt-20 pb-12 overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl rounded-tl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {phase === "questions" ? (
            <motion.div 
              key={`questions-${questionIdx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex justify-center items-center h-[300px]"
            >
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 text-center tracking-tight">
                {QUESTIONS[questionIdx]}
              </h2>
            </motion.div>
          ) : phase === "content" ? (
            <motion.div 
              key="main-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mt-8 w-full"
            >
              {/* Left: Tagline Section */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Top Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-xs lg:text-sm mb-6 lg:mb-8 ring-1 ring-primary/20"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Introducing Reincrew AI Evaluator
                </motion.div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.08] mb-6 lg:mb-8 tracking-tight max-w-4xl">
                  Master the Art of <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-indigo-500 to-purple-600">
                    the Interview
                  </span>
                </h1>
                
                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg md:text-xl lg:text-2xl text-slate-600 max-w-2xl leading-relaxed mb-10 lg:mb-0 font-medium"
                >
                  Elite career preparation meets advanced talent intelligence. Our platform uses voice AI and video analysis to score candidates with unmatched precision.
                </motion.p>
              </div>

              {/* Right: Action Cards */}
              <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 w-full max-w-md mx-auto lg:mx-0">
                {/* Join Interview Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="w-full"
                >
                  <button
                    onClick={() => {
                      const section = document.getElementById('early-access');
                      if (section) {
                        section.scrollIntoView({ behavior: 'auto' }); // Instant jump
                        const input = section.querySelector('input');
                        if (input) input.focus();
                        window.history.pushState(null, '', '#early-access');
                      }
                    }}
                    className="group flex flex-col h-full text-left p-6 md:p-8 lg:p-10 rounded-3xl bg-card-bg shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-400/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden w-full"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.05] group-hover:scale-125 transition-all duration-700 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                       <User size={240} className="text-slate-900" />
                    </div>
                    
                    <div className="flex items-center gap-4 mb-5 relative z-10">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-border/30 text-slate-800 border border-border flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                        <User size={28} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mb-1 block">For Candidates</span>
                        <h3 className="text-xl lg:text-2xl font-bold text-slate-900 transition-colors">Join Interview</h3>
                      </div>
                    </div>
                    
                    <p className="text-slate-500 text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 grow relative z-10">
                       Prepare for the role you&apos;ve earned. Register now for our exclusive AI assessments.
                    </p>
                    
                    <div className="mt-auto relative z-10">
                      <span className="inline-flex items-center gap-2 text-sm lg:text-[15px] font-bold text-slate-900 group-hover:gap-3 lg:group-hover:gap-4 transition-all">
                        Get Early Access <ArrowRight size={18} />
                      </span>
                    </div>
                  </button>
                </motion.div>

                {/* Admin Portal Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="w-full"
                >
                  <button
                    onClick={() => {
                      const section = document.getElementById('early-access');
                      if (section) {
                        section.scrollIntoView({ behavior: 'auto' }); // Instant jump
                        const input = section.querySelector('input');
                        if (input) input.focus();
                        window.history.pushState(null, '', '#early-access');
                      }
                    }}
                    className="group flex flex-col h-full text-left p-6 md:p-8 lg:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl hover:shadow-primary/20 hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden w-full"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.05] group-hover:scale-125 transition-all duration-700 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                       <Shield size={240} className="text-white" />
                    </div>
                    
                    <div className="flex items-center gap-4 mb-5 relative z-10">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                        <Shield size={28} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-1 block">For HR & Recruiters</span>
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">Admin Portal</h3>
                      </div>
                    </div>
                    
                    <p className="text-slate-400 text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 grow relative z-10">
                      Streamline your hiring workflow. Register for early access to evaluate candidates fairly and efficiently.
                    </p>
                    
                    <div className="mt-auto relative z-10">
                      <span className="inline-flex items-center gap-2 text-sm lg:text-[15px] font-bold text-white group-hover:gap-3 lg:group-hover:gap-4 transition-all">
                        Reserve Your Spot <ArrowRight size={18} />
                      </span>
                    </div>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="settling-placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[350px]" 
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
