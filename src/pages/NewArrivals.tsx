import FeaturedProducts from "@/components/FeaturedProducts";

const NewArrivals = () => {
  return (
    <div className="min-h-screen bg-background">
      <FeaturedProducts
        onlyNew
        title="New Arrivals"
        subtitle="Fresh drops selected just for you"
      />
    </div>
  );
};

export default NewArrivals;
