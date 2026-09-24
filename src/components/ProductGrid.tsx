import React from 'react'
import type { Product } from '../lib/types'
import { ProductCard } from './ProductCard'

interface Props {
  products: Product[]
  favoriteIds: Set<number>
  onOpen: (product: Product) => void
  onToggleFavorite: (product: Product) => void
  onQuickAdd: (product: Product) => void
}

export function ProductGrid({ products, favoriteIds, onOpen, onToggleFavorite, onQuickAdd }: Props) {
  return (
    <div className="stagger grid grid-cols-2 gap-3 px-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          isFavorite={favoriteIds.has(p.id)}
          onOpen={() => onOpen(p)}
          onToggleFavorite={() => onToggleFavorite(p)}
          onQuickAdd={() => onQuickAdd(p)}
        />
      ))}
    </div>
  )
}

export function ProductRow({ products, favoriteIds, onOpen, onToggleFavorite, onQuickAdd }: Props) {
  return (
    <div className="stagger no-scrollbar flex gap-3 overflow-x-auto px-4 pb-1">
      {products.map((p) => (
        <div key={p.id} className="w-[42vw] min-w-[150px] max-w-[180px] flex-shrink-0">
          <ProductCard
            product={p}
            isFavorite={favoriteIds.has(p.id)}
            onOpen={() => onOpen(p)}
            onToggleFavorite={() => onToggleFavorite(p)}
            onQuickAdd={() => onQuickAdd(p)}
          />
        </div>
      ))}
    </div>
  )
}
