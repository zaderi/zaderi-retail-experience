import { motion } from "framer-motion";
import { useState } from "react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative z-10 bg-background">
      <div className="max-w-[1200px] mx-auto py-24 px-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-electric text-xs font-semibold tracking-[0.12em] uppercase block mb-4">Get In Touch</span>
          <h2 className="font-display font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Let's Talk About<br />Your Business
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 mt-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-display text-2xl font-bold mb-4 text-foreground">We're Here to Help</h3>
            <p className="text-soft text-[0.92rem] font-light leading-relaxed mb-8">
              Whether you have questions, need support, or want to get started — our team is always ready to assist.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: "✉️", label: "Email", value: "sales@zaderitechnologies.com", href: "mailto:sales@zaderitechnologies.com" },
                { icon: "📞", label: "Phone", value: "+256 771 919 582", href: "tel:+256771919582" },
                { icon: "📍", label: "Location", value: "Kampala, Uganda" },
                { icon: "⏰", label: "Business Hours", value: "Mon–Sat: 8:00 AM – 6:00 PM" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href || "#"}
                  className="flex items-center gap-3.5 p-4 glass-card-solid rounded-xl no-underline text-inherit hover:border-electric/30 hover:translate-x-1 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-electric/10 grid place-items-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <strong className="block text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">{item.label}</strong>
                    <span className="text-foreground text-sm">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <a
              href="https://wa.me/256771919582"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl no-underline text-foreground font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 8px 24px rgba(37,211,102,0.3)" }}
            >
              💬 Chat with Us on WhatsApp
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="glass-card-solid rounded-2xl p-10"
          >
            <h3 className="font-display text-xl font-bold mb-6 text-foreground">Send Us a Message</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Name</label>
                <input type="text" placeholder="Your name" className="bg-background/60 border border-foreground/[0.08] rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/15 transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email</label>
                <input type="email" placeholder="your@email.com" className="bg-background/60 border border-foreground/[0.08] rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/15 transition-all" />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Phone</label>
              <input type="tel" placeholder="+256 ..." className="bg-background/60 border border-foreground/[0.08] rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/15 transition-all" />
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Subject</label>
              <input type="text" placeholder="How can we help?" className="bg-background/60 border border-foreground/[0.08] rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/15 transition-all" />
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Message</label>
              <textarea placeholder="Tell us more about your inquiry..." rows={4} className="bg-background/60 border border-foreground/[0.08] rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/15 transition-all resize-y" />
            </div>

            <button
              type="submit"
              className="w-full gradient-primary text-foreground py-3.5 rounded-full font-semibold text-base shadow-glow hover:-translate-y-0.5 transition-all"
            >
              {submitted ? "✓ Message Sent!" : "Send Message →"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
