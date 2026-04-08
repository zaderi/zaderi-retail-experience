import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-[120px] pb-20 px-[5%]">
      {/* Background orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-cobalt/25 blur-[100px] -top-[200px] -right-[100px] animate-drift" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan/25 blur-[100px] -bottom-[150px] left-[10%] animate-drift-reverse" />
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(27,127,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(27,127,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[700px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 bg-electric/10 border border-electric/25 text-cyan px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_hsl(195,100%,50%)] animate-pulse" />
          Trusted Retail Technology Partner
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display font-extrabold text-foreground leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
        >
          Smart Retail<br />Solutions for<br />
          <span className="gradient-text">Modern Business</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-soft text-lg font-light max-w-[560px] mb-10"
        >
          Zaderi Technologies Ltd delivers powerful POS systems and retail management platforms that help businesses sell smarter, track inventory in real time, and grow faster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex gap-4 flex-wrap"
        >
          <a
            href="#demo"
            className="gradient-primary text-foreground px-8 py-3.5 rounded-full font-medium text-[0.95rem] no-underline shadow-glow hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
          >
            🚀 Request a Demo
          </a>
          <a
            href="#products"
            className="glass-card text-foreground px-8 py-3.5 rounded-full font-medium text-[0.95rem] no-underline hover:bg-foreground/[0.08] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
          >
            Explore Products →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-12 mt-16 pt-10 border-t border-foreground/[0.08] flex-wrap"
        >
          {[
            { val: "500+", label: "Businesses Served" },
            { val: "99%", label: "Uptime Guarantee" },
            { val: "24/7", label: "Support Available" },
          ].map((s) => (
            <div key={s.label}>
              <h3 className="font-display text-4xl font-extrabold text-foreground leading-none">{s.val}</h3>
              <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dashboard Mockup */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[44%] max-w-[580px] z-10 hidden lg:block"
      >
        <div className="glass-card-solid rounded-2xl p-6 shadow-[0_40px_100px_rgba(0,0,0,0.5)] animate-float">
          <div className="flex justify-between items-center mb-5 pb-4 border-b border-foreground/[0.08]">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
            </div>
            <span className="font-display text-xs font-bold text-soft tracking-widest uppercase">Zaderi Dashboard</span>
            <span className="text-xs text-cyan">● Live</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Today's Sales", val: "UGX 4.2M", sub: "↑ +12.4%" },
              { label: "Transactions", val: "147", sub: "↑ +8 today" },
              { label: "Stock Alerts", val: "3", sub: "⚠ Low stock", warn: true },
            ].map((c) => (
              <div key={c.label} className="bg-electric/[0.08] border border-electric/15 rounded-xl p-3.5">
                <div className="text-[0.65rem] text-muted-foreground uppercase tracking-wider mb-1.5">{c.label}</div>
                <div className="font-display text-lg font-bold text-foreground">{c.val}</div>
                <div className={`text-[0.65rem] mt-0.5 ${c.warn ? "text-[#FFB800]" : "text-[#00D4AA]"}`}>{c.sub}</div>
              </div>
            ))}
          </div>

          <div className="bg-cobalt/[0.06] border border-electric/10 rounded-xl p-4 mb-4">
            <div className="text-[0.7rem] text-muted-foreground mb-3">Weekly Revenue</div>
            <div className="flex items-end gap-2 h-[70px]">
              {[45, 60, 50, 80, 95, 65, 70].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${i === 4 ? "gradient-accent" : "gradient-primary"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {[
              { name: "📦 Beverages Sale", val: "+UGX 85,000", neg: false },
              { name: "🛒 Grocery Bundle", val: "+UGX 142,000", neg: false },
              { name: "🔄 Refund Processed", val: "-UGX 12,000", neg: true },
            ].map((tx) => (
              <div key={tx.name} className="flex justify-between items-center px-3 py-2 bg-foreground/[0.03] rounded-lg text-xs">
                <span className="text-soft">{tx.name}</span>
                <span className={`font-semibold ${tx.neg ? "text-[#FF6B8A]" : "text-[#00D4AA]"}`}>{tx.val}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
