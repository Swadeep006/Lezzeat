import { Button } from "@/components/ui/button";
import { Clock, Star, Truck } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";

interface HeroSectionProps {
  onOrderNowClick: () => void;
}

export const HeroSection = ({ onOrderNowClick }: HeroSectionProps) => {
  return (
    <section className="relative h-[40vh] min-h-[300px] overflow-hidden rounded-xl mx-2 mt-2">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
      
      <div className="relative h-full flex items-center">
        <div className="container">
          <div className="max-w-2xl text-primary-foreground space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Lezzeat
              <br />
              <span className="text-secondary">Break your Hunger</span>
            </h1>
            
            <p className="text-base md:text-lg opacity-90 max-w-md">
              Your favorite college canteen meals, now just a tap away. Fresh, delicious, and ready when you are!
            </p>
            
            <div className="flex flex-wrap gap-4 py-2">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">4.8 Rating</span>
              </div>
            </div>
            
            <div className="pt-2">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={onOrderNowClick}
                className="font-semibold"
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};