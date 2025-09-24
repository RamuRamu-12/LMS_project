# UI/UX Wireframes - Simple E-Commerce Platform

**Document Version:** 1.0  
**Date:** December 2024  
**Project:** Simple E-Commerce Platform  

---

## Table of Contents
1. [Design System](#design-system)
2. [Customer Pages](#customer-pages)
3. [Admin Pages](#admin-pages)
4. [Navigation Flow](#navigation-flow)

---

## Design System

### Simple Color Palette
- **Primary:** Blue (#3B82F6)
- **Success:** Green (#10B981)
- **Error:** Red (#EF4444)
- **Text:** Dark Gray (#374151)
- **Background:** White (#FFFFFF)
- **Border:** Light Gray (#E5E7EB)

### Typography
- **Font:** Inter (Google Fonts)
- **Headers:** 24px, Bold
- **Body:** 16px, Regular
- **Small:** 14px, Regular

### Simple Components
- **Buttons:** 40px height, rounded corners
- **Cards:** White background, light border, 16px padding
- **Inputs:** 40px height, light border

---

## Customer Pages

### 1. Homepage
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] [Home] [Products] [About] [Contact] [Cart] [Login]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    Welcome to Our Store                 │
│                    Shop Amazing Products                │
│                                                         │
│              [Shop Now]                                 │
│                                                         │
│              [Hero Image]                               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                    Featured Products                    │
│                                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │Product 1│ │Product 2│ │Product 3│ │Product 4│       │
│  │$99.99   │ │$149.99  │ │$79.99   │ │$199.99  │       │
│  │[Add Cart]│ │[Add Cart]│ │[Add Cart]│ │[Add Cart]│       │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [About] [Contact] [Privacy] [Terms]                    │
│  © 2024 E-Commerce Platform. All rights reserved.     │
└─────────────────────────────────────────────────────────┘
```

### 2. Products Page
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] [Home] [Products] [About] [Contact] [Cart] [Login]│
├─────────────────────────────────────────────────────────┤
│  Products                                               │
│                                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │Product 1│ │Product 2│ │Product 3│ │Product 4│       │
│  │$99.99   │ │$149.99  │ │$79.99   │ │$199.99  │       │
│  │[Add Cart]│ │[Add Cart]│ │[Add Cart]│ │[Add Cart]│       │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│                                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │Product 5│ │Product 6│ │Product 7│ │Product 8│       │
│  │$89.99   │ │$129.99  │ │$69.99   │ │$179.99  │       │
│  │[Add Cart]│ │[Add Cart]│ │[Add Cart]│ │[Add Cart]│       │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│                                                         │
│  [Previous] 1 2 3 [Next]                               │
└─────────────────────────────────────────────────────────┘
```

### 3. Product Detail Page
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] [Home] [Products] [About] [Contact] [Cart] [Login]│
├─────────────────────────────────────────────────────────┤
│  Home > Products > Product Name                         │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Product Image        │ Product Info             │   │
│  │                     │                          │   │
│  │ ┌───────────────┐   │ Product Name             │   │
│  │ │               │   │ $99.99                   │   │
│  │ │   Main Image  │   │                          │   │
│  │ │               │   │ Description:             │   │
│  │ └───────────────┘   │ This is a great product  │   │
│  │                     │                          │   │
│  │                     │ Quantity: [1] [+][-]     │   │
│  │                     │                          │   │
│  │                     │ [Add to Cart]            │   │
│  └─────────────────────┴──────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 4. Cart Page
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] [Home] [Products] [About] [Contact] [Cart(2)] [Login]│
├─────────────────────────────────────────────────────────┤
│  Shopping Cart (2 items)                               │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Cart Items              │ Order Summary         │   │
│  │                         │                       │   │
│  │ ┌─────────────────────┐ │ Subtotal: $249.98    │   │
│  │ │ [Img] Product 1     │ │ Tax: $20.00          │   │
│  │ │ $99.99              │ │ ──────────────────    │   │
│  │ │ Qty: [1] [+][-]     │ │ Total: $269.98       │   │
│  │ │ [Remove]            │ │                       │   │
│  │ └─────────────────────┘ │ [Checkout]            │   │
│  │                         │                       │   │
│  │ ┌─────────────────────┐ │                       │   │
│  │ │ [Img] Product 2     │ │                       │   │
│  │ │ $149.99             │ │                       │   │
│  │ │ Qty: [1] [+][-]     │ │                       │   │
│  │ │ [Remove]            │ │                       │   │
│  │ └─────────────────────┘ │                       │   │
│  └─────────────────────────┴───────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 5. Checkout Page
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] [Home] [Products] [About] [Contact] [Cart] [Login]│
├─────────────────────────────────────────────────────────┤
│  Checkout                                               │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Shipping Info           │ Order Summary         │   │
│  │                         │                       │   │
│  │ Full Name               │ Product 1 - $99.99   │   │
│  │ [___________________]   │ Product 2 - $149.99  │   │
│  │                         │ ──────────────────    │   │
│  │ Email                   │ Subtotal: $249.98    │   │
│  │ [___________________]   │ Tax: $20.00          │   │
│  │                         │ Total: $269.98       │   │
│  │ Address                 │                       │   │
│  │ [___________________]   │                       │   │
│  │                         │                       │   │
│  │ City                    │                       │   │
│  │ [___________________]   │                       │   │
│  │                         │                       │   │
│  │                         │                       │   │
│  │                         │ [Continue to Payment] │   │
│  └─────────────────────────┴───────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 6. Payment Page
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] [Home] [Products] [About] [Contact] [Cart] [Login]│
├─────────────────────────────────────────────────────────┤
│  Payment                                                 │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Payment Method          │ Order Summary         │   │
│  │                         │                       │   │
│  │ [ ] Credit Card         │ Product 1 - $99.99   │   │
│  │ [ ] Debit Card          │ Product 2 - $149.99  │   │
│  │ [ ] PayPal              │ ──────────────────    │   │
│  │                         │ Subtotal: $249.98    │   │
│  │ Card Number             │ Tax: $20.00          │   │
│  │ [___________________]   │ Shipping: $0.00      │   │
│  │                         │ ──────────────────    │   │
│  │ Cardholder Name         │ Total: $269.98       │   │
│  │ [___________________]   │                       │   │
│  │                         │                       │   │
│  │ Expiry Date             │                       │   │
│  │ [MM] [YY]               │                       │   │
│  │                         │                       │   │
│  │ CVV                     │                       │   │
│  │ [___]                   │                       │   │
│  │                         │                       │   │
│  │ [ ] Save card for future│                       │   │
│  │                         │                       │   │
│  │ [Pay Now]               │                       │   │
│  └─────────────────────────┴───────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 7. Order Confirmation Page
```
┌─────────────────────────────────────────────────────────┐
│  [Logo] [Home] [Products] [About] [Contact] [Cart] [Login]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ✅ Order Confirmed!                             │   │
│  │                                                 │   │
│  │ Order #12345                                    │   │
│  │ Thank you for your purchase!                    │   │
│  │                                                 │   │
│  │ We've sent a confirmation email to:             │   │
│  │ john.doe@email.com                              │   │
│  │                                                 │   │
│  │ Order Details:                                  │   │
│  │ • Product 1 - $99.99                           │   │
│  │ • Product 2 - $149.99                          │   │
│  │ • Tax - $20.00                                 │   │
│  │ ──────────────────────────────                  │   │
│  │ Total: $269.98                                 │   │
│  │                                                 │   │
│  │ Estimated Delivery: Dec 25, 2024               │   │
│  │                                                 │   │
│  │ [Continue Shopping]                             │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 8. Login Page
```
┌─────────────────────────────────────────────────────────┐
│  [Logo]                                    [Back to Home]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    Login to Our Store                   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                 │   │
│  │  Email                                          │   │
│  │  [_____________________________]                │   │
│  │                                                 │   │
│  │  Password                                       │   │
│  │  [_____________________________]                │   │
│  │                                                 │   │
│  │  [Login]                                        │   │
│  │                                                 │   │
│  │  Don't have an account? [Sign Up]               │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Admin Pages

### 1. Admin Dashboard
```
┌─────────────────────────────────────────────────────────┐
│  [Admin Logo] [Dashboard] [Products] [Orders] [Logout] │
├─────────────────────────────────────────────────────────┤
│  Dashboard                                              │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Key Metrics                                     │   │
│  │                                                 │   │
│  │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │   │
│  │ │ Total   │ │ Today's │ │ Pending │ │ Revenue │ │   │
│  │ │ Orders  │ │ Orders  │ │ Orders  │ │ This    │ │   │
│  │ │  1,234  │ │   45    │ │   23    │ │ Month   │ │   │
│  │ │         │ │         │ │         │ │ $45,678 │ │   │
│  │ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │   │
│  │                                                 │   │
│  │ Recent Orders                                   │   │
│  │ ┌─────────────────────────────────────────────┐ │   │
│  │ │ Order #12345 - John Doe - $99.99           │ │   │
│  │ │ Status: Pending - [Process] [View]         │ │   │
│  │ └─────────────────────────────────────────────┘ │   │
│  │                                                 │   │
│  │ [View All Orders]                              │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2. Admin Products Page
```
┌─────────────────────────────────────────────────────────┐
│  [Admin Logo] [Dashboard] [Products] [Orders] [Logout] │
├─────────────────────────────────────────────────────────┤
│  Products                                               │
│                                                         │
│  [Add New Product]                                      │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Product List                                    │   │
│  │                                                 │   │
│  │ ┌─────────────────────────────────────────────┐ │   │
│  │ │ [Img] Product 1 - $99.99                   │ │   │
│  │ │ Stock: 15 units                            │ │   │
│  │ │ [Edit] [Delete]                            │ │   │
│  │ └─────────────────────────────────────────────┘ │   │
│  │                                                 │   │
│  │ ┌─────────────────────────────────────────────┐ │   │
│  │ │ [Img] Product 2 - $149.99                  │ │   │
│  │ │ Stock: 8 units                             │ │   │
│  │ │ [Edit] [Delete]                            │ │   │
│  │ └─────────────────────────────────────────────┘ │   │
│  │                                                 │   │
│  │ [Previous] 1 2 3 [Next]                        │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 3. Admin Orders Page
```
┌─────────────────────────────────────────────────────────┐
│  [Admin Logo] [Dashboard] [Products] [Orders] [Logout] │
├─────────────────────────────────────────────────────────┤
│  Orders                                                 │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Order List                                      │   │
│  │                                                 │   │
│  │ ┌─────────────────────────────────────────────┐ │   │
│  │ │ Order #12345 - John Doe                    │ │   │
│  │ │ Date: Dec 20, 2024                         │ │   │
│  │ │ Total: $99.99                              │ │   │
│  │ │ Status: [Pending ▼] [Process] [View]      │ │   │
│  │ └─────────────────────────────────────────────┘ │   │
│  │                                                 │   │
│  │ ┌─────────────────────────────────────────────┐ │   │
│  │ │ Order #12344 - Jane Smith                  │ │   │
│  │ │ Date: Dec 19, 2024                         │ │   │
│  │ │ Total: $149.99                             │ │   │
│  │ │ Status: [Shipped ▼] [Track] [View]        │ │   │
│  │ └─────────────────────────────────────────────┘ │   │
│  │                                                 │   │
│  │ [Previous] 1 2 3 [Next]                        │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Navigation Flow

### Customer Flow
```
Homepage → Products → Product Detail → Add to Cart → Cart → Checkout → Payment → Order Confirmed
    ↓
Login/Register (if needed)
```

### Admin Flow
```
Admin Login → Dashboard → Products Management → Orders Management
```

---

**Document Status:** Ready for Simple Implementation  
**Focus:** Essential e-commerce functionality only  
**Complexity:** Minimal - Easy to build and maintain

---

*This simplified wireframe focuses on core e-commerce features without unnecessary complexity.*