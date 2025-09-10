import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'skincare',
    name: 'Skincare',
    description: 'Nourish and protect your skin',
    image: 'https://images.unsplash.com/photo-1556229174-5e42a09e9d79?w=400&h=300&fit=crop',
    color: 'from-primary/20 to-primary-glow/10'
  },
  {
    id: 'makeup',
    name: 'Makeup',
    description: 'Express your unique style',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop',
    color: 'from-glamour/20 to-primary/10'
  },
  {
    id: 'haircare',
    name: 'Haircare',
    description: 'Beautiful hair starts here',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop',
    color: 'from-luxury/20 to-glamour/10'
  },
  {
    id: 'fragrances',
    name: 'Fragrances',
    description: 'Captivating scents for every mood',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop',
    color: 'from-accent/30 to-primary/10'
  }
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-elegant text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections designed to enhance your natural beauty
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-lg shadow-soft hover:shadow-glow transition-all duration-500 transform hover:scale-105 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} group-hover:opacity-80 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="font-elegant text-2xl font-bold text-foreground mb-2 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 opacity-90 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {category.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-fit bg-card/80 backdrop-blur-sm hover:bg-card opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Shop Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;