"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { UserCircle, Mic, TrendingUp, Mail, Users, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"candidates" | "recruiters">("candidates");

  const candidateSteps = [
    {
      title: "Set Up Your Profile",
      desc: "Create your professional profile and tell us about your target role to receive tailored, relevant interview scenarios.",
      visual: <UserCircle className="w-8 h-8 text-primary/70" strokeWidth={1.5} />,
      number: "01",
    },
    {
      title: "Experience the Interview",
      desc: "Engage in a natural, conversational voice interview. It feels just like speaking with a real hiring manager.",
      visual: <Mic className="w-8 h-8 text-primary/70" strokeWidth={1.5} />,
      number: "02",
    },
    {
      title: "Review & Grow",
      desc: "Receive detailed, constructive feedback on your communication and conceptual skills to help you confidently land your next role.",
      visual: <TrendingUp className="w-8 h-8 text-primary/70" strokeWidth={1.5} />,
      number: "03",
    },
  ];

  const recruiterSteps = [
    {
      title: "Define Your Needs",
      desc: "Set your specific hiring criteria and send invites seamlessly through your existing ATS or our platform.",
      visual: <Mail className="w-8 h-8 text-primary/70" strokeWidth={1.5} />,
      number: "01",
    },
    {
      title: "Consistent & Fair Screening",
      desc: "Every candidate receives the exact same high-quality interview experience, evaluated fairly on a standardized rubric.",
      visual: <Users className="w-8 h-8 text-primary/70" strokeWidth={1.5} />,
      number: "02",
    },
    {
      title: "Hire with Confidence",
      desc: "Review clear performance insights, watch candidate highlights, and confidently make data-driven hiring decisions.",
      visual: <CheckCircle2 className="w-8 h-8 text-primary/70" strokeWidth={1.5} />,
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
