import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'toyota-gazoo-racing-uy',
  title: 'Toyota Gazoo Racing UY',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      name: 'structure',
      title: 'Contenido',
    }),
    visionTool({
      title: 'GROQ',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
