# Deployment Guide - Aishani E-Commerce Platform

This guide will help you deploy the Aishani E-Commerce Platform to production.

## 🚀 Quick Start with Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account
- PostgreSQL database (Neon, Supabase, or Railway)

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Ensure all environment variables are documented in `env.example`

### Step 2: Set Up Database
1. Create a PostgreSQL database (recommended: [Neon](https://neon.tech/))
2. Copy the connection string
3. Note: You'll need this for the next step

### Step 3: Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   NEXTAUTH_SECRET=your_random_secret_key
   NEXTAUTH_URL=https://your-domain.vercel.app
   STRIPE_SECRET_KEY=sk_live_... (if using Stripe)
   STRIPE_PUBLISHABLE_KEY=pk_live_... (if using Stripe)
   ```
5. Click "Deploy"

### Step 4: Set Up Database Schema
1. After deployment, run database migrations:
   ```bash
   # Connect to your Vercel project
   vercel env pull .env.local
   
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample data
   npm run db:seed
   ```

## 🐳 Docker Deployment

### Create Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Create docker-compose.yml
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/aishani_ecommerce
      - NEXTAUTH_SECRET=your-secret-key
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=aishani_ecommerce
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Deploy with Docker
```bash
# Build and run
docker-compose up -d

# Run database migrations
docker-compose exec app npm run db:push
docker-compose exec app npm run db:seed
```

## ☁️ Other Cloud Platforms

### Railway
1. Connect your GitHub repository
2. Add PostgreSQL database
3. Set environment variables
4. Deploy automatically

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy

### DigitalOcean App Platform
1. Create new app from GitHub
2. Add PostgreSQL database
3. Configure environment variables
4. Deploy

## 🔧 Environment Variables

### Required Variables
```env
DATABASE_URL=postgresql://username:password@host:port/database
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.com
```

### Optional Variables
```env
# Stripe (for payments)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (for notifications)
RESEND_API_KEY=re_...
```

## 🗄️ Database Setup

### Using Neon (Recommended)
1. Go to [Neon](https://neon.tech/)
2. Create a new project
3. Copy the connection string
4. Use it as your `DATABASE_URL`

### Using Supabase
1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Use it as your `DATABASE_URL`

### Using Railway
1. Go to [Railway](https://railway.app/)
2. Create a new PostgreSQL database
3. Copy the connection string
4. Use it as your `DATABASE_URL`

## 🔐 Security Considerations

### Production Checklist
- [ ] Use strong, unique `NEXTAUTH_SECRET`
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up proper CORS policies
- [ ] Use environment variables for all secrets
- [ ] Enable database SSL connections
- [ ] Set up proper error monitoring
- [ ] Configure rate limiting
- [ ] Set up backup strategies

### SSL Certificates
- Vercel: Automatic SSL
- Other platforms: Configure SSL certificates
- Use Let's Encrypt for free SSL

## 📊 Monitoring and Analytics

### Recommended Tools
- **Vercel Analytics**: Built-in with Vercel
- **Sentry**: Error tracking
- **Google Analytics**: User analytics
- **Uptime Robot**: Uptime monitoring

### Setting Up Monitoring
1. Add Sentry to your project:
   ```bash
   npm install @sentry/nextjs
   ```

2. Configure in `sentry.client.config.js`:
   ```javascript
   import * as Sentry from "@sentry/nextjs";

   Sentry.init({
     dsn: "YOUR_SENTRY_DSN",
     tracesSampleRate: 1.0,
   });
   ```

## 🚀 Performance Optimization

### Build Optimization
- Enable Next.js Image Optimization
- Use CDN for static assets
- Enable compression
- Optimize bundle size

### Database Optimization
- Add proper indexes
- Use connection pooling
- Monitor query performance
- Set up database backups

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check `DATABASE_URL` format
   - Ensure database is accessible
   - Check SSL requirements

2. **Build Failures**
   - Check Node.js version (18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

3. **Authentication Issues**
   - Verify `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches your domain
   - Ensure database has user table

4. **Payment Issues**
   - Verify Stripe keys are correct
   - Check webhook endpoints
   - Test with Stripe test mode first

### Getting Help
- Check the [Issues](https://github.com/your-repo/issues) page
- Review the [README](README.md) for setup instructions
- Contact the development team

## 📈 Scaling Considerations

### Horizontal Scaling
- Use load balancers
- Implement database read replicas
- Use CDN for static assets
- Consider microservices architecture

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Use caching strategies
- Monitor performance metrics

---

**Happy Deploying! 🚀**

For more detailed information, refer to the [README](README.md) file.
