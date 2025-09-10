
import { Link } from 'react-router-dom';
import { useBookmarks } from '@/contexts/BookmarksContext';

const Bookmarks = () => {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bookmarks</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((product) => (
            <div key={product.id} className="bg-card rounded-lg shadow overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-muted-foreground text-sm">{product.brand}</p>
                <p className="text-primary font-bold">${product.price}</p>
                <div className="flex justify-between mt-4">
                  <Link to={`/product/${product.id}`}>
                    <button className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => removeBookmark(product.id)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;

