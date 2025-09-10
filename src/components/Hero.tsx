import { Button } from '@/components/ui/button';
import { Sparkles, Star } from 'lucide-react';
import heroImage from '@/assets/hero-cosmetics.jpg';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[70vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Premium cosmetics collection"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/10"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 mb-4 animate-fade-in">
            <Sparkles className="w-6 h-6 text-primary-glow" />
            <span className="text-primary font-medium">New Collection 2024</span>
          </div>
          
          <h1 className="font-elegant text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
            Embrace Your
            <span className="text-white block">Natural Beauty</span>
          </h1>
          
          <p className="text-xl text-black mb-8 max-w-2xl animate-fade-in">
            Discover premium cosmetics designed for the modern woman. From skincare essentials to glamorous makeup, find everything you need to feel confident and beautiful.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in">
            <Button variant="hero" size="lg" className="font-medium border-2 border-black shadow-[4px_4px_0_#222]">
              Shop Collection
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="flex items-center space-x-3 bg-card/80 backdrop-blur-sm rounded-lg p-4 shadow-soft">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">Luxury cosmetics for every occasion</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-card/80 backdrop-blur-sm rounded-lg p-4 shadow-soft">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Natural Ingredients</h3>
                <p className="text-sm text-muted-foreground">Gentle formulas for all skin types</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-card/80 backdrop-blur-sm rounded-lg p-4 shadow-soft">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Expert Tested</h3>
                <p className="text-sm text-muted-foreground">Dermatologist approved products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-primary/10 rounded-full animate-glow hidden lg:block"></div>
      <div className="absolute bottom-32 right-32 w-16 h-16 bg-glamour/20 rounded-full animate-glow hidden lg:block"></div>
    </section>
  );
};

export default Hero;