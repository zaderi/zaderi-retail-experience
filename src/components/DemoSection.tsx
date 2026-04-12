import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { fetchApi } from "../lib/api";

const DemoSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetchApi('/api/forms', {
        method: 'POST',
        body: JSON.stringify({
          type: 'demo',
          full_name: fullName,
          phone,
          email,
          interest,
          message,
        }),
      });

      if (!response.ok) {
        console.error('Failed to submit demo request:', await response.text());
        alert('Failed to submit form. Please try again.');
        return;
      }

      setSubmitted(true);
      setFullName("");
      setPhone("");
      setEmail("");
      setInterest("");
      setMessage("");

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please try again.');
    }
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
                required
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
                required
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
              required
              type="email"
              placeholder="you@business.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">What are you interested in?</label>
            <div className="relative">
              <select
                required
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric appearance-none"
              >
                <option value="">Select...</option>
                <option value="Retail Management System">Retail Management System</option>
                <option value="AI Chatbots & Automation">AI Chatbots & Automation</option>
                <option value="Both - Full Suite">Both - Full Suite</option>
                <option value="Custom Solution">Custom Solution</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-muted-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
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
            disabled={submitted}
            className={`w-full py-3.5 rounded-lg font-semibold text-[0.9rem] transition-all ${
              submitted 
                ? "bg-green-500/20 text-green-400 border border-green-500/50" 
                : "gradient-primary text-foreground shadow-glow hover:shadow-[0_12px_40px_hsla(213,94%,52%,0.45)]"
            }`}
          >
            {submitted ? "✓ Request Sent!" : "Book My Free Demo"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default DemoSection;