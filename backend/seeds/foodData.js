const mongoose = require('mongoose');
const Food = require('../models/Food');
require('dotenv').config();

const foodItems = [
  {
    name: "Aloo Paratha",
    description: "Crispy potato-stuffed flatbread served with yogurt and pickle",
    price: 40,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500",
    category: "main-course",
    isVeg: true,
    available: true,
    rating: 4.5,
    isSpecial: true,
    preparationTime: 15
  },
  {
    name: "Masala Chai",
    description: "Traditional Indian spiced tea with milk and aromatic spices",
    price: 15,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
    category: "beverages",
    isVeg: true,
    available: true,
    rating: 4.8,
    isSpecial: true,
    preparationTime: 5
  },
  {
    name: "Gulab Jamun",
    description: "Soft milk dumplings soaked in sweet cardamom syrup",
    price: 25,
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500",
    category: "desserts",
    isVeg: true,
    available: true,
    rating: 4.7,
    isSpecial: false,
    preparationTime: 10
  },
  {
    name: "Samosa",
    description: "Crispy triangular pastry filled with spiced potatoes and peas",
    price: 20,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    category: "snacks",
    isVeg: true,
    available: true,
    rating: 4.3,
    isSpecial: true,
    preparationTime: 8
  },
  {
    name: "Chicken Biryani",
    description: "Fragrant basmati rice with tender chicken and aromatic spices",
    price: 120,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=500",
    category: "main-course",
    isVeg: false,
    available: true,
    rating: 4.9,
    isSpecial: true,
    preparationTime: 25
  },
  {
    name: "Mango Lassi",
    description: "Creamy yogurt drink blended with sweet mango pulp",
    price: 35,
    image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=500",
    category: "beverages",
    isVeg: true,
    available: true,
    rating: 4.6,
    isSpecial: false,
    preparationTime: 5
  },
  {
    name: "Paneer Tikka",
    description: "Grilled cottage cheese cubes marinated in spiced yogurt",
    price: 80,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500",
    category: "main-course",
    isVeg: true,
    available: true,
    rating: 4.4,
    isSpecial: false,
    preparationTime: 20
  },
  {
    name: "Ras Malai",
    description: "Soft cottage cheese dumplings in sweet cardamom milk",
    price: 45,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500",
    category: "desserts",
    isVeg: true,
    available: true,
    rating: 4.8,
    isSpecial: true,
    preparationTime: 15
  },
  {
    name: "Pav Bhaji",
    description: "Spiced mixed vegetable curry served with buttered bread rolls",
    price: 60,
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500",
    category: "main-course",
    isVeg: true,
    available: true,
    rating: 4.5,
    isSpecial: false,
    preparationTime: 18
  },
  {
    name: "Cold Coffee",
    description: "Chilled coffee with milk, ice cream and whipped cream",
    price: 40,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
    category: "beverages",
    isVeg: true,
    available: true,
    rating: 4.2,
    isSpecial: false,
    preparationTime: 8
  },
  {
    name: "Kulfi",
    description: "Traditional Indian ice cream with pistachios and cardamom",
    price: 30,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    category: "desserts",
    isVeg: true,
    available: true,
    rating: 4.6,
    isSpecial: false,
    preparationTime: 2
  },
  {
    name: "Dosa",
    description: "Crispy South Indian crepe served with coconut chutney and sambar",
    price: 50,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500",
    category: "main-course",
    isVeg: true,
    available: true,
    rating: 4.7,
    isSpecial: true,
    preparationTime: 12
  }
];

const seedFood = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/food_app');
    console.log('Connected to MongoDB');
    
    // Clear existing food items
    await Food.deleteMany({});
    console.log('Cleared existing food items');
    
    // Insert new food items
    await Food.insertMany(foodItems);
    console.log(`Inserted ${foodItems.length} food items`);
    
    console.log('Food data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding food data:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedFood();
}

module.exports = { foodItems, seedFood };