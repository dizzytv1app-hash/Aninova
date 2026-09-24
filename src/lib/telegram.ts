// Telegram tomonidan index.html'ga ulangan global obyekt
declare global {
  interface Window {
    Telegram?: {
      WebApp: any
    }
  }
}

export function getTelegramWebApp() {
  return typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined
}

export function initTelegram() {
  const tg = getTelegramWebApp()
  if (!tg) return
  tg.ready()
  tg.expand()
  applyTelegramTheme()
}

export function applyTelegramTheme() {
  const tg = getTelegramWebApp()
  if (!tg) return
  const root = document.documentElement
  const p = tg.themeParams || {}
  // Telegram bergan ranglarni CSS o'zgaruvchilariga o'tkazamiz (mavjud bo'lsa)
  if (p.bg_color) root.style.setProperty('--tg-bg', p.bg_color)
  if (p.text_color) root.style.setProperty('--tg-text', p.text_color)
}

export function getInitData(): string {
  return getTelegramWebApp()?.initData || ''
}

export function getTelegramUser() {
  return getTelegramWebApp()?.initDataUnsafe?.user
}

export function hapticSelect() {
  getTelegramWebApp()?.HapticFeedback?.selectionChanged?.()
}

export function hapticImpact(style: 'light' | 'medium' | 'heavy' = 'light') {
  getTelegramWebApp()?.HapticFeedback?.impactOccurred?.(style)
}

export function setMainButton(text: string, onClick: () => void) {
  const tg = getTelegramWebApp()
  if (!tg?.MainButton) return
  tg.MainButton.setText(text)
  tg.MainButton.show()
  tg.MainButton.offClick(onClick)
  tg.MainButton.onClick(onClick)
}

export function hideMainButton() {
  getTelegramWebApp()?.MainButton?.hide()
}
