import { useParams } from 'react-router-dom';
import FeaturedProducts from '@/components/FeaturedProducts';

const CategoryPage = () => {
  const { category } = useParams();

  // Optionally, filter products by category here if needed
  // For now, just display the category name and all featured products

  return (
    <div className="min-h-screen bg-background">
      <h1 className="text-3xl font-bold text-center mt-8 mb-6 capitalize">
        {category} Products
      </h1>
      {/* You can filter FeaturedProducts by category if you want */}
      <FeaturedProducts category={category} />
    </div>
  );
};

export default CategoryPage;
