import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBookmarks } from '@/contexts/BookmarksContext';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { bookmarks } = useBookmarks();
  const { cart } = useCart();

  const navItems = [
    { name: 'Skincare', href: '/category/skincare' },
    { name: 'Makeup', href: '/category/makeup' },
    { name: 'Haircare', href: '/category/haircare' },
    { name: 'Fragrances', href: '/category/fragrances' },
    { name: 'New Arrivals', href: '/new-arrivals' },
  ];

  return (
    <header className="bg-card shadow-soft sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          Free shipping on orders over $50 • 30-day return policy
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-14 h-14 flex items-center justify-center">
              <img src="/img/logo.png" alt="Ntrisha Logo" className="w-14 h-14 object-contain drop-shadow-lg" />
            </div>
            <div>
              <h1 className="font-elegant text-2xl font-bold text-foreground">Ntrisha</h1>
              <p className="text-muted-foreground text-xs">Women's Choice</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8"
            onSubmit={e => {
              e.preventDefault();
              // handle search logic here
            }}
          >
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" variant="secondary">Search</Button>
          </form>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/bookmarks">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="w-5 h-5" />
                {bookmarks.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {bookmarks.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center justify-center mt-4 space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 animate-fade-in">
            {/* Mobile search bar */}
            <form
              className="flex items-center space-x-2"
              onSubmit={e => {
                e.preventDefault();
                // handle search logic here
              }}
            >
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="secondary">Search</Button>
            </form>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;