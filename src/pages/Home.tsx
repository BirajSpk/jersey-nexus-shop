import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { TrendingUp, Award, Users, Zap } from 'lucide-react';

const Home = () => {
  // Mock data - replace with real data from API
  const trendingProducts = [
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
    },
    {
      id: '4',
      name: 'Barcelona Away Jersey',
      price: 9000,
      image: '',
      category: 'Football',
      rating: 4.8,
      isNew: true,
      isSale: false
    }
  ];

  const categories = [
    {
      id: 'football',
      name: 'Football',
      description: 'Premier League, La Liga, Serie A, and more',
      image: '',
      productCount: 150
    },
    {
      id: 'basketball',
      name: 'Basketball',
      description: 'NBA, college teams, and international leagues',
      image: '',
      productCount: 85
    },
    {
      id: 'cricket',
      name: 'Cricket',
      description: 'International teams and IPL franchises',
      image: '',
      productCount: 120
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Authentic Quality</h3>
              <p className="text-muted-foreground text-sm">
                Official licensed jerseys with premium materials
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm">
                Express shipping worldwide with tracking
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Community</h3>
              <p className="text-muted-foreground text-sm">
                Join 10K+ satisfied sports fans
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Latest Trends</h3>
              <p className="text-muted-foreground text-sm">
                Stay updated with newest jersey releases
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Jerseys</h2>
              <p className="text-muted-foreground">
                Most popular jerseys this season
              </p>
            </div>
            <Link to="/categories">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover jerseys from your favorite sports and teams
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6 text-white">
            <h2 className="text-3xl font-bold">Stay Updated</h2>
            <p className="text-white/80">
              Get notified about new jersey releases, exclusive deals, and sports news
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40"
              />
              <Button className="bg-white text-primary hover:bg-white/90 px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;