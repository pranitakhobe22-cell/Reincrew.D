"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Target, ShieldCheck, Cpu, Globe, Rocket, Users, BadgeCheck, Sparkles, Zap, ArrowRight, Shield } from "lucide-react";
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
        className="text-center mb-32 relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-10" />
        
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-primary text-xs font-black uppercase tracking-[0.2em] mb-8">
          <BadgeCheck size={14} /> Our Mission
        </div>
        
        <h1 className="text-6xl md:text-8xl font-serif text-[#1E293B] font-bold tracking-tighter mb-10 leading-[0.95]">
          Reimagining the <br />
          <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent italic">human potential.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
          We are moving beyond technical assessment to build a platform where empathy and precision coexist. Reincrew.AI is the bridge to your next big leap.
        </p>
      </motion.div>

      {/* Story Section - Creative Staggered Layout */}
      <div className="flex flex-col md:flex-row gap-20 items-center mb-40">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#1E293B] font-semibold mb-8 tracking-tight">
            Why We Started.
          </h2>
          <div className="space-y-8 text-lg text-slate-500 leading-relaxed font-medium">
            <p>
              Traditional hiring is often a black box. Candidates spend hours preparing for interviews, only to receive generic rejections or, worse, silence.
            </p>
            <p className="border-l-4 border-primary/20 pl-8 italic text-slate-600">
              &quot;We decided to build the tool we wish we had: a platform that doesn&apos;t just judge, but coaches and evaluates with surgical precision.&quot;
            </p>
            <p>
              By leveraging ethics-first AI, we&apos;re ensuring that every interaction is an opportunity for growth, regardless of the outcome.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 relative group"
        >
          <div className="aspect-4/5 rounded-[60px] bg-linear-to-br from-white to-slate-50 border border-slate-100 shadow-2xl relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.1)_0%,transparent_60%)]" />
            <Rocket size={160} className="text-primary/20 group-hover:scale-110 transition-transform duration-1000 ease-in-out" />
            
            {/* Contextual UI elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full p-12 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-lg border border-white/50 animate-bounce" style={{ animationDuration: '4s' }}>
                  <Sparkles className="text-amber-500" size={24} />
                </div>
                <div className="bg-white/90 backdrop-blur-md p-5 rounded-[32px] shadow-lg border border-white/50">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Accuracy</div>
                  <div className="text-2xl font-serif font-bold text-primary">99.2%</div>
                </div>
              </div>
              <div className="flex justify-center">
                 <div className="bg-slate-900 border border-slate-800 px-8 py-4 rounded-full flex items-center gap-4 shadow-2xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">System Active</span>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Philosophy Section */}
      <div className="mb-40">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl font-serif text-[#1E293B] font-semibold mb-4 tracking-tight">Our Core Philosophy</h2>
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
              transition={{ delay: i * 0.1 }}
              className="group p-10 rounded-[40px] bg-white border border-slate-100 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.08)]"
            >
              <div className={`w-14 h-14 rounded-2xl ${value.accent} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {value.icon}
              </div>
              <h3 className="text-2xl font-serif text-[#1E293B] font-bold mb-4">{value.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Creative Horizontal Timeline */}
      <div className="mb-40 px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-serif text-[#1E293B] font-semibold mb-3 tracking-tight">The Growth Engine</h2>
          <p className="text-slate-500 font-medium">A journey of relentless focus and technical mastery.</p>
        </div>
        
        <div className="relative">
          {/* Main timeline path */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 -z-10" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {MILESTONES.map((item, i) => (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative bg-white/40 backdrop-blur-xl border border-white p-10 rounded-[48px] shadow-sm group hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Connector point */}
                <div className="absolute top-1/2 -left-1.5 w-3 h-3 rounded-full bg-primary border-4 border-white shadow-sm hidden md:block" />
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary shadow-lg shadow-primary/20 flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{item.stage}</div>
                    <h4 className="text-xl font-serif text-[#1E293B] font-bold">{item.title}</h4>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.text}</p>
                
                {i < 2 && (
                  <div className="absolute top-1/2 -right-12 hidden lg:flex items-center text-slate-200">
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
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#1E293B] font-bold tracking-tight mb-6 leading-tight">
               Our Vision for the <br /> 
               <span className="text-primary italic">Global Workforce.</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
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
              transition={{ delay: i * 0.1 }}
              className="bg-white/60 backdrop-blur-xl border border-white p-10 rounded-[48px] text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 shadow-[0_15px_45px_-15px_rgba(0,0,0,0.04)]"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-6 shadow-sm">
                {stat.icon}
              </div>
              <div className="text-4xl font-serif font-black text-[#1E293B] mb-2">{stat.value}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">{stat.label}</div>
              <p className="text-slate-400 text-sm font-medium">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SecondaryPageLayout>
  );
}
