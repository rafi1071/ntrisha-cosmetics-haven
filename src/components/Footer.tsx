import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'Skincare', href: '/category/skincare' },
        { name: 'Makeup', href: '/category/makeup' },
        { name: 'Haircare', href: '/category/haircare' },
        { name: 'Fragrances', href: '/category/fragrances' },
        { name: 'New Arrivals', href: '/new-arrivals' }
      ]
    },
    {
      title: 'Customer Care',
      links: [
        { name: 'Contact Us', href: '/contact' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' }
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="bg-gradient-luxury py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-elegant text-3xl font-bold text-luxury-foreground mb-4">
            Join Our Beauty Community
          </h3>
          <p className="text-luxury-foreground/90 mb-8 max-w-2xl mx-auto">
            Get exclusive access to new products, beauty tips, and special offers. 
            Be the first to know about our latest collections.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-luxury-foreground text-luxury border-none"
            />
            <Button variant="secondary" className="bg-luxury-foreground text-luxury hover:bg-luxury-foreground/90">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">N</span>
              </div>
              <div>
                <h1 className="font-elegant text-2xl font-bold text-background">Ntrisha</h1>
                <p className="text-background/70 text-sm">Women's Choice</p>
              </div>
            </Link>
            
            <p className="text-background/80 mb-6 max-w-md">
              Empowering women through premium cosmetics and beauty products. 
              Discover your unique style with our curated collection of luxury beauty essentials.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-background/80">info@nirjontrishacollection.xyz</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-background/80">+880 1677-622558</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-background/80">123 Beauty Avenue, NYC 10001</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-background text-lg mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-background/70 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                to={social.href}
                className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300 group"
              >
                <social.icon className="w-5 h-5 text-background group-hover:text-primary-foreground" />
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-background/70 text-sm">
            <span>© 2024 Ntrisha Women's Choice. All rights reserved.</span>
            <div className="flex space-x-4">
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
