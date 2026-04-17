"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, Info, Users, GraduationCap, Zap, ShieldCheck, BarChart4 } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<"students" | "hr">("students");

  const studentPlans = [
    {
      name: "Lite",
      desc: "Perfect for occasional practice and one-off interview prep.",
      price: "Coming Soon",
      features: [
        "Voice-conducted AI interviews",
        "Full audio & video recordings",
        "Speech-to-text transcripts",
        "Basic performance scoring",
      ],
      icon: <Zap className="text-primary" size={24} />,
    },
    {
      name: "Pro",
      desc: "Designed for serious job seekers aiming for consistency.",
      price: "Coming Soon",
      popular: true,
      features: [
        "Priority AI voice processing",
        "Speech-to-text transcripts",
        "Multi-dimensional scoring",
        "Complete recording history",
      ],
      icon: <BarChart4 className="text-primary" size={24} />,
    },
    {
      name: "Plus",
      desc: "For those who want unlimited training and premium UI.",
      price: "Coming Soon",
      features: [
        "Unlimited AI interviews",
        "Advanced grammar & fluency scoring",
        "Exclusive career roadmaps",
        "Priority technical support",
      ],
      icon: <GraduationCap className="text-primary" size={24} />,
    },
  ];

  const hrPlans = [
    {
      name: "Recruit Lite",
      desc: "Ideal for small teams or intermittent hiring needs.",
      price: "Coming Soon",
      features: [
        "AI voice candidate screening",
        "Speech-to-text transcripts",
        "Basic scoring (Communication)",
        "Interview recording access",
      ],
      icon: <Users className="text-primary" size={24} />,
    },
    {
      name: "Recruit Pro",
      desc: "Our most popular choice for growing organizations.",
      price: "Coming Soon",
      popular: true,
      features: [
        "Multi-dimensional scoring",
        "Conceptual rubric evaluation",
        "Ranked candidate dashboard",
        "Full performance analytics",
      ],
      icon: <ShieldCheck className="text-primary" size={24} />,
    },
    {
      name: "Enterprise",
      desc: "Full-scale solution for high-volume hiring workflows.",
      price: "Coming Soon",
      features: [
        "Custom conceptual rubrics",
        "Full decision-making dashboard",
        "High-volume screening tools",
        "Dedicated implementation team",
      ],
      icon: <BarChart4 className="text-primary" size={24} />,
    },
  ];

  const currentPlans = activeTab === "students" ? studentPlans : hrPlans;

  return (
    <section id="pricing" className="py-32 px-[8%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 uppercase tracking-wider"
          >
            Transparent Pricing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-[#1E293B] mb-8 font-semibold tracking-tight"
          >
            Choose Your Path to Success
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-text-muted max-w-2xl mx-auto mb-12 bg-card-bg p-4 rounded-2xl border border-border shadow-sm"
          >
            <Info size={18} className="text-primary shrink-0" />
            <p className="text-sm font-medium leading-relaxed italic">
              Every user receives the same unbiased AI evaluation. Pricing only reflects usage and scale, not intelligence.
            </p>
          </motion.div>

          <div className="flex justify-center mb-16">
            <div className="p-1.5 bg-indigo-50 rounded-full flex relative w-max border border-indigo-100 shadow-inner">
              {["students", "hr"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "students" | "hr")}
                  className={`relative px-8 py-3 mx-1 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeTab === tab ? "text-indigo-700" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <span className="relative z-10">
                    {tab === "students" ? "For Students" : "For Recruiters"}
                  </span>
                  {activeTab === tab && (
                    <motion.div
                      layoutId="pricing-active-pill"
                      className="absolute inset-0 bg-card-bg rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-border z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <AnimatePresence mode="wait">
            {currentPlans.map((plan, i) => (
              <motion.div
                key={`${activeTab}-${plan.name}`}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative p-10 rounded-[40px] border flex flex-col group transition-all duration-500 ${
                  plan.popular 
                    ? "bg-slate-900 border border-slate-700 shadow-2xl scale-105 z-20" 
                    : "bg-card-bg border border-border shadow-[0_15px_45px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(99,102,241,0.15)] z-10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:bg-card-bg group-hover:text-slate-900 transition-all duration-300 mb-8">
                  {plan.icon}
                </div>

                <h3 className={`text-xl font-serif mb-2 ${plan.popular ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-8 leading-relaxed font-medium ${plan.popular ? "text-slate-400" : "text-text-muted"}`}>
                  {plan.desc}
                </p>

                <div className="mb-10">
                  <span className={`text-4xl font-serif font-bold ${plan.popular ? "text-white" : "text-slate-900"}`}>
                    {plan.price}
                  </span>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                        plan.popular ? "bg-primary" : "bg-primary/10"
                      }`}>
                        <Check size={10} className={plan.popular ? "text-white" : "text-primary"} />
                      </div>
                      <span className={`text-sm font-medium ${plan.popular ? "text-slate-300" : "text-slate-600"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/login" className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all border text-center ${
                  plan.popular 
                    ? "bg-primary text-white border-primary hover:bg-card-bg hover:text-slate-900" 
                    : "bg-card-bg text-slate-900 border-border hover:border-primary hover:text-primary"
                }`}>
                  Get Started
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Credit Pack Section */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="bg-indigo-50 rounded-[40px] p-12 text-center border border-indigo-100"
        >
          <h3 className="text-xl font-serif text-slate-900 mb-4 tracking-tight">Need something flexible?</h3>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto font-medium">
            Purchase interview credits that never expire. Perfect for quick mock sessions or one-off assessments.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-card-bg px-8 py-4 rounded-2xl border border-border flex items-center gap-4">
              <Zap className="text-primary" size={20} />
              <div className="text-left">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Single Pack</div>
                <div className="text-sm font-bold text-slate-900">Coming Soon</div>
              </div>
            </div>
            <div className="bg-card-bg px-8 py-4 rounded-2xl border border-border flex items-center gap-4">
              <Zap className="text-primary" size={20} />
              <div className="text-left">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Bundle Pack</div>
                <div className="text-sm font-bold text-slate-900">Coming Soon</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Dynamic Background Elements */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 z-0" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/3 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0" />
    </section>
  );
}
