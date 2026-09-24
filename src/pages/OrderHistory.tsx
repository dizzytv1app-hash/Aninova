import React, { useEffect, useState } from 'react'
import type { Order } from '../lib/types'
import { api } from '../lib/api'
import { formatSom } from '../lib/categories'
import { EmptyState } from '../components/EmptyState'
import { SkeletonLine } from '../components/Skeleton'

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  new: { label: '🆕 Yangi', className: 'bg-accent/15 text-accentSoft' },
  processing: { label: '⏳ Jarayonda', className: 'bg-gold/15 text-gold' },
  completed: { label: '✅ Bajarildi', className: 'bg-accent2/15 text-accent2' },
  cancelled: { label: '🚫 Bekor qilindi', className: 'bg-danger/15 text-danger' },
}

export function OrderHistory({ onBack }: { onBack: () => void }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.orders().then(setOrders).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="animate-fadeIn pb-4" style={{ paddingTop: 'calc(var(--safe-top) + 18px)' }}>
      <div className="mb-5 flex items-center gap-3 px-4">
        <button onClick={onBack} className="pressable flex h-9 w-9 items-center justify-center rounded-full bg-surface text-[16px] text-ink">
          ←
        </button>
        <h1 className="font-display text-[18px] font-bold text-ink">📦 Buyurtmalarim</h1>
      </div>

      {loading && (
        <div className="flex flex-col gap-3 px-4">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-card border border-line bg-surface p-3.5">
              <SkeletonLine className="h-3 w-1/3" />
              <SkeletonLine className="mt-2 h-2.5 w-1/2" />
              <SkeletonLine className="mt-3 h-2.5 w-2/3" />
            </div>
          ))}
        </div>
      )}
      {!loading && orders.length === 0 && <EmptyState emoji="📦" title="Hali buyurtma yo'q" subtitle="Birinchi demo buyurtmangiz shu yerda ko'rinadi" />}

      <div className="stagger flex flex-col gap-3 px-4">
        {orders.map((o) => {
          const status = STATUS_STYLES[o.status] || { label: o.status, className: 'bg-surface2 text-muted' }
          return (
            <div key={o.id} className="rounded-card border border-line bg-surface p-3.5 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-[13.5px] font-semibold text-ink">Buyurtma #{o.id}</span>
                <span className={`rounded-pill px-2.5 py-1 text-[11px] font-semibold ${status.className}`}>{status.label}</span>
              </div>
              <p className="mt-0.5 text-[11px] text-faint">{new Date(o.created_at).toLocaleString('uz-UZ')}</p>
              <div className="mt-2.5 flex flex-col gap-1 border-t border-line pt-2.5">
                {o.items.map((it, idx) => (
                  <p key={idx} className="text-[12px] text-muted">
                    {it.product_name} <span className="text-faint">×{it.quantity}</span>{' '}
                    {[it.size, it.color].filter(Boolean).join(' · ')}
                  </p>
                ))}
              </div>
              <div className="mt-2.5 flex justify-between border-t border-line pt-2.5">
                <span className="text-[12px] text-muted">Jami</span>
                <span className="text-[14px] font-semibold text-ink">{formatSom(o.total_price)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
