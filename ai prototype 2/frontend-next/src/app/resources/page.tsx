"use client";

import { motion } from "framer-motion";
import { BookOpen, Video, FileText, Lightbulb, TrendingUp, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import SecondaryPageLayout from "@/components/SecondaryPageLayout";

const RESOURCES = [
  {
    title: "Interview Mastery Guide",
    desc: "A comprehensive handbook for acing behavioral and technical interviews in any industry.",
    icon: <BookOpen className="text-primary" size={24} />,
    tag: "Handbook"
  },
  {
    title: "Resume Optimization",
    desc: "Learn how to structure your resume to beat ATS systems and catch recruiters' attention.",
    icon: <FileText className="text-primary" size={24} />,
    tag: "Guide"
  },
  {
    title: "Video Interview Tips",
    desc: "Master your presence on camera, from lighting and background to non-verbal cues.",
    icon: <Video className="text-primary" size={24} />,
    tag: "Video"
  },
  {
    title: "Career Growth Insights",
    desc: "Periodic reports on hiring trends, salary benchmarks, and in-demand skills.",
    icon: <TrendingUp className="text-primary" size={24} />,
    tag: "Report"
  },
  {
    title: "Domain Specific Prep",
    desc: "Tailored resources for Engineering, Product, Marketing, and Finance roles.",
    icon: <Lightbulb className="text-primary" size={24} />,
    tag: "Curated"
  },
  {
    title: "HR Perspectives",
    desc: "Insights from top recruiters on what they actually look for in candidates.",
    icon: <Users className="text-primary" size={24} />,
    tag: "Industry"
  }
];

export default function ResourcesPage() {
  return (
    <SecondaryPageLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
          <BookOpen size={16} /> Knowledge Base
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-[#1E293B] font-semibold tracking-tight mb-6">
          Resources Hub
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Expert advice, guides, and industry insights to help you navigate your career journey with confidence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {RESOURCES.map((resource, idx) => (
          <motion.div
            key={resource.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group bg-card-bg border border-border p-8 rounded-[40px] shadow-[0_15px_45px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.05)] transition-all flex flex-col items-start"
          >
            <div className="flex w-full items-center justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {resource.icon}
              </div>
              <span className="px-3 py-1 bg-card-bg/50 border border-border/60 rounded-full text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
                {resource.tag}
              </span>
            </div>
            
            <h3 className="text-2xl font-serif text-[#1E293B] mb-4 group-hover:text-primary transition-colors">
              {resource.title}
            </h3>
            <p className="text-slate-500 leading-relaxed font-medium mb-8 grow">
              {resource.desc}
            </p>
            
            <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase group-hover:gap-4 transition-all opacity-70 group-hover:opacity-100">
              Coming Soon <ArrowRight size={16} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-20 bg-primary rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Stay Updated</h2>
          <p className="text-indigo-100 mb-10 max-w-xl mx-auto font-medium">
            Subscribe to our newsletter to receive the latest interview prep resources and hiring trends directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-background border border-border rounded-full px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Link href="/#waitlist" className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all hover:-translate-y-1 inline-flex justify-center items-center">
              Join Waitlist
            </Link>
          </div>
        </div>
        {/* Background elements */}
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
            <BookOpen size={300} />
        </div>
      </motion.div>
    </SecondaryPageLayout>
  );
}
