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
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (typingComplete) {
      onContentReveal();
    }
  }, [typingComplete, onContentReveal]);

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

  const titleText = "Master the Art of the Interview";
  
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-[8%] pt-32 pb-16 overflow-hidden">
      
      <div className="w-full max-w-7xl mx-auto">
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
              <h2 className="text-3xl md:text-4xl font-black text-primary/70 text-center tracking-tight">
                {QUESTIONS[questionIdx]}
              </h2>
            </motion.div>
          ) : phase === "content" ? (
            <motion.div 
              key="split-content"
              initial={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center mt-12"
            >

              {/* Left: Tagline Section */}
              <div className="lg:col-span-7">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1E293B] leading-[1.08] mb-10 tracking-tight font-semibold flex flex-col items-start gap-2">
                  <div className="flex flex-wrap">
                    {"Master the Art".split("").map((char, index) => (
                      <motion.span
                        key={`l1-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          duration: 0.05, 
                          delay: index * 0.04,
                          ease: "easeIn" 
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex flex-wrap text-primary">
                    {"of the Interview".split("").map((char, index) => (
                      <motion.span
                        key={`l2-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          duration: 0.05, 
                          delay: (index + 15) * 0.04, // Continue delay from line 1
                          ease: "easeIn" 
                        }}
                        onAnimationComplete={() => {
                          if (index === "of the Interview".length - 1) setTypingComplete(true);
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </div>
                </h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: typingComplete ? 1 : 0, y: typingComplete ? 0 : 20 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-xl md:text-2xl text-text-muted max-w-2xl leading-relaxed font-dm font-medium"
                >
                  The powerful intersection of talent and opportunity. Empowering candidates to master their interviews while helping HR teams identify top talent with hyper-realistic AI assessments.
                </motion.p>
              </div>

              {/* Right: Aligned CTA Cards */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                {/* Join Interview Card */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: typingComplete ? 0 : 50, opacity: typingComplete ? 1 : 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  className="w-full max-w-[420px] z-10"
                >
                  <Link
                    href="/login"
                    className="group block p-7 rounded-[1.75rem] bg-white/60 backdrop-blur-xl border border-white/60 shadow-xl hover:shadow-2xl hover:border-indigo-500/30 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 pointer-events-none">
                       <User size={240} className="text-indigo-900" />
                    </div>
                    <div className="flex flex-col items-start gap-5 relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-slate-50 text-slate-800 border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                        <User size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif text-[#1E293B] mb-2 group-hover:text-slate-900 transition-colors">Join Interview</h3>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-[280px]">
                          Prepare for the role you&apos;ve earned. Begin your secure, AI-conducted career assessment.
                        </p>
                      </div>
                      <div className="mt-1 flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-indigo-900/40 tracking-[0.2em] uppercase">
                          For Candidates
                        </span>
                        <span 
                          className="inline-flex items-center gap-3 text-sm font-black text-indigo-950 tracking-widest group-hover:gap-5 transition-all uppercase"
                        >
                          Start Prep <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Admin Portal Card */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: typingComplete ? 0 : 50, opacity: typingComplete ? 1 : 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  className="w-full max-w-[420px] z-0"
                >
                  <Link
                    href="/admin"
                    className="group block p-7 rounded-[1.75rem] bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl hover:shadow-[0_30px_80px_rgba(15,23,42,0.4)] hover:border-slate-600 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden text-white"
                  >
                    <div className="absolute -bottom-10 -right-10 p-8 opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 pointer-events-none">
                       <Shield size={240} className="text-white" />
                    </div>
                    <div className="flex flex-col items-start gap-5 relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:bg-white group-hover:text-slate-900 transition-all duration-500">
                        <Shield size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif text-white mb-2">Admin Portal</h3>
                        <p className="text-indigo-100 text-sm leading-relaxed max-w-[280px]">
                          Streamline your hiring workflow. Use our AI to evaluate candidates at scale.
                        </p>
                      </div>
                      <div className="mt-1 flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-indigo-100/50 tracking-[0.2em] uppercase">
                          For HRs
                        </span>
                        <span 
                          className="inline-flex items-center gap-3 text-sm font-black text-white tracking-widest group-hover:gap-5 transition-all uppercase"
                        >
                          Launch Portal <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="settling-placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[300px]" 
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
