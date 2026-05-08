import { useState } from "react";
import { motion } from "framer-motion";

const products = {
  retail: {
    title: "Retail Management System",
    desc: "A complete, integrated platform for managing your entire retail operation. From sales and inventory to supplier management and analytics, everything works together seamlessly.",
    features: [
      "⚡ Point of Sale (POS)",
      "📦 Inventory Management",
      "📊 Sales Analytics & Reports",
      "👥 Supplier Management",
      "🏪 Multi-branch Support",
      "📱 Mobile Access",
      "🔐 Role-based Security",
      "🖨️ Receipt Printing",
      "💵 Cash, Mobile Money & Card",
      "👤 Customer Management",
      "📋 Purchase Orders",
      "📈 Growth Insights",
    ],
    screen: "retail",
    pricing: {
      monthly: 69,
      annual: 699,
    },
  },
  ai: {
    title: "AI Automation Solutions",
    desc: "Intelligent automation tools that work around the clock. From customer-facing chatbots to internal workflow automation, let AI handle the repetitive so you can focus on growth.",
    features: [
      "🤖 Custom AI Agents",
      "💬 AI Chatbots",
      "👥 Lead Generation Bots",
      "⏰ 24/7 Automated Support",
      "⚡ No-Code Automation",
      "📊 AI-Powered Analytics",
      "📱 WhatsApp Integration",
      "🌐 Web Chat Widgets",
      "📈 Smart Insights",
      "🔄 Workflow Automation",
      "📧 Email Automation",
      "🎯 Customer Segmentation",
    ],
    screen: "ai",
    pricing: {
      monthly: 45,
      annual: 450,
    },
  },
};

type ProductKey = keyof typeof products;

const ProductsSection = () => {
  const [active, setActive] = useState<ProductKey>("retail");
  const product = products[active];

  return (
    <section id="products" className="relative z-10 bg-background">
      <div className="section-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[560px] mb-8"
        >
          <span className="eyebrow block mb-2.5">Our Products</span>
          <h2 className="h-section text-foreground mb-3">See it in action</h2>
          <p className="lead">
            Intuitive solutions designed for real-world business needs fast, reliable, and built to scale.
          </p>
        </motion.div>

        <div className="flex gap-2 mb-10 flex-wrap">
          {[
            { key: "retail" as ProductKey, label: "Retail Management" },
            { key: "ai" as ProductKey, label: "AI Automation" },
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
                  <span className="text-[0.82rem]">{f.replace(/^[^\s]+\s*/, "")}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="glass-card-solid rounded-xl p-5 mb-6">
              <h4 className="font-display text-sm font-bold text-foreground mb-3">Pricing</h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[140px] bg-cobalt/10 border border-cobalt/15 rounded-lg p-4 text-center">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Monthly</p>
                  <p className="font-display text-2xl font-extrabold text-foreground">${product.pricing.monthly}</p>
                  <p className="text-muted-foreground text-xs mt-1">per month</p>
                </div>
                <div className="flex-1 min-w-[140px] bg-cobalt/10 border border-cobalt/15 rounded-lg p-4 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-cyan text-background text-[0.6rem] font-bold px-2 py-0.5 rounded-bl-lg">2 MONTHS FREE</div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Annual</p>
                  <p className="font-display text-2xl font-extrabold text-foreground">${product.pricing.annual}</p>
                  <p className="text-muted-foreground text-xs mt-1">per year</p>
                </div>
              </div>
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
            {active === "retail" ? (
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
                      <h4 className="font-display text-xl font-extrabold text-foreground">UGX 26,500</h4>
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
            ) : (
              <div className="bg-background/80 rounded-lg overflow-hidden">
                <div className="bg-cobalt/15 px-4 py-2.5 flex justify-between items-center border-b border-foreground/[0.06]">
                  <span className="text-xs text-soft">AI Dashboard</span>
                  <strong className="text-cyan text-xs font-display font-bold">ZADERI AI</strong>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-foreground/[0.03] border border-foreground/[0.06] rounded-lg p-3 text-center">
                      <p className="text-muted-foreground text-[0.6rem] uppercase">Active Bots</p>
                      <p className="font-display text-lg font-bold text-foreground">3</p>
                    </div>
                    <div className="bg-foreground/[0.03] border border-foreground/[0.06] rounded-lg p-3 text-center">
                      <p className="text-muted-foreground text-[0.6rem] uppercase">Leads Today</p>
                      <p className="font-display text-lg font-bold text-cyan">24</p>
                    </div>
                  </div>
                  <div className="bg-foreground/[0.03] border border-foreground/[0.06] rounded-lg p-3">
                    <p className="text-muted-foreground text-[0.6rem] uppercase mb-2">Recent Conversations</p>
                    {[
                      { user: "Customer #142", msg: "Product inquiry", status: "Resolved" },
                      { user: "Lead #89", msg: "Demo request", status: "Forwarded" },
                      { user: "Customer #156", msg: "Support ticket", status: "Active" },
                    ].map((c) => (
                      <div key={c.user} className="flex justify-between items-center py-1.5 border-b border-foreground/[0.04] last:border-0 text-xs">
                        <div>
                          <span className="text-foreground">{c.user}</span>
                          <span className="text-muted-foreground ml-2">{c.msg}</span>
                        </div>
                        <span className="text-cyan text-[0.65rem]">{c.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
