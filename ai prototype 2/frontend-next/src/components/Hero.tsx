"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { User, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const QUESTIONS = [
  "Preparing for placements or job interviews?",
  "Not sure how to answer interview questions?",
  "Want to save time on candidate screening?",
  "Need a smarter way to evaluate candidates?",
  "Ready to improve interview outcomes?"
];

export default function Hero({ startAnims }: { startAnims: boolean }) {
  const [phase, setPhase] = useState<"questions" | "content">("questions");
  const [questionIdx, setQuestionIdx] = useState(0);

  useEffect(() => {
    if (!startAnims) return;

    if (phase === "questions") {
      const timer = setInterval(() => {
        setQuestionIdx((prev) => {
          if (prev === QUESTIONS.length - 1) {
            clearInterval(timer);
            setTimeout(() => setPhase("content"), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 2200);
      return () => clearInterval(timer);
    }
  }, [phase, startAnims]);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-[8%] pt-20 pb-20 overflow-hidden">
      
      <div className="w-full max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {phase === "questions" ? (
            <motion.div 
              key="questions-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex justify-center items-center h-[300px]"
            >
              <AnimatePresence mode="wait">
                <motion.h2
                  key={questionIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-4xl md:text-5xl font-black text-primary/70 text-center tracking-tight"
                >
                  {QUESTIONS[questionIdx]}
                </motion.h2>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              key="split-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center mt-12"
            >
              {/* Left: Tagline Section */}
              <motion.div 
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 1, ease: "easeOut" }}
                className="lg:col-span-7"
              >
                <h1 className="text-6xl md:text-8xl font-serif text-[#1E293B] leading-[1.05] mb-10 tracking-tight font-semibold">
                  Master the Art<br />
                  <span className="text-primary">of the Interview</span>
                </h1>
                <p className="text-xl md:text-2xl text-text-muted max-w-2xl leading-relaxed font-dm font-medium">
                  The powerful intersection of talent and opportunity. Empowering candidates to master their interviews while helping HR teams identify top talent with hyper-realistic AI assessments.
                </p>
              </motion.div>

              {/* Right: CTA Cards */}
              <motion.div 
                className="lg:col-span-5 flex flex-col gap-8"
              >
                {/* Join Interview Card */}
                <motion.div 
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  className="group p-10 rounded-[40px] bg-white border border-slate-100 shadow-[0_15px_45px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_rgba(99,102,241,0.08)] transition-all flex flex-col items-start gap-5"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <User size={34} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-[#1E293B] mb-2">Join Interview</h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      Prepare for the role you've earned. Begin your secure, AI-conducted career assessment.
                    </p>
                  </div>
                  <Link 
                    href="/login" 
                    className="flex items-center gap-2 text-xs font-black text-primary tracking-widest group-hover:gap-4 transition-all"
                  >
                    GET STARTED <ArrowRight size={14} />
                  </Link>
                </motion.div>

                {/* Conduct Interview Card */}
                <motion.div 
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  className="group p-10 rounded-[40px] bg-slate-900 border border-slate-800 shadow-xl flex flex-col items-start gap-5"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                    <Shield size={34} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-white mb-2">Conduct Interview</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Streamline your hiring workflow. Use our AI to evaluate candidates at scale.
                    </p>
                  </div>
                  <Link 
                    href="/login" 
                    className="flex items-center gap-2 text-xs font-black text-white tracking-widest group-hover:gap-4 transition-all"
                  >
                    ADMIN PORTAL <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
