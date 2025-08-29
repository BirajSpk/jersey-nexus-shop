import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

const CategoryCard = ({ id, name, description, image, productCount }: CategoryCardProps) => {
  return (
    <Link 
      to={`/categories/${id}`}
      className="group relative bg-gradient-card rounded-xl shadow-sm hover:shadow-primary transition-all duration-300 border border-border overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] bg-muted/50 flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Category Image</div>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Arrow Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <ArrowRight className="h-5 w-5 text-gray-700" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        {/* Name */}
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        
        {/* Product Count */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">
            {productCount} Products
          </span>
          <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
            Explore
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Hover Effect Background */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
    </Link>
  );
};

export default CategoryCard;