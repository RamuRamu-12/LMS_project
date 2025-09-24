'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, ArrowLeft, Plus, Minus, ShoppingCart, Heart, Truck, Shield, RotateCcw, CheckCircle, Package, Award, Users, MessageCircle } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  stock: number
  category: string
  isActive: boolean
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCartStore()

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string)
    }
  }, [params.id])

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`)
      const data = await response.json()
      if (data.success) {
        setProduct(data.data)
      } else {
        toast.error('Product not found')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Error loading product')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    
    toast.success(`${product.name} added to cart!`)
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product?.stock!) {
      setQuantity(newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button asChild>
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-300 mb-8">
          <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-emerald-400 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
              <Image
                src={product.image || '/placeholder-product.jpg'}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-6 py-3 bg-red-500/90">
                    Out of Stock
                  </Badge>
                </div>
              )}
              {/* Image overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Additional product images placeholder */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square relative overflow-hidden rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:border-emerald-400/50 transition-colors">
                  <Image
                    src={product.image || '/placeholder-product.jpg'}
                    alt={`${product.name} view ${i}`}
                    fill
                    className="object-cover opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="glass-effect p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-gradient-to-r from-emerald-500 to-purple-500 text-white px-4 py-2">
                  {product.category}
                </Badge>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-white">4.8</span>
                  <span className="ml-1 text-sm text-gray-300">(124 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4 gradient-text">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </p>
                <div className="text-sm text-gray-300">
                  <p className="line-through text-gray-500">{formatPrice(product.price * 1.2)}</p>
                  <p className="text-emerald-400 font-medium">Save 20%</p>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-6">
                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                <span className="text-sm text-gray-300">
                  {product.stock > 0 ? (
                    <span className="text-emerald-400 font-medium">
                      {product.stock} items in stock
                    </span>
                  ) : (
                    <span className="text-red-400 font-medium">Out of stock</span>
                  )}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-white">Description</h3>
              <p className="text-gray-300 leading-relaxed text-lg">{product.description}</p>
            </div>

            {/* Key Features */}
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-white">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Premium Quality Materials",
                  "Advanced Technology",
                  "Eco-Friendly Design",
                  "Long-lasting Durability",
                  "Easy to Use",
                  "Modern Aesthetic"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-white">Specifications</h3>
              <div className="space-y-3">
                {[
                  { label: "Brand", value: "Unicart" },
                  { label: "Model", value: "UC-2024" },
                  { label: "Weight", value: "1.2 kg" },
                  { label: "Dimensions", value: "25 x 15 x 8 cm" },
                  { label: "Warranty", value: "2 Years" },
                  { label: "Origin", value: "Made in USA" }
                ].map((spec, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-gray-400 font-medium">{spec.label}</span>
                    <span className="text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-white">Purchase Options</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-3 text-gray-300">Quantity</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-white/20 rounded-lg bg-white/5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="text-white hover:bg-white/10"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-6 py-3 min-w-[4rem] text-center text-white font-medium">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stock}
                        className="text-white hover:bg-white/10"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-gray-400">Max: {product.stock}</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-purple-500 hover:from-emerald-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 hover:border-emerald-400/50"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    Total: <span className="text-white font-semibold text-lg">{formatPrice(product.price * quantity)}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-white">Shipping & Returns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="text-white font-medium">Free Shipping</p>
                      <p className="text-sm text-gray-400">On orders over $100</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="text-white font-medium">30-Day Returns</p>
                      <p className="text-sm text-gray-400">No questions asked</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="text-white font-medium">Secure Payment</p>
                      <p className="text-sm text-gray-400">SSL encrypted checkout</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="text-white font-medium">24/7 Support</p>
                      <p className="text-sm text-gray-400">Always here to help</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-16 space-y-12">
          {/* Customer Reviews */}
          <div className="glass-effect p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white font-semibold">4.8</span>
                <span className="text-gray-400">(124 reviews)</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Sarah Johnson", rating: 5, comment: "Absolutely love this product! Quality is outstanding and delivery was super fast." },
                { name: "Mike Chen", rating: 5, comment: "Great value for money. Would definitely recommend to friends and family." },
                { name: "Emily Davis", rating: 4, comment: "Very satisfied with my purchase. The product exceeded my expectations." }
              ].map((review, index) => (
                <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">{review.name}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          <div className="glass-effect p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group cursor-pointer">
                  <div className="aspect-square relative overflow-hidden rounded-xl bg-white/5 border border-white/10 group-hover:border-emerald-400/50 transition-colors">
                    <Image
                      src={product.image || '/placeholder-product.jpg'}
                      alt="Related product"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">Related Product {item}</h3>
                    <p className="text-emerald-400 font-semibold">{formatPrice(product.price * 0.8)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Products */}
        <div className="mt-12 text-center">
          <Button 
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:border-emerald-400/50 px-8 py-3"
            asChild
          >
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
