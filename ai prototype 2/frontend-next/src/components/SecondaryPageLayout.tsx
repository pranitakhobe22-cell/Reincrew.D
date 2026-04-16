"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SecondaryPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <div className="motion-bg" />
      <div className="flex flex-col relative z-10 min-h-screen">
        <Navbar showLinks={true} isStatic={true} />
        <main className="flex-1 pt-32 pb-20 px-[8%]">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
