import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api'
import type { CartItem, Product } from '../lib/types'
import { hapticImpact } from '../lib/telegram'

interface AppState {
  cart: CartItem[]
  favorites: Product[]
  favoriteIds: Set<number>
  loadingCart: boolean
  loadingFavorites: boolean
  refreshCart: () => Promise<void>
  refreshFavorites: () => Promise<void>
  addToCart: (productId: number, size: string | null, color: string | null, quantity?: number) => Promise<void>
  updateCartQuantity: (itemId: number, quantity: number) => Promise<void>
  removeCartItem: (itemId: number) => Promise<void>
  toggleFavorite: (product: Product) => Promise<void>
  cartTotal: number
  cartCount: number
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<Product[]>([])
  const [loadingCart, setLoadingCart] = useState(true)
  const [loadingFavorites, setLoadingFavorites] = useState(true)

  const refreshCart = useCallback(async () => {
    try {
      setCart(await api.cart())
    } catch {
      // demo muhitda API hali ulanmagan bo'lishi mumkin — jim o'tkazamiz
    } finally {
      setLoadingCart(false)
    }
  }, [])

  const refreshFavorites = useCallback(async () => {
    try {
      setFavorites(await api.favorites())
    } catch {
      // xuddi shu
    } finally {
      setLoadingFavorites(false)
    }
  }, [])

  useEffect(() => {
    refreshCart()
    refreshFavorites()
  }, [refreshCart, refreshFavorites])

  const addToCart = useCallback(
    async (productId: number, size: string | null, color: string | null, quantity = 1) => {
      hapticImpact('light')
      await api.addToCart({ product_id: productId, size, color, quantity })
      await refreshCart()
    },
    [refreshCart]
  )

  const updateCartQuantity = useCallback(
    async (itemId: number, quantity: number) => {
      await api.updateCartItem(itemId, quantity)
      await refreshCart()
    },
    [refreshCart]
  )

  const removeCartItem = useCallback(
    async (itemId: number) => {
      await api.removeCartItem(itemId)
      await refreshCart()
    },
    [refreshCart]
  )

  const toggleFavorite = useCallback(
    async (product: Product) => {
      hapticImpact('light')
      const isFav = favorites.some((f) => f.id === product.id)
      if (isFav) {
        await api.removeFavorite(product.id)
      } else {
        await api.addFavorite(product.id)
      }
      await refreshFavorites()
    },
    [favorites, refreshFavorites]
  )

  const favoriteIds = new Set(favorites.map((f) => f.id))
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * (1 - i.product.discount_percent / 100) * i.quantity, 0)
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <AppContext.Provider
      value={{
        cart, favorites, favoriteIds, loadingCart, loadingFavorites,
        refreshCart, refreshFavorites, addToCart, updateCartQuantity, removeCartItem,
        toggleFavorite, cartTotal, cartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp AppProvider ichida ishlatilishi kerak')
  return ctx
}
