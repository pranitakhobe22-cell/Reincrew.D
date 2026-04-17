"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const TOTAL_SLIDES = 6;

export default function InteractiveRobot() {
  const [currentSlide, setCurrentSlide] = useState(3);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [showBootScreen, setShowBootScreen] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [isHoveringMonitor, setIsHoveringMonitor] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for elements responding to mouse tracker
  const headPivotRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const mouthRef = useRef<HTMLDivElement>(null);
  const monitorWrapRef = useRef<HTMLDivElement>(null);
  const monitorScreenRef = useRef<HTMLDivElement>(null);
  const handsOverlayRef = useRef<HTMLDivElement>(null);
  const shouldersRef = useRef<HTMLDivElement>(null);
  const eyeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const runBootSequence = useCallback(async () => {
    if (hasEntered) return;
    setHasEntered(true);

    // Boot step animations
    const timer1 = setTimeout(() => setBootStep(1), 300);
    const timer2 = setTimeout(() => setBootStep(2), 700);
    const timer3 = setTimeout(() => setBootStep(3), 1100);

    // Terminal Typing Logic
    const fullLines = [
      "> Initializing AI Interface...",
      "> Loading Reincrew System...",
      "> Welcome to Reincrew.ai"
    ];

    await new Promise(r => setTimeout(r, 1200));
    for (let i = 0; i < fullLines.length; i++) {
      setBootLines(prev => [...prev, ""]);
      for (const char of fullLines[i]) {
        setBootLines(prev => {
          const next = [...prev];
          next[i] += char;
          return next;
        });
        await new Promise(r => setTimeout(r, 30));
      }
      await new Promise(r => setTimeout(r, 200));
    }
    await new Promise(r => setTimeout(r, 400));
    setShowBootScreen(false);
    // Jump straight to slide 3 (interview + insights visible immediately)
    setCurrentSlide(3);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [hasEntered]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runBootSequence();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [runBootSequence]);

  useEffect(() => {
    // Mouse Parallax Interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!headPivotRef.current || !faceRef.current) return;

      const bx = headPivotRef.current.getBoundingClientRect();
      const centerX = bx.left + bx.width / 2;
      const centerY = bx.top + bx.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      let rotY = (deltaX / window.innerWidth) * 20;
      let rotX = (deltaY / window.innerHeight) * -15;

      let faceTx = (deltaX / window.innerWidth) * 20;
      let faceTy = (deltaY / window.innerHeight) * 14;

      if (isHoveringMonitor) {
        faceTx = 0;
        faceTy = 20;
        rotY = 0;
        rotX = -15;
      }

      headPivotRef.current.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
      faceRef.current.style.transform = `translate(${faceTx}px, ${faceTy}px)`;

      if (shouldersRef.current) {
        shouldersRef.current.style.transform = `translateX(calc(-50% + ${(deltaX / window.innerWidth) * 12}px)) translateY(${(deltaY / window.innerHeight) * 8}px)`;
      }

      const monX = (deltaX / window.innerWidth) * 6;
      const monY = (deltaY / window.innerHeight) * 4;

      if (monitorWrapRef.current) {
        monitorWrapRef.current.style.transform = `translate(${monX}px, ${monY}px)`;
      }
      if (handsOverlayRef.current) {
        handsOverlayRef.current.style.transform = `translateZ(10px) translate(${monX}px, ${monY}px)`;
      }

      // Proximity
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (!isHoveringMonitor && dist < 250) {
        if (mouthRef.current) {
          mouthRef.current.style.width = "24px";
          mouthRef.current.style.height = "10px";
          mouthRef.current.style.borderRadius = "2px 2px 14px 14px";
        }
        eyeRefs.current.forEach((eye) => {
          if (eye) eye.style.animationDuration = "1s";
        });
      } else {
        if (mouthRef.current) {
          mouthRef.current.style.width = "16px";
          mouthRef.current.style.height = "6px";
          mouthRef.current.style.borderRadius = "2px 2px 10px 10px";
        }
        eyeRefs.current.forEach((eye) => {
          if (eye) eye.style.animationDuration = "4s";
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isHoveringMonitor]);

  useEffect(() => {
    if (showBootScreen) return;
    // Start cycling from slide 3 so insights are visible immediately
    setCurrentSlide(3);
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [showBootScreen]);

  return (
    <div 
      className="monitor-wrap" 
      ref={(el) => { monitorWrapRef.current = el; (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el; }}
      onMouseEnter={() => setIsHoveringMonitor(true)}
      onMouseLeave={() => setIsHoveringMonitor(false)}
      style={{ zIndex: 10 }}
    >
      <div 
        id="interactive-robot-container" 
        className={`boot-step-${bootStep}`}
        style={{ zIndex: 1, opacity: bootStep > 0 ? 1 : 0 }}
      >
          <div className="rb-shoulders" ref={shouldersRef}>
            <div className="rb-halo"></div>
            <div className="rb-neck"></div>
            <div className="rb-head-pivot" ref={headPivotRef}>
              <div className="rb-head-idle">
                <div className="rb-ear left"></div>
                <div className="rb-ear right"></div>
                <div className="rb-head">
                  <div className="rb-sensor"></div>
                  <div className="rb-visor">
                    <div className="rb-face" ref={faceRef}>
                      <div className="rb-eyes">
                        <div className="rb-eye" ref={el => { eyeRefs.current[0] = el; }}></div>
                        <div className="rb-eye" ref={el => { eyeRefs.current[1] = el; }}></div>
                      </div>
                      <div className="rb-mouth" ref={mouthRef}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rb-hands-overlay" ref={handsOverlayRef}>
            <div className="rb-hand left">
              <div className="rb-finger"></div>
              <div className="rb-finger"></div>
              <div className="rb-finger"></div>
            </div>
            <div className="rb-hand right">
              <div className="rb-finger"></div>
              <div className="rb-finger"></div>
              <div className="rb-finger"></div>
            </div>
          </div>
        </div>

        <div id="ai-insights-container">
          <div className={`insight-line ${currentSlide === 3 ? "visible" : ""}`}>
            <i>✓</i> Analyzing Body Language...
          </div>
          <div className={`insight-line ${currentSlide === 3 ? "visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
            <i>✓</i> Sentiment Tracking Active
          </div>
          <div className={`insight-line ${currentSlide >= 4 ? "visible" : ""}`}>
            <i>✓</i> Report Generated
          </div>
        </div>

        <div className="monitor-frame" style={{ zIndex: 2 }}>
          <div className="monitor-screen" ref={monitorScreenRef} style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
            <div className="monitor-glass"></div>
            
            {showBootScreen && (
              <div className="boot-screen">
                {bootLines.map((line, idx) => (
                  <div key={idx} className="boot-line" style={{ opacity: 1 }}>{line}</div>
                ))}
              </div>
            )}

            <div className="ui-header flex justify-between items-center px-4 py-2 bg-background border-b border-border">
              <div className="ui-logo text-sm font-serif text-[#1E293B]">
                Reincrew<span className="text-primary italic">.AI</span>
              </div>
            </div>

            <div className="slide-area flex-1 relative overflow-hidden bg-[#FCFCF9]">
              {/* Slide 0: Browser */}
              <div className={`slide sl-browser ${currentSlide === 0 ? 'active' : currentSlide === 5 ? 'exit' : ''}`}>
                 <div className="browser-ui mx-auto mt-12 w-[85%] flex flex-col items-center gap-4">
                  <div className="text-lg font-serif text-[#1E293B] mb-1">Search</div>
                  <div className="search-bar w-full h-[35px] bg-background border border-border rounded-full flex items-center px-4 text-xs font-medium text-slate-400">
                    <span>reincrew.ai</span><span className="v-blink" style={{ display: 'block' }}>|</span>
                  </div>
                 </div>
              </div>

              {/* Slide 1: Login */}
              <div className={`slide sl-login ${currentSlide === 1 ? 'active' : currentSlide === 0 ? 'exit' : ''}`}>
                <div className="sl-card mx-auto bg-card-bg shadow-sm border border-border">
                  <h3 className="font-serif">Get Started</h3>
                  <div className="sl-sub">Join 10k+ candidates</div>
                  <div className="sl-inp">email@example.com</div>
                  <div className="sl-inp">••••••••</div>
                  <button className="sl-btn bg-primary hover:bg-primary/90">Sign Up Free</button>
                  <div className="sl-or">or continue with Google</div>
                </div>
              </div>

              {/* Slide 2: Domain Selection */}
              <div className={`slide sl-domain ${currentSlide === 2 ? 'active' : currentSlide === 1 ? 'exit' : ''}`}>
                <h4 className="text-center mt-3 font-serif text-[#1E293B]">Select Your Path</h4>
                <div className="sl-dgrid">
                  <div className="sl-dcard hl bg-primary/5 border-primary/20"><span className="sl-icon">💻</span>Software</div>
                  <div className="sl-dcard"><span className="sl-icon">📊</span>Product</div>
                  <div className="sl-dcard"><span className="sl-icon">🎨</span>Design</div>
                  <div className="sl-dcard"><span className="sl-icon">💰</span>Finance</div>
                </div>
              </div>

              {/* Slide 3: Interview */}
              <div className={`slide sl-iv ${currentSlide === 3 ? 'active' : currentSlide === 2 ? 'exit' : ''}`}>
                <div className="sl-q font-serif">
                  <span className="font-sans">Question 4/10</span>
                  <p>&quot;Tell me about a complex project...&quot;</p>
                </div>
                <div className="sl-iv-body">
                  <div className="sl-vid">
                    <Image src="/assets/ai_robot.png" alt="Candidate" fill className="object-cover" />
                    <div className="sl-rec">LIVE</div>
                  </div>
                  <div className="sl-metrics">
                    <div className="sl-metric">
                      <div className="sl-mlbl">Confidence <span className="sl-mval text-primary font-bold">88%</span></div>
                      <div className="sl-pbar bg-slate-100"><div className="sl-pfill bg-primary" style={{ width: '88%' }}></div></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 4: Results */}
              <div className={`slide sl-res ${currentSlide === 4 ? 'active' : currentSlide === 3 ? 'exit' : ''}`}>
                <h4 className="text-center mt-3 font-serif text-[#1E293B]">Performance Report</h4>
                <div className="sl-sgrid">
                  <div className="sl-scard bg-card-bg border border-border">
                    <div className="sl-sv text-primary">9.2</div><div className="sl-sl">Technical</div>
                    <div className="sl-sbar bg-slate-100"><div className="sl-sfill bg-primary sf1" style={{ width: '92%' }}></div></div>
                  </div>
                  <div className="sl-scard bg-card-bg border border-border">
                    <div className="sl-sv text-amber-500">8.5</div><div className="sl-sl">Soft Skills</div>
                    <div className="sl-sbar bg-slate-100"><div className="sl-sfill bg-amber-500 sf2" style={{ width: '85%' }}></div></div>
                  </div>
                </div>
              </div>

              {/* Slide 5: Feedback */}
              <div className={`slide sl-fb ${currentSlide === 5 ? 'active' : currentSlide === 4 ? 'exit' : ''}`}>
                <h4 className="text-center mt-3 font-serif text-[#1E293B]">AI Key Insights</h4>
                <div className="sl-fcard bg-card-bg border border-border">
                  <div className="sl-ftitle"><i className="sl-fi green">✓</i> Good structuring of STAR answers.</div>
                </div>
                <div className="sl-fcard bg-white border border-slate-100">
                  <div className="sl-ftitle"><i className="sl-fi amber">⚠</i> Maintain more consistent eye contact.</div>
                </div>
              </div>
            </div>

            <div className="slide-dots">
              {[0, 1, 2, 3, 4, 5].map((dot) => (
                <div key={dot} className={`s-dot ${currentSlide === dot ? 'active' : ''}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
