    "use client";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
      <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">KUTER</h1>
      <p className="mt-4 max-w-xl text-lg md:text-2xl text-white/80">
        Your personal AI-powered browser OS — built for control, speed, and elegance.
      </p>
      <div className="mt-8 flex gap-4">
        <button className="px-6 py-3 bg-gold text-black font-semibold rounded-xl hover:opacity-90 transition">Launch Desktop</button>
        <button className="px-6 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white/10 transition">Explore Features</button>
      </div>
    </section>
  );
}
