import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Since installing Zaderi's POS, our checkout time dropped by 60% and we finally have accurate stock counts. The team is incredibly supportive.",
    name: "Suzan Amongi",
    role: "Owner, SMW Supermarket",
    initials: "SA",
  },
  {
    text: "The AI chatbot handles 80% of our customer inquiries automatically. We went from missing leads to capturing them 24/7.",
    name: "James Olimi",
    role: "Manager, City Retail Stores",
    initials: "JO",
  },
  {
    text: "We expanded from one branch to three in a year. Zaderi's system made managing all three feel like running just one.",
    name: "Rebecca H. Nakato",
    role: "CEO, Nakato Fashion & Retail Center",
    initials: "RHN",
  },
];

const TestimonialsSection = () => {
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
          <span className="eyebrow block mb-2.5">Client stories</span>
          <h2 className="h-section text-foreground">Trusted by seasoned retailers</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-xl p-6 border border-foreground/[0.06] bg-card/40 card-hover"
            >
              <div className="text-[#FFB800] text-sm tracking-widest mb-3">★★★★★</div>
              <p className="text-foreground text-[0.9rem] leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-foreground/[0.06]">
                <div className="w-9 h-9 rounded-full gradient-accent grid place-items-center font-display font-bold text-xs text-background">
                  {t.initials}
                </div>
                <div>
                  <strong className="text-foreground text-[0.83rem] block">{t.name}</strong>
                  <span className="text-muted-foreground text-[0.72rem]">{t.role}</span>
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
