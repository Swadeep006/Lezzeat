import { X, User, Clock, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface MobileMenuProps {
  onProfileClick: () => void;
  onOrderHistoryClick: () => void;
  onSettingsClick: () => void;
  onHelpClick: () => void;
  children: React.ReactNode;
}

export const MobileMenu = ({ 
  onProfileClick, 
  onOrderHistoryClick, 
  onSettingsClick, 
  onHelpClick,
  children 
}: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">LZ</span>
              </div>
              <span className="bg-gradient-primary bg-clip-text text-transparent">Lezzeat</span>
            </div>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col gap-2 mt-8">
          <Button 
            variant="ghost" 
            className="justify-start gap-3 h-12 text-base"
            onClick={onProfileClick}
          >
            <User className="h-5 w-5" />
            Profile
          </Button>
          
          <Button 
            variant="ghost" 
            className="justify-start gap-3 h-12 text-base"
            onClick={onOrderHistoryClick}
          >
            <Clock className="h-5 w-5" />
            Order History
          </Button>
          
          <Button 
            variant="ghost" 
            className="justify-start gap-3 h-12 text-base"
            onClick={onSettingsClick}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Button>
          
          <Button 
            variant="ghost" 
            className="justify-start gap-3 h-12 text-base"
            onClick={onHelpClick}
          >
            <HelpCircle className="h-5 w-5" />
            Help & Support
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};