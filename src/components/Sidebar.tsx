import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export function Sidebar() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Calcular al montar
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const colors = theme === 'light' ? {
    background: 'rgb(0, 0, 0)',
    text: '#ffffff',
  } : {
    background: 'rgb(0, 0, 0)',
    text: '#ffffff',
  };

  return (
    <aside className="w-full md:w-[220px] flex-shrink-0 min-h-[300px]">
      <div
        className="flex flex-col py-16 px-8 h-full"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '220px',
          height: '100vh',
          backgroundColor: colors.background,
          color: colors.text,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '6rem',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          zIndex: 10,
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        {/* Branding con efecto de agua */}
        <div className="mb-12" style={{ marginBottom: '4.5rem' }}>
          <h1
            className="font-mono uppercase"
            style={{
              letterSpacing: '0.1em',
              lineHeight: '1.3',
              fontSize: '2.3rem',
              position: 'relative',
            }}
          >
            {/* Texto con borde (outline) */}
            <span
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px #ffffff',
                position: 'relative',
                display: 'block',
              }}
            >
              ARTURO<br />VELIZ
            </span>

            {/* Texto relleno (el "agua" que sube) */}
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                color: '#ffffff',
                clipPath: `inset(${100 - scrollProgress}% 0 0 0)`,
                transition: 'clip-path 0.1s ease-out',
              }}
            >
              ARTURO<br />VELIZ
            </span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-8">
          <a
            href="#skills"
            className="font-mono no-underline hover:opacity-70 transition-opacity text-lg"
            style={{ color: colors.text }}
          >
            {t('nav.skills')}
          </a>
          <a
            href="#contacto"
            className="font-mono no-underline hover:opacity-70 transition-opacity text-lg"
            style={{ color: colors.text }}
          >
            {t('nav.contact')}
          </a>
          <a
            href="#about"
            className="font-mono no-underline hover:opacity-70 transition-opacity text-lg"
            style={{ color: colors.text }}
          >
            {t('nav.aboutMe')}
          </a>
        </nav>
      </div>
    </aside>
  );
}
