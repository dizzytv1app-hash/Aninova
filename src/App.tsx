import React, { useEffect, useState } from 'react'
import type { Product, TabKey } from './lib/types'
import { initTelegram } from './lib/telegram'
import { AppProvider, useApp } from './state/AppContext'
import { BottomNav } from './components/BottomNav'
import { OnboardingOverlay } from './components/OnboardingOverlay'
import { ProductDetail } from './components/ProductDetail'
import { Home } from './pages/Home'
import { Catalog } from './pages/Catalog'
import { Favorites } from './pages/Favorites'
import { Cart } from './pages/Cart'
import { Profile } from './pages/Profile'

const ONBOARDING_KEY = 'dizzy_shop_onboarded'

function Shell() {
  const [tab, setTab] = useState<TabKey>('home')
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem(ONBOARDING_KEY))
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [catalogSearch, setCatalogSearch] = useState('')
  const [orderPlacedNotice, setOrderPlacedNotice] = useState(false)

  const {
    cart, favorites, favoriteIds, loadingCart, loadingFavorites,
    addToCart, updateCartQuantity, removeCartItem, toggleFavorite,
    cartTotal, cartCount, refreshCart,
  } = useApp()

  useEffect(() => {
    initTelegram()
  }, [])

  const finishOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, '1')
    setShowOnboarding(false)
  }

  const handleQuickAdd = async (p: Product) => {
    if (p.stock === 0) return
    await addToCart(p.id, p.sizes[0] ?? null, p.colors[0] ?? null, 1)
  }

  const goSearchInCatalog = (query: string) => {
    setCatalogSearch(query)
    setTab('catalog')
  }

  if (showOnboarding) {
    return <OnboardingOverlay onDone={finishOnboarding} />
  }

  return (
    <div className="min-h-screen bg-bg">
      <main className="pb-24">
        {tab === 'home' && (
          <Home
            favoriteIds={favoriteIds}
            onOpenProduct={setSelectedProduct}
            onToggleFavorite={toggleFavorite}
            onQuickAdd={handleQuickAdd}
            onSearch={goSearchInCatalog}
            onBrowseAll={() => setTab('catalog')}
          />
        )}
        {tab === 'catalog' && (
          <Catalog
            favoriteIds={favoriteIds}
            onOpenProduct={setSelectedProduct}
            onToggleFavorite={toggleFavorite}
            onQuickAdd={handleQuickAdd}
            initialSearch={catalogSearch}
            onConsumeInitialSearch={() => setCatalogSearch('')}
          />
        )}
        {tab === 'favorites' && (
          <Favorites
            favorites={favorites}
            favoriteIds={favoriteIds}
            loading={loadingFavorites}
            onOpenProduct={setSelectedProduct}
            onToggleFavorite={toggleFavorite}
            onQuickAdd={handleQuickAdd}
            onBrowse={() => setTab('catalog')}
          />
        )}
        {tab === 'cart' && (
          <Cart
            cart={cart}
            total={cartTotal}
            loading={loadingCart}
            onUpdateQuantity={updateCartQuantity}
            onRemove={removeCartItem}
            onBrowse={() => setTab('catalog')}
            onOrderPlaced={() => {
              setOrderPlacedNotice(true)
              setTimeout(() => setOrderPlacedNotice(false), 2600)
              refreshCart()
              setTab('profile')
            }}
          />
        )}
        {tab === 'profile' && (
          <Profile onOpenFavorites={() => setTab('favorites')} onReopenOnboarding={() => setShowOnboarding(true)} />
        )}
      </main>

      <BottomNav active={tab} onChange={setTab} cartCount={cartCount} favoriteCount={favorites.length} />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          isFavorite={favoriteIds.has(selectedProduct.id)}
          onClose={() => setSelectedProduct(null)}
          onToggleFavorite={() => toggleFavorite(selectedProduct)}
          onAddToCart={async (size, color, qty) => {
            await addToCart(selectedProduct.id, size, color, qty)
          }}
        />
      )}

      {orderPlacedNotice && (
        <div className="fixed left-1/2 top-6 z-[70] flex -translate-x-1/2 animate-fadeInUp items-center gap-2 rounded-pill bg-accent2 px-4 py-2.5 text-[13px] font-semibold text-bg shadow-lift">
          <span>✅</span> Buyurtma qabul qilindi!
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
