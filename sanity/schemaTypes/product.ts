import { defineType, defineField } from 'sanity'

const CATEGORIES = [
  { title: 'Indumentaria',  value: 'indumentaria' },
  { title: 'Merchandising', value: 'merchandising' },
]

const SECTIONS = [
  { title: 'Colección GR',            value: 'gr' },
  { title: 'Accesorios Corolla Cross', value: 'corolla-cross' },
  { title: 'Accesorios Yaris Cross',   value: 'yaris-cross' },
]

export const productSchema = defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required().error('El nombre es obligatorio'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Sección',
      type: 'string',
      validation: (Rule) => Rule.required().error('La sección es obligatoria'),
      options: {
        list: SECTIONS,
        layout: 'radio',
      },
    }),
    defineField({
      name: 'category',
      title: 'Categoría (solo GR)',
      type: 'string',
      hidden: ({ document }) => document?.section !== 'gr',
      options: {
        list: CATEGORIES,
        layout: 'radio',
      },
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
    }),
    defineField({
      name: 'currency',
      title: 'Moneda',
      type: 'string',
      initialValue: 'UYU',
      options: {
        list: [
          { title: 'Pesos uruguayos ($)', value: 'UYU' },
          { title: 'Dólares (U$S)',       value: 'USD' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              description: 'Descripción breve de la imagen para accesibilidad.',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      description: 'Marcar para destacar este producto en el catálogo.',
      initialValue: false,
    }),
    defineField({
      name: 'available',
      title: 'Disponible',
      type: 'boolean',
      description: 'Desactivar para ocultar el producto sin eliminarlo.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'section',
      media: 'images.0',
    },
    prepare({ title, subtitle, media }) {
      const sec = SECTIONS.find((s) => s.value === subtitle)
      return {
        title,
        subtitle: sec?.title ?? subtitle ?? 'Sin sección',
        media,
      }
    },
  },
})
