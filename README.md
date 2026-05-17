# Toyota Gazoo Racing Uruguay — Catálogo Oficial

Catálogo de productos visual de Toyota Gazoo Racing Uruguay. El administrador gestiona productos desde Sanity Studio y los cambios aparecen en el sitio en segundos, sin rebuild.

## Stack

- **Next.js 15** (App Router)
- **Sanity v3** con Studio embebido en `/studio`
- **Tailwind CSS**
- **Sanity Live Content API** — actualizaciones en tiempo real

---

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior
- Cuenta en [sanity.io](https://www.sanity.io) (gratis)

---

## 1. Crear el proyecto en Sanity

```bash
npx sanity@latest init --create-project "Toyota Gazoo Racing UY" --dataset production
```

Anotá el **Project ID** que te devuelve Sanity (ej: `abc12345`).

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar variables de entorno

Copiá el archivo de ejemplo:

```bash
cp .env.example .env.local
```

Editá `.env.local` y completá los valores:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=abc12345        ← tu Project ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-05-17

SANITY_API_READ_TOKEN=sk...                   ← token de lectura (Viewer)
SANITY_WRITE_TOKEN=sk...                      ← token de escritura (Editor)
```

### Cómo crear los tokens

1. Entrá a [manage.sanity.io](https://manage.sanity.io)
2. Seleccioná tu proyecto → **API** → **Tokens**
3. Creá un token con rol **Viewer** → copialo en `SANITY_API_READ_TOKEN`
4. Creá otro token con rol **Editor** → copialo en `SANITY_WRITE_TOKEN`

---

## 4. Desarrollo local

```bash
npm run dev
```

- **Catálogo:** http://localhost:3000
- **Sanity Studio:** http://localhost:3000/studio

---

## 5. Cargar datos de prueba

Con el servidor apagado (o en otra terminal):

```bash
npm run seed
```

Esto crea 13 productos de ejemplo en tu dataset de Sanity. Podés agregar imágenes desde el Studio.

---

## 6. Agregar el logo real

Reemplazá el archivo `public/logo-placeholder.svg` con la imagen real del logo de Toyota Gazoo Racing Uruguay. Formatos recomendados: **SVG** (para mejor calidad) o **PNG con fondo transparente**.

---

## 7. Deploy en Vercel

1. Subí el proyecto a GitHub
2. Importalo en [vercel.com](https://vercel.com)
3. En la configuración del proyecto en Vercel, agregá las variables de entorno del paso 3
4. Deploy automático desde `main`

### Configurar CORS en Sanity

Para que el sitio en producción pueda conectarse a la API de Sanity:

1. Entrá a [manage.sanity.io](https://manage.sanity.io) → tu proyecto → **API** → **CORS Origins**
2. Agregá:
   - `http://localhost:3000` (desarrollo)
   - `https://tu-proyecto.vercel.app` (producción)

---

## Cómo funciona el tiempo real

Cuando el admin guarda un cambio en el Studio (`/studio`):

1. Sanity emite un evento por SSE (Server-Sent Events)
2. El componente `SanityLive` en el layout lo detecta
3. Next.js re-ejecuta el Server Component de la página
4. Los productos se actualizan en pantalla — sin recargar la página ni hacer rebuild

---

## Estructura del proyecto

```
/app
  page.tsx                     ← catálogo (Server Component)
  layout.tsx                   ← shell con SanityLive
  /studio/[[...tool]]/page.tsx ← Sanity Studio embebido
/components
  CatalogShell.tsx             ← estado de filtros (client)
  Navbar.tsx
  HeroBanner.tsx
  SearchFilter.tsx
  ProductGrid.tsx
  ProductCard.tsx
  ProductModal.tsx
/sanity
  sanity.config.ts
  /schemaTypes/product.ts
  /lib/client.ts
  /lib/live.ts
  /lib/queries.ts
  /lib/image.ts
/scripts
  seed.ts
/types
  product.ts
```
