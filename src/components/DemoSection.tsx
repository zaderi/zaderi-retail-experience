import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

const DemoSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Send to backend API
    fetch('/api/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'demo',
        fullName,
        phone,
        email,
        interest,
        message
      })
    })
    .then(response => {
      if (response.ok) {
        // Also open email client as fallback
        const subject = encodeURIComponent(`Demo request from ${fullName || "website visitor"}`);
        const body = encodeURIComponent(
          `Name: ${fullName}\nPhone: ${phone}\nEmail: ${email}\nInterest: ${interest}\n\nMessage:\n${message}`
        );
        window.location.href = `mailto:sales@zaderitechnologies.com?subject=${subject}&body=${body}`;

        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert('Failed to submit form. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      alert('Network error. Please try again.');
    });
  };

  return (
    <section id="demo" className="relative z-10 border-y border-foreground/[0.06]" style={{ background: "linear-gradient(160deg, hsla(213,94%,52%,0.08) 0%, hsla(170,80%,50%,0.04) 100%)" }}>
      <div className="max-w-[680px] mx-auto section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-electric text-xs font-semibold tracking-[0.12em] uppercase block mb-3">Free Demo</span>
          <h2 className="font-display font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}>
            Ready to Transform <span className="gradient-text">Your Business?</span>
          </h2>
          <p className="text-soft text-[0.95rem] font-normal mb-10">
            See Zaderi in action with a free, no-obligation demo. We'll walk you through everything.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-card-solid rounded-xl p-8 text-left"
        >
          <h3 className="font-display text-lg font-bold text-center mb-6 text-foreground">Request a Free Demo</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Phone</label>
              <input
                type="tel"
                placeholder="+256 700 000 000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email</label>
            <input
              type="email"
              placeholder="you@business.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">What are you interested in?</label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric appearance-none"
            >
              <option value="">Select...</option>
              <option>Retail Management System</option>
              <option>AI Chatbots & Automation</option>
              <option>Both - Full Suite</option>
              <option>Custom Solution</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 mb-6">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Message (Optional)</label>
            <textarea
              placeholder="Tell us about your business..."
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric transition-all resize-y"
            />
          </div>

          <button
            type="submit"
            className="w-full gradient-primary text-foreground py-3.5 rounded-lg font-semibold text-[0.9rem] shadow-glow hover:shadow-[0_12px_40px_hsla(213,94%,52%,0.45)] transition-all"
          >
            {submitted ? "✓ Request Sent!" : "Book My Free Demo"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default DemoSection;
