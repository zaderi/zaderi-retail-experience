import { motion } from "framer-motion";
import { Monitor, Store, Package, BarChart3, ShieldCheck, Smartphone } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Point of Sale",
    desc: "Lightning-fast, touch-friendly POS for transactions, receipts, and payments including mobile money.",
    features: ["Touch UI", "Mobile money", "Receipt print", "Offline mode"],
  },
  {
    icon: Store,
    title: "Retail Management",
    desc: "An integrated system for managing your entire retail operation in one place.",
    features: ["Multi-branch", "Suppliers", "Loyalty", "Pricing engine"],
  },
  {
    icon: Package,
    title: "Inventory Control",
    desc: "Real-time stock tracking with alerts, barcode scanning, and batch management.",
    features: ["Live stock", "Low alerts", "Barcodes", "Expiry tracking"],
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    desc: "Reports that turn raw sales data into clear, actionable business intelligence.",
    features: ["Custom reports", "Insights", "Performance", "PDF / Excel"],
  },
  {
    icon: Smartphone,
    title: "Mobile Access",
    desc: "Run your business from anywhere. Cloud platform accessible from any device.",
    features: ["Mobile dash", "Live sync", "Push alerts", "Remote ops"],
  },
  {
    icon: ShieldCheck,
    title: "Security",
    desc: "Enterprise-grade security with role-based access, audit trails, and encryption.",
    features: ["RBAC", "Audit log", "Encryption", "Backups"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative z-10 bg-secondary/20 border-y border-foreground/[0.05]">
      <div className="section-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10"
        >
          <div className="max-w-[560px]">
            <span className="eyebrow block mb-2.5">Retail Solutions</span>
            <h2 className="h-section text-foreground mb-3">Everything your retail business needs</h2>
            <p className="lead">
              Built for the modern Ugandan retail market, from small shops to multi-branch chains.
            </p>
          </div>
          <a href="#products" className="story-link text-electric text-sm font-semibold hidden lg:inline-block">
            Explore products →
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="group relative rounded-xl p-6 border border-foreground/[0.06] bg-card/40 card-hover"
            >
              <div className="w-10 h-10 rounded-lg bg-cobalt/10 border border-cobalt/15 grid place-items-center mb-4 group-hover:bg-cobalt/20 transition-colors">
                <s.icon className="w-4.5 h-4.5 text-electric" />
              </div>
              <h3 className="font-display text-[0.95rem] font-bold text-foreground mb-1.5">{s.title}</h3>
              <p className="text-soft text-[0.83rem] leading-relaxed mb-3.5">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.features.map((f) => (
                  <span key={f} className="text-[0.68rem] text-muted-foreground bg-foreground/[0.04] border border-foreground/[0.04] px-2 py-0.5 rounded-md">
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
