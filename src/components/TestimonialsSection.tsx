import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Since installing Zaderi's POS, our checkout time dropped by 60% and we finally have accurate stock counts. The team is incredibly supportive.",
    name: "Sarah Muwanga",
    role: "Owner, Muwanga Supermarket",
    initials: "SM",
  },
  {
    text: "The AI chatbot handles 80% of our customer inquiries automatically. We went from missing leads to capturing them 24/7.",
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
    <section className="relative z-10 bg-secondary/30">
      <div className="section-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-electric text-xs font-semibold tracking-[0.12em] uppercase block mb-3">Client Stories</span>
          <h2 className="font-display font-extrabold tracking-tight leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Trusted by Retail Businesses
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card-solid rounded-xl p-7 hover:-translate-y-1 transition-transform"
            >
              <div className="text-[#FFB800] text-sm tracking-widest mb-3">★★★★★</div>
              <p className="text-soft text-[0.9rem] font-normal leading-relaxed italic mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-accent grid place-items-center font-display font-bold text-sm text-background">
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
