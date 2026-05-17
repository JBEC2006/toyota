'use client'

import dynamicImport from 'next/dynamic'

const NextStudio = dynamicImport(
  () => import('next-sanity/studio').then((m) => m.NextStudio),
  { ssr: false }
)

export function StudioClient() {
  // config is imported here so it stays in the client bundle only
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const config = require('@/sanity/sanity.config').default
  return <NextStudio config={config} />
}
