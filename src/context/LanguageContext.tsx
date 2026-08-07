import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'es';

export interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.about': { en: 'About', es: 'Sobre mí' },
  'nav.projects': { en: 'Projects', es: 'Proyectos' },
  'nav.experience': { en: 'Experience', es: 'Experiencia' },
  'nav.skills': { en: 'Skills', es: 'Habilidades' },
  'nav.services': { en: 'Services', es: 'Servicios' },
  'nav.testimonials': { en: 'Testimonials', es: 'Testimonios' },
  'nav.contact': { en: 'Contact', es: 'Contacto' },
  'nav.search': { en: 'Search', es: 'Buscar' },
  'nav.personalize': { en: 'Personalize', es: 'Personalizar' },
  'nav.resume': { en: 'Resume', es: 'Currículum' },
  'nav.light': { en: 'Light', es: 'Claro' },
  'nav.dark': { en: 'Dark', es: 'Oscuro' },

  // Hero Section
  'hero.available': { en: 'Available for projects', es: 'Disponible para proyectos' },
  'hero.exploreProjects': { en: 'Explore Projects', es: 'Explorar Proyectos' },
  'hero.getInTouch': { en: 'Get in Touch', es: 'Ponerse en Contacto' },
  'hero.downloadResume': { en: 'Download CV', es: 'Descargar CV' },
  'hero.yearsExperience': { en: 'Years Experience', es: 'Años de Experiencia' },
  'hero.completedProjects': { en: 'Completed Projects', es: 'Proyectos Completados' },
  'hero.satisfiedClients': { en: 'Satisfied Clients', es: 'Clientes Satisfechos' },

  // Projects Section
  'projects.title': { en: 'Featured Projects', es: 'Proyectos Destacados' },
  'projects.subtitle': { 
    en: 'Interactive applications, UI design systems, and cloud architecture built for scale.', 
    es: 'Aplicaciones interactivas, sistemas de diseño de UI y arquitectura en la nube.' 
  },
  'projects.all': { en: 'All Projects', es: 'Todos los Proyectos' },
  'projects.web': { en: 'Web Apps', es: 'Apps Web' },
  'projects.ai': { en: 'AI / ML', es: 'IA / ML' },
  'projects.systems': { en: 'Systems', es: 'Sistemas' },
  'projects.mobile': { en: 'Mobile', es: 'Móvil' },
  'projects.launchDemo': { en: 'Launch Live Demo', es: 'Demostración en Vivo' },
  'projects.viewDetails': { en: 'View Case Study', es: 'Ver Estudio de Caso' },
  'projects.readTime': { en: 'min read', es: 'min de lectura' },

  // Contact Section
  'contact.title': { en: 'Let\'s Build Something Exceptional', es: 'Construyamos Algo Excepcional' },
  'contact.subtitle': { 
    en: 'Have a project in mind or want to discuss engineering roles? Send a message below.', 
    es: '¿Tienes un proyecto en mente o quieres discutir roles de ingeniería? Envía un mensaje.' 
  },
  'contact.emailDirectly': { en: 'Email Directly', es: 'Correo Directo' },
  'contact.clickToCopy': { en: 'Click to copy', es: 'Clic para copiar' },
  'contact.copy': { en: 'Copy', es: 'Copiar' },
  'contact.copied': { en: 'Copied!', es: '¡Copiado!' },
  'contact.location': { en: 'Location', es: 'Ubicación' },
  'contact.responseRate': { en: 'Response Time', es: 'Tiempo de Respuesta' },
  'contact.within24h': { en: 'Within 24 hours', es: 'Menos de 24 horas' },
  'contact.name': { en: 'Your Name', es: 'Tu Nombre' },
  'contact.email': { en: 'Your Email Address', es: 'Tu Correo Electrónico' },
  'contact.subject': { en: 'Subject', es: 'Asunto' },
  'contact.message': { en: 'Your Message', es: 'Tu Mensaje' },
  'contact.sendMessage': { en: 'Send Message', es: 'Enviar Mensaje' },
  'contact.messageSent': { en: 'Message Sent Successfully!', es: '¡Mensaje Enviado con Éxito!' },
  'contact.thankYou': { en: 'Thank you for reaching out. Alex will respond shortly.', es: 'Gracias por contactarme. Alex responderá en breve.' },
  'contact.toastCopied': { en: 'Email Copied to Clipboard!', es: '¡Correo Copiado al Portapapeles!' },

  // Chatbot
  'chat.askAlex': { en: 'Ask Alex AI', es: 'Preguntar a Alex IA' },
  'chat.online': { en: 'Online & Ready', es: 'En línea y listo' },
  'chat.assistant': { en: 'Alex AI Assistant', es: 'Asistente IA de Alex' },
  'chat.placeholder': { en: 'Ask anything about Alex\'s portfolio...', es: 'Pregunta sobre el portafolio de Alex...' },

  // Footer
  'footer.rights': { en: 'All rights reserved.', es: 'Todos los derechos reservados.' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'es' : 'en'));
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    // Fallback to key or English string if available
    return translations[key]?.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
