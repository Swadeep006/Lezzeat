import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FoodCard, FoodItem } from "@/components/FoodCard";
import { CategoryTabs } from "@/components/CategoryTabs";
import { useToast } from "@/hooks/use-toast";
import Profile from "./Profile";
import Cart from "./Cart";
import OrderHistory from "./OrderHistory";
import Settings from "./Settings";
import Help from "./Help";
import Registration from "./Registration";
import { allFoodItems, categories, todaysSpecials } from "@/data/foodData";

const Index = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState('home');
  const [isRegistered, setIsRegistered] = useState(true); // Change to false for registration flow
  const [activeCategory, setActiveCategory] = useState('all');
  const { toast } = useToast();

  const cartItemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  const handleAddToCart = (item: FoodItem) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
    // No popup/toast for add action as per requirement
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => {
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      });
    } else {
      setCart(prev => ({
        ...prev,
        [itemId]: quantity
      }));
    }
  };

  const handleOrderNow = () => {
    document.getElementById('specials')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCartClick = () => {
    setCurrentPage('cart');
  };

  const handleProfileClick = () => {
    setCurrentPage('profile');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleOrderHistoryClick = () => {
    setCurrentPage('orderHistory');
  };

  const handleSettingsClick = () => {
    setCurrentPage('settings');
  };

  const handleHelpClick = () => {
    setCurrentPage('help');
  };

  const handleRegistrationComplete = (userData: any) => {
    setIsRegistered(true);
    // Here you would typically save user data
  };

  const filteredItems = activeCategory === 'all' 
    ? allFoodItems 
    : allFoodItems.filter(item => item.category === activeCategory);

  if (!isRegistered) {
    return <Registration onRegistrationComplete={handleRegistrationComplete} />;
  }

  if (currentPage === 'profile') {
    return <Profile onBack={handleBackToHome} />;
  }

  if (currentPage === 'cart') {
    return (
      <Cart 
        onBack={handleBackToHome} 
        cart={cart} 
        onUpdateQuantity={handleUpdateQuantity}
        foodItems={allFoodItems}
      />
    );
  }

  if (currentPage === 'orderHistory') {
    return <OrderHistory onBack={handleBackToHome} />;
  }

  if (currentPage === 'settings') {
    return <Settings onBack={handleBackToHome} />;
  }

  if (currentPage === 'help') {
    return <Help onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={cartItemCount}
        onCartClick={handleCartClick}
        onMenuClick={() => {}}
        onProfileClick={handleProfileClick}
        onOrderHistoryClick={handleOrderHistoryClick}
        onSettingsClick={handleSettingsClick}
        onHelpClick={handleHelpClick}
      />
      
      <main>
        <HeroSection onOrderNowClick={handleOrderNow} />
        
        <section id="specials" className="py-4">
          <div className="container space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Today's Specials</h2>
              <p className="text-muted-foreground text-sm">
                Fresh, handpicked meals prepared just for you today
              </p>
            </div>
            
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-4 w-max">
                {todaysSpecials.map(item => (
                  <div key={item.id} className="w-64 flex-shrink-0">
                    <FoodCard
                      item={item}
                      quantity={cart[item.id] || 0}
                      onAddToCart={handleAddToCart}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-4">
          <div className="container space-y-4">
            <div className="sticky top-16 bg-background/95 backdrop-blur z-40 py-2">
              <CategoryTabs 
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
            
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-4 w-max">
                {filteredItems.map(item => (
                  <div key={item.id} className="w-64 flex-shrink-0">
                    <FoodCard
                      item={item}
                      quantity={cart[item.id] || 0}
                      onAddToCart={handleAddToCart}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
