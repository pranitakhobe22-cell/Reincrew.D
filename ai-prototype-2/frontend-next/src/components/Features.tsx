"use client";

import { motion } from "framer-motion";

// ── Animated Visuals ──────────────────────────────────────────────────────────

function VoiceWave() {
  const heights = [6, 12, 18, 14, 8, 16, 10, 20, 13, 7];
  return (
    <svg width="88" height="32" viewBox="0 0 88 32" className="text-primary">
      {heights.map((h, i) => (
        <motion.rect
          key={i}
          x={i * 9 + 2}
          width="5"
          rx="2.5"
          fill="currentColor"
          opacity={0.75}
          animate={{
            height: [h, h * 1.9, h],
            y: [16 - h / 2, 16 - (h * 1.9) / 2, 16 - h / 2],
          }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.09, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

function RecordVisual() {
  return (
    <div className="relative w-14 h-10 flex items-center">
      <div className="w-10 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
        <div className="w-3.5 h-3.5 rounded-full border-2 border-primary/40" />
      </div>
      <div className="w-2.5 h-4 bg-primary/10 rounded-r-sm border border-l-0 border-primary/20" />
      <motion.div
        className="absolute -top-1 left-7 w-2.5 h-2.5 rounded-full bg-red-400"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function TranscriptVisual() {
  const lines = [72, 88, 54, 68];
  return (
    <div className="space-y-1.5">
      {lines.map((w, i) => (
        <motion.div
          key={i}
          className="h-1.5 bg-primary/25 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: [0, w, w, 0] }}
          transition={{
            duration: 0.7,
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 1.0,
            ease: "easeOut",
            times: [0, 0.4, 0.8, 1],
          }}
        />
      ))}
    </div>
  );
}

function RubricVisual() {
  return (
    <div className="space-y-1.5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            className="w-4 h-4 rounded border-2 border-primary/25 flex items-center justify-center shrink-0"
            animate={{ borderColor: ["rgba(99,102,241,0.25)", "rgba(99,102,241,0.9)", "rgba(99,102,241,0.25)"] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.45 }}
          >
            <motion.svg width="8" height="8" viewBox="0 0 8 8" className="text-primary">
              <motion.path
                d="M1.5 4 L3.2 5.8 L6.5 2"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.45 }}
              />
            </motion.svg>
          </motion.div>
          <div className="h-1.5 bg-primary/12 rounded-full" style={{ width: [68, 80, 55][i] }} />
        </div>
      ))}
    </div>
  );
}

function ScoreVisual() {
  const bars = [
    { label: "C", pct: 85 },
    { label: "G", pct: 72 },
    { label: "F", pct: 91 },
    { label: "U", pct: 78 },
  ];
  return (
    <div className="flex items-end gap-2.5 h-10">
      {bars.map((b, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          <motion.div
            className="w-5 bg-primary/30 rounded-t"
            animate={{ height: [`0px`, `${b.pct * 0.36}px`] }}
            transition={{ duration: 0.7, delay: i * 0.14, repeat: Infinity, repeatDelay: 1.6, ease: "easeOut" }}
          />
          <span className="text-[8px] font-bold text-primary/45 leading-none">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="grid grid-cols-2 gap-1.5 w-20">
      <div className="bg-primary/8 rounded-md p-1.5 space-y-1">
        {[100, 70, 50].map((w, i) => (
          <motion.div
            key={i}
            className="h-1.5 bg-primary/30 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.35 }}
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
      <div className="flex items-center justify-center bg-primary/5 rounded-md">
        <motion.svg width="26" height="26" viewBox="0 0 28 28" className="text-primary">
          <circle cx="14" cy="14" r="9" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="4" />
          <motion.circle
            cx="14" cy="14" r="9"
            fill="none" stroke="currentColor" strokeOpacity="0.75" strokeWidth="4"
            strokeDasharray="56.5"
            strokeLinecap="round"
            transform="rotate(-90 14 14)"
            animate={{ strokeDashoffset: [56.5, 12, 56.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>
      <div className="col-span-2 bg-primary/8 rounded-md px-1.5 py-1 flex items-center gap-1">
        {[55, 80, 40].map((w, i) => (
          <motion.div
            key={i}
            className="h-1.5 bg-primary/30 rounded-full"
            animate={{ width: [`0px`, `${w * 0.22}px`] }}
            transition={{ duration: 0.6, delay: i * 0.18, repeat: Infinity, repeatDelay: 1.8 }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Feature data ──────────────────────────────────────────────────────────────

/* Two highlighted features for the top row */
const highlighted = [
  {
    visual: <VoiceWave />,
    title: "AI Voice Interviewer",
    desc: "Our AI conducts live interviews by asking role-specific questions through voice — creating a realistic, pressure-tested environment.",
    tag: "Core",
  },
  {
    visual: <DashboardVisual />,
    title: "HR Intelligence Dashboard",
    desc: "Ranked candidate lists, interview recordings, performance analytics — with full decision-making authority retained by HR.",
    tag: "Dashboard",
  },
];

/* Four standard features for the bottom grid */
const standard = [
  {
    visual: <RecordVisual />,
    title: "Audio & Video Recording",
    desc: "Every session is captured in full — giving candidates replay access and HR an unalterable record.",
  },
  {
    visual: <TranscriptVisual />,
    title: "Speech-to-Text Transcription",
    desc: "Responses auto-convert to precise transcripts in real time, enabling rigorous analysis.",
  },
  {
    visual: <RubricVisual />,
    title: "Rubric-Based Evaluation",
    desc: "Responses are graded against structured conceptual rubrics — consistent and unbiased.",
  },
  {
    visual: <ScoreVisual />,
    title: "Multi-Dimensional Scoring",
    desc: "Scored on Conceptual Understanding, Communication, Grammar, and Fluency.",
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

export default function Features() {
  return (
    <section className="relative z-10 bg-transparent px-[8%] py-24" id="features">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-5 uppercase tracking-wider"
          >
            Platform Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-serif text-[#1E293B] mb-4 tracking-tight font-semibold"
          >
            Built for Smarter Hiring, End to End
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-medium"
          >
            From AI-conducted voice interviews to multi-dimensional scoring and a full HR dashboard — Reincrew handles the entire screening pipeline.
          </motion.p>
        </div>

        {/* ── Top Row: 2 Highlighted Feature Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {highlighted.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
              className="group relative bg-card-bg border border-border rounded-[28px] p-8 lg:p-10 shadow-[0_6px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle decorative gradient */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/3 blur-2xl pointer-events-none group-hover:bg-primary/6 transition-colors duration-500" />

              <div className="relative z-10 flex items-start gap-6">
                {/* Visual container */}
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-border/40 border border-border flex items-center justify-center group-hover:bg-indigo-50/40 group-hover:scale-105 transition-all duration-500">
                  {feature.visual}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2">
                    {feature.tag}
                  </span>
                  <h3 className="text-xl font-serif text-[#1E293B] mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom Row: 4 Standard Feature Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {standard.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
              className="group bg-card-bg border border-border p-7 rounded-[24px] shadow-[0_6px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-500"
            >
              {/* Visual */}
              <div className="flex items-center justify-start h-12 mb-5">
                {feature.visual}
              </div>

              <h3 className="text-lg font-serif text-[#1E293B] mb-2 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-[13px] text-text-muted leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
