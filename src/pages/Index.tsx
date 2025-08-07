import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FoodCard, FoodItem } from "@/components/FoodCard";
import { useToast } from "@/hooks/use-toast";
import Profile from "./Profile";
import Cart from "./Cart";

// Sample food data with imports
import burgerImg from "@/assets/burger.jpg";
import sandwichImg from "@/assets/sandwich.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import juiceImg from "@/assets/juice.jpg";

// Today's Specials - Featured items
const todaysSpecials: FoodItem[] = [
  {
    id: "1",
    name: "Chicken Burger",
    description: "Crispy chicken patty with fresh lettuce, tomato, and our special sauce",
    price: 120,
    image: burgerImg,
    category: "burgers",
    isVeg: false,
    available: true,
    rating: 4.5,
  },
  {
    id: "2",
    name: "Veg Sandwich",
    description: "Fresh vegetables and cheese on whole wheat bread with mint chutney",
    price: 80,
    image: sandwichImg,
    category: "snacks",
    isVeg: true,
    available: true,
    rating: 4.2,
  },
  {
    id: "3",
    name: "Pepperoni Pizza",
    description: "Classic pizza with pepperoni, mozzarella cheese, and tomato sauce",
    price: 200,
    image: pizzaImg,
    category: "pizza",
    isVeg: false,
    available: true,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Fresh Mango Juice",
    description: "Freshly squeezed mango juice with a hint of mint",
    price: 60,
    image: juiceImg,
    category: "beverages",
    isVeg: true,
    available: true,
    rating: 4.3,
  },
];

const Index = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState('home');
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

  if (currentPage === 'profile') {
    return <Profile onBack={handleBackToHome} />;
  }

  if (currentPage === 'cart') {
    return (
      <Cart 
        onBack={handleBackToHome} 
        cart={cart} 
        onUpdateQuantity={handleUpdateQuantity}
        foodItems={todaysSpecials}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={cartItemCount}
        onCartClick={handleCartClick}
        onMenuClick={() => {}}
        onProfileClick={handleProfileClick}
      />
      
      <main>
        <HeroSection onOrderNowClick={handleOrderNow} />
        
        <section id="specials" className="py-8">
          <div className="container space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Today's Specials</h2>
              <p className="text-muted-foreground">
                Fresh, handpicked meals prepared just for you today
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {todaysSpecials.map(item => (
                <FoodCard
                  key={item.id}
                  item={item}
                  quantity={cart[item.id] || 0}
                  onAddToCart={handleAddToCart}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
