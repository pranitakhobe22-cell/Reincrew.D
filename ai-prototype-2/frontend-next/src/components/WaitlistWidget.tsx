"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555'}/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("You&apos;re on the list! We&apos;ll be in touch soon.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <section className="w-full px-[8%] py-24 flex justify-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl bg-card-bg border border-border rounded-[3rem] p-10 md:p-16 text-center shadow-2xl shadow-indigo-900/5 relative overflow-hidden"
>         <div className="absolute inset-0 bg-linear-to-br from-indigo-100/40 via-card-bg/80 to-indigo-50/60" />
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 text-indigo-200/40 transform -rotate-12">
          <Sparkles size={120} />
        </div>
        <div className="absolute -bottom-10 -right-10 text-indigo-200/40 transform rotate-12">
          <Sparkles size={120} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm mb-6">
            <Sparkles size={16} /> Beta Access
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1E293B] mb-6 leading-tight tracking-tight">
            Reserve Your Spot for Early Access
          </h2>
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl mx-auto font-medium leading-relaxed">
            Join the waitlist to be among the first to experience the future of AI-driven job interviews and candidate screening.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative">
            <div className="flex-1">
              <input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 px-6 rounded-2xl border border-border bg-card-bg/95 focus:bg-card-bg focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-400 shadow-sm transition-all text-[#1E293B] text-base placeholder:text-slate-400"
                disabled={status === "loading" || status === "success"}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base flex items-center justify-center gap-3 transition-colors disabled:opacity-70 shadow-lg shadow-indigo-600/20 whitespace-nowrap"
            >
              {status === "loading" ? (
                <Loader2 size={20} className="animate-spin" />
              ) : status === "success" ? (
                <><CheckCircle2 size={20} /> Joined</>
              ) : (
                <>Get Early Access <Send size={18} /></>
              )}
            </button>
            {status === "error" && (
              <span className="absolute -bottom-8 left-0 right-0 text-red-500 text-sm font-medium">{message}</span>
            )}
          </form>

          {status === "success" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200 shadow-sm font-medium text-sm"
            >
              <CheckCircle2 size={16} />
              {message}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
