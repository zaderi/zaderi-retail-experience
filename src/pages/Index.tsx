import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AIAutomationSection from "@/components/AIAutomationSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import WhySection from "@/components/WhySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DemoSection from "@/components/DemoSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <AIAutomationSection />
        <AboutSection />
        <ProductsSection />
        <WhySection />
        <TestimonialsSection />
        <DemoSection />
        <ContactSection />
        <Footer />
        <WhatsAppFloat />
      </div>
    </ThemeProvider>
  );
};

export default Index;
