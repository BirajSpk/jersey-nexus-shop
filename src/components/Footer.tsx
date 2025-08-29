import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JN</span>
              </div>
              <span className="text-xl font-bold">JerseyNexus</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Your ultimate destination for premium sports jerseys. Quality, authenticity, and style in every piece.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-white/80 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-white/80 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 hover:text-white/80 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-primary-foreground/80 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/categories" className="block text-primary-foreground/80 hover:text-white transition-colors">
                Categories
              </Link>
              <Link to="/blog" className="block text-primary-foreground/80 hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="/cart" className="block text-primary-foreground/80 hover:text-white transition-colors">
                Cart
              </Link>
              <Link to="/wishlist" className="block text-primary-foreground/80 hover:text-white transition-colors">
                Wishlist
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="space-y-2">
              <Link to="/categories/football" className="block text-primary-foreground/80 hover:text-white transition-colors">
                Football
              </Link>
              <Link to="/categories/basketball" className="block text-primary-foreground/80 hover:text-white transition-colors">
                Basketball
              </Link>
              <Link to="/categories/cricket" className="block text-primary-foreground/80 hover:text-white transition-colors">
                Cricket
              </Link>
              <Link to="/categories/soccer" className="block text-primary-foreground/80 hover:text-white transition-colors">
                Soccer
              </Link>
              <Link to="/categories/baseball" className="block text-primary-foreground/80 hover:text-white transition-colors">
                Baseball
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span className="text-primary-foreground/80 text-sm">info@jerseynexus.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span className="text-primary-foreground/80 text-sm">+977 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span className="text-primary-foreground/80 text-sm">Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80 text-sm">
            © 2024 JerseyNexus. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;