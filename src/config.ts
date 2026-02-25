// =============================================================================
// Site Configuration
// Edit ONLY this file to customize all content across the site.
// All animations, layouts, and styles are controlled by the components.
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Mono Richard | Eventos y Espectáculos",
  description: "Transformamos tu marca en una estrella digital. Gestión profesional de redes sociales, organización de eventos musicales y creación de contenido de alto impacto.",
  language: "es",
};

// -- Hero Section -------------------------------------------------------------
export interface HeroNavItem {
  label: string;
  sectionId: string;
  icon: "disc" | "play" | "calendar" | "music" | "users";
}

export interface HeroConfig {
  backgroundImage: string;
  logoImage: string;
  brandName: string;
  decodeText: string;
  decodeChars: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryTarget: string;
  ctaSecondary: string;
  ctaSecondaryTarget: string;
  cornerLabel: string;
  cornerDetail: string;
  navItems: HeroNavItem[];
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-bg.jpg",
  logoImage: "/logo-mono-richard.png",
  brandName: "MONO RICHARD",
  decodeText: "EVENTOS Y ESPECTÁCULOS",
  decodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  subtitle: "Transformamos tu marca en una estrella digital. Gestión profesional de redes sociales, organización de eventos musicales y creación de contenido de alto impacto.",
  ctaPrimary: "Ver Paquetes",
  ctaPrimaryTarget: "albums",
  ctaSecondary: "Contactar",
  ctaSecondaryTarget: "contact",
  cornerLabel: "AGENCIA CREATIVA",
  cornerDetail: "Desde 2025",
  navItems: [
    { label: "Servicios", sectionId: "albums", icon: "disc" },
    { label: "DJs", sectionId: "djs", icon: "users" },
    { label: "Galería", sectionId: "gallery", icon: "play" },
    { label: "Eventos", sectionId: "tour", icon: "calendar" },
    { label: "Contacto", sectionId: "contact", icon: "music" },
  ],
};

// -- Album Cube Section (Servicios) -------------------------------------------
export interface PackageFeature {
  name: string;
  included: boolean;
}

export interface ServicePackage {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface Album {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  packages: ServicePackage[];
}

export interface AlbumCubeConfig {
  albums: Album[];
  cubeTextures: string[];
  scrollHint: string;
}

export const albumCubeConfig: AlbumCubeConfig = {
  albums: [
    {
      id: 1,
      title: "REDES SOCIALES",
      subtitle: "GESTIÓN DIGITAL",
      image: "/cube-social.jpg",
      description: "Gestión profesional de tus redes sociales para aumentar tu presencia digital y conectar con tu audiencia.",
      packages: [
        {
          name: "Esencia Creativa",
          price: "$450.000/mes",
          description: "Ideal para emprendedores que inician",
          features: [
            "3 videos reels",
            "3 piezas gráficas diseñadas",
            "4 historias estratégicas",
            "Plantillas de contenido originales",
            "Análisis de redes mensual"
          ]
        },
        {
          name: "Potencia Digital",
          price: "$750.000/mes",
          description: "Para marcas en crecimiento",
          features: [
            "5 videos reels (tendencia + marca)",
            "5 piezas gráficas diseñadas",
            "6 historias de contenido",
            "Planeación de contenido mensual",
            "Definición de 2-3 pilares de contenido",
            "Optimización de perfil",
            "Reporte de métricas"
          ]
        },
        {
          name: "Visión Completa",
          price: "$1.200.000/mes",
          description: "Solución integral para empresas",
          features: [
            "10 videos reels (tendencia + marca)",
            "10 piejas gráficas diseñadas",
            "10 historias de contenido",
            "Manejo de redes: Instagram, TikTok, Facebook",
            "Análisis de redes avanzado",
            "Guiones y parrilla de contenido mensual",
            "Organización de redes sociales",
            "Manejo de Kips",
            "1 historia con influencer"
          ]
        }
      ]
    },
    {
      id: 2,
      title: "EVENTOS",
      subtitle: "PRODUCCIÓN MUSICAL",
      image: "/cube-events.jpg",
      description: "Organización completa de eventos musicales de todos los géneros. Desde la conceptualización hasta la ejecución.",
      packages: [
        {
          name: "Evento Básico",
          price: "Desde $3.000.000",
          description: "Eventos pequeños y medianos",
          features: [
            "Conceptualización del evento",
            "Booking de artistas locales",
            "Coordinación de logística",
            "Sonido e iluminación básica",
            "Promoción en redes sociales"
          ]
        },
        {
          name: "Evento Premium",
          price: "Desde $8.000.000",
          description: "Eventos de gran escala",
          features: [
            "Conceptualización creativa",
            "Booking de artistas nacionales",
            "Producción completa",
            "Sonido e iluminación profesional",
            "Campaña de marketing digital",
            "Cobertura audiovisual",
            "Staff de producción"
          ]
        },
        {
          name: "Evento Corporativo",
          price: "Cotizar",
          description: "Eventos empresariales exclusivos",
          features: [
            "Conceptualización a medida",
            "Booking de artistas internacionales",
            "Producción de lujo",
            "Sonido, iluminación y pantallas LED",
            "Campaña 360°",
            "Transmisión en vivo",
            "Catering y experiencia VIP"
          ]
        }
      ]
    },
    {
      id: 3,
      title: "CONTENIDO",
      subtitle: "AUDIOVISUAL",
      image: "/cube-video.jpg",
      description: "Creación de contenido audiovisual de alta calidad para destacar tu marca en el mundo digital.",
      packages: [
        {
          name: "Paquete Reels",
          price: "$300.000",
          description: "5 reels profesionales",
          features: [
            "5 videos reels editados",
            "Música licenciada",
            "Textos y animaciones",
            "Optimizado para redes",
            "2 revisiones incluidas"
          ]
        },
        {
          name: "Paquete Fotografía",
          price: "$500.000",
          description: "Sesión fotográfica profesional",
          features: [
            "2 horas de sesión",
            "50 fotos editadas",
            "Edición profesional",
            "Entrega en 5 días",
            "Derechos de uso comercial"
          ]
        },
        {
          name: "Paquete Completo",
          price: "$1.500.000",
          description: "Producción audiovisual integral",
          features: [
            "Video corporativo (3-5 min)",
            "20 reels para redes",
            "Sesión fotográfica (100 fotos)",
            "Motion graphics",
            "Música original",
            "Entrega en 10 días"
          ]
        }
      ]
    },
    {
      id: 4,
      title: "BOLETERÍA",
      subtitle: "VENTA DIGITAL",
      image: "/cube-tickets.jpg",
      description: "Sistema completo de creación, comercialización y distribución de boletas para tu evento.",
      packages: [
        {
          name: "Boletería Básica",
          price: "10% comisión",
          description: "Plataforma de venta simple",
          features: [
            "Plataforma de venta online",
            "QR codes para validación",
            "Reporte de ventas en tiempo real",
            "Soporte técnico",
            "Pago con múltiples métodos"
          ]
        },
        {
          name: "Boletería Pro",
          price: "8% comisión",
          description: "Solución completa de ticketing",
          features: [
            "Todo lo del paquete básico",
            "Diseño de boletas personalizado",
            "Zonas y categorías de precios",
            "Preventas y early bird",
            "Promociones y descuentos",
            "App de validación"
          ]
        },
        {
          name: "Boletería Enterprise",
          price: "6% comisión",
          description: "Para grandes eventos",
          features: [
            "Todo lo del paquete Pro",
            "Integración con tu web",
            "API personalizada",
            "Análisis de datos avanzado",
            "Soporte prioritario 24/7",
            "Marketing de eventos incluido"
          ]
        }
      ]
    },
  ],
  cubeTextures: [
    "/cube-social.jpg",
    "/cube-events.jpg",
    "/cube-video.jpg",
    "/cube-tickets.jpg",
    "/cube-marketing.jpg",
    "/cube-music.jpg",
  ],
  scrollHint: "Explora nuestros servicios",
};

// -- DJs Section --------------------------------------------------------------
export interface DJ {
  id: number;
  name: string;
  alias: string;
  image: string;
  genres: string[];
  experience: string;
  bio: string;
  residencies: string[];
  socialMedia: {
    instagram?: string;
    soundcloud?: string;
    spotify?: string;
  };
}

export interface DJsConfig {
  sectionLabel: string;
  sectionTitle: string;
  sectionSubtitle: string;
  djs: DJ[];
}

export const djsConfig: DJsConfig = {
  sectionLabel: "NUESTROS DJS",
  sectionTitle: "TALENTO QUE ENCENDE LA PISTA",
  sectionSubtitle: "Conoce a los artistas que hacen vibrar cada evento",
  djs: [
    {
      id: 1,
      name: "Carlos Mendoza",
      alias: "DJ C-MIX",
      image: "/dj-1.jpg",
      genres: ["Reggaeton", "Latin House", "Dembow"],
      experience: "8 años",
      bio: "Especialista en música urbana latina. Ha compartido cabina con artistas internacionales como J Balvin, Bad Bunny y Karol G. Su energía en el escenario es contagiosa y su capacidad para leer la pista es incomparable.",
      residencies: ["La Feria Club", "Cali Pachanguero", "Festival Petronio"],
      socialMedia: {
        instagram: "@djcmix",
        soundcloud: "djcmix",
        spotify: "DJ C-MIX"
      }
    },
    {
      id: 2,
      name: "María Fernanda López",
      alias: "DJ FERNA",
      image: "/dj-2.jpg",
      genres: ["Techno", "House", "Deep House"],
      experience: "6 años",
      bio: "Referente del techno en Colombia. Su set en el Boiler Room Cali la consolidó como una de las DJs más importantes de la escena electrónica latinoamericana. Productora y fundadora del sello 'Cali Underground'.",
      residencies: ["Cali Underground", "Techno Nights", "Rave Cali"],
      socialMedia: {
        instagram: "@djferna",
        soundcloud: "djferna",
        spotify: "DJ Ferna"
      }
    },
    {
      id: 3,
      name: "Andrés García",
      alias: "DJ ANDY G",
      image: "/dj-3.jpg",
      genres: ["Salsa", "Vallenato", "Tropical"],
      experience: "12 años",
      bio: "Guardián de la tradición musical colombiana. Con más de una década en los escenarios, ha llevado la salsa y el vallenato a nuevas generaciones fusionándolos con sonidos contemporáneos.",
      residencies: ["Tin Tin Deo", "Salsa al Parque", "Festival de Salsa"],
      socialMedia: {
        instagram: "@djandyg",
        soundcloud: "djandyg",
        spotify: "DJ Andy G"
      }
    },
    {
      id: 4,
      name: "Sofía Ramírez",
      alias: "DJ SOFI R",
      image: "/dj-4.jpg",
      genres: ["Hip Hop", "R&B", "Trap"],
      experience: "5 años",
      bio: "La voz femenina del hip hop en Cali. Su selección musical va desde los clásicos del old school hasta los hits más actuales del trap. Ha sido la DJ oficial de múltiples batallas de freestyle en la región.",
      residencies: ["The Hip Hop Club", "Freestyle Battles", "Urban Nights"],
      socialMedia: {
        instagram: "@djsofir",
        soundcloud: "djsofir",
        spotify: "DJ Sofi R"
      }
    },
    {
      id: 5,
      name: "Diego Herrera",
      alias: "DIEGO BEATS",
      image: "/dj-5.jpg",
      genres: ["EDM", "Big Room", "Future House"],
      experience: "7 años",
      bio: "Productor y DJ especializado en EDM. Sus tracks han sido soportados por DJs internacionales como David Guetta y Martin Garrix. Ha participado en festivales como Ultra Music Festival y Tomorrowland Brasil.",
      residencies: ["Electro Paradise", "EDM Festival Colombia", "Neon Nights"],
      socialMedia: {
        instagram: "@diegobeats",
        soundcloud: "diegobeats",
        spotify: "Diego Beats"
      }
    }
  ]
};

// -- Parallax Gallery Section -------------------------------------------------
export interface ParallaxImage {
  id: number;
  src: string;
  alt: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  date: string;
}

export interface ParallaxGalleryConfig {
  sectionLabel: string;
  sectionTitle: string;
  galleryLabel: string;
  galleryTitle: string;
  marqueeTexts: string[];
  endCtaText: string;
  parallaxImagesTop: ParallaxImage[];
  parallaxImagesBottom: ParallaxImage[];
  galleryImages: GalleryImage[];
}

export const parallaxGalleryConfig: ParallaxGalleryConfig = {
  sectionLabel: "NUESTROS EVENTOS",
  sectionTitle: "CREAMOS EXPERIENCIAS INOLVIDABLES",
  galleryLabel: "GALERÍA",
  galleryTitle: "MOMENTOS QUE TRASCENDEN",
  marqueeTexts: [
    "REDES SOCIALES",
    "EVENTOS MUSICALES",
    "CONTENIDO DIGITAL",
    "BOLETERÍA",
    "MARKETING",
    "PRODUCCIÓN",
  ],
  endCtaText: "¿Listo para tu próximo evento?",
  parallaxImagesTop: [
    { id: 1, src: "/gallery-1.jpg", alt: "Concierto en vivo" },
    { id: 2, src: "/gallery-2.jpg", alt: "DJ en acción" },
    { id: 3, src: "/gallery-3.jpg", alt: "Banda en escenario" },
  ],
  parallaxImagesBottom: [
    { id: 4, src: "/gallery-4.jpg", alt: "Evento corporativo" },
    { id: 5, src: "/gallery-5.jpg", alt: "Festival al aire libre" },
    { id: 6, src: "/gallery-6.jpg", alt: "Producción audiovisual" },
  ],
  galleryImages: [
    { id: 1, src: "/Maykel_001.png", title: "Dubai Night Club", date: "2026.02.14" },
    { id: 2, src: "/Pepito_Gomez.png", title: "Dubai Night Club", date: "2026.04.18" },
    
  ],
};

// -- Tour Schedule Section (Próximos Eventos) ---------------------------------
export interface TourDate {
  id: number;
  date: string;
  time: string;
  city: string;
  venue: string;
  status: "on-sale" | "sold-out" | "coming-soon";
  image: string;
}

export interface TourStatusLabels {
  onSale: string;
  soldOut: string;
  comingSoon: string;
  default: string;
}

export interface TourScheduleConfig {
  sectionLabel: string;
  sectionTitle: string;
  vinylImage: string;
  buyButtonText: string;
  detailsButtonText: string;
  bottomNote: string;
  bottomCtaText: string;
  statusLabels: TourStatusLabels;
  tourDates: TourDate[];
}

export const tourScheduleConfig: TourScheduleConfig = {
  sectionLabel: "PRÓXIMOS EVENTOS",
  sectionTitle: "NO TE LO PUEDES PERDER",
  vinylImage: "/vinyl-gold.png",
  buyButtonText: "Comprar Boletas",
  detailsButtonText: "Ver Detalles",
  bottomNote: "¿Quieres organizar tu evento?",
  bottomCtaText: "Contáctanos",
  statusLabels: {
    onSale: "EN VENTA",
    soldOut: "AGOTADO",
    comingSoon: "PRÓXIMAMENTE",
    default: "DISPONIBLE",
  },
  tourDates: [
    {
      id: 1,
      date: "2026.02.14",
      time: "20:00",
      city: "Cali",
      venue: "Dubai Night Club",
      status: "sold-out",
      image: "/Maykel_001.png",
    },
    {
      id: 2,
      date: "2026.04.18",
      time: "22:00",
      city: "Cali",
      venue: "Club Premium",
      status: "on-sale",
      image: "/public/Pepito_Gomez.png",
    },
    // {
    //   id: 3,
    //   date: "2025.01.10",
    //   time: "19:30",
    //   city: "Medellín",
    //   venue: "Ópera Real",
    //   status: "coming-soon",
    //   image: "/venue-3.jpg",
    // },
    // {
    //   id: 4,
    //   date: "2025.01.25",
    //   time: "21:00",
    //   city: "Cartagena",
    //   venue: "Sky Lounge",
    //   status: "coming-soon",
    //   image: "/venue-4.jpg",
    // },
  ],
};

// -- Footer Section -----------------------------------------------------------
export interface FooterImage {
  id: number;
  src: string;
}

export interface SocialLink {
  icon: "instagram" | "twitter" | "youtube" | "music";
  label: string;
  href: string;
}

export interface FooterConfig {
  portraitImage: string;
  portraitAlt: string;
  heroTitle: string;
  heroSubtitle: string;
  artistLabel: string;
  artistName: string;
  artistSubtitle: string;
  brandName: string;
  brandDescription: string;
  quickLinksTitle: string;
  quickLinks: string[];
  contactTitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  addressLabel: string;
  address: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  subscribeAlertMessage: string;
  copyrightText: string;
  bottomLinks: string[];
  socialLinks: SocialLink[];
  galleryImages: FooterImage[];
}

export const footerConfig: FooterConfig = {
  portraitImage: "/footer-portrait.jpg",
  portraitAlt: "Mono Richard - Productor Musical",
  heroTitle: "HAZ QUE TU MARCA BRILLE",
  heroSubtitle: "CON LUZ PROPIA",
  artistLabel: "FUNDADOR",
  artistName: "MONO RICHARD",
  artistSubtitle: "Productor & Director Creativo",
  brandName: "MONO RICHARD",
  brandDescription: "Agencia especializada en gestión de redes sociales, organización de eventos musicales y creación de contenido digital de alto impacto. Transformamos marcas en estrellas digitales.",
  quickLinksTitle: "Enlaces Rápidos",
  quickLinks: ["Inicio", "Servicios", "DJs", "Paquetes", "Eventos", "Contacto"],
  contactTitle: "Contacto",
  emailLabel: "Email",
  email: "monorichardsalsalsa@gmail.com",
  phoneLabel: "Teléfono",
  phone: "+57 315 5441773",
  addressLabel: "Ubicación",
  address: "Cali, Colombia",
  newsletterTitle: "Newsletter",
  newsletterDescription: "Suscríbete para recibir las últimas noticias y eventos.",
  newsletterButtonText: "Suscribirse",
  subscribeAlertMessage: "¡Gracias por suscribirte! Pronto recibirás nuestras novedades.",
  copyrightText: "© 2025 Mono Richard. Todos los derechos reservados.",
  bottomLinks: ["Política de Privacidad", "Términos de Servicio"],
  socialLinks: [
    { icon: "instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "twitter", label: "Twitter", href: "https://twitter.com" },
    { icon: "youtube", label: "YouTube", href: "https://youtube.com" },
    { icon: "music", label: "TikTok", href: "https://tiktok.com" },
  ],
  galleryImages: [
    { id: 1, src: "/gallery-1.jpg" },
    { id: 2, src: "/gallery-2.jpg" },
    { id: 3, src: "/gallery-3.jpg" },
    { id: 4, src: "/gallery-4.jpg" },
  ],
};
