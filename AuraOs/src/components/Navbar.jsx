"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 py-4 px-6 flex items-center justify-between shadow-md">
      <div className="text-xl font-bold tracking-widest text-gold">KUTER</div>
      <div className="flex gap-6 text-sm">
        <a href="#" className="hover:text-gold transition">Home</a>
        <a href="#features" className="hover:text-gold transition">Features</a>
        <a href="#launch" className="hover:text-gold transition">Launch</a>
      </div>
    </nav>
  );
}