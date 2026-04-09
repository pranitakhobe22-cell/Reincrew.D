export default function Footer() {
  return (
    <footer className="py-16 px-[8%] text-center border-t border-slate-100 bg-[#FCFCF9]">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <div className="font-serif text-2xl text-[#1E293B]">
          Reincrew<span className="text-primary italic">.AI</span>
        </div>
        <p className="text-sm text-text-muted font-medium">
          &copy; {new Date().getFullYear()} Reincrew.AI. Empowering the next generation of professionals.
        </p>
      </div>
    </footer>
  );
}
