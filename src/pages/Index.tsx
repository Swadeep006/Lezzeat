import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoryTabs, Category } from "@/components/CategoryTabs";
import { FoodCard, FoodItem } from "@/components/FoodCard";
import { useToast } from "@/hooks/use-toast";

// Sample food data with imports
import burgerImg from "@/assets/burger.jpg";
import sandwichImg from "@/assets/sandwich.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import juiceImg from "@/assets/juice.jpg";

const categories: Category[] = [
  { id: "all", name: "All Items", icon: "🍽️" },
  { id: "burgers", name: "Burgers", icon: "🍔" },
  { id: "snacks", name: "Snacks", icon: "🥙" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "beverages", name: "Beverages", icon: "🥤" },
];

const foodItems: FoodItem[] = [
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
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const filteredItems = activeCategory === "all" 
    ? foodItems 
    : foodItems.filter(item => item.category === activeCategory);

  const cartItemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  const handleAddToCart = (item: FoodItem) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
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
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCartClick = () => {
    toast({
      title: "Cart",
      description: `You have ${cartItemCount} items in your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={cartItemCount}
        onCartClick={handleCartClick}
        onMenuClick={() => {}}
        onProfileClick={() => {}}
      />
      
      <main>
        <HeroSection onOrderNowClick={handleOrderNow} />
        
        <section id="menu" className="py-8">
          <div className="container space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Our Menu</h2>
              <p className="text-muted-foreground">
                Choose from our delicious selection of fresh, made-to-order meals
              </p>
            </div>
            
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
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
