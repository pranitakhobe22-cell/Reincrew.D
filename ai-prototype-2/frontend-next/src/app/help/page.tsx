"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, MessageCircle, BookOpen, Settings, User, Zap } from "lucide-react";
import SecondaryPageLayout from "@/components/SecondaryPageLayout";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_SECTIONS = [
  {
    title: "Getting Started",
    icon: <Zap size={20} />,
    items: [
      {
        question: "What is Reincrew.AI?",
        answer:
          "Reincrew.AI is an AI-powered interview preparation and evaluation platform. It helps candidates practice with hyper-realistic mock interviews while enabling HR teams to streamline their hiring workflow with intelligent assessments.",
      },
      {
        question: "How do I create an account?",
        answer:
          "Click the 'Join Interview' button on our homepage or navigate to the Sign In page. You can register using your email address. Once verified, you'll have full access to our interview preparation tools.",
      },
      {
        question: "Is Reincrew.AI free to use?",
        answer:
          "We offer a free tier with limited interview sessions per month. For unlimited access, real-time analytics, and advanced AI feedback, check out our Student and Recruiter plans on the Pricing page.",
      },
    ],
  },
  {
    title: "Your Account",
    icon: <User size={20} />,
    items: [
      {
        question: "How do I reset my password?",
        answer:
          "Go to the Sign In page and click 'Forgot Password'. Enter the email address associated with your account, and we'll send a reset link within minutes.",
      },
      {
        question: "Can I change my email address?",
        answer:
          "Yes. Navigate to your Profile Settings after signing in. You can update your email, display name, and other account details from there.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "You can request account deletion from your Profile Settings. Alternatively, contact our support team at support@reincrew.ai. Please note that deletion is permanent and all associated data will be removed.",
      },
    ],
  },
  {
    title: "Interviews & Practice",
    icon: <MessageCircle size={20} />,
    items: [
      {
        question: "How does the AI interview work?",
        answer:
          "Our AI conducts real-time interviews using natural language processing. It asks role-specific questions, analyzes your responses for sentiment, clarity, and relevance, and provides detailed feedback with actionable improvement tips.",
      },
      {
        question: "Can I choose my interview domain?",
        answer:
          "Absolutely. We support multiple domains including Software Engineering, Data Science, Marketing, Finance, Healthcare, and more. Select your domain before starting a session for tailored questions.",
      },
      {
        question: "Does the AI track my body language?",
        answer:
          "Yes. When using a webcam, our AI analyzes eye contact, posture, facial expressions, and gestures to give you a comprehensive communication assessment alongside verbal feedback.",
      },
    ],
  },
  {
    title: "Technical Support",
    icon: <Settings size={20} />,
    items: [
      {
        question: "Which browsers are supported?",
        answer:
          "Reincrew.AI works best on the latest versions of Google Chrome, Microsoft Edge, Mozilla Firefox, and Safari. For the best experience with webcam features, we recommend Chrome or Edge.",
      },
      {
        question: "My webcam or microphone isn't working. What should I do?",
        answer:
          "Ensure your browser has permission to access your camera and microphone. Check your system privacy settings, try refreshing the page, or switch to a supported browser. If the issue persists, contact support@reincrew.ai.",
      },
      {
        question: "I'm experiencing lag during my interview session.",
        answer:
          "Ensure you have a stable internet connection (minimum 5 Mbps recommended). Close unnecessary browser tabs and applications. If problems continue, try switching to a wired connection or contact our support team.",
      },
    ],
  },
];

function AccordionItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 px-1 text-left group cursor-pointer"
      >
        <span className="font-semibold text-[#1E293B] group-hover:text-primary transition-colors pr-4">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-slate-400"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 px-1 text-slate-500 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HelpPage() {
  return (
    <SecondaryPageLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
          <BookOpen size={16} /> Help Center
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-[#1E293B] font-semibold tracking-tight mb-6">
          How Can We Help?
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Find answers to common questions about Reincrew.AI, your account, interviews, and technical setup.
        </p>
      </motion.div>

      {/* FAQ Sections */}
      <div className="space-y-10">
        {FAQ_SECTIONS.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-card-bg border border-border rounded-[32px] p-8 md:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {section.icon}
              </div>
              <h2 className="text-xl font-serif text-[#1E293B] font-semibold">
                {section.title}
              </h2>
            </div>
            <div>
              {section.items.map((item) => (
                <AccordionItem key={item.question} item={item} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-16 bg-background rounded-[40px] p-12 text-center border border-border shadow-sm"
      >
        <Mail className="mx-auto text-primary mb-4" size={32} />
        <h3 className="text-xl font-serif text-slate-900 mb-3 tracking-tight">
          Still need help?
        </h3>
        <p className="text-slate-600 mb-6 max-w-lg mx-auto font-medium">
          Our support team is ready to assist you. Reach out and we&apos;ll get back to you within 24 hours.
        </p>
        <a
          href="mailto:support@reincrew.ai"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <Mail size={16} /> Contact Support
        </a>
      </motion.div>
    </SecondaryPageLayout>
  );
}
