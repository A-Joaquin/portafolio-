import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.button
      onClick={toggleLanguage}
      style={{
        position: 'fixed',
        top: isMobile ? 'auto' : '76px', // Debajo del ThemeToggle (12px + 56px + 8px)
        bottom: isMobile ? '24px' : 'auto',
        left: isMobile ? '72px' : 'auto', // Al lado del ThemeToggle en móvil (16px + 48px + 8px)
        right: isMobile ? 'auto' : '24px',
        zIndex: 9999,
        width: isMobile ? '48px' : '56px',
        height: isMobile ? '48px' : '56px',
        borderRadius: '50%',
        backgroundColor: theme === 'light' ? '#000000' : '#FFFFFF',
        color: theme === 'light' ? '#FFFFFF' : '#000000',
        border: 'none',
        boxShadow: theme === 'light'
          ? '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.1)'
          : '0 4px 20px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        fontFamily: 'monospace',
        fontSize: isMobile ? '14px' : '16px',
        fontWeight: 'bold',
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: theme === 'light'
          ? '0 6px 25px rgba(0, 0, 0, 0.4)'
          : '0 6px 25px rgba(0, 0, 0, 0.3)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      aria-label={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={language}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          {language === 'es' ? 'EN' : 'ES'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
