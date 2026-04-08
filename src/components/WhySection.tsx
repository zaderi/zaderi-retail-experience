import { motion } from "framer-motion";

const reasons = [
  { num: "01", title: "Ease of Use", desc: "Designed for real people, not engineers. Our systems are so intuitive your team can start using them with minimal training." },
  { num: "02", title: "Local Expertise", desc: "We understand the East African retail environment — local currency, mobile money, and market-specific needs are built right in." },
  { num: "03", title: "Always-On Support", desc: "Our support team is available 24/7. Via WhatsApp, phone, or in person — we don't leave you stranded when you need help." },
  { num: "04", title: "Offline Capability", desc: "Power cuts and internet downtime won't stop your business. Our systems keep running offline and sync when you're back online." },
  { num: "05", title: "Scalable & Flexible", desc: "Start with one terminal and grow to a full multi-branch chain. Zaderi scales with your ambition, not against it." },
  { num: "06", title: "Affordable Pricing", desc: "Enterprise-grade features don't have to cost a fortune. Our pricing is transparent, fair, and designed for growing businesses." },
];

const WhySection = () => {
  return (
    <section className="relative z-10 bg-background overflow-hidden">
      <div className="max-w-[1200px] mx-auto py-24 px-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-electric text-xs font-semibold tracking-[0.12em] uppercase block mb-4">Why Choose Us</span>
          <h2 className="font-display font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Built for Businesses Like Yours
          </h2>
          <p className="text-soft text-base font-light max-w-[540px] mx-auto leading-relaxed">
            We're not just software vendors — we're your technology partner for growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="glass-card-solid text-center p-10 rounded-2xl hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:border-electric/25 transition-all"
            >
              <div className="font-display text-5xl font-extrabold gradient-text leading-none mb-4">{r.num}</div>
              <h4 className="font-display text-base font-bold text-foreground mb-3">{r.title}</h4>
              <p className="text-soft text-sm font-light leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
