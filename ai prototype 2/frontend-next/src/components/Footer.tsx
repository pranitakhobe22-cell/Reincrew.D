"use client";

import Link from "next/link";
import { Info, Mail, Globe, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Discover",
      links: [
        { label: "Features", href: "/#features", internal: true },
        { label: "Pricing", href: "/#pricing", internal: true },
        { label: "Candidate Login", href: "/login", internal: true },
        { label: "Admin Portal", href: "/admin", internal: true },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Explore Blog", href: "/resources", internal: true },
        { label: "Help Center", href: "/help", internal: true },
        { label: "Interview Tips", href: "/resources", internal: true },
        { label: "Documentation", href: "/help", internal: true },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms", internal: true },
        { label: "Privacy Policy", href: "/terms", internal: true },
        { label: "Cookie Policy", href: "/terms", internal: true },
      ],
    },
    {
      title: "About Us",
      links: [
        { label: "About Us", href: "/about", internal: true },
        { label: "Contact Us", href: "mailto:support@reincrew.ai", internal: false },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Info size={20} />, href: "/help" },
    { icon: <Mail size={20} />, href: "mailto:support@reincrew.ai" },
    { icon: <Globe size={20} />, href: "/about" },
  ];

  return (
    <footer className="relative pt-16 pb-8 px-[8%] border-t border-border bg-[#FAFAF9] overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="font-serif text-4xl text-[#1E293B] font-bold tracking-tight mb-5 block">
              Reincrew<span className="text-primary italic">.AI</span>
            </Link>
            <p className="text-slate-500 font-medium leading-[1.8] max-w-sm mb-6 text-[15px]">
              The powerful intersection of talent and opportunity. Empowering candidates to master their interviews while helping HR teams identify top talent.
            </p>
            <div className="flex items-center gap-5">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-500 shadow-sm hover:shadow-md"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-12">
            {footerLinks.map((column) => (
              <div key={column.title} className="flex flex-col gap-5">
                <h4 className="text-[#1E293B] font-black text-[11px] uppercase tracking-[0.2em]">{column.title}</h4>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.internal ? (
                        <Link 
                          href={link.href} 
                          prefetch={true}
                          className="text-slate-400 hover:text-primary font-bold text-[14px] transition-colors inline-flex items-center group"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a 
                          href={link.href} 
                          target={link.label === "About Us" ? "_blank" : undefined}
                          className="text-slate-400 hover:text-primary font-bold text-[14px] transition-colors inline-flex items-center gap-2 group"
                        >
                          {link.label}
                          {link.label === "About Us" && (
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                          )}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[13px] text-slate-400 font-bold">
            &copy; {currentYear} Reincrew.AI. All rights reserved.
          </p>
          <div className="flex items-center gap-10 text-[11px] font-black text-slate-300 uppercase tracking-[0.15em]">
            <Link href="/terms" className="hover:text-primary hover:tracking-[0.2em] transition-all duration-300">Terms</Link>
            <Link href="/terms" className="hover:text-primary hover:tracking-[0.2em] transition-all duration-300">Privacy</Link>
            <Link href="/help" className="hover:text-primary hover:tracking-[0.2em] transition-all duration-300">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
