import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, User, Clock, ArrowLeft, Share2, Heart, Eye } from 'lucide-react';

const BlogDetail = () => {
  const { blogId } = useParams();

  // Mock data - replace with real data from API
  const blogPost = {
    id: blogId,
    title: 'The Evolution of Football Jersey Design: From Classic to Modern',
    content: `
      <p>Football jerseys have undergone a remarkable transformation over the decades, evolving from simple cotton shirts to sophisticated pieces of sporting technology. This evolution reflects not only advances in textile science but also changes in sporting culture, marketing strategies, and fan expectations.</p>

      <h2>The Early Days: Function Over Form</h2>
      <p>In the early 20th century, football jerseys were primarily functional. Made from heavy cotton, these shirts were designed to be durable rather than comfortable. The colors were simple, often just the team's primary color with minimal design elements. The focus was purely on identification and durability during matches.</p>

      <h2>The Commercial Revolution</h2>
      <p>The 1970s and 1980s marked a turning point in jersey design. As football became increasingly commercialized, teams began to see jerseys as more than just uniforms. They became a source of revenue through merchandise sales. This period saw the introduction of more complex designs, sponsor logos, and the beginning of regular jersey updates.</p>

      <h2>Technology Takes Center Stage</h2>
      <p>The 1990s brought significant technological advances. Synthetic materials replaced cotton, offering better moisture management and lighter weight. Features like mesh panels for ventilation and tailored fits for improved aerodynamics became standard. Brands like Nike, Adidas, and Puma began investing heavily in research and development.</p>

      <h2>The Modern Era: Performance Meets Style</h2>
      <p>Today's football jerseys are marvels of engineering. They feature:</p>
      <ul>
        <li>Advanced moisture-wicking fabrics</li>
        <li>Seamless construction to reduce chafing</li>
        <li>Compression zones for muscle support</li>
        <li>Antimicrobial treatments</li>
        <li>Recycled materials for sustainability</li>
      </ul>

      <h2>Design Philosophy</h2>
      <p>Modern jersey design balances several competing demands: tradition, innovation, commercial appeal, and performance. Clubs must honor their heritage while appealing to global markets and incorporating the latest technology.</p>

      <h2>The Future of Jersey Design</h2>
      <p>Looking ahead, we can expect to see even more innovation. Smart fabrics that can monitor player performance, adaptive materials that respond to temperature changes, and fully sustainable production methods are all on the horizon.</p>

      <p>The evolution of football jersey design tells the story of the sport itself - from humble beginnings to a global phenomenon that combines athletic performance with cultural significance and commercial success.</p>
    `,
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Design',
    image: '',
    views: 1234,
    likes: 89,
    tags: ['Football', 'Design', 'History', 'Technology']
  };

  const relatedPosts = [
    {
      id: '2',
      title: 'Top 10 Most Iconic Basketball Jerseys of All Time',
      excerpt: 'Discover the basketball jerseys that have left an indelible mark on sports history.',
      category: 'History'
    },
    {
      id: '3',
      title: 'How to Choose the Right Jersey Size: A Complete Guide',
      excerpt: 'Learn the ins and outs of jersey sizing across different sports and brands.',
      category: 'Guide'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/blog">
          <Button variant="outline" className="mb-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Header */}
            <div className="mb-8">
              <Badge className="mb-4">{blogPost.category}</Badge>
              <h1 className="text-4xl font-bold mb-6 leading-tight">{blogPost.title}</h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(blogPost.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{blogPost.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>{blogPost.views.toLocaleString()} views</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  {blogPost.likes}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video bg-muted/50 rounded-lg mb-8 flex items-center justify-center">
              <div className="text-muted-foreground">Featured Image</div>
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {blogPost.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{blogPost.author}</h3>
                  <p className="text-muted-foreground">
                    Sports journalist and jersey enthusiast with over 10 years of experience covering 
                    the intersection of sports, fashion, and technology.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Related Posts */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="block group">
                      <article className="space-y-2">
                        <Badge variant="outline" className="text-xs">{post.category}</Badge>
                        <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-hero rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                <p className="text-white/80 text-sm mb-4">
                  Get the latest articles delivered to your inbox
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40"
                  />
                  <Button className="w-full bg-white text-primary hover:bg-white/90">
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['Football', 'Basketball', 'Design', 'History', 'Technology', 'Collecting', 'Guide'].map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;