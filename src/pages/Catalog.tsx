import React, { useEffect, useState } from 'react'
import type { Product } from '../lib/types'
import { api } from '../lib/api'
import { CATEGORIES } from '../lib/categories'
import { ShopHeader } from '../components/ShopHeader'
import { ProductGrid } from '../components/ProductGrid'
import { EmptyState } from '../components/EmptyState'
import { SkeletonGrid } from '../components/Skeleton'

export function Catalog({
  favoriteIds, onOpenProduct, onToggleFavorite, onQuickAdd, initialSearch, onConsumeInitialSearch,
}: {
  favoriteIds: Set<number>
  onOpenProduct: (p: Product) => void
  onToggleFavorite: (p: Product) => void
  onQuickAdd: (p: Product) => void
  initialSearch: string
  onConsumeInitialSearch: () => void
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (initialSearch) {
      setSearch(initialSearch)
      setAppliedSearch(initialSearch)
      setActiveCategory(null)
      onConsumeInitialSearch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSearch])

  useEffect(() => {
    setLoading(true)
    api
      .products({ category: activeCategory || undefined, search: appliedSearch || undefined })
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [activeCategory, appliedSearch])

  const resetFilters = () => {
    setActiveCategory(null)
    setAppliedSearch('')
    setSearch('')
  }

  return (
    <div className="pb-4">
      <ShopHeader
        search={search}
        onSearchChange={setSearch}
        onSearchSubmit={() => {
          setActiveCategory(null)
          setAppliedSearch(search)
        }}
      />

      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto px-4">
        <button
          onClick={resetFilters}
          className={`pressable flex-shrink-0 rounded-pill border px-4 py-2.5 text-[13px] font-medium transition-colors duration-200 ${
            activeCategory === null
              ? 'border-transparent bg-accent text-white shadow-glow'
              : 'border-line bg-surface text-muted'
          }`}
        >
          Barchasi
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.slug}
            onClick={() => {
              setActiveCategory(c.slug)
              setAppliedSearch('')
              setSearch('')
            }}
            className={`pressable flex-shrink-0 rounded-pill border px-4 py-2.5 text-[13px] font-medium transition-colors duration-200 ${
              activeCategory === c.slug
                ? 'border-transparent bg-accent text-white shadow-glow'
                : 'border-line bg-surface text-muted'
            }`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {loading && <SkeletonGrid />}
      {!loading && products.length === 0 && (
        <EmptyState
          emoji="🔎"
          title="Hech narsa topilmadi"
          subtitle="Boshqa so'z bilan qidirib ko'ring yoki filtrni tozalang"
          actionLabel={activeCategory || appliedSearch ? 'Filtrni tozalash' : undefined}
          onAction={activeCategory || appliedSearch ? resetFilters : undefined}
        />
      )}
      {!loading && products.length > 0 && (
        <ProductGrid products={products} favoriteIds={favoriteIds} onOpen={onOpenProduct} onToggleFavorite={onToggleFavorite} onQuickAdd={onQuickAdd} />
      )}
    </div>
  )
}
