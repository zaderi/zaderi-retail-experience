import { motion } from "framer-motion";

const reasons = [
  { num: "01", title: "Rapid Deployment", desc: "We specialize in 'vibe coding' — fast, intuitive full-stack development that gets your solutions live in days, not months." },
  { num: "02", title: "Local Expertise", desc: "We understand the East African market — local currency, mobile money, and region-specific needs are built right into every solution." },
  { num: "03", title: "Always-On Support", desc: "24/7 support via WhatsApp, phone, or in person. We don't leave you stranded when you need help the most." },
  { num: "04", title: "Offline Capability", desc: "Power cuts and internet downtime won't stop your business. Our systems keep running offline and sync when you're back online." },
  { num: "05", title: "AI-First Approach", desc: "We integrate AI at every layer — from intelligent chatbots and lead-gen bots to predictive analytics that help you sell smarter." },
  { num: "06", title: "Affordable & Scalable", desc: "Enterprise-grade features without enterprise pricing. Start small and scale as you grow — our tools grow with you." },
];

const WhySection = () => {
  return (
    <section className="relative z-10 bg-background">
      <div className="section-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[600px] mx-auto mb-14"
        >
          <span className="text-electric text-xs font-semibold tracking-[0.12em] uppercase block mb-3">Why Choose Us</span>
          <h2 className="font-display font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Built Different. Built Better.
          </h2>
          <p className="text-soft text-[0.95rem] font-normal leading-relaxed">
            We combine rapid "vibe coding" deployment with deep technical expertise to deliver full-stack solutions at speed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass-card-solid rounded-xl p-8 hover:-translate-y-1 hover:border-electric/20 transition-all"
            >
              <div className="font-display text-4xl font-extrabold gradient-text leading-none mb-4">{r.num}</div>
              <h4 className="font-display text-base font-bold text-foreground mb-2">{r.title}</h4>
              <p className="text-soft text-sm font-normal leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
