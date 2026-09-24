import { getInitData } from './telegram'
import type { Product, CartItem, Order } from './types'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Telegram-Init-Data': getInitData(),
      ...(options.headers || {}),
    },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `So'rov xato qaytardi (${res.status})`)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export function imageUrl(fileId: string | null): string | undefined {
  if (!fileId) return undefined
  return `${API_BASE}/files/${fileId}`
}

export const api = {
  me: () => request<{ id: number; username: string | null; first_name: string | null }>('/me'),

  products: (params: { category?: string; search?: string; section?: string } = {}) => {
    const q = new URLSearchParams(params as Record<string, string>).toString()
    return request<Product[]>(`/products${q ? `?${q}` : ''}`)
  },
  product: (id: number) => request<Product>(`/products/${id}`),

  favorites: () => request<Product[]>('/favorites'),
  addFavorite: (product_id: number) => request('/favorites', { method: 'POST', body: JSON.stringify({ product_id }) }),
  removeFavorite: (product_id: number) => request(`/favorites/${product_id}`, { method: 'DELETE' }),

  cart: () => request<CartItem[]>('/cart'),
  addToCart: (data: { product_id: number; size?: string | null; color?: string | null; quantity?: number }) =>
    request('/cart', { method: 'POST', body: JSON.stringify(data) }),
  updateCartItem: (id: number, quantity: number) => request(`/cart/${id}`, { method: 'PUT', body: JSON.stringify({ quantity }) }),
  removeCartItem: (id: number) => request(`/cart/${id}`, { method: 'DELETE' }),

  checkout: () => request<Order>('/orders', { method: 'POST', body: JSON.stringify({}) }),
  orders: () => request<Order[]>('/orders'),

  content: (key: string) => request<{ key: string; value: string }>(`/content/${key}`),
}
