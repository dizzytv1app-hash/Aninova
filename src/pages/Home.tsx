import React, { useEffect, useState } from 'react'
import type { Product } from '../lib/types'
import { api } from '../lib/api'
import { ShopHeader } from '../components/ShopHeader'
import { ProductRow } from '../components/ProductGrid'
import { EmptyState } from '../components/EmptyState'
import { SkeletonRow, SkeletonBanner } from '../components/Skeleton'

export function Home({
  favoriteIds, onOpenProduct, onToggleFavorite, onQuickAdd, onSearch, onBrowseAll,
}: {
  favoriteIds: Set<number>
  onOpenProduct: (p: Product) => void
  onToggleFavorite: (p: Product) => void
  onQuickAdd: (p: Product) => void
  onSearch: (query: string) => void
  onBrowseAll: () => void
}) {
  const [search, setSearch] = useState('')
  const [newProducts, setNewProducts] = useState<Product[]>([])
  const [popular, setPopular] = useState<Product[]>([])
  const [discounted, setDiscounted] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.products({ section: 'new' }),
      api.products({ section: 'popular' }),
      api.products({ section: 'discount' }),
    ])
      .then(([n, p, d]) => {
        setNewProducts(n)
        setPopular(p)
        setDiscounted(d)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const rowProps = { favoriteIds, onOpen: onOpenProduct, onToggleFavorite, onQuickAdd }
  const isEmpty = !loading && newProducts.length === 0 && popular.length === 0 && discounted.length === 0

  return (
    <div className="pb-4">
      <ShopHeader search={search} onSearchChange={setSearch} onSearchSubmit={() => onSearch(search)} subtitle="Zamonaviy kiyim-kechak" />

      {/* Hero banner — layered gradient with soft glow accents */}
      <div className="relative mx-4 mb-7 animate-fadeInUp overflow-hidden rounded-card border border-line/60 bg-gradient-to-br from-[#4B2FD6] via-accent to-[#9B6CFF] px-5 pb-6 pt-7 shadow-lift">
        <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 animate-floatGlow rounded-full bg-accent2/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
        <p className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">Yangi mavsum · 2026</p>
        <p className="relative mt-2 max-w-[75%] font-display text-[23px] font-bold leading-[1.15] text-white">
          Streetwear &amp; Anime kolleksiyasi
        </p>
        <p className="relative mt-2 max-w-[80%] text-[13px] leading-relaxed text-white/80">
          Sevimlilaringizni tanlang, bir necha bosishda demo buyurtma bering.
        </p>
        <button
          onClick={onBrowseAll}
          className="pressable relative mt-4 inline-flex items-center gap-1.5 rounded-pill bg-white px-4 py-2.5 text-[12.5px] font-semibold text-bg shadow-lg"
        >
          Katalogni ko'rish <span>→</span>
        </button>
      </div>

      {loading && (
        <div className="flex flex-col gap-7">
          <SkeletonRow />
          <SkeletonRow />
        </div>
      )}

      {isEmpty && (
        <EmptyState emoji="🛍️" title="Hali mahsulot yo'q" subtitle="Admin tez orada yangi mahsulotlar qo'shadi — birozdan so'ng qayta tekshiring" />
      )}

      {!loading && newProducts.length > 0 && (
        <section className="mb-7 animate-fadeInUp">
          <div className="mb-3 flex items-center justify-between px-4">
            <h2 className="font-display text-[16px] font-semibold text-ink">🆕 Yangi kelganlar</h2>
          </div>
          <ProductRow products={newProducts} {...rowProps} />
        </section>
      )}

      {!loading && popular.length > 0 && (
        <section className="mb-7 animate-fadeInUp">
          <div className="mb-3 flex items-center justify-between px-4">
            <h2 className="font-display text-[16px] font-semibold text-ink">🔥 Mashhur mahsulotlar</h2>
          </div>
          <ProductRow products={popular} {...rowProps} />
        </section>
      )}

      {!loading && discounted.length > 0 && (
        <section className="mb-2 animate-fadeInUp">
          <div className="mb-3 flex items-center justify-between px-4">
            <h2 className="font-display text-[16px] font-semibold text-ink">
              <span className="text-accent2">🏷️</span> Chegirmadagilar
            </h2>
          </div>
          <ProductRow products={discounted} {...rowProps} />
        </section>
      )}
    </div>
  )
}
