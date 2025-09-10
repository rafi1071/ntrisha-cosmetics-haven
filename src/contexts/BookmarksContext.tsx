import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  isNew?: boolean;
  isOnSale?: boolean;
  category: string;
}

interface BookmarksContextType {
  bookmarks: Product[];
  addBookmark: (product: Product) => void;
  removeBookmark: (productId: string) => void;
  isBookmarked: (productId: string) => boolean;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};

interface BookmarksProviderProps {
  children: ReactNode;
}

export const BookmarksProvider: React.FC<BookmarksProviderProps> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Product[]>([]);

  const addBookmark = (product: Product) => {
    setBookmarks(prev => {
      const isAlreadyBookmarked = prev.some(item => item.id === product.id);
      if (isAlreadyBookmarked) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeBookmark = (productId: string) => {
    setBookmarks(prev => prev.filter(item => item.id !== productId));
  };

  const isBookmarked = (productId: string) => {
    return bookmarks.some(item => item.id === productId);
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
};
