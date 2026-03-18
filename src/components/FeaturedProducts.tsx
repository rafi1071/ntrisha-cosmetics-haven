import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const featuredProducts = [
  {
    id: '1',
    name: 'Radiance Vitamin C Serum',
    brand: 'Glow Beauty',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviewCount: 234,
    image: '/img/Vitamin-C.jpg',
    isNew: true,
    isOnSale: true,
    category: 'skincare'
  },
  {
    id: '2',
    name: 'Luxury Matte Lipstick Set',
    brand: 'Rouge Elegance',
    price: 34.99,
    rating: 4.6,
    reviewCount: 189,
    image: '/img/Night beauty cream.jpg',
    isNew: false,
    category: 'makeup'
  },
  {
    id: '3',
    name: 'Hydrating Night Cream',
    brand: 'Pure Glow',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.9,
    reviewCount: 312,
    image: '/img/Soothing Gel.jpg',
    isOnSale: true,
    category: 'skincare'
  },
  {
    id: '4',
    name: 'Professional Eyeshadow Palette',
    brand: 'Color Dreams',
    price: 59.99,
    rating: 4.7,
    reviewCount: 156,
    image: '/img/KERATIN.jpg',
    category: 'makeup'
  },
  {
    id: '5',
    name: 'Nourishing Hair Mask',
    brand: 'Silk Touch',
    price: 24.99,
    rating: 4.5,
    reviewCount: 98,
    image: '/img/Hair treatment Oil.jpg',
    isNew: true,
    category: 'haircare'
  },
  {
    id: '6',
    name: 'Signature Perfume Collection',
    brand: 'Essence',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.8,
    reviewCount: 267,
    image: '/img/Body Boster.jpg',
    isOnSale: true,
    category: 'fragrances'
  }
];


type FeaturedProductsProps = {
  category?: string;
  onlyNew?: boolean;
  title?: string;
  subtitle?: string;
};

const FeaturedProducts = ({
  category,
  onlyNew,
  title = "Featured Products",
  subtitle = "Discover our most loved beauty essentials",
}: FeaturedProductsProps) => {
  let filteredProducts = category
    ? featuredProducts.filter((product) => product.category === category)
    : featuredProducts;

  if (onlyNew) {
    filteredProducts = filteredProducts.filter((product) => product.isNew);
  }
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-elegant text-4xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {subtitle}
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            View All Products
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg" className="md:hidden">
            View All Products
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
