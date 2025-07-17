"use client";

const features = [
  {
    title: "📁 Virtual File System",
    description: "Create, open, and manage files seamlessly within your browser.",
  },
  {
    title: "🧠 Agentic AI Assistant",
    description: "Let AI handle tasks: write notes, plan steps, and interact with your apps.",
  },
  {
    title: "💻 Code Editor",
    description: "Write, edit, and save code in a beautiful in-browser VSCode-like experience.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-white/5 backdrop-blur-lg rounded-xl mx-4 mt-10">
      <h2 className="text-3xl font-bold text-center text-gold mb-10">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((f, idx) => (
          <div key={idx} className="p-6 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md shadow-md">
            <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-white/80">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}