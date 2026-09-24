import React, { useEffect, useState } from 'react'
import { api } from '../lib/api'

export function OnboardingOverlay({ onDone }: { onDone: () => void }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .content('onboarding')
      .then((c) => setText(c.value))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-bg px-7 text-center"
      style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'var(--safe-bottom)' }}
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 animate-floatGlow rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-accent2/10 blur-3xl" />

      <div className="relative flex h-20 w-20 animate-scaleIn items-center justify-center rounded-3xl bg-gradient-to-br from-accent to-[#9B6CFF] text-4xl shadow-glow">
        🛍️
      </div>

      <h1 className="relative mt-6 animate-fadeInUp font-display text-[26px] font-bold tracking-tight text-ink">
        Dizzy <span className="text-accent">Shop</span>
      </h1>

      {!loading && (
        <p className="relative mt-4 max-w-[300px] animate-fadeInUp whitespace-pre-line text-[14px] leading-relaxed text-muted" style={{ animationDelay: '80ms' }}>
          {text}
        </p>
      )}

      <div className="relative mt-7 flex animate-fadeInUp flex-col gap-2.5" style={{ animationDelay: '140ms' }}>
        {['Mahsulotlarni ko\'rib chiqing', 'Sevimlilarga qo\'shing', 'Demo buyurtma bering'].map((line) => (
          <div key={line} className="flex items-center gap-2.5 rounded-pill border border-line bg-surface px-4 py-2 text-[12.5px] text-ink">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent2 text-[10px] text-bg">✓</span>
            {line}
          </div>
        ))}
      </div>

      <button
        onClick={onDone}
        className="pressable relative mt-8 w-full max-w-xs animate-fadeInUp rounded-pill bg-accent py-4 text-[15px] font-semibold text-white shadow-glow"
        style={{ animationDelay: '200ms' }}
      >
        Boshlash
      </button>
    </div>
  )
}
