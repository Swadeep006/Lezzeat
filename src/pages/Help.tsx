import { ArrowLeft, MessageCircle, Phone, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface HelpProps {
  onBack: () => void;
}

const Help = ({ onBack }: HelpProps) => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Simply browse our menu, add items to your cart, and proceed to checkout. You can pay online or choose cash on pickup."
    },
    {
      question: "What are the delivery timings?",
      answer: "We operate from 8:00 AM to 10:00 PM. Orders are typically ready for pickup within 10-15 minutes."
    },
    {
      question: "Can I cancel my order?",
      answer: "You can cancel your order within 2 minutes of placing it. After that, please contact our support team."
    },
    {
      question: "Are there any delivery charges?",
      answer: "Currently, we only offer pickup from the college canteen. There are no delivery charges for pickup orders."
    },
    {
      question: "How do I track my order?",
      answer: "You'll receive real-time updates about your order status. You can also check your order history in the app."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Help & Support</h1>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-elevated transition-all">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Chat with our support team</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-elevated transition-all">
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground">+91 9876543210</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-elevated transition-all">
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">support@lezzeat.com</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>App Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span>January 8, 2024</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;