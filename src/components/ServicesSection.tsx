import { motion } from "framer-motion";
import { Monitor, Store, Package, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Point of Sale Systems",
    desc: "Lightning-fast, intuitive POS software that processes transactions, manages receipts, and handles multiple payment methods seamlessly.",
    features: ["Touch-screen optimized interface", "Multiple payment types (cash, mobile money, card)", "Receipt printing & digital receipts", "Offline mode capability", "Staff access management"],
  },
  {
    icon: Store,
    title: "Retail Management System",
    desc: "A complete back-office system that gives you full control over your retail operation — from purchasing to customer management.",
    features: ["Multi-branch management", "Supplier & purchase orders", "Customer loyalty programs", "User roles & permissions", "Pricing & promotions engine"],
  },
  {
    icon: Package,
    title: "Inventory Management",
    desc: "Never run out of stock or overstock again. Real-time tracking keeps your shelves stocked and your business running smoothly.",
    features: ["Real-time stock tracking", "Low stock alerts & reorder points", "Barcode & QR code scanning", "Stock transfer between branches", "Expiry date tracking"],
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    desc: "Turn your sales data into business intelligence. Make decisions based on facts, not guesses, with our powerful analytics suite.",
    features: ["Daily, weekly, monthly reports", "Top-selling products insights", "Staff performance tracking", "Profit & loss summaries", "Export to PDF or Excel"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative z-10 bg-navy/30">
      <div className="max-w-[1200px] mx-auto py-24 px-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-electric text-xs font-semibold tracking-[0.12em] uppercase block mb-4">What We Offer</span>
          <h2 className="font-display font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Everything Your<br />Retail Business Needs
          </h2>
          <p className="text-soft text-base font-light max-w-[540px] leading-relaxed">
            From the moment a customer walks in to the moment the books are closed, Zaderi has you covered end to end.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="glass-card-solid rounded-2xl p-8 group hover:-translate-y-1.5 hover:border-electric/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-cobalt/30 to-cyan/15 border border-electric/20 grid place-items-center mb-5">
                <s.icon className="w-6 h-6 text-electric" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-3">{s.title}</h3>
              <p className="text-soft text-sm font-light leading-relaxed mb-5">{s.desc}</p>
              <ul className="flex flex-col gap-1.5">
                {s.features.map((f) => (
                  <li key={f} className="text-soft text-xs flex items-center gap-2">
                    <span className="text-cyan font-bold text-[0.75rem]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
