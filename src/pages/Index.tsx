import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <CategorySection />
      <FeaturedProducts />
    </div>
  );
};

export default Index;
