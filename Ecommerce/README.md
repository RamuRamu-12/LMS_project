# Aishani E-Commerce Platform

A modern, full-stack e-commerce platform built with Next.js 14, TypeScript, and Prisma. This project provides a complete shopping experience with both customer and admin interfaces.

## 🚀 Features

### Customer Features
- **Product Catalog**: Browse, search, and filter products
- **Product Details**: Detailed product pages with images and descriptions
- **Shopping Cart**: Add, remove, and manage cart items
- **Checkout Process**: Multi-step checkout with shipping information
- **Payment Integration**: Secure payment processing with Stripe
- **Order Management**: View order history and track orders
- **User Authentication**: Registration, login, and profile management
- **Responsive Design**: Mobile-first, responsive design

### Admin Features
- **Dashboard**: Analytics and key metrics overview
- **Product Management**: Add, edit, and manage products
- **Order Management**: Process and track customer orders
- **User Management**: View and manage customer accounts
- **Analytics**: Sales reports and performance metrics

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **Zustand** for state management
- **React Hook Form** for form handling
- **NextAuth.js** for authentication

### Backend
- **Next.js API Routes** for backend logic
- **Prisma** as ORM
- **PostgreSQL** as database
- **NextAuth.js** for authentication
- **Stripe** for payment processing

### Development Tools
- **TypeScript** for type checking
- **ESLint** for code linting
- **Jest** for testing
- **Prisma** for database management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aishani-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in the required environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/aishani_ecommerce"
   
   # NextAuth.js
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Stripe (optional for development)
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   
   # Cloudinary (optional for image uploads)
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses the following main entities:

- **Users**: Customer and admin accounts
- **Products**: Product catalog with categories and inventory
- **Orders**: Customer orders with order items
- **Cart Items**: Shopping cart functionality
- **Order Items**: Individual items within orders

## 🔐 Authentication

The application uses NextAuth.js for authentication with the following features:

- **Email/Password Authentication**: Traditional login system
- **Session Management**: Secure session handling
- **Protected Routes**: Admin-only access to management features
- **User Roles**: Different access levels for customers and admins

### Demo Credentials

- **Admin**: `admin@aishani.com` / `admin123`
- **Customer**: `customer@aishani.com` / `customer123`

## 🛒 Shopping Flow

1. **Browse Products**: Visit the homepage or products page
2. **View Product Details**: Click on any product for detailed information
3. **Add to Cart**: Add products to your shopping cart
4. **Review Cart**: Check your cart and modify quantities
5. **Checkout**: Enter shipping information
6. **Payment**: Complete payment with Stripe
7. **Order Confirmation**: Receive order confirmation and tracking

## 👨‍💼 Admin Features

1. **Access Admin Panel**: Login with admin credentials
2. **View Dashboard**: See sales metrics and recent orders
3. **Manage Products**: Add, edit, or remove products
4. **Process Orders**: Update order status and track fulfillment
5. **View Analytics**: Monitor sales performance and trends

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**: Push your code to a GitHub repository
2. **Connect to Vercel**: Import your repository in Vercel
3. **Configure Environment Variables**: Add all required environment variables
4. **Deploy**: Vercel will automatically deploy your application

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Next.js build command
- **Railway**: Deploy with automatic database provisioning
- **DigitalOcean**: Use App Platform or Droplets
- **AWS**: Deploy using Amplify or EC2

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (customer)/        # Customer-facing pages
│   ├── admin/             # Admin pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   └── layout/           # Layout components
├── lib/                  # Utility functions and configurations
├── prisma/               # Database schema and migrations
├── store/                # Zustand state management
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | No |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | No |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | No |
| `CLOUDINARY_API_KEY` | Cloudinary API key | No |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | No |

### Database Configuration

The application uses PostgreSQL with Prisma ORM. Make sure to:

1. Set up a PostgreSQL database
2. Update the `DATABASE_URL` in your environment variables
3. Run database migrations: `npm run db:push`
4. Seed the database: `npm run db:seed`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Prisma](https://prisma.io/) for the excellent ORM
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Stripe](https://stripe.com/) for payment processing

---

**Built with ❤️ by the Aishani Team**
