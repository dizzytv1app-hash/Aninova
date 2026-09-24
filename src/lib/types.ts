export interface Product {
  id: number
  name: string
  price: number
  sizes: string[]
  colors: string[]
  stock: number
  image_file_id: string | null
  category: string
  is_new: boolean
  discount_percent: number
}

export interface CartItem {
  id: number
  product: Product
  size: string | null
  color: string | null
  quantity: number
}

export interface OrderItem {
  product_name: string
  size: string | null
  color: string | null
  quantity: number
  price: number
}

export interface Order {
  id: number
  total_price: number
  status: 'new' | 'processing' | 'completed' | 'cancelled'
  created_at: string
  items: OrderItem[]
}

export type CategorySlug = 'clothing' | 'anime' | 'gaming' | 'streetwear' | 'shoes' | 'accessories'

export interface CategoryDef {
  slug: CategorySlug
  label: string
  emoji: string
}

export type TabKey = 'home' | 'catalog' | 'favorites' | 'cart' | 'profile'
