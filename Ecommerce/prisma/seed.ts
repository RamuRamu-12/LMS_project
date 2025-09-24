import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminHashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aishani.com' },
    update: {},
    create: {
      email: 'admin@aishani.com',
      name: 'Admin User',
      password: adminHashedPassword,
    },
  })

  // Create customer user
  const customerHashedPassword = await bcrypt.hash('customer123', 12)
  
  const customer = await prisma.user.upsert({
    where: { email: 'customer@aishani.com' },
    update: {},
    create: {
      email: 'customer@aishani.com',
      name: 'Customer User',
      password: customerHashedPassword,
    },
  })

  // Create sample products
  const products = [
    {
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      stock: 50,
      category: 'Electronics',
    },
    {
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracking with heart rate monitor, GPS, and water resistance.',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      stock: 30,
      category: 'Electronics',
    },
    {
      name: 'Organic Cotton T-Shirt',
      description: 'Comfortable, sustainable cotton t-shirt in various colors and sizes.',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      stock: 100,
      category: 'Clothing',
    },
    {
      name: 'Minimalist Backpack',
      description: 'Sleek, durable backpack perfect for daily use or travel.',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      stock: 25,
      category: 'Accessories',
    },
    {
      name: 'Bluetooth Speaker',
      description: 'Portable speaker with 360-degree sound and 12-hour battery life.',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
      stock: 40,
      category: 'Electronics',
    },
    {
      name: 'Leather Wallet',
      description: 'Genuine leather wallet with RFID blocking technology.',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      stock: 60,
      category: 'Accessories',
    },
    {
      name: 'Coffee Maker',
      description: 'Programmable coffee maker with thermal carafe and auto-shutoff.',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
      stock: 20,
      category: 'Home & Kitchen',
    },
    {
      name: 'Yoga Mat',
      description: 'Non-slip yoga mat with carrying strap and alignment lines.',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
      stock: 75,
      category: 'Sports & Fitness',
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    })
  }

  console.log('Database seeded successfully!')
  console.log('Admin user created: admin@aishani.com / admin123')
  console.log('Customer user created: customer@aishani.com / customer123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
