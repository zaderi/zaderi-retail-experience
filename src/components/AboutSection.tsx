import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="relative z-10 bg-background">
      <div className="max-w-[1200px] mx-auto py-24 px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="glass-card-solid rounded-2xl p-10">
              <h3 className="font-display text-4xl font-extrabold gradient-text mb-6">ZADERI</h3>
              <p className="text-soft text-[0.92rem] font-light leading-relaxed">
                Built in Uganda, designed for Africa's growing retail landscape. We understand the unique challenges facing modern retail businesses — and we build solutions that actually work.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { emoji: "🚀", label: "Innovation First" },
                  { emoji: "🤝", label: "Customer Focus" },
                  { emoji: "🔒", label: "Data Security" },
                  { emoji: "⚡", label: "Reliability" },
                ].map((v) => (
                  <div key={v.label} className="bg-electric/[0.08] border border-electric/15 rounded-xl p-3.5 text-center">
                    <span className="text-2xl block mb-1">{v.emoji}</span>
                    <p className="text-soft text-xs font-medium">{v.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 gradient-primary rounded-[14px] px-5 py-4 shadow-glow">
              <p className="text-foreground/70 text-xs">Businesses trust us</p>
              <h4 className="font-display text-xl font-extrabold text-foreground">500+ ⭐</h4>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="text-electric text-xs font-semibold tracking-[0.12em] uppercase block mb-4">Who We Are</span>
            <h2 className="font-display text-[2.5rem] font-extrabold tracking-tight leading-tight mb-4">
              Technology That Drives Retail Forward
            </h2>
            <p className="text-soft text-[0.92rem] font-light leading-relaxed mb-4">
              Zaderi Technologies Ltd is a Ugandan technology company specializing in retail solutions. We believe every business — from a small shop to a multi-branch chain — deserves world-class tools to compete and thrive.
            </p>
            <p className="text-soft text-[0.92rem] font-light leading-relaxed mb-8">
              Founded with a mission to digitize retail across East Africa, our team of engineers and retail specialists work tirelessly to deliver solutions that are powerful yet simple enough for anyone to use.
            </p>

            <div className="bg-electric/[0.06] border border-electric/15 rounded-[14px] p-6 mb-4">
              <h4 className="font-display text-xs font-bold text-electric uppercase tracking-[0.1em] mb-2">Our Mission</h4>
              <p className="text-soft text-[0.95rem] font-light leading-relaxed">
                To empower retail businesses across Africa with affordable, reliable, and easy-to-use technology that drives efficiency, accuracy, and sustainable growth.
              </p>
            </div>
            <div className="bg-electric/[0.06] border border-electric/15 rounded-[14px] p-6">
              <h4 className="font-display text-xs font-bold text-electric uppercase tracking-[0.1em] mb-2">Our Vision</h4>
              <p className="text-soft text-[0.95rem] font-light leading-relaxed">
                A future where every retail business, regardless of size, operates with the insights and tools of a world-class enterprise.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
