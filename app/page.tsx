export const dynamic = 'force-dynamic'

import { sanityFetch } from '@/sanity/lib/live'
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'
import { PageShell } from '@/components/PageShell'

export default async function CatalogPage() {
  const { data: products } = await sanityFetch({
    query: ALL_PRODUCTS_QUERY,
  })

  return (
    <main>
      <PageShell products={products ?? []} />
    </main>
  )
}
