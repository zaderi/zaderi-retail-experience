import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-[72px]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[700px] h-[700px] rounded-full bg-cobalt/20 blur-[120px] -top-[200px] -right-[150px]" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan/10 blur-[120px] -bottom-[200px] left-[5%]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 section-container w-full section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-cobalt/10 border border-cobalt/20 text-electric px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-8"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Retail Technology
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-foreground leading-[1.08] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Accelerating Business with{" "}
              <span className="gradient-text">AI & Automation</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-soft text-lg font-normal leading-relaxed max-w-[520px] mb-10"
            >
              Bridging the gap between traditional retail and future-tech. From smart POS systems to AI-powered chatbots, we build the tools that drive your business forward.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-4 flex-wrap"
            >
              <a
                href="#demo"
                className="gradient-primary text-foreground px-7 py-3.5 rounded-lg font-semibold text-[0.9rem] no-underline shadow-glow hover:shadow-[0_12px_40px_hsla(213,94%,52%,0.45)] transition-all inline-flex items-center gap-2"
              >
                Get Started Now
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#services"
                className="glass-card text-foreground px-7 py-3.5 rounded-lg font-semibold text-[0.9rem] no-underline hover:bg-foreground/[0.06] transition-all inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan" />
                Explore Features
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-10 mt-14 pt-8 border-t border-foreground/[0.06] flex-wrap"
            >
              {[
                { val: "500+", label: "Businesses Served" },
                { val: "99.9%", label: "System Uptime" },
                { val: "24/7", label: "AI-Powered Support" },
              ].map((s) => (
                <div key={s.label}>
                  <h3 className="font-display text-3xl font-extrabold text-foreground">{s.val}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="glass-card-solid rounded-2xl p-6 shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
              <div className="flex justify-between items-center mb-5 pb-4 border-b border-foreground/[0.06]">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                </div>
                <span className="font-display text-xs font-bold text-soft tracking-wider uppercase">Zaderi Dashboard</span>
                <span className="text-xs text-cyan font-medium">● Live</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Today's Sales", val: "UGX 4.2M", sub: "↑ +12.4%", color: "text-cyan" },
                  { label: "Transactions", val: "147", sub: "↑ +8 today", color: "text-cyan" },
                  { label: "AI Chats", val: "89", sub: "Active now", color: "text-electric" },
                ].map((c) => (
                  <div key={c.label} className="bg-foreground/[0.03] border border-foreground/[0.06] rounded-xl p-3.5">
                    <div className="text-[0.65rem] text-muted-foreground uppercase tracking-wider mb-1.5">{c.label}</div>
                    <div className="font-display text-lg font-bold text-foreground">{c.val}</div>
                    <div className={`text-[0.65rem] mt-0.5 ${c.color}`}>{c.sub}</div>
                  </div>
                ))}
              </div>

              <div className="bg-foreground/[0.02] border border-foreground/[0.06] rounded-xl p-4 mb-4">
                <div className="text-[0.7rem] text-muted-foreground mb-3">Weekly Revenue</div>
                <div className="flex items-end gap-2 h-[70px]">
                  {[45, 60, 50, 80, 95, 65, 70].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t transition-all ${i === 4 ? "gradient-accent" : "gradient-primary"}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { name: "📦 Beverages Sale", val: "+UGX 85,000", pos: true },
                  { name: "🤖 AI Lead Captured", val: "New Contact", pos: true },
                  { name: "🛒 Grocery Bundle", val: "+UGX 142,000", pos: true },
                ].map((tx) => (
                  <div key={tx.name} className="flex justify-between items-center px-3 py-2 bg-foreground/[0.03] rounded-lg text-xs">
                    <span className="text-soft">{tx.name}</span>
                    <span className="font-semibold text-cyan">{tx.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
