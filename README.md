# 🛒 Product Management Dashboard

A modern, full-featured product management application built with Next.js, Redux, and React. This dashboard allows you to manage products, visualize data with interactive charts, and maintain a comprehensive inventory system.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.0-purple?style=flat-square&logo=redux)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-teal?style=flat-square&logo=tailwindcss)
![Jest](https://img.shields.io/badge/Jest-30.1.3-red?style=flat-square&logo=jest)

## ✨ Features

### 🏪 **Product Management**
- ✅ **Add new products** with comprehensive form validation
- ✅ **View product catalog** with beautiful card layouts
- ✅ **Product details page** with full specifications
- ✅ **Real-time stock management** with low stock warnings
- ✅ **Category-based organization** (Electronics, Fitness, Home, Clothing, Books)
- ✅ **Product images** with fallback handling

### 📊 **Data Visualization**
- ✅ **Interactive charts** using Recharts library
- ✅ **Product analytics** by category, price range, and stock status
- ✅ **Pie and bar charts** for different data representations
- ✅ **Total value calculations** and inventory insights

### 🎨 **User Experience**
- ✅ **Modern UI design** with Tailwind CSS
- ✅ **Responsive layout** for all device sizes
- ✅ **Smooth animations** and hover effects
- ✅ **Form validation** in English with real-time error feedback

### 🔧 **Technical Features**
- ✅ **Redux state management** for centralized data
- ✅ **TypeScript** for type safety
- ✅ **Next.js App Router** with dynamic routing
- ✅ **Custom currency input** component
- ✅ **Comprehensive testing suite** with Jest + React Testing Library
- ✅ **ESLint configuration** for code quality

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (version 18.14.0 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd challenge-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Development

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

The page will automatically reload when you make changes to the code.

### Building for Production

5. **Build the application**
   ```bash
   npm run build
   ```

6. **Start the production server**
   ```bash
   npm start
   ```

## 🧪 Testing

This project includes a comprehensive testing suite covering all critical functionality.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage

The testing suite includes:
- ✅ **Utils functions** (20 tests) - Data manipulation and calculations
- ✅ **Redux state management** (11 tests) - CRUD operations and state
- ✅ **Component testing** (10 tests) - ProductCard behavior and rendering
- ✅ **Chart components** (14 tests) - Data visualization logic
- ✅ **Form validation** (9 tests) - Input validation and error handling
- ✅ **Integration tests** (7 tests) - End-to-end user flows

### Test Files Structure
```
src/
├── app/lib/data/__tests__/
│   └── utils.test.ts                    # Utility functions
├── store/slices/__tests__/
│   └── productsSlice.test.ts           # Redux state management
├── components/product/__tests__/
│   └── ProductCard.test.tsx            # Product card component
├── components/charts/__tests__/
│   └── ProductCategoryChart.test.tsx   # Chart components
└── app/products/new/__tests__/
    └── page.simple.test.tsx            # Form validation
```

## 📁 Project Structure

```
challenge-nextjs/
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── lib/data/         # Data utilities and definitions
│   │   ├── products/         # Product-related pages
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Dashboard homepage
│   ├── components/           # Reusable components
│   │   ├── charts/          # Chart components
│   │   ├── icons/           # Icon components
│   │   ├── product/         # Product-related components
│   │   ├── providers/       # Context providers
│   │   └── ui/              # UI components
│   ├── store/               # Redux store configuration
│   │   ├── slices/          # Redux slices
│   │   ├── hooks.ts         # Typed Redux hooks
│   │   └── index.ts         # Store configuration
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── jest.config.js           # Jest configuration
├── jest.setup.js            # Jest setup file
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🛠️ Technologies Used

### **Frontend Framework**
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - User interface library
- **TypeScript 5.x** - Type-safe JavaScript

### **State Management**
- **Redux Toolkit 2.9.0** - Predictable state container
- **React Redux 9.2.0** - React bindings for Redux

### **Styling & UI**
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Lucide React 0.542.0** - Beautiful icon library
- **Custom CSS** - Custom animations and styles

### **Data Visualization**
- **Recharts 3.1.2** - React charting library
- **Custom chart components** - Pie charts, bar charts, tooltips

### **Development & Testing**
- **Jest 30.1.3** - JavaScript testing framework
- **React Testing Library 16.3.0** - Testing utilities for React
- **Jest DOM** - Custom Jest matchers for DOM testing
- **User Event** - Simulate user interactions in tests

### **Code Quality**
- **ESLint** - JavaScript/TypeScript linting
- **Next.js ESLint Config** - Optimized rules for Next.js

## 📊 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build the application for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint to check code quality |
| `npm test` | Run the test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## 🎯 Key Features Breakdown

### **Product Management**
- **Add Products**: Comprehensive form with validation in English
- **Product Cards**: Beautiful responsive cards with images
- **Product Details**: Dedicated pages for each product
- **Stock Management**: Visual indicators for stock levels
- **Categories**: Organized by Electronics, Fitness, Home, Clothing, Books

### **Dashboard Analytics**
- **Category Distribution**: Pie charts showing product distribution
- **Price Range Analysis**: Products grouped by price ranges
- **Stock Status**: Visual representation of inventory levels
- **Total Value**: Calculate total inventory value

### **Form Validation**
- **Real-time validation**: Errors appear/disappear as you type
- **English messages**: All validation messages in English
- **Required fields**: Name, SKU, description, price, stock
- **Data validation**: Price > 0, stock ≥ 0, proper formatting

### **Data Visualization**
- **Interactive charts**: Hover effects and tooltips
- **Multiple chart types**: Pie charts and bar charts
- **Responsive design**: Charts adapt to container size
- **No data states**: Graceful handling of empty data

## 🔧 Configuration

### **Environment Setup**
The project uses standard Next.js configuration. No additional environment variables are required for basic functionality.

### **Testing Configuration**
- **Jest**: Configured for Next.js with TypeScript support
- **Mocks**: Next.js router and Recharts components mocked for testing
- **Coverage**: HTML and text coverage reports available

### **Build Configuration**
- **TypeScript**: Strict mode enabled
- **Tailwind**: Configured with custom utilities
- **Next.js**: App Router with TypeScript support

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js, Redux, and TypeScript