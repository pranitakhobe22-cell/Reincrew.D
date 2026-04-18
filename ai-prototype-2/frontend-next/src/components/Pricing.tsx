"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, Info, Users, GraduationCap, Zap, ShieldCheck, BarChart4 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<"students" | "hr">("students");

  const studentPlans = [
    {
      name: "Lite",
      desc: "Perfect for occasional practice and one-off interview prep.",
      price: "Coming Soon",
      img: "/images/img_price_1.jpg",
      features: [
        "Full, unbiased AI feedback",
        "Pay-per-credit access",
        "Detailed performance report",
        "Core interview experience",
      ],
      icon: <Zap className="text-primary" size={24} />,
    },
    {
      name: "Pro",
      desc: "Designed for serious job seekers aiming for consistency.",
      price: "Coming Soon",
      popular: true,
      img: "/images/img_price_2.jpg",
      features: [
        "Full, unbiased AI feedback",
        "Higher monthly interview limit",
        "Progress tracking dashboard",
        "Complete interview history",
      ],
      icon: <BarChart4 className="text-primary" size={24} />,
    },
    {
      name: "Plus",
      desc: "For those who want unlimited training and advanced UI.",
      price: "Coming Soon",
      img: "/images/img_price_3.jpg",
      features: [
        "Full, unbiased AI feedback",
        "Unlimited mock interviews",
        "Advanced analytics UI",
        "Exclusive career roadmaps",
      ],
      icon: <GraduationCap className="text-primary" size={24} />,
    },
  ];

  const hrPlans = [
    {
      name: "Recruit Lite",
      desc: "Ideal for small teams or intermittent hiring needs.",
      price: "Coming Soon",
      img: "/images/img_price_4.jpg",
      features: [
        "Uniform, unbiased AI screening",
        "Pay-per-credit access",
        "Small-scale hiring volume",
        "Candidate performance reports",
      ],
      icon: <Users className="text-primary" size={24} />,
    },
    {
      name: "Recruit Pro",
      desc: "Our most popular choice for growing organizations.",
      price: "Coming Soon",
      popular: true,
      img: "/images/feature_hr_dashboard.png",
      features: [
        "Uniform, unbiased AI screening",
        "Bulk interview capacity",
        "Candidate management dashboard",
        "Full performance analytics",
      ],
      icon: <ShieldCheck className="text-primary" size={24} />,
    },
    {
      name: "Enterprise",
      desc: "Full-scale solution for high-volume hiring workflows.",
      price: "Coming Soon",
      img: "/images/about_bg.jpg",
      features: [
        "Uniform, unbiased AI screening",
        "Multi-seat team access",
        "Custom workflow tools",
        "ATS / HRIS Integrations",
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
                className={`relative p-6 lg:p-8 rounded-[40px] border flex flex-col group transition-all duration-500 ${
                  plan.popular 
                    ? "bg-[#FDFDFB] border border-primary/20 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.15)] scale-105 z-20" 
                    : "bg-white border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 z-10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full shadow-sm z-30">
                    Most Popular
                  </div>
                )}

                {/* Visual Image Header */}
                <div className="relative w-full h-32 rounded-[24px] overflow-hidden mb-6 border border-slate-100 shadow-inner bg-slate-50">
                  <Image
                    src={plan.img}
                    alt={plan.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  
                  {/* Floating Icon Badge */}
                  <div className={`absolute bottom-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center shadow-md backdrop-blur-md transition-all duration-500 ${
                    plan.popular 
                      ? "bg-white/90 text-primary border border-white/50 group-hover:bg-primary group-hover:text-white"
                      : "bg-white/80 text-slate-500 border border-white/50 group-hover:bg-slate-900 group-hover:text-white"
                  }`}>
                    {plan.icon}
                  </div>
                </div>

                <h3 className="text-xl lg:text-2xl font-serif text-slate-900 mb-2 group-hover:text-primary transition-colors duration-300">
                  {plan.name}
                </h3>
                <p className="text-[14px] text-slate-500 mb-6 leading-relaxed font-medium">
                  {plan.desc}
                </p>

                <div className="mb-6">
                  <span className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                    {plan.price}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                        plan.popular ? "bg-primary/20" : "bg-slate-100"
                      }`}>
                        <Check size={10} className={plan.popular ? "text-primary" : "text-slate-400"} />
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/login" className={`w-full py-3 rounded-full font-bold text-sm tracking-wide transition-all border text-center ${
                  plan.popular 
                    ? "bg-primary text-white border-primary shadow-md hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5" 
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
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
