import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const posterImages = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&q=60",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=600&fit=crop&q=60",
  "https://images.unsplash.com/photo-1628291842900-82c48b4d3e4e?w=400&h=600&fit=crop&q=60",
  "https://images.unsplash.com/photo-1561471980-7f3fbb67899d?w=400&h=600&fit=crop&q=60",
  "https://images.unsplash.com/photo-1557672172-298e090d0f80?w=400&h=600&fit=crop&q=60",
  "https://images.unsplash.com/photo-1607626814075-e51df1bdc82f?w=400&h=600&fit=crop&q=60",
];

const clientBenefits = [
  { icon: "✨", title: "High-quality, professional design", desc: "Premium visuals that elevate your brand" },
  { icon: "🎨", title: "Brand-aligned colors, fonts & layout", desc: "Perfectly tailored to your brand identity" },
  { icon: "🔄", title: "2 free revisions (extra revisions available)", desc: "Unlimited refinements to get it perfect" },
  { icon: "📂", title: "Print-ready & digital formats (PDF, JPG, PNG)", desc: "Ready for any medium or platform" },
  { icon: "⚡", title: "Fast delivery (24–72 hrs)", desc: "Quick turnaround without compromising quality" },
  { icon: "💬", title: "Direct WhatsApp & phone support", desc: "Always available when you need us" },
  { icon: "🔒", title: "Secure file delivery & backup support", desc: "Your files are safe and always accessible" },
];

// Carousel Component
function ImageCarousel() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
  };

  const handleNext = () => {
    setDisplayIdx((prev) => (prev + 1) % posterImages.length);
  };

  const handlePrev = () => {
    setDisplayIdx((prev) => (prev - 1 + posterImages.length) % posterImages.length);
  };

  // Roller carousel - show 5 images at a time in header
  const getVisibleImages = () => {
    const visible = [];
    for (let i = 0; i < 5; i++) {
      visible.push((displayIdx + i) % posterImages.length);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Fixed Header with Roller Carousel */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 right-0 left-0 z-50 bg-gradient-to-b from-background via-background/80 to-transparent pt-6 pb-12 px-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-black gradient-text">Our Work</h2>

          {/* Roller Carousel - Right Side */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Roller Strip - Shows 5 images */}
            <div className="flex gap-2 overflow-hidden">
              {getVisibleImages().map((idx) => (
                <motion.img
                  key={idx}
                  src={posterImages[idx]}
                  alt={`Poster ${idx}`}
                  className="w-16 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-accent transition-all"
                  animate={{
                    x: (idx - displayIdx) * 80,
                    opacity: idx === displayIdx ? 1 : 0.6,
                  }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 1)" }}
                  onClick={() => setSelectedIdx(idx)}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Circular Carousel Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-40 pb-20">
        <div className="max-w-6xl w-full">
          {/* Center Display - Large Selected Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-20"
          >
            <motion.div
              key={selectedIdx}
              layoutId="selected-image"
              className="relative w-80 h-96 rounded-2xl overflow-hidden glow-effect shadow-2xl"
            >
              <motion.img
                src={posterImages[selectedIdx]}
                alt={`Selected Poster ${selectedIdx}`}
                className="w-full h-full object-cover"
                layoutId={`poster-${selectedIdx}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Circular Animation - Images Around Center */}
          <div className="relative w-full h-80 flex items-center justify-center">
            {posterImages.map((img, idx) => {
              const angle = (idx / posterImages.length) * Math.PI * 2;
              const radius = 150;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              const isSelected = idx === selectedIdx;

              return (
                <motion.div
                  key={idx}
                  className="absolute"
                  animate={{
                    x,
                    y,
                    scale: isSelected ? 1.2 : 0.8,
                    opacity: isSelected ? 1 : 0.6,
                    zIndex: isSelected ? 10 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  <motion.button
                    onClick={() => handleSelect(idx)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-24 h-32 rounded-xl overflow-hidden cursor-pointer transition-all border-2 ${
                      isSelected ? "border-accent shadow-xl glow-effect" : "border-border/50"
                    }`}
                  >
                    <motion.img
                      src={img}
                      alt={`Poster ${idx}`}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: isSelected ? 1 : 1.2 }}
                      transition={{ duration: 0.3 }}
                    />
                    {isSelected && (
                      <motion.div
                        layoutId="selected-indicator"
                        className="absolute inset-0 bg-accent/20 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-16">
            {posterImages.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === selectedIdx ? "bg-accent w-8" : "bg-muted"
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What Clients Get Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black gradient-text mb-6">
              What Clients Get
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive design solutions with professional support and quality assurance
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientBenefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-card/60 backdrop-blur border border-border rounded-2xl p-8 hover:border-accent transition-all glow-effect"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{benefit.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-primary/30 via-accent/20 to-secondary/30 rounded-3xl border border-primary/50 p-12 text-center"
          >
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Brand?
            </h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Get started today with CLIC INDIA Creatives and see your vision come to life.
              Contact us via WhatsApp, email, or phone for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <a
                href="https://wa.me/919962135077"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-colors"
              >
                WhatsApp Us
              </a>
              <a
                href="mailto:hello@clicindia.in"
                className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/80 text-foreground font-bold transition-colors"
              >
                Email Us
              </a>
              <a
                href="tel:+919962135077"
                className="px-8 py-4 rounded-xl border-2 border-accent text-accent hover:bg-accent/10 font-bold transition-colors"
              >
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground mb-2">
            © 2025 CLIC INDIA Creatives. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground/70">
            📍 Thinnappa Nagar, Gandhigramam, Karur, Tamil Nadu 639004
          </p>
          <p className="text-sm text-muted-foreground/70 mt-2">
            📧 hello@clicindia.in | info.clicindia@gmail.com | 📱 +91 - 9962135077
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ImageCarousel;
