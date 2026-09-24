import React, { useEffect, useState } from 'react'
import type { Product } from '../lib/types'
import { imageUrl } from '../lib/api'
import { formatSom } from '../lib/categories'
import { setMainButton, hideMainButton } from '../lib/telegram'

export function ProductDetail({
  product, isFavorite, onClose, onToggleFavorite, onAddToCart,
}: {
  product: Product
  isFavorite: boolean
  onClose: () => void
  onToggleFavorite: () => void
  onAddToCart: (size: string | null, color: string | null, quantity: number) => Promise<void>
}) {
  const [size, setSize] = useState<string | null>(product.sizes[0] ?? null)
  const [color, setColor] = useState<string | null>(product.colors[0] ?? null)
  const [qty, setQty] = useState(1)
  const [adding, setAdding] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const outOfStock = product.stock === 0
  const finalPrice = product.price * (1 - product.discount_percent / 100)

  const handleAdd = async () => {
    if (outOfStock || adding) return
    setAdding(true)
    try {
      await onAddToCart(size, color, qty)
      onClose()
    } finally {
      setAdding(false)
    }
  }

  useEffect(() => {
    if (outOfStock) {
      hideMainButton()
      return
    }
    setMainButton(`🛒 Savatga qo'shish — ${formatSom(finalPrice * qty)}`, handleAdd)
    return () => hideMainButton()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, color, qty, outOfStock])

  const img = imageUrl(product.image_file_id)

  return (
    <div className="fixed inset-0 z-50 flex animate-fadeIn flex-col bg-bg" style={{ paddingTop: 'var(--safe-top)' }}>
      <div className="relative aspect-square w-full flex-shrink-0 bg-surface">
        {!imgLoaded && <div className="skeleton absolute inset-0" />}
        {img ? (
          <img
            src={img}
            alt={product.name}
            onLoad={() => setImgLoaded(true)}
            className={`h-full w-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface2 to-surface3 text-6xl">👕</div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/70 to-transparent" />

        <button
          onClick={onClose}
          className="pressable absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-bg/60 text-[17px] text-ink backdrop-blur-md"
        >
          ←
        </button>
        <button
          onClick={onToggleFavorite}
          className="pressable absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-bg/60 text-[17px] backdrop-blur-md"
        >
          <span className={isFavorite ? 'animate-popIn inline-block' : ''}>{isFavorite ? '❤️' : '🤍'}</span>
        </button>
        {product.discount_percent > 0 && (
          <span className="absolute left-3 bottom-3 rounded-pill bg-accent2 px-3 py-1.5 text-[12px] font-bold text-bg shadow-lg">
            −{product.discount_percent}% chegirma
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto rounded-t-sheet bg-bg px-5 pb-32 pt-5 -mt-4 relative animate-fadeInUp">
        <div className="mx-auto mb-4 h-1 w-10 rounded-pill bg-line2" />

        <h1 className="font-display text-[20px] font-semibold leading-snug text-ink">{product.name}</h1>
        <div className="mt-2 flex items-baseline gap-2.5">
          <span className="font-display text-[22px] font-bold text-accent">{formatSom(finalPrice)}</span>
          {product.discount_percent > 0 && (
            <span className="text-[14px] text-faint line-through">{formatSom(product.price)}</span>
          )}
        </div>
        <p className={`mt-1.5 text-[13px] ${outOfStock ? 'text-danger' : 'text-muted'}`}>
          {outOfStock ? "⚠️ Hozircha sotuvda yo'q" : `📦 Omborda: ${product.stock} dona mavjud`}
        </p>

        {product.sizes.length > 0 && (
          <div className="mt-6">
            <p className="mb-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-muted">O'lcham</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`pressable min-w-[46px] rounded-xl2 border px-3.5 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                    size === s ? 'border-accent bg-accent text-white shadow-glow' : 'border-line bg-surface text-ink'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.colors.length > 0 && (
          <div className="mt-6">
            <p className="mb-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-muted">Rang</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`pressable rounded-xl2 border px-3.5 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                    color === c ? 'border-accent bg-accent text-white shadow-glow' : 'border-line bg-surface text-ink'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <p className="mb-2.5 text-[12.5px] font-semibold uppercase tracking-wide text-muted">Miqdor</p>
          <div className="flex items-center gap-4 rounded-pill bg-surface px-2 py-2 w-fit border border-line">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="pressable flex h-9 w-9 items-center justify-center rounded-full bg-surface2 text-[16px] text-ink"
            >
              −
            </button>
            <span className="w-5 text-center text-[15px] font-medium text-ink">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))}
              className="pressable flex h-9 w-9 items-center justify-center rounded-full bg-surface2 text-[16px] text-ink"
            >
              +
            </button>
          </div>
        </div>

        {/* Telegram MainButton ishlamaydigan (masalan brauzerda test) holatlar uchun zaxira tugma */}
        <button
          onClick={handleAdd}
          disabled={outOfStock || adding}
          className="pressable mt-8 w-full rounded-pill bg-accent py-4 text-[15px] font-semibold text-white shadow-glow disabled:opacity-40"
        >
          {outOfStock ? "Sotuvda yo'q" : `🛒 Savatga qo'shish — ${formatSom(finalPrice * qty)}`}
        </button>
      </div>
    </div>
  )
}
