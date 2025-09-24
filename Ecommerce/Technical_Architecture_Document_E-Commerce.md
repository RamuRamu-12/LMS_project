# Technical Architecture & Flow Documentation
## Simple E-Commerce Platform

**Document Version:** 1.0  
**Date:** December 2024  
**Project:** Simple E-Commerce Platform  
**Based on:** BRD & UI/UX Wireframes

---

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [Database Design](#database-design)
4. [API Structure](#api-structure)
5. [User Flow & Data Flow](#user-flow--data-flow)
6. [Security Implementation](#security-implementation)
7. [Deployment Setup](#deployment-setup)

---

## System Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Client Layer                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │   Desktop   │ │   Mobile    │ │   Tablet    │          │
│  │   Browser   │ │   Browser   │ │   Browser   │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS
┌─────────────────────▼───────────────────────────────────────┐
│                 Next.js Application                        │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │   Frontend  │ │    API      │ │   Auth      │          │
│  │   (React)   │ │   Routes    │ │  (NextAuth) │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                Data & External Services                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ PostgreSQL  │ │   Stripe    │ │ Cloudinary  │          │
│  │  Database   │ │  Payments   │ │    Images   │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/ui
- **State Management:** Zustand
- **Forms:** React Hook Form

### Backend
- **API:** Next.js API Routes
- **Database:** PostgreSQL (Neon Serverless)
- **ORM:** Prisma
- **Authentication:** NextAuth.js

### External Services
- **Payments:** Stripe
- **Images:** Cloudinary
- **Email:** Resend
- **Hosting:** Vercel

---

## Database Design

### Prisma Schema
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String?
  createdAt DateTime @default(now())
  
  orders Order[]
  cartItems CartItem[]
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  image       String?
  stock       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  
  orderItems OrderItem[]
  cartItems  CartItem[]
}

model Order {
  id          String   @id @default(cuid())
  orderNumber String   @unique
  userId      String
  total       Decimal  @db.Decimal(10, 2)
  status      OrderStatus @default(PENDING)
  createdAt   DateTime @default(now())
  
  user       User        @relation(fields: [userId], references: [id])
  orderItems OrderItem[]
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  price     Decimal @db.Decimal(10, 2)
  
  order   Order   @relation(fields: [orderId], references: [id])
  product Product @relation(fields: [productId], references: [id])
}

model CartItem {
  id        String @id @default(cuid())
  userId    String
  productId String
  quantity  Int
  
  user    User    @relation(fields: [userId], references: [id])
  product Product @relation(fields: [productId], references: [id])
  
  @@unique([userId, productId])
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}
```

---

## API Structure

### API Routes
```
/api/
├── auth/
│   └── [...nextauth]/        # NextAuth.js endpoints
├── products/
│   ├── route.ts              # GET /api/products
│   └── [id]/route.ts         # GET /api/products/[id]
├── cart/
│   ├── route.ts              # GET, POST /api/cart
│   └── [id]/route.ts         # PUT, DELETE /api/cart/[id]
├── orders/
│   ├── route.ts              # GET, POST /api/orders
│   └── [id]/route.ts         # GET /api/orders/[id]
├── payments/
│   └── create/route.ts       # POST /api/payments/create
└── admin/
    ├── products/route.ts     # GET, POST /api/admin/products
    ├── products/[id]/route.ts # PUT, DELETE /api/admin/products/[id]
    ├── orders/route.ts       # GET /api/admin/orders
    └── orders/[id]/route.ts  # PUT /api/admin/orders/[id]
```

### API Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

---

## User Flow & Data Flow

### Customer Journey (8 Pages)

#### 1. Homepage Flow
```
User visits homepage
    ↓
GET /api/products?featured=true
    ↓
Database: SELECT * FROM products WHERE isActive = true LIMIT 4
    ↓
Display featured products
    ↓
User clicks "Add to Cart"
    ↓
POST /api/cart { productId, quantity }
    ↓
Update cart count in header
```

#### 2. Products Page Flow
```
User clicks "Products"
    ↓
GET /api/products?page=1&limit=8
    ↓
Database: SELECT * FROM products WHERE isActive = true OFFSET 0 LIMIT 8
    ↓
Display products with pagination
```

#### 3. Product Detail Flow
```
User clicks product
    ↓
GET /api/products/[id]
    ↓
Database: SELECT * FROM products WHERE id = $1
    ↓
Display product details
    ↓
User adds to cart
    ↓
POST /api/cart
    ↓
Redirect to cart
```

#### 4. Cart Page Flow
```
User visits cart
    ↓
GET /api/cart
    ↓
Database: SELECT ci.*, p.name, p.price FROM cart_items ci JOIN products p ON ci.productId = p.id
    ↓
Display cart items
    ↓
User modifies quantity
    ↓
PUT /api/cart/[id]
    ↓
Update display
```

#### 5. Checkout Flow
```
User clicks "Checkout"
    ↓
Validate cart not empty
    ↓
Display shipping form
    ↓
User fills form
    ↓
Store in sessionStorage
    ↓
Navigate to payment
```

#### 6. Payment Flow
```
User arrives at payment
    ↓
Retrieve shipping data
    ↓
Display payment form
    ↓
User enters payment info
    ↓
POST /api/payments/create
    ↓
Stripe API call
    ↓
If successful: Create order
    ↓
Redirect to confirmation
```

#### 7. Order Confirmation Flow
```
User sees confirmation
    ↓
GET /api/orders/[id]
    ↓
Database: SELECT order details with items
    ↓
Display confirmation
    ↓
Send email notification
```

#### 8. Login Flow
```
User clicks "Login"
    ↓
POST /api/auth/login
    ↓
Validate credentials
    ↓
Create JWT token
    ↓
Redirect to homepage
```

### Admin Journey (3 Pages)

#### 1. Admin Dashboard Flow
```
Admin logs in
    ↓
GET /api/admin/dashboard
    ↓
Database queries for metrics:
  - Total orders count
  - Today's orders count
  - Pending orders count
  - Monthly revenue
    ↓
Display dashboard with metrics
```

#### 2. Admin Products Flow
```
Admin clicks "Products"
    ↓
GET /api/admin/products
    ↓
Database: SELECT * FROM products ORDER BY createdAt DESC
    ↓
Display products table
    ↓
Admin creates/edits product
    ↓
POST/PUT /api/admin/products
    ↓
Update database
    ↓
Refresh products list
```

#### 3. Admin Orders Flow
```
Admin clicks "Orders"
    ↓
GET /api/admin/orders
    ↓
Database: SELECT orders with customer names
    ↓
Display orders table
    ↓
Admin updates status
    ↓
PUT /api/admin/orders/[id]
    ↓
Update database
    ↓
Send email notification
```

---

## Security Implementation

### Authentication
```typescript
// NextAuth.js configuration
export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Validate user credentials
        const user = await validateUser(credentials.email, credentials.password)
        return user
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: "jwt" }
}
```

### API Protection
```typescript
// Middleware for protected routes
export function withAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    
    return handler(req, res)
  }
}
```

### Security Measures
- JWT token authentication
- Password hashing with bcrypt
- SQL injection prevention with Prisma
- XSS protection with React
- CSRF protection with NextAuth.js
- HTTPS enforcement
- Stripe PCI DSS compliance

---

## Deployment Setup

### Environment Variables
```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"
STRIPE_SECRET_KEY="sk_..."
STRIPE_PUBLISHABLE_KEY="pk_..."
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### Deployment Process
1. Push code to GitHub
2. Vercel auto-deploys from main branch
3. Environment variables configured in Vercel dashboard
4. Database migrations run automatically
5. Application available at custom domain

---

## Project Structure
```
src/
├── app/
│   ├── (customer)/
│   │   ├── page.tsx                 # Homepage
│   │   ├── products/page.tsx
│   │   ├── products/[id]/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── payment/page.tsx
│   │   ├── order-confirmation/page.tsx
│   │   └── login/page.tsx
│   ├── (admin)/
│   │   ├── admin/dashboard/page.tsx
│   │   ├── admin/products/page.tsx
│   │   └── admin/orders/page.tsx
│   ├── api/
│   │   └── [api routes...]
│   └── layout.tsx
├── components/
│   ├── ui/                          # Shadcn/ui components
│   ├── forms/                       # Form components
│   ├── layout/                      # Header, footer, navigation
│   └── features/                    # Feature-specific components
├── lib/
│   ├── auth.ts                      # NextAuth configuration
│   ├── db.ts                        # Prisma client
│   ├── stripe.ts                    # Stripe configuration
│   └── utils.ts                     # Utility functions
└── store/
    └── cart-store.ts                # Zustand cart store
```

---

**Document Status:** Ready for Development  
**Next Steps:** Environment setup and project initialization  
**Total Pages:** 11 (8 customer + 3 admin)

---

*This document provides all essential technical information needed to develop the e-commerce platform efficiently.*
