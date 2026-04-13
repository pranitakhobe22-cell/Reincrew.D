"use client";

import { motion } from "framer-motion";
import InteractiveRobot from "./InteractiveRobot";

export default function AboutUs() {
  return (
    <section id="about" className="py-32 px-[8%] relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
            Meet Your AI Mentor
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1E293B] mb-8 leading-[1.15] tracking-tight font-semibold">
            Intelligent Guidance,<br />
            Built into Every Context.
          </h2>
          <p className="text-xl text-text-muted mb-8 leading-relaxed font-medium">
            Experience the power of real-time sentiment analysis and behavioral tracking. Our AI doesn&apos;t just grade you—it understands your tone, pace, and professional confidence.
          </p>
          <ul className="space-y-5">
            {[
              "Real-time Sentiment Analysis",
              "Body Language & Eye-Contact Tracking",
              "Customizable Interview Dimensions",
              "Peer-Performance Analytics"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 font-bold text-[#1E293B]">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="relative h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full" />
          <div className="scale-75 md:scale-95 lg:scale-110">
            <InteractiveRobot />
          </div>
        </div>
      </div>
    </section>
  );
}
