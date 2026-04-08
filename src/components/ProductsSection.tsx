import { useState } from "react";
import { motion } from "framer-motion";

const products = {
  pos: {
    title: "POS Terminal Interface",
    desc: "Our POS system is designed to process sales quickly and accurately. With a clean, touch-friendly interface, your staff can start selling on day one — no extensive training required.",
    features: ["⚡ Instant checkout", "📱 Mobile-ready", "☁️ Cloud sync", "📶 Works offline", "🖨️ Auto receipt printing", "🔐 Secure & auditable"],
  },
  dashboard: {
    title: "Back Office Dashboard",
    desc: "Manage your entire retail operation from a single dashboard. Track sales, monitor staff performance, manage suppliers, and generate reports — all in real time.",
    features: ["📊 Real-time analytics", "👥 Staff management", "📋 Purchase orders", "💰 Revenue tracking", "🏪 Multi-branch view", "📈 Growth insights"],
  },
  inventory: {
    title: "Inventory Control System",
    desc: "Smart inventory management that keeps your shelves stocked and your costs down. Automated alerts, batch tracking, and seamless integration with your POS.",
    features: ["📦 Stock tracking", "🔔 Auto alerts", "📱 Barcode scanning", "🔄 Branch transfers", "📅 Expiry tracking", "📊 Stock reports"],
  },
};

type ProductKey = keyof typeof products;

const ProductsSection = () => {
  const [active, setActive] = useState<ProductKey>("pos");
  const product = products[active];

  return (
    <section id="products" className="relative z-10 bg-navy/50">
      <div className="max-w-[1200px] mx-auto py-24 px-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-electric text-xs font-semibold tracking-[0.12em] uppercase block mb-4">Our Solutions</span>
          <h2 className="font-display font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            See It in Action
          </h2>
          <p className="text-soft text-base font-light max-w-[540px] leading-relaxed">
            Intuitive interfaces designed for real-world retail environments — fast, reliable, and built to scale with your business.
          </p>
        </motion.div>

        <div className="flex gap-3 mt-10 mb-12 flex-wrap">
          {[
            { key: "pos" as ProductKey, label: "POS Terminal" },
            { key: "dashboard" as ProductKey, label: "Back Office" },
            { key: "inventory" as ProductKey, label: "Inventory" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-all font-body ${
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="py-5"
          >
            <h3 className="font-display text-3xl font-extrabold tracking-tight mb-4">{product.title}</h3>
            <p className="text-soft text-[0.95rem] font-light leading-relaxed mb-8">{product.desc}</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {product.features.map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-soft text-sm">
                  <span className="w-8 h-8 rounded-lg bg-cyan/10 border border-cyan/20 grid place-items-center text-sm flex-shrink-0">
                    {f.slice(0, 2)}
                  </span>
                  <span>{f.slice(3)}</span>
                </div>
              ))}
            </div>
            <a
              href="#demo"
              className="gradient-primary text-foreground px-8 py-3.5 rounded-full font-medium no-underline shadow-glow hover:-translate-y-0.5 transition-all inline-block"
            >
              Request a Free Demo
            </a>
          </motion.div>

          {/* POS Screen Mockup */}
          <motion.div
            key={active + "-screen"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card-solid rounded-2xl p-7 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          >
            <div className="bg-background/80 rounded-xl overflow-hidden">
              <div className="bg-cobalt/20 px-4 py-3 flex justify-between items-center border-b border-foreground/[0.08]">
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
                    <div key={t.item} className="flex justify-between bg-foreground/[0.04] border border-foreground/[0.08] rounded-lg px-3 py-2.5 text-xs">
                      <span className="text-soft">{t.item}</span>
                      <strong className="text-foreground">{t.price}</strong>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-foreground/[0.08] pt-2 px-3 text-xs mt-1">
                    <span className="text-muted-foreground">Discount 5%</span>
                    <strong className="text-[#FF6B8A]">-UGX 1,325</strong>
                  </div>
                </div>
                <div>
                  <div className="gradient-primary rounded-lg p-3.5 text-center">
                    <p className="text-foreground/70 text-[0.65rem]">Total Amount</p>
                    <h4 className="font-display text-xl font-extrabold text-foreground">UGX 25,175</h4>
                    <button className="mt-2.5 bg-foreground/15 border-none rounded-md text-foreground w-full py-2 text-xs font-semibold">
                      ✓ Process Payment
                    </button>
                  </div>
                  <div className="mt-2.5 flex flex-col gap-2">
                    {["💵 Cash", "📱 Mobile Money", "💳 Card"].map((m) => (
                      <div key={m} className="text-center bg-foreground/[0.04] border border-foreground/[0.08] rounded-lg py-2 text-xs text-soft cursor-pointer hover:bg-foreground/[0.08] transition-colors">
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
