import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const serviceCategories = [
  {
    category: "📌 Poster Design",
    services: [
      { name: "Single Poster", price: "₹499" },
      { name: "5 Posters", price: "₹2,200" },
      { name: "10 Posters", price: "₹4,000" },
      { name: "Festival / Offer Poster", price: "₹599" },
    ],
  },
  {
    category: "📄 Pamphlet / Flyer Design",
    services: [
      { name: "Single-side Pamphlet", price: "₹1,500" },
      { name: "Double-side Pamphlet", price: "₹2,500" },
      { name: "With Content Writing", price: "+₹1,000" },
    ],
  },
  {
    category: "📢 Meta Ads Poster",
    services: [
      { name: "Single Ad Creative", price: "₹799" },
      { name: "3 Ad Creatives", price: "₹2,000" },
      { name: "5 Ad Creatives", price: "₹3,000" },
      { name: "With Ad Copy (Text)", price: "+₹1,000" },
    ],
  },
  {
    category: "💼 Business Card Design",
    services: [
      { name: "Single-side", price: "₹999" },
      { name: "Double-side", price: "₹1,499" },
      { name: "QR Code Included", price: "Free" },
      { name: "Print-ready File (CMYK, PDF)", price: "Included" },
    ],
  },
  {
    category: "📘 Catalogue / Brochure Design",
    services: [
      { name: "4 Pages", price: "₹4,000" },
      { name: "8 Pages", price: "₹7,000" },
      { name: "12 Pages", price: "₹10,000" },
      { name: "Additional Page", price: "₹800 / page" },
    ],
  },
  {
    category: "🧾 Other Design Works",
    services: [
      { name: "Logo Refresh / Basic Logo", price: "₹2,500" },
      { name: "Letterhead Design", price: "₹999" },
      { name: "Invoice / Bill Format", price: "₹1,200" },
      { name: "Social Media Profile Banner", price: "₹799" },
    ],
  },
];

const benefits = [
  { icon: "✨", text: "High-quality design" },
  { icon: "🎨", text: "Brand colors & fonts" },
  { icon: "🔄", text: "2 revisions included" },
  { icon: "📂", text: "Print & digital files" },
  { icon: "⚡", text: "Fast delivery (24–72 hrs)" },
];

const clientBenefits = [
  "High-quality, professional design",
  "Brand-aligned colors, fonts & layout",
  "2 free revisions (extra revisions available)",
  "Print-ready & digital formats (PDF, JPG, PNG)",
  "Fast delivery (24–72 hrs)",
  "Ad-friendly creatives (approved size & ratio)",
  "Clear CTA placement (Call, WhatsApp, Enquiry, Buy Now)",
  "Copyright-safe fonts & stock elements",
  "Consistent branding across all creatives",
  "Direct WhatsApp & phone support",
  "Secure file delivery & backup support",
  "Platform-optimized designs (Instagram, Facebook, Ads, Print)",
];

// Generate random positions for scattered layout
const getRandomPosition = (index: number) => {
  const seed = index * 137.5;
  return {
    x: ((seed * 12.9898) % 100) - 25,
    y: ((seed * 78.233) % 80) - 20,
    rotation: ((seed * 23.14) % 30) - 15,
  };
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 animated-gradient-bg pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto w-full flex justify-center">
          {/* Left: Logo & Intro */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center md:items-start space-y-8"
          >
            <motion.img
              src="/logo.jpg"
              alt="CLIC INDIA Creatives Logo"
              className="w-40 h-40 md:w-56 md:h-56 rounded-full glow-effect animate-float"
              whileHover={{ scale: 1.05 }}
            />
            <div className="text-center md:text-left space-y-4">
              <h1 className="text-5xl md:text-6xl font-black gradient-text leading-tight">
                CLIC INDIA
                <br />
                Creatives
              </h1>
              <p className="text-xl text-muted-foreground max-w-md">
                Your partner in stunning digital designs. We create visuals that captivate, 
                engage, and convert.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black gradient-text mb-4">
              Our Design Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From posters to brochures, we deliver professional designs tailored to your brand
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card/50 backdrop-blur border border-border rounded-2xl p-8 hover:border-accent transition-all glow-effect"
              >
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.services.map((service, sidx) => (
                    <div
                      key={sidx}
                      className="flex justify-between items-center pb-3 border-b border-border/50 last:border-0"
                    >
                      <span className="text-muted-foreground">{service.name}</span>
                      <span className="font-bold text-accent">{service.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-3xl border border-primary/30 p-12 md:p-16"
          >
            <h2 className="text-4xl md:text-5xl font-black gradient-text mb-8 text-center">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  className="text-center space-y-3"
                >
                  <div className="text-5xl">{benefit.icon}</div>
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {benefit.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* What Clients Get Section - 4x3 Grid */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black gradient-text mb-4">
              What Clients Get
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need for stunning designs and seamless experience
            </p>
          </motion.div>

          {/* 4x3 Grid Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clientBenefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border border-primary/20 rounded-full px-6 py-8 text-center backdrop-blur-sm hover:border-accent/50 hover:from-primary/20 hover:via-accent/15 hover:to-secondary/20 transition-all h-full flex items-center justify-center">
                  <p className="text-sm font-semibold text-foreground leading-snug">
                    {benefit}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Get in Touch */}
      <footer className="relative border-t border-border bg-card/30 backdrop-blur py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black gradient-text mb-4">
              Get in Touch
            </h2>
            <p className="text-muted-foreground text-lg">
              Let's talk about your goals, challenges, and how we can grow your business online — 
              over a quick chat or coffee.
            </p>
          </motion.div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Address */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-card/50 backdrop-blur border border-border rounded-2xl p-8 glow-effect"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Address</h3>
              </div>
              <p className="text-muted-foreground">
                Thinnappa Nagar, Gandhigramam,
                <br />
                Karur, Tamil Nadu 639004
              </p>
            </motion.div>

            {/* Email */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-card/50 backdrop-blur border border-border rounded-2xl p-8 glow-effect"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Email</h3>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p>hello@clicindia.in</p>
                <p>info.clicindia@gmail.com</p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-card/50 backdrop-blur border border-border rounded-2xl p-8 glow-effect"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-secondary/20 rounded-lg">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Phone</h3>
              </div>
              <p className="text-muted-foreground">
                +91 - 9962135077
              </p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a href="mailto:hello@clicindia.in">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/50 text-foreground px-8"
              >
                <Zap className="w-4 h-4 mr-2" />
                Get Started Today
              </Button>
            </a>
          </motion.div>

          {/* Copyright */}
          <div className="border-t border-border mt-12 pt-8">
            <p className="text-center text-muted-foreground text-sm">
              © 2025 CLIC INDIA Creatives. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
