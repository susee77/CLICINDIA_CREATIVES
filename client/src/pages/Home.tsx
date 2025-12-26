import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Palette, FileText, Megaphone, 
  CreditCard, BookOpen, PenTool,
  Download, Sparkles, ArrowRight
} from "lucide-react";
import { PricingCard } from "@/components/PricingCard";
import { useDesignIdeas, useCreateDesignIdea, useGenerateImage } from "@/hooks/use-design-ideas";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function Home() {
  const { data: designIdeas } = useDesignIdeas();
  const createIdea = useCreateDesignIdea();
  const generateImage = useGenerateImage();
  const { toast } = useToast();

  const [ideaPrompt, setIdeaPrompt] = useState("");
  const [ideaTitle, setIdeaTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaPrompt) return;
    
    setIsGenerating(true);
    try {
      const result = await generateImage.mutateAsync(ideaPrompt);
      setGeneratedUrl(result.imageUrl);
      toast({ title: "Image Generated!", description: "Now you can save this design idea." });
    } catch (error) {
      toast({ title: "Generation Failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveIdea = () => {
    if (!ideaTitle || !generatedUrl) return;
    
    createIdea.mutate({
      title: ideaTitle,
      description: ideaPrompt,
      category: "Generated",
      generatedImageUrl: generatedUrl
    }, {
      onSuccess: () => {
        toast({ title: "Saved!", description: "Your design idea has been saved to the gallery." });
        setIdeaPrompt("");
        setIdeaTitle("");
        setGeneratedUrl(null);
      }
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px]" />
          <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-accent/20 rounded-full blur-[100px]" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto z-10"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-mono tracking-wider text-accent-foreground">
              PREMIUM DESIGN SERVICES
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black font-display tracking-tighter mb-6 leading-none">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">CLIC INDIA</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x text-glow">
              CREATIVES
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light">
            Elevate your brand with stunning visuals. From posters to social media ads, we craft designs that captivate and convert.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#services" className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 active:scale-95 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              View Services
            </a>
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold text-lg hover:bg-white/10 transition-colors flex items-center gap-2 group">
                  <Sparkles className="w-5 h-5 text-accent group-hover:rotate-12 transition-transform" />
                  Try AI Generator
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl bg-card border-border">
                <div className="space-y-6 py-4">
                  <h2 className="text-3xl font-bold font-display gradient-text">AI Design Studio</h2>
                  <p className="text-muted-foreground">Describe your idea and let our AI visualize it instantly.</p>
                  
                  {!generatedUrl ? (
                    <form onSubmit={handleGenerate} className="space-y-4">
                      <textarea 
                        value={ideaPrompt}
                        onChange={(e) => setIdeaPrompt(e.target.value)}
                        placeholder="A futuristic poster for a tech conference with neon lights..."
                        className="w-full h-32 p-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                      />
                      <button 
                        type="submit" 
                        disabled={isGenerating || !ideaPrompt}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent font-bold text-white shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {isGenerating ? "Dreaming..." : "Generate Concept"}
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="aspect-video w-full rounded-xl overflow-hidden border border-border relative group">
                        <img src={generatedUrl} alt="Generated" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <button onClick={() => setGeneratedUrl(null)} className="text-white underline">Try Again</button>
                        </div>
                      </div>
                      <input 
                        value={ideaTitle}
                        onChange={(e) => setIdeaTitle(e.target.value)}
                        placeholder="Give this design a title..."
                        className="w-full p-4 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none"
                      />
                      <button 
                        onClick={handleSaveIdea}
                        disabled={!ideaTitle}
                        className="w-full py-4 rounded-xl bg-green-500 font-bold text-white shadow-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                      >
                        Save to Gallery
                      </button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>

        {/* Floating 3D Elements (Decorative) */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[10%] w-32 h-32 bg-gradient-to-br from-primary to-purple-800 rounded-3xl opacity-20 blur-sm rotate-12 -z-10 hidden lg:block"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-[10%] w-40 h-40 bg-gradient-to-br from-secondary to-blue-800 rounded-full opacity-20 blur-sm -z-10 hidden lg:block"
        />
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-black/40 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground">Professional design solutions tailored to your needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PricingCard 
              title="Poster Design" 
              icon={<Palette className="w-6 h-6" />}
              color="bg-purple-600"
              items={[
                { name: "Single Poster", price: 499 },
                { name: "Pack of 5", price: 2200 },
                { name: "Pack of 10", price: 4000 },
                { name: "Festival/Offer", price: 599 },
              ]}
            />
            <PricingCard 
              title="Pamphlet / Flyer" 
              icon={<FileText className="w-6 h-6" />}
              color="bg-pink-600"
              items={[
                { name: "Single Side", price: 1500 },
                { name: "Double Side", price: 2500 },
                { name: "With Content Writing", price: 2500 }, // Base + 1000
              ]}
            />
            <PricingCard 
              title="Meta Ads" 
              icon={<Megaphone className="w-6 h-6" />}
              color="bg-blue-600"
              items={[
                { name: "Single Creative", price: 799 },
                { name: "Pack of 3", price: 2000 },
                { name: "Pack of 5", price: 3000 },
                { name: "With Ad Copy", price: 1799 }, // Base + 1000
              ]}
            />
            <PricingCard 
              title="Business Cards" 
              icon={<CreditCard className="w-6 h-6" />}
              color="bg-emerald-600"
              items={[
                { name: "Single Side", price: 999 },
                { name: "Double Side", price: 1499 },
                { name: "QR Code Only", price: 0 },
              ]}
            />
            <PricingCard 
              title="Brochures" 
              icon={<BookOpen className="w-6 h-6" />}
              color="bg-orange-600"
              items={[
                { name: "4 Pages", price: 4000 },
                { name: "8 Pages", price: 7000 },
                { name: "12 Pages", price: 10000 },
                { name: "Extra Page", price: 800 },
              ]}
            />
            <PricingCard 
              title="Branding" 
              icon={<PenTool className="w-6 h-6" />}
              color="bg-indigo-600"
              items={[
                { name: "Logo Design", price: 2500 },
                { name: "Letterhead", price: 999 },
                { name: "Invoice Format", price: 1200 },
                { name: "Social Banner", price: 799 },
              ]}
            />
          </div>
        </div>
      </section>

      {/* --- DESIGN GALLERY (CRUD) --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold font-display mb-2">Design Gallery</h2>
              <p className="text-muted-foreground">Community creations and inspiration</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {designIdeas?.map((idea) => (
               <motion.div 
                 key={idea.id}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="group relative aspect-square rounded-2xl overflow-hidden bg-muted"
               >
                 {idea.generatedImageUrl ? (
                   <img src={idea.generatedImageUrl} alt={idea.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                     No Image
                   </div>
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                   <h4 className="text-white font-bold text-lg">{idea.title}</h4>
                   <p className="text-white/70 text-sm line-clamp-2">{idea.description}</p>
                 </div>
               </motion.div>
             ))}
             
             {/* Add New Placeholder Card */}
             <Dialog>
              <DialogTrigger asChild>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="aspect-square rounded-2xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 flex flex-col items-center justify-center gap-4 transition-all group"
                >
                  <div className="w-16 h-16 rounded-full bg-muted group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                    <Sparkles className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-bold text-muted-foreground group-hover:text-primary transition-colors">Create Your Own</span>
                </motion.button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                {/* Reusing the generator UI logic would be ideal here, simplified for demo */}
                <div className="text-center py-8">
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Use the AI Generator</h3>
                  <p className="text-muted-foreground mb-6">Scroll up to the hero section to use our AI tool!</p>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-6 py-2 bg-primary rounded-lg font-bold">Go to Top</button>
                </div>
              </DialogContent>
             </Dialog>
          </div>
        </div>
      </section>

      {/* --- FOOTER / DOWNLOAD --- */}
      <footer className="border-t border-border/50 bg-black/20 backdrop-blur-lg py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold font-display">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => alert("Downloading Services PDF...")}
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center gap-3 transition-all group"
            >
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              <span>Download Price List (PDF)</span>
            </button>
          </div>
          <p className="text-muted-foreground text-sm">© 2024 CLIC INDIA Creatives. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
