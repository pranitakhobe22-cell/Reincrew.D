"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Eye, Fingerprint } from "lucide-react";

export default function TrustSection() {
  const trustPillars = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Data Privacy",
      desc: "Your data is never used to train public models. We maintain strict security for all candidate information.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Transparent AI",
      desc: "No black boxes. Every insight and ranking includes a clear explanation of the AI's reasoning.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: <Fingerprint className="w-6 h-6" />,
      title: "Human-Centric",
      desc: "AI acts as your co-pilot, not a replacement. You retain full control and the final say in every decision.",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    }
  ];

  return (
    <section className="py-32 bg-[#FDFDFB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-[5%] lg:px-[8%] relative z-10">
        
        {/* ── Top Area: Statement & Visual ── */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-5/12 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-[0.2em] mb-8 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              Built on Trust
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Designed for <span className="font-serif-italic text-primary">Humans</span>, <br/>
              Powered by AI.
            </h2>
            
            <p className="text-lg text-slate-500 leading-relaxed font-medium max-w-lg">
              Technology should elevate human potential. Reincrew is built with transparency and data integrity at its core.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-7/12 relative w-full h-[400px] lg:h-[500px]"
          >
            <div className="absolute inset-0 rounded-[40px] overflow-hidden border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
              <Image 
                src="/images/hr_professional.png"
                alt="HR Professional reviewing insights"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
            
            {/* Overlay Glass Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-8 -left-4 lg:-left-12 lg:bottom-12 bg-white/95 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-2xl max-w-[320px] lg:max-w-[360px]"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100 shrink-0 shadow-sm relative mt-1">
                  <Image 
                    src="/images/candidate_interview.png" 
                    alt="Candidate" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Co-Pilot Insight</p>
                  </div>
                  <p className="text-[14px] font-medium text-slate-800 leading-snug">
                    "Candidate demonstrates exceptionally strong empathy and active listening skills during conflict resolution scenarios."
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* ── Bottom Area: Pillars ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustPillars.map((pillar, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-[32px] p-8 lg:p-10 border border-slate-100 hover:border-slate-200 transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              <div className={`w-14 h-14 rounded-2xl ${pillar.bg} ${pillar.color} flex items-center justify-center mb-8 shadow-sm`}>
                {pillar.icon}
              </div>
              <h4 className="text-xl font-serif font-semibold text-slate-900 mb-4">{pillar.title}</h4>
              <p className="text-[15px] text-slate-500 font-medium leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
