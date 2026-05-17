export const dynamic = 'force-dynamic'

import { sanityFetch } from '@/sanity/lib/live'
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { Navbar } from '@/components/Navbar'
import { HeroBanner } from '@/components/HeroBanner'
import { CatalogShell } from '@/components/CatalogShell'

export default async function CatalogPage() {
  const { data: products } = await sanityFetch({
    query: ALL_PRODUCTS_QUERY,
  })

  return (
    <main>
      <Navbar />
      <HeroBanner />
      <CatalogShell products={products ?? []} />
    </main>
  )
}
