"use client";

import { motion } from "framer-motion";
import { Shield, FileText, Lock, Eye } from "lucide-react";
import SecondaryPageLayout from "@/components/SecondaryPageLayout";

export default function TermsPage() {
  const sections = [
    {
      id: "terms",
      title: "Terms of Service",
      icon: <FileText className="text-primary" size={24} />,
      content: [
        "By accessing or using Reincrew.AI, you agree to be bound by these terms. If you do not agree, please do not use our services.",
        "You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.",
        "We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.",
        "Users must not use the platform for any illegal activities or to distribute harmful content.",
        "All AI-generated feedback and assessments are for practice purposes and do not guarantee actual job placement."
      ]
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: <Lock className="text-primary" size={24} />,
      content: [
        "We value your privacy. We collect minimal personal data required to provide our services, such as email and use names.",
        "Your interview data, including video and audio recordings, is used solely for AI analysis and providing you with feedback.",
        "We do not sell your personal data to third parties. We use industry-standard encryption to protect your information.",
        "You have the right to request access to or deletion of your personal data at any time through your account settings."
      ]
    },
    {
      id: "cookies",
      title: "Cookie Policy",
      icon: <Eye className="text-primary" size={24} />,
      content: [
        "Reincrew.AI uses cookies to enhance your experience and analyze platform performance.",
        "Essential cookies are required for the site to function properly. Analytical cookies help us improve our services.",
        "You can manage your cookie preferences through your browser settings, though some features may be limited if cookies are disabled."
      ]
    }
  ];

  return (
    <SecondaryPageLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
          <Shield size={16} /> Legal & Privacy
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-[#1E293B] font-semibold tracking-tight mb-6">
          Terms & Conditions
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Our commitment to transparency and protecting your data. Last updated: April 2026.
        </p>
      </motion.div>

      <div className="space-y-12 max-w-4xl mx-auto">
        {sections.map((section, idx) => (
          <motion.section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="bg-white/40 backdrop-blur-md border border-white/40 rounded-[32px] p-8 md:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                {section.icon}
              </div>
              <h2 className="text-2xl font-serif text-[#1E293B] font-semibold">
                {section.title}
              </h2>
            </div>
            
            <ul className="space-y-6">
              {section.content.map((point, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-primary/40" />
                  <p className="text-slate-600 leading-relaxed font-medium">{point}</p>
                </li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-16 text-center text-sm text-slate-400 font-medium"
      >
        Questions about our terms? Contact us at <a href="mailto:legal@reincrew.ai" className="text-primary hover:underline">legal@reincrew.ai</a>
      </motion.div>
    </SecondaryPageLayout>
  );
}
