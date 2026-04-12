import { motion } from "framer-motion";
import logo from "@/assets/logo-transparent.png";

const AboutSection = () => {
  return (
    <section id="about" className="relative z-10 bg-secondary/30">
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass-card-solid rounded-2xl p-10">
              <img src={logo} alt="Zaderi Technologies" className="h-16 w-auto mb-6" />
              <p className="text-soft text-[0.95rem] font-normal leading-relaxed mb-6">
                Built for Africa's growing tech landscape. We understand the unique challenges facing modern businesses and we build custom solutions that suit them.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: "🚀", label: "Innovation First" },
                  { emoji: "🤝", label: "Customer Focus" },
                  { emoji: "🔒", label: "Data Security" },
                  { emoji: "⚡", label: "Reliability" },
                ].map((v) => (
                  <div key={v.label} className="bg-foreground/[0.04] border border-foreground/[0.06] rounded-lg p-3 text-center">
                    <span className="text-xl block mb-1">{v.emoji}</span>
                    <p className="text-soft text-xs font-medium">{v.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-electric text-xs font-semibold tracking-[0.12em] uppercase block mb-3">Who We Are</span>
            <h2 className="font-display font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Technology That Drives Business Forward
            </h2>
            <p className="text-soft text-[0.95rem] font-normal leading-relaxed mb-4">
              Zaderi Technologies is a Ugandan technology company specializing in smart business solutions and AI automation. We believe every business from a small shop to an enterprise chain deserves world-class tools to compete and thrive.
            </p>
            <p className="text-soft text-[0.95rem] font-normal leading-relaxed mb-8">
              Founded with a mission to digitize business across Africa, our team combines deep business expertise with cutting-edge technology to deliver solutions that are powerful, yet simple to use.
            </p>

            <div className="flex flex-col gap-4">
              <div className="bg-cobalt/10 border border-cobalt/15 rounded-xl p-5">
                <h4 className="font-display text-xs font-bold text-electric uppercase tracking-[0.1em] mb-2">Our Mission</h4>
                <p className="text-soft text-sm font-normal leading-relaxed">
                  To empower businesses across Africa with affordable, reliable technology from smart business systems to AI-powered automations that drive efficiency and sustainable growth.
                </p>
              </div>
              <div className="bg-cobalt/10 border border-cobalt/15 rounded-xl p-5">
                <h4 className="font-display text-xs font-bold text-electric uppercase tracking-[0.1em] mb-2">Our Vision</h4>
                <p className="text-soft text-sm font-normal leading-relaxed">
                  A future where every business, regardless of size, operates with the intelligence and tools of a world-class enterprise.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
