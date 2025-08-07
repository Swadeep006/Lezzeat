import { useState } from "react";
import { ArrowLeft, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: "completed" | "preparing" | "cancelled";
}

interface OrderHistoryProps {
  onBack: () => void;
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    date: "2024-01-08",
    items: [
      { name: "Chicken Burger", quantity: 2, price: 120 },
      { name: "Fresh Mango Juice", quantity: 1, price: 60 }
    ],
    total: 300,
    status: "completed"
  },
  {
    id: "ORD002", 
    date: "2024-01-06",
    items: [
      { name: "Veg Sandwich", quantity: 1, price: 80 },
      { name: "Pepperoni Pizza", quantity: 1, price: 200 }
    ],
    total: 280,
    status: "completed"
  },
  {
    id: "ORD003",
    date: "2024-01-05",
    items: [
      { name: "Pepperoni Pizza", quantity: 1, price: 200 }
    ],
    total: 200,
    status: "cancelled"
  }
];

const OrderHistory = ({ onBack }: OrderHistoryProps) => {
  const [orders] = useState<Order[]>(mockOrders);
  const [dateFilter, setDateFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredOrders = orders.filter(order => {
    if (!dateFilter) return true;
    return order.date >= dateFilter;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case "completed": return "success";
      case "preparing": return "warning";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Order History</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="container py-6 space-y-4">
        {showFilters && (
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <Label htmlFor="date-filter" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Filter by date (from)
                </Label>
                <Input
                  id="date-filter"
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  placeholder="Select date"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
            <Button onClick={onBack}>Start Ordering</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">#{order.id}</h3>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <Badge variant={getStatusColor(order.status) as any}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{order.total}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;