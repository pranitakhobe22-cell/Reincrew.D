"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// ── Feature data ──────────────────────────────────────────────────────────────

/* Two highlighted features for the top row - Adapted from user provided content */
const highlighted = [
  {
    number: "01",
    img: "/images/feature_ai_interview.png",
    tag: "Core Experience",
    title: "AI Voice Interviewer",
    desc: "Asks role-specific interview questions via voice and interacts with candidates in real-time.",
    detail: "Voice questioning • Adaptive interaction",
  },
  {
    number: "02",
    img: "/images/feature_hr_dashboard.png",
    tag: "HR Tools",
    title: "Smart HR Dashboard",
    desc: "Rank candidates and view deep performance analytics alongside all interview recordings.",
    detail: "Candidate ranking • Performance analytics",
  },
];

/* Four standard features for the bottom grid - Adapted from user provided content */
const standard = [
  {
    number: "03",
    img: "/images/feature_video_audio.png",
    tag: "Infrastructure",
    title: "Video & Audio Records",
    desc: "Automatically captures every candidate session in high-fidelity for HR review.",
    detail: "Secure storage • Session archive",
  },
  {
    number: "04",
    img: "/images/feature_transcripts.png",
    tag: "Data & Review",
    title: "Speech to Text",
    desc: "Instantly converts audio responses into searchable transcripts for easy evaluation.",
    detail: "Auto-generated • Searchable text",
  },
  {
    number: "05",
    img: "/images/feature_rubrics.png",
    tag: "Evaluation",
    title: "Rubric Evaluation",
    desc: "Grades responses on conceptual depth, communication, grammar, and fluency.",
    detail: "Conceptual • Grammar • Fluency",
  },
  {
    number: "06",
    img: "/images/feature_analytics.png",
    tag: "Decision Support",
    title: "Final HR Authority",
    desc: "AI assists with data, but HR retains absolute authority over every final decision.",
    detail: "Human-led • Decision support",
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

export default function Features() {
  return (
    <section className="relative z-10 bg-[#FDFDFB] px-[5%] lg:px-[8%] py-32" id="features">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-[0.2em] mb-6 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            Platform Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight leading-tight mb-6"
          >
            Everything you need for a <span className="font-serif-italic text-primary">complete</span> screening pipeline.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-500 leading-relaxed font-medium"
          >
            Six tightly integrated capabilities engineered to bring clarity, fairness, and a human touch to the interview process.
          </motion.p>
        </div>

        {/* ── Top Row: 2 Highlighted Feature Cards (Horizontal Layout from Reincrew.D) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {highlighted.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="group relative bg-white border border-slate-100 rounded-[32px] p-8 lg:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-8"
            >
              {/* Image Section */}
              <div className="shrink-0 w-32 h-32 sm:w-44 sm:h-44 rounded-[24px] overflow-hidden bg-slate-50 border border-slate-100 relative shadow-sm">
                <Image
                  src={f.img}
                  alt={f.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Text Section */}
              <div className="flex-1 text-center sm:text-left">
                <div className="mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {f.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-serif text-slate-900 mb-3 leading-snug group-hover:text-primary transition-colors">
                  {f.title}
                </h3>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium mb-6">
                  {f.desc}
                </p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between sm:justify-start gap-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {f.detail}
                  </p>
                  <span className="text-xs font-mono font-bold text-slate-200 group-hover:text-primary/30 transition-colors ml-auto">
                    {f.number}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom Row: 4 Standard Feature Cards (Grid Layout from Reincrew.D) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {standard.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col"
            >
              {/* Image Header */}
              <div className="relative w-full aspect-[4/3] bg-slate-50 overflow-hidden">
                <Image
                  src={f.img}
                  alt={f.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white shadow-sm">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-primary">
                    {f.tag}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 lg:p-7 flex flex-col flex-1">
                <h3 className="text-xl font-serif text-slate-900 mb-3 leading-snug group-hover:text-primary transition-colors">
                  {f.title}
                </h3>
                <p className="text-[14px] text-slate-600 leading-relaxed font-medium mb-6 flex-1">
                  {f.desc}
                </p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    {f.detail}
                  </p>
                  <span className="text-xs font-mono font-bold text-slate-100 group-hover:text-primary/20 transition-colors">
                    {f.number}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
