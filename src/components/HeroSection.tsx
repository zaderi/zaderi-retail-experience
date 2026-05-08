import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, TrendingUp, Bot, ShoppingCart, CheckCircle2 } from "lucide-react";

const useCounter = (end: number, duration = 1500) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setV(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return v;
};

const LiveDashboard = () => {
  const sales = useCounter(4280);
  const tx = useCounter(147);
  const chats = useCounter(89);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2400);
    return () => clearInterval(id);
  }, []);

  const activities = [
    { icon: ShoppingCart, color: "text-cyan", label: "Beverages sale", val: "+UGX 85,000" },
    { icon: Bot, color: "text-electric", label: "AI captured a lead", val: "Hot" },
    { icon: TrendingUp, color: "text-cyan", label: "Grocery bundle", val: "+UGX 142,000" },
    { icon: CheckCircle2, color: "text-cyan", label: "Stock auto-reorder", val: "Done" },
  ];

  return (
    <div className="relative">
      {/* Floating notification */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute -top-4 -left-4 z-20 hidden md:flex items-center gap-2 glass-card-solid rounded-xl px-3 py-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
      >
        <span className="w-2 h-2 rounded-full bg-cyan pulse-dot" />
        <span className="text-[0.72rem] text-foreground font-medium">3 new orders</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden md:flex items-center gap-2 glass-card-solid rounded-xl px-3 py-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
      >
        <Bot className="w-3.5 h-3.5 text-electric" />
        <span className="text-[0.72rem] text-foreground font-medium">AI replied in 1.2s</span>
      </motion.div>

      <div className="glass-card-solid rounded-2xl p-5 ring-soft">
        {/* topbar */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-foreground/[0.06]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
          </div>
          <span className="font-display text-[0.65rem] font-bold text-soft tracking-[0.18em] uppercase">Zaderi · Live</span>
          <span className="flex items-center gap-1 text-[0.65rem] text-cyan font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan pulse-dot" /> online
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {[
            { label: "Today", val: `UGX ${(sales * 1000).toLocaleString()}`, sub: "↑ 12.4%", color: "text-cyan" },
            { label: "Orders", val: tx.toString(), sub: "↑ 8 today", color: "text-cyan" },
            { label: "AI Chats", val: chats.toString(), sub: "Active", color: "text-electric" },
          ].map((c) => (
            <div key={c.label} className="bg-foreground/[0.03] border border-foreground/[0.06] rounded-lg p-2.5">
              <div className="text-[0.6rem] text-muted-foreground uppercase tracking-wider mb-1">{c.label}</div>
              <div className="font-display text-[0.95rem] font-bold text-foreground tabular-nums">{c.val}</div>
              <div className={`text-[0.6rem] mt-0.5 ${c.color}`}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* chart */}
        <div className="bg-foreground/[0.02] border border-foreground/[0.06] rounded-lg p-3 mb-3">
          <div className="flex justify-between text-[0.65rem] text-muted-foreground mb-2">
            <span>Weekly Revenue</span>
            <span className="text-cyan">+18.2%</span>
          </div>
          <div className="flex items-end gap-1.5 h-[60px]">
            {[45, 60, 50, 80, 95, 65, 70].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.8 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                className={`flex-1 rounded-t ${i === 4 ? "gradient-accent" : "gradient-primary"}`}
              />
            ))}
          </div>
        </div>

        {/* activity ticker */}
        <div className="bg-foreground/[0.02] border border-foreground/[0.06] rounded-lg p-2.5 overflow-hidden h-[44px] relative">
          {activities.map((a, i) => {
            const Icon = a.icon;
            const active = tick % activities.length === i;
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-between px-3"
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${a.color}`} />
                  <span className="text-[0.72rem] text-soft">{a.label}</span>
                </div>
                <span className={`text-[0.72rem] font-semibold ${a.color}`}>{a.val}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden pt-[88px] pb-12 lg:pt-[110px] lg:pb-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-cobalt/15 blur-[140px] -top-[200px] -right-[100px]" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan/10 blur-[120px] bottom-[10%] left-[5%]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative z-10 section-container w-full px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-cobalt/10 border border-cobalt/20 text-electric px-3 py-1 rounded-full text-[0.7rem] font-semibold tracking-wide mb-5"
            >
              <Sparkles className="w-3 h-3" />
              Smart Business Technology
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="font-display font-extrabold text-foreground leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)" }}
            >
              Accelerate your business with{" "}
              <span className="gradient-text">modern technology</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-soft text-[1rem] leading-relaxed max-w-[520px] mb-7"
            >
              From smart POS systems to AI-powered automation, we build the operational tools that help retailers run faster, sell more, and scale with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="flex gap-3 flex-wrap"
            >
              <a
                href="#demo"
                className="gradient-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-[0.88rem] no-underline shadow-glow hover:shadow-[0_16px_40px_-10px_hsla(213,94%,52%,0.6)] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
              >
                Request a demo
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#products"
                className="text-foreground px-6 py-3 rounded-lg font-semibold text-[0.88rem] no-underline border border-foreground/15 hover:border-foreground/30 hover:bg-foreground/[0.04] transition-all inline-flex items-center gap-2"
              >
                See it in action
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6 mt-8 pt-6 border-t border-foreground/[0.06] flex-wrap"
            >
              {[
                { val: "500+", label: "Businesses served" },
                { val: "99.9%", label: "Uptime" },
                { val: "24/7", label: "Support" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-xl font-extrabold text-foreground tabular-nums">{s.val}</div>
                  <div className="text-muted-foreground text-[0.72rem] mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <LiveDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
