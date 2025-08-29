import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

const Blog = () => {
  // Mock data - replace with real data from API
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Evolution of Football Jersey Design: From Classic to Modern',
      excerpt: 'Explore how football jersey designs have transformed over the decades, from simple cotton shirts to high-tech performance wear.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Design',
      image: '',
      featured: true
    },
    {
      id: '2',
      title: 'Top 10 Most Iconic Basketball Jerseys of All Time',
      excerpt: 'Discover the basketball jerseys that have left an indelible mark on sports history and continue to influence modern designs.',
      author: 'Mike Chen',
      date: '2024-01-12',
      readTime: '7 min read',
      category: 'History',
      image: ''
    },
    {
      id: '3',
      title: 'How to Choose the Right Jersey Size: A Complete Guide',
      excerpt: 'Learn the ins and outs of jersey sizing across different sports and brands to ensure the perfect fit every time.',
      author: 'Emma Davis',
      date: '2024-01-10',
      readTime: '4 min read',
      category: 'Guide',
      image: ''
    },
    {
      id: '4',
      title: 'The Technology Behind Modern Sports Jerseys',
      excerpt: 'Delve into the advanced materials and technologies that make today\'s sports jerseys more comfortable and performance-oriented.',
      author: 'Alex Rodriguez',
      date: '2024-01-08',
      readTime: '6 min read',
      category: 'Technology',
      image: ''
    },
    {
      id: '5',
      title: 'Cricket Jersey Collecting: Tips for Enthusiasts',
      excerpt: 'Essential advice for cricket jersey collectors, from authentication tips to storage best practices.',
      author: 'Priya Sharma',
      date: '2024-01-05',
      readTime: '5 min read',
      category: 'Collecting',
      image: ''
    },
    {
      id: '6',
      title: 'Sustainability in Sports Apparel: The Future of Jersey Manufacturing',
      excerpt: 'How leading brands are embracing eco-friendly practices in jersey production and what it means for consumers.',
      author: 'David Wilson',
      date: '2024-01-03',
      readTime: '8 min read',
      category: 'Sustainability',
      image: ''
    }
  ];

  const categories = ['All', 'Design', 'History', 'Guide', 'Technology', 'Collecting', 'Sustainability'];
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Jersey Nexus Blog</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends, guides, and stories from the world of sports jerseys
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === 'All' ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground px-4 py-2"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
            <Link to={`/blog/${featuredPost.id}`} className="group">
              <div className="bg-gradient-card rounded-xl overflow-hidden border border-border shadow-elegant hover:shadow-primary transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <div className="aspect-video lg:aspect-square bg-muted/50 flex items-center justify-center">
                    <div className="text-muted-foreground">Featured Image</div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge className="w-fit mb-4">{featuredPost.category}</Badge>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-primary group-hover:translate-x-1 transition-transform">
                        <span className="mr-2">Read More</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group">
                <article className="bg-gradient-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-primary transition-all duration-300">
                  {/* Image */}
                  <div className="aspect-video bg-muted/50 flex items-center justify-center">
                    <div className="text-muted-foreground text-sm">Article Image</div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <Badge variant="outline" className="mb-3">{post.category}</Badge>
                    <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <section className="mt-20 bg-gradient-hero rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Get the latest articles and jersey news delivered straight to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40"
            />
            <button className="px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-white/90 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;