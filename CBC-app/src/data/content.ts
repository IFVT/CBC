export type Lang = "en" | "es"

type NavLink = {
    label: string
    href: string
}

type Hero = {
  eyebrow: string
  lede: string
  cta1: NavLink
  cta2: NavLink
  meta1: string
  meta2: string
  title: string
  titleYellow: string
}

type Capability = {
  number: number
  title: string
  lede: string
  items: string[]
  image: string
  tag?: string
}

type CapabilitiesHeader = {
  title: string
  subtitle: string
}

type Experience = {
  eyebrow: string
  title: string
  titleItalic: string
  lede: string
  buttonText: string
}

type Client = {
  name: string
  logo: string
  location: string
  services: string[]
  style: "abus" | "sesderma" | "soficu" | "valenza" | "v2s"
  brand?: string
  subtitle?: string
}

type MethodologyHeader = {
  title: string
  titleItalic: string
  titleEnd: string
  eyebrow: string
  lede: string
}

type MethodologyStep = {
  number: number
  title: string
  lede: string
  items: string[]
  outcome: string
}

type RealEstateHeader = {
  eyebrow: string
  title: string
  titleItalics: string
  lede: string
  buttonText: string
}

type RealEstateTopic = {
  title: string
  lede: string
}

type ValuesHeader = {
  eyebrow: string
  title: string
  titleItalic: string
}

type Value = {
  number: string
  title: string
  lede: string
}

type VisionMisssion = {
  eyebrow: string
  lede: string
}

type ContactHeader = {
  eyebrow: string
  title: string
  titleItalic: string
  titleTail: string
  lede: string
}

type ContactMeta = {
  email: string
  phone: string
  hq: string
}

type ContactChip = {
  label: string
  value: string
}

type ContactForm = {
  labelName: string
  labelCompany: string
  labelEmail: string
  labelCapabilities: string
  labelMessage: string
  buttonText: string
  note: string
  sending: string
  successTitle: string
  success: string
  sendAnother: string
  error: string
}

type FooterColumn = {
  title: string
  links: { label: string; href: string }[]
}

type TeamHeader = {
  eyebrow: string
  title: string
  titleItalic: string
}

type TeamMember = {
  name: string
  role: string
  department: string
}

export type SiteContent = {
  NAV_LINKS: NavLink[]
  NAV_CTA: string
  HERO: Hero
  CAPABILITIES: Capability[]
  CAPABILITIES_HEADER: CapabilitiesHeader
  EXPERIENCE: Experience
  CLIENTS: Client[]
  METHODOLOGY_HEADER: MethodologyHeader
  METHODOLOGY_STEP: MethodologyStep[]
  METHODOLOGY_OUTCOME_LABEL: string
  REALESTATE_HEADER: RealEstateHeader
  REALSTATE_TOPICS: RealEstateTopic[]
  VALUES_HEADER: ValuesHeader
  VALUES: Value[]
  VISION: VisionMisssion
  MISSION: VisionMisssion
  CONTACT_HEADER: ContactHeader
  CONTACT_META: ContactMeta
  CONTACT_CHIPS: ContactChip[]
  CONTACT_FORM: ContactForm
  FOOTER_COLUMNS: FooterColumn[]
  FOOTER_TAGLINE: string
  TEAM_HEADER: TeamHeader
  TEAM: TeamMember[]
}

// Clientes: logos, nombres y estilos son neutrales al idioma (services/location no se renderizan)
const CLIENTS: Client[] = [
  {
    name: "ABUS",
    logo: "/logos/abus.svg",
    style: "abus",
    location: "Colombia",
    services: ["Strategy Advisory", "Marketing & Growth", "Digital Solutions"],
  },
  {
    name: "sesderma",
    logo: "",
    style: "sesderma",
    location: "Global",
    services: ["Strategy Advisory", "Strategic Recommendations"],
  },
  {
    name: "V2S",
    logo: "/logos/v2s.svg",
    style: "v2s",
    brand: "V2S",
    subtitle: "",
    location: "Colombia",
    services: ["Project Delivery & PMO"],
  },
  {
    name: "SOFICU Real Estate",
    logo: "/logos/soficu-realstate.svg",
    style: "soficu",
    brand: "SOFICU",
    subtitle: "Real Estate",
    location: "Dominican Republic",
    services: ["Strategy Advisory", "Commercial Strategy", "Marketing & Growth"],
  },
  {
    name: "SOFICU Restaurantes",
    logo: "/logos/soficu-restaurantes.svg",
    style: "soficu",
    brand: "SOFICU",
    subtitle: "Restaurantes",
    location: "Dominican Republic",
    services: ["Strategy Advisory", "Marketing & Growth"],
  },
  {
    name: "VALENZA Pizzeria",
    logo: "/logos/valenza.svg",
    style: "valenza",
    brand: "VALENZA",
    subtitle: "Pizzeria",
    location: "Brussels",
    services: ["Strategy Advisory", "Marketing & Growth"],
  },
]

// Datos de contacto de WhatsApp (neutrales al idioma salvo el mensaje pre-cargado)
export const WHATSAPP = {
  number: "573003029315",
  display: "+57 300 302 9315",
  message: {
    en: "Hi CORE Build Consulting, I'd like to talk about a project.",
    es: "Hola CORE Build Consulting, me gustaría hablar sobre un proyecto.",
  } as Record<Lang, string>,
}

const en: SiteContent = {
  NAV_LINKS: [
    { label: "Capabilities", href: "#capabilities" },
    { label: "Methodology", href: "#methodology" },
    { label: "Real Estate", href: "#real-estate" },
    { label: "About", href: "#about" },
  ],
  NAV_CTA: "Contact Us",
  HERO: {
    eyebrow: "Strategy • Marketing & Growth • Project Governance",
    lede: "Management consulting and professional services firm helping organizations strengthen strategy, marketing and growth, project governance and digital solutions.",
    cta1: { label: "Schedule a strategy session", href: "#contact" },
    cta2: { label: "Explore capabilities", href: "#capabilities" },
    meta1: "CBC — Capability-Based · Consulting Model",
    meta2: "Est. 2026 · Operating globally",
    title: "We help organizations define strategy,",
    titleYellow: "accelerate growth and create measurable value.",
  },
  CAPABILITIES: [
    {
      number: 1,
      title: "Strategy Advisory",
      lede: "We define direction, structure and growth strategies that create long-term value and governable execution.",
      items: ["Business & Project Assessment", "Strategic Planning", "Road Map Development"],
      image: "",
    },
    {
      number: 2,
      title: "Marketing & Growth",
      lede: "Designing positioning, marketing, and growth strategies that strengthen brand visibility, enhance market presence, and expand business opportunities.",
      items: ["Growth Strategy", "Brand Positioning", "Content & Creative Production", "Marketing Systems"],
      image: "",
    },
    {
      number: 3,
      title: "Project Delivery & PMO",
      lede: "Supporting the structuring, governance and management of projects and programs to ensure effective execution and results-oriented delivery.",
      items: ["PMO Implementation", "Project & Program Management", "Project Governance Frameworks"],
      image: "",
    },
    {
      number: 4,
      title: "Digital Solutions",
      lede: "Implementing technology, automation and digital solutions to strengthen business management and accelerate growth.",
      items: ["Business Technology Implementation", "AI & Automation Systems"],
      image: "",
    },
  ],
  CAPABILITIES_HEADER: {
    title: "Our Core Capabilities",
    subtitle: "Flexible Capability-Based Consulting Model",
  },
  EXPERIENCE: {
    title: "Trusted by companies across industries and",
    titleItalic: "international markets",
    eyebrow: "Selected Experience",
    lede: "We partner with organisations to solve complex challenges, build capabilities and unlock new opportunities for growth.",
    buttonText: "View all cases",
  },
  CLIENTS,
  METHODOLOGY_HEADER: {
    eyebrow: "Our Approach",
    title: "A four-phase method for",
    titleItalic: "structured",
    titleEnd: "growth.",
    lede: "Every engagement runs the same disciplined arc — from diagnosis to scale — adapted to the client's stage, capabilities in play, and the level of governance the business is ready to absorb.",
  },
  METHODOLOGY_STEP: [
    {
      number: 1,
      title: "Assessment & Discovery",
      lede: "Strategic diagnostic of the business — built to identify where structure, growth and scalability are being held back.",
      items: ["Business evaluation", "Project & opportunity analysis", "Capability assessment", "Strategic diagnostic"],
      outcome: "Identification of opportunities",
    },
    {
      number: 2,
      title: "Strategic Structuring",
      lede: "Definition of the strategy to scale — translating diagnosis into a roadmap and a structure for growth.",
      items: ["Growth strategy definition", "Commercial & operating structuring", "Project architecture design", "Roadmap & sequencing"],
      outcome: "How the strategy will be implemented",
    },
    {
      number: 3,
      title: "Strategic Execution",
      lede: "Implementation of the plan — activating marketing, technology and operating systems.",
      items: ["Strategy implementation", "Marketing, technology & operating systems", "Key process structuring", "Capability activation"],
      outcome: "The action plan goes live",
    },
    {
      number: 4,
      title: "Scale (Growth & Control)",
      lede: "Scaling the business — continuous optimisation, performance control and expansion into new markets.",
      items: ["Business / project scaling", "Continuous optimisation", "Performance control", "Capability expansion"],
      outcome: "Sustainable growth, under control",
    },
  ],
  METHODOLOGY_OUTCOME_LABEL: "OUTCOME",
  REALESTATE_HEADER: {
    eyebrow: "Vertical Practice — Real Estate",
    title: "We structure, manage and",
    titleItalics: "commercialise real estate projects.",
    lede: "Our integrated advisory system aligns strategy, execution, technology and market positioning — turning real estate concepts into structured, financeable, deliverable projects.",
    buttonText: "Discuss a real estate engagement",
  },
  REALSTATE_TOPICS: [
    { title: "Strategy & Structuring", lede: "Investment thesis, asset positioning, capital and ownership structure." },
    { title: "Development Management", lede: "Planning, design coordination, programme and budget governance." },
    { title: "Commercialisation", lede: "Go-to-market, brokerage activation, pricing and absorption strategy." },
    { title: "Delivery Governance", lede: "Project structuring, risk control and stakeholder reporting." },
  ],
  VALUES_HEADER: {
    eyebrow: "What we stand for",
    title: "Five values that shape every ",
    titleItalic: "engagement.",
  },
  VALUES: [
    { number: "i", title: "Ownership", lede: "We act as a strategic partner of the client — accountable to the outcome, not the deliverable." },
    { number: "ii", title: "Execution Excellence", lede: "We move with strategic focus, prioritising action, results and the generation of measurable value." },
    { number: "iii", title: "Strategic Thinking", lede: "A long view that builds sustainable growth and real scalability, not short-term motion." },
    { number: "iv", title: "Innovation", lede: "Intelligent use of technology, automation and new tooling — applied where it changes the curve." },
    { number: "v", title: "Integrity & Trust", lede: "Long-term relationships built on transparency, responsibility and strategic commitment." },
  ],
  VISION: {
    eyebrow: "About",
    lede: "CORE BUILD CONSULTING is a management consulting and professional services firm that helps organizations define strategy, accelerate growth and create measurable value. The firm combines capabilities in strategy, marketing and growth, project governance and digital solutions, complemented by a specialized Real Estate Advisory & Development practice.",
  },
  MISSION: {
    eyebrow: "Mission",
    lede: "To help businesses grow, optimise and structure their operations through an integrated advisory approach — combining structuring, organisational transformation and the execution of high-impact initiatives that generate sustainable growth and real scalability.",
  },
  CONTACT_HEADER: {
    eyebrow: "Begin an engagement",
    title: "Let's build the",
    titleItalic: "structure",
    titleTail: " your next stage of growth requires.",
    lede: "Tell us where the business is today and where it needs to be. We'll come back with a focused conversation and a proposed engagement shape — typically within two working days.",
  },
  CONTACT_META: {
    email: "Corebuildconsulting@gmail.com",
    phone: "+57 300 302 9315 · By appointment",
    hq: "Operating globally - Colombia",
  },
  CONTACT_CHIPS: [
    { label: "Strategy", value: "strategy" },
    { label: "Marketing & Growth", value: "growth" },
    { label: "Project Delivery & PMO", value: "pmo" },
    { label: "Digital Solutions", value: "digital" },
    { label: "Real Estate", value: "re" },
  ],
  CONTACT_FORM: {
    labelName: "Name",
    labelCompany: "Company",
    labelEmail: "Email",
    labelCapabilities: "Capabilities of interest",
    labelMessage: "Briefly — what are you trying to build, structure or scale?",
    buttonText: "Send enquiry",
    note: "We reply personally — no automated funnels.",
    sending: "Sending…",
    successTitle: "Message sent",
    success: "Thank you — your message is on its way. We'll be in touch shortly.",
    sendAnother: "Send another message",
    error: "Something went wrong. Please try again or email us directly.",
  },
  FOOTER_COLUMNS: [
    {
      title: "Capabilities",
      links: [
        { label: "Strategy Advisory", href: "#capabilities" },
        { label: "Marketing & Growth", href: "#capabilities" },
        { label: "Project Delivery & PMO", href: "#capabilities" },
        { label: "Digital Solutions", href: "#capabilities" },
        { label: "Real Estate", href: "#real-estate" },
      ],
    },
    {
      title: "Firm",
      links: [
        { label: "About", href: "#about" },
        { label: "Methodology", href: "#methodology" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Corebuildconsulting@gmail.com", href: "#" },
        { label: "Colombia · Global", href: "#" },
        { label: "+57 300 302 9315 · By appointment", href: "#" },
      ],
    },
    {
      title: "Index",
      links: [
        { label: "© 2026 CORE Build Consulting", href: "#" },
        { label: "All rights reserved", href: "#" },
        { label: "Legal · Privacy", href: "#" },
      ],
    },
  ],
  FOOTER_TAGLINE: "Business Growth. Technology. Strategy.",
  TEAM_HEADER: {
    eyebrow: "Leadership",
    title: "The team behind",
    titleItalic: "the work.",
  },
  TEAM: [
    { name: "Blanca Marina Zapata", role: "Managing Director", department: "" },
    { name: "Gabriela Perilla Zapata", role: "Director", department: "Strategy & Growth" },
    { name: "Daniela Perilla Zapata", role: "Director", department: "Project Governance & Delivery" },
    { name: "Camilo Javier Zapata Ayure", role: "Director", department: "Information & Digital Solutions" },
    { name: "Iván Villamil", role: "Director", department: "Technology & Innovation" },
    { name: "Luz Ayure", role: "Director", department: "Brand Governance & Creative Quality" },
  ],
}

const es: SiteContent = {
  NAV_LINKS: [
    { label: "Capacidades", href: "#capabilities" },
    { label: "Metodología", href: "#methodology" },
    { label: "Inmobiliario", href: "#real-estate" },
    { label: "Nosotros", href: "#about" },
  ],
  NAV_CTA: "Contáctanos",
  HERO: {
    eyebrow: "Estrategia • Marketing y Crecimiento • Gobernanza de Proyectos",
    lede: "Firma de consultoría de gestión y servicios profesionales que ayuda a las organizaciones a fortalecer su estrategia, marketing y crecimiento, gobernanza de proyectos y soluciones digitales.",
    cta1: { label: "Agenda una sesión estratégica", href: "#contact" },
    cta2: { label: "Explora las capacidades", href: "#capabilities" },
    meta1: "CBC — Modelo de Consultoría · Basado en Capacidades",
    meta2: "Fundada en 2026 · Operación global",
    title: "Ayudamos a las organizaciones a definir su estrategia,",
    titleYellow: "acelerar el crecimiento y crear valor medible.",
  },
  CAPABILITIES: [
    {
      number: 1,
      title: "Asesoría Estratégica",
      lede: "Definimos dirección, estructura y estrategias de crecimiento que generan valor a largo plazo y una ejecución gobernable.",
      items: ["Evaluación de negocio y proyectos", "Planeación estratégica", "Desarrollo de hoja de ruta"],
      image: "",
    },
    {
      number: 2,
      title: "Marketing y Crecimiento",
      lede: "Diseñamos estrategias de posicionamiento, marketing y crecimiento que fortalecen la visibilidad de marca, mejoran la presencia en el mercado y amplían las oportunidades de negocio.",
      items: ["Estrategia de crecimiento", "Posicionamiento de marca", "Contenido y producción creativa", "Sistemas de marketing"],
      image: "",
    },
    {
      number: 3,
      title: "Ejecución de Proyectos y PMO",
      lede: "Acompañamos la estructuración, gobernanza y gestión de proyectos y programas para asegurar una ejecución efectiva y orientada a resultados.",
      items: ["Implementación de PMO", "Gestión de proyectos y programas", "Marcos de gobernanza de proyectos"],
      image: "",
    },
    {
      number: 4,
      title: "Soluciones Digitales",
      lede: "Implementamos tecnología, automatización y soluciones digitales para fortalecer la gestión del negocio y acelerar el crecimiento.",
      items: ["Implementación de tecnología empresarial", "Sistemas de IA y automatización"],
      image: "",
    },
  ],
  CAPABILITIES_HEADER: {
    title: "Nuestras Capacidades Centrales",
    subtitle: "Modelo de Consultoría Flexible Basado en Capacidades",
  },
  EXPERIENCE: {
    title: "La confianza de empresas en distintas industrias y",
    titleItalic: "mercados internacionales",
    eyebrow: "Experiencia Seleccionada",
    lede: "Nos asociamos con organizaciones para resolver desafíos complejos, construir capacidades y desbloquear nuevas oportunidades de crecimiento.",
    buttonText: "Ver todos los casos",
  },
  CLIENTS,
  METHODOLOGY_HEADER: {
    eyebrow: "Nuestro Enfoque",
    title: "Un método de cuatro fases para un",
    titleItalic: "crecimiento",
    titleEnd: "estructurado.",
    lede: "Cada proyecto sigue el mismo arco disciplinado —del diagnóstico a la escala— adaptado a la etapa del cliente, las capacidades en juego y el nivel de gobernanza que el negocio está listo para asumir.",
  },
  METHODOLOGY_STEP: [
    {
      number: 1,
      title: "Evaluación y Descubrimiento",
      lede: "Diagnóstico estratégico del negocio, diseñado para identificar dónde se están frenando la estructura, el crecimiento y la escalabilidad.",
      items: ["Evaluación del negocio", "Análisis de proyectos y oportunidades", "Evaluación de capacidades", "Diagnóstico estratégico"],
      outcome: "Identificación de oportunidades",
    },
    {
      number: 2,
      title: "Estructuración Estratégica",
      lede: "Definición de la estrategia para escalar, traduciendo el diagnóstico en una hoja de ruta y una estructura de crecimiento.",
      items: ["Definición de la estrategia de crecimiento", "Estructuración comercial y operativa", "Diseño de la arquitectura de proyectos", "Hoja de ruta y secuenciación"],
      outcome: "Cómo se implementará la estrategia",
    },
    {
      number: 3,
      title: "Ejecución Estratégica",
      lede: "Implementación del plan, activando los sistemas de marketing, tecnología y operación.",
      items: ["Implementación de la estrategia", "Sistemas de marketing, tecnología y operación", "Estructuración de procesos clave", "Activación de capacidades"],
      outcome: "El plan de acción entra en marcha",
    },
    {
      number: 4,
      title: "Escala (Crecimiento y Control)",
      lede: "Escalamos el negocio: optimización continua, control del desempeño y expansión hacia nuevos mercados.",
      items: ["Escalamiento del negocio / proyecto", "Optimización continua", "Control del desempeño", "Expansión de capacidades"],
      outcome: "Crecimiento sostenible, bajo control",
    },
  ],
  METHODOLOGY_OUTCOME_LABEL: "RESULTADO",
  REALESTATE_HEADER: {
    eyebrow: "Práctica Vertical — Real Estate",
    title: "Estructuramos, gestionamos y",
    titleItalics: "comercializamos proyectos inmobiliarios.",
    lede: "Nuestro sistema integrado de asesoría alinea estrategia, ejecución, tecnología y posicionamiento de mercado, convirtiendo conceptos inmobiliarios en proyectos estructurados, financiables y ejecutables.",
    buttonText: "Conversemos sobre un proyecto inmobiliario",
  },
  REALSTATE_TOPICS: [
    { title: "Estrategia y Estructuración", lede: "Tesis de inversión, posicionamiento del activo, estructura de capital y propiedad." },
    { title: "Gestión del Desarrollo", lede: "Planeación, coordinación de diseño, gobernanza de programa y presupuesto." },
    { title: "Comercialización", lede: "Salida al mercado, activación de corretaje, estrategia de precios y absorción." },
    { title: "Gobernanza de la Ejecución", lede: "Estructuración del proyecto, control de riesgos y reporte a stakeholders." },
  ],
  VALUES_HEADER: {
    eyebrow: "Lo que defendemos",
    title: "Cinco valores que dan forma a cada ",
    titleItalic: "proyecto.",
  },
  VALUES: [
    { number: "i", title: "Apropiación", lede: "Actuamos como socio estratégico del cliente, respondiendo por el resultado, no por el entregable." },
    { number: "ii", title: "Excelencia en la Ejecución", lede: "Nos movemos con foco estratégico, priorizando la acción, los resultados y la generación de valor medible." },
    { number: "iii", title: "Pensamiento Estratégico", lede: "Una mirada de largo plazo que construye crecimiento sostenible y escalabilidad real, no movimiento de corto plazo." },
    { number: "iv", title: "Innovación", lede: "Uso inteligente de la tecnología, la automatización y nuevas herramientas, aplicadas donde cambian la curva." },
    { number: "v", title: "Integridad y Confianza", lede: "Relaciones de largo plazo construidas sobre transparencia, responsabilidad y compromiso estratégico." },
  ],
  VISION: {
    eyebrow: "Nosotros",
    lede: "CORE BUILD CONSULTING es una firma de consultoría de gestión y servicios profesionales que ayuda a las organizaciones a definir su estrategia, acelerar el crecimiento y crear valor medible. La firma combina capacidades en estrategia, marketing y crecimiento, gobernanza de proyectos y soluciones digitales, complementadas por una práctica especializada de Asesoría y Desarrollo Inmobiliario.",
  },
  MISSION: {
    eyebrow: "Misión",
    lede: "Ayudar a las empresas a crecer, optimizar y estructurar sus operaciones a través de un enfoque integrado de asesoría, combinando estructuración, transformación organizacional y la ejecución de iniciativas de alto impacto que generan crecimiento sostenible y escalabilidad real.",
  },
  CONTACT_HEADER: {
    eyebrow: "Inicia un proyecto",
    title: "Construyamos la",
    titleItalic: "estructura",
    titleTail: " que tu próxima etapa de crecimiento requiere.",
    lede: "Cuéntanos dónde está hoy el negocio y a dónde necesita llegar. Volveremos con una conversación enfocada y una propuesta de proyecto, normalmente en un plazo de dos días hábiles.",
  },
  CONTACT_META: {
    email: "Corebuildconsulting@gmail.com",
    phone: "+57 300 302 9315 · Con cita previa",
    hq: "Operación global · Colombia",
  },
  CONTACT_CHIPS: [
    { label: "Estrategia", value: "strategy" },
    { label: "Marketing y Crecimiento", value: "growth" },
    { label: "Ejecución de Proyectos y PMO", value: "pmo" },
    { label: "Soluciones Digitales", value: "digital" },
    { label: "Inmobiliario", value: "re" },
  ],
  CONTACT_FORM: {
    labelName: "Nombre",
    labelCompany: "Empresa",
    labelEmail: "Correo",
    labelCapabilities: "Capacidades de interés",
    labelMessage: "En breve, ¿qué buscas construir, estructurar o escalar?",
    buttonText: "Enviar consulta",
    note: "Respondemos personalmente, sin embudos automatizados.",
    sending: "Enviando…",
    successTitle: "Mensaje enviado",
    success: "Gracias — tu mensaje va en camino. Te contactaremos muy pronto.",
    sendAnother: "Enviar otro mensaje",
    error: "Algo salió mal. Inténtalo de nuevo o escríbenos directamente.",
  },
  FOOTER_COLUMNS: [
    {
      title: "Capacidades",
      links: [
        { label: "Asesoría Estratégica", href: "#capabilities" },
        { label: "Marketing y Crecimiento", href: "#capabilities" },
        { label: "Ejecución de Proyectos y PMO", href: "#capabilities" },
        { label: "Soluciones Digitales", href: "#capabilities" },
        { label: "Inmobiliario", href: "#real-estate" },
      ],
    },
    {
      title: "Firma",
      links: [
        { label: "Nosotros", href: "#about" },
        { label: "Metodología", href: "#methodology" },
        { label: "Contacto", href: "#contact" },
      ],
    },
    {
      title: "Contacto",
      links: [
        { label: "Corebuildconsulting@gmail.com", href: "#" },
        { label: "Colombia · Global", href: "#" },
        { label: "+57 300 302 9315 · Con cita previa", href: "#" },
      ],
    },
    {
      title: "Índice",
      links: [
        { label: "© 2026 CORE Build Consulting", href: "#" },
        { label: "Todos los derechos reservados", href: "#" },
        { label: "Legal · Privacidad", href: "#" },
      ],
    },
  ],
  FOOTER_TAGLINE: "Crecimiento. Tecnología. Estrategia.",
  TEAM_HEADER: {
    eyebrow: "Liderazgo",
    title: "El equipo detrás",
    titleItalic: "del trabajo.",
  },
  TEAM: [
    { name: "Blanca Marina Zapata", role: "Directora General", department: "" },
    { name: "Gabriela Perilla Zapata", role: "Directora", department: "Estrategia y Crecimiento" },
    { name: "Daniela Perilla Zapata", role: "Directora", department: "Gobernanza y Ejecución de Proyectos" },
    { name: "Camilo Javier Zapata Ayure", role: "Director", department: "Información y Soluciones Digitales" },
    { name: "Iván Villamil", role: "Director", department: "Tecnología e Innovación" },
    { name: "Luz Ayure", role: "Directora", department: "Gobernanza de Marca y Calidad Creativa" },
  ],
}

export const CONTENT: Record<Lang, SiteContent> = { en, es }
