import { ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  cartItemCount?: number;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  onProfileClick?: () => void;
  onOrderHistoryClick?: () => void;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
}

export const Header = ({ 
  cartItemCount = 0, 
  onCartClick, 
  onMenuClick,
  onProfileClick,
  onOrderHistoryClick = () => {},
  onSettingsClick = () => {},
  onHelpClick = () => {}
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <MobileMenu 
            onProfileClick={onProfileClick || (() => {})}
            onOrderHistoryClick={onOrderHistoryClick}
            onSettingsClick={onSettingsClick}
            onHelpClick={onHelpClick}
          >
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </MobileMenu>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LZ</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Lezzeat
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onCartClick}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartItemCount}
              </span>
            )}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={onProfileClick}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};