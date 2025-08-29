import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Share2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data with different products based on ID
  const getProductData = (id: string) => {
    const products: Record<string, any> = {
      '1': {
        id: '1',
        name: 'Manchester United Home Jersey 2024',
        price: 8500,
        originalPrice: 10000,
        category: 'Football',
        brand: 'Adidas',
        rating: 4.8,
        reviews: 124,
        availability: 'In Stock',
        sku: 'MU-HOME-2024',
        description: 'The official Manchester United home jersey for the 2024 season. Features advanced moisture-wicking technology and the iconic red design that represents the Theatre of Dreams.',
        features: [
          'Official licensed product',
          'Advanced moisture-wicking fabric',
          'Comfortable regular fit',
          'Machine washable',
          'Embroidered club badge'
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        images: ['', '', '', ''],
        specifications: {
          'Material': '100% Polyester',
          'Fit': 'Regular',
          'Care': 'Machine wash cold',
          'Origin': 'Made in Thailand',
          'Season': '2024/25'
        }
      },
      '2': {
        id: '2',
        name: 'Manchester United Away Jersey 2024',
        price: 8500,
        category: 'Football',
        brand: 'Adidas',
        rating: 4.7,
        reviews: 98,
        availability: 'In Stock',
        sku: 'MU-AWAY-2024',
        description: 'The official Manchester United away jersey for the 2024 season. Featuring a sleek black design with subtle red accents.',
        features: [
          'Official licensed product',
          'Advanced moisture-wicking fabric',
          'Athletic fit',
          'Machine washable',
          'Heat-pressed club badge'
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        images: ['', '', '', ''],
        specifications: {
          'Material': '100% Polyester',
          'Fit': 'Athletic',
          'Care': 'Machine wash cold',
          'Origin': 'Made in Thailand',
          'Season': '2024/25'
        }
      },
      '3': {
        id: '3',
        name: 'Manchester City Home Jersey 2024',
        price: 9000,
        category: 'Football',
        brand: 'Puma',
        rating: 4.8,
        reviews: 156,
        availability: 'In Stock',
        sku: 'MC-HOME-2024',
        description: 'The official Manchester City home jersey featuring the classic sky blue color and modern design elements.',
        features: [
          'Official licensed product',
          'PUMA dryCELL technology',
          'Slim fit design',
          'Machine washable',
          'Woven club crest'
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        images: ['', '', '', ''],
        specifications: {
          'Material': '100% Recycled Polyester',
          'Fit': 'Slim',
          'Care': 'Machine wash cold',
          'Origin': 'Made in Vietnam',
          'Season': '2024/25'
        }
      },
      '4': {
        id: '4',
        name: 'Liverpool Home Jersey 2024',
        price: 8000,
        originalPrice: 9500,
        category: 'Football',
        brand: 'Nike',
        rating: 4.9,
        reviews: 203,
        availability: 'In Stock',
        sku: 'LIV-HOME-2024',
        description: 'The iconic Liverpool home jersey in classic red. Features Nike Dri-FIT technology for optimal performance.',
        features: [
          'Official licensed product',
          'Nike Dri-FIT technology',
          'Stadium fit',
          'Machine washable',
          'Embroidered club crest'
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        images: ['', '', '', ''],
        specifications: {
          'Material': '100% Polyester',
          'Fit': 'Stadium',
          'Care': 'Machine wash cold',
          'Origin': 'Made in Thailand',
          'Season': '2024/25'
        }
      }
    };
    
    return products[id] || products['1']; // Default to product 1 if ID not found
  };

  const product = getProductData(productId || '1');

  const relatedProducts = [
    {
      id: '2',
      name: 'Manchester United Away Jersey',
      price: 8500,
      image: '',
      category: 'Football',
      rating: 4.7,
      isNew: false,
      isSale: false
    },
    {
      id: '3',
      name: 'Manchester City Home Jersey',
      price: 9000,
      image: '',
      category: 'Football',
      rating: 4.8,
      isNew: true,
      isSale: false
    },
    {
      id: '4',
      name: 'Liverpool Home Jersey',
      price: 8000,
      originalPrice: 9500,
      image: '',
      category: 'Football',
      rating: 4.9,
      isNew: false,
      isSale: true
    }
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: quantity,
      image: '' // Add image URL when available
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} (${selectedSize}) has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before proceeding to checkout.",
        variant: "destructive",
      });
      return;
    }
    
    // Add to cart first
    handleAddToCart();
    // Then navigate to checkout
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8">
          <span>Home</span> / <span>Categories</span> / <span>{product.category}</span> / <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-muted-foreground">Product Image</div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((_, index) => (
                <div key={index} className="aspect-square bg-muted/30 rounded-lg border-2 border-transparent hover:border-primary cursor-pointer flex items-center justify-center">
                  <div className="text-xs text-muted-foreground">Image {index + 1}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge className="bg-green-100 text-green-800 border-green-200">{product.availability}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">SKU: {product.sku}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-foreground">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.originalPrice && (
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    className="h-12"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Total: Rs. {(product.price * quantity).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  className="flex-1 bg-gradient-primary text-white shadow-primary h-12"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Authentic Product</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span className="text-sm">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold mb-4">Product Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold mb-4">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold mb-4">Customer Reviews</h3>
              <p className="text-muted-foreground">Reviews coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;