import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2025-05-17',
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
})

const products = [
  {
    _id: 'seed-gorro-visera-1',
    _type: 'product',
    name: 'Gorro de Visera Gazoo Racing Rojo',
    slug: { _type: 'slug', current: 'gorro-visera-gazoo-racing-rojo' },
    category: 'gorros-de-visera',
    price: 890,
    description:
      'Gorro de visera oficial Toyota Gazoo Racing en rojo. Material: 100% algodón. Ajuste trasero regulable con cierre de plástico. Logo GR bordado en frente.',
    featured: true,
    available: true,
  },
  {
    _id: 'seed-gorro-visera-2',
    _type: 'product',
    name: 'Gorro de Visera TGR Negro',
    slug: { _type: 'slug', current: 'gorro-visera-tgr-negro' },
    category: 'gorros-de-visera',
    price: 890,
    description:
      'Gorro de visera Gazoo Racing en negro con logo bordado. Edición especial con detalle rojo en visera. Talle único.',
    featured: false,
    available: true,
  },
  {
    _id: 'seed-gorro-visera-3',
    _type: 'product',
    name: 'Gorro de Visera GR Blanco Malla',
    slug: { _type: 'slug', current: 'gorro-visera-gr-blanco-malla' },
    category: 'gorros-de-visera',
    price: 850,
    description:
      'Gorro de visera blanco con panel trasero de malla. Logo rojo Toyota Gazoo Racing bordado. Ideal para climas cálidos.',
    featured: false,
    available: true,
  },
  {
    _id: 'seed-gorro-lana-1',
    _type: 'product',
    name: 'Gorro de Lana TGR Invierno',
    slug: { _type: 'slug', current: 'gorro-lana-tgr-invierno' },
    category: 'gorros-de-lana',
    price: 950,
    description:
      'Gorro de lana tejido, ideal para invierno. Parche bordado Gazoo Racing en frente. Disponible en negro y rojo.',
    featured: false,
    available: true,
  },
  {
    _id: 'seed-campera-1',
    _type: 'product',
    name: 'Campera Softshell Gazoo Racing',
    slug: { _type: 'slug', current: 'campera-softshell-gazoo-racing' },
    category: 'camperas',
    price: 4200,
    description:
      'Campera softshell impermeable con logos Toyota Gazoo Racing bordados. Forro polar interior. Tallas S a XXL. Bolsillos laterales con cierre.',
    featured: true,
    available: true,
  },
  {
    _id: 'seed-campera-2',
    _type: 'product',
    name: 'Campera Cortaviento TGR',
    slug: { _type: 'slug', current: 'campera-cortaviento-tgr' },
    category: 'camperas',
    price: 3500,
    description:
      'Cortaviento ultraliviano con capucha plegable. Ideal para días de carrera o uso diario. Logo GR en pecho.',
    featured: false,
    available: true,
  },
  {
    _id: 'seed-chomba-1',
    _type: 'product',
    name: 'Chomba Polo TGR Piqué',
    slug: { _type: 'slug', current: 'chomba-polo-tgr-pique' },
    category: 'chombas',
    price: 1800,
    description:
      'Chomba polo de algodón piqué con logo bordado Gazoo Racing en pecho. Disponible en rojo y negro. Tallas S a XXL.',
    featured: true,
    available: true,
  },
  {
    _id: 'seed-mochila-1',
    _type: 'product',
    name: 'Mochila TGR 30L',
    slug: { _type: 'slug', current: 'mochila-tgr-30l' },
    category: 'bolsos-y-mochilas',
    price: 2600,
    description:
      'Mochila 30 litros con múltiples compartimentos. Correas ergonómicas acolchadas. Logo Gazoo Racing impreso. Ideal para uso diario o viajes.',
    featured: false,
    available: true,
  },
  {
    _id: 'seed-bolso-1',
    _type: 'product',
    name: 'Bolso de Viaje Gazoo Racing',
    slug: { _type: 'slug', current: 'bolso-viaje-gazoo-racing' },
    category: 'bolsos-y-mochilas',
    price: 2200,
    description:
      'Bolso deportivo con logo Gazoo Racing. Compartimento interior separado para calzado. Cierre YKK.',
    featured: false,
    available: true,
  },
  {
    _id: 'seed-llavero-1',
    _type: 'product',
    name: 'Llavero Metálico TGR',
    slug: { _type: 'slug', current: 'llavero-metalico-tgr' },
    category: 'llaveros',
    price: 350,
    description:
      'Llavero metálico de aluminio con logo Toyota Gazoo Racing en relieve. Acabado negro mate.',
    featured: false,
    available: true,
  },
  {
    _id: 'seed-botella-1',
    _type: 'product',
    name: 'Botella Térmica Gazoo Racing 500ml',
    slug: { _type: 'slug', current: 'botella-termica-gazoo-racing-500ml' },
    category: 'botellas',
    price: 1200,
    description:
      'Botella térmica de acero inoxidable 500ml. Mantiene temperatura por 12hs en frío y 8hs en calor. Logo GR grabado al láser.',
    featured: true,
    available: true,
  },
  {
    _id: 'seed-puzzle-1',
    _type: 'product',
    name: 'Puzzle GR Yaris Rally 500 Piezas',
    slug: { _type: 'slug', current: 'puzzle-gr-yaris-rally-500-piezas' },
    category: 'puzzles',
    price: 980,
    description:
      'Puzzle de 500 piezas con imagen del GR Yaris en acción en el Campeonato Uruguayo de Rally. Medidas armado: 48x34cm.',
    featured: false,
    available: true,
  },
  {
    _id: 'seed-billetera-1',
    _type: 'product',
    name: 'Billetera de Cuero TGR',
    slug: { _type: 'slug', current: 'billetera-cuero-tgr' },
    category: 'billeteras',
    price: 1500,
    description:
      'Billetera de cuero genuino con logo Gazoo Racing grabado en relieve. 6 tarjeteros, billetera y monedero.',
    featured: false,
    available: true,
  },
]

async function seed() {
  const projectId = client.config().projectId
  const dataset = client.config().dataset
  console.log(`\nSeeding ${products.length} productos → proyecto "${projectId}", dataset "${dataset}"\n`)

  for (const product of products) {
    try {
      const result = await client.createOrReplace(product)
      console.log(`  ✓  ${result._id}  —  ${product.name}`)
    } catch (err) {
      console.error(`  ✗  Error en "${product.name}":`, err)
    }
  }

  console.log('\n✅ Seed completado.\n')
}

seed().catch((err) => {
  console.error('Error fatal en seed:', err)
  process.exit(1)
})
