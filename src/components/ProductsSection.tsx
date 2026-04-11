import { useState } from "react";
import { motion } from "framer-motion";

const products = {
  pos: {
    title: "POS Terminal Interface",
    desc: "Process sales quickly and accurately with a clean, touch-friendly interface. Your staff can start selling on day one — no extensive training required.",
    features: ["⚡ Instant checkout", "📱 Mobile-ready", "☁️ Cloud sync", "📶 Works offline", "🖨️ Auto receipt printing", "🔐 Secure & auditable"],
  },
  dashboard: {
    title: "Back Office Dashboard",
    desc: "Manage your entire retail operation from a single dashboard. Track sales, monitor staff, manage suppliers, and generate reports — all in real time.",
    features: ["📊 Real-time analytics", "👥 Staff management", "📋 Purchase orders", "💰 Revenue tracking", "🏪 Multi-branch view", "📈 Growth insights"],
  },
  inventory: {
    title: "Inventory Control System",
    desc: "Smart inventory management that keeps your shelves stocked and your costs down. Automated alerts, batch tracking, and seamless POS integration.",
    features: ["📦 Stock tracking", "🔔 Auto alerts", "📱 Barcode scanning", "🔄 Branch transfers", "📅 Expiry tracking", "📊 Stock reports"],
  },
};

type ProductKey = keyof typeof products;

const ProductsSection = () => {
  const [active, setActive] = useState<ProductKey>("pos");
  const product = products[active];

  return (
    <section id="products" className="relative z-10 bg-secondary/30">
      <div className="section-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-electric text-xs font-semibold tracking-[0.12em] uppercase block mb-3">Our Products</span>
          <h2 className="font-display font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            See It in Action
          </h2>
          <p className="text-soft text-[0.95rem] font-normal max-w-[520px] leading-relaxed">
            Intuitive interfaces designed for real-world retail — fast, reliable, and built to scale.
          </p>
        </motion.div>

        <div className="flex gap-2 mb-10 flex-wrap">
          {[
            { key: "pos" as ProductKey, label: "POS Terminal" },
            { key: "dashboard" as ProductKey, label: "Back Office" },
            { key: "inventory" as ProductKey, label: "Inventory" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                active === tab.key
                  ? "gradient-primary text-foreground border-transparent shadow-glow"
                  : "glass-card text-soft hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <h3 className="font-display text-2xl font-extrabold tracking-tight mb-3">{product.title}</h3>
            <p className="text-soft text-[0.92rem] font-normal leading-relaxed mb-6">{product.desc}</p>
            <div className="grid grid-cols-2 gap-2.5 mb-8">
              {product.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-soft text-sm">
                  <span className="w-7 h-7 rounded-md bg-cyan/10 border border-cyan/15 grid place-items-center text-xs flex-shrink-0">
                    {f.slice(0, 2)}
                  </span>
                  <span className="text-[0.82rem]">{f.slice(3)}</span>
                </div>
              ))}
            </div>
            <a
              href="#demo"
              className="gradient-primary text-foreground px-7 py-3 rounded-lg font-semibold text-sm no-underline shadow-glow hover:shadow-[0_12px_40px_hsla(213,94%,52%,0.45)] transition-all inline-block"
            >
              Request a Free Demo
            </a>
          </motion.div>

          <motion.div
            key={active + "-screen"}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="glass-card-solid rounded-xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
          >
            <div className="bg-background/80 rounded-lg overflow-hidden">
              <div className="bg-cobalt/15 px-4 py-2.5 flex justify-between items-center border-b border-foreground/[0.06]">
                <span className="text-xs text-soft">Cashier: Alice | 2:34 PM</span>
                <strong className="text-cyan text-xs font-display font-bold">ZADERI POS v3</strong>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  {[
                    { item: "Bread (x2)", price: "UGX 6,000" },
                    { item: "Milk 500ml", price: "UGX 3,500" },
                    { item: "Sugar 1kg", price: "UGX 5,000" },
                    { item: "Cooking Oil", price: "UGX 12,000" },
                  ].map((t) => (
                    <div key={t.item} className="flex justify-between bg-foreground/[0.03] border border-foreground/[0.06] rounded-lg px-3 py-2 text-xs">
                      <span className="text-soft">{t.item}</span>
                      <strong className="text-foreground">{t.price}</strong>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="gradient-primary rounded-lg p-3 text-center">
                    <p className="text-foreground/70 text-[0.6rem]">Total Amount</p>
                    <h4 className="font-display text-xl font-extrabold text-foreground">UGX 25,175</h4>
                    <button className="mt-2 bg-foreground/15 border-none rounded-md text-foreground w-full py-1.5 text-xs font-semibold">
                      ✓ Process Payment
                    </button>
                  </div>
                  <div className="mt-2 flex flex-col gap-1.5">
                    {["💵 Cash", "📱 Mobile Money", "💳 Card"].map((m) => (
                      <div key={m} className="text-center bg-foreground/[0.03] border border-foreground/[0.06] rounded-lg py-1.5 text-xs text-soft">
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
