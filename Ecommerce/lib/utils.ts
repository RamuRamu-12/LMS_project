import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `ORD-${timestamp}-${random}`
}

export function calculateTax(amount: number, taxRate: number = 0.08): number {
  return Math.round(amount * taxRate * 100) / 100
}

export function calculateShipping(amount: number): number {
  if (amount >= 100) return 0 // Free shipping over $100
  return 9.99
}
