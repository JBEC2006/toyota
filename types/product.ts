export interface SanityImageAsset {
  _ref: string
  _type: 'reference'
}

export interface SanityImage {
  _type?: 'image'
  asset: SanityImageAsset
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface Product {
  _id: string
  name: string
  section?: string
  category?: string
  price?: number
  currency?: string
  description?: string
  images?: SanityImage[]
  featured?: boolean
  available?: boolean
}

export type Section = 'ver-todo' | 'gr' | 'corolla-cross' | 'yaris-cross'
export type SortOrder = 'default' | 'price-asc' | 'price-desc'
