import React, { useState } from 'react'
import type { Product } from '../lib/types'
import { imageUrl } from '../lib/api'
import { formatSom } from '../lib/categories'

export function ProductCard({
  product, isFavorite, onOpen, onToggleFavorite, onQuickAdd,
}: {
  product: Product
  isFavorite: boolean
  onOpen: () => void
  onToggleFavorite: () => void
  onQuickAdd: () => void
}) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const discounted = product.discount_percent > 0
  const finalPrice = product.price * (1 - product.discount_percent / 100)
  const img = imageUrl(product.image_file_id)
  const outOfStock = product.stock === 0

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (outOfStock) return
    onQuickAdd()
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 900)
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-soft transition-all duration-300 ease-premium active:scale-[0.98]">
      <button onClick={onOpen} className="relative block aspect-[3/4] w-full overflow-hidden bg-surface2">
        {!imgLoaded && img && <div className="skeleton absolute inset-0" />}
        {img ? (
          <img
            src={img}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-500 ease-premium ${
              imgLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            } group-active:scale-[1.03]`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface2 to-surface3 text-3xl">👕</div>
        )}

        {discounted && (
          <span className="absolute left-2 top-2 rounded-pill bg-accent2 px-2 py-0.5 text-[10.5px] font-bold tracking-wide text-bg shadow-lg">
            −{product.discount_percent}%
          </span>
        )}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg/60 backdrop-blur-[1px]">
            <span className="rounded-pill border border-line2 bg-bg/80 px-3 py-1 text-[11px] font-medium text-muted">
              Sotuvda yo'q
            </span>
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite()
          }}
          className="pressable absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-bg/60 text-[13px] backdrop-blur-md"
        >
          <span className={isFavorite ? 'animate-popIn' : ''}>{isFavorite ? '❤️' : '🤍'}</span>
        </button>
      </button>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="line-clamp-2 text-[12.5px] font-medium leading-tight text-ink/90">{product.name}</p>
        <div className="mt-auto flex items-center justify-between gap-1 pt-0.5">
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[14px] font-semibold text-ink">{formatSom(finalPrice)}</span>
            {discounted && <span className="text-[10.5px] text-faint line-through">{formatSom(product.price)}</span>}
          </div>
          <button
            onClick={handleQuickAdd}
            disabled={outOfStock}
            className={`pressable relative flex h-7 w-7 items-center justify-center rounded-full text-[15px] font-medium text-white transition-colors disabled:opacity-25 ${
              justAdded ? 'bg-accent2 text-bg' : 'bg-accent'
            }`}
          >
            {justAdded ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  )
}
