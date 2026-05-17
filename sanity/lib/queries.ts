import { defineQuery } from 'next-sanity'

export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && available == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    section,
    category,
    price,
    description,
    images[] {
      asset,
      alt,
      hotspot,
      crop
    },
    featured,
    available
  }
`)
