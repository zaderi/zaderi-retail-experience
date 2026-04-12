import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const encodedSubject = encodeURIComponent(`Contact form: ${subject || "Website inquiry"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:sales@zaderitechnologies.com?subject=${encodedSubject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative z-10 bg-background">
      <div className="section-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-electric text-xs font-semibold tracking-[0.12em] uppercase block mb-3">Get In Touch</span>
          <h2 className="font-display font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Let's Talk About Your Business
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 mt-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-soft text-[0.92rem] font-normal leading-relaxed mb-8">
              Whether you need a POS system, AI chatbot, or full business automation, our team is ready to help.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { icon: "✉️", label: "Email", value: "sales@zaderitechnologies.com", href: "mailto:sales@zaderitechnologies.com" },
                { icon: "📞", label: "Phone", value: "+256 771 919 582", href: "tel:+256771919582" },
                { icon: "📍", label: "Location", value: "Kampala, Uganda" },
                { icon: "⏰", label: "Hours", value: "Mon to Sat: 8:00 AM to 6:00 PM" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href || "#"}
                  className="flex items-center gap-3 p-4 glass-card-solid rounded-lg no-underline text-inherit hover:border-electric/20 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-cobalt/15 grid place-items-center text-base flex-shrink-0">
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
              className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-lg no-underline text-foreground font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
            >
              💬 Chat on WhatsApp
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass-card-solid rounded-xl p-8"
          >
            <h3 className="font-display text-lg font-bold mb-6 text-foreground">Send Us a Message</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Subject</label>
            <input
              type="text"
              placeholder="How can we help?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5 mb-6">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Message</label>
            <textarea
              placeholder="Tell us more..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric transition-all resize-y"
            />

            <button
              type="submit"
              className="w-full gradient-primary text-foreground py-3.5 rounded-lg font-semibold text-[0.9rem] shadow-glow transition-all"
            >
              {submitted ? "✓ Message Sent!" : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
