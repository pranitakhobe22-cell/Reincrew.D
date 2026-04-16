"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Target, ShieldCheck, Cpu, Globe, Rocket, Users, User, BadgeCheck, Sparkles, Zap, ArrowRight, Shield, BarChart3 } from "lucide-react";
import SecondaryPageLayout from "@/components/SecondaryPageLayout";

const VALUES = [
  {
    icon: <Heart className="text-pink-500" size={24} />,
    title: "Empathy First",
    desc: "We design AI that understands the human behind the resume, prioritizing the candidate's emotional journey and dignity.",
    accent: "bg-pink-50",
  },
  {
    icon: <ShieldCheck className="text-emerald-500" size={24} />,
    title: "Unbiased Evaluation",
    desc: "Our algorithms are engineered to filter out noise and focus purely on merit, potential, and human capability.",
    accent: "bg-emerald-50",
  },
  {
    icon: <Cpu className="text-indigo-500" size={24} />,
    title: "Precision Tech",
    desc: "Powered by state-of-the-art behavioral analysis engines to provide the most high-fidelity feedback available.",
    accent: "bg-indigo-50",
  },
];

const MILESTONES = [
  { 
    stage: "The Vision", 
    title: "Origins & Intent",
    text: "Born from a simple idea: that technology should bridge, not block, human connection.",
    icon: <Sparkles size={18} />
  },
  { 
    stage: "The Engine", 
    title: "Core Innovation",
    text: "Building the world's most sophisticated behavioral and technical analysis models.",
    icon: <Zap size={18} />
  },
  { 
    stage: "The Impact", 
    title: "Global Reach",
    text: "Empowering millions to face high-stakes interviews with confidence and clarity.",
    icon: <Globe size={18} />
  },
];

const IMPACT_STATS = [
  {
    label: "Target Impact",
    value: "100M+",
    desc: "Candidates empowered by 2030",
    icon: <Users className="text-primary" size={24} />,
  },
  {
    label: "Analysis Accuracy",
    value: "99.2%",
    desc: "High-fidelity feedback engine",
    icon: <Target className="text-accent" size={24} />,
  },
  {
    label: "AI Framework",
    value: "Ethical",
    desc: "Privacy-first & bias-free design",
    icon: <Shield className="text-emerald-500" size={24} />,
  },
];

export default function AboutPage() {
  return (
    <SecondaryPageLayout>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center mb-32 relative pt-8"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-10" />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm text-primary text-xs font-black uppercase tracking-[0.2em] mb-8 ring-1 ring-slate-100">
          <BadgeCheck size={14} /> Our Mission
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-slate-900 font-bold tracking-tight mb-10 leading-[1.05]">
          Reimagining <br className="hidden md:block" />
          <span className="text-primary italic">human potential.</span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
          We are moving beyond technical assessment to build a platform where empathy and precision coexist. Reincrew.AI is the bridge to your next big leap.
        </p>
      </motion.div>

      {/* Story Section - Creative Staggered Layout */}
      <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center mb-40">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6 border border-slate-100">
             Genesis
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 font-semibold mb-8 tracking-tight">
            Why We Started.
          </h2>
          <div className="space-y-8 text-lg text-slate-500 leading-relaxed font-medium">
            <p>
              Traditional hiring is often a black box. Candidates spend hours preparing for interviews, only to receive generic rejections or, worse, silence.
            </p>
            <div className="relative p-8 rounded-3xl bg-slate-50/50 border-l-4 border-primary/20">
               <p className="italic text-slate-600 text-xl font-serif leading-relaxed">
                &quot;We decided to build the tool we wish we had: a platform that doesn&apos;t just judge, but coaches and evaluates with surgical precision.&quot;
               </p>
            </div>
            <p>
              By leveraging ethics-first AI, we&apos;re ensuring that every interaction is an opportunity for growth, regardless of the outcome.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full relative group"
        >
          {/* Dashboard Container */}
          <div className="relative bg-slate-50/50 border border-slate-100 rounded-[48px] p-4 md:p-8 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.03)_0%,transparent_50%)]" />
            
            <div className="flex flex-col gap-6 relative z-10">
              {/* Top Row: Candidate Profile (Wide) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-900/10">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 leading-none mb-1.5">Candidate Evaluation</h4>
                    <div className="text-[10px] uppercase font-black tracking-[0.15em] text-emerald-500 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       Real-time Session
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                   {[
                     { label: "Technical Competence", value: "92%", color: "bg-primary" },
                     { label: "Communication Flow", value: "88%", color: "bg-indigo-400" },
                     { label: "Problem Solving", value: "95%", color: "bg-slate-900" },
                     { label: "Emotional Intel", value: "90%", color: "bg-slate-400" }
                   ].map((skill, idx) => (
                     <div key={idx}>
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                           <span>{skill.label}</span>
                           <span className="text-slate-900">{skill.value}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: skill.value }}
                             transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                             className={`h-full ${skill.color}`} 
                           />
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>

              {/* Bottom Row: Stats & Logic (Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Confidence Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                     <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Certainty Index</div>
                     <BarChart3 size={16} className="text-primary" />
                  </div>
                  <div className="flex items-baseline gap-2">
                     <span className="text-5xl font-serif font-black text-slate-900">98</span>
                     <span className="text-sm font-bold text-emerald-500">.2%</span>
                  </div>
                  <div className="mt-4 p-2.5 rounded-2xl bg-slate-50 border border-slate-100/50 flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-emerald-500" />
                     <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">High Fidelity</span>
                  </div>
                </motion.div>

                {/* AI Logic Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-slate-900 p-6 rounded-[32px] border border-slate-800 shadow-xl flex flex-col justify-between group/logic"
                >
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                        <Cpu size={16} className="text-primary" />
                     </div>
                     <div className="text-[10px] font-black uppercase tracking-widest text-white/50">AI Decision Logic</div>
                  </div>
                  <p className="text-xs font-medium leading-relaxed text-white/90 italic mb-4">
                     &quot;Detected strong architectural pattern recognition in the candidate&apos;s explanation.&quot;
                  </p>
                  <div className="flex items-center justify-between">
                     <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                     <div className="text-[9px] font-black uppercase tracking-widest text-primary">Insight Log #429</div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Philosophy Section */}
      <div className="mb-40">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl font-serif text-slate-900 font-semibold mb-4 tracking-tight">Our Core Philosophy</h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Engineering a future where technology amplifies human talent instead of replacing it.
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-slate-100 mx-12 mb-4" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group p-10 rounded-[32px] bg-white border border-slate-100 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className={`w-16 h-16 rounded-2xl ${value.accent} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm shadow-black/5`}>
                {value.icon}
              </div>
              <h3 className="text-2xl font-serif text-slate-900 font-bold mb-4">{value.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Creative Horizontal Timeline */}
      <div className="mb-40 px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-serif text-slate-900 font-semibold mb-3 tracking-tight">The Growth Engine</h2>
          <p className="text-slate-500 font-medium">A journey of relentless focus and technical mastery.</p>
        </div>
        
        <div className="relative">
          {/* Main timeline path */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 -z-10 opacity-60" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {MILESTONES.map((item, i) => (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-card-bg border border-border rounded-[32px] p-8 md:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.02)] group hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500"
              >
                {/* Connector point */}
                <div className="absolute top-1/2 -left-1.5 w-3 h-3 rounded-full bg-primary border-4 border-white shadow-sm hidden md:block" />
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 shadow-xl shadow-slate-900/10 flex items-center justify-center text-white group-hover:bg-primary transition-colors duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">{item.stage}</div>
                    <h4 className="text-xl font-serif text-slate-900 font-bold tracking-tight">{item.title}</h4>
                  </div>
                </div>
                <p className="text-slate-500 text-[15px] leading-relaxed font-medium">{item.text}</p>
                
                {i < 2 && (
                  <div className="absolute top-1/2 -right-10 hidden lg:flex items-center text-slate-300">
                    <ArrowRight size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Redesigned Impact/Vision Section */}
      <div className="mb-40 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 font-bold tracking-tight mb-6 leading-tight">
               Our Vision for the <br /> 
               <span className="text-primary italic">Global Workforce.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
               We aim to empower 100 million individuals by providing them with the world&apos;s most sophisticated 
               career companion.
            </p>
          </motion.div>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {IMPACT_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group bg-card-bg border border-border p-8 rounded-[40px] shadow-[0_15px_45px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.05)] transition-all flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-6 shadow-xs border border-slate-100">
                {stat.icon}
              </div>
              <div className="text-4xl lg:text-5xl font-serif font-black text-slate-900 mb-2">{stat.value}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">{stat.label}</div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SecondaryPageLayout>
  );
}
