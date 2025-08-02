import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  available: boolean;
  rating?: number;
}

interface FoodCardProps {
  item: FoodItem;
  quantity?: number;
  onAddToCart: (item: FoodItem) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
}

export const FoodCard = ({ 
  item, 
  quantity = 0, 
  onAddToCart, 
  onUpdateQuantity 
}: FoodCardProps) => {
  return (
    <Card className="overflow-hidden shadow-food-card hover:shadow-elevated transition-all duration-300 hover:scale-[1.02] group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-food" />
        
        {!item.available && (
          <div className="absolute inset-0 bg-muted/80 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">
              Out of Stock
            </Badge>
          </div>
        )}
        
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge 
            variant={item.isVeg ? "success" : "destructive"} 
            className="text-xs"
          >
            {item.isVeg ? "VEG" : "NON-VEG"}
          </Badge>
          {item.rating && (
            <Badge variant="secondary" className="text-xs">
              ⭐ {item.rating}
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
              {item.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              ₹{item.price}
            </span>
            
            {quantity === 0 ? (
              <Button 
                variant="food" 
                size="sm"
                onClick={() => onAddToCart(item)}
                disabled={!item.available}
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="font-semibold min-w-[20px] text-center">
                  {quantity}
                </span>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};