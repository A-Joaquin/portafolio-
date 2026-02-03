import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones
const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navegación
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contacto',
    'nav.aboutMe': 'Sobre Mí',

    // Filtros
    'filter.frontend': 'Frontend',
    'filter.backend': 'Backend',
    'filter.student': 'Estudiante de Ing. Sistemas',

    // Skills Section
    'skills.title': 'Habilidades',
    'skills.angular': 'Intermedio: Desarrollo de aplicaciones front-end escalables usando Angular, con arquitectura basada en componentes, servicios, routing y formularios reactivos.',
    'skills.django': 'Básico: Desarrollo backend con Django para procesamiento de datos, análisis básico de datos, validación de entrada y lógica backend estilo REST.',
    'skills.mongodb': 'Básico: Experiencia práctica usando MongoDB para almacenamiento de datos NoSQL, modelado de documentos y operaciones CRUD básicas.',
    'skills.react': 'Básico: Experiencia práctica construyendo interfaces de usuario interactivas con React usando componentes funcionales y hooks.',
    'skills.springboot': 'Intermedio: Desarrollo backend con Spring Boot para construir APIs REST, aplicando arquitectura en capas y conceptos básicos de seguridad.',
    'skills.mysql': 'Intermedio: Diseño y gestión de bases de datos relacionales, escritura de consultas SQL, joins y manejo de esquemas normalizados.',
    'skills.html5': 'Básico: HTML5 semántico para construir interfaces web accesibles, bien estructuradas y amigables con SEO.',
    'skills.css3': 'Básico: Diseño responsive usando CSS3, Flexbox, Grid y técnicas modernas de layout.',
    'skills.javascript': 'Intermedio: Fundamentos sólidos en JavaScript para lógica frontend, programación asíncrona e interacción con APIs.',
    'skills.python': 'Básico: Uso de Python para desarrollo backend, procesamiento de datos, modelos numéricos y resolución algorítmica de problemas.',
    'skills.cpp': 'Intermedio: Experiencia con C++ para implementación de algoritmos, métodos numéricos y programación orientada al rendimiento.',

    // Contact Section
    'contact.title': 'Contacto',
    'contact.email': 'Email',
    'contact.social': 'Redes',
    'contact.github': 'GitHub',
    'contact.portfolio': 'Portafolio',

    // About Section
    'about.title': 'Sobre Mí',
    'about.p1': 'Soy <strong>estudiante de Ingeniería de Sistemas</strong> con un fuerte interés en el desarrollo de software y la construcción de aplicaciones prácticas y bien estructuradas. Este portafolio muestra mis proyectos académicos y mi camino de aprendizaje en desarrollo web y móvil.',
    'about.p2': 'Disfruto trabajar tanto en desarrollo frontend como backend, enfocándome en código limpio, estructura clara y soluciones mantenibles. Estoy especialmente interesado en aprender las mejores prácticas de la industria y mejorar a través de proyectos reales y colaboración.',
    'about.p3': 'Tengo experiencia trabajando con tecnologías como Angular, React, Spring Boot y desarrollo Android con Jetpack Compose. Todos los proyectos mostrados aquí fueron desarrollados como parte de mis estudios universitarios y práctica personal.',
    'about.whatIWorkWith': 'Con Qué Trabajo',
    'about.webDev': 'Desarrollo de Aplicaciones Web',
    'about.mobileDev': 'Desarrollo de Aplicaciones Móviles',
    'about.fullstack': 'Fundamentos Frontend & Backend',
    'about.cleanCode': 'Código Limpio & Estructura de Software',

    // Project Gallery
    'gallery.clickForDetails': 'Haz click para detalles',
    'gallery.lmsTitle': 'LMS NEWSCHOOL',
    'gallery.lmsDesc': 'Sistema de gestión de aprendizaje (LMS) para educación en línea',
    'gallery.gustoMenuTitle': 'Menú app Gusto Total',
    'gallery.gustoMenuDesc': 'Diseño de menú de aplicación para restaurante Gusto Total',
    'gallery.gustoSettingsTitle': 'Configuración app Gusto Total',
    'gallery.gustoSettingsDesc': 'Configuración de la aplicación Gusto Total',
  },
  en: {
    // Navigation
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.aboutMe': 'About Me',

    // Filters
    'filter.frontend': 'Frontend',
    'filter.backend': 'Backend',
    'filter.student': 'Student of Systems Engineer',

    // Skills Section
    'skills.title': 'Skills',
    'skills.angular': 'Intermediate: Development of scalable front-end applications using Angular, with component-based architecture, services, routing, and reactive forms.',
    'skills.django': 'Basic: Backend development with Django for data processing, basic data analysis, input validation, and REST-style backend logic.',
    'skills.mongodb': 'Basic: Practical experience using MongoDB for NoSQL data storage, document modeling, and basic CRUD operations.',
    'skills.react': 'Basic: Hands-on experience building interactive user interfaces with React using functional components and hooks.',
    'skills.springboot': 'Intermediate: Backend development with Spring Boot for building REST APIs, applying layered architecture and basic security concepts.',
    'skills.mysql': 'Intermediate: Design and management of relational databases, writing SQL queries, joins, and handling normalized schemas.',
    'skills.html5': 'Basic: Semantic HTML5 for building accessible, well-structured, and SEO-friendly web interfaces.',
    'skills.css3': 'Basic: Responsive design using CSS3, Flexbox, Grid, and modern layout techniques.',
    'skills.javascript': 'Intermediate: Strong foundations in JavaScript for frontend logic, asynchronous programming, and interaction with APIs.',
    'skills.python': 'Basic: Use of Python for backend development, data processing, numerical models, and algorithmic problem solving.',
    'skills.cpp': 'Intermediate: Experience with C++ for algorithm implementation, numerical methods, and performance-oriented programming.',

    // Contact Section
    'contact.title': 'Contact',
    'contact.email': 'Email',
    'contact.social': 'Social',
    'contact.github': 'GitHub',
    'contact.portfolio': 'Portfolio',

    // About Section
    'about.title': 'About Me',
    'about.p1': 'I am a <strong>Systems Engineering student</strong> with a strong interest in software development and building practical, well-structured applications. This portfolio showcases my academic projects and my learning journey in web and mobile development.',
    'about.p2': 'I enjoy working on both frontend and backend development, focusing on clean code, clear structure, and maintainable solutions. I am especially interested in learning industry best practices and improving through real-world projects and collaboration.',
    'about.p3': 'I have experience working with technologies such as Angular, React, Spring Boot, and Android development with Jetpack Compose. All projects shown here were developed as part of my university studies and personal practice.',
    'about.whatIWorkWith': 'What I Work With',
    'about.webDev': 'Web Application Development',
    'about.mobileDev': 'Mobile Application Development',
    'about.fullstack': 'Frontend & Backend Fundamentals',
    'about.cleanCode': 'Clean Code & Software Structure',

    // Project Gallery
    'gallery.clickForDetails': 'Click for details',
    'gallery.lmsTitle': 'LMS NEWSCHOOL',
    'gallery.lmsDesc': 'A Learning Management System (LMS) for online education',
    'gallery.gustoMenuTitle': 'Menu app Gusto Total',
    'gallery.gustoMenuDesc': 'App menu design for Gusto Total restaurant',
    'gallery.gustoSettingsTitle': 'Settings app Gusto Total',
    'gallery.gustoSettingsDesc': 'Gusto Total app settings',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'es'; // Español por defecto
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
