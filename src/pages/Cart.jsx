import { ArrowLeft, Plus, Minus, ShoppingBag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Cart = ({ onBack, cart, onUpdateQuantity, foodItems }) => {
  const { toast } = useToast();
  const [pickupTime, setPickupTime] = useState('');

  const cartItems = Object.entries(cart).map(([itemId, quantity]) => ({
    ...foodItems.find(item => item.id === itemId),
    quantity
  })).filter(item => item.quantity > 0);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const validatePickupTime = (time) => {
    if (!time) return false;
    
    const [hours, minutes] = time.split(':').map(num => parseInt(num));
    const timeInMinutes = hours * 60 + minutes;
    
    // 9:30 AM = 570 minutes, 3:45 PM = 945 minutes
    return timeInMinutes >= 570 && timeInMinutes <= 945;
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart first.",
        variant: "destructive"
      });
      return;
    }

    if (!pickupTime) {
      toast({
        title: "Pickup time required",
        description: "Please select a pickup time.",
        variant: "destructive"
      });
      return;
    }

    if (!validatePickupTime(pickupTime)) {
      toast({
        title: "Invalid pickup time",
        description: "Pickup time must be between 9:30 AM and 3:45 PM.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Order Placed!",
      description: `Your order of ₹${totalAmount} has been placed successfully for pickup at ${pickupTime}.`,
    });
    
    // Clear cart after checkout
    cartItems.forEach(item => {
      onUpdateQuantity(item.id, 0);
    });
    setPickupTime('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">My Cart</h1>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="font-medium">{cartItems.length} items</span>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6 max-w-2xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-4">Add some delicious items to get started!</p>
            <Button onClick={onBack}>Browse Menu</Button>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {cartItems.map(item => {
                const tax = Math.round(item.price * item.quantity * 0.05); // 5% tax
                const totalWithTax = (item.price * item.quantity) + tax;
                return (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Food image on the left */}
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                          
                          <div className="flex items-center justify-between">
                            {/* Quantity controls on the right side */}
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Qty:</span>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="font-semibold min-w-[20px] text-center">
                                  {item.quantity}
                                </span>
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Total price including tax below */}
                          <div className="mt-3 pt-2 border-t">
                            <div className="flex justify-between text-sm">
                              <span>Subtotal:</span>
                              <span>₹{item.price * item.quantity}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Tax (5%):</span>
                              <span>₹{tax}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg mt-1">
                              <span>Total:</span>
                              <span>₹{totalWithTax}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pickup Time Selection */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <Label htmlFor="pickup-time" className="text-lg font-semibold">
                      Select Pickup Time
                    </Label>
                  </div>
                  <Input
                    id="pickup-time"
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    min="09:30"
                    max="15:45"
                    className="text-lg"
                  />
                  <p className="text-sm text-muted-foreground">
                    Available pickup time: 9:30 AM - 3:45 PM
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary text-primary-foreground">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold">₹{totalAmount}</span>
                </div>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;