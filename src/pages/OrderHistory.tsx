import { useState } from "react";
import { ArrowLeft, Calendar, Filter, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  orderNumber: string;
  status: "confirmed" | "preparing" | "ready" | "completed" | "cancelled";
  placedDate: string;
  placedTime: string;
  pickupTime: string;
  total: number;
  items: OrderItem[];
  paymentStatus: string;
  paymentId: string;
}

interface OrderHistoryProps {
  onBack: () => void;
}

const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: "ORDER17539641431123",
    status: "confirmed",
    placedDate: "Jul 31, 2025",
    placedTime: "12:15 PM",
    pickupTime: "2:36 PM",
    total: 40,
    items: [
      { name: "Aloo Paratha", quantity: 1, price: 40 }
    ],
    paymentStatus: "Paid",
    paymentId: "pay_1753964143112_uajsqhkxm"
  },
  {
    id: 2,
    orderNumber: "ORDER17539631251089",
    status: "completed",
    placedDate: "Jul 30, 2025",
    placedTime: "1:20 PM",
    pickupTime: "2:00 PM",
    total: 95,
    items: [
      { name: "Chicken Biryani", quantity: 1, price: 120 },
      { name: "Masala Chai", quantity: 2, price: 15 }
    ],
    paymentStatus: "Paid",
    paymentId: "pay_1753963125108_bxkjwhqln"
  },
  {
    id: 3,
    orderNumber: "ORDER17539521100456",
    status: "completed",
    placedDate: "Jul 29, 2025",
    placedTime: "11:45 AM",
    pickupTime: "1:15 PM",
    total: 45,
    items: [
      { name: "Samosa", quantity: 2, price: 20 },
      { name: "Gulab Jamun", quantity: 1, price: 25 }
    ],
    paymentStatus: "Paid",
    paymentId: "pay_1753952110045_mnfgtyuio"
  }
];

const OrderHistory = ({ onBack }: OrderHistoryProps) => {
  const [filteredOrders] = useState<Order[]>(mockOrders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "preparing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "ready":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
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
        </div>
      </div>

      <div className="container py-6 space-y-6 max-w-4xl mx-auto">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground">Your order history will appear here once you place orders.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-6">
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">Order #{order.id}</h3>
                      <Badge className={`${getStatusColor(order.status)} font-medium`}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">₹{order.total.toFixed(2)}</p>
                      <Badge className={`${getStatusColor(order.status)} font-medium mt-1`}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Placed:</span>
                      <span className="font-medium">{order.placedDate}, {order.placedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Pickup:</span>
                      <span className="font-medium">{order.pickupTime}</span>
                    </div>
                  </div>

                  {/* Items Ordered Section */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-lg mb-3">Items Ordered:</h4>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} @ ₹{item.price.toFixed(2)} each
                            </p>
                          </div>
                          <p className="font-bold">₹{(item.quantity * item.price).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="border-t pt-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Payment Status:</span>
                        <span className="font-medium ml-2 text-green-600">{order.paymentStatus}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Payment ID:</span>
                        <span className="font-mono text-xs ml-2">{order.paymentId}</span>
                      </div>
                    </div>
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