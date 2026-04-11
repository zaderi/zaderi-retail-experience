import { motion } from "framer-motion";
import { Bot, MessageSquare, Zap, Users, Clock, TrendingUp } from "lucide-react";

const aiFeatures = [
  {
    icon: Bot,
    title: "Custom AI Agents",
    desc: "Intelligent AI agents tailored to your business workflows — from customer inquiries to order processing and beyond.",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbots",
    desc: "24/7 automated customer support chatbots that handle FAQs, bookings, and inquiries across WhatsApp, web, and social media.",
  },
  {
    icon: Users,
    title: "Lead Generation Bots",
    desc: "Smart bots that qualify leads, capture contact information, and nurture prospects automatically — even while you sleep.",
  },
  {
    icon: Clock,
    title: "24/7 Automated Support",
    desc: "Never miss a customer query again. Our AI systems provide instant, accurate responses around the clock.",
  },
  {
    icon: Zap,
    title: "No-Code Automation",
    desc: "Build powerful automations without writing a single line of code. Streamline repetitive tasks and save hours every week.",
  },
  {
    icon: TrendingUp,
    title: "AI-Powered Analytics",
    desc: "Get intelligent insights from your data. Our AI identifies trends, predicts demand, and recommends actions to boost revenue.",
  },
];

const AIAutomationSection = () => {
  return (
    <section id="ai-automation" className="relative z-10 bg-background">
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan text-xs font-semibold tracking-[0.12em] uppercase block mb-3">AI & Automation</span>
            <h2 className="font-display font-extrabold tracking-tight leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Automate. Engage. <span className="gradient-text">Scale.</span>
            </h2>
            <p className="text-soft text-[0.95rem] font-normal leading-relaxed mb-8">
              From custom AI chatbots to intelligent lead generation systems, we deploy cutting-edge automation solutions using no-code and low-code tools — so your business works smarter, not harder.
            </p>

            {/* Chat Preview */}
            <div className="glass-card-solid rounded-xl p-5 max-w-[400px]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-foreground/[0.06]">
                <div className="w-8 h-8 rounded-full gradient-accent grid place-items-center">
                  <Bot className="w-4 h-4 text-background" />
                </div>
                <div>
                  <span className="text-foreground text-sm font-semibold block">Zaderi AI Assistant</span>
                  <span className="text-cyan text-[0.65rem]">● Online</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-foreground/[0.04] rounded-lg rounded-tl-sm px-3.5 py-2.5 text-sm text-soft max-w-[85%]">
                  Hi! 👋 I'm your AI assistant. How can I help you today?
                </div>
                <div className="bg-cobalt/20 rounded-lg rounded-tr-sm px-3.5 py-2.5 text-sm text-foreground max-w-[85%] self-end">
                  I'd like to know about your POS pricing
                </div>
                <div className="bg-foreground/[0.04] rounded-lg rounded-tl-sm px-3.5 py-2.5 text-sm text-soft max-w-[85%]">
                  Great question! Our POS plans start from UGX 150,000/month. Want me to schedule a free demo? 🚀
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aiFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="glass-card-solid rounded-xl p-5 hover:-translate-y-1 hover:border-cyan/20 transition-all"
              >
                <f.icon className="w-5 h-5 text-cyan mb-3" />
                <h4 className="font-display text-sm font-bold text-foreground mb-1.5">{f.title}</h4>
                <p className="text-soft text-xs font-normal leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAutomationSection;
