import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Since installing Zaderi's POS, our checkout time dropped by 60% and we finally have accurate stock counts. The team is incredibly supportive.",
    name: "Sarah Muwanga",
    role: "Owner, Muwanga Supermarket",
    initials: "SM",
  },
  {
    text: "The inventory alerts alone saved us thousands. We used to discover stockouts when customers complained — now we reorder before it's a problem.",
    name: "James Okoye",
    role: "Manager, City Retail Stores",
    initials: "JO",
  },
  {
    text: "We expanded from one branch to three in a year. Zaderi's system made managing all three feel like running just one. Highly recommended!",
    name: "Rebecca Nakato",
    role: "CEO, Nakato Fashion & Retail",
    initials: "RN",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative z-10 bg-navy/40">
      <div className="max-w-[1200px] mx-auto py-24 px-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-electric text-xs font-semibold tracking-[0.12em] uppercase block mb-4">Client Stories</span>
          <h2 className="font-display font-extrabold tracking-tight leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Trusted by Retail Businesses
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="glass-card-solid rounded-2xl p-8 hover:-translate-y-1 transition-transform"
            >
              <div className="text-[#FFB800] text-sm tracking-widest mb-2">★★★★★</div>
              <div className="text-electric/30 text-5xl font-serif leading-none mb-2">"</div>
              <p className="text-soft text-[0.92rem] font-light leading-relaxed italic mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full gradient-accent grid place-items-center font-display font-extrabold text-sm text-foreground">
                  {t.initials}
                </div>
                <div>
                  <strong className="text-foreground text-sm block">{t.name}</strong>
                  <span className="text-muted-foreground text-xs">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
