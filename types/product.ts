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
  slug: { current: string }
  category?: string
  price?: number
  description?: string
  images?: SanityImage[]
  featured?: boolean
  available?: boolean
}
