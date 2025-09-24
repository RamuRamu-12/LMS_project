import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

// Mock the cart store
jest.mock('@/store/cart-store', () => ({
  useCartStore: () => ({
    addItem: jest.fn(),
  }),
}))

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />)
    expect(screen.getByText('Welcome to Aishani')).toBeInTheDocument()
  })

  it('renders the hero section', () => {
    render(<HomePage />)
    expect(screen.getByText('Shop Amazing Products')).toBeInTheDocument()
  })

  it('renders featured products section', () => {
    render(<HomePage />)
    expect(screen.getByText('Featured Products')).toBeInTheDocument()
  })

  it('renders shop now button', () => {
    render(<HomePage />)
    expect(screen.getByText('Shop Now')).toBeInTheDocument()
  })
})
