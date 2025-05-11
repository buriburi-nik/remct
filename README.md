# Shopify React Application

A full-featured e-commerce application built with React, featuring product browsing, shopping cart, user authentication, and more.

## 📋 Features

- **User Authentication**: Sign up, login, and persistent user sessions
- **Product Management**: Browse products by category with a dynamic UI
- **Shopping Cart**: Add, remove items with animated transitions
- **Wishlist**: Save items for later
- **User Management**: View and filter users by city and gender
- **Contact Form**: Submit support tickets and inquiries
- **Dashboard**: Overview of products, users, and other metrics
- **Responsive Design**: Works on all device sizes

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/buriburi-nik/remct.git
cd shopify
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Cart/               # Shopping cart management
│   ├── Contact/            # Contact form
│   ├── Home/               # Dashboard/home page
│   ├── Login/              # User authentication
│   ├── Nav/                # Navigation bar
│   ├── ProductDetails/     # Single product view
│   ├── Products/           # Product listing
│   ├── Signup/             # New user registration
│   ├── User/               # User management
│   └── Wishlist/           # Saved items for later
├── App.js                  # Main application component
├── index.js                # Entry point
└── ...
```

## 💾 Data Storage

This application uses:

- **localStorage** for user sessions, cart, and wishlist
- **Fake Store API** (https://fakestoreapi.com) for product and user data

## 📱 User Flow

1. **Login/Signup**: Users create an account or sign in
2. **Browse Products**: Filter by category and view details
3. **Shopping**: Add items to cart or wishlist
4. **Checkout**: From cart to checkout (placeholder functionality)

## 🎨 Key UI Components

- **Navigation Bar**: Responsive navigation with mobile menu
- **Product Cards**: Clean display of product information
- **Form Components**: Standardized input handling with validation
- **Empty States**: User-friendly messaging when no data is available
- **Loading States**: Spinners and loading indicators for asynchronous operations

## 🔒 Authentication Flow

The application implements a simplified authentication flow using localStorage:

1. User registers with name, email, and password
2. Information is securely stored in localStorage
3. Login verifies credentials against stored user data
4. Authenticated state persists across browser sessions

## 🔍 API Integration

The application interacts with the Fake Store API to retrieve:

- Product categories
- Product listings and details
- User information

## 🛠️ Development Notes

### State Management

- Component-level state using React hooks (useState, useEffect)
- Local storage for persistent data (cart, wishlist, user sessions)

### Routing

- React Router for page navigation and dynamic routes
- Protected routes for authenticated content

### Form Handling

- Controlled components for form inputs
- Client-side validation with error messaging
- Loading states during submissions

## 📦 Future Enhancements

- [ ] User profile management
- [ ] Order history
- [ ] Payment processing integration
- [ ] Admin dashboard
- [ ] Product reviews and ratings
- [ ] Search functionality
- [ ] Dark mode

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Fake Store API](https://fakestoreapi.com) for providing product and user data
- React and its ecosystem for powerful UI development tools
