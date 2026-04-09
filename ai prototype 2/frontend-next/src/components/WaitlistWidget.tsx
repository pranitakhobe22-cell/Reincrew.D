"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, CheckCircle2, Loader2, X } from "lucide-react";

export default function WaitlistWidget() {
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [hasNudged, setHasNudged] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { scrollYProgress } = useScroll();

  // Smart UX Nudge: Expand briefly when user scrolls 40% of the page
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.4 && !hasNudged && !expanded) {
      setHasNudged(true);
      setExpanded(true);
      // Auto-close nudge after 3s if untouched
      setTimeout(() => {
        setExpanded((prev) => {
          if (prev && status === "idle" && email === "") return false;
          return prev;
        });
      }, 3000);
    }
  });

  // Focus input when manually expanded
  useEffect(() => {
    if (expanded && inputRef.current) {
      // Small delay to allow animation to start
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [expanded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("http://localhost:5555/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("You'll be notified!");
        setEmail("");
        // Auto-minimize after success
        setTimeout(() => {
          setExpanded(false);
          // reset status after minimizing
          setTimeout(() => setStatus("idle"), 500); 
        }, 2500);
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {expanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white/95 backdrop-blur-xl border border-[#e2e8f0] shadow-2xl rounded-2xl p-5 mb-4 w-[320px] origin-bottom-right"
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-serif font-bold text-lg text-[#1E293B]">Get Early Access</h4>
              <button 
                onClick={() => setExpanded(false)}
                className="text-slate-400 hover:text-slate-700 transition"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            
            <p className="text-sm text-slate-500 mb-4 font-dm">
              Join the waitlist to be notified when Reincrew.AI goes live.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {status === "success" ? (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                  <CheckCircle2 size={18} />
                  <span className="font-medium text-sm font-dm">{message}</span>
                </div>
              ) : (
                <>
                  <input
                    ref={inputRef}
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-sm transition-all text-[#1E293B]"
                    disabled={status === "loading"}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-2.5 rounded-xl bg-[#7a9ebf] hover:bg-[#6a8daf] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-70 font-sans shadow-md"
                  >
                    {status === "loading" ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>Get Early Access <Send size={14} /></>
                    )}
                  </button>
                  {status === "error" && (
                    <span className="text-red-500 text-xs mt-1 px-1 font-medium font-dm">{message}</span>
                  )}
                </>
              )}
            </form>
          </motion.div>
        ) : (
          <motion.button
            key="minimized"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(true)}
            className="w-14 h-14 bg-[#7a9ebf] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-[0_0_20px_rgba(122,158,191,0.5)] transition-shadow border-2 border-white/20 group relative"
          >
            {/* Subtle glow pulse */}
            <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping opacity-20 group-hover:opacity-0 transition-opacity" style={{ animationDuration: '3s' }} />
            
            <motion.div
               animate={{ rotate: [0, 10, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={24} className="group-hover:animate-pulse" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
