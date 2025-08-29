import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';

const Wishlist = () => {
  // Mock data - replace with real data from API/context
  const [wishlistItems] = useState([
    {
      id: '1',
      name: 'Manchester United Home Jersey 2024',
      price: 8500,
      originalPrice: 10000,
      image: '',
      category: 'Football',
      rating: 4.8,
      isNew: true,
      isSale: true
    },
    {
      id: '2',
      name: 'Lakers Championship Jersey',
      price: 7500,
      image: '',
      category: 'Basketball',
      rating: 4.9,
      isNew: false,
      isSale: false
    },
    {
      id: '3',
      name: 'Team India Cricket Jersey',
      price: 6500,
      originalPrice: 8000,
      image: '',
      category: 'Cricket',
      rating: 4.7,
      isNew: false,
      isSale: true
    }
  ]);

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
              <p className="text-muted-foreground">Save items you love to your wishlist and shop them later.</p>
            </div>
            <Link to="/categories">
              <Button className="bg-gradient-primary text-white shadow-primary">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <Link to="/categories">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>

        {/* Actions */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-primary text-white shadow-primary">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add All to Cart
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Clear Wishlist
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Share your wishlist with friends and family
          </p>
        </div>

        {/* Related Recommendations */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mock recommended products */}
            {[
              {
                id: '4',
                name: 'Barcelona Away Jersey',
                price: 9000,
                image: '',
                category: 'Football',
                rating: 4.8,
                isNew: true,
                isSale: false
              },
              {
                id: '5',
                name: 'Warriors Home Jersey',
                price: 8000,
                originalPrice: 9500,
                image: '',
                category: 'Basketball',
                rating: 4.6,
                isNew: false,
                isSale: true
              }
            ].map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;