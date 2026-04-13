"use client";

import { motion } from "framer-motion";
import { Brain, FileText, BarChart3 } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "AI Mock Interviews",
      desc: "Practice with role-specific questions and get real-time feedback on your performance.",
      icon: <Brain className="text-primary" size={32} />,
    },
    {
      title: "Resume Evaluation",
      desc: "Our AI analyzes your resume to provide targeted improvement tips and domain analysis.",
      icon: <FileText className="text-primary" size={32} />,
    },
    {
      title: "Performance Analytics",
      desc: "Detailed breakdowns of your communication, technical, and behavioral metrics.",
      icon: <BarChart3 className="text-primary" size={32} />,
    }
  ];

  return (
    <section className="relative z-10 bg-transparent px-[8%] py-[120px]" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-serif text-[#1E293B] mb-6 tracking-tight font-semibold"
          >
            Intelligent Interview<br />Preparation
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-xl text-text-muted max-w-2xl leading-relaxed font-medium"
          >
            Master your technique with our advanced AI analysis and realistic mock environments tailored for modern professionals.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className="group bg-white/40 backdrop-blur-md border border-white/40 p-10 rounded-[40px] shadow-[0_15px_45px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.05)] transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif text-[#1E293B] mb-4">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
