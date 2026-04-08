import { motion } from "framer-motion";
import { useState } from "react";

const DemoSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="demo" className="relative z-10 border-y border-foreground/[0.08]" style={{ background: "linear-gradient(135deg, rgba(10,79,204,0.15) 0%, rgba(0,212,255,0.05) 100%)" }}>
      <div className="max-w-[700px] mx-auto py-24 px-[5%] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-electric text-xs font-semibold tracking-[0.12em] uppercase block mb-4">Free Demo Available</span>
          <h2 className="font-display font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
            Ready to Transform<br />Your <span className="gradient-text">Retail Business?</span>
          </h2>
          <p className="text-soft text-base font-light mb-10">
            See Zaderi in action with a free, no-obligation demo session. We'll walk you through everything and answer all your questions.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="glass-card-solid rounded-2xl p-10 text-left"
        >
          <h3 className="font-display text-xl font-bold text-center mb-8 text-foreground">📋 Request a Free Demo</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Full Name</label>
              <input type="text" placeholder="Your full name" className="bg-background/60 border border-foreground/[0.08] rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/15 transition-all" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Phone Number</label>
              <input type="tel" placeholder="+256 700 000 000" className="bg-background/60 border border-foreground/[0.08] rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/15 transition-all" />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email Address</label>
            <input type="email" placeholder="you@yourbusiness.com" className="bg-background/60 border border-foreground/[0.08] rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/15 transition-all" />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Business Type</label>
            <select className="bg-background/60 border border-foreground/[0.08] rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric appearance-none cursor-pointer">
              <option value="">Select your business type</option>
              <option>Supermarket / Grocery</option>
              <option>Pharmacy</option>
              <option>Hardware Store</option>
              <option>Fashion & Clothing</option>
              <option>Restaurant / Café</option>
              <option>Electronics Shop</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Message (Optional)</label>
            <textarea placeholder="Tell us about your business..." rows={4} className="bg-background/60 border border-foreground/[0.08] rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/15 transition-all resize-y" />
          </div>

          <button
            type="submit"
            className="w-full gradient-primary text-foreground py-3.5 rounded-full font-semibold text-base shadow-glow hover:-translate-y-0.5 transition-all"
          >
            {submitted ? "✓ Request Sent!" : "🚀 Book My Free Demo"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default DemoSection;
