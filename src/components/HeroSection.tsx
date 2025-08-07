import { Button } from "@/components/ui/button";
import { Clock, Star, Truck } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";

interface HeroSectionProps {
  onOrderNowClick: () => void;
}

export const HeroSection = ({ onOrderNowClick }: HeroSectionProps) => {
  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden rounded-2xl mx-4 mt-4">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
      
      <div className="relative h-full flex items-center">
        <div className="container">
          <div className="max-w-2xl text-primary-foreground space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Lezzeat
              <br />
              <span className="text-secondary">Break your Hunger</span>
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 max-w-md">
              Your favorite college canteen meals, now just a tap away. Fresh, delicious, and ready when you are!
            </p>
            
            <div className="flex flex-wrap gap-6 py-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">Quick Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm font-medium">4.8 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <span className="text-sm font-medium">Fast Pickup</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="secondary" 
                size="xl"
                onClick={onOrderNowClick}
                className="font-semibold"
              >
                Order Now
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="bg-background/10 backdrop-blur border-primary-foreground/30 text-primary-foreground hover:bg-background/20"
              >
                View Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};