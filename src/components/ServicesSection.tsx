import { motion } from "framer-motion";
import { Monitor, Store, Package, BarChart3, ShieldCheck, Smartphone } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Point of Sale",
    desc: "Lightning-fast, touch-friendly POS that handles transactions, receipts, and multiple payment methods — including mobile money.",
    features: ["Touch-screen interface", "Cash, Mobile Money & Card", "Receipt printing", "Offline mode"],
  },
  {
    icon: Store,
    title: "Retail Management",
    desc: "Complete back-office system for managing your entire retail operation — purchasing, suppliers, customers, and more.",
    features: ["Multi-branch support", "Supplier management", "Customer loyalty", "Pricing engine"],
  },
  {
    icon: Package,
    title: "Inventory Control",
    desc: "Real-time stock tracking with automated alerts, barcode scanning, and batch management to prevent stockouts.",
    features: ["Real-time tracking", "Low stock alerts", "Barcode scanning", "Expiry tracking"],
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    desc: "Powerful reporting that turns raw sales data into actionable business intelligence for smarter decision-making.",
    features: ["Custom reports", "Product insights", "Staff performance", "Export to PDF/Excel"],
  },
  {
    icon: Smartphone,
    title: "Mobile Access",
    desc: "Monitor your business from anywhere. Our cloud-based platform gives you full access from any device, any time.",
    features: ["Mobile dashboard", "Real-time sync", "Push notifications", "Remote management"],
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    desc: "Enterprise-grade security with role-based access, audit trails, and data encryption to protect your business.",
    features: ["Role-based access", "Audit trails", "Data encryption", "Secure backups"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative z-10 bg-secondary/30">
      <div className="section-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[600px] mx-auto mb-14"
        >
          <span className="text-electric text-xs font-semibold tracking-[0.12em] uppercase block mb-3">Retail Solutions</span>
          <h2 className="font-display font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Everything Your Retail Business Needs
          </h2>
          <p className="text-soft text-[0.95rem] font-normal leading-relaxed">
            Built specifically for the modern Ugandan retail market — from small shops to multi-branch chains.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass-card-solid rounded-xl p-7 group hover:-translate-y-1 hover:border-electric/20 transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-cobalt/15 border border-cobalt/20 grid place-items-center mb-5">
                <s.icon className="w-5 h-5 text-electric" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-soft text-sm font-normal leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.features.map((f) => (
                  <span key={f} className="text-[0.7rem] text-muted-foreground bg-foreground/[0.04] px-2.5 py-1 rounded-md">
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
