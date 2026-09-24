import type { CategoryDef } from './types'

export const CATEGORIES: CategoryDef[] = [
  { slug: 'clothing', label: 'Kiyim', emoji: '👕' },
  { slug: 'anime', label: 'Anime', emoji: '🎌' },
  { slug: 'gaming', label: 'Gaming', emoji: '🎮' },
  { slug: 'streetwear', label: 'Streetwear', emoji: '🖤' },
  { slug: 'shoes', label: 'Poyabzal', emoji: '👟' },
  { slug: 'accessories', label: 'Aksessuar', emoji: '🧢' },
]

export function categoryLabel(slug: string): string {
  const c = CATEGORIES.find((c) => c.slug === slug)
  return c ? `${c.emoji} ${c.label}` : slug
}

export function formatSom(value: number): string {
  return `${Math.round(value).toLocaleString('uz-UZ').replace(/,/g, ' ')} so'm`
}
