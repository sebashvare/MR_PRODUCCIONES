# Mono Richard — Sitio Web Oficial

Sitio web institucional de **Mono Richard**, agencia creativa colombiana especializada en gestión de redes sociales, producción de eventos musicales, contenido audiovisual y boletería digital. Basado en Cali, Colombia.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Estilos | Tailwind CSS 3.4 |
| 3D | Three.js + React Three Fiber |
| Animaciones | GSAP 3 + ScrollTrigger |
| Scroll suave | Lenis |
| Íconos | Lucide React |
| UI headless | Radix UI |

---

## Inicio rápido

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

---

## Estructura del proyecto

```
app/
├── public/              # Imágenes estáticas
├── src/
│   ├── config.ts        # ★ ÚNICO archivo a editar para cambiar contenido
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── AlbumCube.tsx     (Servicios)
│   │   ├── DJsSection.tsx
│   │   ├── ParallaxGallery.tsx
│   │   ├── TourSchedule.tsx  (Eventos)
│   │   └── Footer.tsx
│   ├── hooks/
│   │   ├── useLenis.ts
│   │   └── useScrollTrigger.ts
│   └── components/ui/   # Componentes Radix UI (no editar)
├── .gitignore
├── vercel.json
└── vite.config.ts
```

---

## Edición de contenido

**Todo el contenido del sitio se gestiona desde un único archivo: `src/config.ts`**

| Config | Sección |
|---|---|
| `siteConfig` | Título, descripción, idioma |
| `heroConfig` | Hero: imagen, logo, texto animado, CTAs, navegación |
| `albumCubeConfig` | Servicios: cubo 3D, paquetes y precios |
| `djsConfig` | DJs: fotos, géneros, bio, residencias |
| `parallaxGalleryConfig` | Galería: tiras parallax, galería horizontal, marquee |
| `tourScheduleConfig` | Eventos: fechas, venues, estado de venta |
| `footerConfig` | Footer: contacto, redes, newsletter |

---

## Imágenes

Todas las imágenes van en `/public`:

| Archivo | Uso |
|---|---|
| `hero-bg.jpg` | Fondo del hero |
| `logo-mono-richard.png` | Logo en la navegación |
| `cube-*.jpg` (×6) | Caras del cubo 3D |
| `dj-1.jpg` → `dj-5.jpg` | Fotos de DJs |
| `gallery-1.jpg` → `gallery-6.jpg` | Galería parallax y footer |
| `venue-1.jpg` → `venue-4.jpg` | Previews de venues |
| `footer-portrait.jpg` | Retrato en el footer |
| `vinyl-gold.png` | Disco vinyl giratorio |

---

## Despliegue en Vercel

El proyecto incluye `vercel.json` preconfigurado.

1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Framework preset: **Vite** (se detecta automáticamente)
3. Build command: `npm run build`
4. Output directory: `dist`

Desde CLI:

```bash
npm i -g vercel
vercel --prod
```

---

## Contacto del negocio

- **Email:** visioncreativastudiocol@gmail.com
- **Teléfono:** +57 320 692 7531
- **Ubicación:** Cali, Colombia

---

© 2025 Mono Richard. Todos los derechos reservados.
