# Food Ordering App - React Native with Capacitor & MERN Stack

A comprehensive food ordering application built with React Native (using Capacitor), featuring a full MERN stack backend with all the requested modern UI features.

## 🚀 Features Implemented

### Frontend Features
- ✅ **Food Display Layout**: 
  - Horizontal scroll for "All Items" section
  - Vertical layout (one item per row) for specific categories
  - Special Items remain scrollable

- ✅ **Dark Mode Support**: 
  - Toggle button in header
  - Fully dark theme for backgrounds, buttons, and text
  - Smooth theme transitions

- ✅ **Redesigned Cart Page**:
  - Food images on the left side of item cards
  - Quantity controls on the right side
  - Total price including tax displayed clearly in bold
  - Tax calculation (5%) for each item

- ✅ **Pickup Time Selection**:
  - Input field with time validation
  - Restricted to 9:30 AM - 3:45 PM range
  - Form validation before checkout

- ✅ **Enhanced Profile Section**:
  - Profile photo upload (5MB limit)
  - Read-only data display in styled divs
  - Shows: Name, Username, Roll Number, Joined Date, Account Status
  - Non-editable username and roll number fields

- ✅ **Updated Order History**:
  - Format: "Order #1 confirmed"
  - Displays: Placed date/time, Pickup time, Total amount
  - Lists ordered items with quantities and prices
  - Shows payment status and payment ID

### Backend Features (MERN Stack)
- ✅ **Express.js Server** with security middleware
- ✅ **MongoDB** integration with Mongoose
- ✅ **User Authentication** with JWT
- ✅ **File Upload** support for profile photos
- ✅ **Order Management** with pickup time validation
- ✅ **Food Item Management** with categories
- ✅ **RESTful API** endpoints

### Mobile Integration
- ✅ **Capacitor** setup for React Native deployment
- ✅ **Android & iOS** build configurations
- ✅ **Native features** ready for deployment

## 📱 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** with dark mode support
- **shadcn/ui** components
- **Capacitor** for React Native compilation
- **Axios** for API requests

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing
- **Helmet** & other security middleware

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Android Studio (for Android builds)
- Xcode (for iOS builds, macOS only)

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd food-ordering-app
npm install
cd backend && npm install && cd ..
```

### 2. Environment Setup
Create `backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/food_app
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### 3. Database Setup
```bash
# Start MongoDB service
# Then seed the database
cd backend
node seeds/foodData.js
```

### 4. Development Mode
```bash
# Run both frontend and backend concurrently
npm run dev:full

# Or run separately:
npm run server  # Backend only
npm run client  # Frontend only
```

### 5. Mobile App Setup (Capacitor)
```bash
# Build the web app
npm run build

# Initialize Capacitor
npm run cap:init

# Add platforms
npm run cap:add:android
npm run cap:add:ios

# Sync web assets
npm run cap:sync

# Open in native IDEs
npm run cap:open:android
npm run cap:open:ios
```

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/auth/logout` - Logout user

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/profile/photo` - Upload profile photo
- `DELETE /api/users/profile/photo` - Delete profile photo

### Food Endpoints
- `GET /api/food` - Get all food items (with filters)
- `GET /api/food/:id` - Get single food item
- `GET /api/food/categories/list` - Get all categories
- `GET /api/food/specials/today` - Get today's specials

### Order Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/payment` - Update payment info

## 🎨 UI/UX Features

### Dark Mode
- Toggle button in header (Moon/Sun icon)
- Persisted in localStorage
- Smooth transitions between themes
- Consistent styling across all components

### Food Display
- **All Items**: Horizontal scrollable cards
- **Category Items**: Vertical list layout
- **Special Items**: Horizontal scrollable (as requested)
- Responsive design for all screen sizes

### Cart Experience
- Clear item layout with images
- Real-time quantity updates
- Tax calculation display
- Pickup time validation
- Comprehensive checkout flow

### Profile Management
- Avatar with fallback initials
- Photo upload with size validation
- Read-only information display
- Account status indicators
- Professional styling

### Order History
- Detailed order cards
- Status badges with colors
- Complete item breakdown
- Payment information
- Responsive timeline view

## 🔒 Security Features

- JWT authentication
- Password hashing with bcryptjs
- Rate limiting
- CORS configuration
- Helmet security headers
- File upload validation
- Input sanitization

## 📱 Mobile Deployment

### Android
1. Build the project: `npm run build`
2. Sync with Capacitor: `npm run cap:sync`
3. Open Android Studio: `npm run cap:open:android`
4. Build APK/AAB from Android Studio

### iOS
1. Build the project: `npm run build`
2. Sync with Capacitor: `npm run cap:sync`
3. Open Xcode: `npm run cap:open:ios`
4. Build IPA from Xcode

## 🚀 Production Deployment

### Backend Deployment
- Set up MongoDB Atlas or server MongoDB
- Deploy to Heroku, Railway, or any Node.js hosting
- Update environment variables
- Set up file storage (AWS S3, Cloudinary, etc.)

### Frontend Deployment
- Build: `npm run build`
- Deploy to Netlify, Vercel, or any static hosting
- Update API base URL in `src/lib/api.ts`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For any issues or questions, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using React Native, Capacitor, and MERN Stack**
