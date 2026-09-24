import React from 'react'
import type { Product } from '../lib/types'
import { ProductGrid } from '../components/ProductGrid'
import { EmptyState } from '../components/EmptyState'
import { SkeletonGrid } from '../components/Skeleton'

export function Favorites({
  favorites, favoriteIds, loading, onOpenProduct, onToggleFavorite, onQuickAdd, onBrowse,
}: {
  favorites: Product[]
  favoriteIds: Set<number>
  loading: boolean
  onOpenProduct: (p: Product) => void
  onToggleFavorite: (p: Product) => void
  onQuickAdd: (p: Product) => void
  onBrowse: () => void
}) {
  return (
    <div className="pb-4" style={{ paddingTop: 'calc(var(--safe-top) + 18px)' }}>
      <div className="mb-5 px-4">
        <h1 className="font-display text-[21px] font-bold text-ink">❤️ Sevimlilar</h1>
        {!loading && favorites.length > 0 && (
          <p className="mt-1 text-[13px] text-muted">{favorites.length} ta mahsulot</p>
        )}
      </div>

      {loading && <SkeletonGrid count={4} />}
      {!loading && favorites.length === 0 && (
        <EmptyState
          emoji="🤍"
          title="Sevimlilar bo'sh"
          subtitle="Yoqqan mahsulotlarni ❤️ tugmasi bilan shu yerga qo'shing"
          actionLabel="Katalogga o'tish"
          onAction={onBrowse}
        />
      )}
      {!loading && favorites.length > 0 && (
        <ProductGrid products={favorites} favoriteIds={favoriteIds} onOpen={onOpenProduct} onToggleFavorite={onToggleFavorite} onQuickAdd={onQuickAdd} />
      )}
    </div>
  )
}
