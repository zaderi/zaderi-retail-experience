import { motion } from "framer-motion";

const reasons = [
  { num: "01", title: "Rapid deployment", desc: "Live in days, not months. Fast, intuitive setup with hands-on onboarding." },
  { num: "02", title: "Local expertise", desc: "Built for East Africa — local currency, mobile money, and regional needs baked in." },
  { num: "03", title: "Always-on support", desc: "24/7 help via WhatsApp, phone, or in person. We're here when you need us." },
  { num: "04", title: "Resilient by design", desc: "Keep operating even with intermittent connectivity — auto-syncs when back online." },
  { num: "05", title: "AI-first", desc: "Intelligent chatbots, lead-gen bots, and predictive analytics across the platform." },
  { num: "06", title: "Affordable & scalable", desc: "Enterprise features without enterprise pricing. Start small, scale as you grow." },
];

const WhySection = () => {
  return (
    <section className="relative z-10 bg-background">
      <div className="section-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[560px] mb-10"
        >
          <span className="eyebrow block mb-2.5">Why Zaderi</span>
          <h2 className="h-section text-foreground mb-3">Built different. Built better.</h2>
          <p className="lead">
            We pair modern tech with deep operational expertise to deliver tools that actually work in the field.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/[0.06] rounded-2xl overflow-hidden border border-foreground/[0.06]">
          {reasons.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="bg-background p-7 hover:bg-card/60 transition-colors group"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-display text-2xl font-extrabold gradient-text leading-none">{r.num}</span>
                <span className="h-px flex-1 bg-foreground/[0.08] group-hover:bg-electric/30 transition-colors" />
              </div>
              <h4 className="font-display text-[0.95rem] font-bold text-foreground mb-1.5">{r.title}</h4>
              <p className="text-soft text-[0.83rem] leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
