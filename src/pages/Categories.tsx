import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, Grid, List } from 'lucide-react';

const Categories = () => {
  const { categoryId } = useParams();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with real data from API
  const allProducts = [
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
      name: 'Manchester City Away Jersey',
      price: 9000,
      image: '',
      category: 'Football',
      rating: 4.7,
      isNew: false,
      isSale: false
    },
    {
      id: '3',
      name: 'Lakers Championship Jersey',
      price: 7500,
      image: '',
      category: 'Basketball',
      rating: 4.9,
      isNew: false,
      isSale: false
    },
    {
      id: '4',
      name: 'Warriors Home Jersey',
      price: 8000,
      originalPrice: 9500,
      image: '',
      category: 'Basketball',
      rating: 4.6,
      isNew: false,
      isSale: true
    },
    {
      id: '5',
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
      id: '6',
      name: 'Australia Cricket Jersey',
      price: 7000,
      image: '',
      category: 'Cricket',
      rating: 4.5,
      isNew: true,
      isSale: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: allProducts.length },
    { id: 'football', name: 'Football', count: 2 },
    { id: 'basketball', name: 'Basketball', count: 2 },
    { id: 'cricket', name: 'Cricket', count: 2 }
  ];

  const brands = [
    { id: 'nike', name: 'Nike', count: 15 },
    { id: 'adidas', name: 'Adidas', count: 12 },
    { id: 'puma', name: 'Puma', count: 8 },
    { id: 'umbro', name: 'Umbro', count: 5 }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Filter products based on category
  const filteredProducts = categoryId && categoryId !== 'all' 
    ? allProducts.filter(product => product.category.toLowerCase() === categoryId)
    : allProducts;

  const currentCategory = categories.find(cat => cat.id === categoryId) || categories[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{currentCategory.name}</h1>
            <p className="text-white/80 text-lg">
              {currentCategory.count} products available
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Categories */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox />
                      <span className="text-sm">{category.name}</span>
                    </label>
                    <span className="text-xs text-muted-foreground">({category.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold mb-4">Price Range</h3>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={20000}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Rs. {priceRange[0].toLocaleString()}</span>
                  <span>Rs. {priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold mb-4">Brands</h3>
              <div className="space-y-3">
                {brands.map(brand => (
                  <div key={brand.id} className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox />
                      <span className="text-sm">{brand.name}</span>
                    </label>
                    <span className="text-xs text-muted-foreground">({brand.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold mb-4">Sizes</h3>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map(size => (
                  <Button key={size} variant="outline" size="sm" className="h-8">
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-muted-foreground">
                  Showing {filteredProducts.length} products
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Select defaultValue="popular">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-border rounded-lg">
                  <Button
                    variant={viewType === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewType('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewType === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewType('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewType === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;