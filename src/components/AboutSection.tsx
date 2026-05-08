import { motion } from "framer-motion";
import { Rocket, Heart, ShieldCheck, Zap } from "lucide-react";
import logo from "@/assets/logo-transparent.png";

const values = [
  { icon: Rocket, label: "Innovation first" },
  { icon: Heart, label: "Customer focused" },
  { icon: ShieldCheck, label: "Data security" },
  { icon: Zap, label: "Reliability" },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative z-10 bg-secondary/20 border-y border-foreground/[0.05]">
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl border border-foreground/[0.06] bg-card/40 p-8 ring-soft">
              <img src={logo} alt="Zaderi Technologies" className="h-12 w-auto mb-5" />
              <p className="text-soft text-[0.92rem] leading-relaxed mb-6">
                Built for Africa's growing tech landscape. We understand the unique challenges of modern businesses and design solutions that fit them.
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {values.map((v) => (
                  <div key={v.label} className="bg-foreground/[0.03] border border-foreground/[0.05] rounded-lg p-3 flex items-center gap-2.5">
                    <v.icon className="w-4 h-4 text-electric flex-shrink-0" />
                    <p className="text-foreground text-[0.78rem] font-medium">{v.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <span className="eyebrow block mb-2.5">Who we are</span>
            <h2 className="h-section text-foreground mb-3">Technology that drives business forward</h2>
            <p className="lead mb-3.5">
              Zaderi Technologies is a Ugandan technology company specializing in smart business systems and AI automation. Every business: from a small shop to an enterprise chain deserves world-class tools.
            </p>
            <p className="lead mb-7">
              Our team combines deep business expertise with modern engineering to deliver software that's powerful yet simple to use.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-cobalt/15 bg-cobalt/5 p-4">
                <h4 className="font-display text-[0.7rem] font-bold text-electric uppercase tracking-[0.12em] mb-1.5">Mission</h4>
                <p className="text-soft text-[0.82rem] leading-relaxed">
                  Empower African businesses with affordable, reliable technology that drives efficiency and growth.
                </p>
              </div>
              <div className="rounded-xl border border-cobalt/15 bg-cobalt/5 p-4">
                <h4 className="font-display text-[0.7rem] font-bold text-electric uppercase tracking-[0.12em] mb-1.5">Vision</h4>
                <p className="text-soft text-[0.82rem] leading-relaxed">
                  A future where every business operates with the intelligence of a world-class enterprise.
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
